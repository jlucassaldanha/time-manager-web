# Time Manager - Web Frontend

Aplicação web para o sistema **Time Manager**, responsável pela interface de usuário para gestão de horas extras.

O projeto foi construído focando em uma separação rigorosa entre as regras de negócio e as ferramentas visuais, permitindo alta manutenibilidade e testes isolados.

## 🚀 Tecnologias Utilizadas

* **Framework:** Next.js (App Router)
* **Linguagem:** TypeScript estrito
* **Interface (UI):** React + Material UI (`@mui/material`)
* **Comunicação de Rede:** Server Actions (Next.js) + Fetch API nativa
* **Padrões Arquiteturais:** Clean Architecture, SOLID, Result Pattern

---

## 🏛️ Estrutura de Pastas e Clean Architecture

O projeto não acopla as lógicas de negócio diretamente aos componentes do React. A arquitetura está dividida da seguinte forma dentro da pasta `src/`:

* **`/core`**: O coração do sistema. Independente de React ou Next.js.
  * **`/domain`**: Contratos (`interfaces`) e Entidades puras que definem os dados (Ex: `TimeRecord`, `Summary`).
  * **`/application/useCases`**: Orquestração das regras de negócio. Validações estritas antes de enviar ou processar dados da API.
  * **`/infrastructure`**: Implementações reais dos repositórios e o `HttpClient`. É a única camada que sabe como fazer requisições web.
* **`/actions`**: Server Actions. Atuam como **Controllers**. Recebem requisições da interface React, injetam os cookies de autenticação na infraestrutura e chamam os Use Cases.
* **`/app`**: O sistema de roteamento do Next.js. Contém apenas os componentes de página (Views) e o `layout.tsx`.
* **`/components`**: Elementos visuais reutilizáveis feitos com Material UI (Ex: `DynamicPunchModal`, `PeriodCard`).
* **`/hooks`**: Funções de gerenciamento de estado do lado do cliente (Client-side) para controlar fluxos complexos das telas.
* **`proxy.ts`**: Edge Middleware que bloqueia rotas protegidas antes mesmo de renderizar a página, garantindo segurança na navegação.

---

## ⚙️ Como Executar o Projeto Localmente

### Pré-requisitos
* **Node.js** (versão 18.17 ou superior)
* **NPM** (ou Yarn/pnpm)
* A API C# (Backend) rodando localmente.

### Passo a Passo

1. Instale as dependências do projeto:
   ```bash
   npm install

```

2. Configure as Variáveis de Ambiente:
Crie um arquivo chamado `.env.local` na raiz do projeto (mesmo nível do `package.json`) e aponte para a URL da sua API C#. Exemplo:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000

```


*(Substitua `5000` pela porta em que o seu backend C# estiver rodando).*
3. Inicie o servidor de desenvolvimento:
```bash
npm run dev

```


4. Acesse a aplicação no navegador:
O sistema estará disponível em [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).

---

## 🔐 Autenticação e Segurança

A aplicação utiliza uma abordagem de segurança robusta:

* **Cookies HTTP-Only:** O token JWT fornecido pela API não fica acessível ao JavaScript do navegador (`localStorage` não é utilizado). As Server Actions cuidam de armazenar e repassar o token diretamente pelo servidor.
* **Fail-Fast no Edge:** Se o usuário tentar acessar a rota `/summary` sem o cookie de autenticação, o arquivo `src/proxy.ts` intercepta a requisição e redireciona para `/login` instantaneamente, economizando recursos do servidor.

## 🤝 Padrão de Retorno (Result Pattern)

Para evitar "quebras" na interface gráfica (Unhandled Rejections), as chamadas para a API C# não disparam exceções (`throw new Error`) diretamente para a UI. As Server Actions formatam as respostas no seguinte contrato:

```typescript
{ 
  success: boolean; 
  data?: DadosEsperados; 
  error?: string; 
}

```

Isso delega ao componente React a responsabilidade exclusiva de decidir como desenhar a mensagem de erro na tela usando o Material UI.