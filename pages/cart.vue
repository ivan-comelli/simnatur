<template>
    <div class="cart-page-wrapper">
        <TheHeader />

        <div class="cart-main-area pt-90 pb-100">
            <div :class="innerWidth < 920 ? 'conteiner-fluid' : 'container'">
                <div class="row">
                    <div class="col-12" v-if="products.length > 0">
                        <h3 class="cart-page-title">Tu Carrito</h3>
                        <div class="table-content cart-table-content">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Nombre Producto</th>
                                        <th>Precio unitario</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(product, index) in products" :key="index">
                                        <td class="product-thumbnail">
                                            <n-link :to="`/product/${slugify(product.title)}`">
                                                <GlobalImage :src="product.images[0]" :alt="product.title" />
                                            </n-link>
                                        </td>
                                        <td class="product-name">
                                            <n-link :to="`/product/${slugify(product.title)}`">{{ product.title }}</n-link>
                                        </td>
                                        <td class="product-price-cart">
                                            <span class="amount">${{ discountedPrice(product).toFixed(2) }}</span>
                                            <del class="old">${{ product.price.toFixed(2) }}</del>
                                        </td>
                                        <td class="product-quantity">
                                            <div class="cart-plus-minus">
                                                <button @click="decrementProduct(product)" class="dec qtybutton">-</button>
                                                <input class="cart-plus-minus-box" type="text" :value="product.cartQuantity" readonly>
                                                <button @click="incrementProduct(product)" class="inc qtybutton">+</button>
                                            </div>
                                        </td>
                                        <td class="product-subtotal">${{ product.total.toFixed(2) }}</td>
                                        <td class="product-remove">
                                            <button @click="removeProduct(product)"><i class="fa fa-times"></i></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="cart-shiping-update-wrapper">
                                    <div class="cart-shiping-update">
                                        <n-link to="/shop">Continuar en la tienda</n-link>
                                    </div>
                                    <div class="cart-clear">
                                        <button @click="clearCart()">Quitar todo del carrito</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-8 col-md-12">
                                <div class="grand-total">
                                    <div class="title-wrap">
                                        <h4 class="cart-bottom-title section-bg-gary-cart">Cart Total</h4>
                                    </div>
                                    <h5>Total products <span>${{ total.toFixed(2) }}</span></h5>
                                    <h4 class="grand-total-title">Grand Total  <span>${{ total.toFixed(2) }}</span></h4>
                                    <n-link to="/checkout">Proceder con el Pago</n-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12" v-else>
                        <div class="empty-cart text-center">
                            <div class="icon">
                                <i class="pe-7s-cart"></i>
                            </div>
                            <h4>No items found in cart</h4>
                            <n-link to="/shop" class="empty-cart__button">Comprar Ahora</n-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <TheFooter />
    </div>
</template>

<script>
    export default {
        components: {
            TheHeader: () => import('@/components/TheHeader'),
            Breadcrumb: () => import('@/components/Breadcrumb'),
            TheFooter: () => import('@/components/TheFooter'),
        },
        data() {
            return {
                singleQuantity: 1,
                innerWidth: window.innerWidth
            }
        },
        mounted() {
            window.addEventListener('resize', this.updateInnerWidth);
        },
        beforeDestroy() {
            window.removeEventListener('resize', this.updateInnerWidth);
        },
        computed: {
            products() {
                return this.$store.getters.getCart
            },

            total() {
                return this.$store.getters.getTotal
            },
        },

        methods: {
            updateInnerWidth() {
                this.innerWidth = window.innerWidth;
            },
            incrementProduct(product) {
                const prod = { ...product, cartQuantity: 1 }
                if (product.cartQuantity < product.quantity) {
                    this.$store.dispatch('addToCartItem', prod)
                }
            },

            decrementProduct(product) {
                const prod = { ...product, cartQuantity: 1 }
                if (product.cartQuantity > 1) {
                    this.$store.dispatch('decreaseProduct', prod)
                }
            },

            removeProduct(product) {
                // for notification
                this.$notify({ title: 'Item remove from cart!'})

                this.$store.dispatch('removeProductFromCart', product)
            },

            discountedPrice(product) {
                return product.price - (product.price * product.discount / 100)
            },

            clearCart() {
                if (confirm("Are you sure you want to clear cart")) {
                    // for notification
                    this.$notify({ title: 'Item remove from cart!'})
                    
                    this.$store.commit('CLEAR_CART')
                }
            },

            slugify(text) {
                return text
                    .toString()
                    .toLowerCase()
                    .replace(/\s+/g, "-") // Replace spaces with -
                    .replace(/[^\w-]+/g, "") // Remove all non-word chars
                    .replace(/--+/g, "-") // Replace multiple - with single -
                    .replace(/^-+/, "") // Trim - from start of text
                    .replace(/-+$/, ""); // Trim - from end of text
            }
        },

        head() {
            return {
                title: "Cart"
            }
        },
    };
</script>
