import React, { useCallback } from 'react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { CornerDownLeft, Plus } from 'lucide-react';
import { useChat } from '@/store/useChat';
import { useRouter } from 'next/router';

type Props = {
  switchModel: (value: 'openai' | 'replicate') => void;
  isLoading: boolean;
  languageModel: 'openai' | 'replicate';
  onSubmit: () => void;
};
export const ChatPrompt = React.forwardRef<
  HTMLTextAreaElement,
  Props
>(function ChatPrompt(props, ref) {
  const { switchModel, isLoading, languageModel, onSubmit } = props;
  const conversations = useChat((state) => state.conversations);

  const router = useRouter();

  const onClickNew = useCallback(() => {
    if (router.isReady && conversations.length > 0) {
      router.push('/chat');
    }
  }, [router, conversations]);

  const onEnter = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="sticky bottom-0 w-full px-10 pt-10 left-0 z-20 self-end">
      {isLoading && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-sm">
          Generating Response ...
        </div>
      )}
      <div className="max-w-4xl w-full mx-auto px-10">
        <div className="w-full relative">
          <Button
            size="icon"
            className="absolute top-3 left-4 p-0 h-11 w-11 rounded-full"
            variant="outline"
            onClick={onClickNew}
          >
            <Plus />
          </Button>
          <Textarea
            ref={ref}
            rows={1}
            className="resize-none min-h-0 py-6 px-24 w-full"
            placeholder="Send a message"
            onKeyDown={onEnter}
          />
          <Button
            size="icon"
            className="absolute top-3 right-4 p-0 h-11 w-11"
            onClick={onSubmit}
            variant="default"
          >
            <CornerDownLeft />
          </Button>
        </div>

        <div className="mt-4">
          <div className="flex gap-4 text-sm">
            <Button
              variant={
                languageModel === 'openai' ? 'secondary' : 'outline'
              }
              onClick={() => switchModel('openai')}
            >
              OpenAi
            </Button>
            <Button
              variant={
                languageModel === 'replicate' ? 'default' : 'outline'
              }
              onClick={() => switchModel('replicate')}
            >
              Replicate
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});
