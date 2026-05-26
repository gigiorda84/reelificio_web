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
      <div className={cn('brutal-box p-8', className)}>
        <p className="font-display text-2xl">{t('successTitle')}</p>
        <p className="mt-2 font-sans text-base text-ink/80">{t('successBody')}</p>
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
        className="h-12 border-2 border-ink bg-ink px-6 font-display text-base lowercase text-paper shadow-[6px_6px_0_0_var(--accent-2)] transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] disabled:opacity-60"
      >
        {pending ? t('sending') : t('submit')}
      </button>
      {status === 'error' && (
        <div className="border-2 border-ink bg-accent-yellow p-4 font-mono text-sm">
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
    'mt-2 w-full border-2 border-ink bg-paper px-4 py-3 font-sans text-base text-ink placeholder-ink/40 focus:bg-paper-shade focus:outline-none';
  return (
    <label className="block">
      <span className="font-mono text-xs uppercase tracking-tight text-ink/70">
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
