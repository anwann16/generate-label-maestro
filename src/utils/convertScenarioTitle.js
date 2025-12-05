// export function convertScenarioTitle(text, isScenario) {
//   const lines = text.split("\n").map((l) => l.trim());

//   // Regex ignore-case untuk masing-masing mode
//   const scenarioRegex = /^scenario\s*:/i;
//   const testCaseRegex = /^test\s*case\s*:/i;

//   let regexToUse = isScenario ? scenarioRegex : testCaseRegex;

//   const idx = lines.findIndex((l) => regexToUse.test(l));
//   if (idx === -1) return null;

//   return lines[idx].replace(regexToUse, "").trim();
// }

export function convertScenarioTitle(text, isScenario) {
  // Bersihkan semua karakter aneh
  const cleaned = text
    .replace(/\ufeff/g, "") // BOM
    .replace(/\r/g, "") // CR
    .trim();

  const lines = cleaned.split("\n").map((l) => l.trim());

  // Pilih regex berdasarkan type
  const inlineRegex = isScenario
    ? /^scenario\s*:\s*(.+)$/i
    : /^test\s*case\s*:\s*(.+)$/i;

  const blockRegex = isScenario
    ? /^scenario\s*:\s*$/i
    : /^test\s*case\s*:\s*$/i;

  // 1) Cari format inline: `Scenario: Judul`
  for (const line of lines) {
    const match = line.match(inlineRegex);
    if (match) return match[1].trim();
  }

  // 2) Cari format block: `Scenario:` lalu judul di next line
  for (let i = 0; i < lines.length; i++) {
    if (blockRegex.test(lines[i])) {
      // cari baris berikut sampai ketemu teks pertama yang tidak kosong
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].trim() !== "") {
          return lines[j].trim();
        }
      }
    }
  }

  return null;
}
