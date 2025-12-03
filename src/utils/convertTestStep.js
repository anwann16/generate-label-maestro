export function convertStepsToText(steps) {
  return steps
    .map((item) => {
      const step = item.step?.trim() || "";
      const result =
        item.result?.replace(/\n/g, " ").replace(/\s+/g, " ").trim() || "";

      return `${step}\n${result}`;
    })
    .join("\n\n");
}
