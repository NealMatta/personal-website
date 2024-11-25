'use client';
type Commit = {
  sha: string;
  commit: {
    author: {
      name: string;
      date: string;
    };
    message: string;
  };
};

export const fetchCommits = async (): Promise<Commit[]> => {
  const url = `https://api.github.com/repos/NealMatta/personal-website/commits`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch commits: ${response.statusText}`);
  }

  return response.json();
};
