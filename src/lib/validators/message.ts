import { z } from 'zod';

export const messageSchema = z.object({
  role: z.string(),
  content: z.string(),
  _id: z.string(),
});

export const MessageArraySchema = z.array(messageSchema);

export type Message = z.infer<typeof messageSchema>;
