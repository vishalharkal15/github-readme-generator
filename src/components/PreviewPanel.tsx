import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface Props {
  markdown: string;
  onMarkdownChange?: (md: string) => void;
}

export default function PreviewPanel({ markdown, onMarkdownChange }: Props) {
  const [activeTab, setActiveTab] = useState<'preview' | 'raw'>('preview');
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(markdown);

  // Keep editValue in sync when markdown changes externally (form edits)
  useEffect(() => {
    if (!isEditing) setEditValue(markdown);
  }, [markdown, isEditing]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 shrink-0">
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
              activeTab === 'preview'
                ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
            }`}
          >
            👁 Preview
          </button>
          <button
            onClick={() => setActiveTab('raw')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
              activeTab === 'raw'
                ? 'bg-white dark:bg-gray-900 text-blue-600 shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'
            }`}
          >
            📄 Raw Markdown
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 transition"
          >
            {copied ? '✅ Copied!' : '📋 Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            ⬇️ Download README.md
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'preview' ? (
          <div className="p-6 prose prose-sm dark:prose-invert max-w-none prose-headings:text-gray-800 dark:prose-headings:text-white prose-a:text-blue-600 prose-code:bg-gray-100 dark:prose-code:bg-gray-700 prose-pre:bg-gray-900 [&_img]:max-w-full [&_img]:h-auto [&_[align='center']]:text-center [&_[align='center']]:mx-auto [&_[align='left']]:text-left">
            {markdown ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
            ) : (
              <div className="text-center py-20 text-gray-400 dark:text-gray-600">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-lg font-medium">Your README preview will appear here</p>
                <p className="text-sm mt-1">Fill in your profile details on the left to get started</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col h-full">
            {/* Raw tab toolbar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 shrink-0">
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {isEditing ? '✏️ Editing — changes apply to preview' : '📄 Read-only — click Edit to modify'}
              </span>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => {
                        onMarkdownChange?.(editValue);
                        setIsEditing(false);
                      }}
                      className="px-3 py-1 text-xs font-bold rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                    >
                      ✅ Apply
                    </button>
                    <button
                      onClick={() => {
                        setEditValue(markdown);
                        setIsEditing(false);
                      }}
                      className="px-3 py-1 text-xs font-semibold rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                      ✕ Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setEditValue(markdown);
                      setIsEditing(true);
                    }}
                    className="px-3 py-1 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    ✏️ Edit
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            {markdown ? (
              isEditing ? (
                <textarea
                  className="flex-1 w-full p-4 text-xs font-mono text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 resize-none focus:outline-none leading-relaxed border-0"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  spellCheck={false}
                />
              ) : (
                <pre className="flex-1 p-4 text-xs font-mono text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 overflow-auto whitespace-pre-wrap leading-relaxed">
                  {markdown}
                </pre>
              )
            ) : (
              <div className="text-center py-20 text-gray-400 dark:text-gray-600">
                <div className="text-6xl mb-4">💻</div>
                <p className="text-lg font-medium">No markdown generated yet</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
