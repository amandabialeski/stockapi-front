# Cola / Guia Rápido de Código pro Wagner

Montei essa cola pra te ajudar na hora da apresentação. Wagner de programação quase nunca quer que você fique dando volta nem recitando teoria de livro. Na prática, ele vai bater o olho no código, apontar o dedo pra uma linha e perguntar: *"o que isso aqui faz?"* ou *"por que você usou isso aqui?"*.

Se você responder em uma frase curta, firme e com o termo certo, ele já vê que você entende o que tá no código e parte pra próxima. 

Aqui tá separado por categorias, **só com o que a gente realmente usou no projeto**.

---

## 1. Tags de Tabela (HTML)

| O que tá no código | O que falar pro Wagner (direto e reto) |
| :--- | :--- |
| `<table>` | É a tag que cria a tabela. |
| `<thead>` | É o cabeçalho / cabeça da tabela (onde ficam os títulos das colunas). |
| `<tbody>` | É o corpo da tabela (onde ficam as linhas com os dados reais dos produtos/pedidos). |
| `<tr>` | É uma linha da tabela (*Table Row*). Cada item da lista vira um `<tr>`. |
| `<th>` | É a célula de título do cabeçalho (*Table Header*). Já vem em negrito por padrão. |
| `<td>` | É a célula de dados comum (*Table Data*). É onde fica o ID, nome, preço, etc. |
| `data-label="..."` | É um atributo customizado que a gente colocou no `<td>`. Serve pro nosso CSS responsivo pegar o nome da coluna e mostrar na tela do celular quando a tabela vira cards. |

> **Dica se ele perguntar da tabela no celular:** Fala que no desktop a tabela usa `thead` e `tbody` normais, mas no celular (até 768px) a gente escondeu o `thead` com CSS e fez cada linha `<tr>` virar um bloco, usando o `data-label` pra mostrar o nome do campo.

---

## 2. Coisas do React e Next.js

| O que tá no código | O que falar pro Wagner |
| :--- | :--- |
| `"use client"` | Avisa o Next.js que esse componente roda no navegador do usuário (no cliente), e não no servidor. Precisa colocar isso em qualquer tela que use botões, cliques ou hooks como `useState` e `useEffect`. |
| `useState(...)` | É o hook do React que guarda dados na memória do componente. Toda vez que o valor dele muda, o React atualiza a tela sozinho. |
| `useEffect(...)` | É o hook que executa uma função automaticamente assim que a página carrega. Usamos ele pra disparar a busca dos dados na API logo que o usuário abre a tela. |
| `useRouter()` | É o hook do Next.js pra navegar entre páginas via código. A gente usa o `router.push("/pedidos")` pra redirecionar o usuário pra lista de pedidos logo depois que ele clica em salvar. |
| `<Link href="...">` | É o link do próprio Next.js. A diferença dele pro `<a>` normal é que ele troca de página instantaneamente sem recarregar o navegador todo do zero. |
| `children` | É uma propriedade especial do React no `layout.js`. Ela representa o conteúdo da página atual que vai ser encaixado bem no meio do cabeçalho (`Header`) e do rodapé (`Footer`). |
| `key={...}` | É um identificador único que o React **obriga** a colocar quando a gente faz uma lista (`.map`). Serve pro React saber exatamente qual item mudou sem se perder e sem renderizar tudo de novo. |

---

## 3. Os Hooks na Prática (como explicar)

Se o Wagner perguntar: *"Explica esse useState e esse useEffect aqui"*:

### `useState`
- **Exemplo no código:** `const [pedidos, setPedidos] = useState([]);`
- **Como explicar:** *"O `pedidos` é a variável onde estão guardados os dados, e o `setPedidos` é a função que a gente usa pra atualizar esses dados. A gente nunca muda o `pedidos` diretamente; sempre chama o `setPedidos(...)` porque aí o React já sabe que mudou e atualiza a tabela na tela sozinho."*
- **O que a gente guardou em state no projeto:**
  - As listas que vêm da API (`pedidos`, `clientes`, `produtos`, `categorias`).
  - O estado da tela (`carregando` pra saber se mostra a mensagem de espera ou a tabela, e `erro` pra mostrar alerta vermelho se a API cair).
  - Os campos que o usuário tá preenchendo no formulário (`clienteId`, `produtoId`, `quantidade`).
  - O carrinho provisório do pedido (`itens`).
  - O controle do menu mobile (`aberto` no Header).

### `useEffect`
- **Exemplo no código:** `useEffect(() => { carregarDados(); }, []);`
- **Como explicar:** *"Ele roda a função de buscar na API assim que a página é montada. Aquele `[]` (colchetes vazios) no final é a lista de dependências; com ele vazio, o React só roda isso uma única vez, quando a página abre. Se não colocasse o `[]`, ele ia ficar rodando em loop infinito."*

---

## 4. Métodos de Array e JavaScript (onde Wagner adora pegar no pé)

