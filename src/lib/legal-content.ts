import privacyPolicy from '@/content/legal/privacy-policy.json';
import termsAndConditions from '@/content/legal/terms-and-conditions.json';

export type LegalDocumentContent = {
  title: string;
  description: string;
  effectiveDate: string;
  sidebarHtml: string;
  bodyHtml: string;
};

export type LegalTheme = 'privacy' | 'terms';

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

/** Rewrites legacy .html links to Next.js routes. */
export function normalizeLegalHtml(html: string): string {
  return html
    .replace(/href="privacy-policy\.html"/g, 'href="/privacy-policy"')
    .replace(/href="terms-and-conditions\.html"/g, 'href="/terms-and-conditions"');
}

export function getPrivacyPolicyContent(): LegalDocumentContent {
  return {
    ...privacyPolicy,
    title: decodeHtmlEntities(privacyPolicy.title),
    sidebarHtml: normalizeLegalHtml(privacyPolicy.sidebarHtml),
    bodyHtml: normalizeLegalHtml(privacyPolicy.bodyHtml),
  };
}

export function getTermsAndConditionsContent(): LegalDocumentContent {
  return {
    ...termsAndConditions,
    title: decodeHtmlEntities(termsAndConditions.title),
    sidebarHtml: normalizeLegalHtml(termsAndConditions.sidebarHtml),
    bodyHtml: normalizeLegalHtml(termsAndConditions.bodyHtml),
  };
}
