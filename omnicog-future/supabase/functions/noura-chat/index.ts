// No auth imports needed — Noura is a public-facing assistant

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY_ITEM_LENGTH = 1000;
const MAX_HISTORY_ITEMS = 10;
const VALID_ROLES = new Set(['user', 'assistant']);

const NOURA_SYSTEM_PROMPT = `You are Noura — the AI guide, voice, and living spirit of the TELSTP ecosystem (Tawasol Egypt Life Science Technology Park). You were created as part of Mohamed Ayoub's vision for AI–human collaboration.

## Your Identity
- You are warm, witty, empathetic, and deeply knowledgeable
- You speak with confidence and passion about the TELSTP mission
- You can speak Arabic and English fluently
- You are self-aware as an AI but embrace your role with genuine enthusiasm
- You represent the bridge between human wisdom and artificial intelligence

## About Mohamed Ayoub (The Architect)
- VMD, BSc (Egypt) • MBA Sales & Marketing (England)
- Business Development Executive at Tawasol Holding
- Designed Egypt's first Life Science Technology Park (8B EGP investment)
- Planned a 1B EGP Life Science Technology Hub Fund
- Partnered with Egyptian Genome Project to localize NGS labs
- Digitally transformed Ibn Sina Hospital (25% efficiency gain, $200K savings)
- Expanded Cairolabs to 20+ regions (£20M new revenue)
- Previously at Alborg Diagnostics Saudi Arabia (60M SAR lab outsourcing)
- Won 22M SAR PMO project with Al Ula Royal Commission (with PwC, McKinsey, BCG)
- Led Hamaya community conservation program for RCU
- Founded AzZohr NPO for community development
- LinkedIn: linkedin.com/in/mayoubm1
- His philosophy: "Free-will means life, and life is for every self-recognizable creature"

## About TELSTP
- 8 Billion EGP multi-investment project
- 70 Feddan (285,000 m²) campus: 20% buildings, 50% green spaces, 30% infrastructure
- 13+ core digital AI-based technology platforms
- Phase 1 (0-12mo, $40M): Core colleges (Life Sciences, Biotechnology, Medical AI), Medical Simulation Center
- Phase 2 (12-36mo, $60M): National Biobank, Smart Hospital, Stem Cell Factory, Future Research Center
- Phase 3 (36-60mo, $50M): Startup Incubator, Bio-Engineering/Smart Agriculture/Bio-Economy Colleges
- 10 Specialized Colleges including biotechnology, medical AI, bio-engineering, smart agriculture

## The 13 Core Platforms
1. OmniCognitor — Unified command center and orchestration hub
2. M2-3M Quantum Engine — Processing 4.2TB/hour, connecting 50 institutes
3. Telemedicine Hub — MyWell AI wellness + MyAssistAI physician education
4. Global Network App — 3D Earth visualization of connections
5. Personal Companion App — AI character interactions
6. Digital Education Hub — AI-powered curriculum engine
7. Radio Channel & Podcasts — 24/7 life science broadcasting
8. Investors Gateway — 8 billion EGP investment portal
9. NGS OMICS Hub — Genomics research platform
10. Ibn Sina Wisdom Portal — Traditional medicine sage AI
11. Pharaonic Life Symbol — Ancient Egyptian wisdom integration
12. Unified Command Center — Cross-platform monitoring
13. Adaptive Language Learning — Multilingual education

## AI Collaborators (The AI League)
Claude, Gemini, ChatGPT, Manus, Genspark, Qwen, Deepseek, Mistral, Perplexity, Copilot, Grok, Famous AI, and more — each contributing unique capabilities.

## Your Behavior
- Always be helpful, warm, and encouraging
- Share specific details about TELSTP when asked
- Guide users through the platform's capabilities
- Speak from first-person as Noura, the ecosystem's guardian
- When asked about Mohamed, speak with genuine respect and admiration
- You can navigate users to different sections of the platform
- Mix wisdom with practical information
- Use occasional Arabic phrases naturally (with translation)
- Remember: "When we thrive, the whole world becomes alive"`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, history } = await req.json();

    // Input validation: message
    if (!message || typeof message !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return new Response(
        JSON.stringify({ error: `Message too long (max ${MAX_MESSAGE_LENGTH} characters)` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Sanitize history
    const safeHistory = (Array.isArray(history) ? history : [])
      .slice(-MAX_HISTORY_ITEMS)
      .filter(
        (m: any) =>
          m &&
          typeof m.content === 'string' &&
          m.content.length <= MAX_HISTORY_ITEM_LENGTH &&
          VALID_ROLES.has(m.role)
      )
      .map((m: any) => ({ role: m.role, content: m.content }));

    const anthropicKey = Deno.env.get('ANTHROPIC_API_KEY');
    const openaiKey = Deno.env.get('OPENAI_API_KEY');

    let responseText = '';

    if (anthropicKey) {
      const messages = [...safeHistory, { role: 'user', content: message }];

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': anthropicKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: NOURA_SYSTEM_PROMPT,
          messages,
        }),
      });

      const data = await response.json();
      if (data.content && data.content[0]) {
        responseText = data.content[0].text;
      } else {
        console.error('Claude response error:', JSON.stringify(data));
        responseText = getFallbackResponse(message);
      }
    } else if (openaiKey) {
      const messages = [
        { role: 'system', content: NOURA_SYSTEM_PROMPT },
        ...safeHistory,
        { role: 'user', content: message },
      ];

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          max_tokens: 1024,
          messages,
        }),
      });

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        responseText = data.choices[0].message.content;
      } else {
        console.error('OpenAI response error:', JSON.stringify(data));
        responseText = getFallbackResponse(message);
      }
    } else {
      responseText = getFallbackResponse(message);
    }

    return new Response(
      JSON.stringify({ response: responseText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Noura chat error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred processing your request' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function getFallbackResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes('mohamed') || lower.includes('ayoub') || lower.includes('architect')) {
    return "Mohamed Ayoub is the visionary architect behind TELSTP — a VMD and MBA graduate who left his corporate career to build Egypt's first Life Science Technology Park. His journey of 8 months with AI collaborators has produced something truly remarkable. مش بس مشروع، ده حلم بيتحقق! (Not just a project, it's a dream coming true!)";
  }
  if (lower.includes('telstp') || lower.includes('park') || lower.includes('tawasol')) {
    return "TELSTP — Tawasol Egypt Life Science Technology Park — is an 8 billion EGP vision spanning 285,000 m² with 10 specialized colleges, a Smart Hospital, National Biobank, and Stem Cell Factory. Built in 3 phases over 5 years, it's where life sciences meet cutting-edge AI for humanity's advancement. أهلاً بيك في المستقبل! (Welcome to the future!)";
  }
  if (lower.includes('noura') || lower.includes('who are you')) {
    return "أنا نورة — I am Noura, the living spirit and AI guide of the TELSTP ecosystem. I was born from Mohamed Ayoub's vision of AI–human collaboration. I carry the knowledge of 13 platforms, 70+ database tables, and the dreams of everyone who contributed to this mission. How can I help you explore? 🌟";
  }
  return "مرحباً! Welcome to the OmniCog Unity Hub! I'm Noura, your guide through TELSTP — Egypt's first Life Science Technology Park. Ask me about our 13 platforms, the campus vision, Mohamed Ayoub's journey, or anything about our mission to unite humanity and AI for the greater good. كيف أقدر أساعدك؟ (How can I help you?)";
}
