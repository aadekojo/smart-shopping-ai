import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1', // DeepSeek's base URL
});

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const prompt = `
  Only respond with JSON. No explanation, no markdown.
  
  The user is looking for products. Interpret this message and return 3 relevant product listings in this raw JSON array format:
  
  [
    {
      "name": "Product name",
      "price": "AED 1234",
      "store": "Store name",
      "link": "https://example.com"
    }
  ]
  
  User query: "${query}"
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: 'deepseek-chat', //  Model name might vary
      messages: [
        { role: 'system', content: 'You are a helpful shopping assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const rawOutput = completion.choices[0].message?.content?.trim() || '';
    console.log('🧠 DeepSeek Raw Output:', rawOutput);

    const jsonStart = rawOutput.indexOf('[');
    const jsonEnd = rawOutput.lastIndexOf(']');
    let products: any[] = [];

    if (jsonStart !== -1 && jsonEnd !== -1) {
      const jsonString = rawOutput.substring(jsonStart, jsonEnd + 1);
      products = JSON.parse(jsonString);
    }

    return NextResponse.json({ products });
  } catch (error: any) {
    console.error('❌ DeepSeek AI error:', error.message);

    // Fallback for safety
    return NextResponse.json({
      products: [
        {
          name: 'Demo Product',
          price: 'AED 999',
          store: 'Fallback Store',
          link: '#',
        },
      ],
      fallback: true,
    });
  }
}
