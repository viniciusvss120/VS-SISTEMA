<template>
  <div class="main">
    <div class="prodContainer">
      <div class="header">
        <h1>Cadastro de Produto</h1>
        <div class="btn">
          <button>Salvar</button>
          <button>Salvar Mais</button>
          <button class="sair" @click="() => this.$router.push('/')">Sair</button>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="prodMain">
        <h2>Dados Gerais </h2>
        <v-divider
        ></v-divider>
        <v-form class="infoProd">
          <div>
            <div class="field mt-3">
              <label class="label">Código*</label>
              <div class="control">
                <input type="text" class="input" placeholder="000">
              </div>
            </div>
          </div>

          <div class="field mt-3 inputMaiores">
            <label class="label">Descrição*</label>
            <div class="control">
              <input class="input" type="text" placeholder="e.g Alex Smith">
            </div>
          </div>

        <div>
            <div class="field mt-3">
              <label class="label">Categoria*</label>
              <div class="control">
                <div class="select">
                  <select>
                    <option disabled>Selecione uma Categoria</option>
                    <option>01 - Bebidas</option>
                    <option>02 - Lanches</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="inputMaiores">
            <div class="field mt-3">
              <label class="label">Código de barras</label>
              <div class="control">
                <input type="text" class="input" placeholder="...">
              </div>
            </div>
          </div>

          <div class="field mt-3">
            <label class="label">Código NCM*</label>
            <div class="control">
              <input class="input" type="text" placeholder="e.g Alex Smith">
            </div>
          </div>

          <div>
            <div class="field mt-3">
              <label class="label">CEST</label>
              <div class="control">
                <input type="text" class="input" placeholder="N° CEST">
              </div>
            </div>
          </div>

          <div>
            <div class="field mt-3">
              <label class="label">Ativo*</label>
              <div class="control">
                <div class="select">
                  <select>
                    <option>SIM</option>
                    <option>NÃO</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="field mt-3">
              <label class="label">Tipo de Produto*</label>
              <div class="control">
                <div class="select">
                  <select>
                    <option disabled>Selecione um tipo</option>
                    <option>01 - Revenda</option>
                    <option>02 - Consumo</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="field mt-3">
              <label class="label">Unidade de Medida*</label>
              <div class="control">
                <div class="select">
                  <select>
                    <option disabled>Selecione uma UN...</option>
                    <option>UN - UNIDADE</option>
                    <option>CX - CAIXA</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="field mt-3">
              <label class="label">Custo da Mercadoria</label>
              <div class="control">
                <input type="text" class="input" placeholder="R$ 0,00">
              </div>
            </div>
          </div>

          <div>
            <div class="field mt-3">
              <label class="label">Preço de Venda*</label>
              <div class="control">
                <input type="text" class="input" placeholder="R$ 0,00">
              </div>
            </div>
          </div>

          <div>
            <div class="field mt-4">
              <label class="label">Estoque Inicial*</label>
              <div class="control">
                <input type="text" class="input" placeholder="000">
              </div>
            </div>
          </div>
          <div>
            <div class="field mt-4">
              <label class="label">Estoque Mínimo*</label>
              <div class="control">
                <input type="text" class="input" placeholder="000">
              </div>
            </div>
          </div>
          <div>
            <div class="field mt-4">
              <label class="label">Estoque Maximo*</label>
              <div class="control">
                <input type="text" class="input" placeholder="000">
              </div>
            </div>
          </div>

        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'theProdutos'
}
</script>

<style scoped>
  .main {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 600px;
  }
  .prodContainer {
    width: 75%;
    /* border: 1px solid; */
    margin: 50px auto;
  }

  .header{
    display: flex;
    justify-content: space-between;
    font-family: 'Roboto', sans-serif;
    color: #000000;
    /* border: 1px solid; */
  }
  .header h1 {
    font-size: 2rem;
  }
  .btn{
    display: flex;
    width: 45%;
    gap: 10px
  }

  .btn button {
    width: 260px;
    padding: 5px;
    background: #228B22;
    color: #fff;
    border-radius: 5px;
  }
  .sair {
    background: red !important;
    color: #ffffff !important;
    /* border: 1px solid; */
  }

  .prodMain {
    /* border: 1px solid; */
    margin-top: 50px;
    font-family: 'Roboto', sans-serif;
  }

  .prodMain h2 {
    font-size: 1.5rem;
    color: #000000;
  }
  .infoProd {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    gap: 8px;
  }

  .inputMaiores {
    width: 50%;
  }
</style>
