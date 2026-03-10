import { useState } from 'react';
import type { SkillsData } from '../types';

interface Props {
  skills: SkillsData;
  onChange: (skills: SkillsData) => void;
}

const SKILL_CATEGORIES: {
  key: keyof SkillsData;
  label: string;
  icon: string;
  skills: string[];
}[] = [
  {
    key: 'languages',
    label: 'Programming Languages',
    icon: '💻',
    skills: [
      'Python','Java','C','C++','C#','JavaScript','TypeScript','Go','Rust','Kotlin',
      'HTML','CSS','PHP','Ruby','Dart','Elixir','Haskell','R','Julia','MATLAB',
      'SAS','Scala','Assembly','Zig','Nim','Ada','Fortran','Swift','Objective-C',
      'SQL','PL/SQL','T-SQL','Lisp','Scheme','Clojure','F#','OCaml','Erlang',
      'Bash','PowerShell','Groovy','Crystal','V','GDScript','Haxe',
      'Monkey C','Apex','Hack','Solidity','COBOL',
    ],
  },
  {
    key: 'frameworks',
    label: 'Frameworks & Libraries',
    icon: '🧩',
    skills: [
      'TensorFlow','PyTorch','Scikit-learn','Keras','OpenCV',
      'Django','Flask','FastAPI','Spring Boot','Hibernate',
      'Node.js','Express.js','NestJS','React','Angular',
      'Vue.js','Next.js','Nuxt.js','Svelte','Laravel',
      'CodeIgniter','Ruby on Rails','ASP.NET Core','Blazor',
      'Bootstrap','TailwindCSS','Material UI','Foundation',
      'Flutter','React Native','Ionic','Xamarin','Electron','Qt',
      'Apache Spark','Hadoop','Ray','PaddlePaddle','MXNet','Theano',
      'YOLO','Detectron2','MediaPipe','LangChain','Haystack',
      'Streamlit','Gradio','Gatsby','Meteor','Phoenix',
    ],
  },
  {
    key: 'databases',
    label: 'Databases',
    icon: '🗄️',
    skills: [
      'MySQL','PostgreSQL','SQLite','Oracle Database','Microsoft SQL Server',
      'MariaDB','IBM Db2','Amazon Aurora','CockroachDB','TiDB',
      'MongoDB','Cassandra','Redis','CouchDB','Couchbase','DynamoDB',
      'Neo4j','ArangoDB','OrientDB','HBase',
      'Firebase Realtime DB','Firestore','Supabase','Realm',
      'InfluxDB','TimescaleDB','ClickHouse','Snowflake','BigQuery','Redshift',
      'Apache Hive','Apache Druid','Elasticsearch','Solr',
      'GraphDB','FaunaDB','VoltDB','Memcached',
      'LevelDB','RocksDB','Berkeley DB','ScyllaDB','YugabyteDB',
      'Greenplum','Teradata','SAP HANA','NuoDB','SingleStore','DuckDB','LiteDB',
    ],
  },
  {
    key: 'cloud',
    label: 'Cloud Platforms & Services',
    icon: '☁️',
    skills: [
      'Amazon Web Services','Microsoft Azure','Google Cloud Platform',
      'IBM Cloud','Oracle Cloud','Alibaba Cloud','Tencent Cloud','Huawei Cloud',
      'DigitalOcean','Linode','Vultr','Cloudflare',
      'Heroku','Netlify','Vercel','Firebase','Supabase','Render','Fly.io','Railway',
      'Wasabi Cloud','Backblaze B2','OVHcloud','Hetzner Cloud','Scaleway',
      'UpCloud','Akamai Cloud','Rackspace Cloud','SAP Cloud Platform',
      'Red Hat OpenShift','VMware Cloud','Nutanix Cloud',
      'Databricks','Oracle Cloud Infrastructure','Tencent Kubernetes Engine',
      'Firebase Hosting','AWS Lambda','Azure Functions','Google Cloud Run',
      'AWS EC2','Google Compute Engine','Azure Virtual Machines',
      'AWS S3','Google Cloud Storage','Azure Blob Storage',
      'AWS SageMaker','Google Vertex AI','Azure Machine Learning',
      'Cloudflare Workers','Docker','Kubernetes','GitHub Actions',
    ],
  },
];

export default function SkillsSelector({ skills, onChange }: Props) {
  const [openCategory, setOpenCategory] = useState<keyof SkillsData | null>('languages');
  const [search, setSearch] = useState('');

  const toggle = (category: keyof SkillsData, skill: string) => {
    const current = skills[category];
    const updated = current.includes(skill)
      ? current.filter((s) => s !== skill)
      : [...current, skill];
    onChange({ ...skills, [category]: updated });
  };

  const totalSelected = Object.values(skills).flat().length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <span className="text-2xl">🛠️</span> Skills & Technologies
        </h2>
        <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
          {totalSelected} selected
        </span>
      </div>

      <input
        className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="🔍  Search skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {SKILL_CATEGORIES.map(({ key, label, icon, skills: options }) => {
        const filtered = search
          ? options.filter((s) => s.toLowerCase().includes(search.toLowerCase()))
          : options;
        const selectedCount = skills[key].length;
        const isOpen = openCategory === key || search.length > 0;

        return (
          <div key={key} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-left"
              onClick={() => setOpenCategory(isOpen && !search ? null : key)}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{icon}</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">{label}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">({options.length})</span>
              </div>
              <div className="flex items-center gap-2">
                {selectedCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-blue-600 text-white">
                    {selectedCount}
                  </span>
                )}
                {!search && (
                  <span className="text-gray-400 text-xs">{isOpen ? '▲' : '▼'}</span>
                )}
              </div>
            </button>

            {isOpen && filtered.length > 0 && (
              <div className="p-3 flex flex-wrap gap-1.5 max-h-60 overflow-y-auto bg-white dark:bg-gray-900/40">
                {filtered.map((skill) => {
                  const selected = skills[key].includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggle(key, skill)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-100 ${
                        selected
                          ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      {selected ? '✓ ' : ''}{skill}
                    </button>
                  );
                })}
              </div>
            )}
            {isOpen && filtered.length === 0 && (
              <p className="px-4 py-3 text-xs text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-900/40">
                No matches found
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
