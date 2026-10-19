// Generated from styles/variants/source; do not edit by hand.
export const BUILD_KIND = "release";
export const VARIANTS = {
  "swiss-web-minimalism": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/swiss-web-minimalism.css",
      "nameKey": "appearance.swiss-web-minimalism.alternate.name",
      "descriptionKey": "appearance.swiss-web-minimalism.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Grelha de Carvão",
          "description": "Uma composição suíça escura de carvão, papel frio e vermelho sinalizador. Métricas formam uma coluna editorial ao lado dos recursos, sob linhas precisas e tipografia neo-grotesca."
        },
        "en-US": {
          "name": "Charcoal Grid",
          "description": "A dark Swiss composition of charcoal, cool paper, and signal red. Metrics form an editorial rail beside resources, held together by precise rules and neo-grotesque type."
        },
        "es-ES": {
          "name": "Retícula de Carbón",
          "description": "Una composición suiza oscura de carbón, papel frío y rojo de señal. Las métricas forman una columna editorial junto a los recursos, con filetes precisos y tipografía neogrotesca."
        },
        "fr-FR": {
          "name": "Grille de Charbon",
          "description": "Une composition suisse sombre de charbon, de papier froid et de rouge signal. Les indicateurs forment une colonne éditoriale à côté des ressources, avec des filets précis et une typographie néogrotesque."
        },
        "de-DE": {
          "name": "Kohleraster",
          "description": "Eine dunkle Schweizer Komposition aus Kohle, kühlem Papier und Signalrot. Kennzahlen stehen in einer redaktionellen Spalte neben den Ressourcen, gegliedert durch präzise Linien und Groteskschrift."
        },
        "ru-RU": {
          "name": "Угольная сетка",
          "description": "Тёмная швейцарская композиция из угольных тонов, холодной бумаги и сигнального красного. Метрики собраны в редакционную колонку рядом с ресурсами; композицию держат точные линии и гротескная типографика."
        },
        "ar-SA": {
          "name": "شبكة الفحم",
          "description": "تكوين سويسري داكن يجمع الفحم والورق البارد والأحمر الإشاري. تُرتب المقاييس في عمود تحريري بجوار الموارد، ضمن خطوط دقيقة وحروف غروتسك واضحة."
        },
        "hi-IN": {
          "name": "कोयला ग्रिड",
          "description": "कोयले, ठंडे काग़ज़ और संकेत लाल रंग से बना स्विस शैली का गहरा संयोजन। मापदंड संसाधनों के पास संपादकीय स्तंभ में रखे गए हैं; सटीक रेखाएँ और ग्रोटेस्क टाइप इसे व्यवस्थित रखते हैं।"
        },
        "zh-CN": {
          "name": "炭黑网格",
          "description": "以炭黑、冷调纸色和信号红构成的瑞士风格深色版。指标排成编辑式侧栏，与资源并列；精确细线和无衬线字体维持清晰秩序。"
        },
        "ja-JP": {
          "name": "チャコール・グリッド",
          "description": "チャコール、冷たい紙色、シグナルレッドで構成したスイス様式のダーク案。指標を編集的なサイド列にまとめ、精密な罫線とグロテスク体で資源欄と整えます。"
        },
        "ko-KR": {
          "name": "차콜 그리드",
          "description": "차콜, 차가운 종이색, 시그널 레드로 구성한 스위스 스타일의 어두운 안입니다. 지표를 편집형 사이드 열에 모으고 정밀한 선과 그로테스크 서체로 자료 영역과 정렬합니다."
        }
      },
      "tokens": {
        "--bg": "#17191C",
        "--surface": "#202327",
        "--surface-2": "#292D32",
        "--fg": "#F0EEE9",
        "--muted": "#C0C0BC",
        "--accent": "#F36D62",
        "--accent-fg": "#211817",
        "--border": "#8B8D8C",
        "--ok": "#7BD3A2",
        "--warn": "#FFD27A",
        "--danger": "#FF9991",
        "--focus": "#FFD27A",
        "--shadow": "none",
        "--radius": "0",
        "--border-width": "1px"
      },
      "colors": {
        "--bg": "#17191C",
        "--surface": "#202327",
        "--accent": "#F36D62"
      },
      "designSignals": [
        {
          "selector": "#stage .hero",
          "signal": "Grelha modular explícita de 12 colunas no cabeçalho; a contraparte mantém alinhamento matemático e hierarquia assimétrica, agora expandida na composição da página.",
          "skillReference": "knowledge/skills/domains/design/ui-style-swiss-web-minimalism/SKILL.md#visual-hallmarks-1-the-modular-grid",
          "evidence": "A fonte canônica declara display:grid e repeat(12,1fr) em .hero; a contraparte usa grid nomeado em #view-painel e mantém colunas no hero. A geometria do navegador é testada em quatro larguras."
        },
        {
          "selector": "#stage .display, #stage .lead",
          "signal": "Tipografia neo-grotesca sem mistura de famílias e texto alinhado à esquerda com margem direita irregular; a cor muda, o princípio tipográfico permanece.",
          "skillReference": "knowledge/skills/domains/design/ui-style-swiss-web-minimalism/SKILL.md#typography-lettering-architecture",
          "evidence": "A folha canônica usa Inter para texto/título e mantém os blocos de conteúdo à esquerda. A contraparte explicita a mesma família herdada, text-align:left e largura editorial do lead."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "display / grid-template-columns / grid-template-areas",
          "before": "bloco em fluxo vertical; métricas e recursos ocupam a largura inteira em sequência",
          "after": "grelha editorial: hero em largura inteira; métricas à esquerda e recursos à direita em desktop; sequência de leitura original preservada",
          "breakpoints": {
            "320": {
              "before": "display:block; métricas x17 y1036 286×624; recursos x17 y1716 286×604",
              "after": "display:grid; 1 coluna de 286px; métricas x17 y996 286×265; recursos x17 y1285 286×578"
            },
            "375": {
              "before": "display:block; métricas x17 y951 341×624; recursos x17 y1631 341×604",
              "after": "display:grid; 1 coluna de 341px; métricas x17 y901 341×248; recursos x17 y1174 341×578"
            },
            "768": {
              "before": "display:block; métricas x305 y1038 438×322; recursos x305 y1416 438×473",
              "after": "display:grid; 1 coluna de 438px; métricas x305 y998 438×269; recursos x305 y1291 438×554"
            },
            "1280": {
              "before": "display:block; métricas x305 y841 950×171; recursos x305 y1068 950×404",
              "after": "display:grid; métricas x305 y838 335×414 à esquerda; recursos x668 y838 587×414 à direita; hero/divisão/aviso em largura inteira"
            }
          }
        },
        {
          "selector": ".kpis",
          "property": "grid-template-columns",
          "before": "auto-fit com cards de largura mínima 190px",
          "after": "grade métrica compacta de duas colunas, alinhada à grade editorial",
          "breakpoints": {
            "320": {
              "before": "286px (1 coluna × 4 linhas)",
              "after": "135px 135px (2 colunas × 2 linhas)"
            },
            "375": {
              "before": "341px (1 coluna × 4 linhas)",
              "after": "162.5px 162.5px (2 colunas × 2 linhas)"
            },
            "768": {
              "before": "207px 207px",
              "after": "211px 211px, duas colunas uniformes e gap de 16px"
            },
            "1280": {
              "before": "219.5px × 4 em uma faixa de 950px",
              "after": "159.6px × 2 na coluna lateral de 335px (2 linhas)"
            }
          }
        },
        {
          "selector": ".grid",
          "property": "grid-template-columns",
          "before": "grade auto-fit de recursos; no tablet distribui os módulos em duas colunas",
          "after": "recursos em lista editorial compacta no tablet; em desktop, dois módulos na coluna ampla e gráfico na linha seguinte",
          "breakpoints": {
            "320": {
              "before": "1 coluna de 286px",
              "after": "1 coluna de 286px, gap 16px; cards mantêm largura total"
            },
            "375": {
              "before": "1 coluna de 341px",
              "after": "1 coluna de 341px, gap 16px; cards mantêm largura total"
            },
            "768": {
              "before": "260px 154px",
              "after": "1 coluna de 438px; cards e gráfico mantêm largura total"
            },
            "1280": {
              "before": "463px 463px 0px na área de 950px",
              "after": "285.4px 285.4px na área de 587px; gráfico ocupa ambas"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#t-recursos::before",
          "animation": "swiss-rule-reveal",
          "trigger": "CSS view(block) timeline do título enquanto #t-recursos entra no scrollport #stage; revela a linha de forma linear entre entry 0% e entry 80%. Não dispara ao alternar modo nem por relógio independente.",
          "duration": "1s linear, progresso governado somente por rolagem",
          "fallback": "Sem suporte a view timelines, a linha fica visível em largura completa e estática; título, leitura e foco mantêm o fluxo normal.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; linha final permanece estática.",
          "pauseResume": "A progressão acompanha apenas a view timeline do scrollport #stage e não o relógio; o tratamento explícito de document.visibilityState (pausa em hidden e retomada em visible) aguarda a integração runtime F3.",
          "cleanup": "O CSS não cria listeners, observers ou timers; a remoção do estilo ao sair de alternate e a limpeza de referências no ciclo de vida da interface aguardam integração runtime F3."
        },
        "background": {
          "selector": "#stage::before",
          "animation": "swiss-grid-reveal",
          "trigger": "CSS scroll(nearest block) timeline do scrollport ancestral #stage; ao rolar do topo ao fim, a malha de 64px do pseudo-elemento revela-se linearmente por transform:scaleX(0→1). Não há deslocamento relativo/parallax nem loop.",
          "duration": "1s linear, progresso mapeado a 0–100% do scroll de #stage",
          "fallback": "A malha modular do pseudo-elemento fica completamente visível e estática quando scroll timelines não são suportadas; não há cobertura nem animação de background-size.",
          "reducedMotion": "Por prefers-reduced-motion: reduce, remove a timeline e define transform:scaleX(1); a malha completa permanece estática.",
          "pauseResume": "A progressão acompanha apenas a scroll timeline de #stage e não o relógio; o tratamento explícito de document.visibilityState (pausa em hidden e retomada em visible) aguarda a integração runtime F3.",
          "cleanup": "O CSS não cria canvas, listeners, observers ou timers; a remoção do estilo ao sair de alternate e a limpeza de referências no ciclo de vida da interface aguardam integração runtime F3."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#t-recursos::before",
      "backgroundTarget": "#stage::before",
      "contentDigest": "f4c81eec82523dbdc44a0028c79375d4ec749bab5a1727f8f863cd4075e6c3f8",
      "generatedDigest": "17a124412274b50e6f1892eca15182a3b005c8280ef9d4b16d0675424081bdcb",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "nordic": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/nordic.css",
      "nameKey": "appearance.nordic.alternate.name",
      "descriptionKey": "appearance.nordic.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Noite do Fiorde",
          "description": "Uma noite de fiorde em Polar Night e ardósia fosca, com Frost moderado, filete de madeira e métricas claras em um painel editorial."
        },
        "en-US": {
          "name": "Fjord Night",
          "description": "A fjord night in Polar Night and matte slate, with restrained Frost blue, a warm wood rule, and clear metrics in an editorial dashboard."
        },
        "es-ES": {
          "name": "Noche del fiordo",
          "description": "Una noche de fiordo en Polar Night y pizarra mate, con azul Frost moderado, un filete de madera cálida y métricas claras en un panel editorial."
        },
        "fr-FR": {
          "name": "Nuit du fjord",
          "description": "Une nuit de fjord en Polar Night et ardoise mate, avec un bleu Frost mesuré, un filet de bois chaleureux et des métriques claires en composition éditoriale."
        },
        "de-DE": {
          "name": "Fjordnacht",
          "description": "Eine Fjordnacht in Polar Night und mattem Schiefer, mit zurückhaltendem Frostblau, einer warmen Holzlinie und klaren Kennzahlen im Editorial-Layout."
        },
        "ru-RU": {
          "name": "Фьордная ночь",
          "description": "Ночная палитра фьорда: Polar Night и матовый сланец, сдержанный ледяной Frost, тёплая деревянная линия и ясные метрики в редакционной композиции."
        },
        "ar-SA": {
          "name": "ليلة المضيق البحري",
          "description": "لوحة ليلية للمضيق تجمع بين Polar Night والأردواز المطفي وأزرق Frost الهادئ وخط خشبي دافئ ومقاييس واضحة ضمن تخطيط تحريري."
        },
        "hi-IN": {
          "name": "फ़्योर्ड की रात",
          "description": "Polar Night और मैट स्लेट में फ़्योर्ड की रात, संयत Frost नीले, लकड़ी की गर्म रेखा और संपादकीय लेआउट में स्पष्ट मेट्रिक्स के साथ।"
        },
        "zh-CN": {
          "name": "峡湾之夜",
          "description": "以 Polar Night 与哑光石板灰构成峡湾夜色，搭配克制的 Frost 蓝、温暖木质细线和清晰的编辑式数据布局。"
        },
        "ja-JP": {
          "name": "フィヨルドの夜",
          "description": "Polar Night とマットなスレートで描くフィヨルドの夜。控えめな Frost ブルー、木の温もりを添える細線、読みやすい編集的な指標配置。"
        },
        "ko-KR": {
          "name": "피오르의 밤",
          "description": "Polar Night와 무광 슬레이트로 표현한 피오르의 밤에 절제된 Frost 블루, 따뜻한 나무 선, 읽기 쉬운 편집형 지표 배치를 더했습니다."
        }
      },
      "tokens": {
        "--bg": "#17212A",
        "--surface": "#202D36",
        "--surface-2": "#2A3941",
        "--fg": "#EEF2F2",
        "--muted": "#BAC6CA",
        "--accent": "#95B8C2",
        "--accent-fg": "#17212A",
        "--border": "#73858C",
        "--ok": "#8AB99B",
        "--warn": "#E5BE70",
        "--danger": "#F09198",
        "--focus": "#B7D4DC",
        "--shadow": "0 8px 24px rgba(5, 11, 15, .24)",
        "--radius": "8px",
        "--border-width": "1px",
        "--nordic-frost": "#95B8C2",
        "--wood": "#756149",
        "--amber": "#C99346"
      },
      "colors": {
        "--bg": "#17212A",
        "--surface": "#202D36",
        "--accent": "#95B8C2"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"nordic\"][data-variant=\"alternate\"] .hero",
          "signal": "Painel editorial em Polar Night com superfícies foscas, filete superior âmbar e hierarquia Space Grotesk; em telas amplas, o hero divide o primeiro plano com a coluna de métricas.",
          "skillReference": "knowledge/skills/domains/design/ui-style-nordic/SKILL.md (referência também registrada na ficha local F2 Nordic)",
          "evidence": "A ficha local descreve Polar Night, superfícies foscas, tipografia Space Grotesk e calor Hygge restrito. O seletor da contraparte aplica esses sinais somente ao hero alternativo; styles/nordic.css permanece sem alterações nesta tarefa."
        },
        {
          "selector": "#stage[data-style=\"nordic\"][data-variant=\"alternate\"] .kpi",
          "signal": "Valores KPI em Space Grotesk mantêm tamanho e peso como foco funcional; filete Frost frio separa os cartões sem glow, enquanto a grade editorial redistribui métricas ao lado do hero no desktop.",
          "skillReference": "knowledge/skills/domains/design/ui-style-nordic/SKILL.md (referência também registrada na ficha local F2 Nordic)",
          "evidence": "A definição canônica local usa Space Grotesk e métricas de hierarquia clara. Os KPIs permanecem como números destacados, com o marcador de cor redundante já fornecido pelos badges e seus rótulos."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / grid-row / distribuição editorial",
          "before": "Fluxo canônico em uma coluna: hero, métricas, recursos e formulários em sequência.",
          "after": "A partir de 1200px de viewport, hero editorial ocupa a coluna esquerda e métricas ocupam um trilho à direita; recursos e formulário atravessam a largura abaixo. Em telas menores, a ordem DOM original vira uma única coluna.",
          "breakpoints": {
            "320": {
              "before": "fluxo vertical; app útil 288px",
              "after": "uma coluna; hero, KPIs e recursos preservam ordem e largura útil de 288px"
            },
            "375": {
              "before": "fluxo vertical; app útil 343px",
              "after": "uma coluna; hero, KPIs e recursos preservam ordem e largura útil de 343px"
            },
            "768": {
              "before": "fluxo vertical; stage útil ~438px",
              "after": "uma coluna; grade editorial não divide o conteúdo no stage estreito"
            },
            "1280": {
              "before": "hero, métricas e recursos em linhas integrais",
              "after": "hero à esquerda e métricas à direita em duas colunas desiguais; recursos/formulário seguem em largura integral"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "display / background / border-top / padding",
          "before": "Hero canônico sobre superfície branca, sem painel Polar Night ou filete Hygge.",
          "after": "Painel Polar Night fosco, com linha superior estreita de madeira e padding editorial; mantém a ordem eyebrow, título, lead e ações.",
          "breakpoints": {
            "320": {
              "before": "hero branco de 288px, fluxo original",
              "after": "painel escuro de 288px; padding 24px 18px e ações quebram sem clipping"
            },
            "375": {
              "before": "hero branco de 343px, fluxo original",
              "after": "painel escuro de 343px; padding 24px 18px e hierarquia em uma coluna"
            },
            "768": {
              "before": "hero branco de largura útil ~438px",
              "after": "painel escuro de largura integral; composição ainda empilhada"
            },
            "1280": {
              "before": "hero branco em linha independente",
              "after": "painel escuro na coluna editorial esquerda, alinhado à altura do trilho métrico"
            }
          }
        },
        {
          "selector": "#view-painel > section[aria-labelledby=\"t-metricas\"] .kpis",
          "property": "grid-template-columns / compactação das métricas",
          "before": "KPIs usam auto-fit; no trilho desktop a largura disponível pode formar uma coluna estreita.",
          "after": "Duas colunas iguais apenas no trilho métrico desktop; abaixo do breakpoint, a distribuição canônica continua conforme a largura disponível.",
          "breakpoints": {
            "320": {
              "before": "KPIs em uma coluna de 288px",
              "after": "sem trilho lateral; KPIs preservam a distribuição de largura total"
            },
            "375": {
              "before": "KPIs em uma coluna de 343px",
              "after": "sem trilho lateral; KPIs preservam a distribuição de largura total"
            },
            "768": {
              "before": "grade de KPIs dentro do fluxo de largura total",
              "after": "sem trilho lateral; KPIs preservam a distribuição de largura total"
            },
            "1280": {
              "before": "quatro KPIs em uma faixa horizontal",
              "after": "duas colunas no trilho lateral, em duas linhas, com numerais destacados"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "nordic-kpi-arrive",
          "trigger": "Quando cada cartão KPI cruza o limiar de visibilidade na viewport (#stage), conforme IntersectionObserver do runtime.",
          "duration": "500ms ease-out; deslocamento vertical de 8px e opacidade discreta, sem esconder o conteúdo antes ou depois da entrada.",
          "fallback": "Sem IntersectionObserver, o runtime calcula visibilidade por geometria e dispara a mesma entrada; sem JavaScript, todos os KPIs permanecem estáticos e visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce remove a animação, transforma e opacidade transitórias; valores e badges permanecem visíveis.",
          "pauseResume": "O runtime só define data-motion-visible com o KPI visível, movimento não reduzido e document.visibilityState igual a visible; ao ocultar a página, suspende novas entradas.",
          "cleanup": "Ao trocar estilo ou aparência, setupVariantMotion remove data-motion-visible, desconecta o observer e deixa os cartões em estado final estático."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "nordic-fjord-aurora",
          "trigger": "Progresso ambiental de baixa amplitude durante a rolagem enquanto #stage intersecta a viewport; o runtime governa data-motion-active por visibilidade e estado da página.",
          "duration": "30s ease-in-out alternate, com movimento de até 1% e variação sutil de opacidade; camada decorativa não cobre o conteúdo.",
          "fallback": "Sem suporte a pseudo-elemento ou animação CSS, o gradiente Frost/fiorde permanece estático; o conteúdo não depende do efeito.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a aurora e mantém a composição estática, sem transform residual.",
          "pauseResume": "A regra data-motion-active só anima com #stage visível, document.visibilityState visible e movimento não reduzido; pausa enquanto a página está oculta e retoma ao voltar.",
          "cleanup": "Ao remover a folha alternate, a camada ::after e sua animação desaparecem; stopVariantMotion remove os listeners e marcadores do runtime."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "f461843355a1f5375975d18417968b72510de4c38f4dedfba5b1ccf398aaf7a1",
      "generatedDigest": "0fcac53411fccc7bcbab867879f3da6328f9db687e8fe131deee53895b6df14a",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "flat-design": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/flat-design.css",
      "nameKey": "appearance.flat-design.alternate.name",
      "descriptionKey": "appearance.flat-design.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Plano noturno",
          "description": "Contraparte escura experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Night flat",
          "description": "An experimental dark counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Plano nocturno",
          "description": "Una contraparte oscura experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Flat nocturne",
          "description": "Une variante sombre expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Nächtliches Flat",
          "description": "Eine experimentelle dunkle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Ночной плоский стиль",
          "description": "Экспериментальная тёмная версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "التصميم المسطح الليلي",
          "description": "نسخة داكنة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "रात्रि फ्लैट शैली",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक गहरा रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "夜间扁平风格",
          "description": "这是一款实验性深色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "夜のフラットデザイン",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なダーク版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "야간 플랫 디자인",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 다크 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#18212b",
        "--surface": "#222e3a",
        "--surface-2": "#2b3947",
        "--fg": "#f5f7fa",
        "--muted": "#c5ced8",
        "--accent": "#f08a4b",
        "--accent-fg": "#24150c",
        "--border": "#74879a",
        "--focus": "#f08a4b",
        "--ok": "#8ed7a6",
        "--warn": "#ffd06f",
        "--danger": "#ff9993",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#18212b",
        "--surface": "#222e3a",
        "--accent": "#f08a4b"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"flat-design\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Cartografia cromática plana: painéis chapados, sem sombra, com quatro faixas de dados em cores funcionais distintas. hero split with a vertical metric rail; cards remain flat rectangular color fields.",
          "skillReference": "CSS canônico local styles/flat-design.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de flat-design."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/flat-design.css.",
          "after": "hero split with a vertical metric rail; cards remain flat rectangular color fields.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "hero split with a vertical metric rail; cards remain flat rectangular color fields. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Cartografia cromática plana: painéis chapados, sem sombra, com quatro faixas de dados em cores funcionais distintas. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "flat-design-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "flat-design-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "08315b6951015ee9122078370c0573ba02f05a51146a9f48ecb74c8b03469c66",
      "generatedDigest": "e36d6112b919fd9d9f9b54ca791a572278782b57d9dcf5c9324dee0920bd38de",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "calm-quiet-ui": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/calm-quiet-ui.css",
      "nameKey": "appearance.calm-quiet-ui.alternate.name",
      "descriptionKey": "appearance.calm-quiet-ui.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Bosque sereno",
          "description": "Contraparte escura experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Quiet woodland",
          "description": "An experimental dark counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Bosque sereno",
          "description": "Una contraparte oscura experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Forêt paisible",
          "description": "Une variante sombre expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Ruhiger Wald",
          "description": "Eine experimentelle dunkle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Спокойный лес",
          "description": "Экспериментальная тёмная версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "غابة هادئة",
          "description": "نسخة داكنة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "शांत वन",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक गहरा रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "静谧林地",
          "description": "这是一款实验性深色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "静かな森",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なダーク版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "고요한 숲",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 다크 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#24332d",
        "--surface": "#2c3d35",
        "--surface-2": "#35483f",
        "--fg": "#f2f3ec",
        "--muted": "#c6d0c4",
        "--accent": "#d9b978",
        "--accent-fg": "#292012",
        "--border": "#859589",
        "--focus": "#d9b978",
        "--ok": "#8ed7a6",
        "--warn": "#ffd06f",
        "--danger": "#ff9993",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#24332d",
        "--surface": "#2c3d35",
        "--accent": "#d9b978"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"calm-quiet-ui\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Refúgio de bosque ao entardecer: verde pinho profundo, papel-linho claro para leitura local e dourado vegetal usado como acento calmo. narrow reading column centered at desktop; generous but bounded section rhythm, compact metric row.",
          "skillReference": "CSS canônico local styles/calm-quiet-ui.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de calm-quiet-ui."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/calm-quiet-ui.css.",
          "after": "narrow reading column centered at desktop; generous but bounded section rhythm, compact metric row.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "narrow reading column centered at desktop; generous but bounded section rhythm, compact metric row. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Refúgio de bosque ao entardecer: verde pinho profundo, papel-linho claro para leitura local e dourado vegetal usado como acento calmo. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "calm-quiet-ui-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "calm-quiet-ui-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "004d9990afb9037bdb4f75e06c31882479da02d724b3db376bbcae5b202f14e7",
      "generatedDigest": "06cc458eb31b9c03a13ca8efffbff8fd28023c7042d76eb08ae1379da179122d",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "linear-saas": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/linear-saas.css",
      "nameKey": "appearance.linear-saas.alternate.name",
      "descriptionKey": "appearance.linear-saas.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Console claro",
          "description": "Contraparte clara experimental, com identidade própria, contraste de leitura e composição de console de produto; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Light console",
          "description": "An experimental light counterpart with readable contrast and a product-console composition; ready for human review."
        },
        "es-ES": {
          "name": "Consola nocturna",
          "description": "Una contraparte oscura experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Console nocturne",
          "description": "Une variante sombre expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Nachtkonsole",
          "description": "Eine experimentelle dunkle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Ночная консоль",
          "description": "Экспериментальная тёмная версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "وحدة تحكم ليلية",
          "description": "نسخة داكنة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "रात्रि कंसोल",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक गहरा रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "夜间控制台",
          "description": "这是一款实验性深色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "ナイトコンソール",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なダーク版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "야간 콘솔",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 다크 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#F7F8FA",
        "--surface": "#FFFFFF",
        "--surface-2": "#EEF0F4",
        "--fg": "#1F2329",
        "--muted": "#5B6472",
        "--accent": "#6554C0",
        "--accent-fg": "#FFFFFF",
        "--border": "#7B89A1",
        "--focus": "#6554C0",
        "--ok": "#216E4E",
        "--warn": "#7A4F01",
        "--danger": "#AE2E24",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(26,32,44,.10)"
      },
      "colors": {
        "--bg": "#F7F8FA",
        "--surface": "#FFFFFF",
        "--accent": "#6554C0"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"linear-saas\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Console claro de produto: superfícies limpas e hierarquia compacta, violeta pervinca para estados ativos e trilha lateral de métricas; hero and KPI rail form a 5/7 dashboard split; resources use aligned two-column rows.",
          "skillReference": "CSS canônico local styles/linear-saas.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra a direção clara no layout e nos tokens alternate, com CSS limitado ao stage de linear-saas."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/linear-saas.css.",
          "after": "hero and KPI rail form a 5/7 dashboard split; resources use aligned two-column rows.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "hero and KPI rail form a 5/7 dashboard split; resources use aligned two-column rows. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Console noturno de produto: superfícies em camadas discretas, roxo pervinca para estado ativo e trilha lateral de métricas. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "linear-saas-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "linear-saas-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "0332dd04b2fe362d0a9cfaf5ac7bdd1b5b898532fef5ff93c45b31f24996f887",
      "generatedDigest": "b744b7954988e15b6e4f92391b7ed5758fc556b1ff279119db9bd32b9c032cf5",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "metro-modern-ui": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/metro-modern-ui.css",
      "nameKey": "appearance.metro-modern-ui.alternate.name",
      "descriptionKey": "appearance.metro-modern-ui.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Metro claro",
          "description": "Contraparte clara experimental com planos geométricos, hierarquia de leitura e azul de ação; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Light Metro",
          "description": "An experimental light counterpart with geometric planes, readable hierarchy, and blue actions; ready for human review."
        },
        "es-ES": {
          "name": "Estación nocturna",
          "description": "Una contraparte oscura experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Station nocturne",
          "description": "Une variante sombre expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Nachtstation",
          "description": "Eine experimentelle dunkle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Ночная станция",
          "description": "Экспериментальная тёмная версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "محطة ليلية",
          "description": "نسخة داكنة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "रात्रि स्टेशन",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक गहरा रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "夜间车站",
          "description": "这是一款实验性深色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "夜の駅",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なダーク版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "야간 역",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 다크 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#F3F5F7",
        "--surface": "#FFFFFF",
        "--surface-2": "#E3EAF1",
        "--fg": "#252C34",
        "--muted": "#4B5864",
        "--accent": "#0063B1",
        "--accent-fg": "#FFFFFF",
        "--border": "#6587A5",
        "--focus": "#005A9E",
        "--ok": "#216E4E",
        "--warn": "#7A4F01",
        "--danger": "#AE2E24",
        "--radius": "12px",
        "--shadow": "none"
      },
      "colors": {
        "--bg": "#F3F5F7",
        "--surface": "#FFFFFF",
        "--accent": "#0063B1"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"metro-modern-ui\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Metro claro: planos geométricos, blocos de cor funcionais, tipografia Open Sans leve e azul de ação; o painel usa hero amplo e uma grade de módulos com alinhamento rígido.",
          "skillReference": "CSS canônico local styles/metro-modern-ui.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra a direção clara no layout e nos tokens alternate, com CSS limitado ao stage de metro-modern-ui."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/metro-modern-ui.css.",
          "after": "dashboard uses numbered color blocks in a 2x2 metric mosaic and a strong left-aligned title rail.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "dashboard uses numbered color blocks in a 2x2 metric mosaic and a strong left-aligned title rail. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Estação metropolitana noturna: blocos retangulares de sinalização, amarelo de linha e ciano de mapa como códigos funcionais separados. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "metro-modern-ui-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "metro-modern-ui-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "b0e766aebaef31ce19a4d0cfb0d8bcb246416bfa6e9d4e7e6ef16b3fae57a98e",
      "generatedDigest": "4a611e92e2c166028e500424d6d017a4ff96e8fc7ee5f5134f5413333d78d575",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "material-you": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/material-you.css",
      "nameKey": "appearance.material-you.alternate.name",
      "descriptionKey": "appearance.material-you.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Ameixa tonal",
          "description": "Contraparte escura experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Tonal plum",
          "description": "An experimental dark counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Ciruela tonal",
          "description": "Una contraparte oscura experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Prune tonale",
          "description": "Une variante sombre expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Tonalpflaume",
          "description": "Eine experimentelle dunkle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Тональная слива",
          "description": "Экспериментальная тёмная версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "برقوق لوني",
          "description": "نسخة داكنة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "टोनल आलूबुखारा",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक गहरा रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "色调李子",
          "description": "这是一款实验性深色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "トーナルプラム",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なダーク版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "토널 플럼",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 다크 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#211d2b",
        "--surface": "#2c2638",
        "--surface-2": "#393247",
        "--fg": "#f5effb",
        "--muted": "#d0c5dd",
        "--accent": "#d6b5ff",
        "--accent-fg": "#281a38",
        "--border": "#867C93",
        "--focus": "#d6b5ff",
        "--ok": "#8ed7a6",
        "--warn": "#ffd06f",
        "--danger": "#ff9993",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#211d2b",
        "--surface": "#2c2638",
        "--accent": "#d6b5ff"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"material-you\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Material tonal em ameixa noturna: superfícies elevadas por famílias tonais, lavanda como cor de ação e contornos suaves. hero is a broad tonal surface; metric cards form a balanced 2x2 grid with consistent gutters.",
          "skillReference": "CSS canônico local styles/material-you.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de material-you."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/material-you.css.",
          "after": "hero is a broad tonal surface; metric cards form a balanced 2x2 grid with consistent gutters.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "hero is a broad tonal surface; metric cards form a balanced 2x2 grid with consistent gutters. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Material tonal em ameixa noturna: superfícies elevadas por famílias tonais, lavanda como cor de ação e contornos suaves. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "material-you-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "material-you-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "43a062f95e2210ad1f131b42cb8ccb01b05a68ad9ac8b4b6b37834a791b4ccab",
      "generatedDigest": "1528b636ce6f2c9b8f563f06c733eb149382cc58aec60f1c451cf9e623d8e1b3",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "card-based-ui": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/card-based-ui.css",
      "nameKey": "appearance.card-based-ui.alternate.name",
      "descriptionKey": "appearance.card-based-ui.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Arquivo de cartões",
          "description": "Contraparte escura experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Card archive",
          "description": "An experimental dark counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Archivo de tarjetas",
          "description": "Una contraparte oscura experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Archive de cartes",
          "description": "Une variante sombre expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Kartenarchiv",
          "description": "Eine experimentelle dunkle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Архив карточек",
          "description": "Экспериментальная тёмная версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "أرشيف البطاقات",
          "description": "نسخة داكنة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "कार्ड संग्रह",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक गहरा रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "卡片档案",
          "description": "这是一款实验性深色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "カードアーカイブ",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なダーク版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "카드 아카이브",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 다크 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#17232d",
        "--surface": "#202f3a",
        "--surface-2": "#2b3d49",
        "--fg": "#f2f6f8",
        "--muted": "#bdcbd2",
        "--accent": "#f28a62",
        "--accent-fg": "#30150d",
        "--border": "#748A95",
        "--focus": "#f28a62",
        "--ok": "#8ed7a6",
        "--warn": "#ffd06f",
        "--danger": "#ff9993",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#17232d",
        "--surface": "#202f3a",
        "--accent": "#f28a62"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"card-based-ui\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Arquivo de cartões em azul-petróleo: placas independentes com cabeçalhos curtos e coral editorial para ações, sem efeito de vidro. all dashboard modules become distinct cards; desktop pairs resource and activity cards in equal columns.",
          "skillReference": "CSS canônico local styles/card-based-ui.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de card-based-ui."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/card-based-ui.css.",
          "after": "all dashboard modules become distinct cards; desktop pairs resource and activity cards in equal columns.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "all dashboard modules become distinct cards; desktop pairs resource and activity cards in equal columns. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Arquivo de cartões em azul-petróleo: placas independentes com cabeçalhos curtos e coral editorial para ações, sem efeito de vidro. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "card-based-ui-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "card-based-ui-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "d0d8302e9006494b50e9a2c47a333072fbb663f8a4556806e52784097593b2f3",
      "generatedDigest": "db9956aa753902d751a9a69a430c325354b7e238f4c26a5ced095fbaf363a1f4",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "bento-grid": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/bento-grid.css",
      "nameKey": "appearance.bento-grid.alternate.name",
      "descriptionKey": "appearance.bento-grid.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Bento noturno",
          "description": "Contraparte escura experimental com módulos bento, acentos vivos e contraste de leitura; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Night Bento",
          "description": "An experimental dark counterpart with bento modules, vivid accents, and readable contrast; ready for human review."
        },
        "es-ES": {
          "name": "Bento solar",
          "description": "Una contraparte clara experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Bento solaire",
          "description": "Une variante claire expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Solar-Bento",
          "description": "Eine experimentelle helle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Солнечное бенто",
          "description": "Экспериментальная светлая версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "بينتو شمسي",
          "description": "نسخة فاتحة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "सौर बेंटो",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक हल्का रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "日光便当网格",
          "description": "这是一款实验性浅色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "ソーラーベントー",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なライト版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "솔라 벤토",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 라이트 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#17171D",
        "--surface": "#22222B",
        "--surface-2": "#2D2D38",
        "--fg": "#F7F4EE",
        "--muted": "#C2BEC9",
        "--accent": "#FF795E",
        "--accent-fg": "#23110B",
        "--border": "#7D7689",
        "--focus": "#FF987F",
        "--ok": "#8ED7A6",
        "--warn": "#FFD06F",
        "--danger": "#FF9993",
        "--radius": "12px",
        "--shadow": "0 10px 26px rgba(0,0,0,.26)"
      },
      "colors": {
        "--bg": "#17171D",
        "--surface": "#22222B",
        "--accent": "#FF795E"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"bento-grid\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Bento noturno: módulos assimétricos em carvão, peças de destaque terracota e blocos menores em violeta e verde.",
          "skillReference": "CSS canônico local styles/bento-grid.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra a direção escura no layout e nos tokens alternate, com CSS limitado ao stage de bento-grid."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/bento-grid.css.",
          "after": "featured KPI spans two columns; chart and activity occupy complementary cells, collapsing to one column on mobile.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "featured KPI spans two columns; chart and activity occupy complementary cells, collapsing to one column on mobile. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Bento de papel solar: módulos assimétricos em marfim e terracota, com uma peça ampla de métricas e blocos menores bem ancorados. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "bento-grid-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "bento-grid-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "b40e83c6d2733005d197019268abe892c5d6fc3dcb419fbf493296a66e30f76c",
      "generatedDigest": "183d98e9ed0d62ef06dfa5910de8c7c6c75c237c4cc699ee8c042942ffceee11",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "dark-mode-first": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/dark-mode-first.css",
      "nameKey": "appearance.dark-mode-first.alternate.name",
      "descriptionKey": "appearance.dark-mode-first.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Papel frio",
          "description": "Contraparte clara experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Cool paper",
          "description": "An experimental light counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Papel frío",
          "description": "Una contraparte clara experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Papier froid",
          "description": "Une variante claire expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Kühles Papier",
          "description": "Eine experimentelle helle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Холодная бумага",
          "description": "Экспериментальная светлая версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "ورق بارد",
          "description": "نسخة فاتحة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "ठंडा कागज़",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक हल्का रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "冷调纸面",
          "description": "这是一款实验性浅色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "クールペーパー",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なライト版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "쿨 페이퍼",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 라이트 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#f3f5fa",
        "--surface": "#ffffff",
        "--surface-2": "#e7ecf5",
        "--fg": "#151b27",
        "--muted": "#485367",
        "--accent": "#375bd2",
        "--accent-fg": "#ffffff",
        "--border": "#7386A7",
        "--focus": "#375bd2",
        "--ok": "#185832",
        "--warn": "#684300",
        "--danger": "#8f2029",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#f3f5fa",
        "--surface": "#ffffff",
        "--accent": "#375bd2"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"dark-mode-first\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Modo claro de referência: papel frio, contraste de tinta marinho, controles com contorno explícito e azul de foco preservado. compact app shell with full-width hero and four equal KPIs; avoid decorative surfaces.",
          "skillReference": "CSS canônico local styles/dark-mode-first.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de dark-mode-first."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/dark-mode-first.css.",
          "after": "compact app shell with full-width hero and four equal KPIs; avoid decorative surfaces.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "compact app shell with full-width hero and four equal KPIs; avoid decorative surfaces. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Modo claro de referência: papel frio, contraste de tinta marinho, controles com contorno explícito e azul de foco preservado. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "dark-mode-first-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "dark-mode-first-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "bd3a5c8cec7ebde0c741039c7c64888d27135c7e88c7b0375aa6f38f6a9c99b3",
      "generatedDigest": "aadd22e5f9ec9f2ccdcf458e2bfcbcc2ed0162c0778b794287348a1319a5c11b",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "split-screen-dualism": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/split-screen-dualism.css",
      "nameKey": "appearance.split-screen-dualism.alternate.name",
      "descriptionKey": "appearance.split-screen-dualism.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraponto Claro",
          "description": "Dois campos claros em marfim e azul-gelo, divididos por um meridiano nítido."
        },
        "en-US": {
          "name": "Light Counterpoint",
          "description": "Two light fields in ivory and ice blue, divided by a sharp meridian."
        },
        "es-ES": {
          "name": "Contrapunto claro",
          "description": "Dos campos claros en marfil y azul hielo, separados por un meridiano nítido."
        },
        "fr-FR": {
          "name": "Contrepoint clair",
          "description": "Deux champs clairs, ivoire et bleu glacier, séparés par un méridien net."
        },
        "de-DE": {
          "name": "Heller Kontrapunkt",
          "description": "Zwei helle Flächen in Elfenbein und Eisblau, getrennt durch einen klaren Meridian."
        },
        "ru-RU": {
          "name": "Светлый контрапункт",
          "description": "Два светлых поля цвета слоновой кости и ледяного синего, разделённые чётким меридианом."
        },
        "ar-SA": {
          "name": "تباين مضيء",
          "description": "مساحتان مضيئتان بالعاجي والأزرق الجليدي، يفصل بينهما خط وسطي واضح."
        },
        "hi-IN": {
          "name": "हल्का प्रतिपक्ष",
          "description": "हाथीदांत और बर्फ़ीले नीले रंग के दो हल्के क्षेत्र, जिन्हें एक स्पष्ट मध्यरेखा बाँटती है।"
        },
        "zh-CN": {
          "name": "明亮对照",
          "description": "象牙白与冰蓝色的两片明亮区域，由清晰的中轴线分隔。"
        },
        "ja-JP": {
          "name": "ライト・コントラスト",
          "description": "アイボリーとアイスブルーの明るい二つの領域を、明確な中央線で分けます。"
        },
        "ko-KR": {
          "name": "밝은 대위법",
          "description": "아이보리와 아이스 블루의 두 밝은 영역을 선명한 중앙 경계로 나눕니다."
        }
      },
      "tokens": {
        "--bg": "#F4F0E6",
        "--surface": "#FFFDF7",
        "--surface-2": "#E5EDF4",
        "--fg": "#202634",
        "--muted": "#555C68",
        "--accent": "#0D5686",
        "--accent-fg": "#FFFFFF",
        "--border": "#788797",
        "--ok": "#17633B",
        "--warn": "#785000",
        "--danger": "#A12735",
        "--focus": "#074C80",
        "--shadow": "0 8px 22px rgba(32, 38, 52, .14)",
        "--split-left-bg": "#F4F0E6",
        "--split-right-bg": "#E7F0F6",
        "--split-left-surface": "#FFFDF7",
        "--split-right-surface": "#F5FAFD",
        "--split-left-accent": "#8E3427",
        "--split-right-accent": "#0D5686",
        "--split-meridian": "#788796"
      },
      "colors": {
        "--bg": "#F4F0E6",
        "--surface": "#FFFDF7",
        "--accent": "#0D5686"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"split-screen-dualism\"]",
          "signal": "vertical meridian",
          "skillReference": "ui-style-split-screen-dualism/SKILL.md — Visual Characteristics 1: 50/50 vertical meridian or sharp color collision.",
          "evidence": "A folha alternate constrói duas metades explícitas com limite central de 1px nos viewports largos. Até 540px, remove a linha central da coluna de leitura e mantém os dois polos por trilhos de acento nas bordas externas dos grupos. Capturas, retângulos medidos e prova dos polos estão em docs/temp/reports/2026-10-18-split-screen-dualism-render-audit.json."
        },
        {
          "selector": "#view-painel > .hero; #view-painel > section[aria-labelledby=\"t-recursos\"]",
          "signal": "complementary hemispheres",
          "skillReference": "ui-style-split-screen-dualism/SKILL.md — Visual Characteristics 2 and Canonical Component Specifications: hemispheres with opposing treatments and a shared rhythm.",
          "evidence": "A contraparte mantém o grupo narrativo em painel do lado esquerdo e conteúdo secundário no campo direito no desktop; nos viewports estreitos conserva os polos nas bordas dos grupos e uma ordem DOM de leitura contínua. As oito capturas e a geometria por viewport estão em docs/temp/reports/2026-10-18-split-screen-dualism-render-audit.json."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns dos cartões de métricas",
          "before": "Em 320/375: uma coluna (286/341px). Em 768: duas colunas (207px). Em 1280: quatro colunas (~220px).",
          "after": "Grade deliberada 2×2 em todos os tamanhos. Capturado em Chromium 155 headless; conferir o valor no objeto breakpoints.",
          "breakpoints": {
            "320": {
              "before": "1 coluna de 288px",
              "after": "2 colunas de 138px; scrollWidth=clientWidth",
              "measurement": "captured: Chromium 155 headless; no document horizontal overflow"
            },
            "375": {
              "before": "1 coluna de 343px",
              "after": "2 colunas de 165.5px; scrollWidth=clientWidth",
              "measurement": "captured: Chromium 155 headless; no document horizontal overflow"
            },
            "768": {
              "before": "2 colunas de 218px; stage=488px",
              "after": "2 colunas de 222px; scrollWidth=clientWidth",
              "measurement": "captured: Chromium 155 headless; KPI grid similarity is recorded, tablet resource reflow below supplies the major distinction"
            },
            "1280": {
              "before": "4 colunas de 227px",
              "after": "2 colunas de 229px dentro do painel de métricas de 470px",
              "measurement": "captured: Chromium 155 headless; hero and metrics side-by-side; no document horizontal overflow"
            }
          }
        },
        {
          "selector": "#view-painel > .hero; #view-painel > section[aria-labelledby=\"t-metricas\"]",
          "property": "grid-column / colocação dos grupos",
          "before": "Hero e métricas seguem em linhas distintas em todos os breakpoints.",
          "after": "A partir de 861px, hero ocupa a coluna editorial esquerda e métricas a coluna direita; abaixo, mantêm linhas integrais e a ordem DOM.",
          "breakpoints": {
            "320": {
              "before": "hero 288px, metrics below in DOM order",
              "after": "hero 288px, metrics below in same DOM order",
              "measurement": "captured: Chromium 155 headless; no grouping change at this viewport"
            },
            "375": {
              "before": "hero 343px, metrics below in DOM order",
              "after": "hero 343px, metrics below in same DOM order",
              "measurement": "captured: Chromium 155 headless; no grouping change at this viewport"
            },
            "768": {
              "before": "hero 456px above metrics; resources follow",
              "after": "hero 456px above metrics; resources follow; this entry records unchanged outer groups",
              "measurement": "captured: Chromium 155 headless; resource reflow is isolated below"
            },
            "1280": {
              "before": "hero and metrics in separate rows; each 968px wide",
              "after": "hero x=296/w=470 adjacent to metrics x=794/w=470; equal columns separated by 28px",
              "measurement": "captured: Chromium 155 headless; group rectangles differ and the meridian stays between the groups"
            }
          }
        },
        {
          "selector": "#view-painel > section[aria-labelledby=\"t-recursos\"] .grid",
          "property": "grid-template-columns em largura de tablet",
          "before": "Um cartão de recurso por linha, com min-width 260px.",
          "after": "Dois cartões de recurso lado a lado de 720px a 860px; gráfico ocupa a linha inteira.",
          "breakpoints": {
            "320": {
              "before": "1 coluna, cartões de 288px",
              "after": "1 coluna, cartões de 288px",
              "measurement": "captured: unchanged at this width"
            },
            "375": {
              "before": "1 coluna, cartões de 343px",
              "after": "1 coluna, cartões de 343px",
              "measurement": "captured: unchanged at this width"
            },
            "768": {
              "before": "auto-fit efetivo de 2 colunas desiguais (260/176px), chart span 2; stage=488px",
              "after": "1 coluna de 456px, inclusive chart sem span artificial",
              "measurement": "captured: Chromium 155 headless; human review of tablet card density remains required"
            },
            "1280": {
              "before": "auto-fit de 2 cartões de 474px e chart de 968px",
              "after": "auto-fit de 2 cartões de 474px e chart de 968px",
              "measurement": "captured: unchanged at this width"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".brand-mark",
          "animation": "ssd-meridian-turn 8s ease-in-out infinite",
          "trigger": "Enquanto #stage[data-variant=\"alternate\"] estiver ativo, data-motion-active=true e .brand-mark estiver visível; o runtime integrado deve marcar elementMotion=true e motionTarget=.brand-mark.",
          "duration": "8s ease-in-out infinite",
          "fallback": "Forma estática dividida ao meio via gradiente; sem depender do giro para identificar marca ou estado.",
          "reducedMotion": "@media (prefers-reduced-motion: reduce) remove a animação e preserva o símbolo dividido estático.",
          "pauseResume": "App atual tem IntersectionObserver por alvo, document.visibilitychange e matchMedia; pausa/retomada do alternate pendente até registry gerar elementMotion=true e teste integrado Chromium.",
          "cleanup": "CSS não cria JS, RAF, timer, observer ou nó; app atual desconecta observer e remove listeners em stopVariantMotion. Cleanup deste alternate pendente até integração/regressão no runtime."
        },
        "background": {
          "selector": "#stage::before; #stage::after",
          "animation": "ssd-polar-fields 34s ease-in-out infinite alternate; ::after uses alternate-reverse.",
          "trigger": "Enquanto #stage[data-variant=\"alternate\"] e data-motion-active=true; o runtime integrado deve marcar backgroundMotion=true para observar o palco.",
          "duration": "34s; ease-in-out; infinite alternate; ::after alternate-reverse",
          "fallback": "Gradiente dividido estático presente sob os halos; opacidade decorativa pode ser zero sem perder o meridiano.",
          "reducedMotion": "@media (prefers-reduced-motion: reduce) remove ambas as animações e mantém os gradientes estáticos.",
          "pauseResume": "App atual usa IntersectionObserver, document.visibilitychange e matchMedia; pausa/retomada do alternate pendente até registry gerar backgroundMotion=true e teste integrado Chromium.",
          "cleanup": "Pseudo-elementos não criam recursos JS; app atual desconecta observer/listeners ao mudar modo ou estilo. Cleanup efetivo deste alternate pendente até integração e teste de troca rápida."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".brand-mark",
      "backgroundTarget": "#stage::before; #stage::after",
      "contentDigest": "4ec967d5e58784bf4155c0543327d9dd09b72f36e065c7f6ba95363d1797e161",
      "generatedDigest": "ed3f1d62eb07e113ed7e7842a0a66aaff7492410ae470fb2083457c8e6bb7dc9",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "blueprint-cad-schematic": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/blueprint-cad-schematic.css",
      "nameKey": "appearance.blueprint-cad-schematic.alternate.name",
      "descriptionKey": "appearance.blueprint-cad-schematic.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Prancha técnica",
          "description": "Contraparte clara experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Technical sheet",
          "description": "An experimental light counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Lámina técnica",
          "description": "Una contraparte clara experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Planche technique",
          "description": "Une variante claire expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Technisches Blatt",
          "description": "Eine experimentelle helle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Технический лист",
          "description": "Экспериментальная светлая версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "لوحة تقنية",
          "description": "نسخة فاتحة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "तकनीकी शीट",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक हल्का रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "技术图纸",
          "description": "这是一款实验性浅色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "テクニカルシート",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なライト版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "기술 도면",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 라이트 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#f4f7fb",
        "--surface": "#ffffff",
        "--surface-2": "#e5edf5",
        "--fg": "#132d48",
        "--muted": "#405d77",
        "--accent": "#b94334",
        "--accent-fg": "#ffffff",
        "--border": "#617a90",
        "--focus": "#b94334",
        "--ok": "#185832",
        "--warn": "#684300",
        "--danger": "#8f2029",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#f4f7fb",
        "--surface": "#ffffff",
        "--accent": "#b94334"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"blueprint-cad-schematic\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Prancha de engenharia em papel técnico: grade milimétrica azul muito clara, tinta marinho e marcações vermelhas de revisão. schematic title block aligns with a narrow right-side specification rail; grid is decorative and low contrast.",
          "skillReference": "CSS canônico local styles/blueprint-cad-schematic.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de blueprint-cad-schematic."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/blueprint-cad-schematic.css.",
          "after": "schematic title block aligns with a narrow right-side specification rail; grid is decorative and low contrast.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "schematic title block aligns with a narrow right-side specification rail; grid is decorative and low contrast. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Prancha de engenharia em papel técnico: grade milimétrica azul muito clara, tinta marinho e marcações vermelhas de revisão. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "blueprint-cad-schematic-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "blueprint-cad-schematic-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "b8620893d7da2a6a12cf15fc71ac5aefc0f09bde3f37569e1de8b55c942e0c28",
      "generatedDigest": "db9446630b830463f329e2a538d67d2da5459376c616d244a8225c8124b11b1f",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "glassmorphism": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/glassmorphism.css",
      "nameKey": "appearance.glassmorphism.alternate.name",
      "descriptionKey": "appearance.glassmorphism.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Vidro diurno",
          "description": "Contraparte clara experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Daylight glass",
          "description": "An experimental light counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Vidrio diurno",
          "description": "Una contraparte clara experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Verre diurne",
          "description": "Une variante claire expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Tageslichtglas",
          "description": "Eine experimentelle helle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Дневное стекло",
          "description": "Экспериментальная светлая версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "زجاج النهار",
          "description": "نسخة فاتحة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "दिन का कांच",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक हल्का रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "日光玻璃",
          "description": "这是一款实验性浅色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "昼のガラス",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なライト版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "데이라이트 글래스",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 라이트 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#edf3fa",
        "--surface": "#ffffff",
        "--surface-2": "#dce7f2",
        "--fg": "#16283b",
        "--muted": "#4b6075",
        "--accent": "#087a91",
        "--accent-fg": "#ffffff",
        "--border": "#617a90",
        "--focus": "#087a91",
        "--ok": "#185832",
        "--warn": "#684300",
        "--danger": "#8f2029",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#edf3fa",
        "--surface": "#ffffff",
        "--accent": "#087a91"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"glassmorphism\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Vidro diurno sobre céu nublado: placas translúcidas apenas decorativas sobre base opaca, texto marinho sólido e teal para foco. hero and metrics use a translucent canopy over an opaque reading surface; desktop keeps controlled two-column geometry.",
          "skillReference": "CSS canônico local styles/glassmorphism.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de glassmorphism."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/glassmorphism.css.",
          "after": "hero and metrics use a translucent canopy over an opaque reading surface; desktop keeps controlled two-column geometry.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "hero and metrics use a translucent canopy over an opaque reading surface; desktop keeps controlled two-column geometry. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Vidro diurno sobre céu nublado: placas translúcidas apenas decorativas sobre base opaca, texto marinho sólido e teal para foco. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "glassmorphism-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "glassmorphism-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "7471f36e20cf3f1dea68fa3f99cc602a0bd16aeeebfa5c751dcd1b8ac95d8f49",
      "generatedDigest": "d197438e0683d40ca218619c63536db279746dd5f3ea995e3c6cabbab071d42a",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "neumorphism": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/neumorphism.css",
      "nameKey": "appearance.neumorphism.alternate.name",
      "descriptionKey": "appearance.neumorphism.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Grafite tátil",
          "description": "Contraparte escura experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Tactile graphite",
          "description": "An experimental dark counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Grafito táctil",
          "description": "Una contraparte oscura experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Graphite tactile",
          "description": "Une variante sombre expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Taktiles Graphit",
          "description": "Eine experimentelle dunkle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Тактильный графит",
          "description": "Экспериментальная тёмная версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "غرافيت ملموس",
          "description": "نسخة داكنة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "स्पर्शनीय ग्रेफाइट",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक गहरा रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "触感石墨",
          "description": "这是一款实验性深色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "タクタイルグラファイト",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なダーク版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "촉각 흑연",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 다크 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#252b35",
        "--surface": "#303844",
        "--surface-2": "#3b4553",
        "--fg": "#f0f3f7",
        "--muted": "#c3cad4",
        "--accent": "#a7b9ff",
        "--accent-fg": "#151b2b",
        "--border": "#8c9aa8",
        "--focus": "#a7b9ff",
        "--ok": "#8ed7a6",
        "--warn": "#ffd06f",
        "--danger": "#ff9993",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#252b35",
        "--surface": "#303844",
        "--accent": "#a7b9ff"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"neumorphism\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Neumorfismo invertido e legível: relevo suave em superfícies grafite, mas campos e foco mantêm bordas visíveis e azul lilás funcional. single centered content column; tactile cards use modest paired shadows and clear inset input outlines.",
          "skillReference": "CSS canônico local styles/neumorphism.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de neumorphism."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/neumorphism.css.",
          "after": "single centered content column; tactile cards use modest paired shadows and clear inset input outlines.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "single centered content column; tactile cards use modest paired shadows and clear inset input outlines. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Neumorfismo invertido e legível: relevo suave em superfícies grafite, mas campos e foco mantêm bordas visíveis e azul lilás funcional. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "neumorphism-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "neumorphism-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "98bb9510295436c23fac1454b542945a39e3447f806905ddd3336df6970eaec6",
      "generatedDigest": "da2dfe028ec4c7d0faba512f5da9401e3944295efb5bbb021b27b1afdadb3712",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "claymorphism": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/claymorphism.css",
      "nameKey": "appearance.claymorphism.alternate.name",
      "descriptionKey": "appearance.claymorphism.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Argila de ameixa",
          "description": "Contraparte escura experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Plum clay",
          "description": "An experimental dark counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Arcilla ciruela",
          "description": "Una contraparte oscura experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Argile prune",
          "description": "Une variante sombre expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Pflaumenton",
          "description": "Eine experimentelle dunkle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Сливочная глина",
          "description": "Экспериментальная тёмная версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "طين البرقوق",
          "description": "نسخة داكنة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "आलूबुखारा मिट्टी",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक गहरा रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "梅色陶土",
          "description": "这是一款实验性深色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "プラムクレイ",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なダーク版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "플럼 클레이",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 다크 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#302536",
        "--surface": "#3a2c42",
        "--surface-2": "#493650",
        "--fg": "#fff5f2",
        "--muted": "#dccbd9",
        "--accent": "#ffad8a",
        "--accent-fg": "#382018",
        "--border": "#a58aa0",
        "--focus": "#ffad8a",
        "--ok": "#8ed7a6",
        "--warn": "#ffd06f",
        "--danger": "#ff9993",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#302536",
        "--surface": "#3a2c42",
        "--accent": "#ffad8a"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"claymorphism\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Argila de ameixa e pêssego ao anoitecer: volumes arredondados com sombras internas discretas, texto claro e pêssego controlado. rounded hero anchors a compact two-column card field; no oversized whitespace on short viewports.",
          "skillReference": "CSS canônico local styles/claymorphism.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de claymorphism."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/claymorphism.css.",
          "after": "rounded hero anchors a compact two-column card field; no oversized whitespace on short viewports.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "rounded hero anchors a compact two-column card field; no oversized whitespace on short viewports. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Argila de ameixa e pêssego ao anoitecer: volumes arredondados com sombras internas discretas, texto claro e pêssego controlado. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "claymorphism-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "claymorphism-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "e9bdef0f50d315d8311cc48d149f515901645727a52125fe1db00933bfec8328",
      "generatedDigest": "7892796145e7959759358b5d51ad0ac2ac969cb4c24b1d41decb8fd1d32e84b4",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "skeuomorphism": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/skeuomorphism.css",
      "nameKey": "appearance.skeuomorphism.alternate.name",
      "descriptionKey": "appearance.skeuomorphism.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Rádio de madeira",
          "description": "Contraparte escura experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Wood radio",
          "description": "An experimental dark counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Radio de madera",
          "description": "Una contraparte oscura experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Radio en bois",
          "description": "Une variante sombre expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Holzradio",
          "description": "Eine experimentelle dunkle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Деревянное радио",
          "description": "Экспериментальная тёмная версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "راديو خشبي",
          "description": "نسخة داكنة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "लकड़ी का रेडियो",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक गहरा रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "木质收音机",
          "description": "这是一款实验性深色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "木製ラジオ",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なダーク版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "우드 라디오",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 다크 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#25201b",
        "--surface": "#332b23",
        "--surface-2": "#44392e",
        "--fg": "#f7edda",
        "--muted": "#d6c4a8",
        "--accent": "#79b5d2",
        "--accent-fg": "#102633",
        "--border": "#A8967D",
        "--focus": "#79b5d2",
        "--ok": "#8ed7a6",
        "--warn": "#ffd06f",
        "--danger": "#ff9993",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#25201b",
        "--surface": "#332b23",
        "--accent": "#79b5d2"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"skeuomorphism\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Painel de rádio de madeira escura: couro e latão ficam em detalhes, botões azuis parecem controles físicos e texto usa marfim de alto contraste. toolbar sits above a framed control panel; metrics grouped as instrument readouts with aligned labels.",
          "skillReference": "CSS canônico local styles/skeuomorphism.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de skeuomorphism."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/skeuomorphism.css.",
          "after": "toolbar sits above a framed control panel; metrics grouped as instrument readouts with aligned labels.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "toolbar sits above a framed control panel; metrics grouped as instrument readouts with aligned labels. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Painel de rádio de madeira escura: couro e latão ficam em detalhes, botões azuis parecem controles físicos e texto usa marfim de alto contraste. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "skeuomorphism-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "skeuomorphism-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "9b33dde912f05c6c81604238fba228e5bcf7f644e54ad26b74e2d9926280b30f",
      "generatedDigest": "42f071b3128a766412347e07002c6582b392dd01ef328ebf87c21899ab167016",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "windows-xp": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/windows-xp.css",
      "nameKey": "appearance.windows-xp.alternate.name",
      "descriptionKey": "appearance.windows-xp.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Janela clássica",
          "description": "Contraparte escura experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Classic window",
          "description": "An experimental dark counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Ventana clásica",
          "description": "Una contraparte oscura experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Fenêtre classique",
          "description": "Une variante sombre expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Klassisches Fenster",
          "description": "Eine experimentelle dunkle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Классическое окно",
          "description": "Экспериментальная тёмная версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "نافذة كلاسيكية",
          "description": "نسخة داكنة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "क्लासिक विंडो",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक गहरा रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "经典窗口",
          "description": "这是一款实验性深色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "クラシックウィンドウ",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なダーク版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "클래식 창",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 다크 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#172b43",
        "--surface": "#203955",
        "--surface-2": "#2b4968",
        "--fg": "#f4f7fc",
        "--muted": "#c2cfde",
        "--accent": "#7bc98e",
        "--accent-fg": "#102317",
        "--border": "#8ca4c1",
        "--focus": "#9de0a8",
        "--ok": "#8ed7a6",
        "--warn": "#ffd06f",
        "--danger": "#ff9993",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#172b43",
        "--surface": "#203955",
        "--accent": "#7bc98e"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"windows-xp\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Área de trabalho clássica em azul marinho: molduras de janela, barra de título azul profunda e controles verdes com aparência de sistema. application window frame encloses the dashboard; title bar remains distinct and content uses compact window panes.",
          "skillReference": "CSS canônico local styles/windows-xp.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de windows-xp."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/windows-xp.css.",
          "after": "application window frame encloses the dashboard; title bar remains distinct and content uses compact window panes.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "application window frame encloses the dashboard; title bar remains distinct and content uses compact window panes. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Área de trabalho clássica em azul marinho: molduras de janela, barra de título azul profunda e controles verdes com aparência de sistema. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "windows-xp-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "windows-xp-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "32edb394c90da1555d80f169643ffedd585574b9feaee94e8baf23ec3f2dedd6",
      "generatedDigest": "e471ea43667d377c62beed7e20f39b301798c60a822b553c72a184a5e3e7c59e",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "frutiger-aero": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/frutiger-aero.css",
      "nameKey": "appearance.frutiger-aero.alternate.name",
      "descriptionKey": "appearance.frutiger-aero.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Oceano profundo",
          "description": "Contraparte escura experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Deep ocean",
          "description": "An experimental dark counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Océano profundo",
          "description": "Una contraparte oscura experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Océan profond",
          "description": "Une variante sombre expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Tiefer Ozean",
          "description": "Eine experimentelle dunkle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Глубокий океан",
          "description": "Экспериментальная тёмная версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "محيط عميق",
          "description": "نسخة داكنة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "गहरा महासागर",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक गहरा रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "深海",
          "description": "这是一款实验性深色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "深い海",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なダーク版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "깊은 바다",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 다크 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#15384a",
        "--surface": "#1b4658",
        "--surface-2": "#24566a",
        "--fg": "#f0fbff",
        "--muted": "#c1e2ed",
        "--accent": "#78d7c6",
        "--accent-fg": "#103638",
        "--border": "#82A7B3",
        "--focus": "#78d7c6",
        "--ok": "#8ed7a6",
        "--warn": "#ffd06f",
        "--danger": "#ff9993",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#15384a",
        "--surface": "#1b4658",
        "--accent": "#78d7c6"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"frutiger-aero\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Aero de oceano profundo: azul petróleo e reflexos aqua, com superfícies translúcidas somente em camadas não textuais e botões opacos. wide scenic header flows into a compact two-column control dashboard; preserve readable opaque card interiors.",
          "skillReference": "CSS canônico local styles/frutiger-aero.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de frutiger-aero."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/frutiger-aero.css.",
          "after": "wide scenic header flows into a compact two-column control dashboard; preserve readable opaque card interiors.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "wide scenic header flows into a compact two-column control dashboard; preserve readable opaque card interiors. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Aero de oceano profundo: azul petróleo e reflexos aqua, com superfícies translúcidas somente em camadas não textuais e botões opacos. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "frutiger-aero-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "frutiger-aero-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "ba64affdc746f835fa87443603c357e2cf04b01f9033ea077c9f8bc9459cb352",
      "generatedDigest": "9da0a4a80f2db02bda13cc4cc4ec1efe446fffe93ef8c38ff95c9de8569d2ca2",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "aurora-mesh-gradient": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/aurora-mesh-gradient.css",
      "nameKey": "appearance.aurora-mesh-gradient.alternate.name",
      "descriptionKey": "appearance.aurora-mesh-gradient.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Aurora de alvorada",
          "description": "Contraparte clara experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Dawn aurora",
          "description": "An experimental light counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Aurora del alba",
          "description": "Una contraparte clara experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Aurore de l’aube",
          "description": "Une variante claire expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Morgenröten-Aurora",
          "description": "Eine experimentelle helle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Рассветное сияние",
          "description": "Экспериментальная светлая версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "شفق الفجر",
          "description": "نسخة فاتحة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "भोर की ऑरोरा",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक हल्का रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "黎明极光",
          "description": "这是一款实验性浅色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "夜明けのオーロラ",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なライト版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "새벽 오로라",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 라이트 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#f8f5ff",
        "--surface": "#ffffff",
        "--surface-2": "#e8e3f3",
        "--fg": "#211a32",
        "--muted": "#51465e",
        "--accent": "#276b64",
        "--accent-fg": "#ffffff",
        "--border": "#8B7A9E",
        "--focus": "#276b64",
        "--ok": "#185832",
        "--warn": "#684300",
        "--danger": "#8f2029",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#f8f5ff",
        "--surface": "#ffffff",
        "--accent": "#276b64"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"aurora-mesh-gradient\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Aurora em alvorada: base de névoa lilás quase branca com manchas controladas de jade e ameixa; texto escuro permanece sólido. broad mesh hero above an orderly metric band; gradients confined to the hero backdrop and never behind small text.",
          "skillReference": "CSS canônico local styles/aurora-mesh-gradient.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de aurora-mesh-gradient."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/aurora-mesh-gradient.css.",
          "after": "broad mesh hero above an orderly metric band; gradients confined to the hero backdrop and never behind small text.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "broad mesh hero above an orderly metric band; gradients confined to the hero backdrop and never behind small text. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Aurora em alvorada: base de névoa lilás quase branca com manchas controladas de jade e ameixa; texto escuro permanece sólido. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "aurora-mesh-gradient-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "aurora-mesh-gradient-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "779b9065a5cc87a325e747cf9312f7c0360da85aec688e411ba09385f725d1b8",
      "generatedDigest": "fc73bd3a20b9ae141a1461a7207431f477a4c0bab6b36fe7af94c7f946d2ab09",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "gradient-duotone": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/gradient-duotone.css",
      "nameKey": "appearance.gradient-duotone.alternate.name",
      "descriptionKey": "appearance.gradient-duotone.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Cartaz duotone solar",
          "description": "Contraparte clara experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Solar duotone poster",
          "description": "An experimental light counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Cartel duotono solar",
          "description": "Una contraparte clara experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Affiche duotone solaire",
          "description": "Une variante claire expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Solarer Duotone-Poster",
          "description": "Eine experimentelle helle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Солнечный дуотон-плакат",
          "description": "Экспериментальная светлая версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "ملصق ثنائي اللون شمسي",
          "description": "نسخة فاتحة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "सौर डुओटोन पोस्टर",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक हल्का रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "阳光双色海报",
          "description": "这是一款实验性浅色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "ソーラーデュオトーンポスター",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なライト版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "솔라 듀오톤 포스터",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 라이트 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#fff1e7",
        "--surface": "#fffaf4",
        "--surface-2": "#f1dcd2",
        "--fg": "#2a1b25",
        "--muted": "#5d4650",
        "--accent": "#c13867",
        "--accent-fg": "#ffffff",
        "--border": "#9F7276",
        "--focus": "#c13867",
        "--ok": "#185832",
        "--warn": "#684300",
        "--danger": "#8f2029",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#fff1e7",
        "--surface": "#fffaf4",
        "--accent": "#c13867"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"gradient-duotone\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Duotone de cartaz solar: fundo creme e par complementar coral/azul-petróleo em campos sólidos, com título de tinta uniforme. asymmetric 7/5 hero split pairs a large editorial headline with a solid duotone illustration block.",
          "skillReference": "CSS canônico local styles/gradient-duotone.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de gradient-duotone."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/gradient-duotone.css.",
          "after": "asymmetric 7/5 hero split pairs a large editorial headline with a solid duotone illustration block.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "asymmetric 7/5 hero split pairs a large editorial headline with a solid duotone illustration block. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Duotone de cartaz solar: fundo creme e par complementar coral/azul-petróleo em campos sólidos, com título de tinta uniforme. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "gradient-duotone-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "gradient-duotone-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "426f85177456037f84805074321d94cb8bb296f62915149205a56b30d8c1b13a",
      "generatedDigest": "afbdb8a416c3384b9b0df0f932e756dcf570ff46aebea1d644f665fd25dffa49",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "grain-noise-texture": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/grain-noise-texture.css",
      "nameKey": "appearance.grain-noise-texture.alternate.name",
      "descriptionKey": "appearance.grain-noise-texture.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Grão de carvão",
          "description": "Contraparte escura experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Charcoal grain",
          "description": "An experimental dark counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Grano de carbón",
          "description": "Una contraparte oscura experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Grain de charbon",
          "description": "Une variante sombre expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Kohlekorn",
          "description": "Eine experimentelle dunkle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Угольное зерно",
          "description": "Экспериментальная тёмная версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "حبيبات الفحم",
          "description": "نسخة داكنة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "चारकोल कण",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक गहरा रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "炭粉颗粒",
          "description": "这是一款实验性深色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "木炭グレイン",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なダーク版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "차콜 그레인",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 다크 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#262622",
        "--surface": "#302f2a",
        "--surface-2": "#3d3b34",
        "--fg": "#f6f0df",
        "--muted": "#d0c5a9",
        "--accent": "#e28a48",
        "--accent-fg": "#2c1a0d",
        "--border": "#8D8673",
        "--focus": "#e28a48",
        "--ok": "#8ed7a6",
        "--warn": "#ffd06f",
        "--danger": "#ff9993",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#262622",
        "--surface": "#302f2a",
        "--accent": "#e28a48"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"grain-noise-texture\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Impressão noturna em papel carvão: grão fino em baixa opacidade, tinta creme e laranja queimado como registro de impressão. editorial single column with paper-like content plates and aligned side notes; texture stays behind all text.",
          "skillReference": "CSS canônico local styles/grain-noise-texture.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de grain-noise-texture."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/grain-noise-texture.css.",
          "after": "editorial single column with paper-like content plates and aligned side notes; texture stays behind all text.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "editorial single column with paper-like content plates and aligned side notes; texture stays behind all text. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Impressão noturna em papel carvão: grão fino em baixa opacidade, tinta creme e laranja queimado como registro de impressão. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "grain-noise-texture-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "grain-noise-texture-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "d10a5a5a397ee285f4e3fd2547cea6cd154e0ab3c49780b1b725addb7436ec76",
      "generatedDigest": "10677062ce25956df125dc11f239b9fe32377e60f44a930612399980e0ed320f",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "holographic-foil-iridescent": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/holographic-foil-iridescent.css",
      "nameKey": "appearance.holographic-foil-iridescent.alternate.name",
      "descriptionKey": "appearance.holographic-foil-iridescent.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Foil de galeria",
          "description": "Contraparte clara experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Gallery foil",
          "description": "An experimental light counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Lámina de galería",
          "description": "Una contraparte clara experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Film de galerie",
          "description": "Une variante claire expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Galerie-Folie",
          "description": "Eine experimentelle helle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Галерейная фольга",
          "description": "Экспериментальная светлая версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "رقائق المعرض",
          "description": "نسخة فاتحة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "गैलरी फ़ॉइल",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक हल्का रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "展厅箔彩",
          "description": "这是一款实验性浅色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "ギャラリーフォイル",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なライト版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "갤러리 포일",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 라이트 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#f7f3fb",
        "--surface": "#ffffff",
        "--surface-2": "#eee7f4",
        "--fg": "#21192b",
        "--muted": "#55485e",
        "--accent": "#764d9b",
        "--accent-fg": "#ffffff",
        "--border": "#937BA2",
        "--focus": "#764d9b",
        "--ok": "#185832",
        "--warn": "#684300",
        "--danger": "#8f2029",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#f7f3fb",
        "--surface": "#ffffff",
        "--accent": "#764d9b"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"holographic-foil-iridescent\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Foil em luz de galeria: base porcelana e iridescência violeta/ciano em filetes e elementos não textuais; leitura nunca depende de gradiente. gallery-like header with a single spectrum rail; cards keep solid white surfaces and one iridescent edge.",
          "skillReference": "CSS canônico local styles/holographic-foil-iridescent.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de holographic-foil-iridescent."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/holographic-foil-iridescent.css.",
          "after": "gallery-like header with a single spectrum rail; cards keep solid white surfaces and one iridescent edge.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "gallery-like header with a single spectrum rail; cards keep solid white surfaces and one iridescent edge. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Foil em luz de galeria: base porcelana e iridescência violeta/ciano em filetes e elementos não textuais; leitura nunca depende de gradiente. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "holographic-foil-iridescent-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "holographic-foil-iridescent-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "49434cfc8cd8d66acc68443d1dbe005168b58a4e9850cde8803126fc091cc1da",
      "generatedDigest": "84d6cc8f2d3b58aaa072f3aa93bcbecf3b083b5c2656d3a8c45e02dcdee34b0d",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "neo-brutalism": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/neo-brutalism.css",
      "nameKey": "appearance.neo-brutalism.alternate.name",
      "descriptionKey": "appearance.neo-brutalism.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Tinta e açafrão",
          "description": "Contraparte escura experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Ink and saffron",
          "description": "An experimental dark counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Tinta y azafrán",
          "description": "Una contraparte oscura experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Encre et safran",
          "description": "Une variante sombre expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Tinte und Safran",
          "description": "Eine experimentelle dunkle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Чернила и шафран",
          "description": "Экспериментальная тёмная версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "حبر وزعفران",
          "description": "نسخة داكنة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "स्याही और केसर",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक गहरा रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "墨色与藏红花",
          "description": "这是一款实验性深色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "インクとサフラン",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なダーク版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "잉크와 사프란",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 다크 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#191817",
        "--surface": "#252321",
        "--surface-2": "#312e2a",
        "--fg": "#fffaf0",
        "--muted": "#d2c8b8",
        "--accent": "#f2bd35",
        "--accent-fg": "#2b2100",
        "--border": "#897b69",
        "--focus": "#f2bd35",
        "--ok": "#8ed7a6",
        "--warn": "#ffd06f",
        "--danger": "#ff9993",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#191817",
        "--surface": "#252321",
        "--accent": "#f2bd35"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"neo-brutalism\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Neo-brutalismo noturno em tinta e açafrão: bordas pesadas, sombra deslocada e hierarquia em blocos sem arredondamento excessivo. thick offset frame around hero; metrics form a loud 2x2 grid with one accent tile and strong gutters.",
          "skillReference": "CSS canônico local styles/neo-brutalism.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de neo-brutalism."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/neo-brutalism.css.",
          "after": "thick offset frame around hero; metrics form a loud 2x2 grid with one accent tile and strong gutters.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "thick offset frame around hero; metrics form a loud 2x2 grid with one accent tile and strong gutters. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Neo-brutalismo noturno em tinta e açafrão: bordas pesadas, sombra deslocada e hierarquia em blocos sem arredondamento excessivo. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "neo-brutalism-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "neo-brutalism-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "168e1a9b6444aed445e8809f6782a53cd7afef71c56a38907a656e5f3ec7af5d",
      "generatedDigest": "08f54ea9a473357cd460d41f8a3ae5addbc6ff6d17b9e9f3a31a4c0fa68925f9",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "web-brutalism": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/web-brutalism.css",
      "nameKey": "appearance.web-brutalism.alternate.name",
      "descriptionKey": "appearance.web-brutalism.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Documento noturno",
          "description": "Contraparte escura experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Night document",
          "description": "An experimental dark counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Documento nocturno",
          "description": "Una contraparte oscura experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Document nocturne",
          "description": "Une variante sombre expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Nachdokument",
          "description": "Eine experimentelle dunkle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Ночной документ",
          "description": "Экспериментальная тёмная версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "وثيقة ليلية",
          "description": "نسخة داكنة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "रात्रि दस्तावेज़",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक गहरा रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "夜间文档",
          "description": "这是一款实验性深色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "夜のドキュメント",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なダーク版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "야간 문서",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 다크 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#181818",
        "--surface": "#222222",
        "--surface-2": "#303030",
        "--fg": "#f5f5f5",
        "--muted": "#cccccc",
        "--accent": "#ffe500",
        "--accent-fg": "#111111",
        "--border": "#7B7B7B",
        "--focus": "#ffe500",
        "--ok": "#8ed7a6",
        "--warn": "#ffd06f",
        "--danger": "#ff9993",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#181818",
        "--surface": "#222222",
        "--accent": "#ffe500"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"web-brutalism\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Web brutalista em modo noturno: tipografia crua, links sublinhados, linhas divisórias e blocos de amarelo puro sobre preto e branco. Plain document flow with visible rules and compact metrics; no card elevations.",
          "skillReference": "CSS canônico local styles/web-brutalism.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de web-brutalism."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/web-brutalism.css.",
          "after": "plain document flow with visible rules and compact list-like metrics; no card elevations or ornamental grid.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "plain document flow with visible rules and compact list-like metrics; no card elevations or ornamental grid. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Web brutalista em modo noturno: tipografia de navegador crua, links sublinhados, linhas divisórias e amarelo puro de alto contraste. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "web-brutalism-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "web-brutalism-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "9cec8bd2920575e3602b2b29a0dabcdc938ef62f3fb13fbe952d0decbc7ab552",
      "generatedDigest": "ec70ee221d84f69c42095a36a76fe19fc3ee948384f4aa50461f16bae0be5427",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "brutalist-monochrome": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/brutalist-monochrome.css",
      "nameKey": "appearance.brutalist-monochrome.alternate.name",
      "descriptionKey": "appearance.brutalist-monochrome.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Papel brutalista",
          "description": "Contraparte clara experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Brutalist paper",
          "description": "An experimental light counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Papel brutalista",
          "description": "Una contraparte clara experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Papier brutaliste",
          "description": "Une variante claire expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Brutalistisches Papier",
          "description": "Eine experimentelle helle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Бруталистская бумага",
          "description": "Экспериментальная светлая версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "ورق بروتالي",
          "description": "نسخة فاتحة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "क्रूरवादी कागज़",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक हल्का रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "粗野主义纸面",
          "description": "这是一款实验性浅色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "ブルータリストペーパー",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なライト版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "브루탈리스트 페이퍼",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 라이트 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#f3f3f1",
        "--surface": "#ffffff",
        "--surface-2": "#e3e3df",
        "--fg": "#111111",
        "--muted": "#444444",
        "--accent": "#111111",
        "--accent-fg": "#ffffff",
        "--border": "#777777",
        "--focus": "#111111",
        "--ok": "#185832",
        "--warn": "#684300",
        "--danger": "#8f2029",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#f3f3f1",
        "--surface": "#ffffff",
        "--accent": "#111111"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"brutalist-monochrome\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Brutalismo monocromático de papel: tinta preta, branco mineral, regra espessa e hierarquia de cartaz sem cores decorativas. large typographic title leads; metrics become a ruled ledger, resources follow in a single column.",
          "skillReference": "CSS canônico local styles/brutalist-monochrome.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de brutalist-monochrome."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/brutalist-monochrome.css.",
          "after": "large typographic title leads; metrics become a ruled ledger, resources follow in a single column.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "large typographic title leads; metrics become a ruled ledger, resources follow in a single column. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Brutalismo monocromático de papel: tinta preta, branco mineral, regra espessa e hierarquia de cartaz sem cores decorativas. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "brutalist-monochrome-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "brutalist-monochrome-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "dc4096244283eb5c8c269f832b0a7c004bda587340ed9e0e2dc90b39850ad616",
      "generatedDigest": "eca6ece67193c2280171b853f986294674c93a3245b5b9883c8e7628cb1ed5a7",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "acid-anti-design": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/acid-anti-design.css",
      "nameKey": "appearance.acid-anti-design.alternate.name",
      "descriptionKey": "appearance.acid-anti-design.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Ácido em papel",
          "description": "Contraparte clara experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Acid on paper",
          "description": "An experimental light counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Ácido sobre papel",
          "description": "Una contraparte clara experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Acide sur papier",
          "description": "Une variante claire expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Säure auf Papier",
          "description": "Eine experimentelle helle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Кислота на бумаге",
          "description": "Экспериментальная светлая версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "حمض على الورق",
          "description": "نسخة فاتحة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "कागज़ पर अम्ल",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक हल्का रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "纸上酸色",
          "description": "这是一款实验性浅色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "紙上のアシッド",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なライト版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "페이퍼 애시드",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 라이트 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#f0f2e8",
        "--surface": "#ffffff",
        "--surface-2": "#e2e7d5",
        "--fg": "#191a15",
        "--muted": "#4b5140",
        "--accent": "#7b27bd",
        "--accent-fg": "#ffffff",
        "--border": "#788064",
        "--focus": "#7b27bd",
        "--ok": "#185832",
        "--warn": "#684300",
        "--danger": "#8f2029",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#f0f2e8",
        "--surface": "#ffffff",
        "--accent": "#7b27bd"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"acid-anti-design\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Anti-design ácido em papel: verde-lima vira marcação pontual sobre papel claro, roxo ácido dá contraponto e texto permanece em tinta escura. asymmetric poster title with rotated micro-labels; content remains aligned at mobile and rotations are decorative only.",
          "skillReference": "CSS canônico local styles/acid-anti-design.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de acid-anti-design."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/acid-anti-design.css.",
          "after": "asymmetric poster title with rotated micro-labels; content remains aligned at mobile and rotations are decorative only.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "asymmetric poster title with rotated micro-labels; content remains aligned at mobile and rotations are decorative only. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Anti-design ácido em papel: verde-lima vira marcação pontual sobre papel claro, roxo ácido dá contraponto e texto permanece em tinta escura. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "acid-anti-design-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "acid-anti-design-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "f34beefb1f4192612faf2db14eb5e3f0372d836a859ad5109f2af5869b54c130",
      "generatedDigest": "9e5a7693bb96111a24eaf58964d49888c96eecd20aaf010deab233a4013d3994",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "maximalism": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/maximalism.css",
      "nameKey": "appearance.maximalism.alternate.name",
      "descriptionKey": "appearance.maximalism.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Palco noturno",
          "description": "Contraparte clara experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Night stage",
          "description": "An experimental light counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Escenario nocturno",
          "description": "Una contraparte clara experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Scène nocturne",
          "description": "Une variante claire expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Nachtbühne",
          "description": "Eine experimentelle helle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Ночная сцена",
          "description": "Экспериментальная светлая версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "مسرح ليلي",
          "description": "نسخة فاتحة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "रात्रि मंच",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक हल्का रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "夜间舞台",
          "description": "这是一款实验性浅色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "夜のステージ",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なライト版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "야간 무대",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 라이트 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#fff3d5",
        "--surface": "#fff9e9",
        "--surface-2": "#f4dfed",
        "--fg": "#24172e",
        "--muted": "#51405c",
        "--accent": "#c01868",
        "--accent-fg": "#ffffff",
        "--border": "#6b4b72",
        "--focus": "#c01868",
        "--ok": "#185832",
        "--warn": "#684300",
        "--danger": "#8f2029",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#fff3d5",
        "--surface": "#fff9e9",
        "--accent": "#c01868"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"maximalism\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Palco maximalista claro: papel açafrão, ameixa e rosa saturado em recortes gráficos, com áreas calmas de leitura entre acentos. Hero em painel e cartões escalonados permanecem contidos na grade.",
          "skillReference": "CSS canônico local styles/maximalism.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de maximalism."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/maximalism.css.",
          "after": "layered poster hero and staggered but bounded cards; desktop offsets stay within a 12-column grid.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "layered poster hero and staggered but bounded cards; desktop offsets stay within a 12-column grid. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Maximalismo de palco noturno: ameixa profunda, amarelo açafrão e ciano em recortes gráficos, com áreas calmas de leitura entre acentos. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "maximalism-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "maximalism-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "c5b516566015d8224c0675406bbf868db7dbb0502a45a47892b198b6843eb13b",
      "generatedDigest": "765d955265a07438834c4dfa9674d8c569063ba352712d57fb0d8170bc08dd79",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "broken-grid": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/broken-grid.css",
      "nameKey": "appearance.broken-grid.alternate.name",
      "descriptionKey": "appearance.broken-grid.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Colagem noturna",
          "description": "Contraparte escura experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Night collage",
          "description": "An experimental dark counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Collage nocturno",
          "description": "Una contraparte oscura experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Collage nocturne",
          "description": "Une variante sombre expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Nachtcollage",
          "description": "Eine experimentelle dunkle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Ночной коллаж",
          "description": "Экспериментальная тёмная версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "كولاج ليلي",
          "description": "نسخة داكنة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "रात्रि कोलाज",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक गहरा रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "夜间拼贴",
          "description": "这是一款实验性深色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "夜のコラージュ",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なダーク版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "야간 콜라주",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 다크 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#211b17",
        "--surface": "#2d2520",
        "--surface-2": "#3b3029",
        "--fg": "#fff6e8",
        "--muted": "#d6c7b6",
        "--accent": "#ff8056",
        "--accent-fg": "#32170d",
        "--border": "#8B7A6B",
        "--focus": "#ff8056",
        "--ok": "#8ed7a6",
        "--warn": "#ffd06f",
        "--danger": "#ff9993",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#211b17",
        "--surface": "#2d2520",
        "--accent": "#ff8056"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"broken-grid\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Colagem editorial noturna: carvão café, papel marfim e laranja de impressão; desalinhamento intencional limitado ao hero e corrigido em mobile. desktop hero uses a controlled 7/5 overlap; all following modules snap back to a measured grid.",
          "skillReference": "CSS canônico local styles/broken-grid.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de broken-grid."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/broken-grid.css.",
          "after": "desktop hero uses a controlled 7/5 overlap; all following modules snap back to a measured grid.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "desktop hero uses a controlled 7/5 overlap; all following modules snap back to a measured grid. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Colagem editorial noturna: carvão café, papel marfim e laranja de impressão; desalinhamento intencional limitado ao hero e corrigido em mobile. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "broken-grid-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "broken-grid-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "38d96dfc2422ad7a2f496031d741028d287234fd7ef33881d443bfcf2c201bb8",
      "generatedDigest": "273ffca9c9b19e9da093dc0653d7bb7a35b57d4406c5c5df92555fcb2b8f40ba",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "glitch": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/glitch.css",
      "nameKey": "appearance.glitch.alternate.name",
      "descriptionKey": "appearance.glitch.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Glitch exposto",
          "description": "Contraparte clara experimental com identidade própria, contraste de leitura e composição adaptada ao tema; proposta pronta para revisão humana."
        },
        "en-US": {
          "name": "Glitch in daylight",
          "description": "An experimental light counterpart with its own identity, readable contrast, and a composition adapted to the theme; ready for human review."
        },
        "es-ES": {
          "name": "Glitch a plena luz",
          "description": "Una contraparte clara experimental con identidad propia, contraste legible y una composición adaptada al tema; lista para revisión humana."
        },
        "fr-FR": {
          "name": "Glitch au grand jour",
          "description": "Une variante claire expérimentale avec sa propre identité, un contraste lisible et une composition adaptée au thème, prête pour une revue humaine."
        },
        "de-DE": {
          "name": "Glitch im Tageslicht",
          "description": "Eine experimentelle helle Variante mit eigener Identität, gut lesbarem Kontrast und themengerechter Komposition, bereit zur menschlichen Prüfung."
        },
        "ru-RU": {
          "name": "Глитч при свете",
          "description": "Экспериментальная светлая версия с собственной выразительностью, читаемым контрастом и композицией в духе темы; готова к проверке человеком."
        },
        "ar-SA": {
          "name": "خلل في ضوء النهار",
          "description": "نسخة فاتحة تجريبية بهوية مستقلة وتباين واضح وتكوين يناسب الطابع، وهي جاهزة للمراجعة البشرية."
        },
        "hi-IN": {
          "name": "दिन के उजाले में ग्लिच",
          "description": "अपनी अलग पहचान, पढ़ने योग्य कंट्रास्ट और विषय के अनुकूल संयोजन वाला प्रयोगात्मक हल्का रूप; मानवीय समीक्षा के लिए तैयार।"
        },
        "zh-CN": {
          "name": "日光故障风",
          "description": "这是一款实验性浅色方案，具有鲜明个性、清晰对比和贴合主题的布局，现可供人工审阅。"
        },
        "ja-JP": {
          "name": "昼のグリッチ",
          "description": "独自の個性、読みやすいコントラスト、テーマに沿った構成を備えた実験的なライト版です。人による確認に向けた提案です。"
        },
        "ko-KR": {
          "name": "대낮의 글리치",
          "description": "고유한 개성, 읽기 쉬운 대비, 주제에 맞춘 구성을 갖춘 실험적 라이트 변형이며 사람의 검토를 위한 제안입니다."
        }
      },
      "tokens": {
        "--bg": "#f4f5ff",
        "--surface": "#ffffff",
        "--surface-2": "#e9eafa",
        "--fg": "#171629",
        "--muted": "#4a4967",
        "--accent": "#b42372",
        "--accent-fg": "#ffffff",
        "--border": "#77748e",
        "--focus": "#b42372",
        "--ok": "#185832",
        "--warn": "#684300",
        "--danger": "#8f2029",
        "--radius": "12px",
        "--shadow": "0 8px 22px rgba(0,0,0,.18)"
      },
      "colors": {
        "--bg": "#f4f5ff",
        "--surface": "#ffffff",
        "--accent": "#b42372"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"glitch\"][data-variant=\"alternate\"] #view-painel",
          "signal": "Glitch em exposição clara: superfícies lavanda pálida, tinta índigo, cortes magenta/ciano só em bordas e sinalização, sem distorcer texto. split-screen dashboard with offset color-registration stripe on the hero; text and controls remain stable and aligned.",
          "skillReference": "CSS canônico local styles/glitch.css; validar referências de domínio durante a revisão humana.",
          "evidence": "A contraparte concentra essa direção no layout e nos tokens alternate, com CSS limitado ao stage de glitch."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-columns / areas / gap",
          "before": "Fluxo e distribuição do padrão canônico, preservados integralmente no arquivo styles/glitch.css.",
          "after": "split-screen dashboard with offset color-registration stripe on the hero; text and controls remain stable and aligned.",
          "breakpoints": {
            "320": {
              "before": "layout canônico; viewport 320px",
              "after": "uma coluna, largura minmax(0,1fr), sem overflow horizontal; gap 16px"
            },
            "375": {
              "before": "layout canônico; viewport 375px",
              "after": "uma coluna, componentes com min-width:0 e alvos de toque preservados"
            },
            "768": {
              "before": "layout canônico; viewport 768px",
              "after": "composição ainda empilhada para manter leitura e largura de texto confortável"
            },
            "1280": {
              "before": "layout canônico; viewport 1280px",
              "after": "split-screen dashboard with offset color-registration stripe on the hero; text and controls remain stable and aligned. largura máxima controlada e trilhos alinhados"
            }
          }
        },
        {
          "selector": "#view-painel > .hero",
          "property": "grid / padding / tratamento de superfície",
          "before": "Hero e espaçamentos do padrão canônico sem modificação.",
          "after": "Glitch em exposição clara: superfícies lavanda pálida, tinta índigo, cortes magenta/ciano só em bordas e sinalização, sem distorcer texto. O espaçamento entre blocos é limitado a 24–28px; rótulo, título, texto e ações mantêm intervalos próprios.",
          "breakpoints": {
            "320": {
              "before": "hero canônico",
              "after": "padding 20px 16px; título quebra sem clipping e ações podem ocupar nova linha"
            },
            "375": {
              "before": "hero canônico",
              "after": "padding 22px 18px; largura útil preservada"
            },
            "768": {
              "before": "hero canônico",
              "after": "padding 28px 24px; sem colunas estreitas"
            },
            "1280": {
              "before": "hero canônico",
              "after": "padding 32px; alinhado ao trilho da composição desktop"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "glitch-metric-in",
          "trigger": "Quando o KPI entra na viewport pelo controle IntersectionObserver do runtime.",
          "duration": "500ms ease-out, deslocamento vertical de 5px e opacidade suave.",
          "fallback": "Sem IntersectionObserver, o runtime calcula interseção por geometria; com JavaScript indisponível, KPIs permanecem visíveis.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa animação e transformações; o conteúdo permanece visível.",
          "pauseResume": "Runtime define data-motion-visible somente com elemento visível, documento ativo e movimento não reduzido.",
          "cleanup": "Ao trocar aparência, runtime remove marcadores e observadores; estado final é estático e visível."
        },
        "background": {
          "selector": "#stage::after",
          "animation": "glitch-ambient",
          "trigger": "Camada de fundo sutil enquanto o stage está visível, governada por data-motion-active do runtime.",
          "duration": "28s ease-in-out alternado, movimento horizontal máximo de 0,4% e opacidade baixa.",
          "fallback": "Sem suporte a animações CSS, a textura decorativa permanece estática e o conteúdo não depende dela.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação ambiental e transformações.",
          "pauseResume": "Runtime pausa a camada quando stage/documento não está visível e retoma quando volta a ficar ativo.",
          "cleanup": "A folha alternate remove a camada ao sair; runtime remove listeners e atributos ao trocar o estilo."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage::after",
      "contentDigest": "24eff978c2fb97aa423df1f869296a1ea9fab7aecff90a45209d2d8f946f4b46",
      "generatedDigest": "c4107e30198f28dcd94b29eb4dde256f4f27172c0d49576c0374a8ada58adb65",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "memphis": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/memphis.css",
      "nameKey": "appearance.memphis.alternate.name",
      "descriptionKey": "appearance.memphis.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Noite Geométrica",
          "description": "Memphis geometry becomes a disciplined night poster: indigo field, coral and acid-lime shapes, offset tile composition. Contraparte alternativa escura para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Geometric Afterhours",
          "description": "Memphis geometry becomes a disciplined night poster: indigo field, coral and acid-lime shapes, offset tile composition. This dark counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Geometric Afterhours — alternativa oscura",
          "description": "Memphis geometry becomes a disciplined night poster: indigo field, coral and acid-lime shapes, offset tile composition. Alternativa oscura; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Geometric Afterhours — variante sombre",
          "description": "Memphis geometry becomes a disciplined night poster: indigo field, coral and acid-lime shapes, offset tile composition. Variante sombre; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Geometric Afterhours — dunkle Variante",
          "description": "Memphis geometry becomes a disciplined night poster: indigo field, coral and acid-lime shapes, offset tile composition. Dunkle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Geometric Afterhours — тёмная версия",
          "description": "Memphis geometry becomes a disciplined night poster: indigo field, coral and acid-lime shapes, offset tile composition. Тёмная версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Geometric Afterhours — النسخة الداكنة",
          "description": "Memphis geometry becomes a disciplined night poster: indigo field, coral and acid-lime shapes, offset tile composition. النسخة الداكنة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Geometric Afterhours — गहरा रूप",
          "description": "Memphis geometry becomes a disciplined night poster: indigo field, coral and acid-lime shapes, offset tile composition. गहरा रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Geometric Afterhours — 深色版本",
          "description": "Memphis geometry becomes a disciplined night poster: indigo field, coral and acid-lime shapes, offset tile composition. 深色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Geometric Afterhours — ダーク版",
          "description": "Memphis geometry becomes a disciplined night poster: indigo field, coral and acid-lime shapes, offset tile composition. ダーク版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Geometric Afterhours — 어두운 변형",
          "description": "Memphis geometry becomes a disciplined night poster: indigo field, coral and acid-lime shapes, offset tile composition. 어두운 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#17132B",
        "--surface": "#231D3A",
        "--surface-2": "#332A50",
        "--fg": "#FFF6E8",
        "--muted": "#C8BEDC",
        "--accent": "#FF765E",
        "--accent-fg": "#17132B",
        "--border": "#82749C",
        "--focus": "#8BE56D",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#17132B",
        "--surface": "#231D3A",
        "--accent": "#FF765E"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"memphis\"][data-variant=\"alternate\"] .hero",
          "signal": "Memphis geometry becomes a disciplined night poster: indigo field, coral and acid-lime shapes, offset tile composition. O hero incorpora coral circles and lime zigzags; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/memphis.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/memphis.css."
        },
        {
          "selector": "#stage[data-style=\"memphis\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: geometric pattern; opacidade baixa para não competir com texto.",
          "skillReference": "styles/memphis.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"memphis\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "asymmetric tile board; KPI cards become three offset color blocks. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"memphis\"][data-variant=\"alternate\"] .hero::after",
          "animation": "memphis-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"memphis\"][data-variant=\"alternate\"]::after",
          "animation": "memphis-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"memphis\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"memphis\"][data-variant=\"alternate\"]::after",
      "contentDigest": "f34c343b087b742f23619110bff689984d7e6d9a99d6b4bcd5ee2bc43ef2b8cf",
      "generatedDigest": "8bd52da9d9ab72b6d397c3303e51022f30431478baa09dd364bcfb0127d6b07d",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "weirdcore": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/weirdcore.css",
      "nameKey": "appearance.weirdcore.alternate.name",
      "descriptionKey": "appearance.weirdcore.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Corredor de Serviço",
          "description": "A fluorescent liminal hallway translated into a pale municipal archive: warm concrete, warning red, sparse status labels. Contraparte alternativa clara para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Service Corridor",
          "description": "A fluorescent liminal hallway translated into a pale municipal archive: warm concrete, warning red, sparse status labels. This light counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Service Corridor — alternativa clara",
          "description": "A fluorescent liminal hallway translated into a pale municipal archive: warm concrete, warning red, sparse status labels. Alternativa clara; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Service Corridor — variante claire",
          "description": "A fluorescent liminal hallway translated into a pale municipal archive: warm concrete, warning red, sparse status labels. Variante claire; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Service Corridor — helle Variante",
          "description": "A fluorescent liminal hallway translated into a pale municipal archive: warm concrete, warning red, sparse status labels. Helle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Service Corridor — светлая версия",
          "description": "A fluorescent liminal hallway translated into a pale municipal archive: warm concrete, warning red, sparse status labels. Светлая версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Service Corridor — النسخة الفاتحة",
          "description": "A fluorescent liminal hallway translated into a pale municipal archive: warm concrete, warning red, sparse status labels. النسخة الفاتحة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Service Corridor — हल्का रूप",
          "description": "A fluorescent liminal hallway translated into a pale municipal archive: warm concrete, warning red, sparse status labels. हल्का रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Service Corridor — 浅色版本",
          "description": "A fluorescent liminal hallway translated into a pale municipal archive: warm concrete, warning red, sparse status labels. 浅色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Service Corridor — ライト版",
          "description": "A fluorescent liminal hallway translated into a pale municipal archive: warm concrete, warning red, sparse status labels. ライト版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Service Corridor — 밝은 변형",
          "description": "A fluorescent liminal hallway translated into a pale municipal archive: warm concrete, warning red, sparse status labels. 밝은 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#E7E1D5",
        "--surface": "#F7F3EA",
        "--surface-2": "#D8D0C1",
        "--fg": "#211F1B",
        "--muted": "#514C43",
        "--accent": "#A52D24",
        "--accent-fg": "#FFFFFF",
        "--border": "#797267",
        "--focus": "#075D78",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#E7E1D5",
        "--surface": "#F7F3EA",
        "--accent": "#A52D24"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"weirdcore\"][data-variant=\"alternate\"] .hero",
          "signal": "A fluorescent liminal hallway translated into a pale municipal archive: warm concrete, warning red, sparse status labels. O hero incorpora small red exit marker; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/weirdcore.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/weirdcore.css."
        },
        {
          "selector": "#stage[data-style=\"weirdcore\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: grainless corridor lines; opacidade baixa para não competir com texto.",
          "skillReference": "styles/weirdcore.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"weirdcore\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "narrow corridor masthead with a single warning rail; metrics in a compact strip. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"weirdcore\"][data-variant=\"alternate\"] .hero::after",
          "animation": "weirdcore-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"weirdcore\"][data-variant=\"alternate\"]::after",
          "animation": "weirdcore-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"weirdcore\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"weirdcore\"][data-variant=\"alternate\"]::after",
      "contentDigest": "c98f405a7d9c6cfa66da0ca904225f79b5771424f02063543cbaa6c2a03945a7",
      "generatedDigest": "3f1ec3e1b2736438fefed4f19ecf93331bd4392e55cf8d5eefa6df644e6ed4f1",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "dreamcore": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/dreamcore.css",
      "nameKey": "appearance.dreamcore.alternate.name",
      "descriptionKey": "appearance.dreamcore.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Sonho ao Entardecer",
          "description": "Dreamcore shifts to a twilight blue hour: powder periwinkle, muted rose and a soft lemon moon, preserving gentle surreal calm. Contraparte alternativa escura para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Dusk Dream",
          "description": "Dreamcore shifts to a twilight blue hour: powder periwinkle, muted rose and a soft lemon moon, preserving gentle surreal calm. This dark counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Dusk Dream — alternativa oscura",
          "description": "Dreamcore shifts to a twilight blue hour: powder periwinkle, muted rose and a soft lemon moon, preserving gentle surreal calm. Alternativa oscura; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Dusk Dream — variante sombre",
          "description": "Dreamcore shifts to a twilight blue hour: powder periwinkle, muted rose and a soft lemon moon, preserving gentle surreal calm. Variante sombre; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Dusk Dream — dunkle Variante",
          "description": "Dreamcore shifts to a twilight blue hour: powder periwinkle, muted rose and a soft lemon moon, preserving gentle surreal calm. Dunkle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Dusk Dream — тёмная версия",
          "description": "Dreamcore shifts to a twilight blue hour: powder periwinkle, muted rose and a soft lemon moon, preserving gentle surreal calm. Тёмная версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Dusk Dream — النسخة الداكنة",
          "description": "Dreamcore shifts to a twilight blue hour: powder periwinkle, muted rose and a soft lemon moon, preserving gentle surreal calm. النسخة الداكنة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Dusk Dream — गहरा रूप",
          "description": "Dreamcore shifts to a twilight blue hour: powder periwinkle, muted rose and a soft lemon moon, preserving gentle surreal calm. गहरा रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Dusk Dream — 深色版本",
          "description": "Dreamcore shifts to a twilight blue hour: powder periwinkle, muted rose and a soft lemon moon, preserving gentle surreal calm. 深色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Dusk Dream — ダーク版",
          "description": "Dreamcore shifts to a twilight blue hour: powder periwinkle, muted rose and a soft lemon moon, preserving gentle surreal calm. ダーク版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Dusk Dream — 어두운 변형",
          "description": "Dreamcore shifts to a twilight blue hour: powder periwinkle, muted rose and a soft lemon moon, preserving gentle surreal calm. 어두운 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#26263E",
        "--surface": "#34334F",
        "--surface-2": "#47445F",
        "--fg": "#F7F1F4",
        "--muted": "#D2C9DB",
        "--accent": "#D7A0B0",
        "--accent-fg": "#28263A",
        "--border": "#9594A6",
        "--focus": "#E7CB76",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#26263E",
        "--surface": "#34334F",
        "--accent": "#D7A0B0"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"dreamcore\"][data-variant=\"alternate\"] .hero",
          "signal": "Dreamcore shifts to a twilight blue hour: powder periwinkle, muted rose and a soft lemon moon, preserving gentle surreal calm. O hero incorpora moon halo drifts gently; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/dreamcore.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/dreamcore.css."
        },
        {
          "selector": "#stage[data-style=\"dreamcore\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: cloud horizon; opacidade baixa para não competir com texto.",
          "skillReference": "styles/dreamcore.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"dreamcore\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "centered dream title over a low horizon; metrics float in a two-by-two constellation. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"dreamcore\"][data-variant=\"alternate\"] .hero::after",
          "animation": "dreamcore-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"dreamcore\"][data-variant=\"alternate\"]::after",
          "animation": "dreamcore-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"dreamcore\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"dreamcore\"][data-variant=\"alternate\"]::after",
      "contentDigest": "b97ed43f12338712c9fc66b5a623f0490fa606e4802bb2b07471ee7b0a388d9e",
      "generatedDigest": "d8b62df45c799e8d5c89ebd2f2f1a000d73272fd1c4129e145235c3b058b554d",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "editorial-archive-luxury": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/editorial-archive-luxury.css",
      "nameKey": "appearance.editorial-archive-luxury.alternate.name",
      "descriptionKey": "appearance.editorial-archive-luxury.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Arquivo de Ônix",
          "description": "A gallery night edition: ink-black canvas, ivory type, restrained antique gold and a narrow catalog rail. Contraparte alternativa escura para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Onyx Archive",
          "description": "A gallery night edition: ink-black canvas, ivory type, restrained antique gold and a narrow catalog rail. This dark counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Onyx Archive — alternativa oscura",
          "description": "A gallery night edition: ink-black canvas, ivory type, restrained antique gold and a narrow catalog rail. Alternativa oscura; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Onyx Archive — variante sombre",
          "description": "A gallery night edition: ink-black canvas, ivory type, restrained antique gold and a narrow catalog rail. Variante sombre; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Onyx Archive — dunkle Variante",
          "description": "A gallery night edition: ink-black canvas, ivory type, restrained antique gold and a narrow catalog rail. Dunkle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Onyx Archive — тёмная версия",
          "description": "A gallery night edition: ink-black canvas, ivory type, restrained antique gold and a narrow catalog rail. Тёмная версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Onyx Archive — النسخة الداكنة",
          "description": "A gallery night edition: ink-black canvas, ivory type, restrained antique gold and a narrow catalog rail. النسخة الداكنة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Onyx Archive — गहरा रूप",
          "description": "A gallery night edition: ink-black canvas, ivory type, restrained antique gold and a narrow catalog rail. गहरा रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Onyx Archive — 深色版本",
          "description": "A gallery night edition: ink-black canvas, ivory type, restrained antique gold and a narrow catalog rail. 深色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Onyx Archive — ダーク版",
          "description": "A gallery night edition: ink-black canvas, ivory type, restrained antique gold and a narrow catalog rail. ダーク版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Onyx Archive — 어두운 변형",
          "description": "A gallery night edition: ink-black canvas, ivory type, restrained antique gold and a narrow catalog rail. 어두운 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#171614",
        "--surface": "#24211E",
        "--surface-2": "#332E28",
        "--fg": "#F4EFE5",
        "--muted": "#C9C0B3",
        "--accent": "#C49A55",
        "--accent-fg": "#211D18",
        "--border": "#887E70",
        "--focus": "#83A9A1",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#171614",
        "--surface": "#24211E",
        "--accent": "#C49A55"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"editorial-archive-luxury\"][data-variant=\"alternate\"] .hero",
          "signal": "A gallery night edition: ink-black canvas, ivory type, restrained antique gold and a narrow catalog rail. O hero incorpora gold rule advances across title; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/editorial-archive-luxury.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/editorial-archive-luxury.css."
        },
        {
          "selector": "#stage[data-style=\"editorial-archive-luxury\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: gallery frame; opacidade baixa para não competir com texto.",
          "skillReference": "styles/editorial-archive-luxury.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"editorial-archive-luxury\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "two-column gallery spread with oversized serif title and side metadata. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"editorial-archive-luxury\"][data-variant=\"alternate\"] .hero::after",
          "animation": "editorial-archive-luxury-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"editorial-archive-luxury\"][data-variant=\"alternate\"]::after",
          "animation": "editorial-archive-luxury-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"editorial-archive-luxury\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"editorial-archive-luxury\"][data-variant=\"alternate\"]::after",
      "contentDigest": "144178d8fc355b950e105dbdcddc51994eeb9b029c4373c7614c2cf0331f993e",
      "generatedDigest": "452d720e351c087ef7c3e04f9ee34a0c2852806c1ba85272b9b52bc6e8bd883d",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "analog-newspaper-broadsheet": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/analog-newspaper-broadsheet.css",
      "nameKey": "appearance.analog-newspaper-broadsheet.alternate.name",
      "descriptionKey": "appearance.analog-newspaper-broadsheet.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Gazeta da Meia-Noite",
          "description": "A dark letterpress broadsheet: charcoal newsprint, bone paper panels, signal vermilion and strict column rules. Contraparte alternativa escura para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Midnight Gazette",
          "description": "A dark letterpress broadsheet: charcoal newsprint, bone paper panels, signal vermilion and strict column rules. This dark counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Midnight Gazette — alternativa oscura",
          "description": "A dark letterpress broadsheet: charcoal newsprint, bone paper panels, signal vermilion and strict column rules. Alternativa oscura; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Midnight Gazette — variante sombre",
          "description": "A dark letterpress broadsheet: charcoal newsprint, bone paper panels, signal vermilion and strict column rules. Variante sombre; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Midnight Gazette — dunkle Variante",
          "description": "A dark letterpress broadsheet: charcoal newsprint, bone paper panels, signal vermilion and strict column rules. Dunkle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Midnight Gazette — тёмная версия",
          "description": "A dark letterpress broadsheet: charcoal newsprint, bone paper panels, signal vermilion and strict column rules. Тёмная версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Midnight Gazette — النسخة الداكنة",
          "description": "A dark letterpress broadsheet: charcoal newsprint, bone paper panels, signal vermilion and strict column rules. النسخة الداكنة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Midnight Gazette — गहरा रूप",
          "description": "A dark letterpress broadsheet: charcoal newsprint, bone paper panels, signal vermilion and strict column rules. गहरा रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Midnight Gazette — 深色版本",
          "description": "A dark letterpress broadsheet: charcoal newsprint, bone paper panels, signal vermilion and strict column rules. 深色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Midnight Gazette — ダーク版",
          "description": "A dark letterpress broadsheet: charcoal newsprint, bone paper panels, signal vermilion and strict column rules. ダーク版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Midnight Gazette — 어두운 변형",
          "description": "A dark letterpress broadsheet: charcoal newsprint, bone paper panels, signal vermilion and strict column rules. 어두운 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#171918",
        "--surface": "#232624",
        "--surface-2": "#303633",
        "--fg": "#F3EFE5",
        "--muted": "#C6C2B7",
        "--accent": "#E05A43",
        "--accent-fg": "#171918",
        "--border": "#7C817B",
        "--focus": "#6FABC2",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#171918",
        "--surface": "#232624",
        "--accent": "#E05A43"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"analog-newspaper-broadsheet\"][data-variant=\"alternate\"] .hero",
          "signal": "A dark letterpress broadsheet: charcoal newsprint, bone paper panels, signal vermilion and strict column rules. O hero incorpora ticker underline slides; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/analog-newspaper-broadsheet.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/analog-newspaper-broadsheet.css."
        },
        {
          "selector": "#stage[data-style=\"analog-newspaper-broadsheet\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: press registration marks; opacidade baixa para não competir com texto.",
          "skillReference": "styles/analog-newspaper-broadsheet.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"analog-newspaper-broadsheet\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "masthead and article columns; metrics reorganized as a narrow ticker beneath the headline. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"analog-newspaper-broadsheet\"][data-variant=\"alternate\"] .hero::after",
          "animation": "analog-newspaper-broadsheet-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"analog-newspaper-broadsheet\"][data-variant=\"alternate\"]::after",
          "animation": "analog-newspaper-broadsheet-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"analog-newspaper-broadsheet\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"analog-newspaper-broadsheet\"][data-variant=\"alternate\"]::after",
      "contentDigest": "e4282b6e2ef0f53c933cd22e712c0ffa8d106d7ff0a4e238b1cadc5d8fd964ef",
      "generatedDigest": "26b0d791adf0e4bc87daa6e4ece72d59e33eb9914252a15a49556769d510afe6",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "expressive-variable-typography": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/expressive-variable-typography.css",
      "nameKey": "appearance.expressive-variable-typography.alternate.name",
      "descriptionKey": "appearance.expressive-variable-typography.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Tipo em Contraluz",
          "description": "A dark typographic specimen with warm ivory type and electric ultramarine controls; huge type is isolated in a specimen column. Contraparte alternativa escura para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Type in Counterlight",
          "description": "A dark typographic specimen with warm ivory type and electric ultramarine controls; huge type is isolated in a specimen column. This dark counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Type in Counterlight — alternativa oscura",
          "description": "A dark typographic specimen with warm ivory type and electric ultramarine controls; huge type is isolated in a specimen column. Alternativa oscura; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Type in Counterlight — variante sombre",
          "description": "A dark typographic specimen with warm ivory type and electric ultramarine controls; huge type is isolated in a specimen column. Variante sombre; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Type in Counterlight — dunkle Variante",
          "description": "A dark typographic specimen with warm ivory type and electric ultramarine controls; huge type is isolated in a specimen column. Dunkle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Type in Counterlight — тёмная версия",
          "description": "A dark typographic specimen with warm ivory type and electric ultramarine controls; huge type is isolated in a specimen column. Тёмная версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Type in Counterlight — النسخة الداكنة",
          "description": "A dark typographic specimen with warm ivory type and electric ultramarine controls; huge type is isolated in a specimen column. النسخة الداكنة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Type in Counterlight — गहरा रूप",
          "description": "A dark typographic specimen with warm ivory type and electric ultramarine controls; huge type is isolated in a specimen column. गहरा रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Type in Counterlight — 深色版本",
          "description": "A dark typographic specimen with warm ivory type and electric ultramarine controls; huge type is isolated in a specimen column. 深色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Type in Counterlight — ダーク版",
          "description": "A dark typographic specimen with warm ivory type and electric ultramarine controls; huge type is isolated in a specimen column. ダーク版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Type in Counterlight — 어두운 변형",
          "description": "A dark typographic specimen with warm ivory type and electric ultramarine controls; huge type is isolated in a specimen column. 어두운 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#1B1C20",
        "--surface": "#27292F",
        "--surface-2": "#363840",
        "--fg": "#F5F2E9",
        "--muted": "#C5C3BD",
        "--accent": "#8FA2FF",
        "--accent-fg": "#17191D",
        "--border": "#81838C",
        "--focus": "#E6B65C",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#1B1C20",
        "--surface": "#27292F",
        "--accent": "#8FA2FF"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"expressive-variable-typography\"][data-variant=\"alternate\"] .hero",
          "signal": "A dark typographic specimen with warm ivory type and electric ultramarine controls; huge type is isolated in a specimen column. O hero incorpora weight axis settles in 450ms; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/expressive-variable-typography.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/expressive-variable-typography.css."
        },
        {
          "selector": "#stage[data-style=\"expressive-variable-typography\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: specimen registration ticks; opacidade baixa para não competir com texto.",
          "skillReference": "styles/expressive-variable-typography.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"expressive-variable-typography\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "one expressive specimen column plus a compact utility rail; controls grouped in a typographic index. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"expressive-variable-typography\"][data-variant=\"alternate\"] .hero::after",
          "animation": "expressive-variable-typography-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"expressive-variable-typography\"][data-variant=\"alternate\"]::after",
          "animation": "expressive-variable-typography-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"expressive-variable-typography\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"expressive-variable-typography\"][data-variant=\"alternate\"]::after",
      "contentDigest": "54f2a3813b3c2ba3bc775206fb2ad7a300fe2259b7e496f5e685674ec6fbe79c",
      "generatedDigest": "92dfc2254fef61fe7508bfb48b2eba2fa146170b7573d36ead9348ca098ed9a8",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "kinetic-typography": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/kinetic-typography.css",
      "nameKey": "appearance.kinetic-typography.alternate.name",
      "descriptionKey": "appearance.kinetic-typography.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Letreiro de Papel",
          "description": "The black ticker becomes a sunlit print studio: cream stock, carbon ink, vermilion signal and a fixed editorial ribbon. Contraparte alternativa clara para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Paper Marquee",
          "description": "The black ticker becomes a sunlit print studio: cream stock, carbon ink, vermilion signal and a fixed editorial ribbon. This light counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Paper Marquee — alternativa clara",
          "description": "The black ticker becomes a sunlit print studio: cream stock, carbon ink, vermilion signal and a fixed editorial ribbon. Alternativa clara; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Paper Marquee — variante claire",
          "description": "The black ticker becomes a sunlit print studio: cream stock, carbon ink, vermilion signal and a fixed editorial ribbon. Variante claire; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Paper Marquee — helle Variante",
          "description": "The black ticker becomes a sunlit print studio: cream stock, carbon ink, vermilion signal and a fixed editorial ribbon. Helle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Paper Marquee — светлая версия",
          "description": "The black ticker becomes a sunlit print studio: cream stock, carbon ink, vermilion signal and a fixed editorial ribbon. Светлая версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Paper Marquee — النسخة الفاتحة",
          "description": "The black ticker becomes a sunlit print studio: cream stock, carbon ink, vermilion signal and a fixed editorial ribbon. النسخة الفاتحة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Paper Marquee — हल्का रूप",
          "description": "The black ticker becomes a sunlit print studio: cream stock, carbon ink, vermilion signal and a fixed editorial ribbon. हल्का रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Paper Marquee — 浅色版本",
          "description": "The black ticker becomes a sunlit print studio: cream stock, carbon ink, vermilion signal and a fixed editorial ribbon. 浅色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Paper Marquee — ライト版",
          "description": "The black ticker becomes a sunlit print studio: cream stock, carbon ink, vermilion signal and a fixed editorial ribbon. ライト版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Paper Marquee — 밝은 변형",
          "description": "The black ticker becomes a sunlit print studio: cream stock, carbon ink, vermilion signal and a fixed editorial ribbon. 밝은 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#F1EBDD",
        "--surface": "#FFF9EA",
        "--surface-2": "#E5D9C4",
        "--fg": "#201A18",
        "--muted": "#595047",
        "--accent": "#C3412E",
        "--accent-fg": "#FFFFFF",
        "--border": "#82776B",
        "--focus": "#126C78",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#F1EBDD",
        "--surface": "#FFF9EA",
        "--accent": "#C3412E"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"kinetic-typography\"][data-variant=\"alternate\"] .hero",
          "signal": "The black ticker becomes a sunlit print studio: cream stock, carbon ink, vermilion signal and a fixed editorial ribbon. O hero incorpora headline underline glides; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/kinetic-typography.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/kinetic-typography.css."
        },
        {
          "selector": "#stage[data-style=\"kinetic-typography\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: static marquee stripes; opacidade baixa para não competir com texto.",
          "skillReference": "styles/kinetic-typography.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"kinetic-typography\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "headline ribbon spans the canvas; supporting content in tightly grouped horizontal bands. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"kinetic-typography\"][data-variant=\"alternate\"] .hero::after",
          "animation": "kinetic-typography-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"kinetic-typography\"][data-variant=\"alternate\"]::after",
          "animation": "kinetic-typography-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"kinetic-typography\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"kinetic-typography\"][data-variant=\"alternate\"]::after",
      "contentDigest": "fb4cbd195c4b0594d8d687382c8ae2ba27664d0aedc022e20710429458695f48",
      "generatedDigest": "7c1ea81fdbabc7e91dbe4854f9097b4eb07b767be4ab8886626b5fe46aaf9ccb",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "risograph": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/risograph.css",
      "nameKey": "appearance.risograph.alternate.name",
      "descriptionKey": "appearance.risograph.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Riso Azul de Oficina",
          "description": "A deep ink studio edition with ink-dark panels with hot pink spot ink, visible registration offsets and no fluorescent overprint. Contraparte alternativa escura para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Workshop Blue Riso",
          "description": "A deep ink studio edition with ink-dark panels with hot pink spot ink, visible registration offsets and no fluorescent overprint. This dark counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Workshop Blue Riso — alternativa oscura",
          "description": "A deep ink studio edition with ink-dark panels with hot pink spot ink, visible registration offsets and no fluorescent overprint. Alternativa oscura; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Workshop Blue Riso — variante sombre",
          "description": "A deep ink studio edition with ink-dark panels with hot pink spot ink, visible registration offsets and no fluorescent overprint. Variante sombre; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Workshop Blue Riso — dunkle Variante",
          "description": "A deep ink studio edition with ink-dark panels with hot pink spot ink, visible registration offsets and no fluorescent overprint. Dunkle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Workshop Blue Riso — тёмная версия",
          "description": "A deep ink studio edition with ink-dark panels with hot pink spot ink, visible registration offsets and no fluorescent overprint. Тёмная версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Workshop Blue Riso — النسخة الداكنة",
          "description": "A deep ink studio edition with ink-dark panels with hot pink spot ink, visible registration offsets and no fluorescent overprint. النسخة الداكنة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Workshop Blue Riso — गहरा रूप",
          "description": "A deep ink studio edition with ink-dark panels with hot pink spot ink, visible registration offsets and no fluorescent overprint. गहरा रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Workshop Blue Riso — 深色版本",
          "description": "A deep ink studio edition with ink-dark panels with hot pink spot ink, visible registration offsets and no fluorescent overprint. 深色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Workshop Blue Riso — ダーク版",
          "description": "A deep ink studio edition with ink-dark panels with hot pink spot ink, visible registration offsets and no fluorescent overprint. ダーク版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Workshop Blue Riso — 어두운 변형",
          "description": "A deep ink studio edition with ink-dark panels with hot pink spot ink, visible registration offsets and no fluorescent overprint. 어두운 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#211E27",
        "--surface": "#2D2934",
        "--surface-2": "#3B3542",
        "--fg": "#FBF5E9",
        "--muted": "#D2C8B9",
        "--accent": "#FF48B0",
        "--accent-fg": "#17151B",
        "--border": "#8D8490",
        "--focus": "#FF85C8",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#211E27",
        "--surface": "#2D2934",
        "--accent": "#FF48B0"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"risograph\"][data-variant=\"alternate\"] .hero",
          "signal": "A deep ink studio edition with ink-dark panels with hot pink spot ink, visible registration offsets and no fluorescent overprint. O hero incorpora registration cross shifts 2px; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/risograph.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/risograph.css."
        },
        {
          "selector": "#stage[data-style=\"risograph\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: halftone dots; opacidade baixa para não competir com texto.",
          "skillReference": "styles/risograph.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"risograph\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "two-ink poster header over a modular print grid; KPI tiles align as ink plates. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"risograph\"][data-variant=\"alternate\"] .hero::after",
          "animation": "risograph-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"risograph\"][data-variant=\"alternate\"]::after",
          "animation": "risograph-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"risograph\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"risograph\"][data-variant=\"alternate\"]::after",
      "contentDigest": "9767539c9c0644a6c45022e40b530a22aff4f64efe71972d636f6273d0a6213c",
      "generatedDigest": "96a7549d9d5e45cfb0461c299eabd5bd14e4a4750646366bac525ad322fe1bbd",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "zine-independent": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/zine-independent.css",
      "nameKey": "appearance.zine-independent.alternate.name",
      "descriptionKey": "appearance.zine-independent.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Xerox de Arquivo",
          "description": "A midnight xerox wall with paper-white type, safety orange cutouts and taped editorial labels; rebellious collage remains orderly. Contraparte alternativa escura para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Archive Xerox",
          "description": "A midnight xerox wall with paper-white type, safety orange cutouts and taped editorial labels; rebellious collage remains orderly. This dark counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Archive Xerox — alternativa oscura",
          "description": "A midnight xerox wall with paper-white type, safety orange cutouts and taped editorial labels; rebellious collage remains orderly. Alternativa oscura; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Archive Xerox — variante sombre",
          "description": "A midnight xerox wall with paper-white type, safety orange cutouts and taped editorial labels; rebellious collage remains orderly. Variante sombre; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Archive Xerox — dunkle Variante",
          "description": "A midnight xerox wall with paper-white type, safety orange cutouts and taped editorial labels; rebellious collage remains orderly. Dunkle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Archive Xerox — тёмная версия",
          "description": "A midnight xerox wall with paper-white type, safety orange cutouts and taped editorial labels; rebellious collage remains orderly. Тёмная версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Archive Xerox — النسخة الداكنة",
          "description": "A midnight xerox wall with paper-white type, safety orange cutouts and taped editorial labels; rebellious collage remains orderly. النسخة الداكنة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Archive Xerox — गहरा रूप",
          "description": "A midnight xerox wall with paper-white type, safety orange cutouts and taped editorial labels; rebellious collage remains orderly. गहरा रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Archive Xerox — 深色版本",
          "description": "A midnight xerox wall with paper-white type, safety orange cutouts and taped editorial labels; rebellious collage remains orderly. 深色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Archive Xerox — ダーク版",
          "description": "A midnight xerox wall with paper-white type, safety orange cutouts and taped editorial labels; rebellious collage remains orderly. ダーク版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Archive Xerox — 어두운 변형",
          "description": "A midnight xerox wall with paper-white type, safety orange cutouts and taped editorial labels; rebellious collage remains orderly. 어두운 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#202020",
        "--surface": "#2B2A28",
        "--surface-2": "#393735",
        "--fg": "#FFF6E9",
        "--muted": "#D0C9BC",
        "--accent": "#F27430",
        "--accent-fg": "#191817",
        "--border": "#8B8478",
        "--focus": "#79ACE6",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#202020",
        "--surface": "#2B2A28",
        "--accent": "#F27430"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"zine-independent\"][data-variant=\"alternate\"] .hero",
          "signal": "A midnight xerox wall with paper-white type, safety orange cutouts and taped editorial labels; rebellious collage remains orderly. O hero incorpora paper tab flips once; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/zine-independent.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/zine-independent.css."
        },
        {
          "selector": "#stage[data-style=\"zine-independent\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: xerox grain; opacidade baixa para não competir com texto.",
          "skillReference": "styles/zine-independent.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"zine-independent\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "collaged headline left, evidence strips right; forms grouped like clipped notes. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"zine-independent\"][data-variant=\"alternate\"] .hero::after",
          "animation": "zine-independent-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"zine-independent\"][data-variant=\"alternate\"]::after",
          "animation": "zine-independent-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"zine-independent\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"zine-independent\"][data-variant=\"alternate\"]::after",
      "contentDigest": "992d79d04d3b0215896697ee38d5c013785baf90777b203c6c368cf4d2532c72",
      "generatedDigest": "886d0db8a11dc1d9f08fd7ef39f8303e86b0c3e0dca737b40e56edd6970a0ed2",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "collage-scrapbook": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/collage-scrapbook.css",
      "nameKey": "appearance.collage-scrapbook.alternate.name",
      "descriptionKey": "appearance.collage-scrapbook.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Caderno Noturno",
          "description": "A midnight scrapbook of deep plum paper, warm vellum, muted marigold tape and layered keepsake panels. Contraparte alternativa escura para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Night Scrapbook",
          "description": "A midnight scrapbook of deep plum paper, warm vellum, muted marigold tape and layered keepsake panels. This dark counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Night Scrapbook — alternativa oscura",
          "description": "A midnight scrapbook of deep plum paper, warm vellum, muted marigold tape and layered keepsake panels. Alternativa oscura; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Night Scrapbook — variante sombre",
          "description": "A midnight scrapbook of deep plum paper, warm vellum, muted marigold tape and layered keepsake panels. Variante sombre; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Night Scrapbook — dunkle Variante",
          "description": "A midnight scrapbook of deep plum paper, warm vellum, muted marigold tape and layered keepsake panels. Dunkle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Night Scrapbook — тёмная версия",
          "description": "A midnight scrapbook of deep plum paper, warm vellum, muted marigold tape and layered keepsake panels. Тёмная версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Night Scrapbook — النسخة الداكنة",
          "description": "A midnight scrapbook of deep plum paper, warm vellum, muted marigold tape and layered keepsake panels. النسخة الداكنة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Night Scrapbook — गहरा रूप",
          "description": "A midnight scrapbook of deep plum paper, warm vellum, muted marigold tape and layered keepsake panels. गहरा रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Night Scrapbook — 深色版本",
          "description": "A midnight scrapbook of deep plum paper, warm vellum, muted marigold tape and layered keepsake panels. 深色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Night Scrapbook — ダーク版",
          "description": "A midnight scrapbook of deep plum paper, warm vellum, muted marigold tape and layered keepsake panels. ダーク版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Night Scrapbook — 어두운 변형",
          "description": "A midnight scrapbook of deep plum paper, warm vellum, muted marigold tape and layered keepsake panels. 어두운 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#29232C",
        "--surface": "#39313C",
        "--surface-2": "#4A414B",
        "--fg": "#FFF5E5",
        "--muted": "#D7CDBD",
        "--accent": "#BC7D39",
        "--accent-fg": "#241F28",
        "--border": "#978E97",
        "--focus": "#7197A2",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#29232C",
        "--surface": "#39313C",
        "--accent": "#BC7D39"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"collage-scrapbook\"][data-variant=\"alternate\"] .hero",
          "signal": "A midnight scrapbook of deep plum paper, warm vellum, muted marigold tape and layered keepsake panels. O hero incorpora paper edge eases into place; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/collage-scrapbook.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/collage-scrapbook.css."
        },
        {
          "selector": "#stage[data-style=\"collage-scrapbook\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: paper fibers; opacidade baixa para não competir com texto.",
          "skillReference": "styles/collage-scrapbook.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"collage-scrapbook\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "overlapping paper layers form a two-column spread; photos and notes alternate sides. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"collage-scrapbook\"][data-variant=\"alternate\"] .hero::after",
          "animation": "collage-scrapbook-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"collage-scrapbook\"][data-variant=\"alternate\"]::after",
          "animation": "collage-scrapbook-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"collage-scrapbook\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"collage-scrapbook\"][data-variant=\"alternate\"]::after",
      "contentDigest": "974d0bcf2ce607bf0453492832513ea0f66e5b1bd833d3b09d22bfa384a7b4e6",
      "generatedDigest": "d58dc9f90b9dbb8393ed06fe11d6c239540f1e9fc3ebb7f510c85c2bf182da2f",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "hand-drawn-sketch": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/hand-drawn-sketch.css",
      "nameKey": "appearance.hand-drawn-sketch.alternate.name",
      "descriptionKey": "appearance.hand-drawn-sketch.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Caderno de Grafite",
          "description": "A graphite night study: slate paper, chalk linework and restrained ochre pencil marks; hand-drawn wobble stays subtle. Contraparte alternativa escura para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Graphite Sketchbook",
          "description": "A graphite night study: slate paper, chalk linework and restrained ochre pencil marks; hand-drawn wobble stays subtle. This dark counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Graphite Sketchbook — alternativa oscura",
          "description": "A graphite night study: slate paper, chalk linework and restrained ochre pencil marks; hand-drawn wobble stays subtle. Alternativa oscura; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Graphite Sketchbook — variante sombre",
          "description": "A graphite night study: slate paper, chalk linework and restrained ochre pencil marks; hand-drawn wobble stays subtle. Variante sombre; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Graphite Sketchbook — dunkle Variante",
          "description": "A graphite night study: slate paper, chalk linework and restrained ochre pencil marks; hand-drawn wobble stays subtle. Dunkle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Graphite Sketchbook — тёмная версия",
          "description": "A graphite night study: slate paper, chalk linework and restrained ochre pencil marks; hand-drawn wobble stays subtle. Тёмная версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Graphite Sketchbook — النسخة الداكنة",
          "description": "A graphite night study: slate paper, chalk linework and restrained ochre pencil marks; hand-drawn wobble stays subtle. النسخة الداكنة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Graphite Sketchbook — गहरा रूप",
          "description": "A graphite night study: slate paper, chalk linework and restrained ochre pencil marks; hand-drawn wobble stays subtle. गहरा रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Graphite Sketchbook — 深色版本",
          "description": "A graphite night study: slate paper, chalk linework and restrained ochre pencil marks; hand-drawn wobble stays subtle. 深色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Graphite Sketchbook — ダーク版",
          "description": "A graphite night study: slate paper, chalk linework and restrained ochre pencil marks; hand-drawn wobble stays subtle. ダーク版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Graphite Sketchbook — 어두운 변형",
          "description": "A graphite night study: slate paper, chalk linework and restrained ochre pencil marks; hand-drawn wobble stays subtle. 어두운 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#24272A",
        "--surface": "#303438",
        "--surface-2": "#3D4246",
        "--fg": "#F5F0E5",
        "--muted": "#C6C2B9",
        "--accent": "#D2A451",
        "--accent-fg": "#26292C",
        "--border": "#8C8F8F",
        "--focus": "#7BB4A0",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#24272A",
        "--surface": "#303438",
        "--accent": "#D2A451"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"hand-drawn-sketch\"][data-variant=\"alternate\"] .hero",
          "signal": "A graphite night study: slate paper, chalk linework and restrained ochre pencil marks; hand-drawn wobble stays subtle. O hero incorpora pencil stroke draws in; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/hand-drawn-sketch.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/hand-drawn-sketch.css."
        },
        {
          "selector": "#stage[data-style=\"hand-drawn-sketch\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: paper crosshatch; opacidade baixa para não competir com texto.",
          "skillReference": "styles/hand-drawn-sketch.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"hand-drawn-sketch\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "notebook split between annotated drawing area and notes; forms become ruled study fields. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"hand-drawn-sketch\"][data-variant=\"alternate\"] .hero::after",
          "animation": "hand-drawn-sketch-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"hand-drawn-sketch\"][data-variant=\"alternate\"]::after",
          "animation": "hand-drawn-sketch-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"hand-drawn-sketch\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"hand-drawn-sketch\"][data-variant=\"alternate\"]::after",
      "contentDigest": "961d9cafe4d2a46734df20570a6c1697adfa52357bd79ea3156d008a4ade8727",
      "generatedDigest": "3d1f968e54615ad391147cfc6e1d4d6bf0a80cdc1466fb4065929e84d5ddac21",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "art-deco": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/art-deco.css",
      "nameKey": "appearance.art-deco.alternate.name",
      "descriptionKey": "appearance.art-deco.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Salão de Mármore",
          "description": "The Deco night palette turns to pale limestone with black lacquer and emerald accents; symmetry and stepped geometry stay intact. Contraparte alternativa clara para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Marble Salon",
          "description": "The Deco night palette turns to pale limestone with black lacquer and emerald accents; symmetry and stepped geometry stay intact. This light counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Marble Salon — alternativa clara",
          "description": "The Deco night palette turns to pale limestone with black lacquer and emerald accents; symmetry and stepped geometry stay intact. Alternativa clara; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Marble Salon — variante claire",
          "description": "The Deco night palette turns to pale limestone with black lacquer and emerald accents; symmetry and stepped geometry stay intact. Variante claire; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Marble Salon — helle Variante",
          "description": "The Deco night palette turns to pale limestone with black lacquer and emerald accents; symmetry and stepped geometry stay intact. Helle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Marble Salon — светлая версия",
          "description": "The Deco night palette turns to pale limestone with black lacquer and emerald accents; symmetry and stepped geometry stay intact. Светлая версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Marble Salon — النسخة الفاتحة",
          "description": "The Deco night palette turns to pale limestone with black lacquer and emerald accents; symmetry and stepped geometry stay intact. النسخة الفاتحة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Marble Salon — हल्का रूप",
          "description": "The Deco night palette turns to pale limestone with black lacquer and emerald accents; symmetry and stepped geometry stay intact. हल्का रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Marble Salon — 浅色版本",
          "description": "The Deco night palette turns to pale limestone with black lacquer and emerald accents; symmetry and stepped geometry stay intact. 浅色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Marble Salon — ライト版",
          "description": "The Deco night palette turns to pale limestone with black lacquer and emerald accents; symmetry and stepped geometry stay intact. ライト版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Marble Salon — 밝은 변형",
          "description": "The Deco night palette turns to pale limestone with black lacquer and emerald accents; symmetry and stepped geometry stay intact. 밝은 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#F0E8D8",
        "--surface": "#FBF5E9",
        "--surface-2": "#E3D4BA",
        "--fg": "#181A1D",
        "--muted": "#514A40",
        "--accent": "#17694F",
        "--accent-fg": "#FFFFFF",
        "--border": "#7F7567",
        "--focus": "#9E3D32",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#F0E8D8",
        "--surface": "#FBF5E9",
        "--accent": "#17694F"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"art-deco\"][data-variant=\"alternate\"] .hero",
          "signal": "The Deco night palette turns to pale limestone with black lacquer and emerald accents; symmetry and stepped geometry stay intact. O hero incorpora fan motif unfolds softly; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/art-deco.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/art-deco.css."
        },
        {
          "selector": "#stage[data-style=\"art-deco\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: stepped sunburst; opacidade baixa para não competir com texto.",
          "skillReference": "styles/art-deco.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"art-deco\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "centered monumental title, mirrored metric columns, stepped frame around content. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"art-deco\"][data-variant=\"alternate\"] .hero::after",
          "animation": "art-deco-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"art-deco\"][data-variant=\"alternate\"]::after",
          "animation": "art-deco-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"art-deco\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"art-deco\"][data-variant=\"alternate\"]::after",
      "contentDigest": "dd424d631a08216b7c79d76422e5f6a9c022adac1828fa9e769e91f5a14f1ac1",
      "generatedDigest": "115f04b31e5c01463887374c3cf7f1e669031754a47f5d5e602db94f50d2f327",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "art-nouveau": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/art-nouveau.css",
      "nameKey": "appearance.art-nouveau.alternate.name",
      "descriptionKey": "appearance.art-nouveau.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Jardim de Âmbar",
          "description": "A deep botanical dusk with ink-green fields, parchment lettering and muted brass tendrils; organic curves remain legible. Contraparte alternativa escura para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Amber Garden",
          "description": "A deep botanical dusk with ink-green fields, parchment lettering and muted brass tendrils; organic curves remain legible. This dark counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Amber Garden — alternativa oscura",
          "description": "A deep botanical dusk with ink-green fields, parchment lettering and muted brass tendrils; organic curves remain legible. Alternativa oscura; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Amber Garden — variante sombre",
          "description": "A deep botanical dusk with ink-green fields, parchment lettering and muted brass tendrils; organic curves remain legible. Variante sombre; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Amber Garden — dunkle Variante",
          "description": "A deep botanical dusk with ink-green fields, parchment lettering and muted brass tendrils; organic curves remain legible. Dunkle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Amber Garden — тёмная версия",
          "description": "A deep botanical dusk with ink-green fields, parchment lettering and muted brass tendrils; organic curves remain legible. Тёмная версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Amber Garden — النسخة الداكنة",
          "description": "A deep botanical dusk with ink-green fields, parchment lettering and muted brass tendrils; organic curves remain legible. النسخة الداكنة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Amber Garden — गहरा रूप",
          "description": "A deep botanical dusk with ink-green fields, parchment lettering and muted brass tendrils; organic curves remain legible. गहरा रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Amber Garden — 深色版本",
          "description": "A deep botanical dusk with ink-green fields, parchment lettering and muted brass tendrils; organic curves remain legible. 深色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Amber Garden — ダーク版",
          "description": "A deep botanical dusk with ink-green fields, parchment lettering and muted brass tendrils; organic curves remain legible. ダーク版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Amber Garden — 어두운 변형",
          "description": "A deep botanical dusk with ink-green fields, parchment lettering and muted brass tendrils; organic curves remain legible. 어두운 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#182923",
        "--surface": "#24372F",
        "--surface-2": "#31483D",
        "--fg": "#F1E8D2",
        "--muted": "#C7C0A9",
        "--accent": "#C39B55",
        "--accent-fg": "#1B3028",
        "--border": "#859583",
        "--focus": "#C87865",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#182923",
        "--surface": "#24372F",
        "--accent": "#C39B55"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"art-nouveau\"][data-variant=\"alternate\"] .hero",
          "signal": "A deep botanical dusk with ink-green fields, parchment lettering and muted brass tendrils; organic curves remain legible. O hero incorpora leaf vein traces slowly; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/art-nouveau.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/art-nouveau.css."
        },
        {
          "selector": "#stage[data-style=\"art-nouveau\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: botanical linework; opacidade baixa para não competir com texto.",
          "skillReference": "styles/art-nouveau.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"art-nouveau\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "asymmetric vine-like reading path; content and metrics occupy interleaved garden beds. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"art-nouveau\"][data-variant=\"alternate\"] .hero::after",
          "animation": "art-nouveau-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"art-nouveau\"][data-variant=\"alternate\"]::after",
          "animation": "art-nouveau-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"art-nouveau\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"art-nouveau\"][data-variant=\"alternate\"]::after",
      "contentDigest": "0fb304b7637f625dab88ae88b70634511f5fe409907dbe316f74bde4ae04b042",
      "generatedDigest": "7dce7c1cedff397314929c3f8601a4ce5ace57d09d93e3e1f77c500a46322651",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "arts-and-crafts": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/arts-and-crafts.css",
      "nameKey": "appearance.arts-and-crafts.alternate.name",
      "descriptionKey": "appearance.arts-and-crafts.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Oficina de Linho",
          "description": "A light Morris-inspired textile board: linen, forest green and brick red, framed by quiet woodcut foliage. Contraparte alternativa clara para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Linen Workshop",
          "description": "A light Morris-inspired textile board: linen, forest green and brick red, framed by quiet woodcut foliage. This light counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Linen Workshop — alternativa clara",
          "description": "A light Morris-inspired textile board: linen, forest green and brick red, framed by quiet woodcut foliage. Alternativa clara; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Linen Workshop — variante claire",
          "description": "A light Morris-inspired textile board: linen, forest green and brick red, framed by quiet woodcut foliage. Variante claire; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Linen Workshop — helle Variante",
          "description": "A light Morris-inspired textile board: linen, forest green and brick red, framed by quiet woodcut foliage. Helle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Linen Workshop — светлая версия",
          "description": "A light Morris-inspired textile board: linen, forest green and brick red, framed by quiet woodcut foliage. Светлая версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Linen Workshop — النسخة الفاتحة",
          "description": "A light Morris-inspired textile board: linen, forest green and brick red, framed by quiet woodcut foliage. النسخة الفاتحة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Linen Workshop — हल्का रूप",
          "description": "A light Morris-inspired textile board: linen, forest green and brick red, framed by quiet woodcut foliage. हल्का रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Linen Workshop — 浅色版本",
          "description": "A light Morris-inspired textile board: linen, forest green and brick red, framed by quiet woodcut foliage. 浅色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Linen Workshop — ライト版",
          "description": "A light Morris-inspired textile board: linen, forest green and brick red, framed by quiet woodcut foliage. ライト版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Linen Workshop — 밝은 변형",
          "description": "A light Morris-inspired textile board: linen, forest green and brick red, framed by quiet woodcut foliage. 밝은 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#EEE7D5",
        "--surface": "#F8F3E7",
        "--surface-2": "#DDD2BB",
        "--fg": "#263629",
        "--muted": "#555C4B",
        "--accent": "#A33D31",
        "--accent-fg": "#FFFFFF",
        "--border": "#767564",
        "--focus": "#315C50",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#EEE7D5",
        "--surface": "#F8F3E7",
        "--accent": "#A33D31"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"arts-and-crafts\"][data-variant=\"alternate\"] .hero",
          "signal": "A light Morris-inspired textile board: linen, forest green and brick red, framed by quiet woodcut foliage. O hero incorpora leaf medallion rotates 2deg; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/arts-and-crafts.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/arts-and-crafts.css."
        },
        {
          "selector": "#stage[data-style=\"arts-and-crafts\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: blockprint foliage; opacidade baixa para não competir com texto.",
          "skillReference": "styles/arts-and-crafts.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"arts-and-crafts\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "woven two-column panels with a central craft label; cards use a repeating textile rhythm. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"arts-and-crafts\"][data-variant=\"alternate\"] .hero::after",
          "animation": "arts-and-crafts-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"arts-and-crafts\"][data-variant=\"alternate\"]::after",
          "animation": "arts-and-crafts-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"arts-and-crafts\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"arts-and-crafts\"][data-variant=\"alternate\"]::after",
      "contentDigest": "1ed8a27d0335f1c26a0b4f9d384f2fab91d16b70c80a1966d1809bfbf8028117",
      "generatedDigest": "9080dfbf8ccaa8ae8b52cb4294d7d7e5d518bef34e9fb3f7ed413238da2c48dc",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "bauhaus": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/bauhaus.css",
      "nameKey": "appearance.bauhaus.alternate.name",
      "descriptionKey": "appearance.bauhaus.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Bauhaus de Carvão",
          "description": "A charcoal exhibition wall with white, primary red, blue and yellow geometry; functional circles and bars remain primary. Contraparte alternativa escura para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Charcoal Bauhaus",
          "description": "A charcoal exhibition wall with white, primary red, blue and yellow geometry; functional circles and bars remain primary. This dark counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Charcoal Bauhaus — alternativa oscura",
          "description": "A charcoal exhibition wall with white, primary red, blue and yellow geometry; functional circles and bars remain primary. Alternativa oscura; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Charcoal Bauhaus — variante sombre",
          "description": "A charcoal exhibition wall with white, primary red, blue and yellow geometry; functional circles and bars remain primary. Variante sombre; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Charcoal Bauhaus — dunkle Variante",
          "description": "A charcoal exhibition wall with white, primary red, blue and yellow geometry; functional circles and bars remain primary. Dunkle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Charcoal Bauhaus — тёмная версия",
          "description": "A charcoal exhibition wall with white, primary red, blue and yellow geometry; functional circles and bars remain primary. Тёмная версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Charcoal Bauhaus — النسخة الداكنة",
          "description": "A charcoal exhibition wall with white, primary red, blue and yellow geometry; functional circles and bars remain primary. النسخة الداكنة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Charcoal Bauhaus — गहरा रूप",
          "description": "A charcoal exhibition wall with white, primary red, blue and yellow geometry; functional circles and bars remain primary. गहरा रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Charcoal Bauhaus — 深色版本",
          "description": "A charcoal exhibition wall with white, primary red, blue and yellow geometry; functional circles and bars remain primary. 深色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Charcoal Bauhaus — ダーク版",
          "description": "A charcoal exhibition wall with white, primary red, blue and yellow geometry; functional circles and bars remain primary. ダーク版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Charcoal Bauhaus — 어두운 변형",
          "description": "A charcoal exhibition wall with white, primary red, blue and yellow geometry; functional circles and bars remain primary. 어두운 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#202124",
        "--surface": "#2B2D30",
        "--surface-2": "#393B3E",
        "--fg": "#F7F3EA",
        "--muted": "#C8C4BB",
        "--accent": "#E33B32",
        "--accent-fg": "#000000",
        "--border": "#84878A",
        "--focus": "#3975C5",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#202124",
        "--surface": "#2B2D30",
        "--accent": "#E33B32"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"bauhaus\"][data-variant=\"alternate\"] .hero",
          "signal": "A charcoal exhibition wall with white, primary red, blue and yellow geometry; functional circles and bars remain primary. O hero incorpora primary circle scales in; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/bauhaus.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/bauhaus.css."
        },
        {
          "selector": "#stage[data-style=\"bauhaus\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: primary geometry; opacidade baixa para não competir com texto.",
          "skillReference": "styles/bauhaus.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"bauhaus\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "asymmetric geometry board: title block, circular metric, square utility panels. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"bauhaus\"][data-variant=\"alternate\"] .hero::after",
          "animation": "bauhaus-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"bauhaus\"][data-variant=\"alternate\"]::after",
          "animation": "bauhaus-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"bauhaus\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"bauhaus\"][data-variant=\"alternate\"]::after",
      "contentDigest": "f1910abcc7e6ec13128121e9fcfecc9f9b896176a5887f1c78c6edd67f47a471",
      "generatedDigest": "ef41abdba049c846c70b4b223831f2efd10ae158de51f95b6bfbec1c6156cc14",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "de-stijl": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/de-stijl.css",
      "nameKey": "appearance.de-stijl.alternate.name",
      "descriptionKey": "appearance.de-stijl.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Neoplasticismo de Tinta",
          "description": "A black gallery proof with chalk orthogonal grid and carefully rationed red, blue, yellow planes. Contraparte alternativa escura para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Ink Neoplasticism",
          "description": "A black gallery proof with chalk orthogonal grid and carefully rationed red, blue, yellow planes. This dark counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Ink Neoplasticism — alternativa oscura",
          "description": "A black gallery proof with chalk orthogonal grid and carefully rationed red, blue, yellow planes. Alternativa oscura; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Ink Neoplasticism — variante sombre",
          "description": "A black gallery proof with chalk orthogonal grid and carefully rationed red, blue, yellow planes. Variante sombre; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Ink Neoplasticism — dunkle Variante",
          "description": "A black gallery proof with chalk orthogonal grid and carefully rationed red, blue, yellow planes. Dunkle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Ink Neoplasticism — тёмная версия",
          "description": "A black gallery proof with chalk orthogonal grid and carefully rationed red, blue, yellow planes. Тёмная версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Ink Neoplasticism — النسخة الداكنة",
          "description": "A black gallery proof with chalk orthogonal grid and carefully rationed red, blue, yellow planes. النسخة الداكنة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Ink Neoplasticism — गहरा रूप",
          "description": "A black gallery proof with chalk orthogonal grid and carefully rationed red, blue, yellow planes. गहरा रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Ink Neoplasticism — 深色版本",
          "description": "A black gallery proof with chalk orthogonal grid and carefully rationed red, blue, yellow planes. 深色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Ink Neoplasticism — ダーク版",
          "description": "A black gallery proof with chalk orthogonal grid and carefully rationed red, blue, yellow planes. ダーク版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Ink Neoplasticism — 어두운 변형",
          "description": "A black gallery proof with chalk orthogonal grid and carefully rationed red, blue, yellow planes. 어두운 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#202020",
        "--surface": "#2B2B2B",
        "--surface-2": "#383838",
        "--fg": "#F7F2E8",
        "--muted": "#C9C3B8",
        "--accent": "#E33A32",
        "--accent-fg": "#000000",
        "--border": "#87837C",
        "--focus": "#68A8DB",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#202020",
        "--surface": "#2B2B2B",
        "--accent": "#E33A32"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"de-stijl\"][data-variant=\"alternate\"] .hero",
          "signal": "A black gallery proof with chalk orthogonal grid and carefully rationed red, blue, yellow planes. O hero incorpora grid rule reveals; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/de-stijl.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/de-stijl.css."
        },
        {
          "selector": "#stage[data-style=\"de-stijl\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: orthogonal planes; opacidade baixa para não competir com texto.",
          "skillReference": "styles/de-stijl.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"de-stijl\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "rigid Mondrian grid with one dominant title field and unequal metric cells. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"de-stijl\"][data-variant=\"alternate\"] .hero::after",
          "animation": "de-stijl-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"de-stijl\"][data-variant=\"alternate\"]::after",
          "animation": "de-stijl-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"de-stijl\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"de-stijl\"][data-variant=\"alternate\"]::after",
      "contentDigest": "494588e30087254c433d241ec7a206fc5588371bc4df0929c07f9cf180cbb606",
      "generatedDigest": "428d3885c4499fe139d16568d51d46019fb24aa5a831f181e3bef466ae36f202",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "constructivism": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/constructivism.css",
      "nameKey": "appearance.constructivism.alternate.name",
      "descriptionKey": "appearance.constructivism.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Estrutura de Noite",
          "description": "A dark industrial poster with bone stock type, signal red and a signal-red proof mark; diagonals retain constructivist force. Contraparte alternativa escura para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Night Structure",
          "description": "A dark industrial poster with bone stock type, signal red and a signal-red proof mark; diagonals retain constructivist force. This dark counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Night Structure — alternativa oscura",
          "description": "A dark industrial poster with bone stock type, signal red and a signal-red proof mark; diagonals retain constructivist force. Alternativa oscura; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Night Structure — variante sombre",
          "description": "A dark industrial poster with bone stock type, signal red and a signal-red proof mark; diagonals retain constructivist force. Variante sombre; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Night Structure — dunkle Variante",
          "description": "A dark industrial poster with bone stock type, signal red and a signal-red proof mark; diagonals retain constructivist force. Dunkle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Night Structure — тёмная версия",
          "description": "A dark industrial poster with bone stock type, signal red and a signal-red proof mark; diagonals retain constructivist force. Тёмная версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Night Structure — النسخة الداكنة",
          "description": "A dark industrial poster with bone stock type, signal red and a signal-red proof mark; diagonals retain constructivist force. النسخة الداكنة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Night Structure — गहरा रूप",
          "description": "A dark industrial poster with bone stock type, signal red and a signal-red proof mark; diagonals retain constructivist force. गहरा रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Night Structure — 深色版本",
          "description": "A dark industrial poster with bone stock type, signal red and a signal-red proof mark; diagonals retain constructivist force. 深色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Night Structure — ダーク版",
          "description": "A dark industrial poster with bone stock type, signal red and a signal-red proof mark; diagonals retain constructivist force. ダーク版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Night Structure — 어두운 변형",
          "description": "A dark industrial poster with bone stock type, signal red and a signal-red proof mark; diagonals retain constructivist force. 어두운 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#211C1B",
        "--surface": "#2E2624",
        "--surface-2": "#3C302D",
        "--fg": "#F5EBDD",
        "--muted": "#C9BDB1",
        "--accent": "#D63C31",
        "--accent-fg": "#FFFFFF",
        "--border": "#8B7A6F",
        "--focus": "#D63C31",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#211C1B",
        "--surface": "#2E2624",
        "--accent": "#D63C31"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"constructivism\"][data-variant=\"alternate\"] .hero",
          "signal": "A dark industrial poster with bone stock type, signal red and a signal-red proof mark; diagonals retain constructivist force. O hero incorpora red bar sweeps in; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/constructivism.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/constructivism.css."
        },
        {
          "selector": "#stage[data-style=\"constructivism\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: diagonal rays; opacidade baixa para não competir com texto.",
          "skillReference": "styles/constructivism.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"constructivism\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "45-degree editorial rail and stacked data blocks; alignment follows a rising diagonal axis. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"constructivism\"][data-variant=\"alternate\"] .hero::after",
          "animation": "constructivism-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"constructivism\"][data-variant=\"alternate\"]::after",
          "animation": "constructivism-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"constructivism\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"constructivism\"][data-variant=\"alternate\"]::after",
      "contentDigest": "8a08e3d4a21673f9546dcaf6905e8aa8ba58d9c15f2acf7ec1cd8dc1024ab722",
      "generatedDigest": "37c3a72e4c272cdf9cf604a8ad17f0db83a05938a5732e1c77f4c08c6f7b5bf8",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "agitprop-poster": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/agitprop-poster.css",
      "nameKey": "appearance.agitprop-poster.alternate.name",
      "descriptionKey": "appearance.agitprop-poster.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Manifesto de Papel",
          "description": "A charcoal poster ground, bone condensed type and signal-red rays turn the rally broadside into a nocturnal print. Contraparte alternativa escura para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Paper Manifesto",
          "description": "A charcoal poster ground, bone condensed type and signal-red rays turn the rally broadside into a nocturnal print. This dark counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Paper Manifesto — alternativa oscura",
          "description": "A charcoal poster ground, bone condensed type and signal-red rays turn the rally broadside into a nocturnal print. Alternativa oscura; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Paper Manifesto — variante sombre",
          "description": "A charcoal poster ground, bone condensed type and signal-red rays turn the rally broadside into a nocturnal print. Variante sombre; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Paper Manifesto — dunkle Variante",
          "description": "A charcoal poster ground, bone condensed type and signal-red rays turn the rally broadside into a nocturnal print. Dunkle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Paper Manifesto — тёмная версия",
          "description": "A charcoal poster ground, bone condensed type and signal-red rays turn the rally broadside into a nocturnal print. Тёмная версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Paper Manifesto — النسخة الداكنة",
          "description": "A charcoal poster ground, bone condensed type and signal-red rays turn the rally broadside into a nocturnal print. النسخة الداكنة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Paper Manifesto — गहरा रूप",
          "description": "A charcoal poster ground, bone condensed type and signal-red rays turn the rally broadside into a nocturnal print. गहरा रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Paper Manifesto — 深色版本",
          "description": "A charcoal poster ground, bone condensed type and signal-red rays turn the rally broadside into a nocturnal print. 深色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Paper Manifesto — ダーク版",
          "description": "A charcoal poster ground, bone condensed type and signal-red rays turn the rally broadside into a nocturnal print. ダーク版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Paper Manifesto — 어두운 변형",
          "description": "A charcoal poster ground, bone condensed type and signal-red rays turn the rally broadside into a nocturnal print. 어두운 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#211D1B",
        "--surface": "#2D2724",
        "--surface-2": "#3B322E",
        "--fg": "#F6EBDD",
        "--muted": "#CCBFB1",
        "--accent": "#EF5848",
        "--accent-fg": "#211B19",
        "--border": "#8D7E73",
        "--focus": "#EF5848",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#211D1B",
        "--surface": "#2D2724",
        "--accent": "#EF5848"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"agitprop-poster\"][data-variant=\"alternate\"] .hero",
          "signal": "A charcoal poster ground, bone condensed type and signal-red rays turn the rally broadside into a nocturnal print. O hero incorpora ray mask expands subtly; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/agitprop-poster.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/agitprop-poster.css."
        },
        {
          "selector": "#stage[data-style=\"agitprop-poster\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: poster rays; opacidade baixa para não competir com texto.",
          "skillReference": "styles/agitprop-poster.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"agitprop-poster\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "radial title field above a two-column action board; information bands stay square. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"agitprop-poster\"][data-variant=\"alternate\"] .hero::after",
          "animation": "agitprop-poster-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"agitprop-poster\"][data-variant=\"alternate\"]::after",
          "animation": "agitprop-poster-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"agitprop-poster\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"agitprop-poster\"][data-variant=\"alternate\"]::after",
      "contentDigest": "71aac0acf6dfb42f8b05f146ea6580e16a661bb293806f7e2df9aebd4090b41c",
      "generatedDigest": "f5ad015a422e7909678457c3ee90f5fd2982a3dfdd46f6f96fa64baed89ee5e4",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "pop-art-halftone": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/pop-art-halftone.css",
      "nameKey": "appearance.pop-art-halftone.alternate.name",
      "descriptionKey": "appearance.pop-art-halftone.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Pop Art de Estúdio",
          "description": "A midnight comic print with cream panels, cyan and hot coral spot colors; Ben-Day texture is localized and never behind small text. Contraparte alternativa escura para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Studio Pop",
          "description": "A midnight comic print with cream panels, cyan and hot coral spot colors; Ben-Day texture is localized and never behind small text. This dark counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Studio Pop — alternativa oscura",
          "description": "A midnight comic print with cream panels, cyan and hot coral spot colors; Ben-Day texture is localized and never behind small text. Alternativa oscura; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Studio Pop — variante sombre",
          "description": "A midnight comic print with cream panels, cyan and hot coral spot colors; Ben-Day texture is localized and never behind small text. Variante sombre; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Studio Pop — dunkle Variante",
          "description": "A midnight comic print with cream panels, cyan and hot coral spot colors; Ben-Day texture is localized and never behind small text. Dunkle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Studio Pop — тёмная версия",
          "description": "A midnight comic print with cream panels, cyan and hot coral spot colors; Ben-Day texture is localized and never behind small text. Тёмная версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Studio Pop — النسخة الداكنة",
          "description": "A midnight comic print with cream panels, cyan and hot coral spot colors; Ben-Day texture is localized and never behind small text. النسخة الداكنة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Studio Pop — गहरा रूप",
          "description": "A midnight comic print with cream panels, cyan and hot coral spot colors; Ben-Day texture is localized and never behind small text. गहरा रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Studio Pop — 深色版本",
          "description": "A midnight comic print with cream panels, cyan and hot coral spot colors; Ben-Day texture is localized and never behind small text. 深色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Studio Pop — ダーク版",
          "description": "A midnight comic print with cream panels, cyan and hot coral spot colors; Ben-Day texture is localized and never behind small text. ダーク版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Studio Pop — 어두운 변형",
          "description": "A midnight comic print with cream panels, cyan and hot coral spot colors; Ben-Day texture is localized and never behind small text. 어두운 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#22212A",
        "--surface": "#302E38",
        "--surface-2": "#403C48",
        "--fg": "#FFF8E8",
        "--muted": "#CEC7B9",
        "--accent": "#39AFC5",
        "--accent-fg": "#1E1B22",
        "--border": "#918981",
        "--focus": "#F05A76",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#22212A",
        "--surface": "#302E38",
        "--accent": "#39AFC5"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"pop-art-halftone\"][data-variant=\"alternate\"] .hero",
          "signal": "A midnight comic print with cream panels, cyan and hot coral spot colors; Ben-Day texture is localized and never behind small text. O hero incorpora halftone burst pulses once; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/pop-art-halftone.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/pop-art-halftone.css."
        },
        {
          "selector": "#stage[data-style=\"pop-art-halftone\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: ben-day field; opacidade baixa para não competir com texto.",
          "skillReference": "styles/pop-art-halftone.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"pop-art-halftone\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "comic panel grid with oversized callout and compact action cells; speech-bubble geometry frames metrics. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"pop-art-halftone\"][data-variant=\"alternate\"] .hero::after",
          "animation": "pop-art-halftone-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"pop-art-halftone\"][data-variant=\"alternate\"]::after",
          "animation": "pop-art-halftone-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"pop-art-halftone\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"pop-art-halftone\"][data-variant=\"alternate\"]::after",
      "contentDigest": "2d0bad7d23a6232454ce30cfab5dfa0ad11227ec5376da3461c04f13ae3d73a9",
      "generatedDigest": "29fb20dd9bf64dc3ba86d0a056dff740ce3ce407dabf66f5aad02c2481634836",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "psychedelic-60s": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/psychedelic-60s.css",
      "nameKey": "appearance.psychedelic-60s.alternate.name",
      "descriptionKey": "appearance.psychedelic-60s.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Pôster de Sol",
          "description": "A pale concert-poster ground with deep plum, turquoise and tangerine inks; liquid lettering and optical waves stay in display zones. Contraparte alternativa clara para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Sun Poster",
          "description": "A pale concert-poster ground with deep plum, turquoise and tangerine inks; liquid lettering and optical waves stay in display zones. This light counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Sun Poster — alternativa clara",
          "description": "A pale concert-poster ground with deep plum, turquoise and tangerine inks; liquid lettering and optical waves stay in display zones. Alternativa clara; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Sun Poster — variante claire",
          "description": "A pale concert-poster ground with deep plum, turquoise and tangerine inks; liquid lettering and optical waves stay in display zones. Variante claire; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Sun Poster — helle Variante",
          "description": "A pale concert-poster ground with deep plum, turquoise and tangerine inks; liquid lettering and optical waves stay in display zones. Helle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Sun Poster — светлая версия",
          "description": "A pale concert-poster ground with deep plum, turquoise and tangerine inks; liquid lettering and optical waves stay in display zones. Светлая версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Sun Poster — النسخة الفاتحة",
          "description": "A pale concert-poster ground with deep plum, turquoise and tangerine inks; liquid lettering and optical waves stay in display zones. النسخة الفاتحة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Sun Poster — हल्का रूप",
          "description": "A pale concert-poster ground with deep plum, turquoise and tangerine inks; liquid lettering and optical waves stay in display zones. हल्का रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Sun Poster — 浅色版本",
          "description": "A pale concert-poster ground with deep plum, turquoise and tangerine inks; liquid lettering and optical waves stay in display zones. 浅色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Sun Poster — ライト版",
          "description": "A pale concert-poster ground with deep plum, turquoise and tangerine inks; liquid lettering and optical waves stay in display zones. ライト版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Sun Poster — 밝은 변형",
          "description": "A pale concert-poster ground with deep plum, turquoise and tangerine inks; liquid lettering and optical waves stay in display zones. 밝은 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#F1E8D7",
        "--surface": "#FBF4E7",
        "--surface-2": "#E4D7C0",
        "--fg": "#261A30",
        "--muted": "#57465E",
        "--accent": "#B74C25",
        "--accent-fg": "#FFFFFF",
        "--border": "#83766D",
        "--focus": "#176D70",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#F1E8D7",
        "--surface": "#FBF4E7",
        "--accent": "#B74C25"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"psychedelic-60s\"][data-variant=\"alternate\"] .hero",
          "signal": "A pale concert-poster ground with deep plum, turquoise and tangerine inks; liquid lettering and optical waves stay in display zones. O hero incorpora wave contours drift slowly; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/psychedelic-60s.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/psychedelic-60s.css."
        },
        {
          "selector": "#stage[data-style=\"psychedelic-60s\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: optical waves; opacidade baixa para não competir com texto.",
          "skillReference": "styles/psychedelic-60s.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"psychedelic-60s\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "centered liquid headline over stacked poster bands; content cards follow a loose but clear vertical rhythm. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"psychedelic-60s\"][data-variant=\"alternate\"] .hero::after",
          "animation": "psychedelic-60s-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"psychedelic-60s\"][data-variant=\"alternate\"]::after",
          "animation": "psychedelic-60s-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"psychedelic-60s\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"psychedelic-60s\"][data-variant=\"alternate\"]::after",
      "contentDigest": "5a64d3c2b50d0fa551649d0e2220b5d7ef92920016c9207e1a5e6168c8e2baa9",
      "generatedDigest": "f0d7268a7b81a6aab8f134dfa0defd6270c0d02cb3a0aad427a6764e31e06d28",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "mid-century-modern": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/mid-century-modern.css",
      "nameKey": "appearance.mid-century-modern.alternate.name",
      "descriptionKey": "appearance.mid-century-modern.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Sala de Teca",
          "description": "A deep walnut exhibition palette with parchment, sage and muted orange; the atomic-age starburst is reserved for decoration. Contraparte alternativa escura para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Teak Living Room",
          "description": "A deep walnut exhibition palette with parchment, sage and muted orange; the atomic-age starburst is reserved for decoration. This dark counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Teak Living Room — alternativa oscura",
          "description": "A deep walnut exhibition palette with parchment, sage and muted orange; the atomic-age starburst is reserved for decoration. Alternativa oscura; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Teak Living Room — variante sombre",
          "description": "A deep walnut exhibition palette with parchment, sage and muted orange; the atomic-age starburst is reserved for decoration. Variante sombre; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Teak Living Room — dunkle Variante",
          "description": "A deep walnut exhibition palette with parchment, sage and muted orange; the atomic-age starburst is reserved for decoration. Dunkle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Teak Living Room — тёмная версия",
          "description": "A deep walnut exhibition palette with parchment, sage and muted orange; the atomic-age starburst is reserved for decoration. Тёмная версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Teak Living Room — النسخة الداكنة",
          "description": "A deep walnut exhibition palette with parchment, sage and muted orange; the atomic-age starburst is reserved for decoration. النسخة الداكنة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Teak Living Room — गहरा रूप",
          "description": "A deep walnut exhibition palette with parchment, sage and muted orange; the atomic-age starburst is reserved for decoration. गहरा रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Teak Living Room — 深色版本",
          "description": "A deep walnut exhibition palette with parchment, sage and muted orange; the atomic-age starburst is reserved for decoration. 深色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Teak Living Room — ダーク版",
          "description": "A deep walnut exhibition palette with parchment, sage and muted orange; the atomic-age starburst is reserved for decoration. ダーク版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Teak Living Room — 어두운 변형",
          "description": "A deep walnut exhibition palette with parchment, sage and muted orange; the atomic-age starburst is reserved for decoration. 어두운 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#292722",
        "--surface": "#37332B",
        "--surface-2": "#494235",
        "--fg": "#F4EDDF",
        "--muted": "#CDC2AB",
        "--accent": "#C6753A",
        "--accent-fg": "#000000",
        "--border": "#968F80",
        "--focus": "#6E956F",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#292722",
        "--surface": "#37332B",
        "--accent": "#C6753A"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"mid-century-modern\"][data-variant=\"alternate\"] .hero",
          "signal": "A deep walnut exhibition palette with parchment, sage and muted orange; the atomic-age starburst is reserved for decoration. O hero incorpora starburst rotates 2deg; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/mid-century-modern.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/mid-century-modern.css."
        },
        {
          "selector": "#stage[data-style=\"mid-century-modern\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: atomic starburst; opacidade baixa para não competir com texto.",
          "skillReference": "styles/mid-century-modern.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"mid-century-modern\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "horizontal living-room composition: warm title panel, side metric plinth and low media console cards. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"mid-century-modern\"][data-variant=\"alternate\"] .hero::after",
          "animation": "mid-century-modern-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"mid-century-modern\"][data-variant=\"alternate\"]::after",
          "animation": "mid-century-modern-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"mid-century-modern\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"mid-century-modern\"][data-variant=\"alternate\"]::after",
      "contentDigest": "b715da330c4b77a3d94a694450f59814bbff298d4ec5861eef96e44b86cceb4c",
      "generatedDigest": "01cf9e33420868b65c4f93c3412498f7dbb9e71a8ecf8ddedad0c5d590d3820f",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "y2k-revival": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/y2k-revival.css",
      "nameKey": "appearance.y2k-revival.alternate.name",
      "descriptionKey": "appearance.y2k-revival.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Y2K de Cromo Líquido",
          "description": "A midnight chrome lab with silver, cool cyan and restrained fuchsia; inflated silhouettes are structured into compact modules. Contraparte alternativa escura para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Liquid Chrome Y2K",
          "description": "A midnight chrome lab with silver, cool cyan and restrained fuchsia; inflated silhouettes are structured into compact modules. This dark counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Liquid Chrome Y2K — alternativa oscura",
          "description": "A midnight chrome lab with silver, cool cyan and restrained fuchsia; inflated silhouettes are structured into compact modules. Alternativa oscura; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Liquid Chrome Y2K — variante sombre",
          "description": "A midnight chrome lab with silver, cool cyan and restrained fuchsia; inflated silhouettes are structured into compact modules. Variante sombre; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Liquid Chrome Y2K — dunkle Variante",
          "description": "A midnight chrome lab with silver, cool cyan and restrained fuchsia; inflated silhouettes are structured into compact modules. Dunkle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Liquid Chrome Y2K — тёмная версия",
          "description": "A midnight chrome lab with silver, cool cyan and restrained fuchsia; inflated silhouettes are structured into compact modules. Тёмная версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Liquid Chrome Y2K — النسخة الداكنة",
          "description": "A midnight chrome lab with silver, cool cyan and restrained fuchsia; inflated silhouettes are structured into compact modules. النسخة الداكنة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Liquid Chrome Y2K — गहरा रूप",
          "description": "A midnight chrome lab with silver, cool cyan and restrained fuchsia; inflated silhouettes are structured into compact modules. गहरा रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Liquid Chrome Y2K — 深色版本",
          "description": "A midnight chrome lab with silver, cool cyan and restrained fuchsia; inflated silhouettes are structured into compact modules. 深色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Liquid Chrome Y2K — ダーク版",
          "description": "A midnight chrome lab with silver, cool cyan and restrained fuchsia; inflated silhouettes are structured into compact modules. ダーク版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Liquid Chrome Y2K — 어두운 변형",
          "description": "A midnight chrome lab with silver, cool cyan and restrained fuchsia; inflated silhouettes are structured into compact modules. 어두운 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#171B26",
        "--surface": "#242A37",
        "--surface-2": "#323A49",
        "--fg": "#F1F4FA",
        "--muted": "#BBC5D3",
        "--accent": "#72C8D8",
        "--accent-fg": "#171B26",
        "--border": "#7E8B9B",
        "--focus": "#D678B9",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#171B26",
        "--surface": "#242A37",
        "--accent": "#72C8D8"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"y2k-revival\"][data-variant=\"alternate\"] .hero",
          "signal": "A midnight chrome lab with silver, cool cyan and restrained fuchsia; inflated silhouettes are structured into compact modules. O hero incorpora chrome glint passes once; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/y2k-revival.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/y2k-revival.css."
        },
        {
          "selector": "#stage[data-style=\"y2k-revival\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: chrome arcs; opacidade baixa para não competir com texto.",
          "skillReference": "styles/y2k-revival.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"y2k-revival\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "chrome title bar over compact module grid; action controls align in a capsule dock. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"y2k-revival\"][data-variant=\"alternate\"] .hero::after",
          "animation": "y2k-revival-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"y2k-revival\"][data-variant=\"alternate\"]::after",
          "animation": "y2k-revival-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"y2k-revival\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"y2k-revival\"][data-variant=\"alternate\"]::after",
      "contentDigest": "3ff189665300863fcb51dec71b81db9593a9fe5a2fcc2b2459dac979bde49a42",
      "generatedDigest": "5b5d61f77e260d58c70fc0a7cd861e31c066273122121c45c8b19e04b92e1477",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "vaporwave": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/vaporwave.css",
      "nameKey": "appearance.vaporwave.alternate.name",
      "descriptionKey": "appearance.vaporwave.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Átrio de Mármore",
          "description": "A sunlit mall atrium: ivory marble, dusty rose and teal; nostalgia remains quiet and architectural rather than neon. Contraparte alternativa clara para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Marble Atrium",
          "description": "A sunlit mall atrium: ivory marble, dusty rose and teal; nostalgia remains quiet and architectural rather than neon. This light counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Marble Atrium — alternativa clara",
          "description": "A sunlit mall atrium: ivory marble, dusty rose and teal; nostalgia remains quiet and architectural rather than neon. Alternativa clara; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Marble Atrium — variante claire",
          "description": "A sunlit mall atrium: ivory marble, dusty rose and teal; nostalgia remains quiet and architectural rather than neon. Variante claire; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Marble Atrium — helle Variante",
          "description": "A sunlit mall atrium: ivory marble, dusty rose and teal; nostalgia remains quiet and architectural rather than neon. Helle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Marble Atrium — светлая версия",
          "description": "A sunlit mall atrium: ivory marble, dusty rose and teal; nostalgia remains quiet and architectural rather than neon. Светлая версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Marble Atrium — النسخة الفاتحة",
          "description": "A sunlit mall atrium: ivory marble, dusty rose and teal; nostalgia remains quiet and architectural rather than neon. النسخة الفاتحة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Marble Atrium — हल्का रूप",
          "description": "A sunlit mall atrium: ivory marble, dusty rose and teal; nostalgia remains quiet and architectural rather than neon. हल्का रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Marble Atrium — 浅色版本",
          "description": "A sunlit mall atrium: ivory marble, dusty rose and teal; nostalgia remains quiet and architectural rather than neon. 浅色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Marble Atrium — ライト版",
          "description": "A sunlit mall atrium: ivory marble, dusty rose and teal; nostalgia remains quiet and architectural rather than neon. ライト版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Marble Atrium — 밝은 변형",
          "description": "A sunlit mall atrium: ivory marble, dusty rose and teal; nostalgia remains quiet and architectural rather than neon. 밝은 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#F3EAF0",
        "--surface": "#FFF8F1",
        "--surface-2": "#E7D9E4",
        "--fg": "#292239",
        "--muted": "#5F5668",
        "--accent": "#A64D72",
        "--accent-fg": "#FFFFFF",
        "--border": "#857789",
        "--focus": "#287F80",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#F3EAF0",
        "--surface": "#FFF8F1",
        "--accent": "#A64D72"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"vaporwave\"][data-variant=\"alternate\"] .hero",
          "signal": "A sunlit mall atrium: ivory marble, dusty rose and teal; nostalgia remains quiet and architectural rather than neon. O hero incorpora sun stripe shifts; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/vaporwave.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/vaporwave.css."
        },
        {
          "selector": "#stage[data-style=\"vaporwave\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: marble columns; opacidade baixa para não competir com texto.",
          "skillReference": "styles/vaporwave.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"vaporwave\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "gallery-like atrium with centered marble title, twin arcade columns and a low horizon panel. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"vaporwave\"][data-variant=\"alternate\"] .hero::after",
          "animation": "vaporwave-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"vaporwave\"][data-variant=\"alternate\"]::after",
          "animation": "vaporwave-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"vaporwave\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"vaporwave\"][data-variant=\"alternate\"]::after",
      "contentDigest": "92aa725b4c5b8bf6795b90d912392df15a28595d6dc57291d06382fd60bfa3f9",
      "generatedDigest": "308f0c97e40075632aca9e04d012ceff4777fa69ac073c2e9468e581f24c983d",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "synthwave": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/synthwave.css",
      "nameKey": "appearance.synthwave.alternate.name",
      "descriptionKey": "appearance.synthwave.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Outrun ao Amanhecer",
          "description": "A pale peach sunrise with deep aubergine, red-orange horizon and restrained blue grid; outrun cues remain unmistakable. Contraparte alternativa clara para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Outrun at Dawn",
          "description": "A pale peach sunrise with deep aubergine, red-orange horizon and restrained blue grid; outrun cues remain unmistakable. This light counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Outrun at Dawn — alternativa clara",
          "description": "A pale peach sunrise with deep aubergine, red-orange horizon and restrained blue grid; outrun cues remain unmistakable. Alternativa clara; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Outrun at Dawn — variante claire",
          "description": "A pale peach sunrise with deep aubergine, red-orange horizon and restrained blue grid; outrun cues remain unmistakable. Variante claire; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Outrun at Dawn — helle Variante",
          "description": "A pale peach sunrise with deep aubergine, red-orange horizon and restrained blue grid; outrun cues remain unmistakable. Helle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Outrun at Dawn — светлая версия",
          "description": "A pale peach sunrise with deep aubergine, red-orange horizon and restrained blue grid; outrun cues remain unmistakable. Светлая версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Outrun at Dawn — النسخة الفاتحة",
          "description": "A pale peach sunrise with deep aubergine, red-orange horizon and restrained blue grid; outrun cues remain unmistakable. النسخة الفاتحة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Outrun at Dawn — हल्का रूप",
          "description": "A pale peach sunrise with deep aubergine, red-orange horizon and restrained blue grid; outrun cues remain unmistakable. हल्का रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Outrun at Dawn — 浅色版本",
          "description": "A pale peach sunrise with deep aubergine, red-orange horizon and restrained blue grid; outrun cues remain unmistakable. 浅色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Outrun at Dawn — ライト版",
          "description": "A pale peach sunrise with deep aubergine, red-orange horizon and restrained blue grid; outrun cues remain unmistakable. ライト版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Outrun at Dawn — 밝은 변형",
          "description": "A pale peach sunrise with deep aubergine, red-orange horizon and restrained blue grid; outrun cues remain unmistakable. 밝은 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#F7E8DE",
        "--surface": "#FFF4E9",
        "--surface-2": "#EAD2D1",
        "--fg": "#2C2038",
        "--muted": "#5F506A",
        "--accent": "#C34243",
        "--accent-fg": "#FFFFFF",
        "--border": "#85727B",
        "--focus": "#315C9A",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#F7E8DE",
        "--surface": "#FFF4E9",
        "--accent": "#C34243"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"synthwave\"][data-variant=\"alternate\"] .hero",
          "signal": "A pale peach sunrise with deep aubergine, red-orange horizon and restrained blue grid; outrun cues remain unmistakable. O hero incorpora sun halo breathes; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/synthwave.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/synthwave.css."
        },
        {
          "selector": "#stage[data-style=\"synthwave\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: perspective grid; opacidade baixa para não competir com texto.",
          "skillReference": "styles/synthwave.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"synthwave\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "sun disc over an asymmetric horizon; metrics sit in a low dashboard band and actions in a compact rail. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"synthwave\"][data-variant=\"alternate\"] .hero::after",
          "animation": "synthwave-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"synthwave\"][data-variant=\"alternate\"]::after",
          "animation": "synthwave-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"synthwave\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"synthwave\"][data-variant=\"alternate\"]::after",
      "contentDigest": "a3e595557bed749f9fec8de95621dc04ab7bfaa19659931cce1c702b99af2261",
      "generatedDigest": "45997d858b50274e125218ba6f3367deeef248ca5e22d4140324e74aafaaaa17",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "indie-web-revival": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/indie-web-revival.css",
      "nameKey": "appearance.indie-web-revival.alternate.name",
      "descriptionKey": "appearance.indie-web-revival.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Webring de Meia-Noite",
          "description": "A dark personal homepage with warm phosphor cream, link blue and browser chrome; 88×31-style controls stay tactile. Contraparte alternativa escura para o padrão, proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Midnight Webring",
          "description": "A dark personal homepage with warm phosphor cream, link blue and browser chrome; 88×31-style controls stay tactile. This dark counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Midnight Webring — alternativa oscura",
          "description": "A dark personal homepage with warm phosphor cream, link blue and browser chrome; 88×31-style controls stay tactile. Alternativa oscura; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "fr-FR": {
          "name": "Midnight Webring — variante sombre",
          "description": "A dark personal homepage with warm phosphor cream, link blue and browser chrome; 88×31-style controls stay tactile. Variante sombre; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "de-DE": {
          "name": "Midnight Webring — dunkle Variante",
          "description": "A dark personal homepage with warm phosphor cream, link blue and browser chrome; 88×31-style controls stay tactile. Dunkle variante; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ru-RU": {
          "name": "Midnight Webring — тёмная версия",
          "description": "A dark personal homepage with warm phosphor cream, link blue and browser chrome; 88×31-style controls stay tactile. Тёмная версия; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ar-SA": {
          "name": "Midnight Webring — النسخة الداكنة",
          "description": "A dark personal homepage with warm phosphor cream, link blue and browser chrome; 88×31-style controls stay tactile. النسخة الداكنة; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "hi-IN": {
          "name": "Midnight Webring — गहरा रूप",
          "description": "A dark personal homepage with warm phosphor cream, link blue and browser chrome; 88×31-style controls stay tactile. गहरा रूप; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "zh-CN": {
          "name": "Midnight Webring — 深色版本",
          "description": "A dark personal homepage with warm phosphor cream, link blue and browser chrome; 88×31-style controls stay tactile. 深色版本; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ja-JP": {
          "name": "Midnight Webring — ダーク版",
          "description": "A dark personal homepage with warm phosphor cream, link blue and browser chrome; 88×31-style controls stay tactile. ダーク版; proposta experimental para revisão, mantendo intacta a aparência canônica."
        },
        "ko-KR": {
          "name": "Midnight Webring — 어두운 변형",
          "description": "A dark personal homepage with warm phosphor cream, link blue and browser chrome; 88×31-style controls stay tactile. 어두운 변형; proposta experimental para revisão, mantendo intacta a aparência canônica."
        }
      },
      "tokens": {
        "--bg": "#202124",
        "--surface": "#2C2D30",
        "--surface-2": "#3A3B3E",
        "--fg": "#FFF4D2",
        "--muted": "#D2C7A8",
        "--accent": "#79A9E8",
        "--accent-fg": "#1D1E20",
        "--border": "#898780",
        "--focus": "#DB7652",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#202124",
        "--surface": "#2C2D30",
        "--accent": "#79A9E8"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"indie-web-revival\"][data-variant=\"alternate\"] .hero",
          "signal": "A dark personal homepage with warm phosphor cream, link blue and browser chrome; 88×31-style controls stay tactile. O hero incorpora webring icon spins gently; os controles mantêm contraste e foco discernível.",
          "skillReference": "styles/indie-web-revival.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/indie-web-revival.css."
        },
        {
          "selector": "#stage[data-style=\"indie-web-revival\"][data-variant=\"alternate\"] .app::before",
          "signal": "Decoração de fundo: browser chrome; opacidade baixa para não competir com texto.",
          "skillReference": "styles/indie-web-revival.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"indie-web-revival\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "personal homepage header, webring side rail, dense but spaced guestbook and utility links. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"indie-web-revival\"][data-variant=\"alternate\"] .hero::after",
          "animation": "indie-web-revival-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"indie-web-revival\"][data-variant=\"alternate\"]::after",
          "animation": "indie-web-revival-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"indie-web-revival\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"indie-web-revival\"][data-variant=\"alternate\"]::after",
      "contentDigest": "5ca3f1ac9d57875bfb0cfd8c84a5b9115e5881c45aeb25ca358b0efb6bab02d2",
      "generatedDigest": "536cbdecb124a4fe11e7ad1b7567ec35461c47650853642f707ee02816a2db69",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "retro-computing": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/retro-computing.css",
      "nameKey": "appearance.retro-computing.alternate.name",
      "descriptionKey": "appearance.retro-computing.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Workbench Claro",
          "description": "Desktop cinza claro, janelas elevadas, texto escuro e barras azuis inspirados no Amiga Workbench 2.x/3.x. Contraparte clara proposta para revisão; a aparência canônica permanece intacta."
        },
        "en-US": {
          "name": "Amiga Workbench Light",
          "description": "A pale gray desktop, raised windows, dark text and blue title bars inspired by Amiga Workbench 2.x/3.x. This light counterpart is a review proposal; the canonical appearance remains unchanged."
        },
        "es-ES": {
          "name": "Amiga Workbench claro",
          "description": "Escritorio gris claro, ventanas elevadas, texto oscuro y barras azules inspirados en Amiga Workbench 2.x/3.x. Variante clara propuesta para revisión; la apariencia canónica permanece intacta."
        },
        "fr-FR": {
          "name": "Amiga Workbench clair",
          "description": "Bureau gris clair, fenêtres en relief, texte sombre et barres bleues inspirés d’Amiga Workbench 2.x/3.x. Cette variante claire est une proposition à valider; l’apparence canonique reste intacte."
        },
        "de-DE": {
          "name": "Helles Amiga Workbench",
          "description": "Hellgrauer Desktop, erhabene Fenster, dunkler Text und blaue Titelleisten nach dem Vorbild von Amiga Workbench 2.x/3.x. Diese helle Variante ist ein Vorschlag zur Prüfung; das kanonische Erscheinungsbild bleibt unverändert."
        },
        "ru-RU": {
          "name": "Светлая Amiga Workbench",
          "description": "Светло-серый рабочий стол, рельефные окна, тёмный текст и синие заголовки в стиле Amiga Workbench 2.x/3.x. Светлый вариант для проверки; канонический стиль не изменён."
        },
        "ar-SA": {
          "name": "Amiga Workbench الفاتح",
          "description": "سطح مكتب رمادي فاتح ونوافذ بارزة ونص داكن وأشرطة زرقاء مستوحاة من Amiga Workbench 2.x/3.x. هذا اقتراح للمراجعة ولا يغيّر المظهر الأساسي."
        },
        "hi-IN": {
          "name": "हल्का Amiga Workbench",
          "description": "Amiga Workbench 2.x/3.x से प्रेरित हल्का धूसर डेस्कटॉप, उभरी हुई विंडो, गहरा पाठ और नीली शीर्ष पट्टियाँ। यह समीक्षा प्रस्ताव है; मूल रूप अपरिवर्तित है।"
        },
        "zh-CN": {
          "name": "浅色 Amiga Workbench",
          "description": "浅灰桌面、凸起窗口、深色文字和蓝色标题栏，灵感来自 Amiga Workbench 2.x/3.x。此浅色变体供审核，经典外观保持不变。"
        },
        "ja-JP": {
          "name": "ライト Amiga Workbench",
          "description": "Amiga Workbench 2.x/3.x を参考にした、明るいグレーのデスクトップ、立体的なウィンドウ、濃い文字色、青いタイトルバーです。確認用の提案で、標準の外観は変更しません。"
        },
        "ko-KR": {
          "name": "라이트 Amiga Workbench",
          "description": "Amiga Workbench 2.x/3.x에서 영감을 받은 밝은 회색 바탕, 돌출된 창, 어두운 글자와 파란 제목 표시줄입니다. 검토용 제안이며 기본 외관은 유지됩니다."
        }
      },
      "tokens": {
        "--bg": "#A8B2C0",
        "--surface": "#F4F4F4",
        "--surface-2": "#D8DCE2",
        "--fg": "#141920",
        "--muted": "#394555",
        "--accent": "#234F91",
        "--accent-fg": "#FFFFFF",
        "--border": "#394555",
        "--focus": "#C66A20",
        "--shadow": "0 8px 24px rgba(20, 18, 22, .16)"
      },
      "colors": {
        "--bg": "#A8B2C0",
        "--surface": "#F4F4F4",
        "--accent": "#234F91"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"retro-computing\"][data-variant=\"alternate\"] .hero",
          "signal": "Contraparte Workbench clara: desktop cinza, janelas elevadas, texto escuro e barras azuis, com foco laranja discernível.",
          "skillReference": "styles/retro-computing.css — identidade canônica; revisão visual local",
          "evidence": "Contraparte construída sem editar styles/retro-computing.css."
        },
        {
          "selector": "#stage[data-style=\"retro-computing\"][data-variant=\"alternate\"]",
          "signal": "A variante clara remove o fundo de terminal para impedir que textura e brilho verdes do modo escuro contaminem a leitura.",
          "skillReference": "styles/retro-computing.css — identidade canônica",
          "evidence": "A camada é pointer-events:none e subordinada ao conteúdo."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"retro-computing\"][data-variant=\"alternate\"] #view-painel",
          "property": "grid-template-columns / grid-template-areas / gap",
          "before": "Painel segue fluxo canônico de uma coluna; KPI usa grade fluida definida pelo estilo.",
          "after": "monospaced console transcript in a fixed header, control modules in a two-column instrument panel. Desktop usa trilho principal+secundário; mobile preserva ordem e fluxo único.",
          "breakpoints": {
            "320": {
              "before": "fluxo canônico em coluna, sem overflow intencional",
              "after": "1 coluna, gap 16px e padding lateral 18px"
            },
            "375": {
              "before": "fluxo canônico em coluna, grade fluida",
              "after": "1 coluna; hero e controles cabem na largura útil"
            },
            "768": {
              "before": "fluxo principal em coluna, elementos fluem naturalmente",
              "after": "1 coluna; composição mantém leitura vertical e não comprime cartões"
            },
            "1280": {
              "before": "fluxo canônico em coluna por regiões",
              "after": "2 trilhos: hero 1.25fr e métricas .75fr; recursos atravessam as colunas, formulário e atividade dividem a linha inferior"
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"retro-computing\"][data-variant=\"alternate\"] .hero::after",
          "animation": "retro-computing-element",
          "trigger": "Ao aplicar a contraparte, regra CSS de entrada do filete decorativo do hero.",
          "duration": "520ms ease-out, scaleX; somente decoração, conteúdo sempre visível.",
          "fallback": "Sem suporte a animação CSS, filete permanece estático; conteúdo não depende do movimento.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa a animação.",
          "pauseResume": "Animação de entrada finita; não há loop contínuo nem estado de conteúdo.",
          "cleanup": "Ao remover a folha da contraparte, pseudo-elemento e animação desaparecem."
        },
        "background": {
          "selector": "#stage[data-style=\"retro-computing\"][data-variant=\"alternate\"]::after",
          "animation": "retro-computing-background",
          "trigger": "Loop ambiental sutil enquanto a contraparte está ativa.",
          "duration": "32s ease-in-out alternate; somente opacidade e posição de background, sem camada sobre interação.",
          "fallback": "Sem suporte a animação, textura permanece estática e decorativa.",
          "reducedMotion": "prefers-reduced-motion: reduce desativa o loop.",
          "pauseResume": "CSS anima apenas enquanto a folha alternate permanece aplicada; o navegador suspende a aba oculta.",
          "cleanup": "Ao remover a folha da contraparte, camada e animação desaparecem."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"retro-computing\"][data-variant=\"alternate\"] .hero::after",
      "backgroundTarget": "#stage[data-style=\"retro-computing\"][data-variant=\"alternate\"]::after",
      "contentDigest": "48849d248d331ef76841ee9891291099aa09375e4159cd1229df2136f02b72e7",
      "generatedDigest": "2b9334d33ab395ecdb98972e7976c28bdca2556ea87bd544e633380350295b51",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "pixel-art": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/pixel-art.css",
      "nameKey": "appearance.pixel-art.alternate.name",
      "descriptionKey": "appearance.pixel-art.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Pixel Art",
          "description": "A proposta preserva os sinais de Pixel art, stepped color blocks and cartridge-era sprite logic, com paleta clara e composição inventory rail; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Pixel Art",
          "description": "This proposal keeps the visual cues of Pixel art, stepped color blocks and cartridge-era sprite logic, with a light palette and a inventory rail composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Pixel Art",
          "description": "La propuesta conserva los rasgos de Pixel art, stepped color blocks and cartridge-era sprite logic, con paleta clara y composición inventory rail; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Pixel Art",
          "description": "La proposition conserve les codes de Pixel art, stepped color blocks and cartridge-era sprite logic, avec une palette claire et une composition inventory rail ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Pixel Art",
          "description": "Der Entwurf bewahrt die Merkmale von Pixel art, stepped color blocks and cartridge-era sprite logic, mit einer helle Palette und einer Komposition als inventory rail; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Pixel Art",
          "description": "Предложение сохраняет черты стиля Pixel art, stepped color blocks and cartridge-era sprite logic, используя светлую палитру и композицию «inventory rail»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Pixel Art",
          "description": "يحافظ الاقتراح على سمات Pixel art, stepped color blocks and cartridge-era sprite logic، مع لوحة فاتحة وتكوين «inventory rail»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Pixel Art",
          "description": "यह प्रस्ताव Pixel art, stepped color blocks and cartridge-era sprite logic की दृश्य पहचान बनाए रखता है, हल्की रंग-पैलेट और inventory rail संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Pixel Art",
          "description": "此提案保留 Pixel art, stepped color blocks and cartridge-era sprite logic 的视觉特征，采用浅色色板与inventory rail构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Pixel Art",
          "description": "この案はPixel art, stepped color blocks and cartridge-era sprite logicの視覚的特徴を保ち、ライト配色と「inventory rail」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Pixel Art",
          "description": "이 제안은 Pixel art, stepped color blocks and cartridge-era sprite logic의 시각적 특징을 유지하면서 밝은 팔레트와 inventory rail 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#F5E9D5",
        "--surface": "#FFF8E9",
        "--surface-2": "#E7D5B5",
        "--fg": "#32251D",
        "--muted": "#594538",
        "--accent": "#A84432",
        "--accent-fg": "#FFFFFF",
        "--border": "#8B735A",
        "--ok": "#24764F",
        "--warn": "#805400",
        "--danger": "#A12D37",
        "--focus": "#A84432",
        "--radius": "0px",
        "--radius-sm": "0px",
        "--shadow": "0 8px 22px rgba(0,0,0,.16)"
      },
      "colors": {
        "--bg": "#F5E9D5",
        "--surface": "#FFF8E9",
        "--accent": "#A84432"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"pixel-art\"]",
          "signal": "Pixel art, stepped color blocks and cartridge-era sprite logic; a proposta traduz esses sinais para light usando pixel grid + stepped checkerboard, mantendo inventory rail como organização de leitura.",
          "skillReference": "styles/pixel-art.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/pixel-art.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva inventory rail: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/pixel-art.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema pixel-art, definida em styles/pixel-art.css.",
          "after": "No mobile: uma coluna compacta; no desktop: inventory rail, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas inventory rail; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "pixel-art-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"pixel-art\"][data-variant=\"alternate\"]::before",
          "animation": "pixel-art-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"pixel-art\"][data-variant=\"alternate\"]::before",
      "contentDigest": "40055c97ec4345f95efa7e31c504abbf57021ce27b7ab74290aa343add1b63da",
      "generatedDigest": "eb63bcc1f25b0c985f50e49c0465eb7ad59ba6d4f5a7a78bcafb4490ffe29df3",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "terminal-tui": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/terminal-tui.css",
      "nameKey": "appearance.terminal-tui.alternate.name",
      "descriptionKey": "appearance.terminal-tui.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Terminal Tui",
          "description": "A proposta preserva os sinais de A command console with phosphor green and fixed-width hierarchy, com paleta clara e composição command console; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Terminal Tui",
          "description": "This proposal keeps the visual cues of A command console with phosphor green and fixed-width hierarchy, with a light palette and a command console composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Terminal Tui",
          "description": "La propuesta conserva los rasgos de A command console with phosphor green and fixed-width hierarchy, con paleta clara y composición command console; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Terminal Tui",
          "description": "La proposition conserve les codes de A command console with phosphor green and fixed-width hierarchy, avec une palette claire et une composition command console ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Terminal Tui",
          "description": "Der Entwurf bewahrt die Merkmale von A command console with phosphor green and fixed-width hierarchy, mit einer helle Palette und einer Komposition als command console; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Terminal Tui",
          "description": "Предложение сохраняет черты стиля A command console with phosphor green and fixed-width hierarchy, используя светлую палитру и композицию «command console»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Terminal Tui",
          "description": "يحافظ الاقتراح على سمات A command console with phosphor green and fixed-width hierarchy، مع لوحة فاتحة وتكوين «command console»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Terminal Tui",
          "description": "यह प्रस्ताव A command console with phosphor green and fixed-width hierarchy की दृश्य पहचान बनाए रखता है, हल्की रंग-पैलेट और command console संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Terminal Tui",
          "description": "此提案保留 A command console with phosphor green and fixed-width hierarchy 的视觉特征，采用浅色色板与command console构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Terminal Tui",
          "description": "この案はA command console with phosphor green and fixed-width hierarchyの視覚的特徴を保ち、ライト配色と「command console」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Terminal Tui",
          "description": "이 제안은 A command console with phosphor green and fixed-width hierarchy의 시각적 특징을 유지하면서 밝은 팔레트와 command console 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#E8F0E5",
        "--surface": "#F8FFF4",
        "--surface-2": "#DCEAD6",
        "--fg": "#14241B",
        "--muted": "#344D3B",
        "--accent": "#236D43",
        "--accent-fg": "#FFFFFF",
        "--border": "#6E8872",
        "--ok": "#24764F",
        "--warn": "#805400",
        "--danger": "#A12D37",
        "--focus": "#236D43",
        "--radius": "2px",
        "--radius-sm": "6px",
        "--shadow": "0 8px 22px rgba(0,0,0,.16)"
      },
      "colors": {
        "--bg": "#E8F0E5",
        "--surface": "#F8FFF4",
        "--accent": "#236D43"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"terminal-tui\"]",
          "signal": "A command console with phosphor green and fixed-width hierarchy; a proposta traduz esses sinais para light usando green phosphor scanline and ASCII frame, mantendo command console como organização de leitura.",
          "skillReference": "styles/terminal-tui.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/terminal-tui.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva command console: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/terminal-tui.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema terminal-tui, definida em styles/terminal-tui.css.",
          "after": "No mobile: uma coluna compacta; no desktop: command console, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas command console; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "terminal-tui-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"terminal-tui\"][data-variant=\"alternate\"]::before",
          "animation": "terminal-tui-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"terminal-tui\"][data-variant=\"alternate\"]::before",
      "contentDigest": "0b4e6ce24c8cd7ba6f2e33f7974efbda9a3b6930a4fe6c0b914ef4897d25a787",
      "generatedDigest": "2a8802df9ea4cb6063dd9028204f715200060856216fd3bca01dc578373e849f",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "cassette-futurism": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/cassette-futurism.css",
      "nameKey": "appearance.cassette-futurism.alternate.name",
      "descriptionKey": "appearance.cassette-futurism.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Cassette Futurism",
          "description": "A proposta preserva os sinais de Analog control gear, warm plastics and readable instrument labels, com paleta clara e composição equipment rack; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Cassette Futurism",
          "description": "This proposal keeps the visual cues of Analog control gear, warm plastics and readable instrument labels, with a light palette and a equipment rack composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Cassette Futurism",
          "description": "La propuesta conserva los rasgos de Analog control gear, warm plastics and readable instrument labels, con paleta clara y composición equipment rack; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Cassette Futurism",
          "description": "La proposition conserve les codes de Analog control gear, warm plastics and readable instrument labels, avec une palette claire et une composition equipment rack ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Cassette Futurism",
          "description": "Der Entwurf bewahrt die Merkmale von Analog control gear, warm plastics and readable instrument labels, mit einer helle Palette und einer Komposition als equipment rack; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Cassette Futurism",
          "description": "Предложение сохраняет черты стиля Analog control gear, warm plastics and readable instrument labels, используя светлую палитру и композицию «equipment rack»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Cassette Futurism",
          "description": "يحافظ الاقتراح على سمات Analog control gear, warm plastics and readable instrument labels، مع لوحة فاتحة وتكوين «equipment rack»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Cassette Futurism",
          "description": "यह प्रस्ताव Analog control gear, warm plastics and readable instrument labels की दृश्य पहचान बनाए रखता है, हल्की रंग-पैलेट और equipment rack संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Cassette Futurism",
          "description": "此提案保留 Analog control gear, warm plastics and readable instrument labels 的视觉特征，采用浅色色板与equipment rack构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Cassette Futurism",
          "description": "この案はAnalog control gear, warm plastics and readable instrument labelsの視覚的特徴を保ち、ライト配色と「equipment rack」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Cassette Futurism",
          "description": "이 제안은 Analog control gear, warm plastics and readable instrument labels의 시각적 특징을 유지하면서 밝은 팔레트와 equipment rack 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#E9E1D2",
        "--surface": "#F8F3E9",
        "--surface-2": "#D5CCBB",
        "--fg": "#292A27",
        "--muted": "#4C4E49",
        "--accent": "#A5462A",
        "--accent-fg": "#FFFFFF",
        "--border": "#756D5F",
        "--ok": "#24764F",
        "--warn": "#805400",
        "--danger": "#A12D37",
        "--focus": "#A5462A",
        "--radius": "6px",
        "--radius-sm": "6px",
        "--shadow": "0 8px 22px rgba(0,0,0,.16)"
      },
      "colors": {
        "--bg": "#E9E1D2",
        "--surface": "#F8F3E9",
        "--accent": "#A5462A"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"cassette-futurism\"]",
          "signal": "Analog control gear, warm plastics and readable instrument labels; a proposta traduz esses sinais para light usando tape reel rings and warm CRT phosphor, mantendo equipment rack como organização de leitura. O campo ornamental tem padrão exclusivo descrito no CSS desta proposta.",
          "skillReference": "styles/cassette-futurism.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/cassette-futurism.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva equipment rack: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/cassette-futurism.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema cassette-futurism, definida em styles/cassette-futurism.css.",
          "after": "No mobile: uma coluna compacta; no desktop: equipment rack, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas equipment rack; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "cassette-futurism-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"cassette-futurism\"][data-variant=\"alternate\"]::before",
          "animation": "cassette-futurism-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"cassette-futurism\"][data-variant=\"alternate\"]::before",
      "contentDigest": "501a5e38c14662e0f96d8652661f26204bb496b1e4f440b57f36109c4919dcbf",
      "generatedDigest": "42295c526751525d2c94b59c20af7ff46b99974217634faf521c6b03af590432",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "cyberpunk": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/cyberpunk.css",
      "nameKey": "appearance.cyberpunk.alternate.name",
      "descriptionKey": "appearance.cyberpunk.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Cyberpunk",
          "description": "A proposta preserva os sinais de A neon-noir tactical deck with clipped rails and signal magenta, com paleta clara e composição split command deck; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Cyberpunk",
          "description": "This proposal keeps the visual cues of A neon-noir tactical deck with clipped rails and signal magenta, with a light palette and a split command deck composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Cyberpunk",
          "description": "La propuesta conserva los rasgos de A neon-noir tactical deck with clipped rails and signal magenta, con paleta clara y composición split command deck; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Cyberpunk",
          "description": "La proposition conserve les codes de A neon-noir tactical deck with clipped rails and signal magenta, avec une palette claire et une composition split command deck ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Cyberpunk",
          "description": "Der Entwurf bewahrt die Merkmale von A neon-noir tactical deck with clipped rails and signal magenta, mit einer helle Palette und einer Komposition als split command deck; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Cyberpunk",
          "description": "Предложение сохраняет черты стиля A neon-noir tactical deck with clipped rails and signal magenta, используя светлую палитру и композицию «split command deck»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Cyberpunk",
          "description": "يحافظ الاقتراح على سمات A neon-noir tactical deck with clipped rails and signal magenta، مع لوحة فاتحة وتكوين «split command deck»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Cyberpunk",
          "description": "यह प्रस्ताव A neon-noir tactical deck with clipped rails and signal magenta की दृश्य पहचान बनाए रखता है, हल्की रंग-पैलेट और split command deck संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Cyberpunk",
          "description": "此提案保留 A neon-noir tactical deck with clipped rails and signal magenta 的视觉特征，采用浅色色板与split command deck构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Cyberpunk",
          "description": "この案はA neon-noir tactical deck with clipped rails and signal magentaの視覚的特徴を保ち、ライト配色と「split command deck」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Cyberpunk",
          "description": "이 제안은 A neon-noir tactical deck with clipped rails and signal magenta의 시각적 특징을 유지하면서 밝은 팔레트와 split command deck 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#E8E3F4",
        "--surface": "#F8F5FF",
        "--surface-2": "#DDD4F0",
        "--fg": "#241A36",
        "--muted": "#4E3A68",
        "--accent": "#A51E67",
        "--accent-fg": "#FFFFFF",
        "--border": "#846F9D",
        "--ok": "#24764F",
        "--warn": "#805400",
        "--danger": "#A12D37",
        "--focus": "#A51E67",
        "--radius": "0px",
        "--radius-sm": "0px",
        "--shadow": "0 8px 22px rgba(0,0,0,.16)"
      },
      "colors": {
        "--bg": "#E8E3F4",
        "--surface": "#F8F5FF",
        "--accent": "#A51E67"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"cyberpunk\"]",
          "signal": "A neon-noir tactical deck with clipped rails and signal magenta; a proposta traduz esses sinais para light usando angled signal bands and restrained magenta telemetry, mantendo split command deck como organização de leitura.",
          "skillReference": "styles/cyberpunk.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/cyberpunk.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva split command deck: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/cyberpunk.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema cyberpunk, definida em styles/cyberpunk.css.",
          "after": "No mobile: uma coluna compacta; no desktop: split command deck, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas split command deck; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "cyberpunk-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"cyberpunk\"][data-variant=\"alternate\"]",
          "animation": "cyberpunk-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"cyberpunk\"][data-variant=\"alternate\"]",
      "contentDigest": "d414d73a2f5bccdaf32b67d84f8ff4cdf81f74eb4f26e88a86214bb084b41c55",
      "generatedDigest": "17447e9c6bf98ff3a6a3917f3e0d5cc7bbffaaa8ef7987d6fdbdcfbd35bcfaa6",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "atompunk": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/atompunk.css",
      "nameKey": "appearance.atompunk.alternate.name",
      "descriptionKey": "appearance.atompunk.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Atompunk",
          "description": "A proposta preserva os sinais de Cold-war instrumentation, radar geometry and calibrated dials, com paleta clara e composição instrument console; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Atompunk",
          "description": "This proposal keeps the visual cues of Cold-war instrumentation, radar geometry and calibrated dials, with a light palette and a instrument console composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Atompunk",
          "description": "La propuesta conserva los rasgos de Cold-war instrumentation, radar geometry and calibrated dials, con paleta clara y composición instrument console; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Atompunk",
          "description": "La proposition conserve les codes de Cold-war instrumentation, radar geometry and calibrated dials, avec une palette claire et une composition instrument console ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Atompunk",
          "description": "Der Entwurf bewahrt die Merkmale von Cold-war instrumentation, radar geometry and calibrated dials, mit einer helle Palette und einer Komposition als instrument console; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Atompunk",
          "description": "Предложение сохраняет черты стиля Cold-war instrumentation, radar geometry and calibrated dials, используя светлую палитру и композицию «instrument console»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Atompunk",
          "description": "يحافظ الاقتراح على سمات Cold-war instrumentation, radar geometry and calibrated dials، مع لوحة فاتحة وتكوين «instrument console»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Atompunk",
          "description": "यह प्रस्ताव Cold-war instrumentation, radar geometry and calibrated dials की दृश्य पहचान बनाए रखता है, हल्की रंग-पैलेट और instrument console संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Atompunk",
          "description": "此提案保留 Cold-war instrumentation, radar geometry and calibrated dials 的视觉特征，采用浅色色板与instrument console构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Atompunk",
          "description": "この案はCold-war instrumentation, radar geometry and calibrated dialsの視覚的特徴を保ち、ライト配色と「instrument console」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Atompunk",
          "description": "이 제안은 Cold-war instrumentation, radar geometry and calibrated dials의 시각적 특징을 유지하면서 밝은 팔레트와 instrument console 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#E7EDF0",
        "--surface": "#F8FBFC",
        "--surface-2": "#D9E2E6",
        "--fg": "#1D2A31",
        "--muted": "#40535D",
        "--accent": "#A64B24",
        "--accent-fg": "#FFFFFF",
        "--border": "#667B83",
        "--ok": "#24764F",
        "--warn": "#805400",
        "--danger": "#A12D37",
        "--focus": "#A64B24",
        "--radius": "4px",
        "--radius-sm": "6px",
        "--shadow": "0 8px 22px rgba(0,0,0,.16)"
      },
      "colors": {
        "--bg": "#E7EDF0",
        "--surface": "#F8FBFC",
        "--accent": "#A64B24"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"atompunk\"]",
          "signal": "Cold-war instrumentation, radar geometry and calibrated dials; a proposta traduz esses sinais para light usando radar rings and instrument tick marks, mantendo instrument console como organização de leitura. O campo ornamental tem padrão exclusivo descrito no CSS desta proposta.",
          "skillReference": "styles/atompunk.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/atompunk.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva instrument console: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/atompunk.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema atompunk, definida em styles/atompunk.css.",
          "after": "No mobile: uma coluna compacta; no desktop: instrument console, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas instrument console; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "atompunk-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"atompunk\"][data-variant=\"alternate\"]::before",
          "animation": "atompunk-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"atompunk\"][data-variant=\"alternate\"]::before",
      "contentDigest": "33cb3065aa370c365c49f9e52d53a2475c0f4064e1812fdd5aef1408a46d0bbc",
      "generatedDigest": "0fd477ead972bd077d654ceab8c4bf61fa6512f290148d1342d587bc02821962",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "dracula": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/dracula.css",
      "nameKey": "appearance.dracula.alternate.name",
      "descriptionKey": "appearance.dracula.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Dracula",
          "description": "A proposta preserva os sinais de A violet syntax palette translated into a focused editor surface, com paleta clara e composição code editor; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Dracula",
          "description": "This proposal keeps the visual cues of A violet syntax palette translated into a focused editor surface, with a light palette and a code editor composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Dracula",
          "description": "La propuesta conserva los rasgos de A violet syntax palette translated into a focused editor surface, con paleta clara y composición code editor; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Dracula",
          "description": "La proposition conserve les codes de A violet syntax palette translated into a focused editor surface, avec une palette claire et une composition code editor ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Dracula",
          "description": "Der Entwurf bewahrt die Merkmale von A violet syntax palette translated into a focused editor surface, mit einer helle Palette und einer Komposition als code editor; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Dracula",
          "description": "Предложение сохраняет черты стиля A violet syntax palette translated into a focused editor surface, используя светлую палитру и композицию «code editor»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Dracula",
          "description": "يحافظ الاقتراح على سمات A violet syntax palette translated into a focused editor surface، مع لوحة فاتحة وتكوين «code editor»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Dracula",
          "description": "यह प्रस्ताव A violet syntax palette translated into a focused editor surface की दृश्य पहचान बनाए रखता है, हल्की रंग-पैलेट और code editor संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Dracula",
          "description": "此提案保留 A violet syntax palette translated into a focused editor surface 的视觉特征，采用浅色色板与code editor构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Dracula",
          "description": "この案はA violet syntax palette translated into a focused editor surfaceの視覚的特徴を保ち、ライト配色と「code editor」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Dracula",
          "description": "이 제안은 A violet syntax palette translated into a focused editor surface의 시각적 특징을 유지하면서 밝은 팔레트와 code editor 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#F1EFF7",
        "--surface": "#FFFFFF",
        "--surface-2": "#E6E1EF",
        "--fg": "#242233",
        "--muted": "#49455B",
        "--accent": "#6740A0",
        "--accent-fg": "#FFFFFF",
        "--border": "#837C95",
        "--ok": "#24764F",
        "--warn": "#805400",
        "--danger": "#A12D37",
        "--focus": "#6740A0",
        "--radius": "8px",
        "--radius-sm": "6px",
        "--shadow": "0 8px 22px rgba(0,0,0,.16)"
      },
      "colors": {
        "--bg": "#F1EFF7",
        "--surface": "#FFFFFF",
        "--accent": "#6740A0"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"dracula\"]",
          "signal": "A violet syntax palette translated into a focused editor surface; a proposta traduz esses sinais para light usando violet syntax rails and compact code chips, mantendo code editor como organização de leitura.",
          "skillReference": "styles/dracula.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/dracula.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva code editor: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/dracula.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema dracula, definida em styles/dracula.css.",
          "after": "No mobile: uma coluna compacta; no desktop: code editor, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas code editor; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "dracula-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"dracula\"][data-variant=\"alternate\"]::before",
          "animation": "dracula-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"dracula\"][data-variant=\"alternate\"]::before",
      "contentDigest": "063d3c5f6028e693d84b4559173ca91e928759491457b749c9479ed4b1ef8b62",
      "generatedDigest": "441ea742fdd691be7a93cb509841456dfbd16c2afb66dfbfa1a75e52a77b7fdf",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "dungeon-synth": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/dungeon-synth.css",
      "nameKey": "appearance.dungeon-synth.alternate.name",
      "descriptionKey": "appearance.dungeon-synth.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Dungeon Synth",
          "description": "A proposta preserva os sinais de A stone crypt palette with quiet runic dividers, com paleta clara e composição crypt hall; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Dungeon Synth",
          "description": "This proposal keeps the visual cues of A stone crypt palette with quiet runic dividers, with a light palette and a crypt hall composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Dungeon Synth",
          "description": "La propuesta conserva los rasgos de A stone crypt palette with quiet runic dividers, con paleta clara y composición crypt hall; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Dungeon Synth",
          "description": "La proposition conserve les codes de A stone crypt palette with quiet runic dividers, avec une palette claire et une composition crypt hall ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Dungeon Synth",
          "description": "Der Entwurf bewahrt die Merkmale von A stone crypt palette with quiet runic dividers, mit einer helle Palette und einer Komposition als crypt hall; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Dungeon Synth",
          "description": "Предложение сохраняет черты стиля A stone crypt palette with quiet runic dividers, используя светлую палитру и композицию «crypt hall»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Dungeon Synth",
          "description": "يحافظ الاقتراح على سمات A stone crypt palette with quiet runic dividers، مع لوحة فاتحة وتكوين «crypt hall»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Dungeon Synth",
          "description": "यह प्रस्ताव A stone crypt palette with quiet runic dividers की दृश्य पहचान बनाए रखता है, हल्की रंग-पैलेट और crypt hall संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Dungeon Synth",
          "description": "此提案保留 A stone crypt palette with quiet runic dividers 的视觉特征，采用浅色色板与crypt hall构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Dungeon Synth",
          "description": "この案はA stone crypt palette with quiet runic dividersの視覚的特徴を保ち、ライト配色と「crypt hall」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Dungeon Synth",
          "description": "이 제안은 A stone crypt palette with quiet runic dividers의 시각적 특징을 유지하면서 밝은 팔레트와 crypt hall 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#E2D9C4",
        "--surface": "#F3EAD5",
        "--surface-2": "#D6C7A8",
        "--fg": "#29251E",
        "--muted": "#4F4635",
        "--accent": "#5B6240",
        "--accent-fg": "#FFFFFF",
        "--border": "#776C54",
        "--ok": "#24764F",
        "--warn": "#805400",
        "--danger": "#A12D37",
        "--focus": "#5B6240",
        "--radius": "2px",
        "--radius-sm": "6px",
        "--shadow": "0 8px 22px rgba(0,0,0,.16)"
      },
      "colors": {
        "--bg": "#E2D9C4",
        "--surface": "#F3EAD5",
        "--accent": "#5B6240"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"dungeon-synth\"]",
          "signal": "A stone crypt palette with quiet runic dividers; a proposta traduz esses sinais para light usando stone course lines and rune-like dividers, mantendo crypt hall como organização de leitura.",
          "skillReference": "styles/dungeon-synth.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/dungeon-synth.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva crypt hall: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/dungeon-synth.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema dungeon-synth, definida em styles/dungeon-synth.css.",
          "after": "No mobile: uma coluna compacta; no desktop: crypt hall, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas crypt hall; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "dungeon-synth-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"dungeon-synth\"][data-variant=\"alternate\"]::before",
          "animation": "dungeon-synth-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"dungeon-synth\"][data-variant=\"alternate\"]::before",
      "contentDigest": "57cc4bbaae1ee7c388e6b5c7a0634e56c6dc97bd46fc048a91b9e683007f86e9",
      "generatedDigest": "0d94441bd5780e1b98fd312355156733c65b2d77140390e5869fe94b06a56a2e",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "dark-fantasy": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/dark-fantasy.css",
      "nameKey": "appearance.dark-fantasy.alternate.name",
      "descriptionKey": "appearance.dark-fantasy.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Dark Fantasy",
          "description": "A proposta preserva os sinais de A grim chronicle in iron, parchment and restrained crimson, com paleta clara e composição chronicle spread; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Dark Fantasy",
          "description": "This proposal keeps the visual cues of A grim chronicle in iron, parchment and restrained crimson, with a light palette and a chronicle spread composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Dark Fantasy",
          "description": "La propuesta conserva los rasgos de A grim chronicle in iron, parchment and restrained crimson, con paleta clara y composición chronicle spread; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Dark Fantasy",
          "description": "La proposition conserve les codes de A grim chronicle in iron, parchment and restrained crimson, avec une palette claire et une composition chronicle spread ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Dark Fantasy",
          "description": "Der Entwurf bewahrt die Merkmale von A grim chronicle in iron, parchment and restrained crimson, mit einer helle Palette und einer Komposition als chronicle spread; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Dark Fantasy",
          "description": "Предложение сохраняет черты стиля A grim chronicle in iron, parchment and restrained crimson, используя светлую палитру и композицию «chronicle spread»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Dark Fantasy",
          "description": "يحافظ الاقتراح على سمات A grim chronicle in iron, parchment and restrained crimson، مع لوحة فاتحة وتكوين «chronicle spread»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Dark Fantasy",
          "description": "यह प्रस्ताव A grim chronicle in iron, parchment and restrained crimson की दृश्य पहचान बनाए रखता है, हल्की रंग-पैलेट और chronicle spread संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Dark Fantasy",
          "description": "此提案保留 A grim chronicle in iron, parchment and restrained crimson 的视觉特征，采用浅色色板与chronicle spread构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Dark Fantasy",
          "description": "この案はA grim chronicle in iron, parchment and restrained crimsonの視覚的特徴を保ち、ライト配色と「chronicle spread」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Dark Fantasy",
          "description": "이 제안은 A grim chronicle in iron, parchment and restrained crimson의 시각적 특징을 유지하면서 밝은 팔레트와 chronicle spread 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#E6DDD1",
        "--surface": "#F6EEE2",
        "--surface-2": "#D9C8B6",
        "--fg": "#33231F",
        "--muted": "#57413A",
        "--accent": "#8A2930",
        "--accent-fg": "#FFFFFF",
        "--border": "#7F6B5B",
        "--ok": "#24764F",
        "--warn": "#805400",
        "--danger": "#A12D37",
        "--focus": "#8A2930",
        "--radius": "2px",
        "--radius-sm": "6px",
        "--shadow": "0 8px 22px rgba(0,0,0,.16)"
      },
      "colors": {
        "--bg": "#E6DDD1",
        "--surface": "#F6EEE2",
        "--accent": "#8A2930"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"dark-fantasy\"]",
          "signal": "A grim chronicle in iron, parchment and restrained crimson; a proposta traduz esses sinais para light usando burnished iron rules and crimson heraldic marks, mantendo chronicle spread como organização de leitura.",
          "skillReference": "styles/dark-fantasy.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/dark-fantasy.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva chronicle spread: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/dark-fantasy.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema dark-fantasy, definida em styles/dark-fantasy.css.",
          "after": "No mobile: uma coluna compacta; no desktop: chronicle spread, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas chronicle spread; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "dark-fantasy-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"dark-fantasy\"][data-variant=\"alternate\"]::before",
          "animation": "dark-fantasy-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"dark-fantasy\"][data-variant=\"alternate\"]::before",
      "contentDigest": "2ec3ffe0e36294c21d3bba81ada5add5aad3eb03168b6bd701d7f5317621c55d",
      "generatedDigest": "b1ee0fe74c716a19af8cd31b7da5a27381178c60d6d4eb8a56fd5a2c5dfd7c19",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "biopunk": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/biopunk.css",
      "nameKey": "appearance.biopunk.alternate.name",
      "descriptionKey": "appearance.biopunk.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Biopunk",
          "description": "A proposta preserva os sinais de A synthetic specimen lab with living-cell geometry, com paleta clara e composição lab specimen map; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Biopunk",
          "description": "This proposal keeps the visual cues of A synthetic specimen lab with living-cell geometry, with a light palette and a lab specimen map composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Biopunk",
          "description": "La propuesta conserva los rasgos de A synthetic specimen lab with living-cell geometry, con paleta clara y composición lab specimen map; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Biopunk",
          "description": "La proposition conserve les codes de A synthetic specimen lab with living-cell geometry, avec une palette claire et une composition lab specimen map ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Biopunk",
          "description": "Der Entwurf bewahrt die Merkmale von A synthetic specimen lab with living-cell geometry, mit einer helle Palette und einer Komposition als lab specimen map; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Biopunk",
          "description": "Предложение сохраняет черты стиля A synthetic specimen lab with living-cell geometry, используя светлую палитру и композицию «lab specimen map»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Biopunk",
          "description": "يحافظ الاقتراح على سمات A synthetic specimen lab with living-cell geometry، مع لوحة فاتحة وتكوين «lab specimen map»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Biopunk",
          "description": "यह प्रस्ताव A synthetic specimen lab with living-cell geometry की दृश्य पहचान बनाए रखता है, हल्की रंग-पैलेट और lab specimen map संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Biopunk",
          "description": "此提案保留 A synthetic specimen lab with living-cell geometry 的视觉特征，采用浅色色板与lab specimen map构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Biopunk",
          "description": "この案はA synthetic specimen lab with living-cell geometryの視覚的特徴を保ち、ライト配色と「lab specimen map」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Biopunk",
          "description": "이 제안은 A synthetic specimen lab with living-cell geometry의 시각적 특징을 유지하면서 밝은 팔레트와 lab specimen map 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#E7F0E7",
        "--surface": "#F7FFF5",
        "--surface-2": "#D8EAD9",
        "--fg": "#1D3028",
        "--muted": "#405A49",
        "--accent": "#286F52",
        "--accent-fg": "#FFFFFF",
        "--border": "#638170",
        "--ok": "#24764F",
        "--warn": "#805400",
        "--danger": "#A12D37",
        "--focus": "#286F52",
        "--radius": "22px 12px 24px 10px",
        "--radius-sm": "6px",
        "--shadow": "0 8px 22px rgba(0,0,0,.16)"
      },
      "colors": {
        "--bg": "#E7F0E7",
        "--surface": "#F7FFF5",
        "--accent": "#286F52"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"biopunk\"]",
          "signal": "A synthetic specimen lab with living-cell geometry; a proposta traduz esses sinais para light usando specimen-cell lattice and chlorophyll veins, mantendo lab specimen map como organização de leitura. O campo ornamental tem padrão exclusivo descrito no CSS desta proposta.",
          "skillReference": "styles/biopunk.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/biopunk.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva lab specimen map: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/biopunk.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema biopunk, definida em styles/biopunk.css.",
          "after": "No mobile: uma coluna compacta; no desktop: lab specimen map, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas lab specimen map; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "biopunk-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"biopunk\"][data-variant=\"alternate\"]::before",
          "animation": "biopunk-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"biopunk\"][data-variant=\"alternate\"]::before",
      "contentDigest": "a25053132882ed5a4faefb75c597edbac92593a4a57bd94c7017f16d98deed59",
      "generatedDigest": "5c0cc070e5357fbda511949451469cb9cccb3f7acff21f614c6d8a8be60445f2",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "clockpunk": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/clockpunk.css",
      "nameKey": "appearance.clockpunk.alternate.name",
      "descriptionKey": "appearance.clockpunk.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Clockpunk",
          "description": "A proposta preserva os sinais de A nocturnal brass mechanism with calibrated rings, com paleta escura e composição mechanism ledger; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Clockpunk",
          "description": "This proposal keeps the visual cues of A nocturnal brass mechanism with calibrated rings, with a dark palette and a mechanism ledger composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Clockpunk",
          "description": "La propuesta conserva los rasgos de A nocturnal brass mechanism with calibrated rings, con paleta oscura y composición mechanism ledger; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Clockpunk",
          "description": "La proposition conserve les codes de A nocturnal brass mechanism with calibrated rings, avec une palette sombre et une composition mechanism ledger ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Clockpunk",
          "description": "Der Entwurf bewahrt die Merkmale von A nocturnal brass mechanism with calibrated rings, mit einer dunkle Palette und einer Komposition als mechanism ledger; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Clockpunk",
          "description": "Предложение сохраняет черты стиля A nocturnal brass mechanism with calibrated rings, используя тёмную палитру и композицию «mechanism ledger»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Clockpunk",
          "description": "يحافظ الاقتراح على سمات A nocturnal brass mechanism with calibrated rings، مع لوحة داكنة وتكوين «mechanism ledger»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Clockpunk",
          "description": "यह प्रस्ताव A nocturnal brass mechanism with calibrated rings की दृश्य पहचान बनाए रखता है, गहरी रंग-पैलेट और mechanism ledger संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Clockpunk",
          "description": "此提案保留 A nocturnal brass mechanism with calibrated rings 的视觉特征，采用深色色板与mechanism ledger构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Clockpunk",
          "description": "この案はA nocturnal brass mechanism with calibrated ringsの視覚的特徴を保ち、ダーク配色と「mechanism ledger」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Clockpunk",
          "description": "이 제안은 A nocturnal brass mechanism with calibrated rings의 시각적 특징을 유지하면서 어두운 팔레트와 mechanism ledger 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#171B28",
        "--surface": "#232A3A",
        "--surface-2": "#30394A",
        "--fg": "#F0E8D8",
        "--muted": "#D6C7A8",
        "--accent": "#D0A44A",
        "--accent-fg": "#17130D",
        "--border": "#928268",
        "--ok": "#77D6A1",
        "--warn": "#F2C66D",
        "--danger": "#FF929A",
        "--focus": "#FFE27A",
        "--radius": "4px",
        "--radius-sm": "6px",
        "--shadow": "0 12px 28px rgba(0,0,0,.26)"
      },
      "colors": {
        "--bg": "#171B28",
        "--surface": "#232A3A",
        "--accent": "#D0A44A"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"clockpunk\"]",
          "signal": "A nocturnal brass mechanism with calibrated rings; a proposta traduz esses sinais para dark usando brass escapement rings and calibration arcs, mantendo mechanism ledger como organização de leitura.",
          "skillReference": "styles/clockpunk.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/clockpunk.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva mechanism ledger: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/clockpunk.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema clockpunk, definida em styles/clockpunk.css.",
          "after": "No mobile: uma coluna compacta; no desktop: mechanism ledger, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas mechanism ledger; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "clockpunk-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"clockpunk\"][data-variant=\"alternate\"]::before",
          "animation": "clockpunk-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"clockpunk\"][data-variant=\"alternate\"]::before",
      "contentDigest": "ed192b627ad928d88e2702965c44b710a0cf87b2a955b162d8e36d513e45a99d",
      "generatedDigest": "b503052cbcf791b60befe037b33608d29fdd8d93d2d1782b8a2432c9fa7b8fb6",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "dieselpunk": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/dieselpunk.css",
      "nameKey": "appearance.dieselpunk.alternate.name",
      "descriptionKey": "appearance.dieselpunk.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Dieselpunk",
          "description": "A proposta preserva os sinais de A soot-stained industrial plan with rivets and copper, com paleta clara e composição factory floorplan; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Dieselpunk",
          "description": "This proposal keeps the visual cues of A soot-stained industrial plan with rivets and copper, with a light palette and a factory floorplan composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Dieselpunk",
          "description": "La propuesta conserva los rasgos de A soot-stained industrial plan with rivets and copper, con paleta clara y composición factory floorplan; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Dieselpunk",
          "description": "La proposition conserve les codes de A soot-stained industrial plan with rivets and copper, avec une palette claire et une composition factory floorplan ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Dieselpunk",
          "description": "Der Entwurf bewahrt die Merkmale von A soot-stained industrial plan with rivets and copper, mit einer helle Palette und einer Komposition als factory floorplan; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Dieselpunk",
          "description": "Предложение сохраняет черты стиля A soot-stained industrial plan with rivets and copper, используя светлую палитру и композицию «factory floorplan»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Dieselpunk",
          "description": "يحافظ الاقتراح على سمات A soot-stained industrial plan with rivets and copper، مع لوحة فاتحة وتكوين «factory floorplan»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Dieselpunk",
          "description": "यह प्रस्ताव A soot-stained industrial plan with rivets and copper की दृश्य पहचान बनाए रखता है, हल्की रंग-पैलेट और factory floorplan संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Dieselpunk",
          "description": "此提案保留 A soot-stained industrial plan with rivets and copper 的视觉特征，采用浅色色板与factory floorplan构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Dieselpunk",
          "description": "この案はA soot-stained industrial plan with rivets and copperの視覚的特徴を保ち、ライト配色と「factory floorplan」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Dieselpunk",
          "description": "이 제안은 A soot-stained industrial plan with rivets and copper의 시각적 특징을 유지하면서 밝은 팔레트와 factory floorplan 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#E7E0D2",
        "--surface": "#F5EFE3",
        "--surface-2": "#D9CCB6",
        "--fg": "#282A2D",
        "--muted": "#4C4D4B",
        "--accent": "#9C4529",
        "--accent-fg": "#FFFFFF",
        "--border": "#777063",
        "--ok": "#24764F",
        "--warn": "#805400",
        "--danger": "#A12D37",
        "--focus": "#9C4529",
        "--radius": "2px",
        "--radius-sm": "6px",
        "--shadow": "0 8px 22px rgba(0,0,0,.16)"
      },
      "colors": {
        "--bg": "#E7E0D2",
        "--surface": "#F5EFE3",
        "--accent": "#9C4529"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"dieselpunk\"]",
          "signal": "A soot-stained industrial plan with rivets and copper; a proposta traduz esses sinais para light usando riveted seams and oxidized copper stripe, mantendo factory floorplan como organização de leitura.",
          "skillReference": "styles/dieselpunk.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/dieselpunk.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva factory floorplan: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/dieselpunk.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema dieselpunk, definida em styles/dieselpunk.css.",
          "after": "No mobile: uma coluna compacta; no desktop: factory floorplan, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas factory floorplan; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "dieselpunk-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"dieselpunk\"][data-variant=\"alternate\"]::before",
          "animation": "dieselpunk-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"dieselpunk\"][data-variant=\"alternate\"]::before",
      "contentDigest": "44da8f232e507fe5708d9b4e7b78a60a041038353042dc4a527ba153bf890231",
      "generatedDigest": "cc82ab3e765c1b60bf4ef01836c3187159243cea1a36c83ddf1c02209499990f",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "gothicpunk": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/gothicpunk.css",
      "nameKey": "appearance.gothicpunk.alternate.name",
      "descriptionKey": "appearance.gothicpunk.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Gothicpunk",
          "description": "A proposta preserva os sinais de A cathedral nave with rose-window tracery, com paleta clara e composição cathedral nave; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Gothicpunk",
          "description": "This proposal keeps the visual cues of A cathedral nave with rose-window tracery, with a light palette and a cathedral nave composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Gothicpunk",
          "description": "La propuesta conserva los rasgos de A cathedral nave with rose-window tracery, con paleta clara y composición cathedral nave; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Gothicpunk",
          "description": "La proposition conserve les codes de A cathedral nave with rose-window tracery, avec une palette claire et une composition cathedral nave ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Gothicpunk",
          "description": "Der Entwurf bewahrt die Merkmale von A cathedral nave with rose-window tracery, mit einer helle Palette und einer Komposition als cathedral nave; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Gothicpunk",
          "description": "Предложение сохраняет черты стиля A cathedral nave with rose-window tracery, используя светлую палитру и композицию «cathedral nave»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Gothicpunk",
          "description": "يحافظ الاقتراح على سمات A cathedral nave with rose-window tracery، مع لوحة فاتحة وتكوين «cathedral nave»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Gothicpunk",
          "description": "यह प्रस्ताव A cathedral nave with rose-window tracery की दृश्य पहचान बनाए रखता है, हल्की रंग-पैलेट और cathedral nave संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Gothicpunk",
          "description": "此提案保留 A cathedral nave with rose-window tracery 的视觉特征，采用浅色色板与cathedral nave构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Gothicpunk",
          "description": "この案はA cathedral nave with rose-window traceryの視覚的特徴を保ち、ライト配色と「cathedral nave」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Gothicpunk",
          "description": "이 제안은 A cathedral nave with rose-window tracery의 시각적 특징을 유지하면서 밝은 팔레트와 cathedral nave 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#E7E1E7",
        "--surface": "#F8F3F7",
        "--surface-2": "#DED3DE",
        "--fg": "#2C202E",
        "--muted": "#513A52",
        "--accent": "#8A2844",
        "--accent-fg": "#FFFFFF",
        "--border": "#866F87",
        "--ok": "#24764F",
        "--warn": "#805400",
        "--danger": "#A12D37",
        "--focus": "#8A2844",
        "--radius": "0px",
        "--radius-sm": "0px",
        "--shadow": "0 8px 22px rgba(0,0,0,.16)"
      },
      "colors": {
        "--bg": "#E7E1E7",
        "--surface": "#F8F3F7",
        "--accent": "#8A2844"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"gothicpunk\"]",
          "signal": "A cathedral nave with rose-window tracery; a proposta traduz esses sinais para light usando rose-window radial tracery and burgundy lancets, mantendo cathedral nave como organização de leitura.",
          "skillReference": "styles/gothicpunk.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/gothicpunk.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva cathedral nave: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/gothicpunk.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema gothicpunk, definida em styles/gothicpunk.css.",
          "after": "No mobile: uma coluna compacta; no desktop: cathedral nave, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas cathedral nave; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "gothicpunk-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"gothicpunk\"][data-variant=\"alternate\"]::before",
          "animation": "gothicpunk-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"gothicpunk\"][data-variant=\"alternate\"]::before",
      "contentDigest": "e83ad6a67d652006f99e8b56564d59f3a9f0f2e68cd3f16840ccbec815539f11",
      "generatedDigest": "6f5cd74c4df3459042a34eacec7f9e82f5202244222657a8ec6945295e2a7acc",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "lunarpunk": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/lunarpunk.css",
      "nameKey": "appearance.lunarpunk.alternate.name",
      "descriptionKey": "appearance.lunarpunk.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Luz de Prata Lunar",
          "description": "Papel marfim sob luar prateado, crescente em órbita e halos miceliais menta; o hero vira um díptico assimétrico sem perder a atmosfera noturna Lunarpunk."
        },
        "en-US": {
          "name": "Moonlit Silver",
          "description": "Ivory paper under silver moonlight, an orbiting crescent and mint mycelial halos; the hero becomes an asymmetric diptych while keeping Lunarpunk's nocturnal mood."
        },
        "es-ES": {
          "name": "Plata a la Luz Lunar",
          "description": "Papel marfil bajo luz lunar plateada, creciente en órbita y halos miceliales menta; el hero forma un díptico asimétrico que conserva la atmósfera nocturna Lunarpunk."
        },
        "fr-FR": {
          "name": "Argent au Clair de Lune",
          "description": "Papier ivoire sous une lumière lunaire argentée, croissant en orbite et halos mycéliens menthe ; le hero devient un diptyque asymétrique à l'atmosphère nocturne Lunarpunk."
        },
        "de-DE": {
          "name": "Silbernes Mondlicht",
          "description": "Elfenbeinfarbenes Papier im silbernen Mondlicht, eine kreisende Sichel und minzfarbene Myzel-Halos; das Hero wird zum asymmetrischen Diptychon mit nächtlicher Lunarpunk-Stimmung."
        },
        "ru-RU": {
          "name": "Лунное серебро",
          "description": "Слоновая бумага в серебристом лунном свете, серп на орбите и мятные ореолы мицелия; главный блок становится асимметричным диптихом и сохраняет ночное настроение Lunarpunk."
        },
        "ar-SA": {
          "name": "فضة ضوء القمر",
          "description": "ورق عاجي تحت ضوء قمري فضي، وهلال في مداره وهالات نعناعية لشبكة الميسيليوم؛ يتحول القسم الرئيسي إلى لوحة مزدوجة غير متناظرة مع الحفاظ على أجواء Lunarpunk الليلية."
        },
        "hi-IN": {
          "name": "चाँदनी की चाँदी",
          "description": "चाँदी जैसी चाँदनी में हाथीदाँत का काग़ज़, कक्षा में अर्धचंद्र और पुदीने जैसे मायसीलियम प्रभामंडल; मुख्य दृश्य असममित द्विपट बनता है और Lunarpunk की रात्रि भावना बनाए रखता है।"
        },
        "zh-CN": {
          "name": "月下银辉",
          "description": "象牙白纸面映着银色月光，轨道新月与薄荷色菌丝光晕相伴；主视觉改为不对称双联布局，同时保留 Lunarpunk 的夜色氛围。"
        },
        "ja-JP": {
          "name": "月光の銀",
          "description": "象牙色の紙面に銀色の月光、軌道を巡る三日月とミント色の菌糸の光輪を添えます。ヒーローを非対称の二面構成にし、Lunarpunk の夜の気配を保ちます。"
        },
        "ko-KR": {
          "name": "달빛의 은빛",
          "description": "은빛 달빛 아래 아이보리 종이, 궤도를 도는 초승달과 민트색 균사체 후광을 담았습니다. 첫 화면은 비대칭 양면 구성으로 바뀌며 Lunarpunk의 밤 분위기를 유지합니다."
        }
      },
      "tokens": {
        "--bg": "#F4F2F7",
        "--surface": "#FFFEFC",
        "--surface-2": "#EAE7F0",
        "--fg": "#282435",
        "--muted": "#5C5869",
        "--accent": "#59417F",
        "--accent-fg": "#FFFFFF",
        "--border": "#837A94",
        "--ok": "#17624F",
        "--warn": "#795000",
        "--danger": "#A12E45",
        "--focus": "#075D78",
        "--mint": "#17695C",
        "--moon": "#765A22",
        "--vio": "#59417F",
        "--shadow": "0 10px 28px rgba(54, 43, 75, .11)",
        "--radius": "20px",
        "--border-width": "1px"
      },
      "colors": {
        "--bg": "#F4F2F7",
        "--surface": "#FFFEFC",
        "--accent": "#59417F"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"lunarpunk\"][data-variant=\"alternate\"] .brand-mark",
          "signal": "Disco lunar crescente em relevo: o círculo claro recebe uma sombra interna deslocada e aro orbital fino.",
          "skillReference": "/home/daniel/Code/Coacus/knowledge/skills/domains/design/ui-style-lunarpunk/SKILL.md — Iconography; Canonical Component Specifications: Lunar Phase Progress Dial",
          "evidence": "A skill exige fases lunares e anéis de fase como sinais reconhecíveis; o seletor mantém o elemento canônico e altera apenas sua representação na contraparte."
        },
        {
          "selector": "#stage[data-style=\"lunarpunk\"][data-variant=\"alternate\"] .card",
          "signal": "Superfícies orgânicas de borda ampla com halo menta discreto e rede de pontos miceliais desenhada apenas na decoração do hero.",
          "skillReference": "/home/daniel/Code/Coacus/knowledge/skills/domains/design/ui-style-lunarpunk/SKILL.md — Visual DNA & Subgenre Taxonomy; Bioluminescent Flora Glow",
          "evidence": "A skill associa Lunarpunk a redes miceliais, flora bioluminescente, curvas orgânicas e emissão ciano/menta. O halo e os raios arredondados continuam legíveis em papel claro."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#stage[data-style=\"lunarpunk\"][data-variant=\"alternate\"] .hero",
          "property": "text-align / grid-template-columns / decorative moon placement",
          "before": "Fluxo vertical alinhado à esquerda, sem coluna lunar dedicada.",
          "after": "Até 899px: composição centralizada com crescente de 52px no topo, leitura em coluna. A partir de 900px: texto em coluna esquerda e disco lunar decorativo em coluna direita; o hero vira um díptico assimétrico quando o espaço útil comporta a leitura.",
          "breakpoints": {
            "320": {
              "before": "text-align:left; hero 288×582px",
              "after": "text-align:center; crescente de 52px; hero 288×624px (+42px)"
            },
            "375": {
              "before": "text-align:left; hero 343×496px",
              "after": "text-align:center; crescente de 52px; hero 343×538px (+42px)"
            },
            "768": {
              "before": "text-align:left; fluxo vertical; hero 456×456px",
              "after": "text-align:center; coluna única e crescente de 52px; hero 456×498px (+42px)"
            },
            "1280": {
              "before": "fluxo vertical; hero 968×425px",
              "after": "grid assimétrico e órbita na coluna direita; hero 968×479px (+54px)"
            }
          },
          "measurementStatus": "Medições em Chromium 155 headless; as regras de breakpoint foram recalibradas à largura real do stage, reduzida pela sidebar. Capturas humanas continuam pendentes."
        },
        {
          "selector": "#stage[data-style=\"lunarpunk\"][data-variant=\"alternate\"] .kpis",
          "property": "grid-template-columns",
          "before": "auto-fit com cartões de no mínimo 190px: 1 coluna em 320/375px, 2 em 768px (stage útil 456px), 4 em 1280px (stage útil 968px).",
          "after": "1 coluna até 899px; em viewports ≥900px, grade 2×2. Cartões da contraparte organizam rótulo/valor/status como linha lunar compacta.",
          "breakpoints": {
            "320": {
              "before": "1 coluna",
              "after": "1 coluna"
            },
            "375": {
              "before": "1 coluna",
              "after": "1 coluna"
            },
            "768": {
              "before": "2 colunas",
              "after": "1 coluna; cada cartão realinha rótulo, valor e status"
            },
            "1280": {
              "before": "4 colunas",
              "after": "2 colunas × 2 linhas"
            }
          },
          "measurementStatus": "Contagens confirmadas em Chromium 155 headless, usando a shell e stage renderizados em 320/375/768/1280px. Stage mediu 320/375/488/1000px; área útil do app 288/343/456/968px."
        },
        {
          "selector": "#stage[data-style=\"lunarpunk\"][data-variant=\"alternate\"] .kpi",
          "property": "display / grid-template-columns / badge placement",
          "before": "Cartão em fluxo de bloco; rótulo, valor e badge empilhados.",
          "after": "Cartão interno em grade de duas colunas; rótulo/valor à esquerda e badge alinhado na coluna direita.",
          "breakpoints": {
            "320": {
              "before": "display:block; 288px",
              "after": "display:grid; rótulo/valor à esquerda, badge à direita; 288px"
            },
            "375": {
              "before": "display:block; 343px",
              "after": "display:grid; rótulo/valor à esquerda, badge à direita; 343px"
            },
            "768": {
              "before": "display:block; 2 colunas KPI",
              "after": "display:grid; 1 coluna KPI com badge lateral"
            },
            "1280": {
              "before": "display:block; 4 colunas KPI",
              "after": "display:grid; 2 colunas KPI com badge lateral"
            }
          },
          "measurementStatus": "display:block → grid confirmado por getComputedStyle no Chromium 155 headless."
        }
      ],
      "motion": {
        "element": {
          "selector": "#stage[data-style=\"lunarpunk\"][data-variant=\"alternate\"] .hero::before",
          "animation": "Lunar phase sweep: the halo disk changes scale slightly and drifts a few pixels using transform only; phase changes with view progress and stays decorative.",
          "trigger": "Progresso de visibilidade do hero (CSS view timeline); nenhum conteúdo é revelado/ocultado.",
          "duration": "Percurso da timeline de entrada a saída do hero (0–100%; sem duração em segundos).",
          "fallback": "If scroll-driven timelines are unsupported, the crescent disk remains fully visible and static; its painted gradient is the base rule.",
          "reducedMotion": "prefers-reduced-motion: reduce remove a animação e conserva disco/halo estáticos.",
          "pauseResume": "app.js setupVariantMotion marca data-motion-visible no alvo .hero; CSS inicia pausado e roda somente com data-motion-visible=\"true\". A troca running → paused → running do pseudo-elemento é verificada em Chromium no teste da fonte; o caminho completo de document.hidden usa tools/test_variant_fixture_runtime.py.",
          "cleanup": "CSS sem timers/listeners; ao remover a folha alternate, pseudo-elemento e animação deixam de existir.",
          "performanceEvidence": "Source inspection confirms transform-only keyframes. No frozen performance trace has been collected; compositor promotion and frame budget remain unverified.",
          "runtimeInstrumentation": "Runtime instrumentado: setupVariantMotion observa a visibilidade da página, prefers-reduced-motion e a interseção do alvo .hero; escreve data-motion-visible no elemento.",
          "cssPauseResumeVerification": "Verificado no teste Chromium da fonte: animationPlayState do pseudo-elemento segue os marcadores active → hidden → visible (running → paused → running)."
        },
        "background": {
          "selector": "#stage[data-style=\"lunarpunk\"][data-variant=\"alternate\"] .app::before",
          "animation": "Constellation points and mycelial filaments drift together by a small translate3d transform as page scroll progresses; the pre-painted gradient layer stays behind content and does not capture pointers.",
          "trigger": "Progresso de rolagem do palco #stage via CSS scroll timeline; independente da fase lunar do hero.",
          "duration": "Percurso da scroll timeline do contêiner #stage (0–100%; sem duração em segundos).",
          "fallback": "If scroll-driven timelines are unsupported, retain the pre-painted static constellation and mycelial filaments; no animation is active.",
          "reducedMotion": "prefers-reduced-motion: reduce remove a animação e mantém o fundo estático.",
          "pauseResume": "app.js setupVariantMotion marca data-motion-active no #stage somente quando o alternate está visível, a aba está ativa e movimento reduzido não está habilitado; CSS roda a camada quando o marcador é true. A troca running → paused → running do pseudo-elemento é verificada em Chromium no teste da fonte; o caminho completo de document.hidden usa tools/test_variant_fixture_runtime.py.",
          "cleanup": "CSS sem timers/listeners; remover a folha alternate elimina a camada e timeline associadas.",
          "performanceEvidence": "Source inspection confirms transform-only keyframes. No frozen performance trace has been collected; compositor promotion and frame budget remain unverified.",
          "runtimeInstrumentation": "Runtime instrumentado: setupVariantMotion observa a visibilidade de #stage, document.hidden e prefers-reduced-motion; escreve data-motion-active no #stage.",
          "cssPauseResumeVerification": "Verificado no teste Chromium da fonte: animationPlayState do pseudo-elemento segue os marcadores active → hidden → visible (running → paused → running)."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": "#stage[data-style=\"lunarpunk\"][data-variant=\"alternate\"] .hero::before",
      "backgroundTarget": "#stage[data-style=\"lunarpunk\"][data-variant=\"alternate\"] .app::before",
      "contentDigest": "8cca4ee5da81df7b9379299d2f752dad5c828bcd59ea961a879593b627334268",
      "generatedDigest": "88beea2baaa551ddeeaf435c5f6738f1f3324885416fdac332d2f3812641fa08",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "nanopunk": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/nanopunk.css",
      "nameKey": "appearance.nanopunk.alternate.name",
      "descriptionKey": "appearance.nanopunk.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Nanopunk",
          "description": "A proposta preserva os sinais de A molecular lattice in deep graphite and ion cyan, com paleta escura e composição molecular matrix; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Nanopunk",
          "description": "This proposal keeps the visual cues of A molecular lattice in deep graphite and ion cyan, with a dark palette and a molecular matrix composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Nanopunk",
          "description": "La propuesta conserva los rasgos de A molecular lattice in deep graphite and ion cyan, con paleta oscura y composición molecular matrix; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Nanopunk",
          "description": "La proposition conserve les codes de A molecular lattice in deep graphite and ion cyan, avec une palette sombre et une composition molecular matrix ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Nanopunk",
          "description": "Der Entwurf bewahrt die Merkmale von A molecular lattice in deep graphite and ion cyan, mit einer dunkle Palette und einer Komposition als molecular matrix; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Nanopunk",
          "description": "Предложение сохраняет черты стиля A molecular lattice in deep graphite and ion cyan, используя тёмную палитру и композицию «molecular matrix»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Nanopunk",
          "description": "يحافظ الاقتراح على سمات A molecular lattice in deep graphite and ion cyan، مع لوحة داكنة وتكوين «molecular matrix»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Nanopunk",
          "description": "यह प्रस्ताव A molecular lattice in deep graphite and ion cyan की दृश्य पहचान बनाए रखता है, गहरी रंग-पैलेट और molecular matrix संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Nanopunk",
          "description": "此提案保留 A molecular lattice in deep graphite and ion cyan 的视觉特征，采用深色色板与molecular matrix构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Nanopunk",
          "description": "この案はA molecular lattice in deep graphite and ion cyanの視覚的特徴を保ち、ダーク配色と「molecular matrix」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Nanopunk",
          "description": "이 제안은 A molecular lattice in deep graphite and ion cyan의 시각적 특징을 유지하면서 어두운 팔레트와 molecular matrix 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#101A22",
        "--surface": "#192833",
        "--surface-2": "#243744",
        "--fg": "#EAF7F8",
        "--muted": "#B7D4D8",
        "--accent": "#18A3B8",
        "--accent-fg": "#07181C",
        "--border": "#5B8790",
        "--ok": "#77D6A1",
        "--warn": "#F2C66D",
        "--danger": "#FF929A",
        "--focus": "#FFE27A",
        "--radius": "3px",
        "--radius-sm": "6px",
        "--shadow": "0 12px 28px rgba(0,0,0,.26)"
      },
      "colors": {
        "--bg": "#101A22",
        "--surface": "#192833",
        "--accent": "#18A3B8"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"nanopunk\"]",
          "signal": "A molecular lattice in deep graphite and ion cyan; a proposta traduz esses sinais para dark usando molecular node lattice and cyan bonds, mantendo molecular matrix como organização de leitura.",
          "skillReference": "styles/nanopunk.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/nanopunk.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva molecular matrix: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/nanopunk.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema nanopunk, definida em styles/nanopunk.css.",
          "after": "No mobile: uma coluna compacta; no desktop: molecular matrix, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas molecular matrix; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "nanopunk-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"nanopunk\"][data-variant=\"alternate\"]::before",
          "animation": "nanopunk-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"nanopunk\"][data-variant=\"alternate\"]::before",
      "contentDigest": "8d0e7908a8bb97c92904c0c02e017d287c294d0f019cba898d1ab160c44b94f8",
      "generatedDigest": "1dd3edd7a1c33f59cbcc2bef8434086a424ef762a6f16af697d061e4b20c45a2",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "sandalpunk": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/sandalpunk.css",
      "nameKey": "appearance.sandalpunk.alternate.name",
      "descriptionKey": "appearance.sandalpunk.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Sandalpunk",
          "description": "A proposta preserva os sinais de A classical forum plan in charcoal, clay and lapis, com paleta escura e composição forum plan; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Sandalpunk",
          "description": "This proposal keeps the visual cues of A classical forum plan in charcoal, clay and lapis, with a dark palette and a forum plan composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Sandalpunk",
          "description": "La propuesta conserva los rasgos de A classical forum plan in charcoal, clay and lapis, con paleta oscura y composición forum plan; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Sandalpunk",
          "description": "La proposition conserve les codes de A classical forum plan in charcoal, clay and lapis, avec une palette sombre et une composition forum plan ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Sandalpunk",
          "description": "Der Entwurf bewahrt die Merkmale von A classical forum plan in charcoal, clay and lapis, mit einer dunkle Palette und einer Komposition als forum plan; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Sandalpunk",
          "description": "Предложение сохраняет черты стиля A classical forum plan in charcoal, clay and lapis, используя тёмную палитру и композицию «forum plan»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Sandalpunk",
          "description": "يحافظ الاقتراح على سمات A classical forum plan in charcoal, clay and lapis، مع لوحة داكنة وتكوين «forum plan»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Sandalpunk",
          "description": "यह प्रस्ताव A classical forum plan in charcoal, clay and lapis की दृश्य पहचान बनाए रखता है, गहरी रंग-पैलेट और forum plan संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Sandalpunk",
          "description": "此提案保留 A classical forum plan in charcoal, clay and lapis 的视觉特征，采用深色色板与forum plan构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Sandalpunk",
          "description": "この案はA classical forum plan in charcoal, clay and lapisの視覚的特徴を保ち、ダーク配色と「forum plan」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Sandalpunk",
          "description": "이 제안은 A classical forum plan in charcoal, clay and lapis의 시각적 특징을 유지하면서 어두운 팔레트와 forum plan 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#20241F",
        "--surface": "#2D342B",
        "--surface-2": "#3A4237",
        "--fg": "#F3E9D4",
        "--muted": "#D8C7A5",
        "--accent": "#E18A55",
        "--accent-fg": "#20150E",
        "--border": "#9C8A64",
        "--ok": "#77D6A1",
        "--warn": "#F2C66D",
        "--danger": "#FF929A",
        "--focus": "#FFE27A",
        "--radius": "0px",
        "--radius-sm": "0px",
        "--shadow": "0 12px 28px rgba(0,0,0,.26)"
      },
      "colors": {
        "--bg": "#20241F",
        "--surface": "#2D342B",
        "--accent": "#E18A55"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"sandalpunk\"]",
          "signal": "A classical forum plan in charcoal, clay and lapis; a proposta traduz esses sinais para dark usando meander keyline and lapis inlay, mantendo forum plan como organização de leitura. O campo ornamental tem padrão exclusivo descrito no CSS desta proposta.",
          "skillReference": "styles/sandalpunk.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/sandalpunk.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva forum plan: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/sandalpunk.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema sandalpunk, definida em styles/sandalpunk.css.",
          "after": "No mobile: uma coluna compacta; no desktop: forum plan, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas forum plan; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "sandalpunk-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"sandalpunk\"][data-variant=\"alternate\"]::before",
          "animation": "sandalpunk-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"sandalpunk\"][data-variant=\"alternate\"]::before",
      "contentDigest": "047a43f4c432a187c83deaf84f19541f5892fc84bccc71117a14907d3efee92f",
      "generatedDigest": "237e1f484f2196243166f39911da542ae67ddbe8fa3bd716df0c67879b505b92",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "silkpunk": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/silkpunk.css",
      "nameKey": "appearance.silkpunk.alternate.name",
      "descriptionKey": "appearance.silkpunk.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Silkpunk",
          "description": "A proposta preserva os sinais de A folded technical scroll with vermilion seals, com paleta escura e composição folded scroll; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Silkpunk",
          "description": "This proposal keeps the visual cues of A folded technical scroll with vermilion seals, with a dark palette and a folded scroll composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Silkpunk",
          "description": "La propuesta conserva los rasgos de A folded technical scroll with vermilion seals, con paleta oscura y composición folded scroll; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Silkpunk",
          "description": "La proposition conserve les codes de A folded technical scroll with vermilion seals, avec une palette sombre et une composition folded scroll ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Silkpunk",
          "description": "Der Entwurf bewahrt die Merkmale von A folded technical scroll with vermilion seals, mit einer dunkle Palette und einer Komposition als folded scroll; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Silkpunk",
          "description": "Предложение сохраняет черты стиля A folded technical scroll with vermilion seals, используя тёмную палитру и композицию «folded scroll»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Silkpunk",
          "description": "يحافظ الاقتراح على سمات A folded technical scroll with vermilion seals، مع لوحة داكنة وتكوين «folded scroll»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Silkpunk",
          "description": "यह प्रस्ताव A folded technical scroll with vermilion seals की दृश्य पहचान बनाए रखता है, गहरी रंग-पैलेट और folded scroll संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Silkpunk",
          "description": "此提案保留 A folded technical scroll with vermilion seals 的视觉特征，采用深色色板与folded scroll构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Silkpunk",
          "description": "この案はA folded technical scroll with vermilion sealsの視覚的特徴を保ち、ダーク配色と「folded scroll」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Silkpunk",
          "description": "이 제안은 A folded technical scroll with vermilion seals의 시각적 특징을 유지하면서 어두운 팔레트와 folded scroll 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#1E283B",
        "--surface": "#2B3850",
        "--surface-2": "#394965",
        "--fg": "#F5EBD6",
        "--muted": "#D8CBAF",
        "--accent": "#FF9387",
        "--accent-fg": "#2A1722",
        "--border": "#AA9469",
        "--ok": "#77D6A1",
        "--warn": "#F2C66D",
        "--danger": "#FF929A",
        "--focus": "#FFE27A",
        "--radius": "8px",
        "--radius-sm": "6px",
        "--shadow": "0 12px 28px rgba(0,0,0,.26)"
      },
      "colors": {
        "--bg": "#1E283B",
        "--surface": "#2B3850",
        "--accent": "#FF9387"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"silkpunk\"]",
          "signal": "A folded technical scroll with vermilion seals; a proposta traduz esses sinais para dark usando folded-paper diagonals and vermilion seal, mantendo folded scroll como organização de leitura. O campo ornamental tem padrão exclusivo descrito no CSS desta proposta.",
          "skillReference": "styles/silkpunk.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/silkpunk.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva folded scroll: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/silkpunk.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema silkpunk, definida em styles/silkpunk.css.",
          "after": "No mobile: uma coluna compacta; no desktop: folded scroll, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas folded scroll; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "silkpunk-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"silkpunk\"][data-variant=\"alternate\"]::before",
          "animation": "silkpunk-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"silkpunk\"][data-variant=\"alternate\"]::before",
      "contentDigest": "56e24d6a113c27eda34c4501bab9d61c0aae56156b8acce9561414ddac94d655",
      "generatedDigest": "6b9a1229d3aecca9180ba67687ec3cd13bb85201dcaaca5aafb68feeacea0e45",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "solarpunk": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/solarpunk.css",
      "nameKey": "appearance.solarpunk.alternate.name",
      "descriptionKey": "appearance.solarpunk.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Solarpunk",
          "description": "A proposta preserva os sinais de A shaded solar conservatory with leaf and cell geometry, com paleta escura e composição sunroom plan; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Solarpunk",
          "description": "This proposal keeps the visual cues of A shaded solar conservatory with leaf and cell geometry, with a dark palette and a sunroom plan composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Solarpunk",
          "description": "La propuesta conserva los rasgos de A shaded solar conservatory with leaf and cell geometry, con paleta oscura y composición sunroom plan; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Solarpunk",
          "description": "La proposition conserve les codes de A shaded solar conservatory with leaf and cell geometry, avec une palette sombre et une composition sunroom plan ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Solarpunk",
          "description": "Der Entwurf bewahrt die Merkmale von A shaded solar conservatory with leaf and cell geometry, mit einer dunkle Palette und einer Komposition als sunroom plan; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Solarpunk",
          "description": "Предложение сохраняет черты стиля A shaded solar conservatory with leaf and cell geometry, используя тёмную палитру и композицию «sunroom plan»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Solarpunk",
          "description": "يحافظ الاقتراح على سمات A shaded solar conservatory with leaf and cell geometry، مع لوحة داكنة وتكوين «sunroom plan»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Solarpunk",
          "description": "यह प्रस्ताव A shaded solar conservatory with leaf and cell geometry की दृश्य पहचान बनाए रखता है, गहरी रंग-पैलेट और sunroom plan संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Solarpunk",
          "description": "此提案保留 A shaded solar conservatory with leaf and cell geometry 的视觉特征，采用深色色板与sunroom plan构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Solarpunk",
          "description": "この案はA shaded solar conservatory with leaf and cell geometryの視覚的特徴を保ち、ダーク配色と「sunroom plan」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Solarpunk",
          "description": "이 제안은 A shaded solar conservatory with leaf and cell geometry의 시각적 특징을 유지하면서 어두운 팔레트와 sunroom plan 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#24342B",
        "--surface": "#31483A",
        "--surface-2": "#405B48",
        "--fg": "#F3F1DB",
        "--muted": "#D9E1B8",
        "--accent": "#E4B344",
        "--accent-fg": "#17251A",
        "--border": "#9CAB97",
        "--ok": "#77D6A1",
        "--warn": "#F2C66D",
        "--danger": "#FF929A",
        "--focus": "#FFE27A",
        "--radius": "24px",
        "--radius-sm": "6px",
        "--shadow": "0 12px 28px rgba(0,0,0,.26)"
      },
      "colors": {
        "--bg": "#24342B",
        "--surface": "#31483A",
        "--accent": "#E4B344"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"solarpunk\"]",
          "signal": "A shaded solar conservatory with leaf and cell geometry; a proposta traduz esses sinais para dark usando solar-cell diamond canopy and leaf shadow, mantendo sunroom plan como organização de leitura.",
          "skillReference": "styles/solarpunk.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/solarpunk.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva sunroom plan: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/solarpunk.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema solarpunk, definida em styles/solarpunk.css.",
          "after": "No mobile: uma coluna compacta; no desktop: sunroom plan, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas sunroom plan; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "solarpunk-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"solarpunk\"][data-variant=\"alternate\"]::before",
          "animation": "solarpunk-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"solarpunk\"][data-variant=\"alternate\"]::before",
      "contentDigest": "3bcd33660b6532995017ea21dd66600cf752b8ac0d3bf004caf2920ee6fe1ff1",
      "generatedDigest": "0772b14f5af205e1a80c9f107921e3e6049d50cfb09360c481869375bc328bb2",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "steampunk": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/steampunk.css",
      "nameKey": "appearance.steampunk.alternate.name",
      "descriptionKey": "appearance.steampunk.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Steampunk",
          "description": "A proposta preserva os sinais de An ivory engine ledger with etched brass and copper pipes, com paleta clara e composição engine room; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Steampunk",
          "description": "This proposal keeps the visual cues of An ivory engine ledger with etched brass and copper pipes, with a light palette and a engine room composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Steampunk",
          "description": "La propuesta conserva los rasgos de An ivory engine ledger with etched brass and copper pipes, con paleta clara y composición engine room; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Steampunk",
          "description": "La proposition conserve les codes de An ivory engine ledger with etched brass and copper pipes, avec une palette claire et une composition engine room ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Steampunk",
          "description": "Der Entwurf bewahrt die Merkmale von An ivory engine ledger with etched brass and copper pipes, mit einer helle Palette und einer Komposition als engine room; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Steampunk",
          "description": "Предложение сохраняет черты стиля An ivory engine ledger with etched brass and copper pipes, используя светлую палитру и композицию «engine room»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Steampunk",
          "description": "يحافظ الاقتراح على سمات An ivory engine ledger with etched brass and copper pipes، مع لوحة فاتحة وتكوين «engine room»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Steampunk",
          "description": "यह प्रस्ताव An ivory engine ledger with etched brass and copper pipes की दृश्य पहचान बनाए रखता है, हल्की रंग-पैलेट और engine room संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Steampunk",
          "description": "此提案保留 An ivory engine ledger with etched brass and copper pipes 的视觉特征，采用浅色色板与engine room构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Steampunk",
          "description": "この案はAn ivory engine ledger with etched brass and copper pipesの視覚的特徴を保ち、ライト配色と「engine room」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Steampunk",
          "description": "이 제안은 An ivory engine ledger with etched brass and copper pipes의 시각적 특징을 유지하면서 밝은 팔레트와 engine room 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#EFE2C5",
        "--surface": "#FFF4D9",
        "--surface-2": "#E2CEA5",
        "--fg": "#34261B",
        "--muted": "#5B4630",
        "--accent": "#9C542E",
        "--accent-fg": "#FFFFFF",
        "--border": "#75623E",
        "--ok": "#24764F",
        "--warn": "#805400",
        "--danger": "#A12D37",
        "--focus": "#9C542E",
        "--radius": "6px",
        "--radius-sm": "6px",
        "--shadow": "0 8px 22px rgba(0,0,0,.16)"
      },
      "colors": {
        "--bg": "#EFE2C5",
        "--surface": "#FFF4D9",
        "--accent": "#9C542E"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"steampunk\"]",
          "signal": "An ivory engine ledger with etched brass and copper pipes; a proposta traduz esses sinais para light usando etched brass guilloche and copper piping, mantendo engine room como organização de leitura. O campo ornamental tem padrão exclusivo descrito no CSS desta proposta.",
          "skillReference": "styles/steampunk.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/steampunk.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva engine room: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/steampunk.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema steampunk, definida em styles/steampunk.css.",
          "after": "No mobile: uma coluna compacta; no desktop: engine room, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas engine room; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "steampunk-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"steampunk\"][data-variant=\"alternate\"]::before",
          "animation": "steampunk-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"steampunk\"][data-variant=\"alternate\"]::before",
      "contentDigest": "b2af8bff753229d1fb5056fa0012fcd9ee92964ad844dbc64d9c6dc2164b41f7",
      "generatedDigest": "8b4ce49c5562f75fadda1f69749e013cf0843fd639ed30a8719cd229fed9b2b8",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "3d-immersive-webgl": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/3d-immersive-webgl.css",
      "nameKey": "appearance.3d-immersive-webgl.alternate.name",
      "descriptionKey": "appearance.3d-immersive-webgl.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: 3D Immersive Webgl",
          "description": "A proposta preserva os sinais de A bright depth stage with wireframe contour planes, com paleta clara e composição depth stage; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: 3D Immersive Webgl",
          "description": "This proposal keeps the visual cues of A bright depth stage with wireframe contour planes, with a light palette and a depth stage composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: 3D Immersive Webgl",
          "description": "La propuesta conserva los rasgos de A bright depth stage with wireframe contour planes, con paleta clara y composición depth stage; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: 3D Immersive Webgl",
          "description": "La proposition conserve les codes de A bright depth stage with wireframe contour planes, avec une palette claire et une composition depth stage ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: 3D Immersive Webgl",
          "description": "Der Entwurf bewahrt die Merkmale von A bright depth stage with wireframe contour planes, mit einer helle Palette und einer Komposition als depth stage; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: 3D Immersive Webgl",
          "description": "Предложение сохраняет черты стиля A bright depth stage with wireframe contour planes, используя светлую палитру и композицию «depth stage»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: 3D Immersive Webgl",
          "description": "يحافظ الاقتراح على سمات A bright depth stage with wireframe contour planes، مع لوحة فاتحة وتكوين «depth stage»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: 3D Immersive Webgl",
          "description": "यह प्रस्ताव A bright depth stage with wireframe contour planes की दृश्य पहचान बनाए रखता है, हल्की रंग-पैलेट और depth stage संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: 3D Immersive Webgl",
          "description": "此提案保留 A bright depth stage with wireframe contour planes 的视觉特征，采用浅色色板与depth stage构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: 3D Immersive Webgl",
          "description": "この案はA bright depth stage with wireframe contour planesの視覚的特徴を保ち、ライト配色と「depth stage」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: 3D Immersive Webgl",
          "description": "이 제안은 A bright depth stage with wireframe contour planes의 시각적 특징을 유지하면서 밝은 팔레트와 depth stage 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#E9E8F5",
        "--surface": "#FAFAFF",
        "--surface-2": "#DBDDF0",
        "--fg": "#272A42",
        "--muted": "#505574",
        "--accent": "#5266B8",
        "--accent-fg": "#FFFFFF",
        "--border": "#646B91",
        "--ok": "#24764F",
        "--warn": "#805400",
        "--danger": "#A12D37",
        "--focus": "#5266B8",
        "--radius": "18px",
        "--radius-sm": "6px",
        "--shadow": "0 8px 22px rgba(0,0,0,.16)"
      },
      "colors": {
        "--bg": "#E9E8F5",
        "--surface": "#FAFAFF",
        "--accent": "#5266B8"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"3d-immersive-webgl\"]",
          "signal": "A bright depth stage with wireframe contour planes; a proposta traduz esses sinais para light usando wireframe horizon and depth contours, mantendo depth stage como organização de leitura. O campo ornamental tem padrão exclusivo descrito no CSS desta proposta.",
          "skillReference": "styles/3d-immersive-webgl.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/3d-immersive-webgl.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva depth stage: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/3d-immersive-webgl.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema 3d-immersive-webgl, definida em styles/3d-immersive-webgl.css.",
          "after": "No mobile: uma coluna compacta; no desktop: depth stage, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas depth stage; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "immersive3d-webgl-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"3d-immersive-webgl\"][data-variant=\"alternate\"]::before",
          "animation": "immersive3d-webgl-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"3d-immersive-webgl\"][data-variant=\"alternate\"]::before",
      "contentDigest": "a049731c4b7a0c88fa85ad530f40297ffe98e20a70b92dca1683d11531308273",
      "generatedDigest": "c682911a101737e91c1acdca504b01f50f403f7096433396593f04f14011d869",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "parallax-scrolling": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/parallax-scrolling.css",
      "nameKey": "appearance.parallax-scrolling.alternate.name",
      "descriptionKey": "appearance.parallax-scrolling.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Parallax Scrolling",
          "description": "A proposta preserva os sinais de A layered dusk panorama with distinct horizon bands, com paleta clara e composição story panorama; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Parallax Scrolling",
          "description": "This proposal keeps the visual cues of A layered dusk panorama with distinct horizon bands, with a light palette and a story panorama composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Parallax Scrolling",
          "description": "La propuesta conserva los rasgos de A layered dusk panorama with distinct horizon bands, con paleta clara y composición story panorama; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Parallax Scrolling",
          "description": "La proposition conserve les codes de A layered dusk panorama with distinct horizon bands, avec une palette claire et une composition story panorama ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Parallax Scrolling",
          "description": "Der Entwurf bewahrt die Merkmale von A layered dusk panorama with distinct horizon bands, mit einer helle Palette und einer Komposition als story panorama; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Parallax Scrolling",
          "description": "Предложение сохраняет черты стиля A layered dusk panorama with distinct horizon bands, используя светлую палитру и композицию «story panorama»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Parallax Scrolling",
          "description": "يحافظ الاقتراح على سمات A layered dusk panorama with distinct horizon bands، مع لوحة فاتحة وتكوين «story panorama»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Parallax Scrolling",
          "description": "यह प्रस्ताव A layered dusk panorama with distinct horizon bands की दृश्य पहचान बनाए रखता है, हल्की रंग-पैलेट और story panorama संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Parallax Scrolling",
          "description": "此提案保留 A layered dusk panorama with distinct horizon bands 的视觉特征，采用浅色色板与story panorama构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Parallax Scrolling",
          "description": "この案はA layered dusk panorama with distinct horizon bandsの視覚的特徴を保ち、ライト配色と「story panorama」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Parallax Scrolling",
          "description": "이 제안은 A layered dusk panorama with distinct horizon bands의 시각적 특징을 유지하면서 밝은 팔레트와 story panorama 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#F1E6D7",
        "--surface": "#FFF7E8",
        "--surface-2": "#E7D0BB",
        "--fg": "#342338",
        "--muted": "#614958",
        "--accent": "#A24A58",
        "--accent-fg": "#FFFFFF",
        "--border": "#8E6D6E",
        "--ok": "#24764F",
        "--warn": "#805400",
        "--danger": "#A12D37",
        "--focus": "#A24A58",
        "--radius": "4px",
        "--radius-sm": "6px",
        "--shadow": "0 8px 22px rgba(0,0,0,.16)"
      },
      "colors": {
        "--bg": "#F1E6D7",
        "--surface": "#FFF7E8",
        "--accent": "#A24A58"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"parallax-scrolling\"]",
          "signal": "A layered dusk panorama with distinct horizon bands; a proposta traduz esses sinais para light usando layered dusk horizon bands, mantendo story panorama como organização de leitura.",
          "skillReference": "styles/parallax-scrolling.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/parallax-scrolling.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva story panorama: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/parallax-scrolling.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema parallax-scrolling, definida em styles/parallax-scrolling.css.",
          "after": "No mobile: uma coluna compacta; no desktop: story panorama, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas story panorama; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "parallax-scrolling-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"parallax-scrolling\"][data-variant=\"alternate\"]::before",
          "animation": "parallax-scrolling-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"parallax-scrolling\"][data-variant=\"alternate\"]::before",
      "contentDigest": "90b848b26e41ccc6c8271812c030329eecf6bf3277b7df4bdc5626d78249aefc",
      "generatedDigest": "d3ebbdb85d9321ad5c3c40f985233cef00b53e6811239230c8287757cc7b68f5",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "scrollytelling": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/scrollytelling.css",
      "nameKey": "appearance.scrollytelling.alternate.name",
      "descriptionKey": "appearance.scrollytelling.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Scrollytelling",
          "description": "A proposta preserva os sinais de A bright editorial chapter track with a visible reading rail, com paleta clara e composição chapter timeline; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Scrollytelling",
          "description": "This proposal keeps the visual cues of A bright editorial chapter track with a visible reading rail, with a light palette and a chapter timeline composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Scrollytelling",
          "description": "La propuesta conserva los rasgos de A bright editorial chapter track with a visible reading rail, con paleta clara y composición chapter timeline; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Scrollytelling",
          "description": "La proposition conserve les codes de A bright editorial chapter track with a visible reading rail, avec une palette claire et une composition chapter timeline ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Scrollytelling",
          "description": "Der Entwurf bewahrt die Merkmale von A bright editorial chapter track with a visible reading rail, mit einer helle Palette und einer Komposition als chapter timeline; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Scrollytelling",
          "description": "Предложение сохраняет черты стиля A bright editorial chapter track with a visible reading rail, используя светлую палитру и композицию «chapter timeline»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Scrollytelling",
          "description": "يحافظ الاقتراح على سمات A bright editorial chapter track with a visible reading rail، مع لوحة فاتحة وتكوين «chapter timeline»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Scrollytelling",
          "description": "यह प्रस्ताव A bright editorial chapter track with a visible reading rail की दृश्य पहचान बनाए रखता है, हल्की रंग-पैलेट और chapter timeline संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Scrollytelling",
          "description": "此提案保留 A bright editorial chapter track with a visible reading rail 的视觉特征，采用浅色色板与chapter timeline构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Scrollytelling",
          "description": "この案はA bright editorial chapter track with a visible reading railの視覚的特徴を保ち、ライト配色と「chapter timeline」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Scrollytelling",
          "description": "이 제안은 A bright editorial chapter track with a visible reading rail의 시각적 특징을 유지하면서 밝은 팔레트와 chapter timeline 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#F3EBDD",
        "--surface": "#FFF9EC",
        "--surface-2": "#E7DAC1",
        "--fg": "#30271E",
        "--muted": "#5A4D40",
        "--accent": "#A4512D",
        "--accent-fg": "#FFFFFF",
        "--border": "#887864",
        "--ok": "#24764F",
        "--warn": "#805400",
        "--danger": "#A12D37",
        "--focus": "#A4512D",
        "--radius": "2px",
        "--radius-sm": "6px",
        "--shadow": "0 8px 22px rgba(0,0,0,.16)"
      },
      "colors": {
        "--bg": "#F3EBDD",
        "--surface": "#FFF9EC",
        "--accent": "#A4512D"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"scrollytelling\"]",
          "signal": "A bright editorial chapter track with a visible reading rail; a proposta traduz esses sinais para light usando chapter rule and reading-progress track, mantendo chapter timeline como organização de leitura.",
          "skillReference": "styles/scrollytelling.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/scrollytelling.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva chapter timeline: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/scrollytelling.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema scrollytelling, definida em styles/scrollytelling.css.",
          "after": "No mobile: uma coluna compacta; no desktop: chapter timeline, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas chapter timeline; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "scrollytelling-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"scrollytelling\"][data-variant=\"alternate\"]::before",
          "animation": "scrollytelling-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"scrollytelling\"][data-variant=\"alternate\"]::before",
      "contentDigest": "1bb6c45c4657dcaacf7cda844b2b93fd356cafa6c525af838959507bde2d260b",
      "generatedDigest": "47e69d92ce8e7bb34a846e76b971b9e4cf8f5800bde8dd70e338cf3e4f287cfa",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "micro-interactions": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/micro-interactions.css",
      "nameKey": "appearance.micro-interactions.alternate.name",
      "descriptionKey": "appearance.micro-interactions.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Micro Interactions",
          "description": "A proposta preserva os sinais de A tactile dark control surface with crisp state feedback, com paleta escura e composição interaction map; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Micro Interactions",
          "description": "This proposal keeps the visual cues of A tactile dark control surface with crisp state feedback, with a dark palette and a interaction map composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Micro Interactions",
          "description": "La propuesta conserva los rasgos de A tactile dark control surface with crisp state feedback, con paleta oscura y composición interaction map; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Micro Interactions",
          "description": "La proposition conserve les codes de A tactile dark control surface with crisp state feedback, avec une palette sombre et une composition interaction map ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Micro Interactions",
          "description": "Der Entwurf bewahrt die Merkmale von A tactile dark control surface with crisp state feedback, mit einer dunkle Palette und einer Komposition als interaction map; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Micro Interactions",
          "description": "Предложение сохраняет черты стиля A tactile dark control surface with crisp state feedback, используя тёмную палитру и композицию «interaction map»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Micro Interactions",
          "description": "يحافظ الاقتراح على سمات A tactile dark control surface with crisp state feedback، مع لوحة داكنة وتكوين «interaction map»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Micro Interactions",
          "description": "यह प्रस्ताव A tactile dark control surface with crisp state feedback की दृश्य पहचान बनाए रखता है, गहरी रंग-पैलेट और interaction map संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Micro Interactions",
          "description": "此提案保留 A tactile dark control surface with crisp state feedback 的视觉特征，采用深色色板与interaction map构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Micro Interactions",
          "description": "この案はA tactile dark control surface with crisp state feedbackの視覚的特徴を保ち、ダーク配色と「interaction map」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Micro Interactions",
          "description": "이 제안은 A tactile dark control surface with crisp state feedback의 시각적 특징을 유지하면서 어두운 팔레트와 interaction map 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#202039",
        "--surface": "#2D2D4D",
        "--surface-2": "#3C3A60",
        "--fg": "#F6F4FF",
        "--muted": "#CFCBE5",
        "--accent": "#A69AF5",
        "--accent-fg": "#17142B",
        "--border": "#8C87A6",
        "--ok": "#77D6A1",
        "--warn": "#F2C66D",
        "--danger": "#FF929A",
        "--focus": "#FFE27A",
        "--radius": "18px",
        "--radius-sm": "6px",
        "--shadow": "0 12px 28px rgba(0,0,0,.26)"
      },
      "colors": {
        "--bg": "#202039",
        "--surface": "#2D2D4D",
        "--accent": "#A69AF5"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"micro-interactions\"]",
          "signal": "A tactile dark control surface with crisp state feedback; a proposta traduz esses sinais para dark usando state ripples and tactile pressed markers, mantendo interaction map como organização de leitura.",
          "skillReference": "styles/micro-interactions.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/micro-interactions.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva interaction map: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/micro-interactions.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema micro-interactions, definida em styles/micro-interactions.css.",
          "after": "No mobile: uma coluna compacta; no desktop: interaction map, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas interaction map; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "micro-interactions-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"micro-interactions\"][data-variant=\"alternate\"]::before",
          "animation": "micro-interactions-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"micro-interactions\"][data-variant=\"alternate\"]::before",
      "contentDigest": "a1f6c4587c6148cb2a5a9437096c763bab6af671d29bad64059a8ae28fda2cf0",
      "generatedDigest": "1dc7f71c45b002ce8c2a6de0687a30945a736d53d60e80db9066019f87bd4079",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "isometric": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/isometric.css",
      "nameKey": "appearance.isometric.alternate.name",
      "descriptionKey": "appearance.isometric.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Isometric",
          "description": "A proposta preserva os sinais de A dark axonometric city plan with stacked planes, com paleta escura e composição isometric city; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Isometric",
          "description": "This proposal keeps the visual cues of A dark axonometric city plan with stacked planes, with a dark palette and a isometric city composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Isometric",
          "description": "La propuesta conserva los rasgos de A dark axonometric city plan with stacked planes, con paleta oscura y composición isometric city; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Isometric",
          "description": "La proposition conserve les codes de A dark axonometric city plan with stacked planes, avec une palette sombre et une composition isometric city ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Isometric",
          "description": "Der Entwurf bewahrt die Merkmale von A dark axonometric city plan with stacked planes, mit einer dunkle Palette und einer Komposition als isometric city; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Isometric",
          "description": "Предложение сохраняет черты стиля A dark axonometric city plan with stacked planes, используя тёмную палитру и композицию «isometric city»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Isometric",
          "description": "يحافظ الاقتراح على سمات A dark axonometric city plan with stacked planes، مع لوحة داكنة وتكوين «isometric city»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Isometric",
          "description": "यह प्रस्ताव A dark axonometric city plan with stacked planes की दृश्य पहचान बनाए रखता है, गहरी रंग-पैलेट और isometric city संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Isometric",
          "description": "此提案保留 A dark axonometric city plan with stacked planes 的视觉特征，采用深色色板与isometric city构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Isometric",
          "description": "この案はA dark axonometric city plan with stacked planesの視覚的特徴を保ち、ダーク配色と「isometric city」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Isometric",
          "description": "이 제안은 A dark axonometric city plan with stacked planes의 시각적 특징을 유지하면서 어두운 팔레트와 isometric city 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#17283B",
        "--surface": "#22374E",
        "--surface-2": "#304963",
        "--fg": "#F1F6FC",
        "--muted": "#C6D3E0",
        "--accent": "#52B4C4",
        "--accent-fg": "#0D2025",
        "--border": "#8199A7",
        "--ok": "#77D6A1",
        "--warn": "#F2C66D",
        "--danger": "#FF929A",
        "--focus": "#FFE27A",
        "--radius": "0px",
        "--radius-sm": "0px",
        "--shadow": "0 12px 28px rgba(0,0,0,.26)"
      },
      "colors": {
        "--bg": "#17283B",
        "--surface": "#22374E",
        "--accent": "#52B4C4"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"isometric\"]",
          "signal": "A dark axonometric city plan with stacked planes; a proposta traduz esses sinais para dark usando axonometric diamond lattice and offset planes, mantendo isometric city como organização de leitura.",
          "skillReference": "styles/isometric.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/isometric.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva isometric city: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/isometric.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema isometric, definida em styles/isometric.css.",
          "after": "No mobile: uma coluna compacta; no desktop: isometric city, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas isometric city; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "isometric-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"isometric\"][data-variant=\"alternate\"]::before",
          "animation": "isometric-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"isometric\"][data-variant=\"alternate\"]::before",
      "contentDigest": "a4340142104f6966aef4e5c1c04e025d6048dfeeb6025d2e83b14c756fab0759",
      "generatedDigest": "58ba22392c7bec8a31ff089050dea7ca9ebfb63abef677fb48e9663c62cfef7c",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "fluid-liquid-morph": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "dark"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "light",
      "css": "styles/variants/fluid-liquid-morph.css",
      "nameKey": "appearance.fluid-liquid-morph.alternate.name",
      "descriptionKey": "appearance.fluid-liquid-morph.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Fluid Liquid Morph",
          "description": "A proposta preserva os sinais de A pale fluid field with capillary contours and pooled surfaces, com paleta clara e composição fluid field; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Fluid Liquid Morph",
          "description": "This proposal keeps the visual cues of A pale fluid field with capillary contours and pooled surfaces, with a light palette and a fluid field composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Fluid Liquid Morph",
          "description": "La propuesta conserva los rasgos de A pale fluid field with capillary contours and pooled surfaces, con paleta clara y composición fluid field; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Fluid Liquid Morph",
          "description": "La proposition conserve les codes de A pale fluid field with capillary contours and pooled surfaces, avec une palette claire et une composition fluid field ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Fluid Liquid Morph",
          "description": "Der Entwurf bewahrt die Merkmale von A pale fluid field with capillary contours and pooled surfaces, mit einer helle Palette und einer Komposition als fluid field; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Fluid Liquid Morph",
          "description": "Предложение сохраняет черты стиля A pale fluid field with capillary contours and pooled surfaces, используя светлую палитру и композицию «fluid field»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Fluid Liquid Morph",
          "description": "يحافظ الاقتراح على سمات A pale fluid field with capillary contours and pooled surfaces، مع لوحة فاتحة وتكوين «fluid field»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Fluid Liquid Morph",
          "description": "यह प्रस्ताव A pale fluid field with capillary contours and pooled surfaces की दृश्य पहचान बनाए रखता है, हल्की रंग-पैलेट और fluid field संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Fluid Liquid Morph",
          "description": "此提案保留 A pale fluid field with capillary contours and pooled surfaces 的视觉特征，采用浅色色板与fluid field构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Fluid Liquid Morph",
          "description": "この案はA pale fluid field with capillary contours and pooled surfacesの視覚的特徴を保ち、ライト配色と「fluid field」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Fluid Liquid Morph",
          "description": "이 제안은 A pale fluid field with capillary contours and pooled surfaces의 시각적 특징을 유지하면서 밝은 팔레트와 fluid field 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#F1E9F1",
        "--surface": "#FFF8FA",
        "--surface-2": "#E8D9E8",
        "--fg": "#302332",
        "--muted": "#5A455B",
        "--accent": "#B74369",
        "--accent-fg": "#FFFFFF",
        "--border": "#90738C",
        "--ok": "#24764F",
        "--warn": "#805400",
        "--danger": "#A12D37",
        "--focus": "#B74369",
        "--radius": "28px",
        "--radius-sm": "6px",
        "--shadow": "0 8px 22px rgba(0,0,0,.16)"
      },
      "colors": {
        "--bg": "#F1E9F1",
        "--surface": "#FFF8FA",
        "--accent": "#B74369"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"fluid-liquid-morph\"]",
          "signal": "A pale fluid field with capillary contours and pooled surfaces; a proposta traduz esses sinais para light usando capillary wave contours and soft fluid pools, mantendo fluid field como organização de leitura.",
          "skillReference": "styles/fluid-liquid-morph.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/fluid-liquid-morph.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva fluid field: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/fluid-liquid-morph.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema fluid-liquid-morph, definida em styles/fluid-liquid-morph.css.",
          "after": "No mobile: uma coluna compacta; no desktop: fluid field, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas fluid field; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "fluid-liquid-morph-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"fluid-liquid-morph\"][data-variant=\"alternate\"]::before",
          "animation": "fluid-liquid-morph-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"fluid-liquid-morph\"][data-variant=\"alternate\"]::before",
      "contentDigest": "98112ce7189c770c571a3d6694efad959e594dba8125a3e838fec717accbab95",
      "generatedDigest": "21b99a8aa5b7e4a63b7601df960488df076415be0ea187f53924135f2045328f",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "ai-native-generative-ui": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/ai-native-generative-ui.css",
      "nameKey": "appearance.ai-native-generative-ui.alternate.name",
      "descriptionKey": "appearance.ai-native-generative-ui.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Ai Native Generative Ui",
          "description": "A proposta preserva os sinais de A dark adaptive workspace with explicit generative modules, com paleta escura e composição adaptive workspace; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Ai Native Generative Ui",
          "description": "This proposal keeps the visual cues of A dark adaptive workspace with explicit generative modules, with a dark palette and a adaptive workspace composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Ai Native Generative Ui",
          "description": "La propuesta conserva los rasgos de A dark adaptive workspace with explicit generative modules, con paleta oscura y composición adaptive workspace; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Ai Native Generative Ui",
          "description": "La proposition conserve les codes de A dark adaptive workspace with explicit generative modules, avec une palette sombre et une composition adaptive workspace ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Ai Native Generative Ui",
          "description": "Der Entwurf bewahrt die Merkmale von A dark adaptive workspace with explicit generative modules, mit einer dunkle Palette und einer Komposition als adaptive workspace; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Ai Native Generative Ui",
          "description": "Предложение сохраняет черты стиля A dark adaptive workspace with explicit generative modules, используя тёмную палитру и композицию «adaptive workspace»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Ai Native Generative Ui",
          "description": "يحافظ الاقتراح على سمات A dark adaptive workspace with explicit generative modules، مع لوحة داكنة وتكوين «adaptive workspace»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Ai Native Generative Ui",
          "description": "यह प्रस्ताव A dark adaptive workspace with explicit generative modules की दृश्य पहचान बनाए रखता है, गहरी रंग-पैलेट और adaptive workspace संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Ai Native Generative Ui",
          "description": "此提案保留 A dark adaptive workspace with explicit generative modules 的视觉特征，采用深色色板与adaptive workspace构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Ai Native Generative Ui",
          "description": "この案はA dark adaptive workspace with explicit generative modulesの視覚的特徴を保ち、ダーク配色と「adaptive workspace」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Ai Native Generative Ui",
          "description": "이 제안은 A dark adaptive workspace with explicit generative modules의 시각적 특징을 유지하면서 어두운 팔레트와 adaptive workspace 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#1D2030",
        "--surface": "#292D40",
        "--surface-2": "#383D54",
        "--fg": "#F5F4EF",
        "--muted": "#CFD0D5",
        "--accent": "#56B8A5",
        "--accent-fg": "#102720",
        "--border": "#848B97",
        "--ok": "#77D6A1",
        "--warn": "#F2C66D",
        "--danger": "#FF929A",
        "--focus": "#FFE27A",
        "--radius": "14px",
        "--radius-sm": "6px",
        "--shadow": "0 12px 28px rgba(0,0,0,.26)"
      },
      "colors": {
        "--bg": "#1D2030",
        "--surface": "#292D40",
        "--accent": "#56B8A5"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"ai-native-generative-ui\"]",
          "signal": "A dark adaptive workspace with explicit generative modules; a proposta traduz esses sinais para dark usando generative node graph and modular prompt rails, mantendo adaptive workspace como organização de leitura.",
          "skillReference": "styles/ai-native-generative-ui.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/ai-native-generative-ui.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva adaptive workspace: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/ai-native-generative-ui.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema ai-native-generative-ui, definida em styles/ai-native-generative-ui.css.",
          "after": "No mobile: uma coluna compacta; no desktop: adaptive workspace, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas adaptive workspace; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "ai-native-generative-ui-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"ai-native-generative-ui\"][data-variant=\"alternate\"]::before",
          "animation": "ai-native-generative-ui-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"ai-native-generative-ui\"][data-variant=\"alternate\"]::before",
      "contentDigest": "cd311a068ca3376a2fa9132ed1b4712d084fe931ee66ca2e732b1f6f6dc30a88",
      "generatedDigest": "8bd593afc99ca87a8f1bf21a7bd640351ad42419f6c03f3e0cfdce5f08e67479",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "organic-biophilic": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/organic-biophilic.css",
      "nameKey": "appearance.organic-biophilic.alternate.name",
      "descriptionKey": "appearance.organic-biophilic.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Organic Biophilic",
          "description": "A proposta preserva os sinais de A shaded canopy map with tree-ring and mycelial contours, com paleta escura e composição canopy map; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Organic Biophilic",
          "description": "This proposal keeps the visual cues of A shaded canopy map with tree-ring and mycelial contours, with a dark palette and a canopy map composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Organic Biophilic",
          "description": "La propuesta conserva los rasgos de A shaded canopy map with tree-ring and mycelial contours, con paleta oscura y composición canopy map; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Organic Biophilic",
          "description": "La proposition conserve les codes de A shaded canopy map with tree-ring and mycelial contours, avec une palette sombre et une composition canopy map ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Organic Biophilic",
          "description": "Der Entwurf bewahrt die Merkmale von A shaded canopy map with tree-ring and mycelial contours, mit einer dunkle Palette und einer Komposition als canopy map; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Organic Biophilic",
          "description": "Предложение сохраняет черты стиля A shaded canopy map with tree-ring and mycelial contours, используя тёмную палитру и композицию «canopy map»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Organic Biophilic",
          "description": "يحافظ الاقتراح على سمات A shaded canopy map with tree-ring and mycelial contours، مع لوحة داكنة وتكوين «canopy map»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Organic Biophilic",
          "description": "यह प्रस्ताव A shaded canopy map with tree-ring and mycelial contours की दृश्य पहचान बनाए रखता है, गहरी रंग-पैलेट और canopy map संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Organic Biophilic",
          "description": "此提案保留 A shaded canopy map with tree-ring and mycelial contours 的视觉特征，采用深色色板与canopy map构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Organic Biophilic",
          "description": "この案はA shaded canopy map with tree-ring and mycelial contoursの視覚的特徴を保ち、ダーク配色と「canopy map」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Organic Biophilic",
          "description": "이 제안은 A shaded canopy map with tree-ring and mycelial contours의 시각적 특징을 유지하면서 어두운 팔레트와 canopy map 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#243027",
        "--surface": "#344539",
        "--surface-2": "#435746",
        "--fg": "#F1EEDD",
        "--muted": "#D6D2B8",
        "--accent": "#FFC08A",
        "--accent-fg": "#21190F",
        "--border": "#A1A68F",
        "--ok": "#77D6A1",
        "--warn": "#F2C66D",
        "--danger": "#FF929A",
        "--focus": "#FFE27A",
        "--radius": "30px 22px 34px 18px",
        "--radius-sm": "6px",
        "--shadow": "0 12px 28px rgba(0,0,0,.26)"
      },
      "colors": {
        "--bg": "#243027",
        "--surface": "#344539",
        "--accent": "#FFC08A"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"organic-biophilic\"]",
          "signal": "A shaded canopy map with tree-ring and mycelial contours; a proposta traduz esses sinais para dark usando tree-ring contour and mycelial branches, mantendo canopy map como organização de leitura. O campo ornamental tem padrão exclusivo descrito no CSS desta proposta.",
          "skillReference": "styles/organic-biophilic.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/organic-biophilic.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva canopy map: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/organic-biophilic.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema organic-biophilic, definida em styles/organic-biophilic.css.",
          "after": "No mobile: uma coluna compacta; no desktop: canopy map, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas canopy map; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "organic-biophilic-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"organic-biophilic\"][data-variant=\"alternate\"]::before",
          "animation": "organic-biophilic-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"organic-biophilic\"][data-variant=\"alternate\"]::before",
      "contentDigest": "836cb97160c0b02373d0af6435fb736be1ce7c043298c5f4cd47458b5c5c0727",
      "generatedDigest": "3b46084b27a9560bbb9b11db71bc9b5261ef6c4cc447b9a278e3e3cf830e73e3",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  },
  "kawaii-pastel-soft": {
    "default": {
      "id": "default",
      "status": "canonical",
      "polarity": "light"
    },
    "alternate": {
      "id": "alternate",
      "status": "approved",
      "polarity": "dark",
      "css": "styles/variants/kawaii-pastel-soft.css",
      "nameKey": "appearance.kawaii-pastel-soft.alternate.name",
      "descriptionKey": "appearance.kawaii-pastel-soft.alternate.description",
      "locales": {
        "pt-BR": {
          "name": "Contraparte de revisão: Kawaii Pastel Soft",
          "description": "A proposta preserva os sinais de A cozy midnight storybook with candy stars and cloud forms, com paleta escura e composição storybook cards; examine contraste, leitura e encaixe em telas pequenas."
        },
        "en-US": {
          "name": "Review counterpart: Kawaii Pastel Soft",
          "description": "This proposal keeps the visual cues of A cozy midnight storybook with candy stars and cloud forms, with a dark palette and a storybook cards composition; review contrast, reading flow and small-screen fit."
        },
        "es-ES": {
          "name": "Variante para revisión: Kawaii Pastel Soft",
          "description": "La propuesta conserva los rasgos de A cozy midnight storybook with candy stars and cloud forms, con paleta oscura y composición storybook cards; revise el contraste, la lectura y el ajuste en pantallas pequeñas."
        },
        "fr-FR": {
          "name": "Variante à examiner: Kawaii Pastel Soft",
          "description": "La proposition conserve les codes de A cozy midnight storybook with candy stars and cloud forms, avec une palette sombre et une composition storybook cards ; vérifiez le contraste, la lecture et l’affichage sur petit écran."
        },
        "de-DE": {
          "name": "Prüfvariante: Kawaii Pastel Soft",
          "description": "Der Entwurf bewahrt die Merkmale von A cozy midnight storybook with candy stars and cloud forms, mit einer dunkle Palette und einer Komposition als storybook cards; prüfen Sie Kontrast, Lesefluss und kleine Bildschirme."
        },
        "ru-RU": {
          "name": "Вариант для проверки: Kawaii Pastel Soft",
          "description": "Предложение сохраняет черты стиля A cozy midnight storybook with candy stars and cloud forms, используя тёмную палитру и композицию «storybook cards»; проверьте контраст, чтение и узкие экраны."
        },
        "ar-SA": {
          "name": "نسخة للمراجعة: Kawaii Pastel Soft",
          "description": "يحافظ الاقتراح على سمات A cozy midnight storybook with candy stars and cloud forms، مع لوحة داكنة وتكوين «storybook cards»؛ راجع التباين وسهولة القراءة والملاءمة للشاشات الصغيرة."
        },
        "hi-IN": {
          "name": "समीक्षा विकल्प: Kawaii Pastel Soft",
          "description": "यह प्रस्ताव A cozy midnight storybook with candy stars and cloud forms की दृश्य पहचान बनाए रखता है, गहरी रंग-पैलेट और storybook cards संरचना के साथ; कंट्रास्ट, पढ़ने की सहजता और छोटी स्क्रीन पर जाँचें।"
        },
        "zh-CN": {
          "name": "待审阅的配色方案: Kawaii Pastel Soft",
          "description": "此提案保留 A cozy midnight storybook with candy stars and cloud forms 的视觉特征，采用深色色板与storybook cards构图；请检查对比度、阅读流畅度和小屏适配。"
        },
        "ja-JP": {
          "name": "レビュー用の対案: Kawaii Pastel Soft",
          "description": "この案はA cozy midnight storybook with candy stars and cloud formsの視覚的特徴を保ち、ダーク配色と「storybook cards」構成を採用します。コントラスト、読みやすさ、小画面での表示を確認してください。"
        },
        "ko-KR": {
          "name": "검토용 대안: Kawaii Pastel Soft",
          "description": "이 제안은 A cozy midnight storybook with candy stars and cloud forms의 시각적 특징을 유지하면서 어두운 팔레트와 storybook cards 구성을 사용합니다. 대비, 읽기 흐름, 작은 화면을 확인하세요."
        }
      },
      "tokens": {
        "--bg": "#3A2636",
        "--surface": "#4A3345",
        "--surface-2": "#5B4053",
        "--fg": "#FFF3F6",
        "--muted": "#EAD5DF",
        "--accent": "#FF91AF",
        "--accent-fg": "#321A26",
        "--border": "#AF8E9C",
        "--ok": "#77D6A1",
        "--warn": "#F2C66D",
        "--danger": "#FF929A",
        "--focus": "#FFE27A",
        "--radius": "28px",
        "--radius-sm": "6px",
        "--shadow": "0 12px 28px rgba(0,0,0,.26)"
      },
      "colors": {
        "--bg": "#3A2636",
        "--surface": "#4A3345",
        "--accent": "#FF91AF"
      },
      "designSignals": [
        {
          "selector": "#stage[data-style=\"kawaii-pastel-soft\"]",
          "signal": "A cozy midnight storybook with candy stars and cloud forms; a proposta traduz esses sinais para dark usando night-sky candy dots and scalloped cloud line, mantendo storybook cards como organização de leitura.",
          "skillReference": "styles/kawaii-pastel-soft.css",
          "evidence": "Identidade visual derivada da descrição canônica em styles/registry.js e dos tokens/regras de styles/kawaii-pastel-soft.css; CSS separado em alternate."
        },
        {
          "selector": "#view-painel",
          "signal": "Composição responsiva storybook cards: painel principal e áreas de métricas/recursos mudam de posição no desktop, sem espaçamento excessivo em 320–768 px.",
          "skillReference": "styles/kawaii-pastel-soft.css",
          "evidence": "A contraparte empilha áreas no mobile com gaps limitados por clamp; em 960 px reordena as áreas em grade específica."
        }
      ],
      "layoutChanges": [
        {
          "selector": "#view-painel",
          "property": "grid-template-areas / grid-template-columns / gap",
          "before": "Composição padrão do tema kawaii-pastel-soft, definida em styles/kawaii-pastel-soft.css.",
          "after": "No mobile: uma coluna compacta; no desktop: storybook cards, com ordem hero/metrics/resources deliberadamente alterada.",
          "breakpoints": {
            "320": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18px gap; KPIs em 2 colunas."
            },
            "375": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna; largura minmax(0,1fr), 18–30px gap; sem largura mínima rígida."
            },
            "768": {
              "before": "Fluxo padrão canônico.",
              "after": "1 coluna até 959px; cards compactos em 2 colunas e recursos em 1 coluna."
            },
            "1280": {
              "before": "Fluxo padrão canônico.",
              "after": "Grade de duas colunas com áreas storybook cards; gap 20–34px e gráfico ocupando a faixa de recursos."
            }
          }
        }
      ],
      "motion": {
        "element": {
          "selector": ".kpi",
          "animation": "kawaii-pastel-soft-settle",
          "trigger": "Ao aplicar a contraparte, cada cartão KPI entra uma vez com deslocamento vertical curto de 8px; sem loop.",
          "duration": "550ms ease-out, uma execução",
          "fallback": "Sem animação CSS, cartão visível no estado final; conteúdo e foco não dependem de movimento.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        },
        "background": {
          "selector": "#stage[data-style=\"kawaii-pastel-soft\"][data-variant=\"alternate\"]::before",
          "animation": "kawaii-pastel-soft-field",
          "trigger": "Ao aplicar a contraparte, trama decorativa move-se lentamente 34×18px em vaivém; animação decorativa sem parallax de scroll.",
          "duration": "24s ease-in-out alternate, loop decorativo",
          "fallback": "A trama permanece estática no ponto inicial, sem retirar informação do conteúdo.",
          "reducedMotion": "Desativada por prefers-reduced-motion: reduce; todos os componentes permanecem em seu estado final estático.",
          "pauseResume": "CSS sem relógio JavaScript; o navegador suspende animações da página oculta e retoma ao tornar-se visível.",
          "cleanup": "Não cria listeners, timers, observers, canvas ou recursos persistentes; as regras são removidas ao descarregar a folha da contraparte."
        }
      },
      "elementMotion": true,
      "backgroundMotion": true,
      "motionTarget": ".kpi",
      "backgroundTarget": "#stage[data-style=\"kawaii-pastel-soft\"][data-variant=\"alternate\"]::before",
      "contentDigest": "1533791169d23c8bc7dcb1f49c884517d27ae888dc0091435ee30aeec3e536e1",
      "generatedDigest": "c216a4b589d4d173d8ee36ce30814b06bf3c3f42be84bb60425f757ed795f7a0",
      "snapshotDigest": "ac1925935b13c1a2790ef1bbc932998e7e1de2c7593a68a1627492786070d0e1"
    }
  }
};

export const DEFAULT_VARIANT = 'default';
