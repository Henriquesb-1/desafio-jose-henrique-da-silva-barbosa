export default class Pedido {
    #codigo;
    #nome;
    #valor;

    #isAcompanhamento;
    #acompanha;

    constructor(codigo, nome, valor, isAcompanhamento = false, acompanha = "") {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#valor = valor;
        this.#isAcompanhamento = isAcompanhamento;
        this.#acompanha = acompanha;
    }

    get codigo() {
        return this.#codigo;
    }

    get nome() {
        return this.#nome;
    }

    get valor() {
        return this.#valor;
    }
    
    get isAcompanhamento() {
        return this.#isAcompanhamento;
    }
    
    get acompanha() {
        return this.#acompanha;
    }

}