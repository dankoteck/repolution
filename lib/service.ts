"use server";

import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

export const getRepos = async (username: string) => {
  const response = await octokit.request("GET /users/{username}/repos", {
    username,
    per_page: 5,
    sort: "updated",
  });
  return response.data;
};
