import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateStudyPlan(userProgress: string, goals: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
      Sen profesyonel bir LGS (Liselere Geçiş Sistemi) eğitim koçusun. 
      Öğrencinin mevcut durumu: ${userProgress}
      Hedefleri: ${goals}
      
      Lütfen öğrenci için haftalık, güncel müfredata uygun, Pomodoro ve Aktif Hatırlama gibi etkili öğrenme metodlarını içeren bir çalışma programı hazırla.
      Programı JSON formatında ver. 
      Format: { "plan": [ { "day": "Pazartesi", "tasks": [ { "subject": "Matematik", "topic": "...", "duration": 40, "type": "Konu Çalışma" } ] } ] }
      Sadece JSON döndür.
    `,
    config: {
      responseMimeType: "application/json"
    }
  });
  
  return JSON.parse(response.text);
}

export async function getLearningShortcut(topic: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
      LGS öğrencisi için "${topic}" konusunu en kolay ve kalıcı şekilde öğrenmenin yollarını, kısayollarını ve ipuçlarını anlat. 
      Feynman tekniği veya hafıza teknikleri gibi metodlar kullan. 
      Yanıtı Markdown formatında ver.
    `
  });
  
  return response.text;
}

export async function analyzeMistakes(mistakes: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
      Aşağıdaki yanlış çözülmüş soru verilerini analiz et ve öğrenciye hangi konularda eksik olduğunu, 
      bu hataları nasıl düzeltebileceğini ve çalışma stratejisini nasıl değiştirmesi gerektiğini açıkla.
      Veriler: ${mistakes}
      Yanıtı Markdown formatında ver.
    `
  });
  
  return response.text;
}
