import type { SocialLinksData, PortfolioLinks } from '../types';

interface Props {
  social: SocialLinksData;
  portfolio: PortfolioLinks;
  onSocialChange: (social: SocialLinksData) => void;
  onPortfolioChange: (portfolio: PortfolioLinks) => void;
}

const inputClass =
  'w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition';

const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1';

const SOCIAL_PLATFORMS: { key: keyof SocialLinksData; label: string; icon: string; placeholder: string }[] = [
  { key: 'github', label: 'GitHub', icon: '🐙', placeholder: 'johndoe' },
  { key: 'linkedin', label: 'LinkedIn', icon: '💼', placeholder: 'johndoe' },
  { key: 'twitter', label: 'Twitter / X', icon: '🐦', placeholder: 'johndoe' },
  { key: 'devto', label: 'Dev.to', icon: '📝', placeholder: 'johndoe' },
  { key: 'medium', label: 'Medium', icon: '📖', placeholder: '@johndoe or johndoe' },
  { key: 'stackoverflow', label: 'Stack Overflow', icon: '🔶', placeholder: '1234567/johndoe' },
  { key: 'kaggle', label: 'Kaggle', icon: '📊', placeholder: 'johndoe' },
  { key: 'youtube', label: 'YouTube', icon: '▶️', placeholder: 'channel-handle' },
  { key: 'discord', label: 'Discord', icon: '💬', placeholder: 'server-invite-code' },
];

const PORTFOLIO_FIELDS: { key: keyof PortfolioLinks; label: string; icon: string; placeholder: string }[] = [
  { key: 'portfolioWebsite', label: 'Portfolio Website', icon: '🌐', placeholder: 'https://johndoe.dev' },
  { key: 'blog', label: 'Technical Blog', icon: '✍️', placeholder: 'https://blog.johndoe.dev' },
  { key: 'resume', label: 'Resume / CV', icon: '📄', placeholder: 'https://drive.google.com/...' },
  { key: 'projectShowcase', label: 'Project Showcase', icon: '🚀', placeholder: 'https://projects.johndoe.dev' },
  { key: 'personalWebsite', label: 'Personal Website', icon: '🏠', placeholder: 'https://johndoe.com' },
];

export default function SocialLinks({ social, portfolio, onSocialChange, onPortfolioChange }: Props) {
  const setSocial = (field: keyof SocialLinksData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onSocialChange({ ...social, [field]: e.target.value });

  const setPortfolio = (field: keyof PortfolioLinks) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onPortfolioChange({ ...portfolio, [field]: e.target.value });

  return (
    <div className="space-y-6">
      {/* Social Platforms */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
          <span className="text-2xl">🤝</span> Social Profiles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SOCIAL_PLATFORMS.map(({ key, label, icon, placeholder }) => (
            <div key={key}>
              <label className={labelClass}>
                {icon} {label}
              </label>
              <input
                className={inputClass}
                placeholder={placeholder}
                value={social[key]}
                onChange={setSocial(key)}
              />
            </div>
          ))}
        </div>
      </div>

      <hr className="border-gray-100 dark:border-gray-700" />

      {/* Portfolio Links */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2 mb-4">
          <span className="text-2xl">🔗</span> Portfolio & Links
        </h2>
        <div className="space-y-3">
          {PORTFOLIO_FIELDS.map(({ key, label, icon, placeholder }) => (
            <div key={key}>
              <label className={labelClass}>
                {icon} {label}
              </label>
              <input
                className={inputClass}
                type="url"
                placeholder={placeholder}
                value={portfolio[key]}
                onChange={setPortfolio(key)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
