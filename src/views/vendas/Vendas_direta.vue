<template>
  <v-app>
    <div class="containerVendas"  @keyup.esc="sair">
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
          <v-data-table
            :headers="headers"
            :items="items"
            disable-sort
            hide-default-footer
          />
        </div>
        <div class="informacoes" ref="rodape">
          <ul>
            <li>
              Itens: {{rodape.qtdItens}}
            </li>
            <li>SubTotal:R$ {{rodape.subTotal}}</li>
            <li>Desconto:R$ {{rodape.desconto}}</li>
            <li class="total">Total: R$ {{rodape.valorTotal}}</li>
          </ul>
        </div>
        <!-- <button class="button">Finalizar</button> -->
      </main>
      <div class="formaPagamento">
        <div class="pagamentoOpcoes">
          <v-form class="opcoesPagamento">
            <div class="field">
              <label class="label">Forma de pagamento</label>
              <div class="control">
                <div class="select">
                  <select>
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
                <input type="text" class="input" placeholder="R$ 0,00" />
              </div>
            </div>
            <div class="btnIncluir">
              <button class="button" @click="incluirPagamento">Incluir</button>
            </div>
          </v-form>
          <div class="demonstrativo">
            <v-simple-table class="tabelaPagamento">
              <thead>
                <tr>
                  <th class="text-left">
                    Tipo de Pagamento
                  </th>
                  <th class="text-left">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in tablePagamento"
                  :key="item"
                >
                  <td>{{item.formaPagamento}}</td>
                  <td>item.valor</td>
                </tr>
              </tbody>
            </v-simple-table>
            <div>
              <div class="field desconto">
                <label>Desconto:</label>
                <input type="text" class="input" v-model="produto.desconto" placeholder="R$ 0,00">
              </div>
              <v-divider></v-divider>
              <div class="valores">
                <div class="vizualizarValores">
                  <span>Valor pago</span>
                  {{pagamento.valor}}
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
                  0,00
                </div>
              </div>
            </div>

          </div>
        </div>

          <img src="../img/image 1.png" alt="">

        <div class="comandos" >
          <div>
            <button class="button">Finalizar (F1)</button>
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
export default {
  name: 'theVendasDireta',
  data () {
    return {
      headers: [
        {
          text: 'Código',
          value: 'codigo'
        },
        {
          text: 'Item',
          align: 'start',
          sortable: false,
          value: 'item'
        },
        { text: 'QTD', value: 'quantidade' },
        { text: 'Valor Unit', value: 'valor_unit' },
        { text: 'Desconto', value: 'desconto' },
        { text: 'Valor Total', value: 'total' }
      ],
      items: [],
      filtro: {
        codigo: null,
        item: ''
      },
      produto: {
        codigo: null,
        item: '',
        quantidade: null,
        valor_unit: 0,
        desconto: null,
        total: null
      },
      produtosNome: [],
      rodape: {
        qtdItens: 0,
        subTotal: 0,
        desconto: 0,
        valorTotal: 0,
        troco: 0
      },
      opcoesPagamento: ['Cartão Débito', 'Cartão Crédito', 'Dinheiro'],
      pagamento: {
        formaPagamento: '',
        valor: 0
      },
      tablePagamento: []
    }
  },
  async created () {
    await this.listar()
    this.listProd()
    console.log(this.produtos)
  },
  computed: {
    ...mapState('produtos', ['produtos'])
  },
  methods: {
    ...mapActions('produtos', ['listar']),

    async buscarProduto () {
      try {
        const result = await this.listar(this.filtro)
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
          this.produto.quantidade = null
          this.produto.valor_unit = 0
          this.produto.total = 0

          this.rodape.qtdItens = this.items.length
          this.rodape.subTotal += itemsProd.total
          this.rodape.valorTotal = this.rodape.subTotal - this.rodape.desconto
        }

        console.log(this.items)
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
      this.tablePagamento.push(this.pagamento)
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
    display: grid;
    grid-template-columns: 1fr 650px;
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
  .informacoes {
    margin: 50px auto;
  }
  .informacoes ul{
    display: flex;
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
  .informacoes ul li {
    /* border: 1px solid; */
    text-align: center;
    width: 25%;
  }

  .total {
    font-size: 1.6rem;
    background: #228B22;
    color: #ffffff;
    font-weight: 500;
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
    width: 50%;
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
    flex-wrap: wrap;
    justify-content: center;
    align-items: start;
  }

  .comandos button {
    width: 160px;
    font-size: 1rem;
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
