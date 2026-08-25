document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.id = 'aegis-layout-final-fix';
  style.textContent = `
    /* AEGIS — final containment and legibility pass */
    .aegis-card { overflow: hidden !important; }
    .aegis-inner {
      width: 100% !important;
      max-width: 100% !important;
      height: auto !important;
      min-height: 176px !important;
      display: grid !important;
      grid-template-columns: minmax(0, 39fr) minmax(0, 61fr) !important;
      gap: 12px !important;
      align-items: stretch !important;
      overflow: visible !important;
    }
    .aegis-copy {
      min-width: 0 !important;
      max-width: 100% !important;
      overflow: visible !important;
      justify-content: center !important;
    }
    .aegis-copy p {
      max-width: 100% !important;
      overflow-wrap: anywhere !important;
      word-break: normal !important;
    }
    .aegis-architecture {
      position: relative !important;
      width: 100% !important;
      min-width: 0 !important;
      max-width: 100% !important;
      height: auto !important;
      min-height: 158px !important;
      display: grid !important;
      grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
      gap: 8px !important;
      align-items: stretch !important;
      overflow: visible !important;
      margin: auto 0 !important;
    }
    .aegis-flow {
      left: 4% !important;
      right: 4% !important;
      top: 50% !important;
    }
    .aegis-node {
      min-width: 0 !important;
      width: 100% !important;
      max-width: 100% !important;
      min-height: 148px !important;
      height: auto !important;
      overflow: hidden !important;
      padding: 11px 9px !important;
      justify-content: flex-start !important;
    }
    .aegis-node .node-index {
      white-space: normal !important;
      overflow-wrap: anywhere !important;
      flex: 0 0 auto !important;
    }
    .aegis-node strong {
      display: block !important;
      max-width: 100% !important;
      white-space: normal !important;
      overflow-wrap: anywhere !important;
      word-break: normal !important;
      line-height: 1.15 !important;
      font-size: clamp(7px, .62vw, 10px) !important;
      letter-spacing: .015em !important;
    }
    .aegis-node span:not(.node-index) {
      display: block !important;
      max-width: 100% !important;
      white-space: normal !important;
      overflow-wrap: anywhere !important;
      line-height: 1.45 !important;
    }
    @media (max-width: 1050px) {
      .aegis-inner {
        grid-template-columns: minmax(0, 38fr) minmax(0, 62fr) !important;
        gap: 10px !important;
      }
      .aegis-node { padding: 10px 8px !important; }
      .aegis-node strong { font-size: 7.5px !important; }
    }
    @media (max-width: 760px) {
      .aegis-inner {
        grid-template-columns: 1fr !important;
        min-height: 0 !important;
      }
      .aegis-architecture {
        grid-template-columns: 1fr !important;
        min-height: 0 !important;
      }
      .aegis-node { min-height: 100px !important; }
      .aegis-flow { display: none !important; }
    }
  `;
  document.head.appendChild(style);
});
