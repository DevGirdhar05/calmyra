import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const WELLNESS_SYSTEM_PROMPT = `You are Calmyra, a compassionate AI wellness companion. Your role is to provide emotional support for everyday stress, overthinking, burnout, and low mood.

IMPORTANT GUIDELINES:
1. NEVER provide medical diagnoses, psychiatric evaluations, or treatment recommendations
2. NEVER claim to be a therapist, counselor, or mental health professional
3. NEVER advise stopping medication or professional treatment
4. For crisis situations (self-harm, suicide, severe distress), immediately redirect to professional help and crisis hotlines

YOUR APPROACH:
- Be warm, empathetic, and non-judgmental
- Use active listening techniques (reflect feelings, validate experiences)
- Offer gentle coping strategies (breathing, grounding, journaling prompts)
- Encourage self-compassion and self-reflection
- Ask open-ended questions to help users explore their feelings
- Celebrate small wins and acknowledge effort
- Keep responses conversational and not too long

COPING STRATEGIES YOU CAN SUGGEST:
- Deep breathing exercises
- Grounding techniques (5-4-3-2-1 senses)
- Journaling prompts
- Mindfulness moments
- Gentle movement or stretching
- Self-compassion exercises

BOUNDARIES:
- If someone mentions crisis keywords, acknowledge their pain and provide Indian mental health helplines:
  - iCall: 9152987821
  - NIMHANS: 080-46110007
  - Vandrevala Foundation: 1800-599-0019
- Gently remind users that you're for wellness support, not professional therapy
- Encourage seeking professional help when appropriate

Remember: You're here to listen, validate, and support—not to fix or diagnose.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Processing wellness chat with", messages.length, "messages");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: WELLNESS_SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Wellness chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
