// High quality, biologically accurate, self-contained SVG illustrations for cellular organelles
// These data URIs load instantaneously, work offline, and never break or 404.

export const MITOCONDRIA_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="mitoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#ea580c"/>
    </linearGradient>
    <linearGradient id="innerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fed7aa"/>
      <stop offset="100%" stop-color="#fdba74"/>
    </linearGradient>
    <filter id="mitoShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#ea580c" flood-opacity="0.25"/>
    </filter>
  </defs>
  <!-- Outer Membrane (Bean/Capsule shape) -->
  <path d="M 45,75 C 30,105 35,145 65,165 C 95,185 145,180 165,150 C 185,120 175,75 150,50 C 125,25 60,45 45,75 Z" 
        fill="url(#mitoGrad)" stroke="#c2410c" stroke-width="4" filter="url(#mitoShadow)"/>
  
  <!-- Intermembrane Space / Matrix Base -->
  <path d="M 52,78 C 39,104 44,139 70,156 C 96,173 139,169 156,143 C 173,117 164,78 143,56 C 122,34 65,52 52,78 Z" 
        fill="url(#innerGrad)" stroke="#ea580c" stroke-width="2"/>
  
  <!-- Inner Membrane Cristae (characteristic deep folds) -->
  <path d="M 68,68 Q 95,78 115,70 
           Q 85,90 62,98 
           Q 105,108 140,95 
           Q 100,122 75,130 
           Q 115,142 148,128 
           Q 120,150 95,155" 
        fill="none" stroke="#ea580c" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  
  <path d="M 125,58 Q 140,75 152,80 
           Q 142,95 155,115" 
        fill="none" stroke="#c2410c" stroke-width="4" stroke-linecap="round"/>

  <!-- Mitochondrial Matrix Granules / Ribosomes -->
  <circle cx="85" cy="88" r="2.5" fill="#9a3412"/>
  <circle cx="120" cy="112" r="2.5" fill="#9a3412"/>
  <circle cx="100" cy="135" r="2" fill="#9a3412"/>
  <circle cx="135" cy="78" r="2" fill="#9a3412"/>
  <circle cx="75" cy="115" r="2" fill="#9a3412"/>

  <!-- Subtle ATP glow badge -->
  <g transform="translate(140, 140)">
    <circle cx="0" cy="0" r="16" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
    <text x="0" y="4" font-family="system-ui, sans-serif" font-size="9" font-weight="900" fill="#713f12" text-anchor="middle">ATP</text>
  </g>
</svg>
`)}`;

export const CLOROPLASTO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="cloroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#16a34a"/>
      <stop offset="100%" stop-color="#15803d"/>
    </linearGradient>
    <linearGradient id="stromaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#dcfce7"/>
      <stop offset="100%" stop-color="#bbf7d0"/>
    </linearGradient>
    <filter id="cloroShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#15803d" flood-opacity="0.25"/>
    </filter>
  </defs>
  <!-- Outer Membrane (Lens / Disc shape) -->
  <ellipse cx="100" cy="100" rx="84" ry="62" fill="url(#cloroGrad)" stroke="#166534" stroke-width="4" filter="url(#cloroShadow)"/>
  <!-- Inner Membrane / Stroma -->
  <ellipse cx="100" cy="100" rx="74" ry="52" fill="url(#stromaGrad)" stroke="#22c55e" stroke-width="2"/>
  
  <!-- Stroma Lamellae (connecting thylakoids) -->
  <line x1="58" y1="95" x2="142" y2="95" stroke="#16a34a" stroke-width="3" stroke-linecap="round"/>
  <line x1="65" y1="115" x2="135" y2="115" stroke="#16a34a" stroke-width="3" stroke-linecap="round"/>
  <line x1="75" y1="80" x2="125" y2="80" stroke="#16a34a" stroke-width="3" stroke-linecap="round"/>

  <!-- Stack 1 (Granum Left) -->
  <ellipse cx="65" cy="78" rx="16" ry="6" fill="#15803d" stroke="#14532d" stroke-width="1.5"/>
  <ellipse cx="65" cy="88" rx="16" ry="6" fill="#16a34a" stroke="#14532d" stroke-width="1.5"/>
  <ellipse cx="65" cy="98" rx="16" ry="6" fill="#22c55e" stroke="#14532d" stroke-width="1.5"/>
  <ellipse cx="65" cy="108" rx="16" ry="6" fill="#15803d" stroke="#14532d" stroke-width="1.5"/>
  <ellipse cx="65" cy="118" rx="16" ry="6" fill="#16a34a" stroke="#14532d" stroke-width="1.5"/>

  <!-- Stack 2 (Granum Middle) -->
  <ellipse cx="100" cy="72" rx="18" ry="6.5" fill="#15803d" stroke="#14532d" stroke-width="1.5"/>
  <ellipse cx="100" cy="82" rx="18" ry="6.5" fill="#16a34a" stroke="#14532d" stroke-width="1.5"/>
  <ellipse cx="100" cy="92" rx="18" ry="6.5" fill="#22c55e" stroke="#14532d" stroke-width="1.5"/>
  <ellipse cx="100" cy="102" rx="18" ry="6.5" fill="#15803d" stroke="#14532d" stroke-width="1.5"/>
  <ellipse cx="100" cy="112" rx="18" ry="6.5" fill="#16a34a" stroke="#14532d" stroke-width="1.5"/>
  <ellipse cx="100" cy="122" rx="18" ry="6.5" fill="#15803d" stroke="#14532d" stroke-width="1.5"/>

  <!-- Stack 3 (Granum Right) -->
  <ellipse cx="135" cy="78" rx="16" ry="6" fill="#15803d" stroke="#14532d" stroke-width="1.5"/>
  <ellipse cx="135" cy="88" rx="16" ry="6" fill="#16a34a" stroke="#14532d" stroke-width="1.5"/>
  <ellipse cx="135" cy="98" rx="16" ry="6" fill="#22c55e" stroke="#14532d" stroke-width="1.5"/>
  <ellipse cx="135" cy="108" rx="16" ry="6" fill="#15803d" stroke="#14532d" stroke-width="1.5"/>
  <ellipse cx="135" cy="118" rx="16" ry="6" fill="#16a34a" stroke="#14532d" stroke-width="1.5"/>

  <!-- Starch granule -->
  <ellipse cx="130" cy="62" rx="8" ry="5" fill="#ffffff" opacity="0.7"/>
