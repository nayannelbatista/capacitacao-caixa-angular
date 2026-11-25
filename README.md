# Central de Atendimento — Capacitação Front-end da CAIXA

Aplicação Angular construída durante a capacitação dos profissionais da CAIXA. O projeto usa uma central de atendimento como cenário para praticar componentes, templates e formulários, com exemplos de abertura de chamados e publicação de avisos.

## Como estudar este repositório

Leia os templates junto com os arquivos TypeScript. Os comentários registram exemplos de aulas anteriores e alternativas discutidas em sala. Na versão atual, a tela inicial exibe o formulário reativo. Para experimentar outro componente, selecione seu import e sua entrada em `imports` no [componente raiz](src/app/app.ts) e use o seletor correspondente no [template raiz](src/app/app.html). Ative um exemplo por vez e preserve os trechos comentados para consulta.

## Tecnologias

| Tecnologia | Versão verificada | Uso |
| --- | --- | --- |
| Angular e Angular Forms | 21.2.26 | Componentes, templates e formulários |
| Angular CLI | 21.2.30 | Servidor local, build e execução dos testes |
| TypeScript | 5.9.3 | Código dos componentes |
| RxJS | 7.8.2 | Dependência do Angular |
| Vitest e jsdom | 4.1.12 e 27.4.0 | Testes e ambiente DOM |
| HTML e CSS | — | Marcação e estilos |

As versões das dependências vêm do `package-lock.json`.

## Instalação e execução

Você precisa de Git, Node.js 24 e npm 11. O ambiente usado na verificação tinha Node.js 24.13.0 e npm 11.6.2.

```bash
git clone https://github.com/nayannelbatista/capacitacao-caixa-angular.git
cd capacitacao-caixa-angular
npm ci
npm start
```

Abra [http://localhost:4200](http://localhost:4200) no navegador.

| Comando | Finalidade |
| --- | --- |
| `npm start` | Rodar o servidor de desenvolvimento |
| `npm run build` | Gerar o build de produção em `dist/central-atendimento/` |
| `npm test -- --watch=false` | Rodar a suíte de testes uma vez |

## Organização dos componentes

| Componente em `src/app/` | Responsabilidade |
| --- | --- |
| [App](src/app/app.ts) | Define qual exemplo aparece na tela inicial. |
| [Painel de atendimento](src/app/painel-atendimento/) | Registra chamados em memória e permite acompanhar ou alterar seu status. |
| [Avisos](src/app/avisos/) | Publica e lista avisos em memória por tipo. |
| [Template-driven Form](src/app/template-driven-form/) | Abre chamados com regras de validação declaradas no template. |
| [Reactive Form](src/app/reactive-form/) | Abre chamados com controles e validações definidos em TypeScript. |
| [Desafio do formulário legado](src/app/desafio-formulario-legado/) | Fornece o cenário inicial da atividade prática da Aula 03. |

## Aulas

### Aula 01 — Introdução ao Angular e criação do projeto

Criação da aplicação com o Angular CLI e reconhecimento da estrutura inicial, do componente raiz e do servidor de desenvolvimento.

### Aula 02 (23/11/2026) — Control Flow e Data Binding

Os exemplos de chamados e avisos usam `@if`, `@for`, `@empty` e `@switch` para controlar a renderização. Os templates também demonstram interpolação, ligação de propriedades, classes e eventos e ligação bidirecional com `[(ngModel)]`.

### Aula 03 (24/11/2026) — Formulários no Angular

Os dois exemplos trabalham o mesmo cenário de abertura de chamado. Em ambos, o botão é habilitado quando o formulário fica válido, e o envio exibe os dados no console do navegador.

| Conceito | Template-driven Forms | Reactive Forms |
| --- | --- | --- |
| Módulo | `FormsModule` | `ReactiveFormsModule` |
| Modelo e ligação com o template | Objeto `chamado`, campos com `name` e `[(ngModel)]`, formulário acessado com `#chamadoForm="ngForm"` | Grupo criado com `FormBuilder`, ligado via `[formGroup]` e `formControlName`. O TypeScript conserva uma alternativa comentada com `FormGroup` e `FormControl`. |
| Validação | Diretivas como `required`, `minlength` e `email`. A descrição exige pelo menos dez caracteres. | `Validators.required`, `Validators.minLength`, `Validators.email` e `Validators.requiredTrue`. A descrição é obrigatória. |
| Mensagens e envio | Referências a `ngModel` permitem consultar `invalid`, `touched`, `dirty` e `errors` para exibir mensagens de nome e e-mail. O `ngSubmit` passa o `NgForm` ao método de envio. | O template consulta o controle de nome e seus estados para exibir mensagens. O `ngSubmit` chama o método que lê o valor do grupo. |

#### Desafio prático — Formulário legado

A equipe de suporte usa um formulário legado para abrir chamados. Investigue o código do componente `desafio-formulario-legado`, identifique os problemas e refatore o formulário como parte da atividade em aula.

## Acompanhar a evolução pelas aulas

Os commits em `main` identificam a aula e resumem o conteúdo acrescentado. Liste o histórico da branch e use o identificador do commit para examinar as alterações daquela etapa.

```bash
git log --first-parent --oneline main
git show 1c30c99
git show 3ba465c
```

O primeiro `git show` apresenta os exemplos de Control Flow e Data Binding da Aula 02. O segundo mostra a estrutura inicial dos formulários da Aula 03.
