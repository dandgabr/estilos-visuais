# Estilos Visuais Coacus

Galeria interativa para exploração, visualização e auditoria comparativa de dezenas de estilos visuais e estéticas de interface (UI). Cada estilo reaplica dinamicamente seus tokens de design, superfícies, tipografias, paletas de cores, geometrias e comportamentos a um mesmo painel de demonstração vivo.

---

## ⚡ Como Rodar o Projeto

> [!IMPORTANT]
> **Por que é necessário um servidor local?**
> A galeria carrega módulos JavaScript nativos (`<script type="module">` e `import/export`). Por motivos de segurança, navegadores bloqueiam requisições de módulos quando o arquivo é aberto diretamente com dois cliques via protocolo local (`file:///`). Executar um servidor HTTP local resolve isso.

Você pode escolher rodar com **Python** (já embutido no sistema operacional) ou **Node.js**:

### Opção 1: Via Python (Sem instalar nada)

Se você já possui Python 3 instalado, abra o terminal na pasta do projeto e execute:

```bash
python3 -m http.server 8000
```

Em seguida, acesse no navegador:
👉 **[http://localhost:8000](http://localhost:8000)**

*(Para encerrar o servidor, pressione `Ctrl + C` no terminal).*

---

### Opção 2: Via Node.js (npm / npx)

Não é necessário instalar dependências no repositório. Você pode subir o servidor direto com `npx`:

```bash
# Usando o comando configurado no package.json:
npm start
```

Ou diretamente via npx:
```bash
npx serve -l 8000 .
```

Em seguida, acesse no navegador:
👉 **[http://localhost:8000](http://localhost:8000)**

---

## 🧭 Como Usar e Navegar pela Galeria

Assim que a página estiver aberta no navegador, você pode navegar e trocar de estilo de várias maneiras:

1. **Menu Lateral (Galeria de Estilos):**
   - Na coluna esquerda, todos os estilos estão agrupados por categorias conceituais (ex: *Limpo e funcional*, *Superfície e materiais*, *Brutalista e rebelde*, *Tipografia e editorial*, *Punks e ficção científica*, etc.).
   - Clique em qualquer estilo da lista para aplicá-lo instantaneamente ao palco.
   - Use o campo de busca **"Buscar estilo…"** para filtrar por nome ou grupo em tempo real.
2. **Setas de Navegação:**
   - Na barra superior do palco, use os botões **`←`** (anterior) e **`→`** (próximo) para percorrer a galeria sequencialmente.
3. **Atalhos do Teclado:**
   - Pressione as setas **`←`** ou **`→`** do teclado a qualquer momento para navegar entre os estilos (quando não estiver digitando em um campo de texto).
4. **Link Direto / URL Hash:**
   - Você pode acessar um estilo específico diretamente pela URL adicionando a hashtag, por exemplo:
     - `http://localhost:8000/#neo-brutalism`
     - `http://localhost:8000/#cyberpunk`
     - `http://localhost:8000/#glassmorphism`
     - `http://localhost:8000/#swiss-web-minimalism`

---

## 🔍 Como Saber o Estilo Atual

A interface indica o estilo ativo em múltiplos pontos:

- **Barra Superior:** Exibe em destaque o **nome do estilo** e uma síntese de suas características essenciais.
- **Barra Lateral:** O item selecionado recebe realce de cor e o indicador `aria-current="true"`.
- **Título da Aba:** Atualiza automaticamente no navegador como `<Nome do Estilo> · Estilos Coacus`.
- **URL:** O identificador (*slug*) do estilo permanece sincronizado no hash da URL.

---

## 📁 Estrutura do Projeto

```text
├── index.html            # Shell da aplicação e mockup vivo dos componentes de UI
├── shell.css             # Estilização isolada da galeria (painel lateral e barra superior)
├── app.js                # Lógica de alternância dinâmica de CSS, roteamento e atalhos
├── package.json          # Atalhos de execução local para o ecossistema Node.js
├── styles/
│   ├── base.css          # Estilos base e reset estrutural dos componentes do mockup
│   ├── registry.js       # Registro com metadados, títulos e categorizações dos estilos
│   ├── fx/               # Efeitos especiais e animações interativas (ex: glitch, terminal)
│   └── *.css             # Folhas de estilo individuais correspondentes a cada estética
└── tools/
    └── audit.py          # Script de auditoria automatizada de acessibilidade e contraste
```

---

## 🛠️ Auditoria de Qualidade e Contraste

O projeto conta com uma ferramenta interna para auditar contraste visual e conformidade de cada folha de estilo:

```bash
python3 tools/audit.py
```

---

## 📄 Licença

Distribuído sob a licença [MIT](LICENSE).
