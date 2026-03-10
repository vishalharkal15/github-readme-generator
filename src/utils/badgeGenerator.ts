export interface SkillBadge {
  name: string;
  color: string;
  logo: string;
  logoColor?: string;
}

// Maps skill name to shields.io badge config
const SKILL_BADGE_MAP: Record<string, SkillBadge> = {
  // Languages
  JavaScript: { name: 'JavaScript', color: 'F7DF1E', logo: 'javascript', logoColor: 'black' },
  TypeScript: { name: 'TypeScript', color: '3178C6', logo: 'typescript', logoColor: 'white' },
  Python: { name: 'Python', color: '3776AB', logo: 'python', logoColor: 'white' },
  Java: { name: 'Java', color: 'ED8B00', logo: 'openjdk', logoColor: 'white' },
  'C++': { name: 'C%2B%2B', color: '00599C', logo: 'c%2B%2B', logoColor: 'white' },
  Go: { name: 'Go', color: '00ADD8', logo: 'go', logoColor: 'white' },
  Rust: { name: 'Rust', color: '000000', logo: 'rust', logoColor: 'white' },
  // Frontend
  React: { name: 'React', color: '20232a', logo: 'react', logoColor: '61DAFB' },
  'Next.js': { name: 'Next.js', color: '000000', logo: 'next.js', logoColor: 'white' },
  Vue: { name: 'Vue.js', color: '35495e', logo: 'vuedotjs', logoColor: '4FC08D' },
  Angular: { name: 'Angular', color: 'DD0031', logo: 'angular', logoColor: 'white' },
  TailwindCSS: { name: 'Tailwind_CSS', color: '38B2AC', logo: 'tailwind-css', logoColor: 'white' },
  // Backend
  'Node.js': { name: 'Node.js', color: '6DA55F', logo: 'node.js', logoColor: 'white' },
  Express: { name: 'Express.js', color: '404d59', logo: 'express', logoColor: '61DAFB' },
  Django: { name: 'Django', color: '092E20', logo: 'django', logoColor: 'white' },
  Flask: { name: 'Flask', color: '000000', logo: 'flask', logoColor: 'white' },
  'Spring Boot': { name: 'Spring_Boot', color: '6DB33F', logo: 'spring-boot', logoColor: 'white' },
  // AI/ML
  TensorFlow: { name: 'TensorFlow', color: 'FF6F00', logo: 'TensorFlow', logoColor: 'white' },
  PyTorch: { name: 'PyTorch', color: 'EE4C2C', logo: 'PyTorch', logoColor: 'white' },
  'Scikit-learn': { name: 'scikit--learn', color: 'F7931E', logo: 'scikit-learn', logoColor: 'white' },
  OpenCV: { name: 'OpenCV', color: '27338e', logo: 'opencv', logoColor: 'white' },
  HuggingFace: { name: 'HuggingFace', color: 'FFD21E', logo: 'huggingface', logoColor: 'black' },
  // Cloud & DevOps
  AWS: { name: 'AWS', color: 'FF9900', logo: 'amazon-aws', logoColor: 'white' },
  Docker: { name: 'Docker', color: '0db7ed', logo: 'docker', logoColor: 'white' },
  Kubernetes: { name: 'Kubernetes', color: '326ce5', logo: 'kubernetes', logoColor: 'white' },
  'CI/CD': { name: 'CI%2FCD', color: '2088FF', logo: 'github-actions', logoColor: 'white' },
  'GitHub Actions': { name: 'GitHub_Actions', color: '2088FF', logo: 'github-actions', logoColor: 'white' },
  // Databases
  PostgreSQL: { name: 'PostgreSQL', color: '316192', logo: 'postgresql', logoColor: 'white' },
  MongoDB: { name: 'MongoDB', color: '4ea94b', logo: 'mongodb', logoColor: 'white' },
  MySQL: { name: 'MySQL', color: '00f', logo: 'mysql', logoColor: 'white' },
  Redis: { name: 'Redis', color: 'DD0031', logo: 'redis', logoColor: 'white' },
};

export function generateSkillBadge(skill: string): string {
  const badge = SKILL_BADGE_MAP[skill];
  if (!badge) {
    const encoded = encodeURIComponent(skill);
    return `![${skill}](https://img.shields.io/badge/${encoded}-555555?style=for-the-badge)`;
  }
  const logoColorPart = badge.logoColor ? `&logoColor=${badge.logoColor}` : '';
  return `![${skill}](https://img.shields.io/badge/${badge.name}-${badge.color}?style=for-the-badge&logo=${badge.logo}${logoColorPart})`;
}

export function generateSocialBadge(platform: string, username: string): string {
  const configs: Record<string, { color: string; logo: string; url: string }> = {
    github: { color: '181717', logo: 'github', url: `https://github.com/${username}` },
    linkedin: { color: '0077B5', logo: 'linkedin', url: `https://linkedin.com/in/${username}` },
    twitter: { color: '1DA1F2', logo: 'twitter', url: `https://twitter.com/${username}` },
    devto: { color: '0A0A0A', logo: 'dev.to', url: `https://dev.to/${username}` },
    medium: { color: '12100E', logo: 'medium', url: `https://medium.com/@${username}` },
    stackoverflow: { color: 'FE7A16', logo: 'stack-overflow', url: `https://stackoverflow.com/users/${username}` },
    kaggle: { color: '20BEFF', logo: 'kaggle', url: `https://kaggle.com/${username}` },
    youtube: { color: 'FF0000', logo: 'youtube', url: `https://youtube.com/@${username}` },
    discord: { color: '5865F2', logo: 'discord', url: `https://discord.gg/${username}` },
  };

  const cfg = configs[platform.toLowerCase()];
  if (!cfg) return '';
  const displayName = platform.charAt(0).toUpperCase() + platform.slice(1);
  return `[![${displayName}](https://img.shields.io/badge/${displayName}-${cfg.color}?style=for-the-badge&logo=${cfg.logo}&logoColor=white)](${cfg.url})`;
}
