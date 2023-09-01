// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Chatbot, ChatGPTInput, ChatGPTMessage } from 'intellinode';
import { MessageArraySchema } from '@/lib/validators/message';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { messages } = req.body;

  const parsedMessages = MessageArraySchema.parse(messages);

  if (!parsedMessages) {
    res.status(400).json({ error: 'invalid request body' });
    return;
  }

  let bot = new Chatbot(process.env.OPENAI_API_KEY);
  let input = new ChatGPTInput(
    'You are a helpful assistant. When responding, format links, code blocks, inline code, text highlighting such as bold in markdown format.'
  );

  // add the previous messages
  try {
    parsedMessages.forEach((message) => {
      input.addMessage(
        new ChatGPTMessage(message.content, message.role)
      );
    });

    const responses = await bot.chat(input);
    const responseMsgs = responses.map((res: any) => {
      return {
        role: 'assistant',
        content: res,
        _id: nanoid(),
      };
    });

    res.status(200).json(responseMsgs);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: `Something went wrong: ${e}` });
  }
}
