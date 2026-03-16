export interface ProfileData {
  fullName: string;
  title: string;
  bio: string;
  currentWork: string;
  learning: string;
  email: string;
  location: string;
  pronouns: string;
  funFact: string;
  githubUsername: string;
}

export interface PortfolioLinks {
  portfolioWebsite: string;
  blog: string;
  resume: string;
  projectShowcase: string;
  personalWebsite: string;
}

export interface SocialLinksData {
  github: string;
  linkedin: string;
  twitter: string;
  devto: string;
  medium: string;
  stackoverflow: string;
  kaggle: string;
  youtube: string;
  discord: string;
}

export type SkillCategory =
  | 'languages'
  | 'frameworks'
  | 'databases'
  | 'cloud';

export interface SkillsData {
  languages: string[];
  frameworks: string[];
  databases: string[];
  cloud: string[];
}

export type TemplateType =
  | 'minimal'
  | 'modern'
  | 'ai-engineer'
  | 'data-scientist'
  | 'open-source'
  | 'devops'
  | 'artificial-intelligence'
  | 'machine-learning'
  | 'data-science'
  | 'cybersecurity'
  | 'cloud-computing'
  | 'web-development'
  | 'mobile-development'
  | 'devops-engineering'
  | 'blockchain'
  | 'iot'
  | 'computer-vision'
  | 'nlp'
  | 'robotics'
  | 'game-development'
  | 'embedded-systems'
  | 'ar'
  | 'vr'
  | 'big-data'
  | 'software-engineering'
  | 'quantum-computing'
  | 'creative-developer';

export interface GitHubStatsOptions {
  showStats: boolean;
  showTopLangs: boolean;
  showStreak: boolean;
  showTrophy: boolean;
  statsTheme: string;
}

export interface AppState {
  profile: ProfileData;
  portfolio: PortfolioLinks;
  social: SocialLinksData;
  skills: SkillsData;
  template: TemplateType;
  githubStats: GitHubStatsOptions;
  activeStep: number;
  darkMode: boolean;
}
