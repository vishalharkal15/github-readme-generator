import type { TemplateType, GitHubStatsOptions } from '../types';

interface Props {
  template: TemplateType;
  githubStats: GitHubStatsOptions;
  onTemplateChange: (t: TemplateType) => void;
  onStatsChange: (s: GitHubStatsOptions) => void;
}

const TEMPLATES: { id: TemplateType; name: string; description: string; icon: string; tags: string[] }[] = [
  {
    id: 'minimal',
    name: 'Minimal Developer',
    description: 'Clean, simple, no-frills. Let your work speak for itself.',
    icon: '🎯',
    tags: ['Simple', 'Clean'],
  },
  {
    id: 'modern',
    name: 'Modern Developer',
    description: 'Animated banner, typing effect, and full stats with visual flair.',
    icon: '✨',
    tags: ['Animated', 'Full Stats', 'Popular'],
  },
  {
    id: 'ai-engineer',
    name: 'AI Engineer',
    description: 'Tailored for ML & AI practitioners with research-focused sections.',
    icon: '🤖',
    tags: ['AI/ML', 'Research'],
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    description: 'Expertise tables, data philosophy and analytics-driven layout.',
    icon: '📊',
    tags: ['Data', 'Analytics'],
  },
  {
    id: 'open-source',
    name: 'Open Source Maintainer',
    description: 'Follower badge, profile views, and community-first philosophy.',
    icon: '🌍',
    tags: ['Open Source', 'Community'],
  },
  {
    id: 'devops',
    name: 'DevOps / Cloud Engineer',
    description: 'CI/CD, IaC, containers, and observability-focused layout.',
    icon: '⚙️',
    tags: ['DevOps', 'Cloud', 'Automation'],
  },
  {
    id: 'artificial-intelligence',
    name: 'Artificial Intelligence (AI)',
    description: 'LLMs, generative AI, reinforcement learning, and AI deployment sections.',
    icon: '🧠',
    tags: ['AI', 'LLM', 'GenAI'],
  },
  {
    id: 'machine-learning',
    name: 'Machine Learning (ML)',
    description: 'End-to-end ML pipeline, MLOps, model training and deployment.',
    icon: '🤖',
    tags: ['ML', 'MLOps', 'Pipelines'],
  },
  {
    id: 'data-science',
    name: 'Data Science',
    description: 'Analytics, visualization, and data storytelling focused layout.',
    icon: '📊',
    tags: ['Data', 'Analytics', 'Visualization'],
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Red/blue team, AppSec, network security, and cryptography sections.',
    icon: '🛡️',
    tags: ['Security', 'CTF', 'Hacking'],
  },
  {
    id: 'cloud-computing',
    name: 'Cloud Computing',
    description: 'Multi-cloud architecture, cost optimization, and reliability pillars.',
    icon: '☁️',
    tags: ['AWS', 'Azure', 'GCP'],
  },
  {
    id: 'web-development',
    name: 'Web Development',
    description: 'Full-stack web developer with frontend, backend, and deployment stack.',
    icon: '🌐',
    tags: ['Frontend', 'Backend', 'Full-Stack'],
  },
  {
    id: 'mobile-development',
    name: 'Mobile App Development',
    description: 'iOS, Android, and cross-platform mobile developer template.',
    icon: '📱',
    tags: ['iOS', 'Android', 'Flutter'],
  },
  {
    id: 'devops-engineering',
    name: 'DevOps Engineering',
    description: 'Full DevOps toolchain: CI/CD, Kubernetes, IaC, and monitoring.',
    icon: '🔧',
    tags: ['Kubernetes', 'Terraform', 'GitOps'],
  },
  {
    id: 'blockchain',
    name: 'Blockchain Technology',
    description: 'Web3, smart contracts, DeFi, NFTs, and blockchain dev tools.',
    icon: '⛓️',
    tags: ['Web3', 'Solidity', 'DeFi'],
  },
  {
    id: 'iot',
    name: 'Internet of Things (IoT)',
    description: 'IoT devices, protocols, cloud platforms, and edge computing.',
    icon: '📡',
    tags: ['IoT', 'Arduino', 'MQTT'],
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision',
    description: 'Image classification, object detection, segmentation, and video analysis.',
    icon: '👁️',
    tags: ['CV', 'YOLO', 'OpenCV'],
  },
  {
    id: 'nlp',
    name: 'Natural Language Processing (NLP)',
    description: 'Transformers, LLMs, RAG pipelines, and NLP task expertise.',
    icon: '💬',
    tags: ['NLP', 'Transformers', 'RAG'],
  },
  {
    id: 'robotics',
    name: 'Robotics',
    description: 'ROS, navigation, perception, manipulation, and control systems.',
    icon: '🦾',
    tags: ['ROS', 'SLAM', 'Autonomy'],
  },
  {
    id: 'game-development',
    name: 'Game Development',
    description: 'Unity, Unreal Engine, Godot, multiplayer, and game publishing.',
    icon: '🎮',
    tags: ['Unity', 'Unreal', 'Godot'],
  },
  {
    id: 'embedded-systems',
    name: 'Embedded Systems',
    description: 'Microcontrollers, RTOS, firmware development, and hardware protocols.',
    icon: '🔌',
    tags: ['Firmware', 'RTOS', 'STM32'],
  },
  {
    id: 'ar',
    name: 'Augmented Reality (AR)',
    description: 'ARKit, ARCore, HoloLens, WebAR, and spatial computing.',
    icon: '🥽',
    tags: ['AR', 'ARKit', 'WebXR'],
  },
  {
    id: 'vr',
    name: 'Virtual Reality (VR)',
    description: 'Meta Quest, PlayStation VR, WebVR, spatial audio, and social VR.',
    icon: '🌐',
    tags: ['VR', 'Meta Quest', 'WebXR'],
  },
  {
    id: 'big-data',
    name: 'Big Data Engineering',
    description: 'Spark, Kafka, data lakes, distributed query, and orchestration.',
    icon: '🗄️',
    tags: ['Spark', 'Kafka', 'Data Lake'],
  },
  {
    id: 'software-engineering',
    name: 'Software Engineering',
    description: 'Clean architecture, design patterns, TDD, and engineering principles.',
    icon: '💡',
    tags: ['Architecture', 'SOLID', 'TDD'],
  },
  {
    id: 'quantum-computing',
    name: 'Quantum Computing',
    description: 'Quantum algorithms, cryptography, Qiskit, and quantum ML.',
    icon: '⚛️',
    tags: ['Quantum', 'Qiskit', 'PennyLane'],
  },
  {
    id: 'creative-developer',
    name: 'Creative Developer',
    description: 'Generative art, creative coding, interactive experiences, and design-meets-code projects.',
    icon: '🎨',
    tags: ['Creative Coding', 'Generative Art', 'Interactive'],
  },
];

