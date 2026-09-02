import Script from "next/script";
import { site } from "@/lib/site";

const GA_ID = site.gaMeasurementId;

const INLINE = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');document.addEventListener('click',function(e){var t=e.target;var a=t&&t.closest?t.closest('a[href^="tel:"]'):null;if(a){gtag('event','phone_call_click',{link_url:a.getAttribute('href'),page_path:location.pathname});}});`;

export default function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
    <Script src={"https://www.googletagmanager.com/gtag/js?id=" + GA_ID} strategy="afterInteractive" />
    <Script id="ga4-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: INLINE }} />
    </>
    );
}
