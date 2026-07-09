// Envia eventos para o Google Analytics 4 (gtag configurado no index.html).
// Não quebra se o GA estiver bloqueado por adblock ou ainda não carregado.
export function trackEvent(name, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params)
  }
}
