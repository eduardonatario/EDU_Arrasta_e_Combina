# Arrasta e Combina — Criador de Quiz Interativo Educacional

Aplicativo web interativo para criar e exportar atividades pedagógicas do tipo "arrastar e soltar" (drag-and-drop). Permite aos educadores e criadores de conteúdo personalizar pares de itens, testar em tempo real e exportar um arquivo HTML independente (standalone) pronto para uso em plataformas como Moodle, Canvas, Google Sala de Aula ou diretamente no navegador.

---

## 🚀 Como Publicar no GitHub e GitHub Pages

Este projeto já está 100% configurado com:
- Caminhos relativos (`base: './'` no `vite.config.ts`), garantindo funcionamento perfeito em subpastas de repositórios do GitHub Pages.
- Workflow automatizado do **GitHub Actions** em [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### Passo 1: Subir o código para o GitHub

1. No [GitHub](https://github.com/), crie um novo repositório (por exemplo, `arrasta-e-combina`).
2. No seu terminal, dentro da pasta do projeto, execute:

```bash
# Inicializar o repositório Git
git init

# Adicionar todos os arquivos
git add .

# Criar o commit inicial
git commit -m "feat: versão inicial do Arrasta e Combina"

# Definir a branch principal como main
git branch -M main

# Vincular ao seu repositório remoto no GitHub (substitua com o seu usuário e nome do repo)
git remote add origin https://github.com/<SEU_USUARIO>/<SEU_REPOSITORIO>.git

# Enviar os arquivos
git push -u origin main
```

---

### Passo 2: Ativar o GitHub Pages

1. Acesse o seu repositório no GitHub.
2. Vá em **Settings** (Configurações) > menu lateral **Pages**.
3. Na seção **Build and deployment**:
   - Em **Source**, mude de *Deploy from a branch* para **GitHub Actions**.
4. Pronto! O fluxo configurado no arquivo `.github/workflows/deploy.yml` será disparado automaticamente.
5. Em poucos minutos, seu app estará no ar no endereço:
   ```text
   https://<SEU_USUARIO>.github.io/<SEU_REPOSITORIO>/
   ```

---

## 💻 Desenvolvimento Local

Para rodar o projeto no seu computador:

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev

# 3. Gerar a versão de produção
npm run build

# 4. Pré-visualizar a versão compilada
npm run preview
```

---

## ✨ Funcionalidades

- **Pareamento Interativo**: Arraste os cards da esquerda até os alvos da direita, ou utilize cliques sequenciais (ideal para celulares e tablets).
- **Ilustrações SVG Integradas**: Ampla biblioteca de ícones vetoriais otimizados ou suporte a URLs customizadas.
- **Personalização Pedagógica**:
  - Título e subtítulo customizáveis.
  - Alternância de orientação didática e barra de progresso.
  - Revisão didática com explicações individuais por organela/conceito.
  - Feedback geral personalizável.
- **Exportação HTML Standalone**: Gere um único arquivo `.html` autônomo com Tailwind CSS via CDN e JavaScript embarcado, sem dependência de servidores ou bancos de dados.
- **Preview em Tela Cheia**: Apresente a atividade diretamente em projetores ou salas de aula.

---

## 🛠️ Tecnologias

- **React 19** + **TypeScript**
- **Vite 6**
- **Tailwind CSS**
- **Motion (Framer Motion)**
- **Lucide React**
