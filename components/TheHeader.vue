<template>
    <div>
      <header 
        class="header-area header-padding-1 sticky-bar header-res-padding clearfix" 
        :class="{'is-sticky': isSticky}">
        <div class="container-fluid">
          <div class="row">
            <div class="header-left col-lg-2 col-md-6 col-4">
              <div class="logo">
                <n-link to="/">
                  <img src="/img/logo/logo.png" alt="logo" />
                </n-link>
              </div>
            </div>
            <div class="col-lg-8 d-none d-lg-block">
              <div class="main-menu">
                <nav>
                  <Navigation />
                </nav>
              </div>
            </div>
            <div class="col-lg-2 col-md-6 col-8">
                <div class="header-right-wrap">
                    <div class="same-style header-search d-none d-lg-block">
                    <button class="search-active" @click="isOpenSearch = !isOpenSearch">
                        <i class="pe-7s-search"></i>
                    </button>
                    <div class="search-content" :class="{ active:isOpenSearch }">
                        <form>
                        <input type="text" placeholder="Search" />
                        <button class="button-search">
                            <i class="pe-7s-search"></i>
                        </button>
                        </form>
                    </div>
                    </div>
                    <client-only>
                        <div v-if="userStatus" class="same-style account-setting d-none d-lg-block">
                            <button class="account-setting-active" @click="isOpenAccountSettings = !isOpenAccountSettings">
                                <i class="pe-7s-user-female"></i>
                            </button>
                            <div class="account-dropdown" :class="{ active:isOpenAccountSettings }">
                                <ul>
                                <li><n-link to="/my-account">Mi Perfil</n-link></li>
                                <li><n-link to="" @click.native="handleLogout">Cerrar Sesion</n-link></li>
                                </ul>
                            </div>
                        </div>
                        <div v-else>
                            <n-link class="session-entry" to="/login-register">Entra a la Cuenta</n-link>
                        </div>
                        <div v-if="userStatus" class="same-style header-wishlist">
                            <n-link to="/wishlist">
                                <i class="pe-7s-like"></i>
                            </n-link>
                            <span class="count-style">{{ wishlistItemCount }}</span>
                        </div>
                        <div v-if="userStatus" class="same-style cart-wrap">
                            <button class="icon-cart" @click="openCart = !openCart">
                                <i class="pe-7s-shopbag"></i>
                                <span class="count-style">{{ cartItemCount }}</span>
                            </button>
                            <MiniCart :miniCart="{ visible:openCart }" @minicartClose="openCart = !openCart" />
                        </div>
                    </client-only>
                    
                    <div class="same-style mobile-menu-toggler d-block d-lg-none">
                    <button class="mobile-aside-button" @click="navOpen = !navOpen">
                        <i class="pe-7s-menu"></i>
                    </button>
                    </div>
                
                </div>
            </div>
          </div>
        </div>
      </header>
      <OffCanvasMobileMenu :class="{'show-mobile-menu' : navOpen}" @toggleAsideMenu="navOpen = !navOpen" />
    </div>
  </template>
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    components: {
      Navigation: () => import('@/components/Navigation'),
      MiniCart: () => import('@/components/MiniCart'),
    },
    data() {
      return {
        isSticky: false,
        isOpenSearch: false,
        isOpenAccountSettings: false,
        openCart: false,
        navOpen: false,
      };
    },
    computed: {
      ...mapGetters({
        cartItemCount: 'cartItemCount',
        wishlistItemCount: 'wishlistItemCount',
        compareItemCount: 'compareItemCount',
        userStatus: 'auth/getUser',
      }),
    },
    methods: {
      ...mapActions({
        fetchUser: 'auth/fetchUser',
        logout: 'auth/logout',
        fetchWishList: 'fetchWishList'
      }),
      handleScroll() {
        this.isSticky = window.scrollY >= 200;
      },
      async handleLogout() {
        try {
          await this.logout();
          this.$router.push('/');
        } catch (error) {
          console.log('ERROR LOGOUT', error);
        }
      },
    },
    async fetch() {
      await this.fetchUser();
    },
    mounted() {
      this.fetchWishList();
      window.addEventListener('scroll', this.handleScroll);
      caches.keys().then((cacheNames) => {
        console.log('Cachés disponibles:', cacheNames);
      });
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
  };
  </script>
  