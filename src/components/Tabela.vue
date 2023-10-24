<template>
  <div>
    <v-simple-table
      class="table"
    >
      <template v-slot:default>
        <thead>
          <tr class="coluna">
            <th class="borda header-acao">Ações</th>
            <th class="borda">
              Id
            </th>
            <th class="borda">
              Name
            </th>
            <th class="borda">
              E-mail
            </th>
            <th class="borda">
              CNPJ
            </th>
            <th>
              Perfil
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in dados"
            :key="item.id"
            class="rows"
          >
            <td class="borda acao">

              <v-btn
                @click="editar"
              >
                <v-icon
                  class="acao-icon"
                  color="#228B22"
                >
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn
                @click="vizualizar"
              >
                <v-icon
                  class="acao-icon"
                  color="#228B22"
                >
                  mdi-account
                </v-icon>
              </v-btn>
            </td>
            <td class="borda">{{item.id}}</td>
            <td class="borda">{{item.name}}</td>
            <td class="borda">{{item.email}}</td>
            <td class="borda">{{item.cnpj}}</td>
            <td>{{item.perfil}}</td>
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
        editar: false
      },
      user: {
        id: null,
        name: '',
        email: '',
        cnpj: '',
        perfil: ''
      }
    }
  },
  methods: {
    vizualizar () {
      this.acoes.editar = false
      this.acoes.visualizar = true
      this.$emit('vizualizar', this.acoes)
    },
    editar () {
      this.acoes.visualizar = false
      this.acoes.editar = true

      this.$emit('editar', this.acoes)
    }
  }
}
</script>

<style scoped>
.table{
    max-width: 80%;
    margin: 0 auto;
    box-shadow: 0px 0px 10px 1px #DCDCDC;
    border-radius: 10px;
  }
  .borda{
    border-right: 1px solid #000;
  }

  .coluna th{
    font-family: Arial, Helvetica, sans-serif;
    color: #000 !important;
    font-size: 1.2rem !important;
  }

  .rows{
    text-align: center;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
  }

  .acao{
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 200px;
    gap: 20px;
  }

  .header-acao{
    width: 200px;
  }
</style>
