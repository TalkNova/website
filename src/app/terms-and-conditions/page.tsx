import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { LegalDocument } from '@/components/legal/LegalDocument';
import { getTermsAndConditionsContent } from '@/lib/legal-content';
import { canonicalFor } from '@/lib/site';

const content = getTermsAndConditionsContent();

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: content.description,
  ...canonicalFor('/terms-and-conditions'),
};

export default function TermsAndConditionsPage() {
  return (
    <PageShell blobs="about" navScrolled>
      <LegalDocument
        content={content}
        theme="terms"
        crossLink={{ href: '/privacy-policy', label: 'Privacy Policy' }}
      />
    </PageShell>
  );
}
