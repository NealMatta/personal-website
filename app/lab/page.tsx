import PageIntro from '@/src/components/reusable/UI/PageIntro';
import ExperimentGrid from '@/src/components/pages/Laboratory/ExperimentGrid';
import LabNotebook from '@/src/components/pages/Laboratory/LabNotebook';
import { experimentCounts } from '@/src/content/experiments';

export default function Laboratory() {
  return (
    <>
      <PageIntro
        title="Laboratory"
        description="Where I try APIs, patterns and ideas before they earn a spot on the shelf. Each experiment says what I’m testing, what it runs on, and whether it works yet."
        stats={experimentCounts()}
      />
      <ExperimentGrid />
      <LabNotebook />
    </>
  );
}
