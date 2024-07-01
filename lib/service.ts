"use server";

import { Octokit } from "octokit";

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

export const getRepos = async (username: string) => {
  const response = await octokit.request("GET /users/{username}/repos", {
    username,
    per_page: 5,
    sort: "updated",
  });
  return response.data;
};

export const getRepoById = async (owner: string, repo: string) => {
  const response = await octokit.request("GET /repos/{owner}/{repo}", {
    owner,
    repo,
  });
  return response.data;
};
export type RepoDetails = Awaited<ReturnType<typeof getRepoById>>;

export const getRepoIssues = async (owner: string, repo: string) => {
  const data = await octokit.paginate("GET /repos/{owner}/{repo}/issues", {
    owner,
    repo,
    per_page: 100,
    sort: "updated",
  });
  return data;
};
export type Issues = Awaited<ReturnType<typeof getRepoIssues>>;

export const getRepoBranches = async (owner: string, repo: string) => {
  const response = await octokit.request("GET /repos/{owner}/{repo}/branches", {
    owner,
    repo,
    per_page: 100,
  });
  return response.data;
};

export const getRepoPullRequests = async (owner: string, repo: string) => {
  const data = await octokit.paginate("GET /repos/{owner}/{repo}/pulls", {
    owner,
    repo,
    per_page: 100,
  });
  return data;
};
export type PullRequests = Awaited<ReturnType<typeof getRepoPullRequests>>;

export const getRepoActionRuns = async (owner: string, repo: string) => {
  const data = await octokit.request("GET /repos/{owner}/{repo}/actions/runs", {
    owner,
    repo,
    per_page: 5,
  });
  return data.data;
};
export type ActionRuns = Awaited<ReturnType<typeof getRepoActionRuns>>;

export const getRepoDeployments = async (owner: string, repo: string) => {
  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/deployments",
    {
      owner,
      repo,
      per_page: 5,
    },
  );

  return response.data;
};
export type Deployments = Awaited<ReturnType<typeof getRepoDeployments>>;

export const getRepoDeploymentsStatus = async (
  owner: string,
  repo: string,
  deploymentId: number,
) => {
  const response = await octokit.request(
    "GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses",
    { owner, repo, deployment_id: deploymentId },
  );

  return response.data[0];
};
