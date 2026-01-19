
import { GoogleGenAI, Type } from "@google/genai";
import { Note, Skill } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getGeminiResponse = async (prompt: string, contextNotes: Note[]) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const brainContext = contextNotes
    .map(n => `Заметка [${n.title}]: ${n.content.substring(0, 500)}`)
    .join('\n\n---\n\n');

  const systemInstruction = `
    Ты — "Ассистент Второго Мозга". Твоя цель — помогать пользователю управлять его личными знаниями.
    У тебя есть доступ к фрагментам его заметок (Контекст Мозга). 
    Всегда приоритизируй информацию из его заметок, если она релевантна.
    Будь лаконичным, полезным и поощряй организованность.
    Отвечай на русском языке. Используй чистое форматирование Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `${prompt}\n\nКОНТЕКСТ МОЗГА:\n${brainContext}`,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "Не удалось получить ответ.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ошибка: Не удалось подключиться к ассистенту мозга.";
  }
};

export const applySkill = async (skill: Skill, note: Note) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  const prompt = `Навык: ${skill.name}\nИнструкция: ${skill.prompt}\n\nСодержание заметки:\n${note.content}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.5,
      },
    });

    return response.text || "Выполнение навыка не удалось.";
  } catch (error) {
    console.error("Skill Error:", error);
    return "Ошибка при применении навыка.";
  }
};
