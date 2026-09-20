export interface GitHubOwner {
  login: string;
  avatar_url: string;
}

export interface GitHubRepo {
  id: number;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  open_issues_count: number;
  updated_at: string;
  pushed_at: string;
  owner: GitHubOwner;
  topics: string[];
}

export interface GitHubSearchResponse<T> {
  total_count: number;
  incomplete_results: boolean;
  items: T[];
}

export interface GitHubErrorBody {
  message: string;
  documentation_url?: string;
}

export interface GitHubUserSignature {
  name: string;
  email: string;
  date: string;
}

export interface GitHubCommit {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: GitHubUserSignature | null;
    committer: GitHubUserSignature | null;
  };
}
