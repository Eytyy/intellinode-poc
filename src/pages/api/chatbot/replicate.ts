// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next';
const {
  Chatbot,
  LLamaReplicateInput,
  SupportedChatModels,
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
  const bot = new Chatbot(
    process.env.REPLICATE_API_KEY,
    SupportedChatModels.REPLICATE
  );
  const input = new LLamaReplicateInput(
    'You are a helpful assistant.'
  );

  // add the previous messages
  try {
    for (let i = 0; i <= messages.length - 1; i++) {
      const message = messages[i];
      if (message.role === 'user') {
        input.addUserMessage(message.content);
      } else if (message.role === 'assistant') {
        input.addAssistantMessage(message.content);
      } else {
        continue;
      }
    }
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
