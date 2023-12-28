<template>
  <div>
    <div class="navigation-drawer">
      <div class="navi-main">
        <div class="menuContainer usuarios">
          <div class="menuLabel"
            @click="() => showCadastros = !showCadastros"
          >
            <v-icon>
              mdi-pencil-box-outline
            </v-icon>
            <span
            >
              Cadastros
            </span>
            <v-icon>
              mdi-menu-down
            </v-icon>
          </div>

            <div class="menuLabel menus"
              v-show="showCadastros"
              @click="() => showCadastrosUsers = !showCadastrosUsers"
            >
              <v-icon>
                mdi-account-box-outline
              </v-icon>
              <span
              >
                Usuarios
              </span>
              <v-icon>
                mdi-menu-down
              </v-icon>
            </div>
            <ul v-show="showCadastrosUsers && showCadastros">
              <li
                class="menus2"
              >
                <v-icon>
                  mdi-account-multiple
                </v-icon>
                <router-link
                  to="/cadastro/usuarios"
                >
                  Consultar usuários
                </router-link>
              </li>
              <li
                class="menus2"
              >
                <v-icon>
                  mdi-account-edit
                </v-icon>
                <router-link
                  to="/cadastro/criarusuario"
                >
                  Cadastrar usuários
                </router-link>
              </li>
            </ul>

            <div class="menuLabel menus"
              v-show="showCadastros"
              @click="() => showCadastrosProdutos = !showCadastrosProdutos"
            >
              <v-icon>
                mdi-food-outline
              </v-icon>
              <span
              >
                Produtos
              </span>
              <v-icon>
                mdi-menu-down
              </v-icon>
            </div>

            <ul
              v-show="showCadastrosProdutos && showCadastros">
              <li
                class="menus2"
              >
                <v-icon>
                  mdi-food
                </v-icon>
                <router-link
                  to="/cadastro/produtos"
                >
                  Cadastrar produtos
                </router-link>
              </li>
            </ul>
        </div>

        <div class="menuContainer vendas"
        >
          <div class="menuLabel"
            @click="() => showVendas = !showVendas"
          >
            <v-icon>
              mdi-cart-variant
            </v-icon>
            <span
            >
              Vendas
            </span>
            <v-icon>
              mdi-menu-down
            </v-icon>
          </div>
          <ul v-show="showVendas">
            <li
              class="menus2"
            >
              <v-icon>
                mdi-cart
              </v-icon>
              <router-link
                to="/vendas/vendasdireta"
              >
                Venda direta
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'theMenuVertical',
  data () {
    return {
      showModal: false,
      showCadastros: false,
      showCadastrosUsers: false,
      showCadastrosProdutos: false,
      showVendas: false,
      acoesModal: {}
    }
  }
}
</script>

<style scoped>
  .navigation-drawer{
    box-shadow: 0px 0px 20px 1px #DCDCDC;
    height: 600px;
    position: relative;
  }

  .menuContainer {
    margin: 0px auto 25px 15px;
    cursor: pointer;
  }
  .menuLabel {
    display: flex;
    gap: 8px;
  }
  .navi-main{
    position: fixed;
    top: 100px;
  }

  .menuLabel span {
    /* margin-top: 20px; */
    font-size: 1.2rem;
    color: #000;
  }

   .menus{
    margin: 5px 0px 5px 30px;
    padding: 5px;
  }

  .menus a {
    /* padding: 10px 60% 10px 0px; */
    text-align: start;
    font-size: 1rem;
    color: #000000DE;
    font-weight: 400;
    cursor: pointer
  }
  .menus:hover{
    background: #f6f6f6;
  }

  .menus2{
    margin: 5px 0px 5px 40px;
    padding: 5px;
  }
  .menus2 a {
    /* padding: 10px 60% 10px 0px; */
    text-align: start;
    font-size: 1rem;
    color: #000000DE;
    font-weight: 400;
    cursor: pointer
  }
  .menus2:hover{
    background: #f6f6f6;
  }
</style>
