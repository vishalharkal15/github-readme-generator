import { FaGithub, FaHeart, FaCodeBranch, FaStar } from 'react-icons/fa';

interface Props {
  onGetStarted: () => void;
  darkMode: boolean;
  onToggleDark: () => void;
}

const FEATURES = [
  { icon: '🎨', title: '25+ Templates', desc: 'AI, DevOps, Web, Blockchain, Robotics & more.' },
  { icon: '⚡', title: 'Live Preview',   desc: 'See your rendered README update as you type.'  },
  { icon: '🏅', title: 'Skill Badges',   desc: 'Auto-generated shields.io badges for your stack.' },
  { icon: '📊', title: 'GitHub Stats',   desc: 'Stats cards, streaks & trophies in one click.'  },
  { icon: '📋', title: 'Copy & Download', desc: 'Copy markdown or download README.md instantly.' },
  { icon: '🌙', title: 'Dark Mode',      desc: 'Full dark / light theme support.'              },
];

const HOW = [
  { n: '1', label: 'Fill your profile',    desc: 'Name, title, bio, GitHub username.'             },
  { n: '2', label: 'Add socials & skills', desc: 'Link profiles and pick your tech stack badges.' },
  { n: '3', label: 'Pick a template',      desc: 'Choose the layout that fits your domain.'       },
  { n: '4', label: 'Copy & paste',         desc: 'Download or copy and push to GitHub.'           },
];

export default function LandingPage({ onGetStarted, darkMode, onToggleDark }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gray-900 dark:bg-white rounded flex items-center justify-center">
              <FaGithub className="text-white dark:text-gray-900 text-sm" />
            </div>
            <span className="font-bold text-sm tracking-tight">GitHub README Generator</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/vishalharkal15/github-readme-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <FaStar className="text-yellow-400" /> Star
            </a>
            <button
              onClick={onToggleDark}
              className="w-8 h-8 flex items-center justify-center text-sm border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={onGetStarted}
              className="px-4 py-1.5 text-xs font-bold rounded bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-80 transition"
            >
              Open Editor →
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="py-20 sm:py-28 px-6 text-center border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block px-3 py-1 mb-5 text-xs font-semibold rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
            Free &amp; Open Source
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-5">
            Create a professional<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-500">
              GitHub Profile README
            </span>
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
            Pick a template, fill in your details, and get a polished README
            ready to paste into your GitHub profile — no markdown knowledge needed.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onGetStarted}
              className="px-8 py-3 text-sm font-bold rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-80 transition shadow"
            >
              🚀 Get Started — It's Free
            </button>
            <a
              href="https://github.com/vishalharkal15/github-readme-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3 text-sm font-bold rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <FaGithub /> View on GitHub
            </a>
          </div>

          {/* Stat pills */}
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
            {[['25+', 'Templates'], ['100%', 'Free'], ['No', 'Sign-up'], ['⚡', 'Instant Preview']].map(([v, l]) => (
              <div key={l} className="text-center">
                <div className="text-lg font-extrabold text-gray-800 dark:text-gray-100">{v}</div>
                <div className="text-xs">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mock Editor Preview ── */}
      <section className="py-14 px-6 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-lg">

            {/* Window chrome */}
            <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2.5 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700">
              <span className="w-3 h-3 rounded-full bg-red-400"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="w-3 h-3 rounded-full bg-green-400"></span>
              <span className="ml-3 text-xs text-gray-400 dark:text-gray-500 font-medium">GitHub README Generator</span>
            </div>

            {/* Mock content */}
            <div className="grid grid-cols-2 bg-white dark:bg-gray-900" style={{ minHeight: 220 }}>
              {/* Left – form mock */}
              <div className="border-r border-gray-100 dark:border-gray-800 p-5 space-y-3">
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Profile</div>
                {['Full Name', 'Title / Role', 'Short Bio', 'GitHub Username'].map((label) => (
                  <div key={label}>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mb-1">{label}</div>
                    <div className="h-7 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
                  </div>
                ))}
              </div>

              {/* Right – preview mock */}
              <div className="p-5 space-y-2.5">
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">Preview</div>
                <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-1/2 rounded bg-gray-100 dark:bg-gray-800" />
                <div className="h-3 w-3/4 rounded bg-gray-100 dark:bg-gray-800" />
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {['React', 'TypeScript', 'Python', 'Docker'].map((b) => (
                    <span key={b} className="px-2 py-0.5 text-xs rounded bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800">{b}</span>
                  ))}
                </div>
                <div className="h-3 w-full rounded bg-gray-100 dark:bg-gray-800 mt-1" />
                <div className="h-3 w-5/6 rounded bg-gray-100 dark:bg-gray-800" />
                <div className="h-3 w-2/3 rounded bg-gray-100 dark:bg-gray-800" />
              </div>
            </div>

            {/* Bar at bottom */}
            <div className="bg-gray-50 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 px-5 py-2.5 flex items-center justify-between">
              <span className="text-xs text-gray-400">README Score: <span className="text-green-500 font-bold">72%</span></span>
              <button
                onClick={onGetStarted}
                className="px-4 py-1.5 text-xs font-bold rounded bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-80 transition"
              >
                Try it now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-14 px-6 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-1">Everything you need</h2>
          <p className="text-center text-sm text-gray-400 dark:text-gray-500 mb-10">Built for developers, by a developer.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex gap-3 p-4 rounded-lg border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 transition bg-white dark:bg-gray-900"
              >
                <span className="text-2xl shrink-0">{f.icon}</span>
                <div>
                  <div className="font-semibold text-sm mb-0.5">{f.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-14 px-6 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-1">How it works</h2>
          <p className="text-center text-sm text-gray-400 dark:text-gray-500 mb-10">Four steps to a great GitHub profile.</p>
          <div className="space-y-5">
            {HOW.map((s) => (
              <div key={s.n} className="flex items-start gap-4">
                <div className="shrink-0 w-9 h-9 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center text-sm font-extrabold">
                  {s.n}
                </div>
                <div className="flex-1 pt-1">
                  <div className="font-semibold text-sm">{s.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 px-6 text-center bg-gray-900 dark:bg-gray-800">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          Ready to impress on GitHub?
        </h2>
        <p className="text-gray-400 text-sm mb-7 max-w-sm mx-auto">
          No account needed. Free forever. Start building your README right now.
        </p>
        <button
          onClick={onGetStarted}
          className="px-9 py-3 text-sm font-bold rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition shadow-lg"
        >
          🚀 Get Started — It's Free
        </button>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 dark:border-gray-800 py-5 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400 dark:text-gray-500">
          <span>© {new Date().getFullYear()} <span className="font-semibold text-gray-700 dark:text-gray-300">@vishalharkal</span> · All rights reserved</span>
          <span className="flex items-center gap-1">
            Built with <FaHeart className="text-red-500 mx-0.5" /> by
            <a href="https://github.com/vishalharkal15" target="_blank" rel="noopener noreferrer"
              className="ml-1 font-semibold text-gray-700 dark:text-gray-300 hover:text-blue-600 flex items-center gap-1 transition">
              <FaGithub /> @vishalharkal
            </a>
          </span>
          <a href="https://github.com/vishalharkal15/github-readme-generator" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1 font-semibold text-green-600 dark:text-green-400 hover:opacity-80 transition">
            <FaCodeBranch /> Contribute
          </a>
        </div>
      </footer>
    </div>
  );
}
