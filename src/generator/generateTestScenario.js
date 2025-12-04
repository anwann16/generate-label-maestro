import fs from "fs";

export function generateYamlFromScenario(scenario, summary, jiraIssue) {
  // Build YAML output
  const yamlContent =
    `
- runFlow:
    label: ${scenario} - ${summary}
    when:
      platform: Android
    file: 
    env:
      JIRA_ISSUE: ${jiraIssue}

- runFlow:
    label: ${scenario} - ${summary}
    when:
      platform: iOS
    file: 
    env:
      JIRA_ISSUE: ${jiraIssue}
  `.trim() + "\n";

  fs.writeFileSync("scenario.yaml", yamlContent);
}
