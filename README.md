<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,12,19&height=180&section=header&text=GitHub%20README%20Generator&fontSize=42&fontAlignY=36&animation=twinkling&fontColor=white" />

<h3>⚡ Build a stunning GitHub Profile README in minutes</h3>
<p>No markdown knowledge needed · No sign-up · 100% Free & Open Source</p>

<br/>

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

[![Live Demo](https://stunning-syrniki-ad75b0.netlify.app/)
[![GitHub Stars](https://img.shields.io/github/stars/vishalharkal15/github-readme-generator?style=for-the-badge&logo=github&color=yellow)](https://github.com/vishalharkal15/github-readme-generator/stargazers)

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Templates](#-templates)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 🌟 About

**GitHub README Generator** is a powerful, browser-based tool that lets developers create professional GitHub profile READMEs without writing a single line of markdown.

Simply fill in your profile details, choose a domain template, add your skill badges and social links — and get a polished, ready-to-paste README in seconds. Live preview updates as you type so you always know exactly what your profile will look like.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **25+ Domain Templates** | AI, ML, DevOps, Blockchain, Cybersecurity, Robotics, Game Dev & more |
| ⚡ **Real-time Preview** | Instant rendered preview that updates as you type |
| 🏅 **Auto Skill Badges** | Shields.io badges auto-generated for 40+ languages, frameworks & tools |
| 📊 **GitHub Stats Cards** | Embed stats, streaks, top languages and trophies with one toggle |
| ✏️ **Raw Markdown Editor** | Edit the generated markdown directly and apply changes to preview |
| 📋 **One-click Export** | Copy to clipboard or download `README.md` instantly |
| 🤝 **Social Profile Badges** | GitHub, LinkedIn, Twitter, Dev.to, Medium, Kaggle & more |
| 🔗 **Portfolio Links** | Portfolio website, blog, resume, project showcase |
| 🌙 **Dark / Light Mode** | Full dark and light theme throughout the editor |
| 📱 **Responsive Design** | Works on desktop and mobile |

---

## 🛠 Tech Stack

- **Framework** — [React 19](https://react.dev) + [TypeScript 5.9](https://www.typescriptlang.org)
- **Build Tool** — [Vite 7](https://vitejs.dev)
- **Styling** — [Tailwind CSS v4](https://tailwindcss.com) + [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)
- **Markdown** — [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm) + [rehype-raw](https://github.com/rehypejs/rehype-raw)
- **Icons** — [react-icons](https://react-icons.github.io/react-icons)
- **Badges** — [Shields.io](https://shields.io)

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- npm / yarn / pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/vishalharkal15/github-readme-generator.git

# 2. Navigate into the project
cd github-readme-generator

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
github-readme-generator/
├── public/
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx       # Marketing landing page
│   │   ├── PreviewPanel.tsx      # Live markdown preview + raw editor
│   │   ├── ProfileForm.tsx       # Profile details form
│   │   ├── SkillsSelector.tsx    # Skills & tech stack picker
│   │   ├── SocialLinks.tsx       # Social profiles & portfolio links
│   │   └── TemplateSelector.tsx  # Template picker + GitHub stats options
│   ├── generator/
│   │   └── markdownGenerator.ts  # Core markdown generation logic
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   ├── utils/
│   │   └── badgeGenerator.ts     # Shields.io badge generators
│   ├── App.tsx                   # Root component & state management
│   └── main.tsx                  # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.js
```

---

## 🎨 Templates

26 domain-specific templates available:

| Category | Templates |
|---|---|
| **General** | Minimal, Modern, Open Source |
| **AI / Data** | Artificial Intelligence, Machine Learning, Data Science, Computer Vision, NLP |
| **Engineering** | Software Engineering, Embedded Systems, Robotics, Quantum Computing |
| **Web / Mobile** | Web Development, Mobile Development |
| **Cloud / DevOps** | DevOps Engineering, Cloud Computing |
| **Security** | Cybersecurity |
| **Emerging Tech** | Blockchain, IoT, AR, VR, Big Data, Game Development |

---

## 🤝 Contributing

Contributions are **welcome and appreciated!** Whether it's a bug fix, a new template, or a UI improvement — every contribution helps.

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit** your changes
   ```bash
   git commit -m "feat: add your feature description"
   ```
4. **Push** to your branch
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open** a Pull Request

### Ideas for Contributions

- 🆕 New domain templates
- 🏅 Additional skill badges
- 🌐 New social platform badges
- 🐛 Bug fixes & improvements
- 💅 UI / UX enhancements
- 📖 Documentation improvements

> Please follow the existing code style and keep PRs focused on a single change.

---

## 👤 Author

<div align="center">

**Vishal Harkal**

[![GitHub](https://img.shields.io/badge/GitHub-vishalharkal15-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/vishalharkal15)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-vishalharkal-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/vishalharkal)

</div>

---

## 📄 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,12,19&height=100&section=footer" />

</div>

