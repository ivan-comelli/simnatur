<template>
    <div class="shop-area pt-100 pb-100">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="product-details-slider">
                        <div class="product-details-img">
                            <div class="product-badges">
                                <span class="product-label pink" v-if="product.new">Nuevo</span>
                                <span class="product-label purple" v-if="product.discount">-{{ product.discount }}%</span>
                            </div>
                            <swiper :options="swiperOptionTop" ref="swiperTop">
                                <div class="large-img swiper-slide" v-for="(image, index) in product.images" :key="index">
                                    <GlobalImage class="img-fluid " :src="image" :alt="product.title" />
                                </div>
                                <div class="quickview-nav swiper-button-prev">
                                    <i class="pe-7s-angle-left"></i>
                                </div>
                                <div class="quickview-nav swiper-button-next">
                                    <i class="pe-7s-angle-right"></i>
                                </div>
                            </swiper>
                            <swiper class="mt-2" :options="swiperOptionThumbs" ref="swiperThumbs">
                                <div class="thumb-img swiper-slide" v-for="(image, index) in product.images" :key="index">
                                    <GlobalImage class="img-fluid " :src="image" :alt="product.title" />
                                </div>
                            </swiper>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 col-md-8">
                    <div class="product-details-content ml-70">
                        <h2>{{ product.title }}</h2>
                        <div class="product-details-price">
                            <span>${{ discountedPrice(product).toFixed(2) }}</span>
                            <span class="old" v-if="product.discount > 0">${{ product.price.toFixed(2) }}</span>
                        </div>
                        <div :style="{ fontSize: '.4rem' }" v-html="product.description"></div>
                        
                        <!-- div class="pro-details-quality">
                            <div class="cart-plus-minus">
                                <button @click="decreaseQuantity()" class="dec qtybutton">-</button>
                                <input class="cart-plus-minus-box" type="text" :value="singleQuantity" readonly>
                                <button @click="increaseQuantity()" class="inc qtybutton">+</button>
                            </div>
                            <div class="pro-details-cart btn-hover">
                                <button @click="addToCart(product)">Agregar al Carrito</button>
                            </div>
                            <div class="pro-details-wishlist">
                                <button @click="addToWishlist(product)" title="wishlist"><i class="fa fa-heart-o"></i></button>
                            </div>
                        </div -->
                        <div class="pro-details-meta">
                            <span class="label">Categorias:</span>
                            <ul>
                                <li v-for="(category, index) in product.category" :key="index">
                                    <n-link :to="`/shop?category=${slugify(category)}`">{{ category }},</n-link>
                                </li>
                            </ul>
                        </div>
                        <div class="pro-details-meta">
                            <span class="label">Etiquetas:</span>
                            <ul>
                                <li v-for="(tag, index) in product.tag" :key="index">
                                    <n-link :to="`/shop?tag=${slugify(tag)}`">{{ tag }},</n-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['product'],

        data() {
            return {
                singleQuantity: 1,

                swiperOptionTop: {
                    loop: true,
                    slidesPerView : 1,
                    spaceBetween: 10,
                    effect: 'fade',
                    loopedSlides: 5, // looped slides should be the same
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },

                swiperOptionThumbs: {
                    loop: true,
                    spaceBetween: 10,
                    centeredSlides: true,
                    slidesPerView: 5,
                    freeMode: true,
                    watchSlidesVisibility: true,
                    watchSlidesProgress: true,
                    slideToClickedSlide: true,
                    loopedSlides: 5, // looped slides should be the same
                },
            }
        },

        mounted() {
            this.$nextTick(() => {
                const swiperTop = this.$refs.swiperTop.$swiper
                const swiperThumbs = this.$refs.swiperThumbs.$swiper
                swiperTop.controller.control = swiperThumbs
                swiperThumbs.controller.control = swiperTop
            })
        },

        methods: {
            addToCart(product) {
                const prod = {...product, cartQuantity: this.singleQuantity}
                // for notification
                if (this.$store.state.cart.find(el => product.id === el.id)) {
                    this.$notify({ title: 'Already added to cart update with one' })
                } else {
                    this.$notify({ title: 'Add to cart successfully!'})
                }
                this.$store.dispatch('addToCartItem', prod)
            },

            discountedPrice(product) {
                return product.price - (product.price * product.discount / 100)
            },

            increaseQuantity(){
                if(this.product.quantity > this.singleQuantity) this.singleQuantity++
            },

            decreaseQuantity() {
                if(this.singleQuantity > 1) this.singleQuantity--
            },

            addToWishlist(product) {
                // for notification
                if (this.$store.state.wishlist.find(el => product.id === el.id)) {
                    this.$notify({ title: 'Already added to wishlist!' })
                } else {
                    this.$notify({ title: 'Add to wishlist successfully!'})
                }
                this.$store.dispatch('addToWishlist', product)
            },

            addToCompare(product) {
                // for notification
                if (this.$store.state.compare.find(el => product.id === el.id)) {
                    this.$notify({ title: 'Already added to compare!' })
                } else {
                    this.$notify({ title: 'Add to compare successfully!'})
                }
                this.$store.dispatch('addToCompare', product)
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
    };
</script>