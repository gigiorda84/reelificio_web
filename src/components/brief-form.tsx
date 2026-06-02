'use client';

import {useState, useTransition, type FormEvent} from 'react';
import {useTranslations} from 'next-intl';
import {cn} from '@/lib/cn';

type Status = 'idle' | 'success' | 'error';

export function BriefForm({className, variant = 'dark'}: {className?: string; variant?: 'dark' | 'light'}) {
  const t = useTranslations('ctaBand.form');
  const [status, setStatus] = useState<Status>('idle');
  const [pending, startTransition] = useTransition();

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      try {
        const res = await fetch('/api/brief', {
          method: 'POST',
          body: data
        });
        if (!res.ok) throw new Error('send failed');
        setStatus('success');
        form.reset();
      } catch {
        setStatus('error');
      }
    });
  }

  const isDark = variant === 'dark';

  if (status === 'success') {
    return (
      <div className={cn('border p-8', isDark ? 'border-white/20' : 'border-[#020103]/20', className)}>
        <p className={cn('font-display text-2xl', isDark ? 'text-ink' : 'text-[#020103]')}>{t('successTitle')}</p>
        <p className={cn('mt-2 font-sans text-base', isDark ? 'text-ink/70' : 'text-[#020103]/70')}>{t('successBody')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn('flex flex-col gap-4', className)}>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />
      <Field name="name" label={t('name')} required variant={variant} />
      <Field name="company" label={t('company')} required variant={variant} />
      <Field name="handle" label={t('handle')} type="email" placeholder="tu@esempio.com" variant={variant} />
      <Field name="message" label={t('message')} as="textarea" rows={4} required variant={variant} />
      <button
        type="submit"
        disabled={pending}
        className={cn(
          'h-12 px-6 font-display text-base uppercase tracking-tight transition-opacity hover:opacity-90 disabled:opacity-60',
          isDark ? 'bg-lime text-[#020103]' : 'bg-[#020103] text-lime'
        )}
      >
        {pending ? t('sending') : t('submit')}
      </button>
      {status === 'error' && (
        <div className={cn('border p-4 font-mono text-sm', isDark ? 'border-white/20 bg-white/5 text-ink' : 'border-[#020103]/30 bg-[#020103]/10 text-[#020103]')}>
          <strong>{t('errorTitle')}</strong> {t('errorBody')}
        </div>
      )}
    </form>
  );
}

function Field({
  name,
  label,
  as = 'input',
  type = 'text',
  rows,
  required,
  placeholder,
  variant = 'dark'
}: {
  name: string;
  label: string;
  as?: 'input' | 'textarea';
  type?: string;
  rows?: number;
  required?: boolean;
  placeholder?: string;
  variant?: 'dark' | 'light';
}) {
  const isDark = variant === 'dark';
  const baseClass = isDark
    ? 'mt-2 w-full border border-white/20 bg-white/5 px-4 py-3 font-sans text-base text-ink placeholder-white/30 focus:border-lime focus:bg-white/10 focus:outline-none'
    : 'mt-2 w-full border border-[#020103]/30 bg-lime/50 px-4 py-3 font-sans text-base text-[#020103] placeholder-[#020103]/40 focus:border-[#020103] focus:bg-lime/70 focus:outline-none';
  return (
    <label className="block">
      <span className={cn('font-mono text-xs uppercase tracking-tight', isDark ? 'text-lime/80' : 'text-[#020103]/70')}>
        {label}
        {required ? ' *' : ''}
      </span>
      {as === 'textarea' ? (
        <textarea
          name={name}
          required={required}
          rows={rows ?? 4}
          placeholder={placeholder}
          className={baseClass}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
    </label>
  );
}
