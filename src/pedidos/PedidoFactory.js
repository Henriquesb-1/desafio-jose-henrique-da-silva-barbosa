import Combo from "./Combo";
import Pedido from "./Pedido";

export default function PedidoFactory(codigo) {
    switch (codigo) {
        case "cafe":
            return new Pedido(codigo, "Café", 3.00);

        case "suco":
            return new Pedido(codigo, "Suco Natural", 6.20);

        case "sanduiche":
            return new Pedido(codigo, "Sanduíche", 6.50);

        case "salgado":
            return new Pedido(codigo, "Salgado", 2.00);

        case "queijo":
            return new Pedido(codigo, "Queijo (extra do Sanduíche)", 2.00, true, "sanduiche");

        case "chantily":
            return new Pedido(codigo, "Chantily (extra do Café)", 1.50, true, "cafe");

        case "combo1":
            return new Combo()
                .adicionarPedido("suco")
                .adicionarPedido("sanduiche")
                .adicionarValorFixo(9.50);

        case "combo2":
            return new Combo()
                .adicionarPedido("cafe")
                .adicionarPedido("sanduiche")
                .adicionarValorFixo(7.50);

        case "combo3":
            //simulando um erro de um item extra sem um item principal em um combo para testar o código...
            return new Combo()
                .adicionarPedido("cafe")
                .adicionarPedido("queijo");

        case "combo4":
            //simulando um erro de um item extra sem um item principal em um combo para testar o código...
            return new Combo()
                .adicionarPedido("sanduiche")
                .adicionarPedido("chantily");

        default:
            throw new Error("Item inválido!");
    }
}