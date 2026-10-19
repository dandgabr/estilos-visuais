# Notas de revisão de pares claro/escuro

## Retro Computing: variante Workbench clara

O tema CRT verde não deve virar um “modo claro” apenas trocando `background-color`. A imagem de fundo canônica continua ativa e contamina textos, títulos e avisos. A variante clara precisa declarar o fundo completo e revisar também brilho, sombras, barras, superfícies, controles e rodapé.

A direção escolhida para a variante clara é o Amiga Workbench 2.x/3.x: desktop cinza claro, janelas claras com relevo, texto escuro e barras de título azuis. O Workbench 1.x oferece outra referência histórica válida (azul, branco, preto e laranja), mas a variante atual usa a hierarquia cinza e pseudo-3D introduzida na Release 2 para manter o resultado claramente claro.

Fontes consultadas em 18/10/2026:

- [AmigaOS Developer Documentation — RKRM changes and additions](https://developer.amigaos3.net/sites/default/files/downloads/2024-02/RKRM%20changes%20and%20additions-%282024-02-21%29.pdf): descreve a base cinza/preta e o relevo pseudo-3D da Release 2.
- [AmigaOS Manual: Workbench Preferences](https://wiki.amigaos.net/wiki/AmigaOS_Manual%3A_Workbench_Preferences): documenta a configuração independente de fundo, texto, bordas, título ativo e menus.
- [dan.seg.br](https://dan.seg.br/): referência de aplicação indicada pelo usuário para essa direção visual.

## Regra reutilizável

Cada modo alternativo deve substituir a composição do fundo inteiro quando a aparência padrão contém gradientes ou texturas que não pertencem à variante. Manter um padrão de fundo só é adequado quando ele continua intencional e não reduz contraste. Detalhes do estilo podem ser recriados em camadas próprias, com cores da paleta alternativa.
