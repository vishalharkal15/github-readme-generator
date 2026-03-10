import { useState, useMemo, useCallback } from 'react';
import { FaGithub, FaEnvelope, FaHeart, FaCodeBranch } from 'react-icons/fa';
import LandingPage from './components/LandingPage';
import ProfileForm from './components/ProfileForm';
import SkillsSelector from './components/SkillsSelector';
import SocialLinks from './components/SocialLinks';
import TemplateSelector from './components/TemplateSelector';
import PreviewPanel from './components/PreviewPanel';
import { generateMarkdown } from './generator/markdownGenerator';
import type { AppState } from './types';

const INITIAL_STATE: AppState = {
  profile: {
    fullName: '',
    title: '',
    bio: '',
    currentWork: '',
    learning: '',
    email: '',
    location: '',
    pronouns: '',
    funFact: '',
    githubUsername: '',
  },
  portfolio: {
    portfolioWebsite: '',
    blog: '',
    resume: '',
    projectShowcase: '',
    personalWebsite: '',
  },
  social: {
    github: '',
    linkedin: '',
    twitter: '',
    devto: '',
    medium: '',
    stackoverflow: '',
    kaggle: '',
    youtube: '',
    discord: '',
  },
  skills: {
    languages: [],
    frameworks: [],
    databases: [],
    cloud: [],
  },
  template: 'modern',
  githubStats: {
    showStats: true,
    showTopLangs: true,
    showStreak: true,
    showTrophy: false,
    statsTheme: 'tokyonight',
  },
  activeStep: 0,
  darkMode: false,
};

const STEPS = [
  { id: 0, label: 'Profile', icon: '🙋‍♂️' },
  { id: 1, label: 'Social & Links', icon: '🔗' },
  { id: 2, label: 'Skills', icon: '🛠️' },
  { id: 3, label: 'Template', icon: '🎨' },
];

