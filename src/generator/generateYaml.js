import fs from "fs";

export function generateYamlFromInput(path) {
  // BACA isi file input.txt
  const data = fs.readFileSync(path, "utf8");
  let lines = data
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  let steps = [];

  for (let i = 0; i < lines.length; i += 2) {
    steps.push({
      step: lines[i].replace(/:/g, ";"),
      result: (lines[i + 1] || "").replace(/:/g, ";"),
    });
  }

  let output = "";
  let counter = 1;

  steps.forEach((item) => {
    output += `- runFlow:\n`;
    output += `    label: ${String(counter).padStart(2, "0")} - ${item.step}\n`;
    output += `    commands: \n`;
    counter++;

    output += `- runFlow:\n`;
    output += `    label: ${String(counter).padStart(2, "0")} - ${
      item.result
    }\n`;
    output += `    commands: \n\n`;
    counter++;
  });

  // TULIS KE FILE output.yaml
  fs.writeFileSync("output.yaml", output);
}
