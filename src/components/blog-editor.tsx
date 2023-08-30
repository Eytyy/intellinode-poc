import { useMutation } from '@tanstack/react-query';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import axios from 'axios';
import { useRef, useState } from 'react';
import Image from 'next/image';

async function PostBlogArticle(props: { promptText: string }) {
  const { data } = await axios.post(`/api/blog/editor`, {
    promptText: props.promptText,
  });
  return data as {
    summary: string[];
    image: string[];
    SEOMetaTags: string[];
  };
}

export default function BlogEditor() {
  const [input, setInput] = useState<string>('');

  const { data, mutate, isLoading } = useMutation(['blog-editor'], {
    mutationFn: PostBlogArticle,
  });

  const onSubmit = () => {
    const promptText = input;
    if (!promptText) return void 0;
    mutate({ promptText });
    setInput('');
  };

  return (
    <div className="grid gap-10 grid-cols-2 min-h-[calc(100vh-var(--header-height)-5rem)]">
      <div className="grid w-full gap-4 grid-rows-[min-content_1fr_min-content]">
        <Label htmlFor="message-2">Blog Post Text</Label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your blog post text here."
          id="message-2"
          rows={10}
        />
        <Button
          disabled={isLoading || input === ''}
          onClick={onSubmit}
        >
          Run {`Intellinode's`} Blog Editor
        </Button>
      </div>
      {data ? (
        <Preview
          summary={data.summary[0]}
          SEOMetaTags={data.SEOMetaTags[0]}
          image={data.image[0]}
        />
      ) : (
        <Description />
      )}
    </div>
  );
}

function Description() {
  // describe what the blog editor does
  return (
    <aside>
      <h2 className="font-bold text-lg">Editor</h2>
      <p className="text-sm">
        The blog editor uses intellinode to generate a summary, SEO
        meta tags, and an image for your blog post.
      </p>
    </aside>
  );
}

function Preview({
  summary,
  image,
  SEOMetaTags,
}: {
  summary: string;
  image: string;
  SEOMetaTags: string;
}) {
  return (
    <div className="grid gap-10">
      <div>
        <h2 className="font-bold text-xl">Summary</h2>
        {summary && <div>{summary}</div>}
      </div>
      <div>
        <h2 className="font-bold text-xl">Image</h2>
        {image && (
          <Image
            alt="Generated Image"
            src={image}
            width={512}
            height={512}
          />
        )}
      </div>
      <div>
        <h2 className="font-bold text-xl">SEO</h2>

        {SEOMetaTags && (
          <div>
            <code>{SEOMetaTags}</code>
          </div>
        )}
      </div>
    </div>
  );
}
