<template>
    <div class="description-review-area pb-90">
        <div class="container">
            <div class="description-review-wrapper">
                <div class="description-review-bottom">
                    <!--div class="tab-pane active">
                        <div class="product-description-wrapper">
                            <p>{{ product.description }}</p>
                        </div>
                    </div -->
                    <div class="tab-pane">
                        <div class="product-anotherinfo-wrapper">
                            <ul>
                                <li class="row">
                                    <span class="col-4">Componente</span>
                                    <span class="col-2">Concentracion</span>
                                    <span class="col-6">Descripcion</span>
                                </li>
                                <li class="row" v-for="(value, key) in product.additional" :key="key">
                                    <span class="col-4">{{ key }}</span>
                                    <span class="col-2">{{ value.concentration }}</span>
                                    <span class="col-6">{{ value.description }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['product']
    };
</script>
