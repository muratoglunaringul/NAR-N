import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Sparkles, 
  Send, 
  Loader2, 
  Zap, 
  Target, 
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import Markdown from 'react-markdown';
import { getLearningShortcut, analyzeMistakes } from '../services/gemini';
import { QuestionLog } from '../types';

interface AIAssistantProps {
  logs: QuestionLog[];
}

export default function AIAssistant({ logs }: AIAssistantProps) {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAsk = async (prompt?: string) => {
    const query = prompt || input;
    if (!query) return;
    
    setIsLoading(true);
    setResponse('');
    try {
      const result = await getLearningShortcut(query);
      setResponse(result);
    } catch (error) {
      console.error(error);
      setResponse('Üzgünüm, bir hata oluştu. Lütfen tekrar dene.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeMistakes = async () => {
    setIsLoading(true);
    setResponse('');
    try {
      const mistakesData = logs
        .filter(l => l.wrongCount > 0)
        .map(l => `${l.subject}: ${l.wrongCount} yanlış (${l.date})`)
        .join(', ');
      const result = await analyzeMistakes(mistakesData || 'Henüz yanlış kaydı yok.');
      setResponse(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "Matematik Üslü Sayılar kısayolları",
    "Fen Bilimleri Basınç nasıl kolay öğrenilir?",
    "Türkçe Fiilimsiler hafıza teknikleri",
    "İngilizce kelime ezberleme taktikleri"
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Yapay Zeka Eğitim Koçu</h2>
        <p className="text-slate-500 mt-1">Öğrenmeyi kolaylaştıran metodlar ve yanlış analizleri.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Sparkles className="text-brand-500" size={18} /> Hızlı Aksiyonlar
            </h3>
            <div className="space-y-3">
              <button 
                onClick={handleAnalyzeMistakes}
                className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-50 text-red-700 hover:bg-red-100 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <Target size={20} />
                  <span className="text-sm font-bold">Yanlışlarımı Analiz Et</span>
                </div>
                <ArrowRight size={16} />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <Zap size={20} />
                  <span className="text-sm font-bold">Haftalık Özet Çıkar</span>
                </div>
                <ArrowRight size={16} />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors text-left">
                <div className="flex items-center gap-3">
                  <Lightbulb size={20} />
                  <span className="text-sm font-bold">Yeni Öğrenme Metodu</span>
                </div>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl shadow-slate-200">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <BrainCircuit size={18} /> İpucu
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              "Feynman Tekniği" bir konuyu en iyi öğrenme yoludur. Konuyu hiç bilmeyen birine anlatıyormuş gibi sesli anlatmayı dene!
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[600px]">
            <div className="flex-1 overflow-y-auto p-8">
              {response ? (
                <div className="markdown-body">
                  <Markdown>{response}</Markdown>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center text-slate-400">
                  <BrainCircuit size={64} className="mb-4 opacity-20" />
                  <h4 className="text-lg font-bold text-slate-800">Sana nasıl yardımcı olabilirim?</h4>
                  <p className="max-w-xs mt-2 text-sm">
                    Bir konu hakkında kısayol isteyebilir veya yanlışlarını analiz etmemi söyleyebilirsin.
                  </p>
                  
                  <div className="mt-8 grid grid-cols-1 gap-2 w-full max-w-sm">
                    {suggestions.map((s, i) => (
                      <button 
                        key={i}
                        onClick={() => handleAsk(s)}
                        className="text-xs p-3 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all text-left text-slate-600"
                      >
                        "{s}"
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {isLoading && (
                <div className="flex items-center gap-3 text-brand-600 font-bold animate-pulse">
                  <Loader2 className="animate-spin" size={20} />
                  <span>Düşünüyorum...</span>
                </div>
              )}
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100">
              <div className="relative">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                  placeholder="Bir konu yaz veya soru sor..."
                  className="w-full pl-6 pr-16 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none shadow-sm transition-all"
                />
                <button 
                  onClick={() => handleAsk()}
                  disabled={isLoading || !input}
                  className="absolute right-2 top-2 bottom-2 px-4 bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
