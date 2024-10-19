<template>
    <div class="cart-page-wrapper">
        <TheHeader />
        
        <!-- checkout section start -->
        <div class="checkout-area pt-95 pb-100 magicpattern">
            <div class="container">
                <div v-if="isPayment == false" class="row">
                    <div class="col-8">
                        <div class="row">
                            <h3>Datos Personales</h3>
                        </div>
                        <div class="row">
                            <h4>Nombre Completo</h4>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <input type="text">
                            </div>
                            <div class="col-6">
                                <input type="text">
                            </div>
                        </div>
                        <div class="row">
                            <h4>Numero de Documento</h4>
                        </div>
                        <div class="row">
                            <div class="col">
                                <input type="text">
                            </div>
                        </div>
                        <div class="row">
                            <h4>Telefono de Contacto</h4>
                        </div>
                        <div class="row">
                            <div class="col">
                                <input type="text">
                            </div>
                            <div class="col-9">
                                <input type="text">
                            </div>
                        </div>
                        <div class="row">
                            <h4>Domicilio de Entrega</h4>
                        </div>
                        <div class="row">
                            <div class="col">
                                <input type="text">
                            </div>
                            <div class="col-8">
                                <input type="text">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <input type="text">
                            </div>
                            <div class="col">
                                <input type="text">
                            </div>
                        </div>
                        <div class="row">
                            <button @click="getPayment">
                                Continuar
                            </button>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="order-area">
                            <div class="order-product-info">
                                <div class="order-top">
                                    <h3 class="">Producto</h3>
                                    <h3 class="">Total</h3>
                                </div>
                                <div class="order-middle">
                                    <ul class="list-group">
                                        <li v-for="(product, index) in detailCart.listProducts" :key="index" class="list-group-item">
                                            <span class="order-middle-left">{{ product.name }} X {{ product.qantity }}</span>
                                            <span class="order-price">${{ product.total.toFixed(2) }}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div class="order-bottom">
                                    <ul class="list-group list-group-horizontal">
                                        <li class="list-group-item">Envío</li>
                                        <li class="list-group-item">Envío Gratis</li>
                                    </ul>
                                </div>
                                <div class="order-total">
                                    <ul class="list-group list-group-horizontal">
                                        <li class="list-group-item">Total</li>
                                        <li class="list-group-item">${{ totalToPay.toFixed(2) }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
                <div class="row" v-else>
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
                isPayment: false
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

                this.isPayment = true;
            }
        },
        mounted() {
            
        },
        head() {
            return {
                title: "Checkout"
            }
        }
    };
</script>
