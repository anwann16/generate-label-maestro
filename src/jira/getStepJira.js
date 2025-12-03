import axios from "axios";
import { JIRA_BASE_URL } from "../utils/constans.js";

export async function getTestSteps(issueId, authHeader) {
  const res = await axios.get(
    `${JIRA_BASE_URL}/rest/zapi/latest/teststep/${issueId}`,
    {
      headers: {
        Authorization: authHeader,
        Accept: "application/json",
      },
    }
  );

  return res.data.stepBeanCollection;
}
