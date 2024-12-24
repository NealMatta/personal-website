// Fetch project data from Supabase
import supabase from '@/src/lib/supabaseClient';
// import { Project as ProjectType } from '@/src/types';

export async function getProject(projectID: string) {
  const { data, error } = await supabase
    .from('projects')
    .select(
      `
  *,
  projectimages(*),
  projectdetails(*)
`
    )
    .eq('id', projectID)
    .single();

  if (error) {
    console.error('Error fetching project data:', error.message);
    throw error;
  }

  return data;
}
