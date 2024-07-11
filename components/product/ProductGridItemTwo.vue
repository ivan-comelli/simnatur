<template>
    <div class="product-wrap-2 mb-25">
        <div class="product-img">
            <n-link :to="`/product/${slugify(product.title)}`">
                <GlobalImage class="default-img" :src="product.images[0]" :alt="product.title" />
                <GlobalImage class="hover-img" :src="product.images[1]" :alt="product.title" />
            </n-link>
            <div class="product-badges">
                <span class="product-label pink" v-if="product.new">New</span>
                <span class="product-label purple" v-if="product.discount">-{{ product.discount }}%</span>
            </div>
            <div class="product-action-2">
                <!--<button class="btn" title="Compare" @click="addToCompare(product)"> 
                    <i class="pe-7s-shuffle"></i>
                </button>-->
                <button class="btn" title="Add To Cart" @click="addToCart(product)">
                    <i class="pe-7s-cart"></i>
                </button>
                <button class="btn" title="Quick View" @click="onClick(product)">
                    <i class="pe-7s-look"></i>
                </button>
            </div>
        </div>
        <div class="product-content-2">
            <div class="title-price-wrap-2">
                <h3>
                    <n-link :to="`/product/${slugify(product.title)}`">{{ product.title }}</n-link>
                </h3>
                <div class="price-2">
                    <span>${{ discountedPrice(product).toFixed(2) }}</span>
                    <span class="old" v-if="product.discount > 0">${{ product.price.toFixed(2) }}</span>
                </div>
            </div>
            <div class="pro-wishlist-2">
                <button @click="addToWishlist(product)"><i class="pe-7s-like"></i></button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["product"],

        methods: {
            addToCart(product) {
                const prod = {...product, cartQuantity: 1}
                this.$store.dispatch('addToCartItem', prod).then(() => {
                    if (this.$store.state.cart.find(el => product.id === el.id)) {
                        this.$notify({ title: 'Already added to cart update with one' })
                    } else {
                        this.$notify({ title: 'Add to cart successfully!'})
                    }
                }).catch(error => {
                    this.$notify({ title: error})
                });               
            },

            discountedPrice(product) {
                return product.price - (product.price * product.discount / 100)
            },

            addToWishlist(product) {
                // for notification
                this.$store.dispatch('addToWishlist', product).then(() => {
                    if (this.$store.state.wishlist.find(el => product.id === el.id)) {
                        this.$notify({ title: 'Already added to wishlist!' })
                    } else {
                        this.$notify({ title: 'Add to wishlist successfully!'})
                    }
                }).catch(error => {
                    this.$notify({ title: error})
                });
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

            onClick(product) {
                this.$modal.show('quickview', product);
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