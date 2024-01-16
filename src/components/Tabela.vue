<template>
  <div>
    <v-simple-table
      class="table"
    >
      <template v-slot:default>
        <thead>
          <tr
            class="coluna"
          >
            <th
              v-for="item in headers"
              :key="item.text"
            >
              <span>{{item.text}}</span>
            </th>
            <th class="header-acao2">
              <span>Ações</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in dados"
            :key="item.id"
            class="rows"
          >

            <td
              v-for="header in headers"
              :key="header.value"
              class="borda"
            >
              {{item[header.value]}}
            </td>
            <td class="borda acao" v-show="pathname === '/cadastro/usuarios'">
              <v-icon
                class="acao-icon icon"
                @click="editar(item.id)"
                color="#228B22"
              >
                mdi-pencil
              </v-icon>

              <v-icon
                class="acao-icon icon"
                @click="vizualizar(item.id)"
                color="#228B22"
              >
                mdi-account
              </v-icon>
              <v-icon
                class="acao-icon icon"
                @click="deletar(item.id)"
                color="#228B22"
              >
                mdi-delete
              </v-icon>
            </td>
            <td class="acao dots" v-show="pathname === '/vendas/vendasdireta'">
              <v-icon
                class="acao-icon icon dots"
                @click="editar(item.codigo)"
                color="#228B22"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                class="acao-icon icon dots"
                @click="deletar(item.codigo)"
                color="#228B22"
              >
                mdi-delete
              </v-icon>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>
<script>

export default {
  name: 'theTabela',
  props: {
    dados: {
      type: Array
    },
    headers: {
      type: Array
    }
  },
  data () {
    return {
      acoes: {
        visualizar: false,
        editar: false,
        deletar: false
      },
      item: {
        id: null,
        name: '',
        email: '',
        cpf_cnpj: '',
        perfil: ''
      },
      produto: {},
      pathname: false
    }
  },
  created () {
    this.pathname = window.location.pathname
    console.log(this.dados)
  },
  methods: {
    vizualizar (id) {
      this.acoes.editar = false
      this.acoes.deletar = false
      this.acoes.visualizar = true

      // const usuario = this.dados.filter(item => item.id === 1)

      this.findUser(id)
      const acoes = {
        ...this.acoes,
        ...this.user
      }
      this.$emit('vizualizar', acoes)
    },
    editar (id) {
      this.acoes.visualizar = false
      this.acoes.deletar = false
      this.acoes.editar = true
      console.log(id)
      if (window.location.pathname === '/cadastro/usuarios') {
        this.findUser(id)
      } else {
        this.findProd(id)
      }
      const acoes = {
        ...this.acoes,
        ...this.item
      }
      this.$emit('editar', acoes)
    },
    deletar (id) {
      this.acoes.visualizar = false
      this.acoes.editar = false
      this.acoes.deletar = true

      if (window.location.pathname === '/cadastro/usuarios') {
        this.findUser(id)
      } else {
        this.findProd(id)
      }
      const acoes = {
        ...this.acoes,
        ...this.item
      }
      this.$emit('deletar', acoes)
    },
    findUser (id) {
      const user = this.dados.find(index => index.id === id)
      this.item = user
      // Object.assign(this.user, user)
    },
    findProd (codigo) {
      const produto = this.dados.find(index => index.codigo === codigo)
      this.item = produto
      // Object.assign(this.user, user)
    }

  }
}
</script>

<style scoped>
  .coluna th{
    font-family: Arial, Helvetica, sans-serif;
    color: #000000 !important;
    font-size: .950rem !important;
    width: 18%;
    /* border: 1px solid; */
    position: relative;
  }
  .coluna th span {
    position: absolute;
    /* border: 1px solid; */
    left: 35px;
    top: 12px;
  }
  .rows{
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 500;
  }

  .acao{
    display: flex;
    justify-content: space-around;
    align-items: center;
    max-width: 200px;
    /* gap: 20px; */
  }

  .dots{
    max-width: 150px !important;
  }
  .icon {
    padding: 15px 20px 15px 20px;
  }
  /* .icon:hover {
    background: #d2d2d2;
    opacity: 0.8;
  } */

  .header-acao{
    width: 200px;
  }

  .header-acao2{
    width: 100px;
  }
</style>
