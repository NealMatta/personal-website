import PageHeader from '@/src/components/reusable/pageHeader/PageHeader';
import BarebonesCard from '@/src/components/reusable/cards/BarebonesCard';
import ProjectTags from '@/src/components/pages/Projects/ProjectTags';
import { getProject } from '@/src/apiManagement/projects/project';
import Image from 'next/image';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectID: string }>;
}) {
  const projectID = (await params).projectID;
  const project = await getProject(projectID);

  return (
    <div>
      <PageHeader header={project.title} subHeader={project.description!} />
      <div className="mt-2">
        <div className="flex flex-wrap gap-x-3">
          <ProjectTags tags={project.tags} />
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {project.projectdetails
            .sort((a, b) => a.order! - b.order!) // Sort by the 'order' property
            .map((detail) => (
              <BarebonesCard key={detail.id}>
                <h3 className="font-bold text-lg mb-2">{detail.title}</h3>
                <p>{detail.detail}</p>
              </BarebonesCard>
            ))}
        </div>

        {/* Images */}
        <div className="flex-1 space-y-4">
          {project.projectimages.map((image, index) => (
            <div key={index} className="rounded-md overflow-hidden">
              <Image
                src={image.url}
                alt={image.url}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
