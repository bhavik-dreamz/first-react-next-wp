import FinanceRAGAgent from "../../../utils/FinanceRAGAgent";

const financeAgent = new FinanceRAGAgent({
  mongoDbName: "finance_assistant",
  maxHistoryLength: 20,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch (e) {
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  const { message, sessionId } = body || {};
  if (!message || !sessionId) {
    return res.status(400).json({ error: "Message and sessionId are required" });
  }

  try {
    const result = await financeAgent.chatWithFinanceHistory(sessionId, message);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Finance chat error:", error);
    return res
      .status(500)
      .json({ error: error?.message || "Internal Server Error" });
  }
}