<template>
    <div class="cart-page-wrapper">
        <TheHeader />
        
        <!-- checkout section start -->
        <div class="checkout-area pt-95 pb-100 magicpattern">
            <div class="container">
                <div class="row">
                    <div id="paymentBrick_container"></div>            
                </div>
            </div>            
        </div>
        <!-- checkout section end -->
        <TheFooter />
    </div>
</template>

<script> 
    import { mapActions } from 'vuex'
    export default {
        components: {
            TheHeader: () => import('@/components/TheHeader'),
            Breadcrumb: () => import("@/components/Breadcrumb"),
            TheFooter: () => import("@/components/TheFooter"),
        },
        data() {
            return {
                formUser: [],
                triggerCollapseUser: false,
                triggerCollapseCart: false,
                triggerCollapseAddress: false,
            }
        },
        updated() {
            console.log('updated:', this.triggerCollapseUser);
        },
        computed: {
            preference() {
                return this.$store.getters.getPreference
            },
            detailCart() {
                const data = this.$store.getters.getCart || [];
                return {
                    shipping: null,
                    listProducts: data.map(product => {
                        return  {
                            quantity: product.cartQuantity,
                            name: product.title,
                            total: product.total
                        }
                    })
                }
            },
            totalToPay() {
                return this.$store.getters.getTotal
            },
            currentUser() {
                const data = this.$store.getters['auth/getUser'] || [];
                return {
                    name: data.firstName || null,
                    lastName: data.lastName || null,
                    email: data.email || null,
                    phone: data.phone || null,
                    document: data.document || null,
                    birthday: data.birthday || null,
                    addressBook: {
                        detail: null,
                        street: null,
                        city: null
                    }
                }
            },
        },
        methods: {
            ...mapActions(['paymentCart']),
            isCompletePersonalData() {
                return true;
            },
            getPayment() {
                this.formUser = this.currentUser;
                const mp = new MercadoPago('APP_USR-f43919a5-4ac6-499e-a6a3-8f1f555975c5');
                const bricksBuilder = mp.bricks();
                const renderPaymentBrick = async (bricksBuilder) => {
                    const settings = {
                        initialization: {
                            /*
                            "amount" es el monto total a pagar por todos los medios de pago con excepción de la Cuenta de Mercado Pago y Cuotas sin tarjeta de crédito, las cuales tienen su valor de procesamiento determinado en el backend a través del "preferenceId"
                            */
                            amount: 100,
                            preferenceId: this.preference.id,
                        },
                        customization: {
                            paymentMethods: {
                            ticket: "all",
                            creditCard: "all",
                            debitCard: "all",
                            mercadoPago: "all",
                            },
                        },
                        callbacks: {
                            onReady: () => {
                            /*
                                Callback llamado cuando el Brick está listo.
                                Aquí puede ocultar cargamentos de su sitio, por ejemplo.
                            */
                            },
                            onSubmit: ({ selectedPaymentMethod, formData }) => {
                            // callback llamado al hacer clic en el botón enviar datos
                            return new Promise((resolve, reject) => {
                                fetch("/process_payment", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(formData),
                                })
                                .then((response) => response.json())
                                .then((response) => {
                                    // recibir el resultado del pago
                                    resolve();
                                })
                                .catch((error) => {
                                    // manejar la respuesta de error al intentar crear el pago
                                    reject();
                                });
                            });
                            },
                            onError: (error) => {
                            // callback llamado para todos los casos de error de Brick
                            console.error(error);
                            },
                        },
                    };
                    window.paymentBrickController = await bricksBuilder.create(
                        "payment",
                        "paymentBrick_container",
                        settings
                    );
                };
                this.paymentCart().then(() => {
                    renderPaymentBrick(bricksBuilder);
                })
            }
        },
        mounted() {
            this.getPayment();
        },
        head() {
            return {
                title: "Checkout"
            }
        }
    };
</script>
