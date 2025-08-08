import { NextResponse } from "next/server";
// import FinanceRAGAgent from "../../../agent/FinanceRAGAgent";

// const financeAgent = new FinanceRAGAgent({
//   mongoDbName: 'finance_assistant',
//   maxHistoryLength: 20
// });

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, sessionId } = body;

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: "Message and sessionId are required" },
        { status: 400 }
      );
    }

    // Use sessionId for chat history and context
    // const result = await financeAgent.chatWithFinanceHistory(
    //   sessionId,
    //   message
    // );
    
    // Placeholder response until FinanceRAGAgent is implemented
    const result = {
      response: "Finance agent is not yet implemented",
      sessionId: sessionId,
      timestamp: new Date().toISOString()
    };
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("Finance chat error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}