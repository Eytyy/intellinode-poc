import type { NextApiRequest, NextApiResponse } from 'next';
import { SupportedLangProviders } from 'intellinode';
import {
  generateImage,
  generateImageDescription,
} from '@/lib/interllinode';

type RequestBody = {
  promptText: string;
  model: SupportedLangProviders;
};

export default async function generateImageHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { promptText, model = 'openai' }: RequestBody = req.body;

  if (!promptText) {
    res.status(400).json({ error: 'Missing prompt text' });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    res.status(400).json({
      error: 'Missing API key, please add it to your .env file',
    });
    return;
  }

  try {
    const imageDescription = await generateImageDescription(
      promptText,
      apiKey
    );
    const image = await generateImage(imageDescription[0], apiKey);

    res.status(200).json({
      imageDescription,
      image,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
