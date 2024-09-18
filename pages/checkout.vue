<template>
    <div class="cart-page-wrapper">
        <TheHeader />
        
        <!-- checkout section start -->
        <div class="checkout-area pt-95 pb-100">
            <div class="container">
                <div class="row" v-if="products.length > 0">
                    <div id="faq" class="accordion col">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingOne">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#my-account-1" aria-expanded="true" aria-controls="my-account-1">
                                    1. Tu Información Personal
                                </button>
                            </h2>
                            <div id="my-account-1" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faq">
                                <div class="accordion-body">
                                    <div class="myaccount-info-wrapper">
                                        <div class="account-info-wrapper">
                                            <h4>Mi Información de Cuenta</h4>
                                            <h5>Tus Detalles Personales</h5>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-6 col-md-6">
                                                <div class="billing-info">
                                                    <label>Nombre</label>
                                                    <input v-model="name" type="text" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6">
                                                <div class="billing-info">
                                                    <label>Apellido</label>
                                                    <input v-model="lastName" type="text" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-lg-12 col-md-12">
                                                <div class="billing-info">
                                                    <label>Correo Electrónico</label>
                                                    <input v-model="email" type="email" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6">
                                                <div class="billing-info">
                                                    <label>Teléfono</label>
                                                    <input v-model="telefone" type="text" class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-lg-6 col-md-6">
                                                <div class="billing-info">
                                                    <label>DNI</label>
                                                    <input v-model="document" type="text" class="form-control">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="billing-back-btn">
                                            <div class="billing-back">
                                                <a href="#"><i class="fa fa-arrow-up"></i> Atrás</a>
                                            </div>
                                            <div class="billing-btn">
                                                <button type="submit" class="btn btn-primary">Continuar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingTwo">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#my-account-2" aria-expanded="false" aria-controls="my-account-2">
                                    2. Tu Orden
                                </button>
                            </h2>
                            <div id="my-account-2" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faq">
                                <div class="accordion-body">
                                    <div class="your-order-area">
                                        <div class="your-order-wrap gray-bg-4">
                                            <div class="your-order-product-info">
                                                <div class="your-order-top">
                                                    <ul class="list-group list-group-horizontal">
                                                        <li class="list-group-item">Producto</li>
                                                        <li class="list-group-item">Total</li>
                                                    </ul>
                                                </div>
                                                <div class="your-order-middle">
                                                    <ul class="list-group">
                                                        <li v-for="(product, index) in products" :key="index" class="list-group-item">
                                                            <span class="order-middle-left">{{ product.title }} X {{ product.cartQuantity }}</span>
                                                            <span class="order-price">${{ product.total.toFixed(2) }}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div class="your-order-bottom">
                                                    <ul class="list-group list-group-horizontal">
                                                        <li class="list-group-item">Envío</li>
                                                        <li class="list-group-item">Envío Gratis</li>
                                                    </ul>
                                                </div>
                                                <div class="your-order-total">
                                                    <ul class="list-group list-group-horizontal">
                                                        <li class="list-group-item">Total</li>
                                                        <li class="list-group-item">${{ total.toFixed(2) }}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="accordion-item">
                            <h2 class="accordion-header" id="headingThree">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#my-account-3" aria-expanded="false" aria-controls="my-account-3">
                                    3. Verifica dónde recibir tu compra
                                </button>
                            </h2>
                            <div id="my-account-3" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faq">
                                <div class="accordion-body">
                                    <div class="myaccount-info-wrapper">
                                        <div class="account-info-wrapper">
                                            <h4>Address Book Entries</h4>
                                        </div>
                                        <div class="entries-wrapper">
                                            <div class="row">
                                                <div class="col-md-6 d-flex align-items-center justify-content-center">
                                                    <div class="entries-info text-center">
                                                        <p>Keith L. Castro</p>
                                                        <p>559 Pratt Avenue</p>
                                                        <p>Orchards, WA 98662</p>
                                                    </div>
                                                </div>
                                                <div class="col-md-6 d-flex align-items-center justify-content-center">
                                                    <div class="entries-edit-delete text-center">
                                                        <button class="btn btn-secondary">Edit</button>
                                                        <button class="btn btn-danger">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="billing-back-btn">
                                            <div class="billing-back">
                                                <a href="#"><i class="fa fa-arrow-up"></i> Atrás</a>
                                            </div>
                                            <div class="billing-btn">
                                                <button type="submit" class="btn btn-primary">Continuar</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="place-order col-lg-6 col-12">
                        <div id="paymentBrick_container"></div>
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
        data() {
            return {
                name: "",
                lastName: "",
                email: "",
                phone: "",
                document: "",
                birthday: "",
                addressBook: {
                    detail: "",
                    street: "",
                    city: ""
                }
            }
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
            user() {
                return this.$store.getters.auth.getUser
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
