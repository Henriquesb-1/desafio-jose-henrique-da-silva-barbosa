import Utils from "./utils";

export default class ProcessarPagamento {
    #valor;

    constructor(valor) {
        this.#valor = valor;
    }

    pagarEmDinheiro() {
        const desconto = 5 / 100; //5%
        const valorFinal = this.#valor - (this.#valor * (desconto));
        return Utils.arrumarERetornarValor(valorFinal);
    }
    
    //Aqui viria a lógica de conexão com a api de pagamento no cartão...
    pagarNoCredito() {
        const acrescimo = 3 / 100; //3%
        const valorFinal = this.#valor + (this.#valor * (acrescimo));
        return Utils.arrumarERetornarValor(valorFinal);
    }

    pagarNoDebito() {
        return Utils.arrumarERetornarValor(this.#valor);
    }
}