| Método | O que é e o que falar pro Wagner | Onde a gente usou |
| :--- | :--- | :--- |
| `.map()` | Percorre um array e transforma cada item num elemento visual (JSX). | Em todas as tabelas e nos `<select>`, pra transformar cada produto/pedido numa linha `<tr>` ou numa `<option>`. |
| `.find()` | Procura na lista e devolve o **primeiro item** que bater com a condição. | Na listagem de pedidos e produtos, pra achar o nome do cliente pelo `cliente_id` ou o nome da categoria pelo `categoria_id`. |
| `.filter()` | Filtra o array e devolve uma nova lista só com quem passou no teste. | Para pegar só os itens pertencentes àquele pedido específico (`item.pedido_id === pedido.id`), e no botão de "Remover" item do pedido. |
| `.reduce()` | Percorre a lista acumulando os valores pra gerar um resultado único no final. | Para calcular o valor total do pedido somando o subtotal de todos os itens adicionados. |
| `Array.isArray(...)` | Testa se o que veio da API é realmente uma lista antes de tentar dar `.map`. | No carregamento de dados da API. Se a API devolver um erro ou objeto em vez de lista, isso impede o código de quebrar. |
| `[...itens, novoItem]` | É o *Spread Operator* (`...`). Ele faz uma cópia de todos os itens que já estavam na lista e joga o novo item no final. | Na hora de adicionar um produto na lista do novo pedido sem apagar os que já foram adicionados antes. |
| `Number(...)` | Converte um texto ou valor pra número de verdade. | Em campos como quantidade e IDs, pra garantir que o JavaScript faça conta matemática em vez de juntar textos. |
| `.toFixed(2)` | Formata um número para ter exatamente 2 casas decimais. | Nos preços e totais (ex: `19.9` vira `19.90`), padrão de valor em reais. |
| `new Date(...).toLocaleString("pt-BR")` | Converte a data que vem do banco de dados (que vem em formato internacional/ISO) pro formato brasileiro com dia, mês, ano e hora. | Na coluna de data dos pedidos. |

---

## 5. Integração com a API (Fetch / Async / Await)

Se ele apontar pras funções que puxam dados da API:

| Comando | O que responder |
| :--- | :--- |
| `async` e `await` | *"Como a requisição na internet demora alguns milissegundos pra responder, a função é `async` e o `await` faz o código pausar e esperar a resposta da API chegar antes de continuar, sem travar o navegador do usuário."* |
| `fetch("https://...")` | É o comando padrão do JavaScript pra fazer chamadas HTTP na API (buscar ou enviar dados). |
| `Promise.all([...])` | *"Em vez de esperar carregar clientes, depois produtos, depois pedidos um por um, o `Promise.all` dispara todas as requisições juntas ao mesmo tempo em paralelo e só continua quando todas responderem. Isso deixa a página bem mais rápida."* |
| `try / catch / finally` | É o bloco de segurança: o código tenta rodar o que tá no `try`; se a API der erro ou a internet cair, cai no `catch` onde a gente grava o aviso na variável `erro`; e o `finally` roda de qualquer jeito no fim pra desativar o "Carregando...". |
| `method: "POST"` | Avisa a API que a gente não tá só consultando dados (que seria GET), mas sim enviando dados novos pra serem salvos no banco. |
| `headers: { "Content-Type": "application/json" }` | Avisa pro servidor que os dados que a gente tá enviando no corpo da requisição estão no formato JSON. |
| `JSON.stringify(...)` | Converte o objeto JavaScript num texto no formato JSON pra poder viajar pela rede até a API. |
| `res.json()` | Faz o processo inverso: pega a resposta em texto JSON que o servidor mandou e converte de volta pra objeto ou array do JavaScript. |
| `res.ok` | Checa se a API respondeu com código de sucesso (status HTTP na faixa dos 200). Se não tiver ok, a gente lança um erro pro `catch`. |

---

## 6. Tags de Formulário e Eventos

| O que tá no código | O que responder |
| :--- | :--- |
| `<select>` e `<option>` | O `<select>` é o menu suspenso (caixa de seleção) e cada `<option>` é uma opção dentro dele. Usamos pro usuário escolher o cliente e os produtos. |
| `<input type="number">` | Campo de entrada de dados que só aceita números (usamos pra quantidade de itens). |
| `onChange={(e) => ...}` | Evento que dispara imediatamente quando a pessoa digita algo no campo ou escolhe uma opção no `<select>`. |
| `e.target.value` | É o valor que o usuário acabou de digitar ou acabou de selecionar no campo naquele instante. |
| `e.preventDefault()` | Impede o navegador de recarregar a tela quando clica no botão do formulário (o comportamento padrão do HTML é recarregar a página ao submeter; isso cancela esse comportamento). |
| `disabled={salvando}` | Desativa o botão enquanto a requisição tá salvando o pedido na API. Isso impede que o usuário clique duas ou três vezes seguidas e envie pedidos duplicados por engano. |

---

## 7. Lógica de Tela (Condições que mostram ou escondem coisas)

| Código | Como explicar |
| :--- | :--- |
| `condicao ? (isso) : (aquilo)` | É o operador ternário (um `if/else` escrito direto no meio do HTML). Exemplo: se `carregando` for verdadeiro, mostra *"Carregando dados..."*, senão mostra a tabela com os dados. |
| `erro && <div className="...">` | É o operador lógico AND. Ele só mostra a caixa de mensagem de erro se a variável `erro` não estiver vazia. Se não tiver erro nenhum, ele simplesmente não desenha nada na tela. |

---

## Resumo em 3 frases pra decorar antes da apresentação:
1. *"O projeto consome a API do IFRO usando `fetch` com `async/await` dentro de `useEffect` pra carregar os dados assim que a tela abre."*
2. *"Todos os dados ficam salvos em variáveis com `useState`, e a gente usa métodos de array como `.map()` pra desenhar as tabelas e `.find()` e `.filter()` pra relacionar os itens aos pedidos e produtos."*
3. *"O layout é totalmente responsivo, adaptando o menu e transformando as tabelas em blocos verticais quando a tela tem até 768px."*
