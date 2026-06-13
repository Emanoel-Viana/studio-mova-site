import { waLink } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={waLink("Olá! Vim pelo site do Studio MOVA.")}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      className="fixed right-5 bottom-5 z-[60] grid place-items-center w-15 h-15 rounded-full bg-[#25D366] shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform hover:scale-105"
      style={{ width: 58, height: 58 }}
    >
      <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff" aria-hidden>
        <path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.6.8 5 2.3 7L4 29l7.3-2.3c1.9 1 4 1.6 6.2 1.6h0c6.6 0 12-5.3 12-11.9C29.5 8.3 22.6 3 16 3zm7 17c-.3.8-1.7 1.6-2.4 1.7-.6.1-1.4.1-2.2-.1-.5-.2-1.2-.4-2-.8-3.6-1.5-5.9-5.1-6.1-5.4-.2-.2-1.4-1.9-1.4-3.6s.9-2.6 1.2-2.9c.3-.3.7-.4.9-.4h.7c.2 0 .5-.1.8.6.3.8 1.1 2.6 1.2 2.8.1.2.2.4 0 .7-.1.2-.2.4-.4.6l-.6.7c-.2.2-.4.4-.2.8.2.4 1 1.7 2.2 2.7 1.5 1.3 2.8 1.7 3.2 1.9.4.2.6.2.9-.1.2-.3 1-1.2 1.3-1.6.3-.4.5-.3.9-.2.4.1 2.2 1 2.6 1.2.4.2.6.3.7.5.1.1.1.9-.3 1.9z" />
      </svg>
    </a>
  );
}
