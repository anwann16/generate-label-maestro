export const JIRA_DOMAIN = "https://jira.bni.co.id";

export function getAuthHeader(username, password) {
  return "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
}
