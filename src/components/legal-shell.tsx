import type {ReactNode} from 'react';

export function LegalShell({
  title,
  updated,
  children
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <section className="border-b-2 border-ink">
      <div className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28">
        <p className="font-mono text-xs uppercase tracking-widest text-ink/60">
          {updated}
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight">
          {title}
        </h1>
        <div className="legal-prose mt-12 font-sans text-base leading-relaxed text-ink/85">
          {children}
        </div>
      </div>
      <style>{`
        .legal-prose h2 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
        }
        .legal-prose h3 {
          font-family: var(--font-display);
          font-size: 1.125rem;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .legal-prose p { margin-bottom: 1rem; }
        .legal-prose ul { list-style: disc; padding-left: 1.25rem; margin-bottom: 1rem; }
        .legal-prose ul li { margin-bottom: 0.25rem; }
        .legal-prose a { text-decoration: underline; }
        .legal-prose strong { font-weight: 600; }
      `}</style>
    </section>
  );
}
