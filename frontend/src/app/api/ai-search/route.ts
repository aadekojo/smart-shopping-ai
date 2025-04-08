import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const prompt = `
You are a shopping assistant. The user said: "${query}". 
Return a JSON array of 3 product suggestions with name, price, store, and link.
`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: 'You are a helpful shopping assistant.' },
      { role: 'user', content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 300,
  });

  const result = completion.choices[0].message?.content;

  try {
    const products = JSON.parse(result || '[]');
    return NextResponse.json({ products });
  } catch (err) {
    console.error('JSON parse error:', result);
    return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
  }
}
