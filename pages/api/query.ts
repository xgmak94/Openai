import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { messages } = req.body; // complete chat history

    const chatGPT = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });

    const chatGPTMessage = chatGPT.data.choices[0].message;
    res.status(200).json(chatGPTMessage);
  }
}
