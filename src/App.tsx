import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Copy, 
  Check, 
  Maximize2, 
  X, 
  Settings2, 
  Eye, 
  Info, 
  RefreshCw, 
  Layout, 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2,
  Sparkles,
  Image as ImageIcon,
  Upload,
  FolderOpen
} from 'lucide-react';
import { ItemConfig, WidgetConfig } from './types';
import { 
  MITOCONDRIA_SVG, 
  CLOROPLASTO_SVG, 
  NUCLEO_SVG, 
  RIBOSSOMO_SVG, 
  GOLGI_SVG,
  RETICULO_SVG,
  LISOSSOMO_SVG,
  VACUOLO_SVG,
  BUILTIN_IMAGE_PRESETS,
  BuiltinPresetImage
} from './organelleAssets';

// Default biological educational dataset: Organelas Celulares (with 5 tested, 100% reliable SVG illustrations)
const DEFAULT_ORGANELAS_CONFIG: WidgetConfig = {
  title: 'Identifique as Organelas Celulares',
  subtitle: 'Associe cada organela citoplasmática à sua respectiva função na sobrevivência da célula eucariótica.',
  globalExplanation: 'Incrível! Você domina as funções das organelas citoplasmáticas que mantêm as células saudáveis, ativas e gerando energia.',
  showTitle: true,
  showSubtitle: true,
  showSuccessMessage: false,
  showInstruction: false,
  showReview: false,
  showProgressBar: true,
  items: [
    {
      id: 'bio-0',
      name: 'Mitocôndria',
      targetImageUrl: '',
      sourceImageUrl: MITOCONDRIA_SVG,
      explanation: 'Usina de energia celular. Responsável pela respiração celular e síntese de ATP para abastecer todo o metabolismo celular.',
    },
    {
      id: 'bio-1',
      name: 'Cloroplasto',
      targetImageUrl: '',
      sourceImageUrl: CLOROPLASTO_SVG,
      explanation: 'Centro de fotossíntese. Presente em células vegetais e algas, capta a energia luminosa solar para produzir glicose e oxigênio.',
    },
    {
      id: 'bio-2',
      name: 'Núcleo Celular',
      targetImageUrl: '',
      sourceImageUrl: NUCLEO_SVG,
      explanation: 'Diretoria de controle celular. Contém o DNA genômico e coordena o crescimento, reprodução celular e a transcrição gênica.',
    },
    {
      id: 'bio-3',
      name: 'Ribossomo',
      targetImageUrl: '',
      sourceImageUrl: RIBOSSOMO_SVG,
      explanation: 'Fábrica de proteínas. Traduz as informações genéticas do RNA mensageiro em sequências de aminoácidos vitais.',
    },
    {
      id: 'bio-4',
      name: 'Complexo de Golgi',
      targetImageUrl: '',
      sourceImageUrl: GOLGI_SVG,
      explanation: 'Centro de distribuição celular. Modifica, separa, empacota e direciona proteínas e vesículas para secreção ou uso interno.',
    },
  ]
};