const STATS_THEMES = [
  'default', 'dark', 'radical', 'merko', 'gruvbox', 'tokyonight',
  'onedark', 'cobalt', 'synthwave', 'highcontrast', 'dracula',
];

export default function TemplateSelector({ template, githubStats, onTemplateChange, onStatsChange }: Props) {
  const setStats = (field: keyof GitHubStatsOptions) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    onStatsChange({ ...githubStats, [field]: value });
  };

  return (
    <div className="space-y-6">
      {/* Template Picker */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
          <span className="text-2xl">🎨</span> Choose Your Template
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => onTemplateChange(t.id)}
              className={`text-left p-4 rounded-xl border-2 transition-all duration-150 ${
                template === t.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <div className="font-semibold text-sm text-gray-800 dark:text-white">{t.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{t.description}</div>
                  </div>
                </div>
                {template === t.id && (
                  <span className="text-blue-500 text-lg">✓</span>
                )}
              </div>
              <div className="flex gap-1.5 mt-2">
                {t.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      <hr className="border-gray-100 dark:border-gray-700" />

      {/* GitHub Stats Options */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
          <span className="text-2xl">📊</span> GitHub Stats Options
        </h2>
        <div className="space-y-3">
          {(
            [
              { key: 'showStats', label: 'GitHub Stats Card', icon: '📈' },
              { key: 'showTopLangs', label: 'Top Languages Card', icon: '🗣️' },
              { key: 'showStreak', label: 'Contribution Streak', icon: '🔥' },
              { key: 'showTrophy', label: 'GitHub Trophy', icon: '🏆' },
            ] as const
          ).map(({ key, label, icon }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={githubStats[key]}
                onChange={setStats(key)}
                className="w-4 h-4 rounded accent-blue-600"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                {icon} {label}
              </span>
            </label>
          ))}

          <div className="mt-4">
            <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1">
              Stats Theme
            </label>
            <select
              value={githubStats.statsTheme}
              onChange={setStats('statsTheme')}
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              {STATS_THEMES.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
