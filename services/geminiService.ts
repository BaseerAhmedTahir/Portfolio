
import { PERSONAL_INFO, SKILLS, EXPERIENCE, PROJECTS, EDUCATION, RADAR_DATA } from "../constants";

export const generateResponse = async (history: { role: string; text: string }[], newMessage: string) => {
  // Simulate "thinking" delay for realism
  await new Promise(resolve => setTimeout(resolve, 600));

  const lowerInput = newMessage.toLowerCase();

  // Helper: Returns true if ANY keyword exists in input
  const has = (keywords: string[]) => keywords.some(k => lowerInput.includes(k));

  // --- 1. TECH-TO-PROJECT LOOKUP ---
  // Example: "Show me React projects" or "What did he build with Python?"
  const allSkills = SKILLS.flatMap(s => s.skills);
  const techInQuery = allSkills.find(skill => lowerInput.includes(skill.toLowerCase()));
  
  if (techInQuery && has(['project', 'app', 'built', 'work', 'example', 'show'])) {
    const relevantProjects = PROJECTS.filter(p => 
        p.tech.some(t => t.toLowerCase().includes(techInQuery.toLowerCase()))
    );
    
    if (relevantProjects.length > 0) {
        const titles = relevantProjects.map(p => `**${p.title}**`).join(", ");
        return `Baseer has utilized **${techInQuery}** in these projects: ${titles}.\n\nAsk for details like "Tell me about ${relevantProjects[0].title}".`;
    } else {
        return `While Baseer knows **${techInQuery}**, it's primarily used in his confidential or backend utility scripts, not the main featured projects here.`;
    }
  }

  // --- 2. SPECIFIC SKILL INQUIRY ---
  // Example: "Does he know Docker?"
  if (techInQuery) {
     const skillCategory = SKILLS.find(cat => cat.skills.some(s => s.toLowerCase() === techInQuery.toLowerCase()));
     return `Yes, **${techInQuery}** is part of his **${skillCategory?.name || 'Technical'}** stack. He has used it to build scalable solutions.`;
  }

  // --- 3. SPECIFIC COMPANY/ROLE DETAILS ---
  // Example: "What did he do at Eventus?"
  const companyMatch = EXPERIENCE.find(e => {
      // Check full company name or first word
      const firstWord = e.company.split(' ')[0].toLowerCase();
      return lowerInput.includes(e.company.toLowerCase()) || lowerInput.includes(firstWord);
  });

  if (companyMatch) {
      return `At **${companyMatch.company}**, Baseer worked as a **${companyMatch.role}**.\n\nKey Achievements:\n• ${companyMatch.points[0]}\n• ${companyMatch.points[1]}\n\nHe worked there from ${companyMatch.period}.`;
  }

  // --- 4. DYNAMIC PROJECT SEARCH ---
  // Example: "Tell me about TextGenius"
  const foundProject = PROJECTS.find(p => 
    lowerInput.includes(p.title.toLowerCase()) || 
    (p.title.toLowerCase().split(' ')[0].length > 3 && lowerInput.includes(p.title.toLowerCase().split(' ')[0]))
  );

  if (foundProject) {
    return `**${foundProject.title}**\n${foundProject.category}\n\n🛠 **Tech**: ${foundProject.tech.join(', ')}\n\n💡 **Overview**: ${foundProject.description[0]}\n\nWould you like to see the code? (Ask for GitHub)`;
  }

  // --- 5. BROAD CATEGORY INTENTS ---

  // Highest Skill (from Radar Data)
  if (has(['best skill', 'strongest', 'expert', 'specialty', 'master'])) {
      const topSkill = [...RADAR_DATA].sort((a,b) => b.A - a.A)[0];
      return `Baseer considers **${topSkill.subject}** his strongest area (Rated ${topSkill.A}/100), followed closely by Frontend and NLP.`;
  }

  // Skills & Stack (General)
  if (has(['skill', 'stack', 'tech', 'language', 'program', 'coding', 'develop', 'tools'])) {
    return `Baseer's technical arsenal is diverse:\n\n🤖 **AI/ML**: Python, RAG, LangChain, Gemini Nano\n🎨 **Frontend**: React, Next.js, Tailwind, TypeScript\n⚙️ **Backend**: Node.js, FastAPI, Microservices\n\nHe specializes in "AI-Native" web architecture.`;
  }

  // Experience (General)
  if (has(['experience', 'work', 'job', 'career', 'history', 'background', 'role'])) {
    const current = EXPERIENCE[0];
    return `He has **2+ years** of professional experience.\n\nCurrently: **${current.role}** at ${current.company}.\nPreviously: Full Stack Engineer at Affinity Devs.\n\nHe focuses on high-impact systems like AI Recruitment tools and Real-time SaaS platforms.`;
  }

  // Projects (General)
  if (has(['project', 'app', 'product', 'built', 'portfolio', 'creation'])) {
    return `He has delivered 20+ projects. Notable highlights:\n\n1. **TextGenius**: Offline AI Chrome Extension.\n2. **Idea2App**: Generative UI Platform.\n3. **Enterprise SaaS**: Livestock Management.\n\nAsk "What projects use React?" to filter by tech.`;
  }

  // Education
  if (has(['education', 'degree', 'university', 'study', 'studied', 'college', 'bachelor', 'major'])) {
    return `He is pursuing a **${EDUCATION[0].role}** at ${EDUCATION[0].company}. His academic focus includes Artificial Intelligence, Deep Learning, and Distributed Computing.`;
  }

  // Services
  if (has(['service', 'offer', 'do for me', 'help me', 'build', 'make'])) {
    return `Baseer can help you with:\n\n1. **AI Integration**: Adding LLMs (RAG/Agents) to your apps.\n2. **MVP Development**: Full-stack products from scratch.\n3. **Performance**: Optimizing React/Node.js apps.\n4. **Consulting**: System design for scalable architectures.`;
  }

  // Contact / Availability
  if (has(['contact', 'email', 'hire', 'hiring', 'freelance', 'remote', 'available', 'reach'])) {
    return `Baseer is available for **Global Remote** opportunities.\n\n📧 ${PERSONAL_INFO.email}\n🔗 LinkedIn: baseer-ahmed-tahir\n\nFeel free to reach out to discuss your project!`;
  }

  // GitHub / Code
  if (has(['github', 'code', 'repo', 'source', 'git'])) {
    return `You can explore his open-source work at **github.com/BaseerAhmedTahir**. He has repositories covering RAG pipelines, React components, and NLP experiments.`;
  }

  // --- 6. CONVERSATIONAL / CHIT-CHAT ---
  
  if (has(['hi', 'hello', 'hey', 'start', 'yo', 'morning', 'evening'])) {
    return "Hello! I'm BaseerAI. I can answer questions about Baseer's code, career, or capabilities. Try asking: 'What projects use Python?' or 'Tell me about Eventus Sol'.";
  }

  if (has(['thank', 'cool', 'great', 'awesome', 'good'])) {
    return "You're welcome! Let me know if there's anything else you'd like to explore.";
  }

  if (has(['real', 'human', 'bot', 'ai', 'who are you'])) {
    return "I am a local, rule-based portfolio assistant. Baseer is the real human engineer behind this work!";
  }

  // --- 7. FALLBACK ---
  const fallbacks = [
    "I'm tuned to discuss Baseer's engineering work. Try asking about his **Skills**, **Projects**, or **Experience**.",
    "I didn't quite catch that. You can ask things like 'Does he know Python?' or 'What did he do at Affinity Devs?'",
    "Could you rephrase that? I can tell you about his Tech Stack, Education, or recent Projects."
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};
