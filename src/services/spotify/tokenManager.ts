import { createClient } from '@supabase/supabase-js';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

// Environment variables
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function saveAccessTokenToSupabase(
  accessToken: string,
  expiryDate: string
) {
  const { error } = await supabase.from('spotify_tokens').upsert({
    id: 1,
    access_token: accessToken,
    expiry_date: expiryDate,
  });

  if (error) {
    console.error('Error saving access token to Supabase:', error);
    throw error;
  }

  console.log('SUCCESS - Access token saved to Supabase');
}

async function getAccessTokenFromSupabase() {
  const { data, error } = await supabase
    .from('spotify_tokens')
    .select('access_token, expiry_date')
    .eq('id', 1)
    .single();

  if (error) {
    console.error('Error fetching access token from Supabase:', error);
    throw error;
  }

  return data;
}

// Checks validity of access token
export function accessTokenValid(expiryDate: string): boolean {
  const now = new Date();
  const expiry = new Date(expiryDate);
  return now < expiry;
}

// Refreshes access token
// TODO: Implement retries or fallback mechanisms in case the token refresh fails
export async function refreshAccessToken(): Promise<string> {
  try {
    const response = await fetch(SPOTIFY_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }

    const data = await response.json();
    const newAccessToken = data.access_token;

    console.log('SUCCESS - Access Token Refreshed!');
    return newAccessToken;
  } catch (error) {
    console.error(
      'Error refreshing access token:',
      error instanceof Error ? error.message : error
    );
    throw error; // Propagate the error to stop further retries
  }
}

export async function getAccessToken(): Promise<string> {
  const tokenData = await getAccessTokenFromSupabase();

  if (tokenData && accessTokenValid(tokenData.expiry_date)) {
    return tokenData.access_token;
  }

  const newAccessToken = await refreshAccessToken();
  await saveAccessTokenToSupabase(
    newAccessToken,
    new Date(Date.now() + 3600 * 1000).toISOString()
  );
  console.log('SUCCESS - Grabbed Token');
  return newAccessToken;
}
