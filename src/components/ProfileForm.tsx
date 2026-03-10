import type { ProfileData } from '../types';

interface Props {
  profile: ProfileData;
  onChange: (profile: ProfileData) => void;
}

const inputClass =
  'w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition';

const labelClass = 'block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-1';

export default function ProfileForm({ profile, onChange }: Props) {
  const set = (field: keyof ProfileData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange({ ...profile, [field]: e.target.value });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
        <span className="text-2xl">🙋‍♂️</span> Profile Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input
            className={inputClass}
            placeholder="vishal harkal"
            value={profile.fullName}
            onChange={set('fullName')}
          />
        </div>
        <div>
          <label className={labelClass}>GitHub Username *</label>
          <input
            className={inputClass}
            placeholder="vishalharkal15"
            value={profile.githubUsername}
            onChange={set('githubUsername')}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Developer Title / Role</label>
        <input
          className={inputClass}
          placeholder="Full-Stack Developer | Open Source Enthusiast"
          value={profile.title}
          onChange={set('title')}
        />
      </div>

      <div>
        <label className={labelClass}>Short Bio / Introduction</label>
        <textarea
          className={`${inputClass} resize-none`}
          rows={3}
          placeholder="Passionate developer who loves building products that make a difference..."
          value={profile.bio}
          onChange={set('bio')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Currently Working On</label>
          <input
            className={inputClass}
            placeholder="an awesome open-source project"
            value={profile.currentWork}
            onChange={set('currentWork')}
          />
        </div>
        <div>
          <label className={labelClass}>Currently Learning</label>
          <input
            className={inputClass}
            placeholder="Rust, WebAssembly"
            value={profile.learning}
            onChange={set('learning')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Location</label>
          <input
            className={inputClass}
            placeholder="Mumbai, MH"
            value={profile.location}
            onChange={set('location')}
          />
        </div>
        <div>
          <label className={labelClass}>Pronouns</label>
          <input
            className={inputClass}
            placeholder="he/him, she/her, they/them"
            value={profile.pronouns}
            onChange={set('pronouns')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Email</label>
          <input
            className={inputClass}
            type="email"
            placeholder="vishalharkal@gmail.com"
            value={profile.email}
            onChange={set('email')}
          />
        </div>
        <div>
          <label className={labelClass}>Fun Fact</label>
          <input
            className={inputClass}
            placeholder="I can solve a Rubik's cube in under 2 minutes"
            value={profile.funFact}
            onChange={set('funFact')}
          />
        </div>
      </div>
    </div>
  );
}
