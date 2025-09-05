import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { message, sessionId } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // In a real implementation, this would call an AI service like OpenAI
    // For now, we'll return a mock response
    const mockResponse = generateMockResponse(message)

    // Save or update the session
    const sessionData = {
      user_id: user.id,
      messages: [
        { role: "user", content: message, timestamp: new Date() },
        { role: "assistant", content: mockResponse, timestamp: new Date() },
      ],
      updated_at: new Date().toISOString(),
    }

    if (sessionId) {
      // Update existing session
      const { error } = await supabase
        .from("mentor_sessions")
        .update(sessionData)
        .eq("id", sessionId)
        .eq("user_id", user.id)
    } else {
      // Create new session
      const { error } = await supabase.from("mentor_sessions").insert({
        ...sessionData,
        session_summary: `Discussion about ${message.slice(0, 50)}...`,
      })
    }

    return NextResponse.json({ response: mockResponse })
  } catch (error) {
    console.error("Error in mentor chat:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function generateMockResponse(message: string): string {
  const responses = [
    "That's an excellent question! Based on current industry trends, I'd recommend focusing on building practical projects that demonstrate your skills. Consider creating a portfolio that showcases your problem-solving abilities.",

    "I understand your concern about career progression. The key is to set clear, measurable goals and break them down into actionable steps. Consistency in learning and networking will accelerate your growth.",

    "Great point about skill development! I'd suggest adopting a T-shaped learning approach - develop deep expertise in one area while maintaining broad knowledge across related fields.",

    "That's a common challenge many professionals face. My advice is to focus on continuous learning and adaptability. The tech industry evolves rapidly, so staying curious and open to new technologies is crucial.",

    "Excellent question about work-life balance! Remember that sustainable career growth requires taking care of your well-being. Set boundaries, take breaks, and celebrate your achievements along the way.",
  ]

  return responses[Math.floor(Math.random() * responses.length)]
}
