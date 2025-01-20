import { type NextRequest } from 'next/server';
import { updateSession } from './src/lib/supabase/auth/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: '/admin',
};
