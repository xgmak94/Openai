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
    const { prompt } = req.body;

    const response = await openai
      .createImage({
        prompt,
        n: 1,
        size: '1024x1024',
      })
      .then((response) => {
        const url = response.data.data[0];
        res.status(200).json(url);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json({ error: 'Something went wrong' });
      });
  }
}
