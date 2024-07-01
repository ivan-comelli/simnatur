<template>
    <div class="support-area pb-60 hm9-section-padding">
        <div class="container">
            <div class="row">
                <div class="col-lg-4 col-sm-6" v-for="(policy, index) in policyData" :key="index">
                    <div class="support-wrap-3 text-center mb-10" :class="policy.bgColorClass">
                        <div class="support-icon-2">
                            <img :src="policy.icon" :alt="policy.text">
                        </div>
                        <div class="support-content-3">
                            <img :src="policy.textImg" :alt="policy.text">
                            <p>{{ policy.text }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                policyData: [
                    {
                        id: 1,
                        text: "Free shipping on all order",
                        textImg: "/img/icon-img/support-8.png",
                        icon: "/img/icon-img/support-5.png",
                        bgColorClass: "support-bg-color-1"
                    },
                    {
                        id: 2,
                        text: "Money back guarantee under 5 days",
                        textImg: "/img/icon-img/support-9.png",
                        icon: "/img/icon-img/support-6.png",
                        bgColorClass: "support-bg-color-2"
                    },
                    {
                        id: 3,
                        text: "10% discount for our member",
                        textImg: "/img/icon-img/support-10.png",
                        icon: "/img/icon-img/support-7.png",
                        bgColorClass: "support-bg-color-3"
                    }
                ]
            }
        },
    };
</script>
