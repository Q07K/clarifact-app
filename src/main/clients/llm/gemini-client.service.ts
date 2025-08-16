// src/main/clients/llm/gemini-client.service.ts

import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

export class GeminiClientService {
  private model: GenerativeModel;

  /**
   * GeminiClientService의 인스턴스를 생성합니다.
   * @param {string} apiKey - 사용자가 입력한 Google AI API 키
   * @param {string} modelName - 사용할 모델의 이름 (기본값: 'gemini-1.5-flash')
   */
  constructor(apiKey: string, modelName: string = 'gemini-1.5-flash') {
    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: modelName });
  }

  /**
   * 주어진 프롬프트를 기반으로 텍스트를 생성합니다.
   * @param {string} prompt - Gemini에게 보낼 프롬프트 문자열
   * @returns {Promise<string>} 생성된 텍스트
   */
  public async generateText(prompt: string): Promise<string> {
    try {
      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      return text;
    } catch (error: any) {
      console.error('Gemini API 통신 중 오류 발생:', error);
      throw new Error(`Gemini API Error: ${error.message || 'Unknown error'}`);
    }
  }
}
