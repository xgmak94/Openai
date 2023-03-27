import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import { message } from '../../../models/messages';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import CopyCode from './CopyCode';

type Props = { message: message };

export default function Markdown({ message }: Props) {
  function Pre({ children }: any) {
    return (
      <pre>
        <CopyCode>{children}</CopyCode>
        {children}
      </pre>
    );
  }

  return (
    <ReactMarkdown
      className='prose max-w-full p-2 text-white text-sm'
      remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      components={{
        pre: Pre,
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || 'language-js');
          return !inline && match ? (
            <SyntaxHighlighter
            className={`p-2 rounded-lg ${className}`}
              children={String(children).replace(/\n$/, '')}
              style={atomDark}
              language={match[1]}
              showLineNumbers={true}
              wrapLines={true}
              {...props}
            />
          ) : (
            <code
              className={`text-yellow-300 ${className}`}
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {message.content}
    </ReactMarkdown>
  );
}
