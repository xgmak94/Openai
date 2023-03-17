import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import { message } from '../../models/messages';
import AtomDark from '../../styles/AtomDark';

type Props = { message: message };

export default function Markdown({ message }: Props) {
  return (
    <>
      <ReactMarkdown
        className='p-3'
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || 'language-js');
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={AtomDark}
                language={match[1]}
                showLineNumbers={true}
                {...props}
              />
            ) : (
              <code
                className={className}
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
    </>
  );
}
