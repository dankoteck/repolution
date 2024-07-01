"use server";

import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

export const getRepos = async (username: string) => {
  const response = await octokit.request("GET /users/{username}/repos", {
    username:'shadcn-ui',
    per_page: 5,
    sort: "updated",
  });
  return response.data;
};

export const getRepoById = async (owner: string, repo: string) => {
  const response = await octokit.request("GET /repos/{owner}/{repo}", {
    owner: 'shadcn-ui',
    repo,
  });
  return response.data;
};
export type RepoDetails = Awaited<ReturnType<typeof getRepoById>>;

export const getRepoIssues = async (owner: string, repo: string) => {
  const response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner: 'shadcn-ui',
    repo,
    state: "all",
    per_page: 1000,
    sort: "updated",
  });
  return response.data;
};
export type Issues = Awaited<ReturnType<typeof getRepoIssues>>;

export const getRepoBranches = async (owner: string, repo: string) => {
  const response = await octokit.request("GET /repos/{owner}/{repo}/branches", {
    owner: 'shadcn-ui',
    repo,
    per_page: 100,
  });
  return response.data;
};

export const getPullRequests = async (username: string, repo: string) => {
  const response = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
    owner: username,
    repo,
    state: "open",
    per_page: 5,
    sort: "updated",
  });
  return response.data;
};
