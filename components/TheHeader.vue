<template>
    <div>
        <header class="header-area header-padding-1 sticky-bar header-res-padding clearfix" :class="{'is-sticky': isSticky}">
            <div class="container-fluid">
                <div class="row">
                    <div class="header-left col-lg-2 col-md-6 col-4">
                        <div class="logo">
                            <n-link to="/">
                                <img src="/img/logo/logo.png" alt="logo">
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
                                <button class="search-active" @click="isOpenSearch = !isOpenSearch"><i class="pe-7s-search"></i></button>
                                <div class="search-content" :class="{ active:isOpenSearch }">
                                    <form>
                                        <input type="text" placeholder="Search" />
                                        <button class="button-search"><i class="pe-7s-search"></i></button>
                                    </form>
                                </div> 
                            </div>
                            <div v-if="userStatus != null" class="same-style account-setting d-none d-lg-block">
                                <button class="account-setting-active" @click="isOpenAccountSettings = !isOpenAccountSettings"><i class="pe-7s-user-female"></i></button>
                                <div class="account-dropdown" :class="{ active:isOpenAccountSettings }">
                                    <ul>
                                        <li><n-link to="/my-account">Mi Perfil</n-link></li>
                                        <li><n-link to="/" @click.native="logout">Cerrar Sesion</n-link></li>
                                    </ul>
                                </div>
                            </div>
                            <div v-else>
                                <n-link class="session-entry" to="/login-register">Entra a la Cuenta</n-link>
                            </div>
                            <!--<div class="same-style header-compare">
                                <n-link to="/compare"><i class="pe-7s-shuffle"></i></n-link>
                                <span class="count-style">{{ compareItemCount }}</span>
                            </div>-->
                            <div v-if="userStatus != null" class="same-style header-wishlist">
                                <n-link to="/wishlist"><i class="pe-7s-like"></i></n-link>
                                <span class="count-style">{{ wishlistItemCount }}</span>
                            </div>
                            <div v-if="userStatus != null" class="same-style cart-wrap">
                                <button class="icon-cart" @click="openCart = !openCart">
                                    <i class="pe-7s-shopbag"></i>
                                    <span class="count-style">{{ cartItemCount }}</span>
                                </button>
                                <MiniCart :miniCart="{ visible:openCart }" @minicartClose="openCart = !openCart" />
                            </div>
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
    export default {
        components: {
            Navigation: () => import("@/components/Navigation"),
            MiniCart: () => import("@/components/MiniCart"),
        },

        computed: {
            cartItemCount() {
                return this.$store.getters['cartItemCount']
            },
            wishlistItemCount() {
                return this.$store.getters['wishlistItemCount']
            },
            compareItemCount() {
                return this.$store.getters['compareItemCount']
            },
            userStatus() {
                return this.$store.getters['auth/getUser']
            }
        },

        data() {
            return {
                isSticky: false,
                isOpenSearch: false,
                isOpenAccountSettings: false,
                openCart: false,
                navOpen: false
            }
        },

        methods: {
            logout() {
                this.$store.dispatch('auth/logout');
                this.$router.push('/');
            }
        },

        mounted(){
            window.addEventListener('scroll', () => {
                let scroll = window.scrollY
                if(scroll >= 200){
                    this.isSticky = true
                } else {
                    this.isSticky = false
                }
            }) 
        }
    };
</script>
