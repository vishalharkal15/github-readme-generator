import type {
  ProfileData,
  PortfolioLinks,
  SocialLinksData,
  SkillsData,
  TemplateType,
  GitHubStatsOptions,
} from '../types';
import { generateSkillBadge, generateSocialBadge } from '../utils/badgeGenerator';

function generateBanner(name: string, title: string): string {
  return `<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=${encodeURIComponent(name)}&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=white" />
</div>

<h1 align="center">Hi 👋, I'm ${name}</h1>
<h3 align="center">${title}</h3>`;
}

function generateTypingAnimation(title: string): string {
  return `<p align="center">
  <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=2196F3&center=true&vCenter=true&width=435&lines=${encodeURIComponent(title)}" alt="Typing SVG" /></a>
</p>`;
}

function generateAboutSection(profile: ProfileData): string {
  const lines: string[] = [];
  if (profile.bio) lines.push(`- 🌟 ${profile.bio}`);
  if (profile.currentWork) lines.push(`- 🔭 I'm currently working on **${profile.currentWork}**`);
  if (profile.learning) lines.push(`- 🌱 I'm currently learning **${profile.learning}**`);
  if (profile.pronouns) lines.push(`- 😄 Pronouns: **${profile.pronouns}**`);
  if (profile.location) lines.push(`- 📍 Based in **${profile.location}**`);
  if (profile.funFact) lines.push(`- ⚡ Fun fact: *${profile.funFact}*`);
  if (profile.email) lines.push(`- 📫 Reach me at **${profile.email}**`);
  return lines.join('\n');
}

function generatePortfolioSection(portfolio: PortfolioLinks): string {
  const links: string[] = [];
  if (portfolio.portfolioWebsite) links.push(`🌐 [Portfolio](${portfolio.portfolioWebsite})`);
  if (portfolio.blog) links.push(`✍️ [Blog](${portfolio.blog})`);
  if (portfolio.resume) links.push(`📄 [Resume / CV](${portfolio.resume})`);
  if (portfolio.projectShowcase) links.push(`🚀 [Project Showcase](${portfolio.projectShowcase})`);
  if (portfolio.personalWebsite) links.push(`🏠 [Personal Website](${portfolio.personalWebsite})`);
  if (links.length === 0) return '';
  return `## 🔗 Connect & Links\n\n${links.join(' &nbsp; ')}`;
}

function generateSocialSection(social: SocialLinksData): string {
  const badges: string[] = [];
  const platforms = Object.entries(social) as [string, string][];
  for (const [platform, username] of platforms) {
    if (username.trim()) {
      const badge = generateSocialBadge(platform, username.trim());
      if (badge) badges.push(badge);
    }
  }
  if (badges.length === 0) return '';
  return `## 🤝 Connect with Me\n\n${badges.join(' ')}\n`;
}

function generateSkillsSection(skills: SkillsData): string {
  const sections: string[] = [];

  const categoryLabels: Record<string, string> = {
    languages: '💻 Programming Languages',
    frameworks: '🧩 Frameworks & Libraries',
    databases: '🗄️ Databases',
    cloud: '☁️ Cloud Platforms & Services',
  };

  for (const [cat, label] of Object.entries(categoryLabels)) {
    const skillList = skills[cat as keyof SkillsData];
    if (skillList.length > 0) {
      const badges = skillList.map(generateSkillBadge).join('\n');
      sections.push(`### ${label}\n\n${badges}`);
    }
  }

  if (sections.length === 0) return '';
  return `## 🛠️ Tech Stack & Skills\n\n${sections.join('\n\n')}`;
}

