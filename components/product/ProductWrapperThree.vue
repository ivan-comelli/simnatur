<template>
    <div class="product-area pb-90">
      <div class="container-fluid">
        <SectionTitleWithSubTitle 
          classes="section-title-2 mb-60 mobil-side-text" 
          title="Nuevos Productos" 
          subTitle="Tenemos en cuenta las necesidades de tu mascota y las tratamos con la mejor calidad y naturalidad" 
        />
        <div class="adjust-row">
          <div ref="emblaRef" class="embla">
            <div class="embla__container custom-row" v-if="products && products.length">
              <div class="embla__slide custom-col-5" v-for="(product, index) in products.slice(0, 10)" :key="product.id">
                <ProductGridItemTwo :product="product" />
              </div>
            </div>
            <button @click="scrollPrev">Prev</button>
            <button @click="scrollNext">Next</button>
          </div>
       </div>
      </div>
      <QuickView />
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  import EmblaCarousel from 'embla-carousel'
  import { Autoplay } from 'embla-carousel-autoplay';


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
      
      products() {
        return this.getProducts;
      }
    },
    async fetch() {
      await this.fetchProducts();
    },
    mounted() {
      const emblaRef = this.$refs.emblaRef
      const options = { skipSnaps: true, loop: true }
      const plugins =  [
        Autoplay({ delay: 3000, stopOnInteraction: true })
      ]

      this.emblaApi = EmblaCarousel(emblaRef, options, plugins)
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
  