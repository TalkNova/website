import { googleSiteVerificationResponse } from '@/lib/google-verification';

export function GET() {
  return googleSiteVerificationResponse();
}
