import type { NextApiRequest, NextApiResponse } from 'next';
import { SupportedLangProviders } from 'intellinode';
import { gernerateSummary } from '@/lib/interllinode';

type RequestBody = {
  promptText: string;
  model: SupportedLangProviders;
};

export default async function generateTextSummaryHandler(
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
    // generate a summary
    const summary = await gernerateSummary(promptText, apiKey);
    res.status(200).json(summary);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
