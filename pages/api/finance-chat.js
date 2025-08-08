// import FinanceRAGAgent from "../../agent/FinanceRAGAgent";

// const financeAgent = new FinanceRAGAgent({
//   mongoDbName: 'finance_assistant',
//   maxHistoryLength: 20
// });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, sessionId } = req.body;

  if (!message || !sessionId) {
    return res.status(400).json({
      error: "Message and sessionId are required"
    });
  }

  try {
    // Use sessionId for chat history and context
    // const result = await financeAgent.chatWithFinanceHistory(
    //   sessionId,
    //   message
    // );
    
    // Placeholder response until FinanceRAGAgent is implemented
    const result = {
      response: "Finance agent is not yet implemented",
      sessionId: sessionId
    };
    
    return res.status(200).json(result);
  } catch (error) {
    console.error("Finance chat error:", error);
    return res.status(500).json({
      error: error.message || "Internal Server Error"
    });
  }
}