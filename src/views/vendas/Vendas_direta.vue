<template>
  <v-app>
    <div
      class="containerVendas"
      @keyup.esc="sair"
      >
      <main class="main">
        <div class="filtro">
          <div class="descricao">
            <label class="label">Descrição do produto</label>
            <div class="descricaoInput">
              <v-autocomplete
                v-model="filtro.item"
                :items="produtosNome"
                class="name"
                hide-details
                background-color="#fff"
                clearable
                dense
                filled
                label="Produto"
              ></v-autocomplete>
              <!-- <input type="text" class="input" v-model="filtro.item"> -->
              <button class="button" @click="completarFiltro">
                <v-icon>mdi-magnify</v-icon>
              </button>
            </div>
          </div>
          <div class="infoProd" @keyup.tab="completarFiltro">
            <div>
              <label>Código</label>
              <input type="text" class="input" v-model="filtro.codigo">
            </div>
            <div>
              <label>Quantidade</label>
              <input type="text" class="input" v-model="produto.quantidade">
            </div>
            <div>
              <label>Valor Unitário</label>
              <input type="text" class="input" disabled v-model="produto.valor_unit">
            </div>
            <div>
              <label>Valor Total</label>
              <input type="text" class="input" disabled v-model="produto.total">
            </div>
            <button class="button btn" @click="buscarProduto">Inserir</button>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="tableItem">
          <Tabela
            :headers="headers"
            :dados="items"
            @editar="abrirModal"
            @deletar="abrirModal"
            class="table"
          >
          </Tabela>
        </div>
        <div class="informacoes" ref="rodape">
          <ul>
            <li class="rodape-item">
              Itens: {{rodape.qtdItens}}
            </li>
            <li class="rodape-item">SubTotal:R$ {{rodape.subTotal}}</li>
            <li class="rodape-item">Desconto:R$ {{rodape.desconto}}</li>
            <li class="total">Total: R$ {{rodape.valorTotal}}</li>
          </ul>
        </div>
        <!-- <button class="button">Finalizar</button> -->
      </main>
      <div class="modalVendas" v-show="modalFinalizarVenda" >
        <ModalConfirma
          @fechar="finalizarVendaModal"
          @editVenda="editVenda"
          @deletarVenda="deletarVenda"
          @sim="finalizarVenda"
          :showModal="acoesModal"
        />
      </div>
      <div class="formaPagamento">
        <div class="pagamentoOpcoes">
          <v-form class="opcoesPagamento" @submit="prevenirEvento">
            <div class="field">
              <label class="label">Forma de pagamento</label>
              <div class="control">
                <div class="select">
                  <select v-model="pagamento.formaPagamento">
                    <option
                      v-for="item in opcoesPagamento"
                      :key="item"
                    >
                      {{item}}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label">Valor</label>
              <div class="control">
                <input type="text" class="input" placeholder="R$ 0,00" v-model="pagamento.valor" />
              </div>
            </div>
            <div class="btnIncluir">
              <button class="button" @click="incluirPagamento">Incluir</button>
            </div>
          </v-form>
          <div class="field desconto">
            <label>Desconto:</label>
            <div class="select">
              <select v-model.trim="descontoOperacao">
                <option>
                  R$
                </option>
                <option>
                  %
                </option>
              </select>
            </div>
            <input type="text" class="input" v-model="produto.desconto" placeholder="R$ 0,00">
            <button class="button" @click="incluirDesconto"><v-icon>mdi-plus-thick</v-icon></button>
          </div>
          <v-divider></v-divider>
          <div class="demonstrativo">
            <!-- <v-data-table
              :headers="headersPagamento"
              :items="tablePagamento"
              class="tabelaPagamento"
              disable-sort
              hide-default-footer
            /> -->
            <v-simple-table class="tabelaPagamento">
              <thead>
                <tr>
                  <th class="text-left">
                    Tipo de Pagamento
                  </th>
                  <th class="text-left">
                    Valor
                  </th>
                  <th class="text-left">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in tablePagamento"
                  :key="item"
                >
                  <td>{{item.formaPagamento}}</td>
                  <td>{{item.valor}}</td>
                  <td>
                    <v-icon
                      class="acao-icon icon"
                      @click="deletarPagamento(item)"
                      color="#228B22"
                    >
                      mdi-delete
                    </v-icon>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
            <div>
              <div class="valores">
                <div class="vizualizarValores">
                  <span>Valor pago</span>
                  {{rodape.valorPago}}
                  <v-divider
                  vertical
                  ></v-divider>
                </div>
                <div class="vizualizarValores valortotal">
                  <span>Total</span>
                  {{rodape.valorTotal}}
                </div>
                <div class="vizualizarValores troco">
                  <v-divider class="divider troco"></v-divider>
                  <span>Troco</span>
                  {{rodape.troco}}
                </div>
              </div>
            </div>

          </div>
        </div>
          <img src="../img/image 1.png" alt="">
        <div class="comandos" >
          <div>
            <button class="button" @click="modalFinalizarVenda = true">Finalizar (F1)</button>
            <button class="button">PV (F2)</button>
            <button class="button">Consultar Vendas</button>
            <button class="button">Cancelar Vendas (F9)</button>
            <button class="button">Cancelar Item (F7)</button>
            <button class="button">Tela Cheia (F11)</button>
            <button class="button">Troca(F4)</button>
            <button class="button" @click="sair">Sair (ESC)</button>
          </div>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ModalConfirma from '@/components/ModalConfirma.vue'
