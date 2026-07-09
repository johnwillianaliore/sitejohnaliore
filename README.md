# <[John-Aliore]> — Site Institucional

Site institucional e portfólio de **John Aliore** — desenvolvedor e consultor digital especializado em tecnologia web, integrações entre sistemas e soluções de SEO.

🌐 **https://johnaliore.com.br**

One-page com estética dark "racing tech", inspirado em sites interativos de alto impacto: foguete 3D interativo no hero, animações de scroll, baralho de projetos navegável e prévias ao vivo de sistemas em produção.

## 🚀 Tecnologias

| Camada | Stack |
|---|---|
| Framework | [React 19](https://react.dev/) + [Vite 8](https://vite.dev/) |
| Estilo | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animações | [Motion](https://motion.dev/) (Framer Motion) |
| 3D | [Three.js](https://threejs.org/) via [react-three-fiber](https://docs.pmnd.rs/react-three-fiber) + [drei](https://github.com/pmndrs/drei) |
| Analytics | Google Analytics 4 com eventos customizados |
| Tipografia | Archivo Black · Inter · JetBrains Mono |

## ✨ Destaques

- **Foguete 3D interativo** no hero (procedural, sem modelos externos) — reage ao mouse, dá pra arrastar e girar, com chama de exaustão animada em tempo real
- **Fallback inteligente**: detecção de WebGL antes de montar o Canvas; sem suporte, entra um foguete SVG animado (zero erros de console)
- **Logo vivo**: `<[-]>` digita e apaga `<[John-Aliore]>` em loop, com o `-` piscando como cursor de terminal
- **Projetos ao vivo**: prévias via iframe dos sistemas em produção (com screenshot para sites que bloqueiam embedding)
- **Baralho de projetos**: pilha de cards sobrepostos, arrastável, estilo "folhear um livro"
- **SEO completo**: meta tags, Open Graph, JSON-LD (`ProfessionalService`), `robots.txt`, `sitemap.xml` e favicon multi-tamanho
- **Performance**: code-splitting do bundle 3D (~960 KB carregados sob demanda), imagens WebP otimizadas

## 🤖 Desenvolvimento assistido por IA

Este projeto foi construído com o auxílio do **[Claude Fable 5](https://www.anthropic.com/claude)** (Anthropic) via Claude Code como par de desenvolvimento — da arquitetura dos componentes React e da cena 3D até a captura automatizada das prévias dos projetos, correções de compatibilidade WebGL e implementação de SEO.

## 🛠️ Rodando localmente

```bash
npm install
npm run dev      # dev server em http://localhost:5173
npm run build    # build de produção em dist/
npm run preview  # serve o build localmente
```

> **Google Analytics**: troque o ID `G-XXXXXXXXXX` no `index.html` pelo da sua propriedade GA4.

## 📁 Estrutura

```
src/
├── components/
│   ├── Navbar.jsx          # navegação fixa + menu mobile
│   ├── LogoType.jsx        # logo animado <[John-Aliore]>
│   ├── Hero.jsx            # hero com parallax e reveal
│   ├── HeroCore.jsx        # foguete 3D (react-three-fiber)
│   ├── RocketFallback.jsx  # foguete SVG p/ navegadores sem WebGL
│   ├── Marquee.jsx         # ticker infinito de tecnologias
│   ├── About.jsx           # sobre + contadores + bloco Grupo IX
│   ├── Services.jsx        # serviços com tilt 3D no hover
│   ├── Projects.jsx        # lista editorial de trabalhos
│   ├── LiveProjects.jsx    # prévias ao vivo (iframe/screenshot)
│   ├── ProjectDeck.jsx     # baralho de projetos arrastável
│   ├── Hosting.jsx         # publicação e gestão de VPS
│   ├── Contact.jsx         # CTA final + footer
│   └── WhatsAppFloat.jsx   # botão flutuante de WhatsApp
└── lib/
    ├── webgl.js            # detecção de suporte a WebGL
    └── analytics.js        # eventos para o GA4
```

---

© John Aliore — Web · Integrações · SEO
