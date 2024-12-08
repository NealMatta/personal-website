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
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 30);

  const isoDate = oneWeekAgo.toISOString();
  const perPage = 100; // Maximum allowed by GitHub
  let page = 1;
  let allCommits: Commit[] = [];
  let hasMore = true;

  while (hasMore) {
    const url = `https://api.github.com/repos/NealMatta/personal-website/commits?since=${isoDate}&per_page=${perPage}&page=${page}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch commits: ${response.statusText}`);
    }

    const commits: Commit[] = await response.json();
    allCommits = allCommits.concat(commits);

    // If the returned commits are less than perPage, we've reached the last page
    hasMore = commits.length === perPage;
    page++;
  }

  return allCommits;
};
