import "dotenv/config";

export const ISSUE_KEY = process.argv[2];

export const JIRA_USERNAME = process.env.JIRA_USERNAME;
export const JIRA_PASSWORD = process.env.JIRA_PASSWORD;
export const JIRA_BASE_URL = process.env.JIRA_BASE_URL;
