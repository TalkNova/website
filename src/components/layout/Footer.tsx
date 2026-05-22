import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-canvas-elevated/90 py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="ThatMatter"
                width={200}
                height={72}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-slate-400">
              WhatsApp marketing and AI-powered customer support for modern businesses.
            </p>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-white">Product</h4>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/pricing" className="text-sm text-slate-400 hover:text-wa">
                Pricing
              </Link>
              <Link href="/about" className="text-sm text-slate-400 hover:text-wa">
                Features
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-white">Company</h4>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/about" className="text-sm text-slate-400 hover:text-wa">
                About
              </Link>
              <Link href="/blog" className="text-sm text-slate-400 hover:text-wa">
                Blog
              </Link>
              <Link href="/contact" className="text-sm text-slate-400 hover:text-wa">
                Contact
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-display text-sm font-semibold text-white">Legal</h4>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-wa">
                Privacy
              </Link>
              <Link href="/terms-and-conditions" className="text-sm text-slate-400 hover:text-wa">
                Terms
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/[0.06] pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} ThatMatter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