export default function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [showHome, setShowHome] = useState(true);
  const [markdownOverride, setMarkdownOverride] = useState<string | null>(null);

  const setField = useCallback(
    <K extends keyof AppState>(key: K) =>
      (value: AppState[K]) => {
        setState((prev) => ({ ...prev, [key]: value }));
        setMarkdownOverride(null); // clear any manual edits when form changes
      },
    [],
  );

  const generatedMarkdown = useMemo(
    () =>
      generateMarkdown(
        state.template,
        state.profile,
        state.portfolio,
        state.social,
        state.skills,
        state.githubStats,
      ),
    [state.template, state.profile, state.portfolio, state.social, state.skills, state.githubStats],
  );

  const markdown = markdownOverride ?? generatedMarkdown;

  const toggleDark = () => {
    setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));
    document.documentElement.classList.toggle('dark');
  };

  const qualityScore = useMemo(() => {
    let score = 0;
    if (state.profile.fullName) score += 10;
    if (state.profile.title) score += 10;
    if (state.profile.bio) score += 10;
    if (state.profile.githubUsername) score += 15;
    if (state.profile.email) score += 5;
    if (state.profile.currentWork) score += 5;
    if (state.profile.learning) score += 5;
    const skillCount = Object.values(state.skills).flat().length;
    score += Math.min(skillCount * 2, 20);
    const socialCount = Object.values(state.social).filter(Boolean).length;
    score += Math.min(socialCount * 2, 10);
    const portfolioCount = Object.values(state.portfolio).filter(Boolean).length;
    score += Math.min(portfolioCount * 2, 10);
    return Math.min(score, 100);
  }, [state.profile, state.skills, state.social, state.portfolio]);

  const qualityColor =
    qualityScore >= 80 ? 'text-green-500' : qualityScore >= 50 ? 'text-yellow-500' : 'text-red-500';

  if (showHome) {
    return (
      <LandingPage
        onGetStarted={() => setShowHome(false)}
        darkMode={state.darkMode}
        onToggleDark={toggleDark}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 transition-colors duration-300">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-5 py-0 flex items-center justify-between h-14">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-md flex items-center justify-center">
              <FaGithub className="text-white dark:text-gray-900 text-lg" />
            </div>
            <div>
              <span className="font-bold text-gray-900 dark:text-white text-sm tracking-tight">
                GitHub README Generator
              </span>
              <span className="hidden sm:inline text-gray-400 dark:text-gray-500 text-xs ml-2">
                by @vishalharkal
              </span>
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* Home button */}
            <button
              onClick={() => setShowHome(true)}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              🏠 Home
            </button>
            {/* Quality Score */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">README Score</span>
              <span className={`text-xs font-bold ${qualityColor}`}>{qualityScore}%</span>
              <div className="w-14 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    qualityScore >= 80 ? 'bg-green-500' : qualityScore >= 50 ? 'bg-yellow-500' : 'bg-red-400'
                  }`}
                  style={{ width: `${qualityScore}%` }}
                />
              </div>
            </div>

            {/* GitHub link */}
            <a
              href="https://github.com/vishalharkal15"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold border border-gray-200 dark:border-gray-700 rounded bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <FaGithub className="text-sm" />
              <span className="hidden sm:inline">vishalharkal15</span>
            </a>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm"
              aria-label="Toggle dark mode"
            >
              {state.darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 max-w-screen-2xl w-full mx-auto px-4 py-5 flex gap-5 overflow-hidden" style={{ height: 'calc(100vh - 57px - 72px)' }}>

        {/* Left Panel */}
        <div className="w-full lg:w-[440px] xl:w-[480px] flex flex-col shrink-0 gap-4">

          {/* Step tabs */}
          <div className="flex border border-gray-200 dark:border-gray-700 rounded bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
            {STEPS.map((step, i) => (
              <button
                key={step.id}
                onClick={() => setState((prev) => ({ ...prev, activeStep: step.id }))}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold transition ${
                  i !== 0 ? 'border-l border-gray-200 dark:border-gray-700' : ''
                } ${
                  state.activeStep === step.id
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <span>{step.icon}</span>
                <span className="hidden sm:inline">{step.label}</span>
              </button>
            ))}
          </div>

          {/* Form card */}
          <div className="flex-1 overflow-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-sm p-5">
            {state.activeStep === 0 && <ProfileForm profile={state.profile} onChange={setField('profile')} />}
            {state.activeStep === 1 && (
              <SocialLinks
                social={state.social}
                portfolio={state.portfolio}
                onSocialChange={setField('social')}
                onPortfolioChange={setField('portfolio')}
              />
            )}
            {state.activeStep === 2 && <SkillsSelector skills={state.skills} onChange={setField('skills')} />}
            {state.activeStep === 3 && (
              <TemplateSelector
                template={state.template}
                githubStats={state.githubStats}
                onTemplateChange={setField('template')}
                onStatsChange={setField('githubStats')}
              />
            )}
          </div>

          {/* Prev / Next */}
          <div className="flex gap-3">
            <button
              onClick={() => setState((prev) => ({ ...prev, activeStep: Math.max(0, prev.activeStep - 1) }))}
              disabled={state.activeStep === 0}
              className="flex-1 py-2 px-4 text-sm font-semibold border border-gray-200 dark:border-gray-700 rounded text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              ← Previous
            </button>
            <button
              onClick={() => setState((prev) => ({ ...prev, activeStep: Math.min(STEPS.length - 1, prev.activeStep + 1) }))}
              disabled={state.activeStep === STEPS.length - 1}
              className="flex-1 py-2 px-4 text-sm font-semibold rounded bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Right Panel – Preview */}
        <div className="flex-1 hidden lg:flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded shadow-sm overflow-hidden">
          <PreviewPanel markdown={markdown} onMarkdownChange={setMarkdownOverride} />
        </div>
      </main>

      {/* Mobile Preview Button */}
      <div className="lg:hidden fixed bottom-20 right-5 z-40">
        <button
          onClick={() => document.getElementById('mobile-preview')?.classList.toggle('hidden')}
          className="px-4 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded shadow-lg hover:bg-gray-700 transition"
        >
          👁 Preview README
        </button>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-screen-2xl mx-auto px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">

          {/* Left – copyright */}
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()}</span>
            <span className="font-semibold text-gray-700 dark:text-gray-200">@vishalharkal</span>
            <span>· All rights reserved</span>
          </div>

          {/* Center – built by */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              Built with <FaHeart className="text-red-500 mx-0.5" /> by
              <a
                href="https://github.com/vishalharkal15"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 font-semibold text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition"
              >
                <FaGithub /> @vishalharkal
              </a>
            </span>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <a
              href="mailto:vishalharkal@dietms.org"
              className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              <FaEnvelope /> vishalharkal@dietms.org
            </a>
          </div>

          {/* Right – contribute */}
          <a
            href="https://github.com/vishalharkal15/github-readme-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-semibold text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition"
          >
            <FaCodeBranch /> Contributions Welcome
          </a>
        </div>
      </footer>
    </div>
  );
}
