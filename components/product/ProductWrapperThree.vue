<template>
    <div class="product-area pb-90 section-padding-1">
      <div class="container-fluid">
        <SectionTitleWithSubTitle 
          classes="section-title-2 mb-60" 
          title="Nuevos Productos" 
          subTitle="Tenemos en cuenta las necesidades de tu mascota y las tratamos con la mejor calidad y naturalidad" 
        />
        <div class="custom-row" v-if="products && products.length">
          <div class="custom-col-5" v-for="(product, index) in products.slice(0, 10)" :key="product.id">
            <ProductGridItemTwo :product="product" />
          </div>
          <div class="view-more text-center mt-20 toggle-btn2 col-12">
            <n-link to="/shop" class="loadMore2">VER MÁS PRODUCTOS</n-link>
          </div>
        </div>
      </div>
      <QuickView />
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    components: {
      ProductGridItemTwo: () => import('@/components/product/ProductGridItemTwo'),
      QuickView: () => import('@/components/QuickView'),
      SectionTitleWithSubTitle: () => import('@/components/SectionTitleWithSubTitle')
    },
    computed: {
      ...mapGetters('products', ['getProducts']),
  
      products() {
        return this.getProducts;
      }
    },
    async fetch() {
      await this.fetchProducts();
    },
    methods: {
      ...mapActions('products', ['fetchProducts'])
    }
  };
  </script>
  