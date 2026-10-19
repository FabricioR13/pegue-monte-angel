# Angel Pegue e Monte — catálogo de kits de festa

Catálogo online com reserva por data, sacolinha, envio do pedido pelo WhatsApp e painel
para a dona. Mesma base dos catálogos anteriores (Next.js), adaptada para kits de decoração
pegue e monte.

## Como abrir

Há três jeitos, do mais simples ao definitivo:

### 1. Só ver funcionando — `Demonstracao.html`
Dê dois cliques. Abre no navegador com o catálogo, a sacolinha e o painel funcionando
(o link do painel fica na faixa escura do topo; senha `angel2026`).
É uma **demonstração**: os pedidos ficam guardados só naquele navegador, então ela serve
para mostrar e testar, não para receber pedidos de clientes de verdade.

Para enviar por link, publique o `index.html` (é a mesma página), por exemplo no
GitHub Pages. Depois de mudar algo, rode `npm run demo` para gerar os dois arquivos de novo.

### 2. Rodar o site no computador — `Iniciar catalogo.bat`
Dê dois cliques. Na primeira vez ele instala as dependências (precisa do
[Node.js](https://nodejs.org) versão LTS instalado e de internet) e depois abre
http://localhost:3000. Não precisa de banco de dados: os dados ficam no arquivo
`.dados/angel-pegue-e-monte.json` (apague a pasta `.dados` para recomeçar do zero).

Pelo terminal é o mesmo que `npm install` e depois `npm run dev`.

> A pasta está dentro do OneDrive. A instalação cria milhares de arquivos em `node_modules`
> e o OneDrive pode deixar tudo lento ou travar a instalação. Se acontecer, copie a pasta
> para fora do OneDrive (por exemplo `C:\projetos\angel`) e rode de lá.

### 3. Publicar para os clientes
Em uma hospedagem (Vercel, por exemplo), configure a variável `DATABASE_URL` com um banco
PostgreSQL (Neon e Supabase têm plano gratuito) e, de preferência, `ADMIN_PASSWORD` e
`ADMIN_SECRET` — veja `.env.example`. As tabelas e os dados iniciais são criados sozinhos no
primeiro acesso. Publicado é que a reserva de um cliente passa a bloquear a data para todos
os outros.

## O que o cliente vê

1. **Escolhe as datas** de retirada (ou entrega) e de devolução antes de tudo.
2. O catálogo mostra o que está livre. Kit ou item já alugado naquele período aparece como
   **Reservado nesta data**, com o valor da diária, e não pode ser selecionado.
3. Na **sacolinha**: itens, datas, retirada (padrão, sem frete — com a dica de vir com o carro
   vazio) ou entrega com o frete da cidade, horário previsto de retirada/entrega e de
   devolução, opção **Selecionar horários** (o pedido sai marcado como "horário a
   confirmar"), total e o **sinal de 50%** para garantir a reserva.
4. Preenche nome, WhatsApp e endereço (se for entrega), escolhe a forma de pagamento (Pix,
   dinheiro, cartão de crédito ou débito) e toca em **Finalizar pelo WhatsApp**: o pedido é
   gravado e o cliente é levado ao WhatsApp da Angel com a mensagem pronta. Nada é pago no
   site; o pagamento e o sinal são combinados no WhatsApp.

## Painel — `/admin`

Senha inicial: `angel2026` (ou a que estiver em `ADMIN_PASSWORD`). **Troque em
Configurações > Senha do painel.**

- **Resumo**: entradas, saídas e saldo do mês, valor a receber, próximas retiradas.
- **Reservas**: lista e calendário; mudar situação (pendente, confirmado, entregue,
  devolvido, cancelado), dar desconto, ajustar horários, registrar pagamento (vira uma
  entrada no financeiro) e cadastrar **reserva manual** (combinada pelo direct ou WhatsApp).
- **Kits e valores**: valor da diária, quantidade de cada item (o estoque), fotos, brinde,
  ocultar do catálogo, criar kits, adicionais e mini festas.
- **Entradas e saídas**: lançamentos por mês.
- **Configurações**: WhatsApp que recebe os pedidos, horários padrão, endereço de retirada,
  % do sinal, cidades com entrega e frete de cada uma.

## Regras importantes

- **Valor = diária × número de dias.** Retirada e devolução no mesmo dia = 1 diária;
  retirada no sábado e devolução no domingo = 2 diárias.
- **Um pedido novo ("pendente") já segura a data.** Se o cliente não confirmar no WhatsApp,
  cancele a reserva no painel para liberar o kit.
- **Mini festa ocupa os itens que a formam.** Alugou a "Mini festa Oh Baby"? O kit Oh Baby,
  o urso gigante e um arranjo de balões ficam reservados naquela data. Itens com mais de uma
  unidade (balões, cômodas, mesas…) continuam disponíveis até acabar a quantidade.
- **Só retirada?** No Instagram a Angel trabalha com retirada e devolução no endereço dela.
  Para tirar a opção de entrega do catálogo, desmarque "Atendendo" em todas as cidades em
  Configurações.

## Para revisar com a Angel

- "Kits a partir de R$ 99" veio do Instagram. Os demais valores (kits, adicionais, mini
  festas) e os **fretes por cidade** são sugestões: ajuste no painel.
- O WhatsApp cadastrado é o do perfil: (51) 98139-1639. O endereço de retirada ficou em
  branco ("combinado pelo WhatsApp") — preencha em Configurações.
- As fotos dos kits foram recortadas dos prints do Instagram (baixa resolução); os adicionais
  estão sem foto. Dá para trocar e incluir fotos pelo painel, em Kits e valores > Editar.
- Os prints originais continuam na pasta; não são usados pelo site.

## Onde fica cada coisa

- `src/components/CatalogApp.tsx` — catálogo, datas e sacolinha
- `src/components/AdminPanel.tsx` — painel
- `src/lib/availability.ts` — regra de disponibilidade por data (inclui mini festas)
- `src/lib/whatsapp.ts` — texto da mensagem enviada ao WhatsApp
- `src/db/seed.ts` — kits, valores, cidades, fretes e configurações iniciais
- `src/db/queries.ts` — regras do negócio; `src/db/store-*.ts` — onde os dados ficam
  (PostgreSQL ou arquivo local); `src/app/api/` — rotas
- `src/app/globals.css` — cores e visual (degradê rosa, lilás e azul do logo)
- `public/kits/` e `public/logo.jpg` — fotos e logo
- `scripts/demonstracao/` — gera o `Demonstracao.html` e o `index.html` com `npm run demo`

## Como foi testado

Catálogo, sacolinha, envio ao WhatsApp e painel foram testados de ponta a ponta em navegador
(celular e desktop), com PostgreSQL, com o arquivo local e na demonstração de arquivo único —
incluindo simulação de celular mais antigo. Não foi possível rodar aqui o `npm install`/`next
dev` nem o `Iniciar catalogo.bat` (ambiente sem Windows e sem acesso ao npm); na primeira vez
que ligar o site, confira se tudo abre normalmente.
