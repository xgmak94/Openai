import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import { message } from '../../models/messages';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const model = 'gpt-3.5-turbo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { messages } = req.body; // complete chat history

    const newArr = messages.map(({ ai, ...rest }: message) => rest);

    const chatGPT = await openai
      .createChatCompletion({
        model,
        messages: newArr,
      })
      .then((response) => {
        const chatGPTMessage = response.data.choices[0].message;

        res
          .status(200)
          .json({ content: chatGPTMessage?.content, ai: 'ChatGPT' });
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ error: 'Something went wrong' });
      });
  }
}
