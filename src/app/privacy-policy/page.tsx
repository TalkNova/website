import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { getPrivacyPolicyContent } from '@/lib/legal-content';

const content = getPrivacyPolicyContent();

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: content.description,
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <PageShell blobs="about" navScrolled>
      <LegalDocument
        content={content}
        theme="privacy"
        crossLink={{ href: '/terms-and-conditions', label: 'Terms & Conditions' }}
      />
    </PageShell>
  );
}
