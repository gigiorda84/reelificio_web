'use client';

import {useState, useTransition, type FormEvent} from 'react';
import {useTranslations} from 'next-intl';
import {cn} from '@/lib/cn';

type Status = 'idle' | 'success' | 'error';

export function BriefForm({className}: {className?: string}) {
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

  if (status === 'success') {
    return (
      <div className={cn('border border-[#020103]/20 p-8', className)}>
        <p className="font-display text-2xl text-[#020103]">{t('successTitle')}</p>
        <p className="mt-2 font-sans text-base text-[#020103]/70">{t('successBody')}</p>
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
      <Field name="name" label={t('name')} required />
      <Field name="company" label={t('company')} required />
      <Field name="handle" label={t('handle')} placeholder="@" />
      <Field name="message" label={t('message')} as="textarea" rows={4} required />
      <button
        type="submit"
        disabled={pending}
        className="h-12 bg-[#020103] px-6 font-display text-base uppercase tracking-tight text-lime transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {pending ? t('sending') : t('submit')}
      </button>
      {status === 'error' && (
        <div className="border border-[#020103]/30 bg-[#020103]/10 p-4 font-mono text-sm text-[#020103]">
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
  rows,
  required,
  placeholder
}: {
  name: string;
  label: string;
  as?: 'input' | 'textarea';
  rows?: number;
  required?: boolean;
  placeholder?: string;
}) {
  const baseClass =
    'mt-2 w-full border border-[#020103]/30 bg-lime/50 px-4 py-3 font-sans text-base text-[#020103] placeholder-[#020103]/40 focus:border-[#020103] focus:bg-lime/70 focus:outline-none';
  return (
    <label className="block">
      <span className="font-mono text-xs uppercase tracking-tight text-[#020103]/70">
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
          name={name}
          required={required}
          placeholder={placeholder}
          className={baseClass}
        />
      )}
    </label>
  );
}
