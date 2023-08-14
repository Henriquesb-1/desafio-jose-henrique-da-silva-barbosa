import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

describe('CaixaDaLanchonete', () => {

    const validaTeste = (formaDePagamento, resultadoEsperado, itens) => {
        const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra(formaDePagamento, itens);

        expect(resultado.replace("\xa0", " ")).toEqual(resultadoEsperado);
    };

    test.each([
        ['com carrinho vazio', 'dinheiro', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'credito', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'debito', 'Não há itens no carrinho de compra!', []],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['dinheiro', 'R$ 2,85', ['cafe,1']],
        ['credito', 'R$ 3,09', ['cafe,1']],
        ['debito', 'R$ 3,00', ['cafe,1']],
        ['debito', 'R$ 2,00', ['salgado,1']],
    ])('compra simples em %p deve resultar em %p', validaTeste);

    test.each([
        ['credito', 'R$ 11,85', ['cafe,1', 'sanduiche,1', 'queijo,1']],
        ['debito', 'R$ 11,50', ['cafe,1', 'sanduiche,1', 'queijo,1']],
    ])('compra de 3 itens em %p deve resultar em %p', validaTeste);

    test.each([
        ['dinheiro', 'R$ 14,72', ['cafe,1', 'sanduiche,1', 'queijo,3']],
        ['credito', 'R$ 15,96', ['cafe,1', 'sanduiche,1', 'queijo,3']],
        ['debito', 'R$ 15,50', ['cafe,1', 'sanduiche,1', 'queijo,3']]
    ])('mais de um item extra com apenas um principal', (formaDePagamento, resultadoEsperado, itens) => {
        validaTeste(formaDePagamento, resultadoEsperado, itens)
    });

    test.each([
        ['dinheiro', 'R$ 10,93', ['salgado,2', 'cafe,1', 'chantily,3']],
        ['credito', 'R$ 11,85', ['salgado,2', 'cafe,1', 'chantily,3']],
        ['debito', 'R$ 11,50', ['salgado,2', 'cafe,1', 'chantily,3']]
    ])('mais de um item extra com apenas um principal', (formaDePagamento, resultadoEsperado, itens) => {
        validaTeste(formaDePagamento, resultadoEsperado, itens)
    });

    test.each([
        ['dinheiro', 'R$ 33,73', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['credito', 'R$ 36,56', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['debito', 'R$ 35,50', ['cafe,4', 'sanduiche,3', 'queijo,2']],
    ])('compra de múltiplas quantidades em %p deve resultar em %p', validaTeste);

    test.each([
        ['com quantidade zero', 'dinheiro', 'Quantidade inválida!', ['cafe,0']],
        ['com um valor', 'credito', 'Item inválido!', [' "", 1']],
        ['com código inexistente', 'debito', 'Item inválido!', ['pizza, 1']],
        ['com forma de pagamento inválida', 'especie', 'Forma de pagamento inválida!', ['cafe, 1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['chantily', 'dinheiro', 'Item extra não pode ser pedido sem o principal', ['chantily,1']],
        ['queijo', 'credito', 'Item extra não pode ser pedido sem o principal', ['queijo,1']],
        ['chantily com outro item', 'credito', 'Item extra não pode ser pedido sem o principal', ['chantily,1', 'sanduiche,1']],
        ['queijo com outro item', 'debito', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['combo1', 'dinheiro', 'R$ 9,03', ['combo1, 1']],
        ['combo1', 'credito', 'R$ 9,79', ['combo1, 1']],
        ['combo1', 'debito', 'R$ 9,50', ['combo1, 1']],
        ['combo2', 'dinheiro', 'R$ 7,13', ['combo2, 1']],
        ['combo2', 'credito', 'R$ 7,72', ['combo2, 1']],
        ['combo2', 'debito', 'R$ 7,50', ['combo2, 1']],
    ])('compra do %p em %p deve resultar em %p,', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    test.each([
        ['combo3', 'dinheiro', 'Item extra não pode ser pedido sem o principal', ['combo3, 1']],
        ['combo4', 'credito', 'Item extra não pode ser pedido sem o principal', ['combo4, 2']]
    ])('item do %p comprado em %p não pode ter item extra se o item principal não estiver incluso no combo', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));
});
