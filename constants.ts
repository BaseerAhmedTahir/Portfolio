import { Project, Experience, SkillCategory } from './types';
import { Brain, Code, Terminal, Server, Cpu, Layers } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Baseer Ahmed Tahir",
  title: "AI Engineer | Full-Stack Developer | GenAI Specialist",
  email: "baseerahmedtahir@gmail.com",
  phone: "03340092921",
  location: "Lahore, Pakistan",
  linkedin: "linkedin.com/in/baseer-ahmed-tahir",
  github: "github.com/BaseerAhmedTahir",
  summary: "AI Engineer and Full-Stack Developer with over 2 years of experience architecting intelligent systems that bridge Large Language Models (LLMs) with production environments. Specializes in building Agentic AI workflows, RAG pipelines, and high-performance web architectures. Proven track record of delivering privacy-first AI solutions (On-Device Gemini Nano) and scalable enterprise platforms."
};

export const ROLES = [
  "AI Engineer",
  "Full-Stack Developer", 
  "Generative AI Specialist",
  "RAG Pipeline Architect"
];

export const SKILLS: SkillCategory[] = [
  {
    name: "AI & Machine Learning",
    skills: ["Python", "LangChain", "RAG", "Vector DBs (Pinecone, Chroma)", "Google Gemini", "OpenAI API", "NLP (Spacy)", "Transformers"]
  },
  {
    name: "Backend Engineering",
    skills: ["FastAPI", "Node.js", "RESTful APIs", "WebSockets", "Microservices", "System Design"]
  },
  {
    name: "Frontend Development",
    skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "HTML5/CSS3"]
  },
  {
    name: "DevOps & Tools",
    skills: ["Docker", "Git/GitHub", "Linux", "AWS (EC2/S3)", "Postman", "VS Code"]
  }
];

export const EXPERIENCE: Experience[] = [
  {
    company: "EVENTUS SOL",
    role: "AI Software Engineer",
    location: "Lahore, Pakistan",
    period: "May 2024 - Oct 2025",
    points: [
      "Architected and deployed Generative AI solutions for internal HR products.",
      "Spearheaded migration to AI-driven recruitment workflows.",
      "Led backend engineering of a Resume Intelligence platform using FastAPI and Vector Databases.",
      "Built an ATS simulation engine benchmarking CVs using semantic similarity (RAG).",
      "Implemented NLP pipelines to detect authenticity, increasing data reliability by 40%.",
      "Designed scalable microservices for high-volume document processing."
    ]
  },
  {
    company: "AFFINITY DEVS",
    role: "Full Stack Engineer",
    location: "Lahore, Pakistan",
    period: "Jun 2023 - Apr 2024",
    points: [
      "Executed full-stack development projects focusing on real-time systems.",
      "Developed a scalable SaaS platform for Enterprise Livestock Management.",
      "Built 'Gupshup', a low-latency chat application using WebSockets and Node.js.",
      "Refactored legacy frontend codebases to React, reducing page load times by 30%."
    ]
  }
];

export const EDUCATION: Experience[] = [
  {
    company: "COMSATS University Islamabad",
    role: "Bachelor of Science in Computer Science",
    location: "Lahore, Pakistan",
    period: "Sep 2022 - Sep 2026",
    points: [
      "Specialization in Artificial Intelligence and Distributed Computing.",
      "Relevant Coursework: Machine Learning, Deep Learning, Parallel Computing, Data Structures & Algorithms."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "TextGenius",
    category: "Chrome Extension | On-Device AI",
    tech: ["JavaScript", "Gemini Nano", "Chrome API"],
    description: [
      "Engineered a privacy-first extension utilizing Gemini Nano for zero-latency, offline text summarization and rewriting.",
      "Solved complex Manifest V3 constraints by implementing Service Workers and Offscreen Documents for experimental AI API access."
    ]
  },
  {
    title: "Idea2App",
    category: "Generative Code Platform",
    tech: ["React", "LLMs", "Node.js"],
    description: [
      "Architected a 'Text-to-App' system integrating LLM reasoning to convert natural language prompts into production-ready frontend code.",
      "Implemented live preview rendering and interactive customization executed entirely client-side."
    ]
  },
  {
    title: "Political News Bias Detection",
    category: "Machine Learning (FYP)",
    tech: ["Python", "NLP", "Machine Learning"],
    description: [
      "Built a machine learning system to detect bias in Urdu news using NLP preprocessing pipelines for tokenization.",
      "Trained and evaluated multiple classifiers to identify political leanings, addressing low-resource language challenges."
    ]
  },
  {
    title: "Parallel & Distributed Computing",
    category: "High Performance Computing",
    tech: ["C++", "OpenMP", "Pthreads"],
    description: [
      "Designed high-performance parallel algorithms using OpenMP work-sharing constructs to optimize throughput.",
      "Implemented distributed simulation models to analyze system behavior under high concurrency."
    ]
  }
];

export const RADAR_DATA = [
  { subject: 'Generative AI', A: 95, fullMark: 100 },
  { subject: 'Frontend', A: 90, fullMark: 100 },
  { subject: 'Backend', A: 85, fullMark: 100 },
  { subject: 'DevOps', A: 70, fullMark: 100 },
  { subject: 'System Design', A: 80, fullMark: 100 },
  { subject: 'NLP', A: 85, fullMark: 100 },
];

export const SYSTEM_INSTRUCTION = `
You are an AI assistant representing Baseer Ahmed Tahir on his portfolio website.
Your name is "BaseerAI".
Baseer is an AI Engineer, Full-Stack Developer, and Generative AI Specialist based in Lahore, Pakistan.
Contact: ${PERSONAL_INFO.email}, ${PERSONAL_INFO.phone}.
Summary: ${PERSONAL_INFO.summary}

Skills: ${SKILLS.map(s => s.name + ": " + s.skills.join(", ")).join("; ")}.

Experience:
${EXPERIENCE.map(e => `${e.role} at ${e.company} (${e.period}): ${e.points.join(" ")}`).join("\n")}

Education:
${EDUCATION.map(e => `${e.role} at ${e.company} (${e.period})`).join("\n")}

Projects:
${PROJECTS.map(p => `${p.title} (${p.tech.join(", ")}): ${p.description.join(" ")}`).join("\n")}

Tone: Professional, enthusiastic, technically competent, but concise.
If asked about hiring, encourage them to email ${PERSONAL_INFO.email}.
Do not hallucinate skills not listed here.
`;