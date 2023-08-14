export default class Utils {

    static arrumarERetornarValor(valor) {
        return `R$ ${valor.toFixed(2).replace(".", ",")}`
    }

    static principalEstaIncluso(pedidos, pedidoAtual) {
        for (let i = 0; i < pedidos.length; i++) {
            if (pedidos[i].codigo === pedidoAtual.acompanha) return true;
        }
        return false;
    }
}