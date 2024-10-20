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
                                    <h4 class="col">Componente</h4>
                                    <h4 class="col-2">Peso</h4>
                                    <h4 class="col-6">Descripcion</h4>
                                </li>
                                <li class="row" v-for="(value, key) in product.additional" :key="key">
                                    <strong class="col">{{ key }}</strong>
                                    <span class="col-2">{{ value.concentration }}</span>
                                    <p class="col-6">{{ value.description }}</p>
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
