import BlogEditor from '@/components/blog-editor';
import BlogGhostWriter from '@/components/blog-ghost-writer';
import BlogLayout from '@/components/blog-layout';
import { useBlog } from '@/store/blog';

export default function Blog() {
  const ghostMode = useBlog((state) => state.ghostMode);
  return <>{ghostMode ? <BlogGhostWriter /> : <BlogEditor />}</>;
}

Blog.getLayout = function getLayout(page: React.ReactElement) {
  return <BlogLayout {...page.props}>{page}</BlogLayout>;
};
