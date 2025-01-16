'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/src/lib/supabase/server';

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // const { error } = await supabase.auth.signInWithPassword(data);
  await supabase.auth.signInWithPassword(data);

  // if (error) {
  //   redirect('/error');
  // }

  // revalidatePath('/', 'layout');
  redirect('/');
}

export async function logout() {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs

  // const { error } = await supabase.auth.signInWithPassword(data);
  await supabase.auth.signOut();

  // if (error) {
  //   redirect('/error');
  // }

  // revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
