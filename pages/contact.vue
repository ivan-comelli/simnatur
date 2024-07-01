<template>
    <div class="shop-page-wrapper">
        <TheHeader />
        <ContactInfo />
        <TheFooter />
    </div>
</template>

<script>
    export default {
        components: {
            TheHeader: () => import('@/components/TheHeader'),
            ContactInfo: () => import('@/components/ContactInfo'),
            Breadcrumb: () => import('@/components/Breadcrumb'),
            TheFooter: () => import('@/components/TheFooter')
        },
        head() {
            return {
                title: "Contact Us"
            }
        }
    };
</script>
