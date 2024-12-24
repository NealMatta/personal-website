import PageHeader from '@/src/components/PageHeader/PageHeader';
import { Project } from '@/src/types/';
import BarebonesCard from '@/src/components/cards/BarebonesCard';
import ProjectTags from '@/src/components/Projects/ProjectTags';
import { getProject } from '@/src/services/projects/project';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectID: string }>;
}) {
  const projectID = (await params).projectID;
  const projectData = await getProject(projectID);

  // Map data to match the Project type
  const projectExample: Project = {
    id: projectData.id,
    title: projectData.title,
    tags: projectData.tags,
    featured: projectData.featured,
    description: projectData.description,
    details: projectData.projectdetails,
    images: projectData.projectimages,
  };

  return (
    <div>
      <PageHeader
        header={projectExample.title}
        subHeader={projectExample.description}
      />
      <div className="mt-2">
        <div className="flex flex-wrap gap-x-3">
          <ProjectTags tags={projectExample.tags} />
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {projectExample.details
            .sort((a, b) => a.order - b.order) // Sort by the 'order' property
            .map((detail) => (
              <BarebonesCard key={detail.id}>
                <h3 className="font-bold text-lg mb-2">{detail.title}</h3>
                <p>{detail.detail}</p>
              </BarebonesCard>
            ))}
        </div>

        {/* Images */}
        <div className="flex-1 space-y-4">
          {projectExample.images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full bg-gray-200 rounded-md overflow-hidden"
            >
              <img
                src={image}
                alt={`Project Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
