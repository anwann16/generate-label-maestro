import { getAuthHeader } from "./jira/auth.js";
import { getIssueId } from "./jira/getIssueId.js";
import { getTestSteps } from "./jira/getStepJira.js";

import { writeToFile } from "./utils/fileWriter.js";
import { convertStepsToText } from "./utils/convertTestStep.js";

import { generateYamlFromInput } from "./generator/generateYaml.js";
import { ISSUE_KEY, JIRA_PASSWORD, JIRA_USERNAME } from "./utils/constans.js";

// -------------------------------------------------------------------

if (!ISSUE_KEY) {
  console.error("❌ Masukkan issueKey. Contoh: npm run start MPAAS-9439");
  process.exit();
}

// Jira Credentials
const USERNAME = JIRA_USERNAME;
const PASSWORD = JIRA_PASSWORD;

const authHeader = getAuthHeader(USERNAME, PASSWORD);

// -------------------------------------------------------------------

async function run() {
  try {
    console.log(`🔍 Fetching IssueId for ${ISSUE_KEY} ...`);
    const issueId = await getIssueId(ISSUE_KEY, authHeader);
    console.log(`✔ IssueId: ${issueId}`);

    console.log("📥 Fetching Test Steps...");
    const steps = await getTestSteps(issueId, authHeader);

    console.log("📝 Converting steps → input.txt...");
    const text = convertStepsToText(steps);
    writeToFile("input.txt", text);

    console.log("⚙️ Generating YAML...");
    generateYamlFromInput("input.txt");

    console.log("🎉 DONE! output.yaml is ready.");
  } catch (err) {
    console.error("❌ ERROR:", err.message);
  }
}

run();