// Generates self-contained, standalone production-ready HTML code
function generateStandaloneHTML(config: WidgetConfig): string {
  const showTitle = config.showTitle ?? true;
  const showSubtitle = config.showSubtitle ?? true;
  const showSuccessMsg = config.showSuccessMessage ?? false;
  const showInstruction = config.showInstruction ?? false;
  const showReview = config.showReview ?? false;
  const showProgressBar = config.showProgressBar ?? true;

  // Safe serialized config preventing any script injection or tag break
  const safeSerializedConfig = JSON.stringify(config).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>${showTitle && config.title ? config.title : 'Arrasta e Combina - Atividade Interativa'}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { 
            font-family: 'Inter', system-ui, -apple-system, sans-serif; 
            background-color: #f8fafc; 
            color: #1e293b;
            touch-action: pan-y;
            margin: 0;
            padding: 1rem;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .main-container {
            max-width: 56rem;
            width: 100%;
            background: #ffffff;
            border-radius: 1.5rem;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02);
            border: 1px solid #f1f5f9;
            padding: 1.5rem;
        }
        @media (min-width: 640px) {
            .main-container { padding: 2rem; }
        }
        .draggable { cursor: grab; user-select: none; -webkit-user-select: none; }
        .draggable:active { cursor: grabbing; }
        .selected-item { outline: 3px solid #3b82f6; outline-offset: 2px; }
        .target-slot { transition: all 0.2s ease; }
        .target-hovered { 
            border-color: #3b82f6 !important; 
            background-color: #eff6ff !important; 
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.25) !important;
            transform: scale(1.02);
        }
        .pulse-target { animation: pulse 1.6s infinite ease-in-out; }
        @keyframes pulse {
            0%, 100% { border-color: #93c5fd; box-shadow: 0 0 0 0 rgba(147, 197, 253, 0.5); }
            50% { border-color: #3b82f6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2); }
        }
        .correct-animation { animation: correct 0.5s ease-out; }
        @keyframes correct {
            0% { transform: scale(1); }
            50% { transform: scale(1.04); border-color: #10b981; }
            100% { transform: scale(1); }
        }
        .wrong-animation { animation: wrong 0.4s ease-in-out; }
        @keyframes wrong {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-8px); }
            40%, 80% { transform: translateX(8px); }
        }
        .touch-ghost {
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.92;
            transform: translate(-50%, -50%) scale(1.05) rotate(2deg);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            transition: none;
        }
        .hidden { display: none !important; }
    </style>
</head>
<body class="flex flex-col items-center justify-start min-h-screen p-4 sm:p-8">
    <div class="main-container space-y-6">
        ${(showTitle || showSubtitle) ? `
        <!-- Header -->
        <div class="text-center space-y-2 border-b border-slate-100 pb-4">
            ${showTitle ? `<h1 class="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight" id="quiz-title"></h1>` : ''}
            ${showSubtitle ? `<p class="text-slate-500 text-sm font-medium" id="quiz-subtitle"></p>` : ''}
        </div>
        ` : ''}

        ${showInstruction ? `
        <!-- Touch Hint -->
        <div class="flex items-center justify-start text-xs text-slate-400 font-semibold px-2">
            <span class="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full text-slate-600">
                💡 <span class="hidden sm:inline">Arraste o item da esquerda para o correspondente na direita (ou use clique).</span>
                <span class="sm:hidden">Toque em um item da esquerda e depois no correspondente da direita.</span>
            </span>
        </div>
        ` : ''}
        
        ${showProgressBar ? `
        <!-- Progress Bar Indicator -->
        <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div id="progress-bar" class="bg-gradient-to-r from-blue-500 to-indigo-600 h-full w-0 transition-all duration-300"></div>
        </div>
        ` : ''}

        <!-- Core Grid: Left = Draggables, Right = Targets -->
        <div class="grid md:grid-cols-2 gap-8 items-start">
            <!-- Left Side: Scrambled Draggables -->
            <div class="space-y-4">
                <h2 class="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Itens para Arrastar</h2>
                <div id="draggables-container" class="space-y-3"></div>
            </div>

            <!-- Right Side: Target slots -->
            <div class="space-y-4">
                <h2 class="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Correspondente</h2>
                <div id="targets-container" class="space-y-3"></div>
            </div>
        </div>

        ${showSuccessMsg ? `
        <!-- Success & Review Screen (Hidden until completion) -->
        <div id="success-screen" class="hidden bg-emerald-50 border border-emerald-100 p-6 rounded-2xl space-y-4 transition-all duration-500">
            <div class="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                <div class="flex items-center gap-3 min-w-0">
                    <div class="bg-emerald-500 text-white p-2 rounded-full shadow-md shadow-emerald-200 flex-shrink-0">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <div class="min-w-0 flex-1">
                        <p class="text-sm text-emerald-900 font-semibold leading-relaxed" id="global-explanation">
                            ${config.globalExplanation ? config.globalExplanation : 'Parabéns! Você completou todas as correspondências corretamente!'}
                        </p>
                    </div>
                </div>
                <button type="button" onclick="resetQuiz()" class="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1.5 transition-colors cursor-pointer bg-transparent border-0 py-1.5 px-2.5 rounded-lg hover:bg-emerald-100/60 flex-shrink-0" title="Reiniciar Atividade">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                        <path d="M3 3v5h5"/>
                        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                        <path d="M16 16h5v5"/>
                    </svg>
                    Reiniciar Atividade
                </button>
            </div>
            
            ${showReview ? `
            <div class="space-y-2 pt-1 border-t border-emerald-100/60">
                <h4 class="text-xs font-bold text-emerald-800 uppercase tracking-wider">Revisão Didática:</h4>
                <div id="explanations-list" class="space-y-2"></div>
            </div>
            ` : ''}
        </div>
        ` : `
        <!-- Actions below main board when success message is disabled -->
        <div class="flex items-center justify-end pt-3 border-t border-slate-100">
            <button type="button" onclick="resetQuiz()" class="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1.5 transition-colors cursor-pointer bg-transparent border-0 py-1.5 px-3 rounded-lg hover:bg-slate-100" title="Reiniciar Atividade">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                    <path d="M3 3v5h5"/>
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
                    <path d="M16 16h5v5"/>
                </svg>
                Reiniciar Atividade
            </button>
        </div>
        `}
    </div>

    <script>
        const config = ${safeSerializedConfig};
        let matchedIndices = [];
        let selectedItemIndex = null;
        let shuffledOrder = [];
        let activeHoverTarget = null;
        
        function initQuiz() {
            try {
                matchedIndices = [];
                selectedItemIndex = null;
                activeHoverTarget = null;
                
                const titleEl = document.getElementById('quiz-title');
                if (titleEl) titleEl.innerText = config.title || '';

                const subEl = document.getElementById('quiz-subtitle');
                if (subEl) subEl.innerText = config.subtitle || '';

                const globalExpEl = document.getElementById('global-explanation');
                if (globalExpEl && config.globalExplanation) {
                    globalExpEl.innerText = config.globalExplanation;
                }

                const successScreen = document.getElementById('success-screen');
                if (successScreen) {
                    successScreen.classList.add('hidden');
                }
                
                // Generate shuffled index order
                shuffledOrder = Array.from({length: (config.items || []).length}, (_, i) => i);
                shuffledOrder.sort(() => Math.random() - 0.5);
                
                renderDraggables();
                renderTargets();
                updateProgress();
            } catch (err) {
                console.error("Erro ao inicializar o quiz:", err);
            }
        }

        function renderDraggables() {
            const container = document.getElementById('draggables-container');
            if (!container) return;
            container.innerHTML = '';
            
            shuffledOrder.forEach((index) => {
                const item = config.items[index];
                if (!item) return;
                const isMatched = matchedIndices.includes(index);
                
                if (isMatched) {
                    const placeholder = document.createElement('div');
                    placeholder.className = "h-[96px] border border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-emerald-600 text-xs font-bold bg-emerald-50/20 transition-all duration-300";
                    placeholder.innerHTML = "✓ Correto!";
                    container.appendChild(placeholder);
                    return;
                }
                
                const card = document.createElement('div');
                card.id = \`drag-card-\${index}\`;
                card.draggable = true;
                
                const isSelected = selectedItemIndex === index;
                card.className = \`flex items-center gap-4 p-3 bg-white border-2 border-slate-100 hover:border-blue-300 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 draggable min-h-[96px] \${isSelected ? 'selected-item border-blue-500 ring-4 ring-blue-50' : ''}\`;
                
                // Desktop HTML5 drag events
                card.addEventListener('dragstart', (e) => {
                    e.dataTransfer.setData('text/plain', index);
                    card.classList.add('opacity-40');
                    selectDraggable(index, false);
                });
                
                card.addEventListener('dragend', () => {
                    card.classList.remove('opacity-40');
                    clearAllTargetHovers();
                });
                
                // Click selection
                card.addEventListener('click', (e) => {
                    e.stopPropagation();
                    selectDraggable(index);
                });

                // Mobile touch-drag support
                setupTouchDrag(card, index);
                
                card.innerHTML = \`
                    <div class="bg-slate-50 p-1.5 rounded-xl flex-shrink-0 w-16 h-16 flex items-center justify-center border border-slate-100 overflow-hidden">
                        <img src="\${item.sourceImageUrl}" class="w-full h-full object-contain pointer-events-none rounded-lg" alt="\${item.name || ''}">
                    </div>
                    <div class="flex-1 min-w-0">
                        <p class="font-bold text-slate-800 text-sm truncate">\${item.name || ''}</p>
                        <p class="text-xs text-slate-400 mt-1 font-medium flex items-center gap-1">
                            ↔ Arraste ou clique o correspondente
                        </p>
                    </div>
                \`;
                container.appendChild(card);
            });
        }

        // Sets up smooth touch drag for mobile & tablets
        function setupTouchDrag(card, itemIndex) {
            let ghostEl = null;
            let currentHoverSlot = null;

            card.addEventListener('touchstart', (e) => {
                if (matchedIndices.includes(itemIndex)) return;
                const touch = e.touches[0];
                selectDraggable(itemIndex, false);

                ghostEl = card.cloneNode(true);
                ghostEl.classList.add('touch-ghost');
                ghostEl.style.width = card.offsetWidth + 'px';
                ghostEl.style.left = touch.clientX + 'px';
                ghostEl.style.top = touch.clientY + 'px';
                document.body.appendChild(ghostEl);
                card.classList.add('opacity-40');
            }, { passive: true });

            card.addEventListener('touchmove', (e) => {
                if (!ghostEl) return;
                const touch = e.touches[0];
                ghostEl.style.left = touch.clientX + 'px';
                ghostEl.style.top = touch.clientY + 'px';

                // Detect target slot under finger with tolerance
                const targetIdx = findTargetAtPoint(touch.clientX, touch.clientY);
                if (targetIdx !== currentHoverSlot) {
                    clearAllTargetHovers();
                    currentHoverSlot = targetIdx;
                    if (targetIdx !== null) {
                        const slot = document.getElementById(\`target-slot-\${targetIdx}\`);
                        if (slot) slot.classList.add('target-hovered');
                    }
                }
            }, { passive: true });

            card.addEventListener('touchend', (e) => {
                if (!ghostEl) return;
                ghostEl.remove();
                ghostEl = null;
                card.classList.remove('opacity-40');
                clearAllTargetHovers();

                const touch = e.changedTouches[0];
                const targetIdx = findTargetAtPoint(touch.clientX, touch.clientY);
                if (targetIdx !== null) {
                    handleMatchAttempt(itemIndex, targetIdx);
                }
            });
        }

        function findTargetAtPoint(x, y) {
            for (let i = 0; i < (config.items || []).length; i++) {
                if (matchedIndices.includes(i)) continue;
                const slot = document.getElementById(\`target-slot-\${i}\`);
                if (slot) {
                    const rect = slot.getBoundingClientRect();
                    // 30px generous padding buffer
                    if (x >= rect.left - 30 && x <= rect.right + 30 &&
                        y >= rect.top - 20 && y <= rect.bottom + 20) {
                        return i;
                    }
                }
            }
            return null;
        }

        function clearAllTargetHovers() {
            document.querySelectorAll('.target-slot').forEach(el => el.classList.remove('target-hovered'));
        }

        function renderTargets() {
            const container = document.getElementById('targets-container');
            if (!container) return;
            container.innerHTML = '';
            
            (config.items || []).forEach((item, index) => {
                const isMatched = matchedIndices.includes(index);
                const shadowImg = item.targetImageUrl || item.sourceImageUrl;
                
                const slot = document.createElement('div');
                slot.id = \`target-slot-\${index}\`;
                slot.className = \`target-slot flex items-center gap-4 p-3.5 bg-slate-50 border-2 rounded-2xl transition-all duration-300 min-h-[96px] \${isMatched ? 'border-emerald-200 bg-emerald-50/20' : 'border-dashed border-slate-200'}\`;
                
                // HTML5 Drag and Drop events
                slot.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    if (!isMatched) {
                        slot.classList.add('target-hovered');
                    }
                });
                
                slot.addEventListener('dragleave', () => {
                    if (!isMatched) {
                        slot.classList.remove('target-hovered');
                    }
                });
                
                slot.addEventListener('drop', (e) => {
                    e.preventDefault();
                    slot.classList.remove('target-hovered');
                    if (isMatched) return;
                    
                    const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
                    handleMatchAttempt(draggedIndex, index);
                });
                
                // Click selection pairing
                slot.addEventListener('click', () => {
                    if (isMatched) return;
                    if (selectedItemIndex !== null) {
                        handleMatchAttempt(selectedItemIndex, index);
                    }
                });

                let innerHtml = '';
                if (isMatched) {
                    innerHtml = \`
                        <div class="w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-emerald-100 p-1 shadow-xs">
                            <img src="\${item.sourceImageUrl}" class="w-full h-full object-contain rounded-lg" alt="\${item.name || ''}">
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="font-bold text-emerald-900 text-sm">\${item.name || ''}</p>
                            <p class="text-xs text-emerald-700/80 mt-1 leading-relaxed font-medium">\${item.explanation || ''}</p>
                        </div>
                        <div class="bg-emerald-500 text-white p-1 rounded-full flex-shrink-0 shadow-xs">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                    \`;
                } else {
                    innerHtml = \`
                        <div class="w-16 h-16 rounded-xl bg-slate-100 flex-shrink-0 p-1 flex items-center justify-center relative overflow-hidden">
                            <img src="\${shadowImg}" class="w-full h-full object-contain grayscale opacity-25 brightness-110 rounded-lg" alt="">
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="font-bold text-slate-400 text-sm tracking-tight">Solte ou clique verificar</p>
                            <p class="text-xs text-slate-400 font-semibold truncate mt-0.5">\${item.name || ''}</p>
                        </div>
                    \`;
                    if (selectedItemIndex !== null) {
                        slot.className += ' pulse-target border-blue-300 bg-blue-50/10 cursor-pointer';
                    }
                }
                
                slot.innerHTML = innerHtml;
                container.appendChild(slot);
            });
        }

        function selectDraggable(index, reRender = true) {
            if (matchedIndices.includes(index)) return;
            if (selectedItemIndex === index) {
                selectedItemIndex = null;
            } else {
                selectedItemIndex = index;
            }
            if (reRender) {
                renderDraggables();
                renderTargets();
            }
        }

        function handleMatchAttempt(draggedIndex, targetIndex) {
            if (draggedIndex === targetIndex) {
                matchedIndices.push(draggedIndex);
                selectedItemIndex = null;
                
                const targetSlot = document.getElementById(\`target-slot-\${targetIndex}\`);
                if (targetSlot) {
                    targetSlot.classList.add('correct-animation');
                }
                
                setTimeout(() => {
                    renderDraggables();
                    renderTargets();
                    updateProgress();
                    checkQuizComplete();
                }, 250);
            } else {
                const targetSlot = document.getElementById(\`target-slot-\${targetIndex}\`);
                const dragCard = document.getElementById(\`drag-card-\${draggedIndex}\`);
                
                if (targetSlot) {
                    targetSlot.classList.add('wrong-animation', 'border-red-300', 'bg-red-50/20');
                    setTimeout(() => {
                        targetSlot.classList.remove('wrong-animation', 'border-red-300', 'bg-red-50/20');
                    }, 500);
                }
                if (dragCard) {
                    dragCard.classList.add('wrong-animation');
                    setTimeout(() => dragCard.classList.remove('wrong-animation'), 500);
                }
                
                selectedItemIndex = null;
                setTimeout(() => {
                    renderDraggables();
                    renderTargets();
                }, 500);
            }
        }

        function updateProgress() {
            const count = matchedIndices.length;
            const total = (config.items || []).length;
            const bar = document.getElementById('progress-bar');
            if (bar && total > 0) {
                bar.style.width = \`\${(count / total) * 100}%\`;
            }
        }

        function checkQuizComplete() {
            if (matchedIndices.length === (config.items || []).length && (config.items || []).length > 0) {
                const success = document.getElementById('success-screen');
                if (success) {
                    success.classList.remove('hidden');
                    
                    const list = document.getElementById('explanations-list');
                    if (list) {
                        list.innerHTML = '';
                        (config.items || []).forEach(item => {
                            const row = document.createElement('div');
                            row.className = "bg-white p-3.5 rounded-xl border border-slate-100 flex items-start gap-3 shadow-xs";
                            row.innerHTML = \`
                                <img src="\${item.sourceImageUrl}" class="w-8 h-8 object-contain flex-shrink-0 mt-0.5 rounded-md" alt="">
                                <div>
                                    <strong class="text-slate-800 font-bold">\${item.name || ''}</strong>: 
                                    <span class="text-slate-600 font-medium text-xs leading-relaxed">\${item.explanation || ''}</span>
                                </div>
                            \`;
                            list.appendChild(row);
                        });
                    }
                    
                    try {
                        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    } catch (e) {}
                }
            }
        }

        function resetQuiz() {
            initQuiz();
        }

        // Bulletproof startup: runs as soon as DOM is ready, plus fallback on load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initQuiz);
        } else {
            initQuiz();
        }
        window.addEventListener('load', () => {
            const container = document.getElementById('draggables-container');
            if (container && container.children.length === 0) {
                initQuiz();
            }
        });
    </script>
</body>
</html>`;
}

export default function App() {
  const [config, setConfig] = useState<WidgetConfig>(DEFAULT_ORGANELAS_CONFIG);
  const [matchedIds, setMatchedIds] = useState<number[]>([]);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const [selectedDraggable, setSelectedDraggable] = useState<number | null>(null);
  const [hoveredTargetIndex, setHoveredTargetIndex] = useState<number | null>(null);
  const [errorTargetId, setErrorTargetId] = useState<number | null>(null);
  const [resetCount, setResetCount] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);
  const [expandedItemIdx, setExpandedItemIdx] = useState<number | null>(0);
  const [galleryTarget, setGalleryTarget] = useState<{ itemIdx: number; isSource: boolean } | null>(null);

  const targetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const fullscreenTargetRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleLocalImageUpload = (index: number, isSource: boolean, file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        if (isSource) {
          updateItem(index, { sourceImageUrl: result });
        } else {
          updateItem(index, { targetImageUrl: result });
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Esc key closes full screen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreenPreview) {
        setIsFullscreenPreview(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreenPreview]);

  // Shuffles cards whenever quiz is reset or component amount changes
  useEffect(() => {
    const indices = Array.from({ length: config.items.length }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledIndices(indices);
    setMatchedIds([]);
    setSelectedDraggable(null);
    setHoveredTargetIndex(null);
    setErrorTargetId(null);
  }, [resetCount, config.items.length]);

  // Generous drop-target calculation with 35px buffer
  const calculateTargetFromPoint = (x: number, y: number, isFullscreen: boolean): number | null => {
    const currentRefs = isFullscreen ? fullscreenTargetRefs : targetRefs;
    let closestIndex: number | null = null;
    let minDistance = Infinity;

    for (let tIndex = 0; tIndex < config.items.length; tIndex++) {
      const targetEl = currentRefs.current[tIndex];
      if (targetEl && !matchedIds.includes(tIndex)) {
        const bounds = targetEl.getBoundingClientRect();
        // 35px horizontal buffer, 25px vertical buffer for very forgiving and responsive drag-and-drop
        const expandedLeft = bounds.left - 35;
        const expandedRight = bounds.right + 35;
        const expandedTop = bounds.top - 25;
        const expandedBottom = bounds.bottom + 25;

        if (x >= expandedLeft && x <= expandedRight && y >= expandedTop && y <= expandedBottom) {
          const centerX = (bounds.left + bounds.right) / 2;
          const centerY = (bounds.top + bounds.bottom) / 2;
          const dist = Math.hypot(x - centerX, y - centerY);
          if (dist < minDistance) {
            minDistance = dist;
            closestIndex = tIndex;
          }
        }
      }
    }
    return closestIndex;
  };

  const handleDrag = (_: any, info: any, isFullscreen = false) => {
    const { x, y } = info.point;
    const targetIdx = calculateTargetFromPoint(x, y, isFullscreen);
    setHoveredTargetIndex(targetIdx);
  };

  const handleDragEnd = (itemIndex: number, info: any, isFullscreen = false) => {
    setHoveredTargetIndex(null);
    const { x, y } = info.point;
    const targetIdx = calculateTargetFromPoint(x, y, isFullscreen);

    if (targetIdx !== null) {
      if (targetIdx === itemIndex) {
        // Correct match!
        if (!matchedIds.includes(itemIndex)) {
          setMatchedIds(prev => [...prev, itemIndex]);
        }
        setSelectedDraggable(null);
      } else {
        // Incorrect match visual indicator
        setErrorTargetId(targetIdx);
        setTimeout(() => setErrorTargetId(null), 800);
      }
    }
  };

  const handleSelectDraggable = (idx: number) => {
    if (matchedIds.includes(idx)) return;
    setSelectedDraggable(prev => prev === idx ? null : idx);
  };

  const handleSelectTarget = (idx: number) => {
    if (matchedIds.includes(idx)) return;
    if (selectedDraggable !== null) {
      if (selectedDraggable === idx) {
        // Correct match via click
        setMatchedIds(prev => [...prev, idx]);
        setSelectedDraggable(null);
      } else {
        // Incorrect match visual trigger
        setErrorTargetId(idx);
        setTimeout(() => setErrorTargetId(null), 800);
        setSelectedDraggable(null);
      }
    }
  };

  const resetWidget = () => {
    setResetCount(prev => prev + 1);
  };

  const updateItem = (index: number, updatedFields: Partial<ItemConfig>) => {
    const updatedItems = [...config.items];
    updatedItems[index] = { ...updatedItems[index], ...updatedFields };
    setConfig({ ...config, items: updatedItems });
  };

  const addItem = () => {
    if (config.items.length >= 8) return;
    const newIdx = config.items.length;
    // Find next unused preset if available
    const unusedPreset = BUILTIN_IMAGE_PRESETS.find(
      p => !config.items.some(item => item.name.toLowerCase() === p.name.toLowerCase())
    ) || BUILTIN_IMAGE_PRESETS[newIdx % BUILTIN_IMAGE_PRESETS.length];

    const newItem: ItemConfig = {
      id: `bio-${Date.now()}`,
      name: unusedPreset ? unusedPreset.name : `Nova Organela ${newIdx + 1}`,
      targetImageUrl: '',
      sourceImageUrl: unusedPreset ? unusedPreset.svgDataUri : MITOCONDRIA_SVG,
      explanation: unusedPreset ? unusedPreset.defaultExplanation : 'Insira a explicação pedagógica sobre a função desta estrutura celular aqui.'
    };
    setConfig({ ...config, items: [...config.items, newItem] });
    setExpandedItemIdx(newIdx);
  };

  const removeItem = (index: number) => {
    if (config.items.length <= 2) return;
    const updatedItems = config.items.filter((_, idx) => idx !== index);
    setConfig({ ...config, items: updatedItems });
    setExpandedItemIdx(Math.max(0, index - 1));
  };

  const copyHTMLToClipboard = async () => {
    try {
      const html = generateStandaloneHTML(config);
      await navigator.clipboard.writeText(html);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    } catch {
      // Fallback
      const html = generateStandaloneHTML(config);
      const textarea = document.createElement('textarea');
      textarea.value = html;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const downloadHTML = () => {
    setIsExporting(true);
    const standaloneHtml = generateStandaloneHTML(config);
    const blob = new Blob([standaloneHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Arrasta_e_Combina.html';
    a.click();
    URL.revokeObjectURL(url);
    setIsExporting(false);
  };

  const isComplete = matchedIds.length === config.items.length && config.items.length > 0;
  const showTitle = config.showTitle ?? true;
  const showSubtitle = config.showSubtitle ?? true;
  const showSuccessMsg = config.showSuccessMessage ?? false;
  const showInstruction = config.showInstruction ?? false;
  const showReview = config.showReview ?? false;
  const showProgressBar = config.showProgressBar ?? true;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans antialiased">
      {/* Top Bar Header */}
      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2 rounded-xl text-white shadow-md shadow-blue-100 flex-shrink-0">
              <Sparkles size={20} />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight text-slate-900 leading-tight">
                Arrasta <span className="text-blue-600 font-extrabold">e Combina</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">Criador de quiz Interativo educacional</p>
            </div>
          </div>
          
          {/* Action buttons: [Preview Tela Cheia] [Copiar HTML] [Exportar Atividade HTML] */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Fullscreen Preview Button - to the left of Export */}
            <button 
              onClick={() => setIsFullscreenPreview(true)}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer hover:shadow-xs"
              title="Exibir o quiz ocupando todo o espaço da tela"
            >
              <Maximize2 size={14} className="text-slate-600" />
              <span className="hidden sm:inline">Preview Tela Cheia</span>
              <span className="sm:hidden">Tela Cheia</span>
            </button>

            {/* Copy HTML Button - before Exportar Atividade HTML */}
            <button 
              onClick={copyHTMLToClipboard}
              className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border border-blue-200/60"
              title="Copiar o código HTML standalone para a área de transferência"
            >
              {copiedCode ? (
                <>
                  <Check size={14} className="text-emerald-600" />
                  <span className="text-emerald-700">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copiar HTML</span>
                </>
              )}
            </button>

            {/* Export HTML Button */}
            <button 
              onClick={downloadHTML}
              disabled={isExporting}
              className="flex items-center gap-1.5 bg-slate-900 text-white px-4 sm:px-5 py-2 rounded-full text-xs font-bold hover:bg-slate-800 transition-all disabled:opacity-50 shadow-md shadow-slate-200 cursor-pointer"
            >
              <Download size={14} />
              <span className="hidden sm:inline">{isExporting ? 'Processando...' : 'Exportar Atividade HTML'}</span>
              <span className="sm:hidden">Exportar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Core Layout Grid */}
        <div className="grid lg:grid-cols-[1fr_470px] gap-8 items-start">
          
          {/* Editor Sidebar */}
          <section className="order-2 lg:order-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md shadow-slate-200/40 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-50 p-2 rounded-xl text-blue-600">
                    <Settings2 size={20} />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-800">Painel de Configuração</h2>
                    <p className="text-xs text-slate-400 font-medium">Personalize textos, visibilidade e itens correspondentes</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-slate-100 px-2.5 py-1 rounded-full text-slate-500 uppercase tracking-wider">
                  Editor
                </span>
              </div>

              {/* Title & Subtitle inputs with Visibility Toggles */}
              <div className="space-y-4">
                {/* Title */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                      <Layout size={14} className="text-blue-500" />
                      Título do Quiz
                    </label>
                    <label className="flex items-center gap-1.5 text-xs cursor-pointer select-none text-slate-600">
                      <input 
                        type="checkbox" 
                        checked={showTitle}
                        onChange={(e) => setConfig({ ...config, showTitle: e.target.checked })}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                      />
                      <span className="text-[11px] font-semibold text-slate-500">Exibir título</span>
                    </label>
                  </div>
                  <input 
                    type="text" 
                    value={config.title}
                    onChange={(e) => setConfig({ ...config, title: e.target.value })}
                    className={`w-full px-3 py-2.5 bg-slate-50 border rounded-xl outline-none transition-all text-xs font-medium ${
                      showTitle ? 'border-slate-200 focus:border-blue-500 focus:bg-white text-slate-800' : 'border-slate-200 opacity-60'
                    }`}
                    placeholder="Ex: Identifique as Organelas Celulares..."
                  />
                </div>

                {/* Subtitle */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                      <Layout size={14} className="text-blue-500" />
                      Subtítulo / Instruções
                    </label>
                    <label className="flex items-center gap-1.5 text-xs cursor-pointer select-none text-slate-600">
                      <input 
                        type="checkbox" 
                        checked={showSubtitle}
                        onChange={(e) => setConfig({ ...config, showSubtitle: e.target.checked })}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                      />
                      <span className="text-[11px] font-semibold text-slate-500">Exibir subtítulo</span>
                    </label>
                  </div>
                  <input 
                    type="text" 
                    value={config.subtitle}
                    onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
                    className={`w-full px-3 py-2.5 bg-slate-50 border rounded-xl outline-none transition-all text-xs font-medium ${
                      showSubtitle ? 'border-slate-200 focus:border-blue-500 focus:bg-white text-slate-800' : 'border-slate-200 opacity-60'
                    }`}
                    placeholder="Ex: Associe cada organela à sua respectiva função..."
                  />
                </div>

                {/* Success Message Text & Toggle */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                      <Info size={14} className="text-blue-500" />
                      Texto de Sucesso (Feedback Geral)
                    </label>
                    <label className="flex items-center gap-1.5 text-xs cursor-pointer select-none text-slate-600">
                      <input 
                        type="checkbox" 
                        checked={showSuccessMsg}
                        onChange={(e) => setConfig({ ...config, showSuccessMessage: e.target.checked })}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                      />
                      <span className="text-[11px] font-semibold text-slate-500">Exibir mensagem de sucesso</span>
                    </label>
                  </div>
                  <textarea 
                    value={config.globalExplanation}
                    onChange={(e) => setConfig({ ...config, globalExplanation: e.target.value })}
                    rows={2}
                    className={`w-full px-3 py-2 bg-slate-50 border rounded-xl outline-none transition-all text-xs font-medium resize-none leading-relaxed ${
                      showSuccessMsg ? 'border-slate-200 focus:border-blue-500 focus:bg-white text-slate-800' : 'border-slate-200 opacity-60'
                    }`}
                    placeholder="Texto motivacional e explicativo mostrado ao concluir toda a atividade."
                  />
                </div>

                {/* Drag Instructions Text Toggle */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-blue-500" />
                      Orientação do Quiz
                    </label>
                    <label className="flex items-center gap-1.5 text-xs cursor-pointer select-none text-slate-600">
                      <input 
                        type="checkbox" 
                        checked={showInstruction}
                        onChange={(e) => setConfig({ ...config, showInstruction: e.target.checked })}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                      />
                      <span className="text-[11px] font-semibold text-slate-500">Exibir orientação</span>
                    </label>
                  </div>
                  <p className={`text-[11px] px-3 py-2 bg-slate-50 border rounded-xl transition-all ${
                    showInstruction ? 'border-slate-200 text-slate-600' : 'border-slate-200 opacity-60 text-slate-400'
                  }`}>
                    &ldquo;Arraste o item da esquerda para o correspondente na direita (ou use clique).&rdquo;
                  </p>
                </div>

                {/* Didactic Review Toggle */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-blue-500" />
                      Revisão Didática
                    </label>
                    <label className="flex items-center gap-1.5 text-xs cursor-pointer select-none text-slate-600">
                      <input 
                        type="checkbox" 
                        checked={showReview}
                        onChange={(e) => setConfig({ ...config, showReview: e.target.checked })}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                      />
                      <span className="text-[11px] font-semibold text-slate-500">Exibir revisão didática</span>
                    </label>
                  </div>
                  <p className={`text-[11px] px-3 py-2 bg-slate-50 border rounded-xl transition-all ${
                    showReview ? 'border-slate-200 text-slate-600' : 'border-slate-200 opacity-60 text-slate-400'
                  }`}>
                    Exibe a lista com as explicações pedagógicas de cada item no box de conclusão.
                  </p>
                </div>

                {/* Progress Bar Toggle */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                      <Layout size={14} className="text-blue-500" />
                      Barra de Progresso
                    </label>
                    <label className="flex items-center gap-1.5 text-xs cursor-pointer select-none text-slate-600">
                      <input 
                        type="checkbox" 
                        checked={showProgressBar}
                        onChange={(e) => setConfig({ ...config, showProgressBar: e.target.checked })}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                      />
                      <span className="text-[11px] font-semibold text-slate-500">Exibir barra de progresso</span>
                    </label>
                  </div>
                  <p className={`text-[11px] px-3 py-2 bg-slate-50 border rounded-xl transition-all ${
                    showProgressBar ? 'border-slate-200 text-slate-600' : 'border-slate-200 opacity-60 text-slate-400'
                  }`}>
                    Exibe a barra visual colorida indicando o avanço do preenchimento das respostas.
                  </p>
                </div>
              </div>

              {/* Items Accordion list */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    🧩 Itens do Pareamento ({config.items.length})
                  </h3>
                  <button
                    onClick={addItem}
                    disabled={config.items.length >= 8}
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-bold transition-all disabled:opacity-40 cursor-pointer"
                  >
                    <Plus size={14} /> Adicionar Item
                  </button>
                </div>

                <div className="space-y-3">
                  {config.items.map((item, index) => {
                    const isExpanded = expandedItemIdx === index;
                    return (
                      <div 
                        key={item.id}
                        className={`border rounded-2xl overflow-hidden transition-all duration-200 bg-white ${isExpanded ? 'border-blue-300 ring-2 ring-blue-50' : 'border-slate-100 hover:border-slate-200'}`}
                      >
                        {/* Accordion header */}
                        <div 
                          onClick={() => setExpandedItemIdx(isExpanded ? null : index)}
                          className="flex items-center justify-between p-3.5 bg-slate-50/50 hover:bg-slate-50 cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-slate-200 text-[10px] font-bold text-slate-600 flex items-center justify-center">
                              {index + 1}
                            </span>
                            <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 p-0.5 flex-shrink-0 overflow-hidden flex items-center justify-center">
                              <img src={item.sourceImageUrl} alt="" className="w-full h-full object-contain" />
                            </div>
                            <span className="font-bold text-xs text-slate-700 truncate max-w-[200px]">
                              {item.name || `Item ${index + 1}`}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => removeItem(index)}
                              disabled={config.items.length <= 2}
                              className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 disabled:opacity-30 transition-all cursor-pointer"
                              title="Remover item"
                            >
                              <Trash2 size={13} />
                            </button>
                            <button
                              onClick={() => setExpandedItemIdx(isExpanded ? null : index)}
                              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-all"
                            >
                              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>
                          </div>
                        </div>

                        {/* Accordion content */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="p-4 border-t border-slate-100 bg-white space-y-4 text-xs">
                                <div className="space-y-1">
                                  <label className="font-bold text-slate-600">Nome do Componente/Item</label>
                                  <input 
                                    type="text" 
                                    value={item.name}
                                    onChange={(e) => updateItem(index, { name: e.target.value })}
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl outline-none"
                                    placeholder="Ex: Mitocôndria"
                                  />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {/* Source Image (Color) */}
                                  <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                    <div className="flex items-center justify-between">
                                      <label className="font-bold text-slate-700 flex items-center gap-1.5">
                                        <span>Imagem Colorida (Item)</span>
                                      </label>
                                      {item.sourceImageUrl && (
                                        <div className="w-8 h-8 bg-white rounded-lg p-1 border border-slate-200 shadow-2xs flex items-center justify-center flex-shrink-0">
                                          <img src={item.sourceImageUrl} alt="" className="w-full h-full object-contain" />
                                        </div>
                                      )}
                                    </div>

                                    {/* Quick local image action buttons: No external link required! */}
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <button
                                        type="button"
                                        onClick={() => setGalleryTarget({ itemIdx: index, isSource: true })}
                                        className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-bold text-[11px] transition-colors cursor-pointer border border-blue-200/60"
                                        title="Escolher entre as 8 ilustrações de organelas embutidas no projeto"
                                      >
                                        <ImageIcon size={13} />
                                        <span>Galeria do Projeto</span>
                                      </button>

                                      <label
                                        className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-lg font-bold text-[11px] transition-colors cursor-pointer border border-slate-200 shadow-2xs"
                                        title="Carregar imagem do seu computador (salva localmente no app sem depender da web)"
                                      >
                                        <Upload size={13} className="text-slate-500" />
                                        <span>Carregar do PC</span>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) handleLocalImageUpload(index, true, file);
                                          }}
                                        />
                                      </label>
                                    </div>

                                    <input 
                                      type="text" 
                                      value={item.sourceImageUrl.startsWith('data:') ? '(Ilustração SVG Integrada no Projeto)' : item.sourceImageUrl}
                                      onChange={(e) => updateItem(index, { sourceImageUrl: e.target.value })}
                                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 focus:border-blue-500 rounded-lg outline-none font-mono text-[10px] text-slate-600"
                                      placeholder="Ou cole uma URL..."
                                    />
                                  </div>

                                  {/* Target Image (Shadow/Alvo) */}
                                  <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                                    <div className="flex items-center justify-between">
                                      <label className="font-bold text-slate-700 flex items-center gap-1">
                                        <span>Imagem Sombra (Alvo)</span>
                                        <span className="text-[9px] font-medium text-slate-400">(Opcional)</span>
                                      </label>
                                      {item.targetImageUrl ? (
                                        <div className="w-8 h-8 bg-white rounded-lg p-1 border border-slate-200 shadow-2xs flex items-center justify-center flex-shrink-0">
                                          <img src={item.targetImageUrl} alt="" className="w-full h-full object-contain" />
                                        </div>
                                      ) : (
                                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Auto Sombra</span>
                                      )}
                                    </div>

                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <button
                                        type="button"
                                        onClick={() => setGalleryTarget({ itemIdx: index, isSource: false })}
                                        className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-200/80 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                                        title="Escolher imagem para a silhueta da galeria"
                                      >
                                        <ImageIcon size={13} />
                                        <span>Galeria</span>
                                      </button>

                                      <label
                                        className="flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-slate-100 text-slate-700 rounded-lg font-bold text-[11px] transition-colors cursor-pointer border border-slate-200 shadow-2xs"
                                        title="Carregar imagem de silhueta do computador"
                                      >
                                        <Upload size={13} className="text-slate-500" />
                                        <span>Carregar do PC</span>
                                        <input
                                          type="file"
                                          accept="image/*"
                                          className="hidden"
                                          onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) handleLocalImageUpload(index, false, file);
                                          }}
                                        />
                                      </label>

                                      {item.targetImageUrl && (
                                        <button
                                          type="button"
                                          onClick={() => updateItem(index, { targetImageUrl: '' })}
                                          className="text-[10px] text-red-500 hover:underline font-semibold cursor-pointer"
                                        >
                                          Limpar
                                        </button>
                                      )}
                                    </div>

                                    <input 
                                      type="text" 
                                      value={item.targetImageUrl.startsWith('data:') ? '(Silhueta Integrada no Projeto)' : item.targetImageUrl}
                                      onChange={(e) => updateItem(index, { targetImageUrl: e.target.value })}
                                      className="w-full px-2.5 py-1.5 bg-white border border-slate-200 focus:border-blue-500 rounded-lg outline-none font-mono text-[10px] text-slate-600"
                                      placeholder="Deixe vazio para auto-sombra cinza"
                                    />
                                  </div>
                                </div>
                                <p className="text-[10px] text-slate-400 italic">
                                  Dica: Todas as imagens da galeria e uploads do seu PC ficam salvos no app e no HTML exportado sem precisar de conexão com internet ou servidores externos.
                                </p>

                                <div className="space-y-1">
                                  <label className="font-bold text-slate-600">Explicação / Feedback Pedagógico</label>
                                  <textarea 
                                    value={item.explanation}
                                    onChange={(e) => updateItem(index, { explanation: e.target.value })}
                                    rows={3}
                                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-blue-500 focus:bg-white rounded-xl outline-none resize-none"
                                    placeholder="Explique o que esta organela faz. Será exibido ao aluno ao realizar a correspondência."
                                  />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Preview Section (Visualização rápida) */}
          <section className="order-1 lg:order-2 lg:sticky lg:top-24 space-y-4">
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className="bg-emerald-50 p-1.5 rounded-lg text-emerald-600">
                  <Eye size={16} />
                </div>
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Visualização rápida</h3>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsFullscreenPreview(true)}
                  className="text-xs font-bold text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Expandir para tela cheia"
                >
                  <Maximize2 size={12} /> Tela Cheia
                </button>
                <button 
                  onClick={resetWidget}
                  className="text-xs font-bold text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors cursor-pointer"
                  title="Reiniciar posições"
                >
                  <RefreshCw size={12} /> Reiniciar
                </button>
              </div>
            </div>

            {/* Simulated Quiz Window */}
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden flex flex-col">
              
              {/* Educational header (respecting showTitle and showSubtitle) */}
              {(showTitle || showSubtitle) && (
                <div className="p-5 border-b border-slate-50 bg-slate-50/40 text-center space-y-1">
                  {showTitle && (
                    <h4 className="text-base font-extrabold text-slate-800 leading-snug">
                      {config.title || 'Título da Atividade'}
                    </h4>
                  )}
                  {showSubtitle && (
                    <p className="text-xs text-slate-400 font-medium">
                      {config.subtitle || 'Instruções para realizar o pareamento.'}
                    </p>
                  )}
                </div>
              )}

              {/* Educational Instruction Hint */}
              {showInstruction && (
                <div className="px-6 pt-4 flex items-center justify-start text-[11px] text-slate-400 font-bold min-h-[28px]">
                  <span className="flex items-center gap-1 text-slate-500">
                    💡 Arraste o item da esquerda para o correspondente na direita (ou use clique).
                  </span>
                </div>
              )}

              {/* Progress Bar Indicator */}
              {showProgressBar && (
                <div className={`px-6 ${showInstruction ? 'pt-2' : 'pt-4'}`}>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(matchedIds.length / config.items.length) * 100}%` }}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
                    />
                  </div>
                </div>
              )}

              {/* Quiz Body: INVERTED COLUMNS -> Left = Draggables, Right = Targets */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  
                  {/* Left Column: Draggables (scrambled) */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-1">Itens de Arrastar</p>
                    {shuffledIndices.map((idx) => {
                      const item = config.items[idx];
                      const isMatched = matchedIds.includes(idx);
                      const isSelected = selectedDraggable === idx;

                      if (isMatched) {
                        return (
                          <div 
                            key={`placeholder-${item.id}`}
                            className="h-[84px] border border-dashed border-slate-100 rounded-2xl flex items-center justify-center text-emerald-500 text-[10px] font-bold bg-emerald-50/5"
                          >
                            ✓ Correto!
                          </div>
                        );
                      }

                      return (
                        <motion.div
                          key={`drag-${item.id}`}
                          drag
                          dragSnapToOrigin
                          dragElastic={0.2}
                          dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
                          onDrag={(_, info) => handleDrag(_, info, false)}
                          onDragEnd={(_, info) => handleDragEnd(idx, info, false)}
                          onClick={() => handleSelectDraggable(idx)}
                          whileHover={{ scale: 1.02 }}
                          whileDrag={{ 
                            scale: 1.08, 
                            rotate: 1.5, 
                            zIndex: 100, 
                            boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' 
                          }}
                          whileTap={{ scale: 0.98, cursor: 'grabbing' }}
                          className={`flex items-center gap-3 p-2.5 bg-white border-2 rounded-2xl shadow-xs cursor-grab transition-colors select-none min-h-[84px] z-10 ${
                            isSelected 
                              ? 'border-blue-500 ring-4 ring-blue-50 shadow-md' 
                              : 'border-slate-100 hover:border-blue-200'
                          }`}
                        >
                          <div className="bg-slate-50 p-1 rounded-lg flex-shrink-0 w-12 h-12 flex items-center justify-center border border-slate-100 overflow-hidden">
                            <img 
                              src={item.sourceImageUrl} 
                              className="w-full h-full object-contain pointer-events-none rounded-md" 
                              alt={item.name} 
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-xs text-slate-700 truncate">{item.name}</p>
                            <p className="text-[9px] text-slate-400 mt-0.5 font-semibold flex items-center gap-1">
                              ↔ Arraste ou clique o correspondente
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Right Column: Targets (ordered) */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-1">Correspondente</p>
                    {config.items.map((item, idx) => {
                      const isMatched = matchedIds.includes(idx);
                      const isTargetError = errorTargetId === idx;
                      const isHovered = hoveredTargetIndex === idx && !isMatched;
                      const shadowUrl = item.targetImageUrl || item.sourceImageUrl;
                      const hasSelectedColor = selectedDraggable !== null ? 'pulse-target border-blue-300 bg-blue-50/5' : '';

                      return (
                        <div
                          key={item.id}
                          ref={(el) => { targetRefs.current[idx] = el; }}
                          onClick={() => handleSelectTarget(idx)}
                          className={`flex items-center gap-3 p-2.5 rounded-2xl border-2 transition-all duration-200 min-h-[84px] select-none ${
                            isMatched 
                              ? 'border-emerald-200 bg-emerald-50/20' 
                              : isTargetError
                              ? 'border-red-300 bg-red-50/20'
                              : isHovered
                              ? 'border-blue-500 bg-blue-50/40 ring-4 ring-blue-300/40 scale-[1.02] shadow-md shadow-blue-100'
                              : hasSelectedColor || 'border-dashed border-slate-200 bg-slate-50/30'
                          } ${selectedDraggable !== null && !isMatched ? 'cursor-pointer hover:border-blue-400' : ''}`}
                        >
                          {isMatched ? (
                            <>
                              <div className="w-12 h-12 rounded-lg bg-white border border-emerald-100 p-1 flex-shrink-0 shadow-xs overflow-hidden">
                                <img src={item.sourceImageUrl} className="w-full h-full object-contain rounded-md" alt="" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-xs text-emerald-900 truncate">{item.name}</p>
                                <p className="text-[9px] text-emerald-700/80 leading-relaxed font-medium line-clamp-2 mt-0.5">
                                  {item.explanation}
                                </p>
                              </div>
                              <div className="bg-emerald-500 text-white p-0.5 rounded-full flex-shrink-0">
                                <CheckCircle2 size={13} />
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="w-12 h-12 rounded-lg bg-slate-100/80 p-1 flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                                <img 
                                  src={shadowUrl} 
                                  className="w-full h-full object-contain grayscale opacity-25 brightness-110 rounded-md" 
                                  alt="" 
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`font-bold text-[11px] tracking-tight transition-colors ${isHovered ? 'text-blue-600' : 'text-slate-400'}`}>
                                  {isHovered ? 'Solte aqui para verificar!' : 'Solte ou clique verificar'}
                                </p>
                                <p className="text-[9px] text-slate-300 font-bold truncate mt-0.5 uppercase tracking-wide">
                                  {item.name}
                                </p>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>

                </div>

                {/* Congratulations section on completion (only if showSuccessMsg is true) */}
                <AnimatePresence>
                  {isComplete && showSuccessMsg && (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl space-y-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="bg-emerald-500 text-white p-1.5 rounded-full flex-shrink-0 shadow-xs">
                            <CheckCircle2 size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-emerald-900 font-semibold leading-relaxed">
                              {config.globalExplanation ? config.globalExplanation : 'Parabéns! Atividade concluída com sucesso!'}
                            </p>
                          </div>
                        </div>

                        {/* Discreet grey restart button inside green box */}
                        <button
                          onClick={resetWidget}
                          className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1.5 transition-colors cursor-pointer flex-shrink-0 py-1 px-2 rounded-lg hover:bg-emerald-100/60"
                          title="Reiniciar Atividade"
                        >
                          <RefreshCw size={12} /> Reiniciar Atividade
                        </button>
                      </div>

                      {/* Summary recap list */}
                      {showReview && (
                        <div className="space-y-2 pt-1 border-t border-emerald-100/60">
                          <p className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider">Revisão Didática:</p>
                          <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                            {config.items.map((item, idx) => (
                              <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-100 flex items-start gap-2.5 shadow-xs">
                                <img src={item.sourceImageUrl} className="w-6 h-6 object-contain flex-shrink-0 mt-0.5 rounded-md" alt="" />
                                <div className="min-w-0 text-[10px]">
                                  <span className="font-bold text-slate-800">{item.name}</span>: <span className="text-slate-500 font-medium">{item.explanation}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* When showSuccessMsg is false: Reiniciar Atividade below main board */}
                {!showSuccessMsg && (
                  <div className="flex items-center justify-end pt-3 border-t border-slate-100">
                    <button
                      onClick={resetWidget}
                      className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1.5 transition-colors cursor-pointer py-1.5 px-3 rounded-lg hover:bg-slate-100"
                      title="Reiniciar Atividade"
                    >
                      <RefreshCw size={12} /> Reiniciar Atividade
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Fullscreen Preview Modal */}
      <AnimatePresence>
        {isFullscreenPreview && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex flex-col p-4 sm:p-8 overflow-y-auto"
          >
            {/* Fullscreen Header Bar */}
            <div className="max-w-5xl w-full mx-auto flex items-center justify-between pb-4 text-white">
              <div className="flex items-center gap-3">
                <span className="bg-blue-600 text-white p-2 rounded-xl shadow-md">
                  <Maximize2 size={18} />
                </span>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-white">Arrasta e Combina — Preview em Tela Cheia</h3>
                  <p className="text-[11px] text-slate-300 font-medium">Visualização imersiva do quiz como o aluno verá</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={resetWidget}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer"
                >
                  <RefreshCw size={13} /> Reiniciar
                </button>
                <button
                  onClick={() => setIsFullscreenPreview(false)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-slate-900 hover:bg-slate-100 text-xs font-extrabold transition-all cursor-pointer shadow-lg"
                >
                  <X size={15} /> Fechar Tela Cheia
                </button>
              </div>
            </div>

            {/* Quiz Card in Fullscreen */}
            <div className="max-w-5xl w-full mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 my-auto">
              {/* Header */}
              {(showTitle || showSubtitle) && (
                <div className="text-center space-y-2 border-b border-slate-100 pb-4">
                  {showTitle && (
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-tight">
                      {config.title || 'Título da Atividade'}
                    </h2>
                  )}
                  {showSubtitle && (
                    <p className="text-slate-500 text-sm font-medium">
                      {config.subtitle || 'Instruções para realizar o pareamento.'}
                    </p>
                  )}
                </div>
              )}

              {/* Instruction Hint */}
              {showInstruction && (
                <div className="flex items-center justify-start text-xs text-slate-400 font-semibold px-2">
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full text-slate-600">
                    💡 Arraste o item da esquerda para o correspondente na direita (ou use clique).
                  </span>
                </div>
              )}

              {/* Progress Bar Indicator */}
              {showProgressBar && (
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(matchedIds.length / config.items.length) * 100}%` }}
                    className="bg-blue-500 h-full rounded-full transition-all duration-300"
                  />
                </div>
              )}

              {/* Grid: Left = Draggables, Right = Targets */}
              <div className="grid md:grid-cols-2 gap-8 items-start">
                
                {/* Left Side: Draggables */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Itens para Arrastar</h3>
                  <div className="space-y-3">
                    {shuffledIndices.map((idx) => {
                      const item = config.items[idx];
                      const isMatched = matchedIds.includes(idx);
                      const isSelected = selectedDraggable === idx;

                      if (isMatched) {
                        return (
                          <div 
                            key={`fs-placeholder-${item.id}`}
                            className="h-[96px] border border-dashed border-slate-100 rounded-2xl flex items-center justify-center text-emerald-500 text-xs font-semibold bg-emerald-50/5 transition-all duration-300"
                          >
                            ✓ Correto!
                          </div>
                        );
                      }

                      return (
                        <motion.div
                          key={`fs-drag-${item.id}`}
                          drag
                          dragSnapToOrigin
                          dragElastic={0.2}
                          dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
                          onDrag={(_, info) => handleDrag(_, info, true)}
                          onDragEnd={(_, info) => handleDragEnd(idx, info, true)}
                          onClick={() => handleSelectDraggable(idx)}
                          whileHover={{ scale: 1.02 }}
                          whileDrag={{ 
                            scale: 1.08, 
                            rotate: 1.5, 
                            zIndex: 100, 
                            boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.25), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' 
                          }}
                          whileTap={{ scale: 0.98, cursor: 'grabbing' }}
                          className={`flex items-center gap-4 p-3 bg-white border-2 rounded-2xl shadow-xs hover:shadow transition-all duration-200 cursor-grab min-h-[96px] z-10 ${
                            isSelected ? 'border-blue-500 ring-4 ring-blue-50 shadow-md' : 'border-slate-100 hover:border-blue-200'
                          }`}
                        >
                          <div className="bg-slate-50 p-1.5 rounded-xl flex-shrink-0 w-16 h-16 flex items-center justify-center border border-slate-100 overflow-hidden">
                            <img src={item.sourceImageUrl} className="w-full h-full object-contain pointer-events-none rounded-lg" alt="" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-700 text-sm truncate">{item.name}</p>
                            <p className="text-xs text-slate-400 mt-1 font-medium flex items-center gap-1">
                              ↔ Arraste ou clique o correspondente
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side: Targets */}
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Correspondente</h3>
                  <div className="space-y-3">
                    {config.items.map((item, idx) => {
                      const isMatched = matchedIds.includes(idx);
                      const isTargetError = errorTargetId === idx;
                      const isHovered = hoveredTargetIndex === idx && !isMatched;
                      const shadowUrl = item.targetImageUrl || item.sourceImageUrl;
                      const hasSelectedColor = selectedDraggable !== null ? 'pulse-target border-blue-300 bg-blue-50/5' : '';

                      return (
                        <div
                          key={`fs-target-${item.id}`}
                          ref={(el) => { fullscreenTargetRefs.current[idx] = el; }}
                          onClick={() => handleSelectTarget(idx)}
                          className={`flex items-center gap-4 p-3.5 rounded-2xl border-2 transition-all duration-200 min-h-[96px] select-none ${
                            isMatched 
                              ? 'border-emerald-200 bg-emerald-50/20' 
                              : isTargetError
                              ? 'border-red-300 bg-red-50/20'
                              : isHovered
                              ? 'border-blue-500 bg-blue-50/40 ring-4 ring-blue-300/40 scale-[1.02] shadow-lg shadow-blue-100'
                              : hasSelectedColor || 'border-dashed border-slate-200 bg-slate-50'
                          } ${selectedDraggable !== null && !isMatched ? 'cursor-pointer hover:border-blue-400' : ''}`}
                        >
                          {isMatched ? (
                            <>
                              <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-emerald-100 p-1 shadow-xs">
                                <img src={item.sourceImageUrl} className="w-full h-full object-contain rounded-lg" alt="" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-emerald-900 text-sm">{item.name}</p>
                                <p className="text-xs text-emerald-700/80 mt-1 leading-relaxed">{item.explanation}</p>
                              </div>
                              <div className="bg-emerald-500 text-white p-1 rounded-full flex-shrink-0">
                                <CheckCircle2 size={16} />
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="w-16 h-16 rounded-xl bg-slate-100 flex-shrink-0 p-1 flex items-center justify-center relative overflow-hidden">
                                <img 
                                  src={shadowUrl} 
                                  className="w-full h-full object-contain grayscale opacity-25 brightness-110 rounded-lg" 
                                  alt="" 
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`font-bold text-sm tracking-tight transition-colors ${isHovered ? 'text-blue-600' : 'text-slate-400'}`}>
                                  {isHovered ? 'Solte aqui para verificar!' : 'Solte ou clique verificar'}
                                </p>
                                <p className="text-xs text-slate-400 mt-0.5 font-semibold truncate">{item.name}</p>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Completion block in Fullscreen (only if showSuccessMsg is true) */}
              <AnimatePresence>
                {isComplete && showSuccessMsg && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl space-y-4"
                  >
                    <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="bg-emerald-500 text-white p-2 rounded-full shadow-md shadow-emerald-200 flex-shrink-0">
                          <CheckCircle2 size={24} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-emerald-900 font-semibold leading-relaxed">
                            {config.globalExplanation ? config.globalExplanation : 'Parabéns! Atividade concluída com sucesso!'}
                          </p>
                        </div>
                      </div>

                      {/* Discreet grey restart button inside green box */}
                      <button
                        onClick={resetWidget}
                        className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1.5 transition-colors cursor-pointer flex-shrink-0 py-1.5 px-3 rounded-lg hover:bg-emerald-100/60"
                        title="Reiniciar Atividade"
                      >
                        <RefreshCw size={13} /> Reiniciar Atividade
                      </button>
                    </div>

                    {showReview && (
                      <div className="space-y-2 pt-1 border-t border-emerald-100/60">
                        <h5 className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Revisão Didática:</h5>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {config.items.map((item, idx) => (
                            <div key={idx} className="bg-white p-3 rounded-xl border border-slate-100 flex items-start gap-2.5 shadow-xs">
                              <img src={item.sourceImageUrl} className="w-8 h-8 object-contain flex-shrink-0 mt-0.5 rounded-md" alt="" />
                              <div className="min-w-0 text-xs">
                                <strong className="text-slate-800 font-bold">{item.name}</strong>: 
                                <span className="text-slate-600 font-medium block mt-0.5">{item.explanation}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* When showSuccessMsg is false: Reiniciar Atividade below main board in fullscreen */}
              {!showSuccessMsg && (
                <div className="flex items-center justify-end pt-3 border-t border-slate-100">
                  <button
                    onClick={resetWidget}
                    className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1.5 transition-colors cursor-pointer py-1.5 px-3 rounded-lg hover:bg-slate-100"
                    title="Reiniciar Atividade"
                  >
                    <RefreshCw size={13} /> Reiniciar Atividade
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Built-in Project Image Gallery Modal */}
      <AnimatePresence>
        {galleryTarget !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] flex flex-col"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="bg-blue-100 text-blue-700 p-2 rounded-xl">
                    <ImageIcon size={20} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-800">Galeria de Imagens do Projeto</h3>
                    <p className="text-xs text-slate-500">Imagens 100% locais integradas no projeto. Sem dependências externas ou links que expirem.</p>
                  </div>
                </div>
                <button
                  onClick={() => setGalleryTarget(null)}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 overflow-y-auto py-2 flex-1">
                {BUILTIN_IMAGE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      if (galleryTarget.isSource) {
                        const currentItem = config.items[galleryTarget.itemIdx];
                        updateItem(galleryTarget.itemIdx, {
                          sourceImageUrl: preset.svgDataUri,
                          name: currentItem?.name.startsWith('Nova Organela') || currentItem?.name.startsWith('Novo Item') ? preset.name : currentItem?.name,
                          explanation: currentItem?.explanation.startsWith('Insira a explicação') ? preset.defaultExplanation : currentItem?.explanation
                        });
                      } else {
                        updateItem(galleryTarget.itemIdx, { targetImageUrl: preset.svgDataUri });
                      }
                      setGalleryTarget(null);
                    }}
                    className="flex flex-col items-center p-3 rounded-2xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-center group cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-slate-50 group-hover:bg-white rounded-xl flex items-center justify-center p-2 mb-2 border border-slate-100 group-hover:border-blue-200 shadow-2xs">
                      <img src={preset.svgDataUri} alt={preset.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="font-bold text-xs text-slate-800 group-hover:text-blue-600 leading-tight">
                      {preset.name}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                      SVG Integrado
                    </span>
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-3 flex justify-between items-center text-xs text-slate-500">
                <span>Total de 8 ilustrações disponíveis no projeto</span>
                <button
                  type="button"
                  onClick={() => setGalleryTarget(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
