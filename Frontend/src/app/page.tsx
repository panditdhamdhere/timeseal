import Link from "next/link";
import { Header } from "@/components/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            Seal messages for the{" "}
            <span className="text-[var(--accent)]">future</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--muted)]">
            Lock encrypted messages and optional ETH for loved ones. They can
            open your time capsule only after the unlock date.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/create"
              className="rounded-full bg-[var(--accent)] px-8 py-3 font-medium text-[var(--background)] transition-opacity hover:opacity-90"
            >
              Create Capsule
            </Link>
            <Link
              href="/capsules"
              className="rounded-full border border-[var(--border)] px-8 py-3 font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface)]"
            >
              My Capsules
            </Link>
          </div>
        </section>

        <section className="mt-24 grid gap-8 sm:grid-cols-3">
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="text-2xl">🔐</div>
            <h3 className="mt-3 font-semibold text-[var(--foreground)]">
              Encrypted & Secure
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Encrypt your message before sealing. Only the recipient can open
              after the unlock date.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="text-2xl">⏳</div>
            <h3 className="mt-3 font-semibold text-[var(--foreground)]">
              Time-Locked
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Set any unlock date at least 1 hour in the future. The capsule
              cannot be opened before then.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="text-2xl">💰</div>
            <h3 className="mt-3 font-semibold text-[var(--foreground)]">
              Optional ETH
            </h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Add ETH to your capsule. When opened, it transfers automatically
              to the recipient.
            </p>
          </div>
        </section>

        <section className="mt-16 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">
            Ready to send a message through time?
          </h2>
          <p className="mt-2 text-[var(--muted)]">
            Connect your wallet to create your first time capsule.
          </p>
          <Link
            href="/create"
            className="mt-4 inline-block rounded-lg bg-[var(--accent)] px-6 py-2 font-medium text-[var(--background)] hover:opacity-90"
          >
            Get Started
          </Link>
        </section>
      </main>
    </div>
  );
}