import Tabela from '@/components/Tabela.vue'
export default {
  name: 'theVendasDireta',
  components: {
    ModalConfirma,
    Tabela
  },
  data () {
    return {
      headers: [
        {
          text: 'Código',
          value: 'codigo'
        },
        {
          text: 'Produtos',
          align: 'start',
          sortable: false,
          value: 'item'
        },
        { text: 'QTD', value: 'quantidade' },
        { text: 'Valor Unit', value: 'valor_unit' },
        { text: 'Valor Total', value: 'total' }
      ],
      headersPagamento: [
        {
          text: 'Forma de pagamento',
          value: 'formaPagamento'
        },
        {
          text: 'Valor',
          value: 'valor'
        }
      ],
      items: [],
      filtro: {
        codigo: null,
        item: ''
      },
      descontoOperacao: '',
      produto: {
        codigo: null,
        item: '',
        quantidade: null,
        valor_unit: 0,
        desconto: null,
        total: null
      },
      produtosNome: [],
      modalFinalizarVenda: false,
      rodape: {
        qtdItens: 0,
        subTotal: 0,
        desconto: 0,
        valorTotal: 0,
        valorPago: 0,
        troco: 0
      },
      opcoesPagamento: ['Cartão Débito', 'Cartão Crédito', 'Dinheiro'],
      pagamento: {
        formaPagamento: '',
        valor: null
      },
      acoesModal: {},
      tablePagamento: [],
      venda: {
        numeroVenda: null,
        items: [],
        cartao_debito: null,
        cartao_credito: null,
        dinheiro: null,
        desconto: null,
        valorTotal: null
      }
    }
  },
  async created () {
    await this.listar()
    this.listProd()
  },
  computed: {
    ...mapState('produtos', ['produtos'])
  },
  methods: {
    ...mapActions('produtos', ['listar']),

    async buscarProduto () {
      try {
        const filtro = this.filtro.codigo === null && this.filtro.item === '' ? null : this.filtro

        console.log(filtro)
        if (filtro !== null) {
          const result = await this.listar(filtro)
          console.log(result)
          if (result) {
            const itemsProd = {
              codigo: result.codigo,
              item: result.descricao,
              quantidade: this.produto.quantidade,
              valor_unit: result.preco_venda,
              desconto: this.produto.desconto,
              total: result.preco_venda * this.produto.quantidade
            }

            this.items.push(itemsProd)
            this.filtro.codigo = null
            this.filtro.item = ''
            this.produto.quantidade = null
            this.produto.valor_unit = 0
            this.produto.total = 0

            this.rodape.qtdItens = this.items.length
            this.rodape.desconto = itemsProd.desconto
            this.rodape.subTotal += itemsProd.total
            this.rodape.valorTotal = this.rodape.subTotal - this.rodape.desconto
          }
        }
      } catch (error) {
        console.error(error)
      }
    },

    listProd () {
      this.produtosNome = this.produtos
    },
    async completarFiltro () {
      try {
        const result = await this.listar(this.filtro)

        if (this.filtro.codigo === null) {
          this.filtro.codigo = result.codigo
        }
        this.produto.valor_unit = result.preco_venda
        this.produto.total = result.preco_venda * this.produto.quantidade
      } catch (error) {
        console.error(error)
      }
    },
    sair () {
      this.$router.push('/')
      console.log('ativo')
    },
    incluirPagamento () {
      const itemPagamento = {}

      Object.assign(itemPagamento, this.pagamento)
      this.tablePagamento.push(itemPagamento)

      const valorTabelaPagamento = this.tablePagamento.reduce((acumulador, valorAtual) => acumulador + Number(valorAtual.valor), 0)

      this.rodape.valorPago = valorTabelaPagamento
      this.pagamento.valor = null
      this.pagamento.formaPagamento = ''

      this.rodape.troco = this.rodape.valorPago - this.rodape.valorTotal
    },
    incluirDesconto () {
      const descontoPercentual = this.produto.desconto / 100 * this.rodape.valorTotal
      this.rodape.desconto = this.descontoOperacao === '%' ? descontoPercentual : this.produto.desconto
      console.log(this.rodape.desconto)

      this.rodape.valorTotal = this.rodape.subTotal - this.rodape.desconto
      this.rodape.troco = this.rodape.valorPago - this.rodape.valorTotal
    },
    deletarPagamento (item) {
      const newTablePagamento = this.tablePagamento.filter(pagamento => pagamento !== item)
      this.tablePagamento = newTablePagamento

      this.rodape.valorPago -= item.valor
      this.rodape.troco = this.rodape.valorPago - this.rodape.valorTotal
      console.log(newTablePagamento)
    },
    finalizarVenda () {
      const valorDebito = this.tablePagamento.reduce((acumulador, item) => {
        const debito = item.formaPagamento === 'Cartão Débito' ? acumulador + Number(item.valor) : acumulador
        return debito
      }, 0)
      const valorCredito = this.tablePagamento.reduce((acumulador, item) => {
        const debito = item.formaPagamento === 'Cartão Crédito' ? acumulador + Number(item.valor) : acumulador
        return debito
      }, 0)
      const valorDinheiro = this.tablePagamento.reduce((acumulador, item) => {
        const debito = item.formaPagamento === 'Dinheiro' ? acumulador + Number(item.valor) : acumulador
        return debito
      }, 0)

      const venda = {
        numeroVenda: null,
        items: this.items,
        cartao_debito: valorDebito,
        cartao_credito: valorCredito,
        dinheiro: valorDinheiro,
        desconto: this.rodape.desconto,
        valorTotal: this.rodape.valorTotal,
        troco: this.rodape.troco
      }

      console.log(venda)
      this.modalFinalizarVenda = false
    },
    finalizarVendaModal () {
      this.modalFinalizarVenda = false
      this.acoesModal.editar = false
      this.acoesModal.deletar = false

      this.acoesModal = {}
    },
    prevenirEvento (e) {
      e.preventDefault()
    },
    abrirModal (event) {
      this.modalFinalizarVenda = true
      console.log(event)
      this.acoesModal = event
    },
    editVenda (event) {
      this.modalFinalizarVenda = true
      console.log(event, event.nomeProduto)
      this.items.forEach(item => {
        if (event.nomeProduto === item.item) {
          item.quantidade = event.quantidade
          item.total = item.quantidade * item.valor_unit
        }
      })
      const valorTotal = this.items.reduce((acumulador, item) => {
        return acumulador + item.total
      }, 0)

      this.rodape.subTotal = valorTotal
      this.rodape.valorTotal = valorTotal - this.rodape.desconto
      console.log(valorTotal)

      this.finalizarVendaModal()
    },
    deletarVenda (event) {
      this.modalFinalizarVenda = true
      console.log(event)
      const newItem = this.items.filter(item => item.item !== event.nomeProduto)
      this.items = newItem
      const valorTotal = this.items.reduce((acumulador, item) => {
        return acumulador + item.total
      }, 0)

      this.rodape.subTotal = valorTotal
      this.rodape.valorTotal = valorTotal - this.rodape.desconto
      console.log(valorTotal)

      this.finalizarVendaModal()
    }
  }
}
</script>

