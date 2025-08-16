// src/main/clients/llm/gemini-client.service.js

const fetch = require('node-fetch');

class GeminiClientService {
  /**
   * GeminiClientService의 인스턴스를 생성합니다.
   * @param {string} apiKey - 사용자가 입력한 Google AI API 키
   * @param {string} modelName - 사용할 모델의 이름 (기본값: 'gemini-2.5-pro')
   */
  constructor(apiKey, modelName = 'gemini-2.5-pro') {
    if (!apiKey) {
      throw new Error('API Key is required for Gemini client');
    }

    this.apiKey = apiKey;
    this.modelName = modelName;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
  }

  /**
   * 주어진 프롬프트를 기반으로 텍스트를 생성합니다.
   * @param {string} prompt - Gemini에게 보낼 프롬프트 문자열
   * @returns {Promise<string>} 생성된 텍스트
   */
  async generateText(prompt) {
    try {
      console.log('GeminiClientService: Generating text with model:', this.modelName);

      const url = `${this.baseUrl}/models/${this.modelName}:generateContent?key=${this.apiKey}`;

      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      if (
        !data.candidates ||
        !data.candidates[0] ||
        !data.candidates[0].content ||
        !data.candidates[0].content.parts ||
        !data.candidates[0].content.parts[0]
      ) {
        throw new Error('Invalid response structure from Gemini API');
      }

      const text = data.candidates[0].content.parts[0].text;
      console.log('GeminiClientService: Generated text length:', text.length);
      return text;
    } catch (error) {
      console.error('Gemini API 통신 중 오류 발생:', error);
      throw new Error(`Gemini API Error: ${error.message || 'Unknown error'}`);
    }
  }
}

module.exports = { GeminiClientService };
