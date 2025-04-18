// Fetch project data from Supabase
import supabase from '@/src/lib/supabase/db/supabaseClient';
import { notFound } from 'next/navigation';
import { PostgrestError } from '@supabase/supabase-js';
import { Project, ProjectWithDetails } from '@/src/types';

export async function getProject(projectID: string) {
  const {
    data,
    error,
  }: { data: ProjectWithDetails | null; error: PostgrestError | null } =
    await supabase
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
    console.error(
      'Error fetching project data:',
      error.message || error.details || 'Unknown error'
    );
    throw error;
  }

  return data;
}

export async function getAllProjects() {
  const {
    data,
    error,
  }: { data: Project[] | null; error: PostgrestError | null } = await supabase
    .from('projects')
    .select('*');

  if (error) {
    console.error(
      'Error fetching project data:',
      error.message || error.details || 'Unknown error'
    );
    throw error;
  }

  return data;
}
