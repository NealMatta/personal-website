import type { Metadata } from 'next';
import PageIntro from '@/src/components/reusable/UI/PageIntro';
import LatestNote from '@/src/components/pages/Writing/LatestNote';
import NoteArchive from '@/src/components/pages/Writing/NoteArchive';
import SubscribeCard from '@/src/components/pages/Writing/SubscribeCard';
import { publishedPosts, postTopics } from '@/src/content/posts';

export const metadata: Metadata = {
  title: 'Field notes — Neal Matta',
  description:
    'Notes on architecture, APIs and staying organized. Each one links back to the project or experiment it’s about.',
};

export default function Writing() {
  const posts = publishedPosts();
  const [latest] = posts;

  return (
    <>
      <PageIntro
        title="Field notes"
        description="Notes on architecture, APIs and staying organized. Each one links back to the project or experiment it’s about."
        aside={<SubscribeCard />}
      />

      {latest && <LatestNote post={latest} />}

      {/* The archive lists everything, the latest note included: the card
          above is where you land, this is where you look something up. */}
      <NoteArchive posts={posts} topics={postTopics()} />
    </>
  );
}
