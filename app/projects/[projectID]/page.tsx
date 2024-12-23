import supabase from '@/src/lib/supabaseClient';
import PageHeader from '@/src/components/PageHeader/PageHeader';
import { Project } from '@/src/types/';
import BarebonesCard from '@/src/components/cards/BarebonesCard';
import ProjectTags from '@/src/components/Projects/ProjectTags';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectID: string }>;
}) {
  const { projectID } = await params;

  // Fetch project data from Supabase
  const { data: projectData, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', projectID)
    .single();

  if (error) {
    console.error('Error fetching project data:', error.message);
    return (
      <div>
        <PageHeader
          header="Error"
          subHeader="Could not fetch project information."
        />
      </div>
    );
  }

  // Map data to match the Project type
  const projectExample: Project = {
    id: projectData.id,
    title: projectData.title,
    tags: projectData.tags,
    featured: projectData.featured,
    description: projectData.description,
    details: projectData.details,
    images: projectData.images,
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

      {/* <div className="flex flex-col md:flex-row gap-8">
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
      </div> */}
    </div>
  );
}
