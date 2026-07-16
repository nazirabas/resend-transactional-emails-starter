"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitContact, type ContactResult } from "./actions";

const initial: ContactResult | null = null;

export default function Home() {
  const [state, action] = useFormState(submitContact, initial);

  if (state?.ok) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-4">
          <div className="text-5xl">✓</div>
          <h1 className="text-3xl font-semibold">Message sent</h1>
          <p className="text-neutral-400">Two emails just went out via Resend: one to the inbox and a confirmation to the sender.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-16 max-w-2xl mx-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-semibold mb-2">Contact Form + Resend</h1>
        <p className="text-neutral-400">Server action validates with Zod, sends a notification and a confirmation.</p>
      </header>

      <form action={action} className="space-y-5">
        <Field name="name" label="Name" error={state?.ok === false ? state.errors.name?.[0] : undefined} />
        <Field name="email" type="email" label="Email" error={state?.ok === false ? state.errors.email?.[0] : undefined} />
        <Field name="phone" label="Phone (optional)" error={state?.ok === false ? state.errors.phone?.[0] : undefined} />
        <TextArea name="message" label="Message" error={state?.ok === false ? state.errors.message?.[0] : undefined} />
        <Submit />
      </form>
    </main>
  );
}

function Field({ name, label, type = "text", error }: { name: string; label: string; type?: string; error?: string }) {
  return (
    <label className="block">
      <span className="block text-sm mb-2 text-neutral-300">{label}</span>
      <input
        name={name}
        type={type}
        className="w-full bg-neutral-900 border border-white/10 rounded-md px-4 py-3 focus:border-white/40 focus:outline-none"
      />
      {error && <span className="block mt-1 text-xs text-red-400">{error}</span>}
    </label>
  );
}

function TextArea({ name, label, error }: { name: string; label: string; error?: string }) {
  return (
    <label className="block">
      <span className="block text-sm mb-2 text-neutral-300">{label}</span>
      <textarea
        name={name}
        rows={5}
        className="w-full bg-neutral-900 border border-white/10 rounded-md px-4 py-3 focus:border-white/40 focus:outline-none"
      />
      {error && <span className="block mt-1 text-xs text-red-400">{error}</span>}
    </label>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-neutral-200 disabled:opacity-60 transition"
    >
      {pending ? "Sending..." : "Send message"}
    </button>
  );
}
