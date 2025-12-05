import { getAuthHeader } from "./jira/auth.js";
import { getIssueId } from "./jira/getIssueId.js";
import { getTestSteps } from "./jira/getStepJira.js";
import { getIssueKeys } from "./jira/getIssueKeys.js";

import { writeToFile } from "./utils/fileWriter.js";
import { convertStepsToText } from "./utils/convertTestStep.js";

import { generateYamlFromInput } from "./generator/generateYaml.js";
import { JIRA_PASSWORD, JIRA_USERNAME, LABELS } from "./utils/constans.js";
import { generateYamlFromScenario } from "./generator/generateTestScenario.js";

// -------------------------------------------------------------------

// Jira Credentials
const USERNAME = JIRA_USERNAME;
const PASSWORD = JIRA_PASSWORD;

const authHeader = getAuthHeader(USERNAME, PASSWORD);

// Jika TYPE = TS, maka akan membuat Test Scenario
// Jika TYPE = TC, maka akan membuat Test Case
const TYPE = process.argv[2];

// Gunakan issueKey jika ingin generate Test Case, contoh: npm run start TC MPAAS-1234
const ISSUE_KEY = process.argv[3];

if (TYPE === "TC" && !ISSUE_KEY) {
  console.error("❌ Masukkan issueKey. Contoh: npm run start TC MPAAS-1234");
  process.exit();
}

// Filter Test Scenario
// if true label on file yaml = Scenario,
// if else label on file yaml = Test Case
const isScenario = true;

// -------------------------------------------------------------------

async function run() {
  try {
    switch (TYPE) {
      case "TS":
        // Get All Issue Keys
        const res = await getIssueKeys(authHeader, isScenario);

        // Generate YAML for Test Scenario
        console.log("📝 Converting Test Scenario to yaml...");
        generateYamlFromScenario(res);
        console.log(`🎉 DONE! ${LABELS}.yaml is ready.`);
        break;
      case "TC":
        // Get IssueId
        console.log(`🔍 Fetching IssueId for ${ISSUE_KEY} ...`);
        const issueId = await getIssueId(ISSUE_KEY, authHeader);
        console.log(`✔ IssueId: ${issueId}`);

        // Get Test Steps
        console.log("📥 Fetching Test Steps...");
        const steps = await getTestSteps(issueId, authHeader);

        // Convert Test Steps to Text
        console.log("📝 Converting steps → input.txt...");
        const text = convertStepsToText(steps);
        writeToFile("input.txt", text);

        // Generate YAML for Test Case
        console.log("⚙️ Generating YAML...");
        generateYamlFromInput("input.txt");
        console.log("🎉 DONE! output.yaml is ready.");
        break;
      default:
        console.error("❌ Type tidak sesuai");
        break;
    }
  } catch (err) {
    console.error("❌ ERROR:", err.message);
  }
}

run();
