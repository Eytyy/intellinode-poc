import type { NextApiRequest, NextApiResponse } from 'next';
import { SupportedLangProviders } from 'intellinode';
import {
  generateBlogPost,
  generateImage,
  generateImageDescription,
  generateSEOMetaTags,
  gernerateSummary,
} from '@/lib/interllinode';

type RequestBody = {
  promptText: string;
  apiKey: string;
  model: SupportedLangProviders;
};

export default async function handler(
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
    const summary = await gernerateSummary(blogPost[0], apiKey);
    const SEOMetaTags = await generateSEOMetaTags(summary[0], apiKey);
    const imageDescription = await generateImageDescription(
      summary[0],
      apiKey
    );
    const image = await generateImage(imageDescription[0], apiKey);

    res.status(200).json({
      summary,
      SEOMetaTags,
      imageDescription,
      image,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
