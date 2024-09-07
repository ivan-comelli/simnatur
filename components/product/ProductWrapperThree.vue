<template>
    <div class="product-area pb-90">
      <div class="container-fluid">
        <SectionTitleWithSubTitle 
          classes="section-title-2 mb-60 mobil-side-text" 
          title="Nuevos Productos" 
          subTitle="Tenemos en cuenta las necesidades de tu mascota y las tratamos con la mejor calidad y naturalidad" 
        />
        <div class="custom-row adjust-row" v-if="products && products.length">
          <div>
            <div ref="emblaRef" class="embla">
              <div class="embla__container">
                <div class="embla__slide" v-for="(color, i) in colors" :key="i" :style="{ backgroundColor: color }">
                  Slide {{ i }}
                </div>
              </div>
            </div>
            <button @click="scrollPrev">Prev</button>
            <button @click="scrollNext">Next</button>
          </div>
          <div class="custom-col-5" v-for="(product, index) in products.slice(0, 10)" :key="product.id">
            <ProductGridItemTwo :product="product" />
          </div>
        </div>
      </div>
      <QuickView />
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import EmblaCarousel from 'embla-carousel'

  export default {
    data() {
      return {
        emblaApi: null,
      }
    },
    components: {
      ProductGridItemTwo: () => import('@/components/product/ProductGridItemTwo'),
      QuickView: () => import('@/components/QuickView'),
      SectionTitleWithSubTitle: () => import('@/components/SectionTitleWithSubTitle')
    },
    computed: {
      ...mapGetters('products', ['getProducts']),
      
      colors() {
        return Array.from({ length: 20 }, (_, i) => {
          const hue = (i * 137.508) % 360;
          return `hsl(${hue}, 80%, 80%)`;
        });
      },
      products() {
        return this.getProducts;
      }
    },
    async fetch() {
      await this.fetchProducts();
    },
    mounted() {
      const emblaRef = this.$refs.emblaRef
      const options = { skipSnaps: true }

      this.emblaApi = EmblaCarousel(emblaRef, options)
    },
    methods: {
      ...mapActions('products', ['fetchProducts']),
      
      scrollPrev() {
        this.emblaApi?.scrollPrev()
      },
      scrollNext() {
        this.emblaApi?.scrollNext()
      }
    }
  };
  </script>
  