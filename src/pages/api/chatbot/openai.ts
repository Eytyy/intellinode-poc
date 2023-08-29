// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';
const {
  Chatbot,
  ChatGPTInput,
  ChatGPTMessage,
} = require('intellinode');

type RequestBody = {
  messages: {
    role: string;
    content: string;
  }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { messages }: RequestBody = req.body;

  if (!messages) {
    res.status(400).json({ error: 'invalid request body' });
    return;
  }

  let bot = new Chatbot(process.env.OPENAI_API_KEY);
  let input = new ChatGPTInput('You are a helpful assistant.');

  // add the previous messages
  try {
    messages.forEach((message) => {
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
