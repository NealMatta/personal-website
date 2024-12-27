import { Database } from '@/src/types/supabase'; // Adjust the import path as needed

export type Project = Database['public']['Tables']['projects']['Row'];
export type ProjectWithDetails = Project & {
  projectimages: Database['public']['Tables']['projectimages']['Row'][];
  projectdetails: Database['public']['Tables']['projectdetails']['Row'][];
};
