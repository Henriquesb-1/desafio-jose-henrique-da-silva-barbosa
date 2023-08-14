import ProcessarPagamento from "./ProcessarPagamento";
import PedidoFactory from "./pedidos/PedidoFactory";
import Utils from "./utils";

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        try {
            if (itens.length === 0) {
                throw new Error("Não há itens no carrinho de compra!");
            } else {
                const pedidos = [];
                const quantidade = [];
                let isCombo = false;
                let valorFinal = 0;

                for (let item of itens) {
                    const [codigo, quantidadePedido] = item.split(",");
                    if (!quantidadePedido || quantidadePedido <= 0) throw new Error("Quantidade inválida!");

                    if (codigo.includes("combo")) isCombo = true;

                    //Caso o item seja inválido, o PedidoFactory irá lançar a exceção "Item inválido!"
                    pedidos.push(PedidoFactory(codigo));
                    quantidade.push(quantidadePedido);
                }

                if (isCombo) {
                    let valorParcial = 0;

                    pedidos.forEach((combo, index) => {
                        combo.comboFinal.forEach(pedido => {
                            if (pedido.isAcompanhamento) {
                                if (!Utils.principalEstaIncluso(combo.comboFinal, pedido)) throw new Error("Item extra não pode ser pedido sem o principal");
                            }

                            if (combo.temValorFixo) {
                                valorFinal = combo.valorFixo * quantidade[index];
                            } else {
                                valorParcial += pedido.valor;
                                valorFinal = (valorParcial - (valorParcial * (15 / 100))) * quantidade[index];//Desconto de 15% no combo se o valor fixo não estiver definido;
                            }
                        })
                    })
                } else {
                    pedidos.forEach((pedido, index) => {
                        if (pedido.isAcompanhamento) {
                            if (!Utils.principalEstaIncluso(pedidos, pedido)) throw new Error("Item extra não pode ser pedido sem o principal");
                        }
                        valorFinal += pedido.valor * quantidade[index];
                    })
                }

                const pagamento = new ProcessarPagamento(valorFinal);

                switch (metodoDePagamento) {
                    case "dinheiro":
                        return pagamento.pagarEmDinheiro();
                    case "credito":
                        return pagamento.pagarNoCredito();
                    case "debito":
                        return pagamento.pagarNoDebito();
                    default:
                        return "Forma de pagamento inválida!";
                }
            }
        } catch (error) {
            return error.message;
        }
    }


}

export { CaixaDaLanchonete };
