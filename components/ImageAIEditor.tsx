import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Button, Input, Card } from './UIComponents';
import { Sparkles, Loader2, X, RefreshCw, Check, Wand2 } from 'lucide-react';

interface ImageAIEditorProps {
  originalImage: string;
  onApply: (newImageUrl: string) => void;
  onClose: () => void;
}

export const ImageAIEditor: React.FC<ImageAIEditorProps> = ({ originalImage, onApply, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getBase64FromUrl = async (url: string): Promise<string> => {
    // Note: This might hit CORS if external, but for local input_file_*.png it should be fine.
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          resolve(result.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (e) {
      // Fallback for demo if fetch fails
      return "";
    }
  };

  const handleEdit = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = await getBase64FromUrl(originalImage);
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: 'image/png',
              },
            },
            {
              text: `Please edit this image based on the following instruction: ${prompt}. Return the modified image.`,
            },
          ],
        },
      });

      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const newImage = `data:image/png;base64,${part.inlineData.data}`;
            setEditedImage(newImage);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        throw new Error("The model did not return an image. Try a different prompt.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to generate image. Please check your prompt and try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <Card className="w-full max-w-2xl relative bg-white dark:bg-[#1a003a] shadow-2xl overflow-hidden border-none dark:border dark:border-[#5514B4] p-0">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#5514B4] dark:hover:text-[#f9fafb] hover:bg-purple-50 dark:hover:bg-white/10 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-purple-100 dark:bg-white/10 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-[#5514B4] dark:text-[#f9fafb]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#5514B4] dark:text-[#f9fafb]">AI Studio Editor</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Edit product images using Gemini 2.5 Flash Image</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Original</p>
              <div className="aspect-square rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-[#4c1d95] flex items-center justify-center overflow-hidden">
                <img src={originalImage} alt="Original" className="max-w-full max-h-full object-contain" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-[#5514B4] dark:text-[#f9fafb] uppercase tracking-wider">AI Generated</p>
              <div className="aspect-square rounded-xl bg-purple-50 dark:bg-[#250055] border-2 border-dashed border-purple-200 dark:border-[#4c1d95] flex items-center justify-center overflow-hidden relative">
                {isGenerating ? (
                  <div className="flex flex-col items-center space-y-3">
                    <Loader2 className="w-10 h-10 text-[#5514B4] dark:text-[#f9fafb] animate-spin" />
                    <span className="text-sm font-medium text-[#5514B4] dark:text-[#f9fafb] animate-pulse">Processing...</span>
                  </div>
                ) : editedImage ? (
                  <img src={editedImage} alt="Edited" className="max-w-full max-h-full object-contain animate-fade-in" />
                ) : (
                  <div className="text-center px-6">
                    <Wand2 className="w-10 h-10 text-purple-200 dark:text-gray-700 mx-auto mb-2" />
                    <p className="text-sm text-purple-300 dark:text-gray-600 italic">"Add a retro filter", "Put it in a park"...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Input 
                placeholder="Enter a prompt to edit the image..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => { if(e.key === 'Enter') handleEdit(); }}
                className="pr-24"
                disabled={isGenerating}
              />
              <div className="absolute right-2 top-1.5 bottom-1.5 flex items-center">
                <Button 
                  onClick={handleEdit} 
                  disabled={isGenerating || !prompt.trim()}
                  className="!py-1.5 !px-3 text-sm h-full"
                >
                  {isGenerating ? 'Working...' : 'Edit'}
                </Button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-900/30">{error}</p>
            )}

            <div className="flex space-x-3 pt-2">
              <Button 
                variant="outline" 
                fullWidth 
                onClick={() => { setEditedImage(null); setPrompt(''); }}
                disabled={isGenerating || !editedImage}
              >
                <RefreshCw className="w-4 h-4 mr-2" /> Reset
              </Button>
              <Button 
                fullWidth 
                disabled={isGenerating || !editedImage}
                onClick={() => editedImage && onApply(editedImage)}
              >
                <Check className="w-4 h-4 mr-2" /> Apply Changes
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};