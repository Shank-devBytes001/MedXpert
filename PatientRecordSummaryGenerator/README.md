# Patient Record Summary Generator

## Overview
The Patient Record Summary Generator is a web application built using Flask that allows users to upload medical PDF reports, which are then summarized using the Dwani API. The application also provides functionalities for text-to-speech conversion of the summaries and a chatbot interface for user interaction.

## Features
- **File Upload**: Users can upload PDF files containing medical reports.
- **Summary Generation**: The application interacts with the Dwani API to generate summaries of the uploaded reports.
- **Text-to-Speech**: Users can listen to the generated summaries in audio format.
- **Chatbot Interface**: Users can ask questions about the summary, and the chatbot will respond based on the provided context.

## Project Structure
```
PatientRecordSummaryGenerator
├── app.py                # Main application logic
├── requirements.txt      # Project dependencies
├── templates
│   └── index.html       # HTML template for the web interface
├── uploads               # Directory for storing uploaded files
└── README.md             # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd PatientRecordSummaryGenerator
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage
1. Run the application:
   ```
   python app.py
   ```

2. Open your web browser and navigate to `http://localhost:5001` to access the application.

3. Upload a PDF file containing a medical report and click on "Generate Summary" to receive a summary of the report.

4. Use the chatbot interface to ask questions about the summary.

## Dependencies
- Flask
- dwani (for API interactions)
- werkzeug (for file handling)
- Additional libraries for voice recognition and text-to-speech functionalities.
