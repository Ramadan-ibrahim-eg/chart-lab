// public/logo.js
// Responsibility: export the Chart Lab logo as an SVG string.
// Served from /logo.svg so we don't depend on external hosts.

export const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="flaskGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0f3c5c" />
      <stop offset="55%" stop-color="#116782" />
      <stop offset="100%" stop-color="#149697" />
    </linearGradient>
    <linearGradient id="bar1Grad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#10496b" />
      <stop offset="100%" stop-color="#13849c" />
    </linearGradient>
    <linearGradient id="bar2Grad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#11838d" />
      <stop offset="100%" stop-color="#1ca39e" />
    </linearGradient>
    <linearGradient id="bar3Grad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#459d55" />
      <stop offset="100%" stop-color="#84bc49" />
    </linearGradient>
    <linearGradient id="bar4Grad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#ee7c29" />
      <stop offset="100%" stop-color="#f7aa43" />
    </linearGradient>
  </defs>

  <circle cx="222" cy="18" r="13" fill="#239696" />
  <circle cx="255" cy="54" r="19" fill="#23a89a" />
  <circle cx="192" cy="74" r="23" fill="#135d7d" />
  <circle cx="240" cy="96" r="10" fill="#239696" />
  <circle cx="204" cy="158" r="9" fill="#239696" />
  <circle cx="235" cy="186" r="13" fill="#4aa161" />
  <circle cx="198" cy="222" r="15" fill="#18a19c" />

  <path d="M 116 335 L 152 299 L 172 299 L 172 346 L 116 396 Z" fill="url(#bar1Grad)" />
  <path d="M 116 426 L 172 376 L 172 468 L 116 468 Z" fill="url(#bar1Grad)" />

  <path d="M 196 263 L 252 263 L 252 349 L 219 320 L 196 340 Z" fill="url(#bar2Grad)" />
  <path d="M 196 370 L 219 350 L 252 379 L 252 468 L 196 468 Z" fill="url(#bar2Grad)" />

  <path d="M 276 220 L 332 220 L 332 315 L 276 364 Z" fill="url(#bar3Grad)" />
  <path d="M 276 394 L 332 345 L 332 468 L 276 468 Z" fill="url(#bar3Grad)" />

  <path d="M 356 177 L 412 177 L 412 246 L 356 294 Z" fill="url(#bar4Grad)" />
  <path d="M 356 324 L 412 276 L 412 468 L 356 468 Z" fill="url(#bar4Grad)" />

  <path d="M 48 450 L 219 300 L 279 352 L 434 217 L 416 196 L 496 178 L 474 257 L 456 237 L 280 390 L 219 337 L 68 468 Z" fill="url(#flaskGrad)" />

  <path d="M 146 116 C 122 116 122 156 146 156 L 154 156 L 154 226 L 14 434 C -2 458 14 494 46 494 L 416 494 C 446 494 456 462 436 442 L 424 456 C 434 466 428 476 414 476 L 48 476 C 30 476 22 456 32 440 L 172 232 L 172 138 L 146 138 C 142 138 142 134 146 134 L 286 134 C 290 134 290 138 286 138 L 260 138 L 260 198 L 278 198 L 278 156 L 286 156 C 310 156 310 116 286 116 Z" fill="url(#flaskGrad)" />
</svg>`;
