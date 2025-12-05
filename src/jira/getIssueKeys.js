import he from "he";
import axios from "axios";

import { buildZapiUrl } from "./requestJira.js";
import { convertScenarioTitle } from "../utils/convertScenarioTitle.js";

import {
  JIRA_CYCLE_NAME,
  JIRA_FOLDER_NAME,
  JIRA_PROJECT_NAME,
  JIRA_VERSION_NAME,
  PLATFORM,
  LABELS,
} from "../utils/constans.js";

function stripHtml(html) {
  const clean = html.replace(/<[^>]*>/g, "\n"); // replace tag dengan newline
  return he.decode(clean).trim(); // decode &lt; -> <, &amp; -> &
}

export async function getIssueKeys(authHeader, isScenario) {
  const url = buildZapiUrl(
    JIRA_PROJECT_NAME,
    JIRA_VERSION_NAME,
    JIRA_CYCLE_NAME,
    `${JIRA_FOLDER_NAME} - ${PLATFORM}`,
    LABELS
  );

  const res = await axios.get(url, {
    headers: {
      Authorization: authHeader,
      Accept: "application/json",
    },
  });

  // Pastikan executions ada
  const executions = res.data?.executions || [];

  // Mapping data yang ingin kita ambil
  const details = executions
    .filter((x) => x && x.issueKey) // skip empty object
    .map((x) => {
      const desc = stripHtml(x.issueDescription);
      return {
        issueKey: x.issueKey,
        issueSummary: x.issueSummary,
        description: convertScenarioTitle(desc, isScenario),
      };
    })
    .sort((a, b) => a.issueKey.localeCompare(b.issueKey)); // ascending

  return details;
}
