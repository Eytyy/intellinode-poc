import { useBlog } from '@/store/Blog';

import BlogEditor from '@/components/blog-editor';
import BlogGhostWriter from '@/components/blog-ghost-writer';
import { BlogLayout } from '@/components/layouts';

export default function Blog() {
  const { ghostMode } = useBlog();
  return <>{ghostMode ? <BlogGhostWriter /> : <BlogEditor />}</>;
}

Blog.getLayout = function getLayout(page: React.ReactElement) {
  return <BlogLayout {...page.props}>{page}</BlogLayout>;
};
