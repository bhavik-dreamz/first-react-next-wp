export default class FinanceRAGAgent {
  constructor(options = {}) {
    const { mongoDbName = "finance_assistant", maxHistoryLength = 20 } = options;
    this.mongoDbName = mongoDbName;
    this.maxHistoryLength = maxHistoryLength;
    this.sessionIdToHistory = new Map();
  }

  async chatWithFinanceHistory(sessionId, message) {
    if (!sessionId) {
      throw new Error("sessionId is required");
    }
    if (!message || typeof message !== "string") {
      throw new Error("message is required");
    }

    const history = this.sessionIdToHistory.get(sessionId) || [];
    history.push({ role: "user", content: message, at: new Date().toISOString() });

    while (history.length > this.maxHistoryLength) {
      history.shift();
    }

    const reply = this.generateSimpleReply(message);
    history.push({ role: "assistant", content: reply, at: new Date().toISOString() });

    this.sessionIdToHistory.set(sessionId, history);

    return {
      sessionId,
      reply,
      history,
      meta: {
        mongoDbName: this.mongoDbName,
        historyLength: history.length,
        maxHistoryLength: this.maxHistoryLength,
      },
    };
  }

  generateSimpleReply(userMessage) {
    // Placeholder for real RAG logic; replace with vector search + LLM call
    if (/balance|portfolio|holdings/i.test(userMessage)) {
      return "I can help analyze your portfolio. Please provide tickers and quantities.";
    }
    if (/stock|ticker|equity/i.test(userMessage)) {
      return "Which ticker are you interested in?";
    }
    if (/help|what can you do/i.test(userMessage)) {
      return "I can answer finance questions and keep chat history per session. Ask about tickers, portfolios, or market concepts.";
    }
    return `You said: "${userMessage}"`;
  }
}