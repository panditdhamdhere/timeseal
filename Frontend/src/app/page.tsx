import Link from "next/link";
import { Header } from "@/components/Header";

export default function HomePage() {
  return (
    <div className="relative min-h-screen min-h-[100dvh]">
      <Header />
      <main className="relative z-10 mx-auto w-full max-w-[min(1600px,96vw)] px-4 py-8 sm:py-12 md:py-16 sm:px-6 lg:px-8">
        <section className="text-center">
          <h1 className="animate-fade-in-up text-3xl font-bold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl lg:text-6xl">
            Seal messages for the{" "}
            <span className="bg-gradient-to-r from-[var(--accent)] to-amber-400 bg-clip-text text-transparent">
              future
            </span>
          </h1>
          <p className="animate-fade-in-up animate-delay-100 mx-auto mt-4 max-w-2xl text-base text-[var(--muted)] sm:mt-6 sm:text-lg">
            Lock encrypted messages and optional ETH for loved ones. They can
            open your time capsule only after the unlock date.
          </p>
          <div className="animate-fade-in-up animate-delay-200 mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-4">
            <Link
              href="/create"
              className="btn-primary rounded-full bg-[var(--accent)] px-6 py-2.5 font-medium text-[var(--background)] sm:px-8 sm:py-3"
            >
              Create Capsule
            </Link>
            <Link
              href="/capsules"
              className="btn-primary rounded-full border border-[var(--border)] px-6 py-2.5 font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--surface)] sm:px-8 sm:py-3"
            >
              My Capsules
            </Link>
          </div>
        </section>

        <section className="mt-16 grid gap-4 sm:mt-20 sm:grid-cols-3 sm:gap-6 lg:gap-8">
          {[
            {
              icon: "🔐",
              title: "Encrypted & Secure",
              desc: "Encrypt your message before sealing. Only the recipient can open after the unlock date.",
              delay: "300ms",
            },
            {
              icon: "⏳",
              title: "Time-Locked",
              desc: "Set any unlock date at least 1 hour in the future. The capsule cannot be opened before then.",
              delay: "400ms",
            },
            {
              icon: "💰",
              title: "Optional ETH",
              desc: "Add ETH to your capsule. When opened, it transfers automatically to the recipient.",
              delay: "500ms",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className="card-hover glass-card animate-fade-in-up p-5 sm:p-6"
              style={{ animationDelay: item.delay }}
            >
              <div className="text-2xl transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>
              <h3 className="mt-3 font-semibold text-[var(--foreground)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        <section className="glass-panel animate-fade-in-up animate-delay-500 mt-12 p-6 text-center sm:mt-16 sm:p-8">
          <h2 className="text-lg font-semibold text-[var(--foreground)] sm:text-xl">
            Ready to send a message through time?
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)] sm:text-base">
            Connect your wallet to create your first time capsule.
          </p>
          <Link
            href="/create"
            className="btn-primary mt-4 inline-block rounded-xl bg-[var(--accent)] px-6 py-2.5 font-medium text-[var(--background)]"
          >
            Get Started
          </Link>
        </section>
      </main>
    </div>
  );
}
