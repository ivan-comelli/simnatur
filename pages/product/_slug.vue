<template>
    <div class="product-details-page-wrapper">
        <TheHeader />
        <ProductDetailsWrapper :product="product" />
        <ProductDetailsDescriptionReview :product="product" />
        <TheFooter />
    </div>
</template>

<script>
import TheHeader from '../../components/TheHeader.vue';
    import { mapGetters, mapActions } from 'vuex';
    export default {
    data() {
        return {
            slug: this.$route.params.slug,
        };
    },
    computed: {
        ...mapGetters('products', ['getProducts']),
        product() {
            return this.getProducts.find(product => this.slugify(product.title) == this.slug);
        },
    },
    async fetch() {
        await this.fetchProducts();
    },
    head() {
        return {
            title: this.product.title
        };
    },
    methods: {
        ...mapActions('products', ['fetchProducts']),
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
    components: { TheHeader }
};
</script>
