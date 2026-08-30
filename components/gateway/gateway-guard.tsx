const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

/**
 * Deep-link gateway guard, inlined at the very start of every `[locale]` page.
 *
 * Runs synchronously during HTML parsing — before React hydrates and before
 * the page paints — so a direct deep link is sent to the gateway with no
 * visible flash of the localized content. It:
 *
 *   1. strips the basePath from the current pathname;
 *   2. strips the leading locale (the original language never dictates the
 *      final one — the user picks in the gateway);
 *   3. stores the remaining route (with query/hash) in
 *      `nexo_gateway_return_path`;
 *   4. replaces the location with the gateway root.
 *
 * Skipped entirely once `nexo_gateway_entered` is set (a full reload after
 * entering the site stays on the page).
 */
export function GatewayGuardScript() {
  const script = `(function(){try{var s=window.sessionStorage;if(!s||s.getItem("nexo_gateway_entered")==="1")return;var b=${JSON.stringify(BASE_PATH)};var p=window.location.pathname;var stripped=p;if(b&&stripped.slice(0,b.length)===b)stripped=stripped.slice(b.length);var m=stripped.match(/^\\/(es|en|it)(\\/|$)/);if(m){if(m[2]==="/"){stripped="/"+stripped.slice(m[0].length)}else{stripped="/"}}if(stripped.charAt(0)!=="/")stripped="/"+stripped;var dest=stripped+(window.location.search||"")+(window.location.hash||"");s.setItem("nexo_gateway_return_path",dest);window.location.replace(b+"/")}catch(e){}})();`

  return <script dangerouslySetInnerHTML={{ __html: script }} />
}