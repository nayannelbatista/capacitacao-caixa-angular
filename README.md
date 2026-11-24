# Central de Atendimento — Capacitação Caixa

Projeto Angular desenvolvido durante as aulas da capacitação dos profissionais da CAIXA. A Central de Atendimento reúne exemplos de registro de chamados e publicação de avisos e será ampliada nas próximas aulas.

## Tecnologias

- Angular 21 e Angular CLI
- TypeScript 5.9, HTML e CSS
- npm para gerenciar dependências e Vitest para executar testes

## Pré-requisitos

- Git
- Node.js 24 e npm 11 (ambiente verificado com Node.js 24.13.0 e npm 11.6.2)

## Executar localmente

```bash
git clone https://github.com/nayannelbatista/capacitacao-caixa-angular.git
cd capacitacao-caixa-angular
npm ci
npm start
```

Acesse [http://localhost:4200](http://localhost:4200) no navegador.

Para verificar o build de produção, execute `npm run build`. Para rodar os testes uma vez, execute `npm test -- --watch=false`.

## Conteúdos abordados

- **Aula 01 — Introdução ao Angular e criação do projeto.** Configuração inicial com o Angular CLI e reconhecimento da estrutura da aplicação.
- **Aula 02 (23/11/2026) — Control Flow e Data Binding.** Os componentes de chamados e avisos usam `@if`, `@for`, `@empty` e `@switch` para controlar a renderização. Os exemplos também mostram interpolação, ligação de propriedades e eventos e ligação bidirecional com `[(ngModel)]`.
