<template>
    <div class="support-area pt-100 pb-90">
        <div class="container">
            <div class="row mtn-30">
                <div class="col-md-4 col-sm-6 mt-30 custom-policy" v-for="(policy, index) in policies" :key="index">
                    <div class="support-wrap-2 support-shape text-center">
                        <div class="support-content-2 policy-grid">
                            <GlobalImage :src="policy.icon" :alt="policy.title" />
                            <h5>{{ policy.title }}</h5>
                            <p>{{ policy.subTitle }}</p>
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
                policies: [
                    {
                        icon: "/img/icon-img/support-1.png",
                        title: "Envio Gratis",
                        subTitle: "Envios Gratis a Partir de Compras Mayores a 15.000$"
                    },
                    {
                        icon: "/img/icon-img/support-2.png",
                        title: "Consultas",
                        subTitle: "Mantenemos la salud de tu mascotas con experiencia en atencion clinica"
                    },
                    {
                        icon: "/img/icon-img/support-3.png",
                        title: "Devoluciones",
                        subTitle: "Devolvemos su Dinero ante Reclamos Factibles"
                    }
                ]
            }
        },
    };
</script>
