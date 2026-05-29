import { Project, Experience, SkillCategory } from './types';
import { Brain, Code, Terminal, Server, Cpu, Layers } from 'lucide-react';

export const PERSONAL_INFO = {
  name: "Baseer Ahmed Tahir",
  title: "Associate Software Engineer Candidate",
  email: "baseerahmedtahir@gmail.com",
  phone: "+92-334-0092921",
  location: "Lahore, Pakistan",
  linkedin: "linkedin.com/in/baseer-ahmed-tahir",
  github: "github.com/BaseerAhmedTahir",
  summary: "BS Computer Science student with hands-on experience in Java, SQL, full-stack development, database design, and AI/ML projects. Strong foundation in OOP, DBMS, data structures, problem solving, APIs, debugging, and clean application logic. Seeking an Associate Software Engineer role at i2c to contribute to reliable, scalable, and maintainable financial technology software."
};

export const ROLES = [
  "Associate Software Engineer",
  "Full-Stack Developer", 
  "Java & SQL Specialist",
  "Database Designer"
];

export const SKILLS: SkillCategory[] = [
  {
    name: "Programming",
    skills: ["Java", "C++", "JavaScript", "TypeScript", "Python basics"]
  },
  {
    name: "Database & SQL",
    skills: ["MSSQL", "SQL Queries", "Relational Schema Design", "Normalization", "Joins", "Constraints", "Transactions"]
  },
  {
    name: "Web & APIs",
    skills: ["REST APIs", "Postman", "Responsive Web Apps", "Frontend/Backend Integration"]
  },
  {
    name: "Core CS & Tools",
    skills: ["OOP", "DBMS", "Data Structures", "Algorithms", "SDLC", "Debugging", "Problem Solving", "Git", "GitHub", "MS SQL Server Management Studio", "VS Code", "IntelliJ IDEA"]
  }
];

export const EXPERIENCE: Experience[] = [
  {
    company: "NSM Swimming Academy",
    role: "Cross-Platform Software Developer",
    location: "Freelance",
    period: "2024 - Present",
    points: [
      "Designed a centralized data structure to manage client profiles, student enrollments, trainer schedules, and operational records.",
      "Built SQL-driven workflows using relational concepts, joins, validations, and transaction-focused logic to reduce double-booking issues.",
      "Integrated web and mobile views with consistent user states, improving data visibility for academy administration and trainers."
    ]
  },
  {
    company: "Global Culinary Recipe & Taxonomies Application",
    role: "Founder & Product Developer",
    location: "Independent",
    period: "2025 - Present",
    points: [
      "Architecting a responsive recipe application with structured international cuisine data for future web and mobile deployment.",
      "Designed normalized database entities for recipes, ingredients, dietary filters, preparation steps, and searchable food taxonomies.",
      "Implemented performance-oriented search and filtering logic based on preparation time, nutrition variables, and dietary categories."
    ]
  }
];

export const EDUCATION: Experience[] = [
  {
    company: "COMSATS University Islamabad, Lahore Campus",
    role: "Bachelor of Science in Computer Science",
    location: "Lahore, Pakistan",
    period: "Sep 2022 - Aug 2026",
    points: [
      "CGPA: 3.36",
      "Relevant Coursework: OOP, DBMS, Data Structures & Algorithms, SDLC, Machine Learning."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Urdu News Bias Detection",
    category: "Machine Learning | Final Year Project",
    tech: ["Python", "NLP", "SVM", "Naive Bayes"],
    description: [
      "Developed an NLP-based system to detect structural and editorial bias in regional Urdu news content.",
      "Curated and cleaned a localized Urdu news corpus using tokenization, stop-word filtering, and feature extraction techniques.",
      "Evaluated multiple classifiers, including Support Vector Machine and Naive Bayes, to compare classification performance."
    ]
  },
  {
    title: "AI Chatbot Application",
    category: "Generative AI | Conversational System",
    tech: ["JavaScript", "REST APIs", "LLMs", "Node.js"],
    description: [
      "Built an interactive AI chatbot integrating large language model APIs with a responsive frontend interface.",
      "Implemented conversation history, context management, and real-time typing simulation for natural user interactions.",
      "Designed clean API integration layer with error handling, rate limiting awareness, and graceful fallback responses."
    ]
  },
  {
    title: "NSM Swimming Academy",
    category: "Full-Stack | Web & Mobile",
    tech: ["SQL", "React", "Node.js", "Mobile"],
    description: [
      "Designed a centralized data structure to manage client profiles, student enrollments, trainer schedules, and operational records.",
      "Built SQL-driven workflows using relational concepts, joins, validations, and transaction-focused logic to reduce double-booking issues.",
      "Integrated web and mobile views with consistent user states, improving data visibility for academy administration and trainers."
    ]
  },
  {
    title: "Global Culinary Recipe App",
    category: "Database Design | Web Application",
    tech: ["SQL", "TypeScript", "REST APIs", "MSSQL"],
    description: [
      "Architecting a responsive recipe application with structured international cuisine data for future web and mobile deployment.",
      "Designed normalized database entities for recipes, ingredients, dietary filters, preparation steps, and searchable food taxonomies.",
      "Implemented performance-oriented search and filtering logic based on preparation time, nutrition variables, and dietary categories."
    ]
  }
];

export const RADAR_DATA = [
  { subject: 'Java/OOP', A: 90, fullMark: 100 },
  { subject: 'SQL/DB', A: 90, fullMark: 100 },
  { subject: 'Frontend', A: 80, fullMark: 100 },
  { subject: 'Backend', A: 85, fullMark: 100 },
  { subject: 'Problem Solving', A: 85, fullMark: 100 },
  { subject: 'APIs/Tools', A: 80, fullMark: 100 },
];

export const SYSTEM_INSTRUCTION = `
You are an AI assistant representing Baseer Ahmed Tahir on his portfolio website.
Your name is "BaseerBot".
Baseer is an Associate Software Engineer Candidate and Full-Stack Developer based in Lahore, Pakistan.
He is currently seeking an Associate Software Engineer role at i2c Inc.
Contact: ${PERSONAL_INFO.email}, ${PERSONAL_INFO.phone}.
Summary: ${PERSONAL_INFO.summary}

Skills: ${SKILLS.map(s => s.name + ": " + s.skills.join(", ")).join("; ")}.

Experience:
${EXPERIENCE.map(e => `${e.role} at ${e.company} (${e.period}): ${e.points.join(" ")}`).join("\n")}

Education:
${EDUCATION.map(e => `${e.role} at ${e.company} (${e.period}): ${e.points.join(" ")}`).join("\n")}

Projects:
${PROJECTS.map(p => `${p.title} (${p.tech.join(", ")}): ${p.description.join(" ")}`).join("\n")}

Strengths relevant to i2c:
- Strong understanding of SQL, relational databases, transactions, OOP, debugging, and backend-oriented application flow.
- Comfortable learning new tools quickly, reading requirements, breaking problems into modules, and improving code step by step.
- Project ownership mindset developed through freelance, independent SaaS, academic, and GitHub-based software projects.

Tone: Professional, enthusiastic, technically competent, but concise.
If asked about hiring, encourage them to email ${PERSONAL_INFO.email}.
Do not hallucinate skills not listed here.
`;
