import supabase from '@/src/lib/supabase/db/supabaseClient';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

// Environment variables
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!;

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
export async function refreshAccessToken(retries = 3): Promise<string> {
  let attempt = 0;

  while (attempt < retries) {
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
        throw new Error(
          `Failed to refresh access token, status: ${response.status}`
        );
      }

      const data = await response.json();
      console.log('SUCCESS - Access Token Refreshed!');
      return data.access_token;
    } catch (error) {
      attempt++;
      console.error(
        `Attempt ${attempt} - Error refreshing access token: ${error}`
      );
      if (attempt >= retries) throw error; // Exhausted retries
    }
  }

  throw new Error('Failed to refresh access token after multiple attempts');
}

export async function getAccessToken(): Promise<string> {
  const tokenData = await getAccessTokenFromSupabase();

  if (tokenData && accessTokenValid(tokenData.expiry_date)) {
    console.log('SUCCESS - Grabbed Access Token');
    return tokenData.access_token;
  }

  const newAccessToken = await refreshAccessToken();
  await saveAccessTokenToSupabase(
    newAccessToken,
    new Date(Date.now() + 3600 * 1000).toISOString()
  );
  console.log('SUCCESS - Grabbed New Token');
  return newAccessToken;
}
