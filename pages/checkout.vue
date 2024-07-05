<template>
    <div class="cart-page-wrapper">
        <TheHeader />
        
        <!-- checkout section start -->
        <div class="checkout-area pt-95 pb-100">
            <div class="container">
                <div class="row" v-if="products.length > 0">
                    <div class="col-lg-7">
                        <div class="billing-info-wrap">
                            <h3>Detalles de Compra</h3>
                            <div class="row">
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>Nombre</label>
                                        <input type="text">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>Apellido</label>
                                        <input type="text">
                                    </div>
                                </div>               
                                <div class="col-lg-12">
                                    <div class="billing-info mb-20">
                                        <label>Direccion</label>
                                        <input class="billing-address" placeholder="Nombre de calle y numero" type="text">
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="billing-info mb-20">
                                        <label>Ciudad</label>
                                        <input type="text">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>Provincia</label>
                                        <input type="text">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>Codigo Postal</label>
                                        <input type="text">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>Telefono</label>
                                        <input type="text">
                                    </div>
                                </div>
                                <div class="col-lg-6 col-md-6">
                                    <div class="billing-info mb-20">
                                        <label>Correo Electronico</label>
                                        <input type="text">
                                    </div>
                                </div>
                            </div>
                            <div class="additional-info-wrap">
                                <h4>Informacion Adicional</h4>
                                <div class="additional-info">
                                    <label>Nota</label>
                                    <textarea placeholder="Notas sobre tu orden, EJ. Nota importante para el delivery. " name="message"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="your-order-area">
                            <h3>Tu Orden</h3>
                            <div class="your-order-wrap gray-bg-4">
                                <div class="your-order-product-info">
                                    <div class="your-order-top">
                                        <ul>
                                            <li>Producto</li>
                                            <li>Total</li>
                                        </ul>
                                    </div>
                                    <div class="your-order-middle">
                                        <ul>
                                            <li v-for="(product, index) in products" :key="index">
                                                <span class="order-middle-left">{{ product.title }}  X  {{ product.cartQuantity }}</span> <span class="order-price">${{ product.total.toFixed(2) }}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="your-order-bottom">
                                        <ul>
                                            <li class="your-order-shipping">Envio</li>
                                            <li>Envio Gratis</li>
                                        </ul>
                                    </div>
                                    <div class="your-order-total">
                                        <ul>
                                            <li class="order-total">Total</li>
                                            <li>${{ total.toFixed(2) }}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="place-order mt-25">
                                <div id="paymentBrick_container"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row" v-else>
                    <div class="col-12">
                        <div class="empty-cart text-center">
                            <div class="icon">
                                <i class="pe-7s-cash"></i>
                            </div>
                            <h4>No productos en el carrito para pagar.</h4>
                            <n-link to="/shop" class="empty-cart__button">Comprar Ahora</n-link>
                        </div>
                    </div>
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
        computed: {
            preference() {
                return this.$store.getters.getPreference
            },
            products() {
                return this.$store.getters.getCart
            },

            total() {
                return this.$store.getters.getTotal
            },
        },
        methods: {
            ...mapActions(['paymentCart'])
        },
        mounted() {
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
                console.log("aquie")
                renderPaymentBrick(bricksBuilder);
            })
        },
        head() {
            return {
                title: "Checkout"
            }
        },
    };
</script>
