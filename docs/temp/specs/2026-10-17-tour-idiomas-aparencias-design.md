# Tour, idiomas e aparências — especificação de design

## Objetivo

Permitir que uma pessoa descubra e abra a skill do estilo durante o tour, compare o mesmo mockup em onze idiomas e experimente sete aparências em cada um dos 82 estilos. A aparência atual continua sendo a opção **Padrão**, com seu CSS e suas cores preservados. As outras seis são adicionais: três claras e três escuras, mesmo quando essa divisão é uma adaptação estilística, como em Solarpunk e Lunarpunk.

## Fluxo da pessoa usuária

1. Ao entrar, o site usa a preferência manual válida, se existir; caso contrário, percorre `navigator.languages` na ordem informada. Para **cada** entrada, tenta correspondência exata e depois um alias de idioma-base explicitamente aprovado; a primeira entrada compatível vence. Sem correspondência, usa `en-US`. A opção **Automático** continua indicada enquanto o idioma efetivo pode mudar. O idioma da página pode ser trocado sem mudar estilo, aba ou aparência.
2. A barra mantém visíveis **Idioma** e **Aparência**. O tour inicial aponta individualmente para ambos e para o link da skill. O tour de cada estilo mostra a ação **Abrir skill deste estilo ↗**; ela abre a página GitHub correta, onde o arquivo `SKILL.md` pode ser lido ou baixado.
3. **Aparência** abre sete opções: **Padrão · original**, **Claras** C1/C2/C3 e **Escuras** E1/E2/E3. O botão mostra a opção ativa; a lista mostra nome específico do estilo, descrição curta e três amostras decorativas. A seleção aplica imediatamente, persiste por slug e oferece **Voltar ao padrão**. C3 anima elementos; E3 tem fundo animado. A nomenclatura clara/escura organiza a lista, mas o visual mantém a identidade de cada estilo.
4. Em 375, 768 e 1280 px, a barra tem navegação/título/skill/ajuda na primeira linha e seletores na segunda. Em 320 px e larguras CSS menores causadas por zoom, a barra pode ocupar três ou mais linhas: título nunca desaparece, navegação anterior/próximo permanece acessível e todos os controles mantêm área clicável mínima de 44 × 44 px, inclusive skill e ajuda. A lista de aparências usa painel de largura disponível com rolagem própria; `Escape` fecha e devolve foco ao acionador.

## Idiomas

`pt-BR` permanece como conteúdo de referência atual. Os dez adicionais são `en-US`, `es-ES`, `fr-FR`, `de-DE`, `ru-RU`, `ar-SA`, `hi-IN`, `zh-CN`, `ja-JP` e `ko-KR`. A escolha prioriza alcance geográfico e testes com latino, cirílico, árabe em RTL, devanágari, han, kana e hangul; não pressupõe um ranking estatístico.

Traduzir shell, mockup das quatro abas, busca, formulários, `placeholder`, `title`, nomes acessíveis, diálogo, tours, mensagens produzidas em JavaScript, descrições dos 82 estilos e texto semântico dos efeitos. Preservar marcas, slugs, URLs e nomes próprios de estilos. Localizar números/unidades quando exibidos como texto, mantendo os mesmos dados para comparação visual. Cada troca atualiza `<html lang>` e `dir`; árabe usa `rtl`, com códigos, endereços e campos técnicos isolados em `ltr`. No seletor, cada autônimo tem seu próprio `lang`/`dir=auto`, e o código BCP 47 fica em `<bdi dir="ltr">`. Nenhuma chave deve ficar em português em um idioma alternativo; ausência de chave cai em `en-US` e é reportada no teste de completude.

## Aparências e efeitos

O CSS canônico `styles/<slug>.css` segue sendo o Padrão e não recebe alterações cromáticas para viabilizar variantes. Cada `styles/variants/<slug>.css` contém só sobreposições escopadas pelo slug e pelo ID da variante. A primeira opção de cada polo troca cores e materiais de modo contido; a segunda muda também a composição de superfícies e motivos; a terceira é a opção experimental descrita na matriz do plano. As seis revisam fundos, textos, superfícies, bordas, botões, foco, gráficos, estados, componentes e cores fixas do CSS original. O shell continua neutro.

Cada C3 contém animação visível de elemento e cada E3 contém fundo animado coerente com a linha da matriz. O movimento fica em camada decorativa fora de controles e texto legível, não produz flashes repetidos (teto técnico: menos de 3 por segundo; alvo visual: nenhum flash), respeita `prefers-reduced-motion`, pausa quando a aba/área não está visível e tem teardown ao trocar estilo, variante ou idioma. Uma versão estática completa deve permanecer disponível antes, durante e depois da animação. FX existentes são parametrizados ou remontados após limpeza, sem loops duplicados. Keyframes e camadas recebem prefixo por slug para evitar vazamento entre estilos.

## Estados e falhas

- Preferências manuais de idioma e aparência são independentes. Aparência persiste por slug; um estilo sem escolha volta a Padrão.
- Falha de armazenamento mantém a escolha na sessão; falha ao carregar CSS de variante restaura Padrão e anuncia o resultado. Falha de FX decorativo mantém a aparência em versão estática; falha de FX essencial à visibilidade da cena revela o conteúdo estático e, se essa composição falhar, restaura Padrão de forma atômica.
- Troca de idioma durante tour encerra/recria o popover com textos novos; troca de variante preserva aba, hash e posição de rolagem quando possível.
- A navegação global por setas não captura eventos originados nos seletores, rádios, diálogos ou tour.
- Seleção nunca depende apenas de cor: rádio/estado, nome e mensagem `aria-live` informam a aparência ativa.

## Aceite

- Link do tour e da barra aponta para a skill do slug ativo; abertura, foco e acesso ao download no GitHub são testados para todos os 82 slugs.
- Idioma automático/manual, fallback `en-US`, persistência, RTL e completude de traduções funcionam nas quatro abas.
- Para cada um dos 82 estilos há exatamente 1 Padrão intacto e 6 variantes extras, com C3/E3 exercitando os dois tipos de movimento.
- Sem clipping de controles, overflow horizontal indevido, texto invisível, regressão de contraste/foco ou conteúdo oculto por FX. Exigir contraste mínimo 4,5:1 para texto comum e 3:1 para texto grande e estados/limites de controles, inclusive no pior trecho de gradiente ou fundo animado; testar `forced-colors`. Em movimento reduzido, a composição permanece completa.
- As combinações são avaliadas em rodadas: baseline do Padrão, implementação por famílias de estilos, comparação visual, auditoria automática e revisão humana final antes de publicar.

## Fontes para os contratos de idioma

- [MDN: `Navigator.languages`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages) — tags BCP 47 e ordem de preferência.
- [W3C: direção RTL em HTML](https://www.w3.org/International/questions/qa-html-dir.en.html) — uso de `lang` e `dir`.
- [Unicode CLDR: identificadores de idioma](https://cldr.unicode.org/index/cldr-spec/picking-the-right-language-code) — identificação de idiomas e regiões.
- [W3C WCAG 2.2](https://www.w3.org/TR/wcag/) — contraste, conteúdo não textual e limites de flashes.
- [W3C: animação após interação](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions) — respeito à preferência de movimento reduzido.
