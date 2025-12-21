export interface Project {
  title: string;
  category: string;
  tech: string[];
  description: string[];
  link?: string;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  points: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
