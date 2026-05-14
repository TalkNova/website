import type { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from '@/components/login/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your ThatMatter account.',
};

export default function LoginPage() {
  return (
    <div className="login-page-body animated-gradient-bg">
      <Link href="/" className="back-home">
        <i className="fa-solid fa-arrow-left" aria-hidden /> Back to Home
      </Link>
      <LoginForm />
    </div>
  );
}
