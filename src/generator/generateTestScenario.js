import fs from "fs";
import path from "path";

import { FILE_LOCATION, LABELS } from "../utils/constans.js";

export function generateYamlFromScenario(response) {
  const outputDir = path.join(process.cwd(), "output"); // folder di root project

  // Buat folder kalau belum ada
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let finalOutput = "";

  // Build YAML output
  response.map((item) => {
    const yamlContent =
      `
- runFlow:
    label: ${item.description} - ${item.issueSummary}
    when:
      platform: Android
    file: ${FILE_LOCATION}/Android/${item.issueSummary}.yml
    env:
      JIRA_ISSUE: ${item.issueKey}
- runFlow:
    label: ${item.description} - ${item.issueSummary}
    when:
      platform: iOS
    file: ${FILE_LOCATION}/iOS/${item.issueSummary}.yml
    env:
      JIRA_ISSUE: ${item.issueKey}
`.trim() + "\n";

    finalOutput += yamlContent + "\n";
  });

  const filePath = path.join(outputDir, `${LABELS}.yaml`);
  fs.writeFileSync(filePath, finalOutput);
}
