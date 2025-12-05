import { JIRA_BASE_URL } from "../utils/constans.js";

function buildZqlQuery(project, fixVersion, cycleName, folderName, labels) {
  let query = `
    cycleName = "${cycleName}"
    AND fixVersion = "${fixVersion}"
    AND folderName = "${folderName}"
    AND project = "${project}"
  `;

  // Jika labels dikirim → tambahkan
  if (labels) {
    query += ` AND labels = ${labels}`;
  }

  return query;
}

function encodeZqlQuery(zql) {
  return encodeURIComponent(zql.replace(/\s+/g, " ").trim());
}

export function buildZapiUrl(
  project,
  fixVersion,
  cycleName,
  folderName,
  labels
) {
  const zql = buildZqlQuery(project, fixVersion, cycleName, folderName, labels);
  const encoded = encodeZqlQuery(zql);

  return `${JIRA_BASE_URL}/rest/zapi/latest/zql/executeSearch?zqlQuery=${encoded}%20&view=list&searchType=advance&maxRecords=1000`;
}
