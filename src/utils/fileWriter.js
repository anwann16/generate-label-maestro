import fs from "fs";

export function writeToFile(filename, content) {
  fs.writeFileSync(filename, content, "utf8");
  console.log(`📄 File saved → ${filename}`);
}
