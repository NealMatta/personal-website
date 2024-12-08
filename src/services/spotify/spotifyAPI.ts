// Base URL for Spotify API
const SPOTIFY_API_URL = 'https://api.spotify.com/v1';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

// Environment variables (replace these with your process.env values)
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN!; // Could also move this to supabase as well 

// Access token would be stored in redis alongside the expiration time. That way, I 
const ACCESS_TOKEN = ''; 

async function getCurrentlyPlaying(): Promise<any> {
  try {
    const response = await fetch(`${SPOTIFY_API_URL}/me/player/currently-playing`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    // Pull Redis Access Token and Expiration Time 
    // If the expiration time is greater than the current time, then refresh the token

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching currently playing:", error.message);
    return null; // Return null to indicate failure
  }
}

async function refreshAccessToken(): Promise<void> {
  try {
    const response = await fetch(SPOTIFY_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh access token");
    }

    const data = await response.json();
    // Reset the access token in Redis
    // accessToken = data.access_token;
    console.log("Access token refreshed successfully!");
  } catch (error) {
    console.error("Error refreshing access token:", error.message);
    throw error; // Propagate the error to stop further retries
  }
}