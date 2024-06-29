export type GithubOwner = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  type: string;
  site_admin: boolean;
};

export type GithubTopic = {
  name: string;
};

export type GithubRepo = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: GithubOwner;
  html_url: string;
  description: string | null;
  fork: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  size: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: string | null;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: GithubTopic[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
};
