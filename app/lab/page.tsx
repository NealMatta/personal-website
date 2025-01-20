import AllPlaygroundCards from '@/src/components/pages/Laboratory/AllExperiments';
import PageHeader from '@/src/components/reusable/pageHeader/PageHeader';

export default function Playground() {
  return (
    <>
      <PageHeader
        header={'The Experiment Zone'}
        subHeader={'A Space to Tinker, Test, and Learn'}
      />
      <div className="grid gap-4 my-4 grid-cols-1 sm:grid-cols-3 ">
        <AllPlaygroundCards />
      </div>
    </>
  );
}