function generateGitHubStatsSection(username: string, opts: GitHubStatsOptions): string {
  if (!username) return '';
  const sections: string[] = ['## 📊 GitHub Statistics'];

  // Stats + Top Languages side by side
  if (opts.showStats && opts.showTopLangs) {
    sections.push(`<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${opts.statsTheme}&hide_border=true&count_private=true" height="165" alt="GitHub Stats" />
  &nbsp;&nbsp;
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${opts.statsTheme}&hide_border=true" height="165" alt="Top Languages" />
</p>`);
  } else if (opts.showStats) {
    sections.push(`<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${opts.statsTheme}&hide_border=true&count_private=true" alt="GitHub Stats" />
</p>`);
  } else if (opts.showTopLangs) {
    sections.push(`<p align="center">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${opts.statsTheme}&hide_border=true" alt="Top Languages" />
</p>`);
  }

  if (opts.showStreak) {
    sections.push(`<p align="center">
  <img src="https://streak-stats.demolab.com/?user=${username}&theme=${opts.statsTheme}&hide_border=true" alt="GitHub Streak" />
</p>`);
  }

  if (opts.showTrophy) {
    sections.push(`<p align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=${username}&theme=${opts.statsTheme}&no-frame=true&no-bg=true&margin-w=4" alt="GitHub Trophies" />
</p>`);
  }

  return sections.join('\n\n');
}

function generateFooter(name: string): string {
  return `---

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" />
  <p>⭐ Generated with <a href="https://github.com">GitHub README Generator</a> • © ${new Date().getFullYear()} ${name}</p>
</div>`;
}

// ── Template Generators ──────────────────────────────────────────────────────

function minimalTemplate(
  profile: ProfileData,
  portfolio: PortfolioLinks,
  social: SocialLinksData,
  skills: SkillsData,
  githubStats: GitHubStatsOptions,
): string {
  const parts: string[] = [];
  parts.push(`# Hi there, I'm ${profile.fullName || 'Developer'} 👋`);
  if (profile.title) parts.push(`### ${profile.title}`);
  if (profile.bio) parts.push(`\n> ${profile.bio}`);
  parts.push('');
  parts.push(generateAboutSection(profile));
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  if (profile.githubUsername) {
    parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  }
  return parts.join('\n');
}

function modernTemplate(
  profile: ProfileData,
  portfolio: PortfolioLinks,
  social: SocialLinksData,
  skills: SkillsData,
  githubStats: GitHubStatsOptions,
): string {
  const parts: string[] = [];
  parts.push(generateBanner(profile.fullName || 'Developer', profile.title || 'Full-Stack Developer'));
  parts.push('');
  parts.push(generateTypingAnimation(profile.title || 'Full-Stack Developer'));
  parts.push('');
  parts.push('## 🙋‍♂️ About Me');
  parts.push('');
  parts.push(generateAboutSection(profile));
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  if (profile.githubUsername) {
    parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  }
  parts.push('', generateFooter(profile.fullName || 'Developer'));
  return parts.join('\n');
}

function aiEngineerTemplate(
  profile: ProfileData,
  portfolio: PortfolioLinks,
  social: SocialLinksData,
  skills: SkillsData,
  githubStats: GitHubStatsOptions,
): string {
  const parts: string[] = [];
  const name = profile.fullName || 'AI Engineer';
  parts.push(generateBanner(name, profile.title || 'AI / ML Engineer'));
  parts.push('');
  parts.push(`<p align="center">
  <em>🤖 Building intelligent systems that learn, adapt, and transform the world.</em>
</p>`);
  parts.push('');
  parts.push('## 🧠 About Me');
  parts.push('');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🔬 Research & Interests

- 🧬 Deep Learning & Neural Networks
- 📊 Data Science & Statistical Modeling
- 🌐 NLP & Large Language Models
- 👁️ Computer Vision & Image Processing`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) {
    parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  }
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function dataScientistTemplate(
  profile: ProfileData,
  portfolio: PortfolioLinks,
  social: SocialLinksData,
  skills: SkillsData,
  githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'Data Scientist';
  const parts: string[] = [];
  parts.push(`# 📈 ${name}`);
  parts.push(`### ${profile.title || 'Data Scientist | Analyst | Storyteller'}`);
  parts.push('');
  parts.push(`> *"In God we trust. All others must bring data." — W. Edwards Deming*`);
  parts.push('');
  parts.push('## 👨‍💻 About Me');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 📌 Expertise

| Area | Details |
|------|---------|
| 📊 Analytics | Exploratory Data Analysis, Statistical Testing |
| 🤖 ML/AI | Supervised & Unsupervised Learning |
| 📉 Visualization | Dashboards, Storytelling with Data |
| 🗄️ Data Engineering | ETL Pipelines, Data Warehousing |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) {
    parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  }
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function openSourceTemplate(
  profile: ProfileData,
  portfolio: PortfolioLinks,
  social: SocialLinksData,
  skills: SkillsData,
  githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'Open Sourcerer';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'Open Source Maintainer'));
  parts.push('');
  parts.push(`<p align="center">
  <a href="https://github.com/${profile.githubUsername}">
    <img src="https://img.shields.io/github/followers/${profile.githubUsername}?label=Followers&style=social" alt="GitHub Followers" />
  </a>
  <img src="https://komarev.com/ghpvc/?username=${profile.githubUsername}&label=Profile%20views&color=0e75b6&style=flat" alt="Profile Views" />
</p>`);
  parts.push('');
  parts.push('## 🌍 About Me');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🏆 Open Source Philosophy

