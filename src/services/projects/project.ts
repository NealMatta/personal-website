// Fetch project data from Supabase
import supabase from '@/src/lib/supabaseClient';
import { notFound } from 'next/navigation';
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

  // If data is null, send them to the 404 not found
  if (!data) {
    notFound();
  }
  if (error) {
    console.error('Error fetching project data:', error.message);
    throw error;
  }

  return data;
}
