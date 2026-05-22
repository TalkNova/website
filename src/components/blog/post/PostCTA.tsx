import Link from 'next/link';
import { MessageCircle, Sparkles } from 'lucide-react';

const btnBase =
  'inline-flex min-h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-semibold transition';

export function PostCTA() {
  return (
    <aside className="my-12 overflow-hidden rounded-2xl border border-violet-500/25 bg-gradient-to-br from-violet-600/15 via-blue-600/10 to-cyan-600/10 p-6 sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/20 text-violet-300">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h3 className="font-display text-xl font-semibold text-white">
              Ready to automate WhatsApp with AI?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              Book a free consultation and we&apos;ll map your chatbot, campaigns, and support
              flows.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap lg:shrink-0">
          <Link
            href="/contact"
            className={`${btnBase} w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-[0_0_28px_-6px_rgb(139_92_246/0.5)] hover:opacity-90 sm:w-auto`}
          >
            Book free demo
          </Link>
          <a
            href="https://wa.me/917483358716"
            target="_blank"
            rel="noopener noreferrer"
            className={`${btnBase} w-full border border-wa/40 bg-wa/10 text-wa hover:bg-wa/20 sm:w-auto`}
          >
            <MessageCircle className="h-4 w-4 shrink-0" />
            WhatsApp us
          </a>
        </div>
      </div>
    </aside>
  );
}