> *"Open source is not just code. It's building a better world together."*

I believe in the power of community-driven development and maintainable, inclusive software.`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) {
    parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  }
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function devopsTemplate(
  profile: ProfileData,
  portfolio: PortfolioLinks,
  social: SocialLinksData,
  skills: SkillsData,
  githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'DevOps Engineer';
  const parts: string[] = [];

  parts.push(generateBanner(name, profile.title || 'DevOps & Cloud Engineer'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://komarev.com/ghpvc/?username=${profile.githubUsername}&label=Profile%20Views&color=0e75b6&style=flat" alt="Profile Views" />
  <img src="https://img.shields.io/badge/Focus-DevOps%20%26%20Cloud-blue?style=flat&logo=cloudflare" alt="Focus" />
  <img src="https://img.shields.io/badge/Automation-First-orange?style=flat&logo=github-actions" alt="Automation First" />
</p>`);
  parts.push('');
  parts.push('## ⚙️ About Me');
  parts.push('');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🚀 DevOps Philosophy

> *"Automate everything. Ship faster. Break nothing."*

| Principle | Practice |
|-----------|----------|
| 🔄 CI/CD | Automated pipelines from commit to production |
| 🐳 Containers | Docker & Kubernetes for reproducible deployments |
| 🏗️ IaC | Infrastructure as Code with Terraform / Ansible |
| 📈 Observability | Logs, metrics & traces in every system |
| 🔒 Shift Left Security | Security checks integrated in the pipeline |`);

  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);

  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);

  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);

  if (profile.githubUsername) {
    parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  }

  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function artificialIntelligenceTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'AI Researcher';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'Artificial Intelligence Researcher'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/AI-Researcher-blueviolet?style=for-the-badge&logo=openai" />
  <img src="https://img.shields.io/badge/Deep%20Learning-Enthusiast-orange?style=for-the-badge&logo=pytorch" />
  <img src="https://img.shields.io/badge/LLMs-Builder-green?style=for-the-badge&logo=huggingface" />
</p>`);
  parts.push('');
  parts.push('## 🧠 About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🤖 AI Focus Areas

| Domain | Technologies |
|--------|-------------|
| 🗣️ Large Language Models | GPT, LLaMA, Gemini, Claude |
| 🎨 Generative AI | Stable Diffusion, DALL-E, Midjourney |
| 🧬 Reinforcement Learning | PPO, DQN, RLHF, Multi-Agent |
| 🔍 AI Interpretability | SHAP, LIME, Attention Visualization |
| 🚀 AI Deployment | ONNX, TensorRT, Edge AI |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function machineLearningTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'ML Engineer';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'Machine Learning Engineer'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/ML-Engineer-blue?style=for-the-badge&logo=scikitlearn" />
  <img src="https://img.shields.io/badge/Model%20Training-Expert-red?style=for-the-badge&logo=tensorflow" />
  <img src="https://img.shields.io/badge/MLOps-Practitioner-yellow?style=for-the-badge&logo=mlflow" />
</p>`);
  parts.push('');
  parts.push('## ⚙️ About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🔬 ML Pipeline

\`\`\`
Data Collection → Feature Engineering → Model Training → Evaluation → Deployment → Monitoring
\`\`\`

| Stage | Tools & Practices |
|-------|------------------|
| 📦 Data | Pandas, DVC, Feature Stores |
| 🏋️ Training | PyTorch, TensorFlow, XGBoost |
| 📊 Evaluation | MLflow, W&B, Optuna |
| 🚢 Deployment | FastAPI, BentoML, Seldon |
| 📡 Monitoring | Evidently, Grafana, Prometheus |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function dataScienceTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'Data Scientist';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'Data Scientist & Analyst'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/Data-Science-informational?style=for-the-badge&logo=databricks" />
  <img src="https://img.shields.io/badge/Analytics-Expert-success?style=for-the-badge&logo=tableau" />
  <img src="https://img.shields.io/badge/Visualization-Storyteller-ff69b4?style=for-the-badge&logo=plotly" />
</p>`);
  parts.push('');
  parts.push('## 📊 About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🔭 Data Science Toolkit

| Area | Tools |
|------|-------|
| 🐍 Languages | Python, R, SQL |
| 📈 Visualization | Matplotlib, Seaborn, Plotly, Tableau |
| 🤖 ML | Scikit-learn, XGBoost, LightGBM |
| 🗄️ Data Wrangling | Pandas, NumPy, Polars |
| 🏗️ Pipelines | Airflow, Prefect, dbt |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function cybersecurityTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'Security Engineer';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'Cybersecurity Engineer'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/Cybersecurity-Expert-red?style=for-the-badge&logo=kalilinux" />
  <img src="https://img.shields.io/badge/Ethical%20Hacking-Practitioner-black?style=for-the-badge&logo=hackthebox" />
  <img src="https://img.shields.io/badge/CTF-Player-blue?style=for-the-badge&logo=tryhackme" />
</p>`);
  parts.push('');
  parts.push('## 🛡️ About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🔐 Security Domains

| Domain | Focus |
|--------|-------|
| 🔴 Red Team | Penetration Testing, Exploit Development |
| 🔵 Blue Team | SIEM, Incident Response, Threat Hunting |
| 🟣 Purple Team | Adversary Simulation, Detection Engineering |
| 🔑 AppSec | SAST, DAST, Code Review, OWASP Top 10 |
| 🌐 Network Security | Firewall, IDS/IPS, Zero Trust Architecture |
| 🔒 Cryptography | PKI, TLS, Secure Key Management |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function cloudComputingTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'Cloud Architect';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'Cloud Solutions Architect'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/AWS-Certified-FF9900?style=for-the-badge&logo=amazonaws" />
  <img src="https://img.shields.io/badge/Azure-Expert-0078D4?style=for-the-badge&logo=microsoftazure" />
  <img src="https://img.shields.io/badge/GCP-Architect-4285F4?style=for-the-badge&logo=googlecloud" />
</p>`);
  parts.push('');
  parts.push('## ☁️ About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🏗️ Cloud Architecture Pillars

| Pillar | Practices |
|--------|----------|
| ⚡ Performance | Auto-scaling, CDN, Load Balancing |
| 🔒 Security | IAM, VPC, Encryption, WAF |
| 💰 Cost Optimization | Reserved Instances, FinOps, Spot |
| 🔄 Reliability | Multi-region, DR, Chaos Engineering |
| 🚀 Deployment | Serverless, Containers, IaC, GitOps |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function webDevelopmentTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'Web Developer';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'Full-Stack Web Developer'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/Frontend-Developer-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Backend-Engineer-339933?style=for-the-badge&logo=nodedotjs" />
  <img src="https://img.shields.io/badge/Web-Craftsman-orange?style=for-the-badge&logo=html5" />
</p>`);
  parts.push('');
  parts.push('## 💻 About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🌐 Web Stack

| Layer | Technologies |
|-------|-------------|
| 🎨 Frontend | React, Vue, Angular, Next.js, Tailwind CSS |
| ⚙️ Backend | Node.js, Django, FastAPI, Laravel, Spring |
| 🗄️ Database | PostgreSQL, MongoDB, Redis, MySQL |
| 🔌 APIs | REST, GraphQL, WebSockets, tRPC |
| 🚀 Deployment | Vercel, Netlify, Docker, AWS, Heroku |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function mobileDevelopmentTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'Mobile Developer';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'Mobile App Developer'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/iOS-Developer-000000?style=for-the-badge&logo=apple" />
  <img src="https://img.shields.io/badge/Android-Developer-3DDC84?style=for-the-badge&logo=android" />
  <img src="https://img.shields.io/badge/React%20Native-Cross%20Platform-61DAFB?style=for-the-badge&logo=react" />
</p>`);
  parts.push('');
  parts.push('## 📱 About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 📲 Mobile Expertise

| Platform | Tech Stack |
|----------|-----------|
| 🍎 iOS | Swift, SwiftUI, Objective-C, Xcode |
| 🤖 Android | Kotlin, Jetpack Compose, Android Studio |
| 🔀 Cross-Platform | React Native, Flutter, Expo |
| 🔧 Backend | Firebase, Supabase, REST APIs |
| 🚀 Publishing | App Store, Google Play, CI/CD |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function devopsEngineeringTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'DevOps Engineer';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'DevOps Engineering Specialist'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/Kubernetes-Certified-326CE5?style=for-the-badge&logo=kubernetes" />
  <img src="https://img.shields.io/badge/Terraform-IaC-7B42BC?style=for-the-badge&logo=terraform" />
  <img src="https://img.shields.io/badge/GitOps-Practitioner-F05032?style=for-the-badge&logo=git" />
</p>`);
  parts.push('');
  parts.push('## 🔧 About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🛠️ DevOps Toolchain

| Category | Tools |
|----------|-------|
| 🔄 CI/CD | GitHub Actions, Jenkins, GitLab CI, ArgoCD |
| 🐳 Containers | Docker, Kubernetes, Helm, Podman |
| 🏗️ IaC | Terraform, Pulumi, Ansible, CloudFormation |
| 📊 Monitoring | Prometheus, Grafana, Datadog, ELK Stack |
| 🔒 Security | Vault, OPA, Trivy, SonarQube |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function blockchainTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'Blockchain Developer';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'Blockchain & Web3 Developer'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/Web3-Developer-F16822?style=for-the-badge&logo=web3dotjs" />
  <img src="https://img.shields.io/badge/Solidity-Smart%20Contracts-363636?style=for-the-badge&logo=solidity" />
  <img src="https://img.shields.io/badge/DeFi-Builder-purple?style=for-the-badge&logo=ethereum" />
</p>`);
  parts.push('');
  parts.push('## ⛓️ About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🔗 Blockchain Ecosystem

| Area | Technologies |
|------|-------------|
| ⛏️ Chains | Ethereum, Solana, Polygon, BNB Chain, Avalanche |
| 📜 Smart Contracts | Solidity, Rust, Vyper, Move |
| 🏦 DeFi | Uniswap, Aave, Compound, MakerDAO |
| 🖼️ NFTs | ERC-721, ERC-1155, OpenSea, IPFS |
| 🛠️ Dev Tools | Hardhat, Foundry, Truffle, Ethers.js, Wagmi |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function iotTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'IoT Engineer';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'IoT & Embedded Systems Engineer'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/IoT-Engineer-00979D?style=for-the-badge&logo=arduino" />
  <img src="https://img.shields.io/badge/Raspberry%20Pi-Developer-A22846?style=for-the-badge&logo=raspberrypi" />
  <img src="https://img.shields.io/badge/MQTT-Protocol-660066?style=for-the-badge&logo=mqtt" />
</p>`);
  parts.push('');
  parts.push('## 📡 About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🌐 IoT Ecosystem

| Layer | Technologies |
|-------|-------------|
| 🔌 Hardware | Arduino, Raspberry Pi, ESP32, STM32 |
| 📡 Communication | MQTT, CoAP, LoRaWAN, Zigbee, BLE |
| ☁️ Cloud IoT | AWS IoT, Azure IoT Hub, Google Cloud IoT |
| 📊 Analytics | InfluxDB, Grafana, Kibana, Time-series data |
| 🔒 Security | TLS/DTLS, Device Authentication, OTA Updates |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function computerVisionTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'Computer Vision Engineer';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'Computer Vision Engineer'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/Computer%20Vision-Expert-5C3EE8?style=for-the-badge&logo=opencv" />
  <img src="https://img.shields.io/badge/PyTorch-Vision-EE4C2C?style=for-the-badge&logo=pytorch" />
  <img src="https://img.shields.io/badge/YOLO-Real%20Time%20Detection-00FFFF?style=for-the-badge" />
</p>`);
  parts.push('');
  parts.push('## 👁️ About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🔭 CV Research Areas

| Domain | Techniques |
|--------|-----------|
| 🖼️ Image Classification | CNNs, ViT, EfficientNet, ResNet |
| 📦 Object Detection | YOLO, DETR, Faster R-CNN, SSD |
| 🎭 Segmentation | SAM, Mask R-CNN, U-Net, DeepLab |
| 🎬 Video Analysis | Optical Flow, Tracking, Action Recognition |
| 🏭 Industrial CV | Defect Detection, OCR, 3D Reconstruction |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function nlpTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'NLP Engineer';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'Natural Language Processing Engineer'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/NLP-Engineer-yellow?style=for-the-badge&logo=huggingface" />
  <img src="https://img.shields.io/badge/Transformers-Expert-red?style=for-the-badge&logo=pytorch" />
  <img src="https://img.shields.io/badge/LLM-Builder-blueviolet?style=for-the-badge&logo=openai" />
</p>`);
  parts.push('');
  parts.push('## 💬 About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🗣️ NLP Expertise

| Task | Models & Tools |
|------|---------------|
| 📝 Text Classification | BERT, RoBERTa, DistilBERT |
| 🔍 Information Extraction | NER, Relation Extraction, RE |
| 💡 Text Generation | GPT, T5, LLaMA, Mistral |
| 🌍 Translation & Summarization | mBERT, mT5, BART, Pegasus |
| 🎯 RAG & Embeddings | LangChain, LlamaIndex, FAISS, Pinecone |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function roboticsTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'Robotics Engineer';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'Robotics & Automation Engineer'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/ROS-Expert-22314E?style=for-the-badge&logo=ros" />
  <img src="https://img.shields.io/badge/Robotics-Engineer-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Autonomous-Systems-orange?style=for-the-badge" />
</p>`);
  parts.push('');
  parts.push('## 🤖 About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🦾 Robotics Domains

| Domain | Skills |
|--------|--------|
| 🗺️ Navigation | SLAM, Path Planning, A*, RRT |
| 👁️ Perception | LiDAR, Depth Cameras, Sensor Fusion |
| 🦿 Manipulation | Inverse Kinematics, Grasp Planning |
| 🧠 Control | PID, MPC, Reinforcement Learning |
| 🛠️ Frameworks | ROS2, MoveIt, Gazebo, OpenCV |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function gameDevelopmentTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'Game Developer';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'Game Developer & Designer'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/Unity-Developer-000000?style=for-the-badge&logo=unity" />
  <img src="https://img.shields.io/badge/Unreal%20Engine-Expert-0E1128?style=for-the-badge&logo=unrealengine" />
  <img src="https://img.shields.io/badge/Godot-Enthusiast-478CBF?style=for-the-badge&logo=godotengine" />
</p>`);
  parts.push('');
  parts.push('## 🎮 About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🕹️ Game Dev Stack

| Area | Tools & Skills |
|------|---------------|
| 🎲 Engines | Unity (C#), Unreal Engine (C++/BP), Godot (GDScript) |
| 🎨 Art Pipeline | Blender, Substance Painter, Photoshop |
| 🔊 Audio | FMOD, Wwise, Unity Audio |
| 🌐 Multiplayer | Photon, Mirror, Netcode for GameObjects |
| 📦 Publishing | Steam, Epic Games Store, Itch.io |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function embeddedSystemsTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'Embedded Systems Engineer';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'Embedded Systems Engineer'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/Embedded-Engineer-00979D?style=for-the-badge&logo=arduino" />
  <img src="https://img.shields.io/badge/RTOS-Expert-A22846?style=for-the-badge&logo=raspberrypi" />
  <img src="https://img.shields.io/badge/Firmware-Developer-lightgrey?style=for-the-badge" />
</p>`);
  parts.push('');
  parts.push('## 🔌 About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🖥️ Embedded Expertise

| Category | Technologies |
|----------|-------------|
| 🧩 Microcontrollers | STM32, ESP32, AVR, ARM Cortex-M |
| 🔄 RTOS | FreeRTOS, Zephyr, VxWorks, CMSIS |
| 🛠️ Languages | C, C++, Assembly, Rust (Embedded) |
| 📡 Protocols | SPI, I2C, UART, CAN, Ethernet |
| 🔧 Tools | JTAG/SWD Debugging, Logic Analyzer, Oscilloscope |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function arTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'AR Developer';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'Augmented Reality Developer'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/AR-Developer-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/ARKit-Expert-000000?style=for-the-badge&logo=apple" />
  <img src="https://img.shields.io/badge/Spatial%20Computing-Pioneer-purple?style=for-the-badge" />
</p>`);
  parts.push('');
  parts.push('## 🥽 About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🪩 AR Development Stack

| Platform | Tools & SDKs |
|----------|-------------|
| 📱 Mobile AR | ARKit (iOS), ARCore (Android), Vuforia |
| 🥽 Headsets | Microsoft HoloLens, Magic Leap, Apple Vision Pro |
| 🌐 WebAR | AR.js, 8th Wall, WebXR, Three.js |
| 🎮 Engines | Unity (AR Foundation), Unreal Engine |
| 🔧 3D Tools | Blender, Reality Composer, Spark AR |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function vrTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'VR Developer';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'Virtual Reality Developer'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/VR-Developer-FF6B35?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Meta%20Quest-Developer-1877F2?style=for-the-badge&logo=meta" />
  <img src="https://img.shields.io/badge/Immersive-Experiences-9B59B6?style=for-the-badge" />
</p>`);
  parts.push('');
  parts.push('## 🌐 About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🎯 VR Development Stack

| Platform | Technologies |
|----------|-------------|
| 🥽 Headsets | Meta Quest, PlayStation VR, Valve Index, Pico |
| 🎮 Engines | Unity (XR Toolkit), Unreal Engine (VR Template) |
| 🌐 WebVR | A-Frame, Babylon.js, WebXR Device API |
| 🔊 Spatial Audio | Steam Audio, Resonance Audio, FMOD |
| 🤝 Social VR | Normcore, Photon, Mirror Networking |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function bigDataTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'Big Data Engineer';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'Big Data Engineer'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/Apache%20Spark-Expert-E25A1C?style=for-the-badge&logo=apachespark" />
  <img src="https://img.shields.io/badge/Kafka-Streaming-231F20?style=for-the-badge&logo=apachekafka" />
  <img src="https://img.shields.io/badge/Data%20Lake-Architect-0096FF?style=for-the-badge" />
</p>`);
  parts.push('');
  parts.push('## 🗄️ About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🏗️ Big Data Ecosystem

| Layer | Technologies |
|-------|-------------|
| 📥 Ingestion | Apache Kafka, Kinesis, Fluentd, Logstash |
| ⚡ Processing | Apache Spark, Flink, Beam, Dask |
| 🗄️ Storage | HDFS, Delta Lake, Apache Iceberg, S3 |
| 🔍 Query | Presto, Trino, Hive, Clickhouse, BigQuery |
| 🔄 Orchestration | Apache Airflow, Prefect, Dagster |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function softwareEngineeringTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'Software Engineer';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'Software Engineer'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/Clean%20Code-Advocate-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Design%20Patterns-Expert-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/SOLID-Principles-orange?style=for-the-badge" />
</p>`);
  parts.push('');
  parts.push('## 💡 About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🏛️ Engineering Principles

| Principle | Practice |
|-----------|----------|
| 🏗️ Architecture | Microservices, Hexagonal, Event-Driven, DDD |
| 🧪 Testing | TDD, BDD, Unit, Integration, E2E Testing |
| 📐 Design | SOLID, DRY, KISS, YAGNI, Design Patterns |
| 🔄 Agile | Scrum, Kanban, CI/CD, Code Reviews |
| ⚡ Performance | Profiling, Caching, Async, Scalability |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

function quantumComputingTemplate(
  profile: ProfileData, portfolio: PortfolioLinks, social: SocialLinksData,
  skills: SkillsData, githubStats: GitHubStatsOptions,
): string {
  const name = profile.fullName || 'Quantum Engineer';
  const parts: string[] = [];
  parts.push(generateBanner(name, profile.title || 'Quantum Computing Researcher'));
  parts.push('');
  parts.push(`<p align="center">
  <img src="https://img.shields.io/badge/Quantum-Computing-6929C4?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Qiskit-Developer-6929C4?style=for-the-badge&logo=ibm" />
  <img src="https://img.shields.io/badge/Post%20Quantum-Cryptography-darkblue?style=for-the-badge" />
</p>`);
  parts.push('');
  parts.push('## ⚛️ About Me\n');
  parts.push(generateAboutSection(profile));
  parts.push('');
  parts.push(`## 🔬 Quantum Research Areas

| Area | Details |
|------|---------|
| 🔮 Quantum Algorithms | Shor'S, Grover's, QAOA, VQE |
| 🔑 Quantum Cryptography | QKD, Post-Quantum Crypto, BB84 |
| 🧠 Quantum ML | QNN, Quantum Kernels, Variational Circuits |
| 🛠️ Frameworks | Qiskit, Cirq, PennyLane, Braket |
| 💻 Hardware | IBM Q, IonQ, Rigetti, Photonic Qubits |`);
  const skills_ = generateSkillsSection(skills);
  if (skills_) parts.push('', skills_);
  const social_ = generateSocialSection(social);
  if (social_) parts.push('', social_);
  const portfolio_ = generatePortfolioSection(portfolio);
  if (portfolio_) parts.push('', portfolio_);
  if (profile.githubUsername) parts.push('', generateGitHubStatsSection(profile.githubUsername, githubStats));
  parts.push('', generateFooter(name));
  return parts.join('\n');
}

// ── Main Export ──────────────────────────────────────────────────────────────

export function generateMarkdown(
  template: TemplateType,
  profile: ProfileData,
  portfolio: PortfolioLinks,
  social: SocialLinksData,
  skills: SkillsData,
  githubStats: GitHubStatsOptions,
): string {
  switch (template) {
    case 'minimal':
      return minimalTemplate(profile, portfolio, social, skills, githubStats);
    case 'modern':
      return modernTemplate(profile, portfolio, social, skills, githubStats);
    case 'ai-engineer':
      return aiEngineerTemplate(profile, portfolio, social, skills, githubStats);
    case 'data-scientist':
      return dataScientistTemplate(profile, portfolio, social, skills, githubStats);
    case 'open-source':
      return openSourceTemplate(profile, portfolio, social, skills, githubStats);
    case 'devops':
      return devopsTemplate(profile, portfolio, social, skills, githubStats);
    case 'artificial-intelligence':
      return artificialIntelligenceTemplate(profile, portfolio, social, skills, githubStats);
    case 'machine-learning':
      return machineLearningTemplate(profile, portfolio, social, skills, githubStats);
    case 'data-science':
      return dataScienceTemplate(profile, portfolio, social, skills, githubStats);
    case 'cybersecurity':
      return cybersecurityTemplate(profile, portfolio, social, skills, githubStats);
    case 'cloud-computing':
      return cloudComputingTemplate(profile, portfolio, social, skills, githubStats);
    case 'web-development':
      return webDevelopmentTemplate(profile, portfolio, social, skills, githubStats);
    case 'mobile-development':
      return mobileDevelopmentTemplate(profile, portfolio, social, skills, githubStats);
    case 'devops-engineering':
      return devopsEngineeringTemplate(profile, portfolio, social, skills, githubStats);
    case 'blockchain':
      return blockchainTemplate(profile, portfolio, social, skills, githubStats);
    case 'iot':
      return iotTemplate(profile, portfolio, social, skills, githubStats);
    case 'computer-vision':
      return computerVisionTemplate(profile, portfolio, social, skills, githubStats);
    case 'nlp':
      return nlpTemplate(profile, portfolio, social, skills, githubStats);
    case 'robotics':
      return roboticsTemplate(profile, portfolio, social, skills, githubStats);
    case 'game-development':
      return gameDevelopmentTemplate(profile, portfolio, social, skills, githubStats);
    case 'embedded-systems':
      return embeddedSystemsTemplate(profile, portfolio, social, skills, githubStats);
    case 'ar':
      return arTemplate(profile, portfolio, social, skills, githubStats);
    case 'vr':
      return vrTemplate(profile, portfolio, social, skills, githubStats);
    case 'big-data':
      return bigDataTemplate(profile, portfolio, social, skills, githubStats);
    case 'software-engineering':
      return softwareEngineeringTemplate(profile, portfolio, social, skills, githubStats);
    case 'quantum-computing':
      return quantumComputingTemplate(profile, portfolio, social, skills, githubStats);
    default:
      return modernTemplate(profile, portfolio, social, skills, githubStats);
  }
}
