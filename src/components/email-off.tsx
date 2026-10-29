import type { ReactNode } from "react";

/**
 * Wraps markup that shows the email address or links to it. Cloudflare's
 * Email Address Obfuscation rewrites addresses in HTML into
 * /cdn-cgi/l/email-protection links and swaps them back with a script. That
 * breaks the address for anyone without JavaScript, leaves crawlers a link
 * that answers 404, and can make the page differ from what React expects.
 * Cloudflare skips anything between these two comments:
 * https://developers.cloudflare.com/waf/tools/scrape-shield/email-address-obfuscation/
 * React cannot render a comment by itself, so each one sits in a hidden span.
 */
export function EmailOff({ children }: { children: ReactNode }) {
  return (
    <>
      <span hidden dangerouslySetInnerHTML={{ __html: "<!--email_off-->" }} />
      {children}
      <span hidden dangerouslySetInnerHTML={{ __html: "<!--/email_off-->" }} />
    </>
  );
}
