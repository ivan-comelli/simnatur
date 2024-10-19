<template>
    <div class="home-page-wrapper">
        <TheHeader />
        <HeroSlider />
        <ServicePolicy/>
        <Modal />
        <ProductWrapper :isSectionTitle=true />
        <BlogWrapper />
        <TheFooter />
    </div>
</template>

<script>
    export default {
        components: {
            TheHeader: () => import('@/components/TheHeader'),
            HeroSlider: () => import('@/components/hero/HeroSliderFurniture'),
            ServicePolicy: () => import('@/components/policy/ServicePolicyTwo'),
            ProductWrapper: () => import('@/components/product/ProductWrapperThree'),
            BlogWrapper: () => import('@/components/BlogWrapper'),
            TheFooter: () => import('@/components/TheFooter'),
            Modal: () => import('@/components/ModalCTA'),
        },
        head() {
            return {
                title: 'Home Fashion One'
            }
        },
    };
</script>


