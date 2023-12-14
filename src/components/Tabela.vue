<template>
  <div>
    <v-simple-table
      class="table"
    >
      <template v-slot:default>
        <thead>
          <tr class="coluna">
            <th class="borda">
              ID
            </th>
            <th class="borda">
              Name
            </th>
            <th class="borda">
              E-mail
            </th>
            <th class="borda">
              CPF/CNPJ
            </th>
            <th class="borda">
              Perfil
            </th>
            <th class="borda header-acao">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in dados"
            :key="item.id"
            class="rows"
          >

            <td class="borda">{{item.id}}</td>
            <td class="borda">{{item.name}}</td>
            <td class="borda">{{item.email}}</td>
            <td class="borda">{{item.cpf_cnpj}}</td>
            <td class="borda">{{item.perfil}}</td>
            <td class="borda acao">
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
    }
  },
  data () {
    return {
      acoes: {
        visualizar: false,
        editar: false,
        deletar: false
      },
      user: {
        id: null,
        name: '',
        email: '',
        cpf_cnpj: '',
        perfil: ''
      }
    }
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
      this.findUser(id)
      const acoes = {
        ...this.acoes,
        ...this.user
      }
      this.$emit('editar', acoes)
    },
    deletar (id) {
      this.acoes.visualizar = false
      this.acoes.editar = false
      this.acoes.deletar = true

      this.findUser(id)
      const acoes = {
        ...this.acoes,
        ...this.user
      }
      this.$emit('deletar', acoes)
    },
    findUser (id) {
      const user = this.dados.find(index => index.id === id)

      this.user = user
      // Object.assign(this.user, user)
    }

  }
}
</script>

<style scoped>

.table{
    max-width: 90%;
    margin: 0 auto;
    box-shadow: 0px 0px 10px 1px #DCDCDC;
    /* border-radius: 10px; */
  }
  .borda{
    border-right: 1px solid #363636;
  }

  .coluna th{
    font-family: Arial, Helvetica, sans-serif;
    color: #000 !important;
    font-size: 1.2rem !important;
    text-align: center;
  }

  .rows{
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
  }

  .acao{
    display: flex;
    justify-content: space-around;
    align-items: center;
    max-width: 200px;
    /* gap: 20px; */
  }

  .icon {
    padding: 15px 20px 15px 20px;
  }
  .icon:hover {
    background: #363636;
  }

  .header-acao{
    width: 200px;
  }
</style>
