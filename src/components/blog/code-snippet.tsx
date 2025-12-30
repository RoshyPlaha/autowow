interface CodeSnippetProps {
  language?: string;
  title?: string;
  children: React.ReactNode;
}

export default function CodeSnippet({
  language = "text",
  title,
  children,
}: CodeSnippetProps) {
  return (
    <div className="my-6 rounded-lg overflow-hidden border border-gray-200">
      {title && (
        <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-700 font-merriweather">
            {title}
          </span>
          {language && (
            <span className="ml-2 text-xs text-gray-500 font-mono">
              {language}
            </span>
          )}
        </div>
      )}
      <div className="bg-gray-50 p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-gray-800 whitespace-pre-wrap">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}

