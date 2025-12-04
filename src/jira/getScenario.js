import axios from "axios";
import { JIRA_BASE_URL } from "../utils/constans.js";

export async function getScenario(issueKey, authHeader) {
  const res = await axios.get(`${JIRA_BASE_URL}/rest/api/2/issue/${issueKey}`, {
    headers: {
      Authorization: authHeader,
      Accept: "application/json",
    },
  });

  return res.data.fields.description;
}
