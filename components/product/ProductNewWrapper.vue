<template>
    <div class="product-area pt-90 pb-90">
        <div class="container">
            <div class="section-title-5 mb-60 text-center">
                <h2>New Products</h2>
            </div>
            <div class="product-carousel product-carousel-nav-center position-relative">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(product, index) in products" :key="index">
                        <ProductGridItemTwo :product="product" />
                    </swiper-slide>
                </swiper>
                <!-- Swiper Navigation Start -->
                <div class="product-carousel-nav swiper-button-prev">
                    <i class="pe-7s-angle-left"></i>
                </div>
                <div class="product-carousel-nav swiper-button-next">
                    <i class="pe-7s-angle-right"></i>
                </div>
                <!-- Swiper Navigation End -->
            </div>
        </div>
        <QuickView />
    </div>
</template>

<script>
    export default {
        components: {
            ProductGridItemTwo: () => import('@/components/product/ProductGridItemTwo'),
            QuickView: () => import('@/components/QuickView'),
        },

        data() {
            return {
                swiperOption: {
                    loop: true,
                    speed: 750,
                    spaceBetween: 30,
                    slidesPerView: 4,
                    autoplay: {
                        delay: 6000
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    breakpoints: {
                        320: {
                            slidesPerView: 1
                        },
                        480: {
                            slidesPerView: 2
                        },
                        768: {
                            slidesPerView: 3
                        },
                        992: {
                            slidesPerView: 4
                        }
                    }
                }
            }
        },

        computed: {
            products() {
                return this.$store.getters.getNewProducts.filter(item => item.category.includes("book"))
            },
        },
    };
</script>