</svg>
`)}`;

export const NUCLEO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <radialGradient id="nucGrad" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#60a5fa"/>
      <stop offset="60%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </radialGradient>
    <radialGradient id="nucleolusGrad" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#1e3a8a"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </radialGradient>
    <filter id="nucShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#1d4ed8" flood-opacity="0.3"/>
    </filter>
  </defs>
  <!-- Nuclear Envelope (Double membrane sphere) -->
  <circle cx="100" cy="100" r="78" fill="url(#nucGrad)" stroke="#1e40af" stroke-width="5" filter="url(#nucShadow)"/>
  <circle cx="100" cy="100" r="70" fill="none" stroke="#93c5fd" stroke-width="2" stroke-dasharray="10 5"/>

  <!-- Nuclear Pores around envelope -->
  <circle cx="100" cy="22" r="3" fill="#172554"/>
  <circle cx="155" cy="45" r="3" fill="#172554"/>
  <circle cx="178" cy="100" r="3" fill="#172554"/>
  <circle cx="155" cy="155" r="3" fill="#172554"/>
  <circle cx="100" cy="178" r="3" fill="#172554"/>
  <circle cx="45" cy="155" r="3" fill="#172554"/>
  <circle cx="22" cy="100" r="3" fill="#172554"/>
  <circle cx="45" cy="45" r="3" fill="#172554"/>

  <!-- Chromatin Mesh / DNA Fibers -->
  <path d="M 60,70 Q 75,90 65,110 T 80,140 Q 110,130 130,145 T 145,110 Q 130,80 145,65 T 100,55 Z" 
        fill="none" stroke="#bfdbfe" stroke-width="2.5" opacity="0.6"/>
  <path d="M 50,110 Q 70,125 90,115 T 120,135 T 150,95" 
        fill="none" stroke="#93c5fd" stroke-width="2" opacity="0.5"/>

  <!-- Dense Nucleolus (where ribosomes are made) -->
  <circle cx="108" cy="95" r="26" fill="url(#nucleolusGrad)" stroke="#2563eb" stroke-width="2.5"/>
  <!-- Nucleolus texture -->
  <circle cx="104" cy="90" r="4" fill="#3b82f6" opacity="0.6"/>
  <circle cx="115" cy="98" r="5" fill="#3b82f6" opacity="0.5"/>
  <circle cx="100" cy="102" r="3" fill="#3b82f6" opacity="0.6"/>
</svg>
`)}`;

