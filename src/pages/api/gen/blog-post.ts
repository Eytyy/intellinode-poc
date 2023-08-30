import type { NextApiRequest, NextApiResponse } from 'next';
import { SupportedLangProviders } from 'intellinode';
import { generateBlogPost } from '@/lib/interllinode';

type RequestBody = {
  promptText: string;
  apiKey: string;
  model: SupportedLangProviders;
};

export default async function generateBlogPostHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    promptText,
    apiKey,
    model = 'openai',
  }: RequestBody = req.body;

  if (!promptText) {
    res.status(400).json({ error: 'Missing prompt text' });
    return;
  }

  if (!apiKey) {
    res.status(400).json({ error: 'Missing API key' });
    return;
  }

  try {
    const blogPost = await generateBlogPost(
      promptText,
      apiKey,
      model
    );
    res.status(200).json(blogPost);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
