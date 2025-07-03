
import React, { useEffect, useRef, useState } from 'react';
import { Canvas as FabricCanvas, PencilBrush } from 'fabric';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Eraser, Download, RotateCcw, Palette, Type, PenTool, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface DigitalCanvasProps {
  width?: number;
  height?: number;
  className?: string;
}

export const DigitalCanvas: React.FC<DigitalCanvasProps> = ({
  width = 800,
  height = 500,
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [brushSize, setBrushSize] = useState(2);
  const [brushColor, setBrushColor] = useState('#000000');
  const [activeTool, setActiveTool] = useState<'pen' | 'eraser'>('pen');
  const [activeMode, setActiveMode] = useState<'text' | 'draw'>('text');
  const [textContent, setTextContent] = useState('');

  const canvasHeight = height - 120; // Reserve space for text area
  const textAreaHeight = 120;

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width,
      height: canvasHeight,
      backgroundColor: '#ffffff',
      isDrawingMode: activeMode === 'draw',
    });

    // Initialize brush
    const brush = new PencilBrush(canvas);
    brush.color = brushColor;
    brush.width = brushSize;
    canvas.freeDrawingBrush = brush;

    setFabricCanvas(canvas);
    toast("Canvas ready for writing!");

    return () => {
      canvas.dispose();
    };
  }, [width, canvasHeight]);

  useEffect(() => {
    if (!fabricCanvas || !fabricCanvas.freeDrawingBrush) return;

    fabricCanvas.isDrawingMode = activeMode === 'draw';

    if (activeTool === 'eraser') {
      fabricCanvas.freeDrawingBrush.color = '#ffffff';
    } else {
      fabricCanvas.freeDrawingBrush.color = brushColor;
    }
    fabricCanvas.freeDrawingBrush.width = brushSize;
  }, [brushSize, brushColor, activeTool, activeMode, fabricCanvas]);

  const handleClear = () => {
    if (activeMode === 'text') {
      setTextContent('');
      toast("Text cleared!");
    } else {
      if (!fabricCanvas) return;
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = '#ffffff';
      fabricCanvas.renderAll();
      toast("Drawing cleared!");
    }
  };

  const handleClearAll = () => {
    setTextContent('');
    if (fabricCanvas) {
      fabricCanvas.clear();
      fabricCanvas.backgroundColor = '#ffffff';
      fabricCanvas.renderAll();
    }
    toast("Everything cleared!");
  };

  const handleDownload = () => {
    if (!fabricCanvas) return;
    
    // Create a temporary canvas that combines both text and drawing
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const ctx = tempCanvas.getContext('2d');
    
    if (!ctx) return;
    
    // Fill white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    
    // Add text area
    if (textContent.trim()) {
      ctx.fillStyle = '#000000';
      ctx.font = '14px Arial';
      const lines = textContent.split('\n');
      lines.forEach((line, index) => {
        ctx.fillText(line, 10, 20 + (index * 18));
      });
    }
    
    // Add drawing area
    const drawingDataURL = fabricCanvas.toDataURL({
      format: 'png',
      quality: 0.8,
      multiplier: 1
    });
    
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, textAreaHeight);
      
      const link = document.createElement('a');
      link.download = 'prescription.png';
      link.href = tempCanvas.toDataURL();
      link.click();
      toast("Prescription downloaded!");
    };
    img.src = drawingDataURL;
  };

  const handleCopyText = () => {
    if (textContent.trim()) {
      navigator.clipboard.writeText(textContent);
      toast("Text copied to clipboard!");
    }
  };

  const colorOptions = ['#000000', '#0066cc', '#cc0000', '#009900', '#cc6600'];

  return (
    <div className={`space-y-4 ${className}`}>
      <Card>
        <CardContent className="p-4">
          {/* Mode Selector */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
              <Button
                variant={activeMode === 'text' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveMode('text')}
                className="flex items-center gap-2"
              >
                <Type className="w-4 h-4" />
                Text Mode
              </Button>
              <Button
                variant={activeMode === 'draw' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveMode('draw')}
                className="flex items-center gap-2"
              >
                <PenTool className="w-4 h-4" />
                Draw Mode
              </Button>
            </div>

            {/* Drawing Tools - Only show when in draw mode */}
            {activeMode === 'draw' && (
              <>
                <div className="flex gap-2">
                  <Button
                    variant={activeTool === 'pen' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveTool('pen')}
                  >
                    Pen
                  </Button>
                  <Button
                    variant={activeTool === 'eraser' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveTool('eraser')}
                  >
                    <Eraser className="w-4 h-4" />
                    Eraser
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm">Size:</span>
                  <Slider
                    value={[brushSize]}
                    onValueChange={([value]) => setBrushSize(value)}
                    max={20}
                    min={1}
                    step={1}
                    className="w-20"
                  />
                  <span className="text-sm w-8">{brushSize}px</span>
                </div>

                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  <div className="flex gap-1">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        className={`w-6 h-6 rounded-full border-2 ${
                          brushColor === color ? 'border-gray-800' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                        onClick={() => setBrushColor(color)}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-2 ml-auto">
              {activeMode === 'text' && (
                <Button variant="outline" size="sm" onClick={handleCopyText}>
                  <Copy className="w-4 h-4" />
                  Copy Text
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={handleClear}>
                <RotateCcw className="w-4 h-4" />
                Clear {activeMode === 'text' ? 'Text' : 'Drawing'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleClearAll}>
                <RotateCcw className="w-4 h-4" />
                Clear All
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Text Input Area */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                <span className="text-sm font-medium">Text Input Area</span>
                {activeMode === 'text' && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Active</span>
                )}
              </div>
              <div className={`border rounded-lg transition-all ${
                activeMode === 'text' 
                  ? 'border-blue-400 bg-blue-50/30' 
                  : 'border-gray-300 bg-gray-50/50'
              }`}>
                <Textarea
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  placeholder="Type your prescription details here..."
                  className={`min-h-[${textAreaHeight}px] resize-none border-0 bg-transparent focus:ring-0 ${
                    activeMode === 'text' ? 'text-gray-900' : 'text-gray-600'
                  }`}
                  style={{ minHeight: `${textAreaHeight}px` }}
                />
              </div>
            </div>

            {/* Drawing Area */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4" />
                <span className="text-sm font-medium">Drawing Area</span>
                {activeMode === 'draw' && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Active</span>
                )}
              </div>
              <div className={`border rounded-lg overflow-hidden transition-all ${
                activeMode === 'draw'
                  ? 'border-green-400 bg-green-50/30'
                  : 'border-gray-300 bg-gray-50/50'
              }`}>
                <canvas 
                  ref={canvasRef} 
                  className={`block ${
                    activeMode === 'draw' ? 'cursor-crosshair' : 'cursor-not-allowed opacity-75'
                  }`}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
