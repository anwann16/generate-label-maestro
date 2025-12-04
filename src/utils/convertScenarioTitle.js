export function convertScenarioTitle(text, isScenario) {
  const lines = text.split("\n").map((l) => l.trim());

  // Regex ignore-case untuk masing-masing mode
  const scenarioRegex = /^scenario\s*:/i;
  const testCaseRegex = /^test\s*case\s*:/i;

  let regexToUse = isScenario ? scenarioRegex : testCaseRegex;

  const idx = lines.findIndex((l) => regexToUse.test(l));
  if (idx === -1) return null;

  return lines[idx].replace(regexToUse, "").trim();
}
