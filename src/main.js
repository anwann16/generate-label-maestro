import { getAuthHeader } from "./jira/auth.js";
import { getSummary } from "./jira/getSummary.js";
import { getIssueId } from "./jira/getIssueId.js";
import { getScenario } from "./jira/getScenario.js";
import { getTestSteps } from "./jira/getStepJira.js";

import { writeToFile } from "./utils/fileWriter.js";
import { convertStepsToText } from "./utils/convertTestStep.js";

import { generateYamlFromInput } from "./generator/generateYaml.js";
import { convertScenarioTitle } from "./utils/convertScenarioTitle.js";
import { ISSUE_KEY, JIRA_PASSWORD, JIRA_USERNAME } from "./utils/constans.js";
import { generateYamlFromScenario } from "./generator/generateTestScenario.js";

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
    // Get IssueId
    console.log(`🔍 Fetching IssueId for ${ISSUE_KEY} ...`);
    const issueId = await getIssueId(ISSUE_KEY, authHeader);
    console.log(`✔ IssueId: ${issueId}`);

    // Get Test Steps
    console.log("📥 Fetching Test Steps...");
    const steps = await getTestSteps(issueId, authHeader);

    // Get Summary & Test Scenario
    console.log("📥 Fetching Summary & Test Scenario");
    const scenarioResponse = await getScenario(ISSUE_KEY, authHeader);
    const summary = await getSummary(ISSUE_KEY, authHeader);

    // Filter Test Scenario
    // if true label on scenario.yaml = Scenario,
    // if else label on scenario.yaml = Test Case
    const scenario = convertScenarioTitle(scenarioResponse, true);

    // Convert Test Steps to Text
    console.log("📝 Converting steps → input.txt...");
    const text = convertStepsToText(steps);
    writeToFile("input.txt", text);

    // Generate YAML for Test Scenario
    console.log("📝 Converting Test Scenario → scenario.yaml...");
    generateYamlFromScenario(scenario, summary, ISSUE_KEY);

    // Generate YAML for Test Case
    console.log("⚙️ Generating YAML...");
    generateYamlFromInput("input.txt");

    console.log("🎉 DONE! output.yaml is ready.");
  } catch (err) {
    console.error("❌ ERROR:", err.message);
  }
}

run();
