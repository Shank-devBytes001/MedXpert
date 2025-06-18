import os
import dwani  # Assuming the dwani library is installed and accessible
import logging # <<< ADDED THIS LINE
from flask import Flask, request, render_template, redirect, url_for, send_file
from werkzeug.utils import secure_filename

# --- Configuration ---
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf'}

# --- Initialize Flask App ---
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = 'your_very_secret_key' # Important for session management, change in production

# --- Dwani API Configuration ---
# Use the API key and base URL provided by the user
dwani.api_key = 'sachin_user_template@dwani.ai_dwani'
dwani.api_base = 'https://dwani-dwani-api.hf.space'

# --- Helper Functions ---
def allowed_file(filename):
    """Checks if the uploaded file has an allowed extension (PDF)."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def ensure_upload_folder_exists():
    """Creates the upload folder if it doesn't exist."""
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

# --- Routes ---
@app.route('/', methods=['GET', 'POST'])
def upload_and_summarize():
    """
    Handles file upload and displays the summary.
    GET: Renders the upload form.
    POST: Processes the uploaded PDF, calls Dwani API, and displays summary.
    """
    ensure_upload_folder_exists()
    summary_result = None
    error_message = None

    if request.method == 'POST':
        # Check if the post request has the file part
        if 'pdf_file' not in request.files:
            error_message = 'No file part in the request.'
            # Log this server-side for debugging
            app.logger.warning('File part missing in POST request.')
            return render_template('index.html', error_message=error_message, summary=summary_result)

        file = request.files['pdf_file']

        # If the user does not select a file, the browser submits an empty file without a filename.
        if file.filename == '':
            error_message = 'No file selected.'
            app.logger.info('No file selected by the user.')
            return render_template('index.html', error_message=error_message, summary=summary_result)

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            
            try:
                file.save(file_path)
                app.logger.info(f"File '{filename}' saved to '{file_path}'")
                
                # Call Dwani API to summarize the document
                # Using parameters from the user's example:
                # page_number=1, src_lang="english", tgt_lang="kannada"
                # You might want to make these configurable later.
                app.logger.info(f"Calling Dwani API for file: {file_path}")
                result = dwani.Documents.summarize(
                    file_path=file_path,
                    page_number=1,      # Summarizes the first page
                    src_lang="english", # Source language of the PDF content
                    tgt_lang="kannada"  # Target language for the summary
                )
                
                # If result is a dict and contains 'translated_summary', use only that
                if isinstance(result, dict) and 'translated_summary' in result:
                    summary_result = result['translated_summary']
                else:
                    summary_result = result  # fallback
                
                app.logger.info(f"Dwani API returned summary: {summary_result}")
                
                # Optional: Clean up the uploaded file after processing
                # os.remove(file_path) 

            except Exception as e:
                error_message = f"An error occurred while processing the PDF or getting the summary. Please check the logs."
                # Log the full error for debugging
                app.logger.error(f"Dwani API or file processing error for '{filename}': {e}", exc_info=True)
            finally:
                # Ensure temporary file is removed if it still exists,
                # unless you want to keep it for debugging or other purposes.
                # Consider removing even if there was an error to avoid clutter.
                if os.path.exists(file_path):
                     app.logger.info(f"Attempting to remove temporary file: {file_path}")
                     try:
                         os.remove(file_path)
                         app.logger.info(f"Successfully removed temporary file: {file_path}")
                     except Exception as e_remove:
                         app.logger.error(f"Error removing temporary file '{file_path}': {e_remove}", exc_info=True)


        else:
            error_message = 'Invalid file type. Please upload a PDF.'
            app.logger.warning(f"Invalid file type uploaded: {file.filename if file else 'No file object'}")

    return render_template('index.html', error_message=error_message, summary=summary_result)

@app.route('/text-to-speech', methods=['POST'])
def text_to_speech():
    """Convert text to speech and return the audio file."""
    try:
        text = request.json.get('text')
        if not text:
            return {'error': 'No text provided'}, 400

        # Generate audio file
        response = dwani.Audio.speech(input=text, response_format="mp3")
        
        # Save the audio file
        audio_path = os.path.join(app.config['UPLOAD_FOLDER'], 'summary_audio.mp3')
        with open(audio_path, "wb") as f:
            f.write(response)
        
        # Send the file
        return send_file(audio_path, mimetype='audio/mpeg', as_attachment=True)
    except Exception as e:
        app.logger.error(f"Error in text-to-speech conversion: {e}", exc_info=True)
        return {'error': str(e)}, 500

@app.route('/chat', methods=['POST'])
def chat():
    """Handle chat messages using Dwani API."""
    try:
        message = request.json.get('message')
        if not message:
            return {'error': 'No message provided'}, 400

        # Get the summary from the session if available
        summary = request.json.get('summary', '')
        
        # Create a context-aware prompt
        prompt = f"Context from medical report summary: {summary}\n\nUser question: {message}"
        
        # Call Dwani Chat API with the context-aware prompt
        response = dwani.Chat.create(
            prompt=prompt,
            src_lang="english",
            tgt_lang="kannada"
        )

        # Log the interaction for debugging
        app.logger.info(f"Chat interaction - Question: {message}, Response: {response}")

        return {'response': response}
    except Exception as e:
        app.logger.error(f"Error in chat: {e}", exc_info=True)
        return {'error': 'Failed to process your question. Please try again.'}, 500

@app.route('/transcribe', methods=['POST'])
def transcribe():
    """Handle voice input transcription using Dwani ASR API."""
    try:
        if 'audio' not in request.files:
            return {'error': 'No audio file provided'}, 400

        audio_file = request.files['audio']
        if audio_file.filename == '':
            return {'error': 'No selected file'}, 400

        # Save the audio file temporarily
        audio_path = os.path.join(app.config['UPLOAD_FOLDER'], 'temp_audio.wav')
        audio_file.save(audio_path)

        # Call Dwani ASR API
        result = dwani.ASR.transcribe(
            file_path=audio_path,
            language="kannada"
        )

        # Clean up the temporary file
        if os.path.exists(audio_path):
            os.remove(audio_path)

        return {'text': result}
    except Exception as e:
        app.logger.error(f"Error in transcription: {e}", exc_info=True)
        return {'error': str(e)}, 500

if __name__ == '__main__':
    # Ensure the logger is active for debugging
    # Basic logging configuration
    logging.basicConfig(level=logging.INFO, format='%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]')
    app.logger.info("Flask application starting...") # This will now work
    
    # Run the Flask development server
    # Host '0.0.0.0' makes it accessible on your local network
    # Use a different port if 5000 is in use
    app.run(debug=True, host='0.0.0.0', port=5001) # Changed port to 5001 as an example