<style scoped>
  .containerVendas{
    margin: 20px auto;
    height: 100vh;
    /* border: 1px solid; */
    width: 99%;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 550px;
  }
  .modalVendas{
    position: absolute;
    width: 100%;
    height: 100%;
    /* background: #000;
    color: #ffffff; */
    /* opacity: 0.8; */
    z-index: 41;
  }
  .filtro{
    display: grid;
    margin: 0 auto;
    /* justify-content: center; */
    /* border: 1px solid; */
    max-width: 100%;
    gap: 20px;
  }
  .descricao{
    display: grid;
    border: 1px solid;
    text-align: center;
  }

  .descricaoInput{
    display: flex;
    gap: 20px;
  }

  .infoProd {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .btn{
    align-self: end;
    background: #228B22;
    color: #ffffff;
  }

  .main {
    width: 90%;
    justify-self: center;
    margin-top: 0px;
    /* border: 1px solid; */
  }

  .tableItem {
    width: 100%;
    height: 340px;
    overflow-y: scroll;
    border: 1px solid;
  }

  .table {
    width: 100%;
  }

  .editarTable {
    /* position: absolute;
    top: 320px;
    right: 640px; */
    width: 120px;
    box-shadow: 0px 0px 2px 1px #000;
    z-index: 500;
  }
  /* .editarTable ul {
    display: flex;
    width: 100%;
    width: 120px;
    flex-wrap: wrap;
    justify-items: center;
    gap: 10px;
  }
  .editarTable ul li {
    display: flex;
    width: 120px !important;
    gap: 6px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .editarTable ul li:hover{
    background: #d5d5d5;
  } */
  .informacoes {
    margin: 50px auto;
  }
  .informacoes ul{
    display: flex;
    border: 1px solid;
    width: 100%;
    margin: 0 auto;
    align-items: center;
    gap: 10px;
    font-family: 'Roboto', sans-serif;
    font-size: 1.1rem;
  }
   .name {
    border: 1px solid;
  }
  .rodape-item {
    /* border: 1px solid; */
    text-align: center;
    width: 25%;
  }

  .total {
    text-align: center;
    font-size: 1.6rem;
    background: #228B22;
    color: #ffffff;
    font-weight: 500;
    width: 35%;
  }

  .formaPagamento{
    display: grid;
    /* border: 1px solid; */
  }
  .desconto{
    display: flex;
    margin-left: 10px;
    align-items: center;
    font-family: 'Roboto', sans-serif;
    font-size: 1.1rem;
    gap: 15px;
    width: 90%;
  }
  img{
    max-width: 18%;
    justify-self: center;
    align-self: center;
  }
  .pagamentoOpcoes{
    box-shadow: 0px 0px 3px 0px #000;
  }
  .comandos{
    display: flex;
    /* flex-wrap: wrap; */
    justify-content: center;
    align-items: start;
  }

  .comandos button {
    width: 25%;
    font-size: .890rem;
    font-weight: 500;
    background: #228B22;
    color: #ffffff;
  }
  .opcoesPagamento{
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 30px;
    margin: 30px auto 20px 10px;
    /* border: 1px solid; */
  }
  .demonstrativo{
    display: grid;
    grid-template-columns: 250px 1fr;
    margin: 30px auto 20px 10px;
  }
  .tabelaPagamento{
    border: 1px solid;
  }
  .valores{
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 1.4rem;
    flex-wrap: wrap;
    /* border: 1px solid; */
    gap: 20px;
  }

  .vizualizarValores{
    display: grid;
    text-align: center;
    gap: 4px;
  }
  .valortotal{
    grid-column: 2;
    grid-row: 1;
  }

  .troco {
    grid-column: 1 / -1;
  }
</style>
