<template>
  <div>
    <div class="containerVendas">
      <header class="filtro">
        <div class="descricao">
          <label class="label">Descrição do produto</label>
          <div class="descricaoInput">
            <input type="text" class="input" v-model="filtro.item">
            <v-icon>mdi-magnify</v-icon>
          </div>
        </div>
        <div class="infoProd" @keyup.tab="completarFiltro">
          <div>
            <label>Código</label>
            <input type="text" class="input" v-model="filtro.codigo">
          </div>
          <div>
            <label>Quantidade</label>
            <input type="text" class="input" v-model="produtos.quantidade">
          </div>
          <div>
            <label>Valor Unitário</label>
            <input type="text" class="input" disabled v-model="produtos.valor_unit">
          </div>
          <div>
            <label>Valor Total</label>
            <input type="text" class="input" v-model="produtos.total">
          </div>
          <button class="button btn" @click="buscarProduto">Inserir</button>
        </div>
      </header>
      <v-divider></v-divider>
      <main class="main">
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
              Itens: {{qtdItens}}
            </li>
            <li>SubTotal:R$ {{subTotal}}</li>
            <li>Desconto:R$ {{desconto}}</li>
            <li class="total">Total: R$ {{valorTotal}}</li>
          </ul>
        </div>
        <button class="button">Finalizar</button>
      </main>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
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
      produtos: {
        codigo: null,
        item: '',
        quantidade: null,
        valor_unit: 0,
        desconto: null,
        total: 0
      },
      qtdItens: 0,
      subTotal: 0,
      desconto: 2,
      valorTotal: 0
    }
  },
  // computed: {
  //   ...mapState('produtos', ['produtos']),
  //   listProd () {
  //     return ''
  //   }
  // },
  methods: {
    ...mapActions('produtos', ['listar']),

    async buscarProduto () {
      try {
        const result = await this.listar(this.filtro.codigo)
        if (result) {
          const itemsProd = {
            codigo: result.codigo,
            item: result.descricao,
            quantidade: this.produtos.quantidade,
            valor_unit: result.preco_venda,
            desconto: this.produtos.desconto,
            total: result.preco_venda * this.produtos.quantidade
          }

          this.items.push(itemsProd)
          this.filtro.codigo = 0
          this.produtos.quantidade = 0
          this.produtos.valor_unit = 0
          this.produtos.total = 0

          this.qtdItens = this.items.length
          this.subTotal += itemsProd.total
          this.valorTotal = this.subTotal - this.desconto
        }

        const rodape = this.$refs
        console.log(this.items, rodape)
      } catch (error) {
        console.error(error)
      }
    },
    async completarFiltro () {
      try {
        const result = await this.listar(this.filtro.codigo)

        this.produtos.valor_unit = result.preco_venda
        this.produtos.total = result.preco_venda * this.produtos.quantidade
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
  .containerVendas{
    margin: 20px auto;
    /* border: 1px solid; */
    width: 95%;
    display: grid;
  }

  .filtro{
    display: grid;
    justify-self: center;
    /* border: 1px solid; */
    max-width: 90%;
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
    height: 300px;
    overflow-y: scroll;
    border: 1px solid;
  }

  .informacoes ul{
    display: flex;
    align-items: center;
    gap: 30px;
    font-family: 'Roboto', sans-serif;
    font-size: 1.1rem;
  }

  .informacoes ul li {
    /* border: 1px solid; */
    text-align: center;
    width: 23%;
  }

  .total {
    font-size: 2rem;
    background: #228B22;
    color: #ffffff;
    font-weight: 500;
  }
</style>
