import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link href="/" className="logo mb-2" style={{ fontSize: '1.2rem' }}>
              <Image
                src="/images/logo.png"
                alt="ThatMatter Logo"
                width={280}
                height={100}
                className="h-[100px] w-auto"
              />
            </Link>
            <p>
              Revolutionizing WhatsApp marketing and customer support for modern
              businesses.
            </p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <div className="footer-links">
              <Link href="/pricing">Pricing</Link>
              <Link href="/about">Features</Link>
            </div>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <div className="footer-links">
              <Link href="/about">About Us</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 ThatMatter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
