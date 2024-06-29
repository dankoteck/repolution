import { Octokit } from "@octokit/core";

declare global {
  namespace globalThis {
    var octokit: Octokit;
  }
}
