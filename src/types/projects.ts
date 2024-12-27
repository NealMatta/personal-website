import { Database } from '@/src/types/supabase';

export type Project = Database['public']['Tables']['projects']['Row'];
export type ProjectWithDetails = Project & {
  projectimages: Database['public']['Tables']['projectimages']['Row'][];
  projectdetails: Database['public']['Tables']['projectdetails']['Row'][];
};
