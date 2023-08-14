import PedidoFactory from "./PedidoFactory";

export default class Combo {
    #comboFinal = [];
    #temValorFixo = false;
    #valorFixo;

    get comboFinal() {
        return this.#comboFinal;
    }

    get valorFixo() {
        return this.#valorFixo;
    }

    get temValorFixo() {
        return this.#temValorFixo;
    }

    adicionarPedido(codigo) {
        this.#comboFinal.push(PedidoFactory(codigo));
        return this;
    }

    adicionarValorFixo(valorFixo) {
        this.#temValorFixo = true;
        this.#valorFixo = valorFixo;
        return this;
    }
}