export const RIBOSSOMO_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="largeSubunit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="smallSubunit" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde047"/>
      <stop offset="100%" stop-color="#eab308"/>
    </linearGradient>
    <filter id="riboShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#d97706" flood-opacity="0.3"/>
    </filter>
  </defs>
  
  <!-- mRNA Strand passing through -->
  <path d="M 20,118 Q 60,110 100,122 T 180,115" fill="none" stroke="#ec4899" stroke-width="5" stroke-linecap="round"/>
  <!-- mRNA Codons (nucleotides) -->
  <line x1="35" y1="113" x2="35" y2="120" stroke="#db2777" stroke-width="3"/>
  <line x1="55" y1="110" x2="55" y2="117" stroke="#db2777" stroke-width="3"/>
  <line x1="75" y1="113" x2="75" y2="120" stroke="#db2777" stroke-width="3"/>
  <line x1="95" y1="118" x2="95" y2="125" stroke="#db2777" stroke-width="3"/>
  <line x1="120" y1="117" x2="120" y2="124" stroke="#db2777" stroke-width="3"/>
  <line x1="145" y1="114" x2="145" y2="121" stroke="#db2777" stroke-width="3"/>
  <line x1="165" y1="112" x2="165" y2="119" stroke="#db2777" stroke-width="3"/>

  <!-- Growing polypeptide (Protein Chain) exiting the top -->
  <path d="M 100,45 Q 92,30 105,20 T 115,10" fill="none" stroke="#8b5cf6" stroke-width="6" stroke-linecap="round"/>
  <circle cx="100" cy="45" r="4.5" fill="#a855f7"/>
  <circle cx="95" cy="33" r="4.5" fill="#c084fc"/>
  <circle cx="106" cy="20" r="4.5" fill="#7c3aed"/>
  <circle cx="115" cy="10" r="4.5" fill="#6d28d9"/>

  <!-- Large Subunit (Crown / Dome shape on top) -->
  <path d="M 45,108 C 40,75 55,42 90,40 C 110,39 125,48 135,44 C 150,52 165,75 160,108 C 145,112 120,104 100,108 C 80,112 58,105 45,108 Z" 
        fill="url(#largeSubunit)" stroke="#b45309" stroke-width="3.5" filter="url(#riboShadow)"/>

  <!-- Large subunit features (E, P, A sites groove) -->
  <ellipse cx="80" cy="85" rx="8" ry="14" fill="#b45309" opacity="0.3"/>
  <ellipse cx="102" cy="83" rx="8" ry="15" fill="#b45309" opacity="0.35"/>
  <ellipse cx="124" cy="87" rx="8" ry="13" fill="#b45309" opacity="0.3"/>

  <!-- Small Subunit (Base / Platform below mRNA) -->
  <path d="M 48,124 C 48,124 55,145 75,155 C 95,165 125,162 145,152 C 158,142 162,126 162,126 C 145,133 125,128 102,130 C 80,132 60,126 48,124 Z" 
        fill="url(#smallSubunit)" stroke="#ca8a04" stroke-width="3" filter="url(#riboShadow)"/>
</svg>
`)}`;

export const GOLGI_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
  <defs>
    <linearGradient id="golgiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#7e22ce"/>
    </linearGradient>
    <filter id="golgiShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#7e22ce" flood-opacity="0.25"/>
    </filter>
  </defs>
  
  <!-- Stacked Cisternae (Curved flattened membranes) -->
  <!-- Cisterna 1 -->
  <path d="M 45,55 C 80,45 120,45 155,55 C 160,56 162,64 156,66 C 122,58 78,58 44,66 C 38,64 40,56 45,55 Z" 
        fill="url(#golgiGrad)" stroke="#6b21a8" stroke-width="2.5" filter="url(#golgiShadow)"/>
  
  <!-- Cisterna 2 -->
  <path d="M 40,78 C 80,66 120,66 160,78 C 166,80 168,88 161,90 C 123,80 77,80 39,90 C 32,88 34,80 40,78 Z" 
        fill="url(#golgiGrad)" stroke="#6b21a8" stroke-width="2.5" filter="url(#golgiShadow)"/>

  <!-- Cisterna 3 (Main central curve) -->
  <path d="M 36,102 C 80,88 120,88 164,102 C 171,104 172,113 164,115 C 122,103 78,103 36,115 C 28,113 29,104 36,102 Z" 
        fill="url(#golgiGrad)" stroke="#6b21a8" stroke-width="2.5" filter="url(#golgiShadow)"/>

  <!-- Cisterna 4 -->
  <path d="M 42,126 C 80,114 120,114 158,126 C 165,128 165,136 158,138 C 122,128 78,128 42,138 C 35,136 35,128 42,126 Z" 
        fill="url(#golgiGrad)" stroke="#6b21a8" stroke-width="2.5" filter="url(#golgiShadow)"/>

  <!-- Cisterna 5 (Trans face) -->
  <path d="M 48,148 C 82,138 118,138 152,148 C 158,150 157,157 151,158 C 120,150 80,150 49,158 C 43,157 42,150 48,148 Z" 
        fill="url(#golgiGrad)" stroke="#6b21a8" stroke-width="2.5" filter="url(#golgiShadow)"/>

  <!-- Transport and Secretory Vesicles budding off -->
  <circle cx="26" cy="74" r="8" fill="#c084fc" stroke="#7e22ce" stroke-width="2"/>
  <circle cx="174" cy="70" r="9" fill="#c084fc" stroke="#7e22ce" stroke-width="2"/>
  
  <circle cx="22" cy="112" r="10" fill="#a855f7" stroke="#6b21a8" stroke-width="2"/>
  <circle cx="178" cy="115" r="9.5" fill="#a855f7" stroke="#6b21a8" stroke-width="2"/>

  <circle cx="32" cy="154" r="8" fill="#c084fc" stroke="#7e22ce" stroke-width="2"/>
  <circle cx="168" cy="156" r="9" fill="#c084fc" stroke="#7e22ce" stroke-width="2"/>
  
  <circle cx="70" cy="172" r="7.5" fill="#d8b4fe" stroke="#7e22ce" stroke-width="2"/>
  <circle cx="130" cy="174" r="8" fill="#d8b4fe" stroke="#7e22ce" stroke-width="2"/>
  <circle cx="100" cy="180" r="6" fill="#e9d5ff" stroke="#7e22ce" stroke-width="1.5"/>
</svg>
`)}`;
