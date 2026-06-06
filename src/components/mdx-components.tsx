import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1
      className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tight mt-10 mb-4"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight mt-10 mb-4 flex items-center gap-3"
      {...props}
    >
      <span className="w-6 h-px bg-emerald-500/50" />
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="font-mono text-xl sm:text-2xl font-semibold text-zinc-200 tracking-tight mt-8 mb-3"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="font-mono text-lg font-semibold text-zinc-300 tracking-tight mt-6 mb-2"
      {...props}
    >
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p
      className="text-zinc-400 leading-relaxed mb-5 text-[15px]"
      {...props}
    >
      {children}
    </p>
  ),
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/30 hover:decoration-emerald-400/60 transition-colors duration-200"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href ?? "#"}
        className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/30 hover:decoration-emerald-400/60 transition-colors duration-200"
        {...props}
      >
        {children}
      </Link>
    );
  },
  ul: ({ children, ...props }) => (
    <ul
      className="list-none space-y-2 mb-5 pl-4"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="list-none space-y-2 mb-5 pl-4 counter-reset-item"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li
      className="text-zinc-400 text-[15px] leading-relaxed pl-4 relative before:content-['▹'] before:absolute before:left-0 before:text-emerald-500/50 before:text-xs before:top-[3px]"
      {...props}
    >
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-2 border-emerald-500/40 pl-5 my-6 py-1 bg-emerald-500/[0.03] rounded-r-lg"
      {...props}
    >
      {children}
    </blockquote>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="blog-code-block rounded-xl border border-zinc-800/60 bg-zinc-950/80 p-5 overflow-x-auto mb-6 text-sm leading-relaxed font-mono"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ children, className, ...props }) => {
    // Inline code (no className means it's not inside a pre/code-block)
    if (!className) {
      return (
        <code
          className="bg-zinc-800/60 text-emerald-300 rounded px-1.5 py-0.5 text-[13px] font-mono border border-zinc-700/40"
          {...props}
        >
          {children}
        </code>
      );
    }
    // Block code inside <pre> — pass through
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  hr: () => (
    <hr className="border-none h-px bg-gradient-to-r from-zinc-800 via-emerald-500/20 to-zinc-800 my-10" />
  ),
  strong: ({ children, ...props }) => (
    <strong className="text-zinc-200 font-semibold" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="text-zinc-300 italic" {...props}>
      {children}
    </em>
  ),
  img: ({ src, alt, ...props }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt ?? ""}
      className="rounded-xl border border-zinc-800/60 my-6 max-w-full"
      loading="lazy"
      {...props}
    />
  ),
};
