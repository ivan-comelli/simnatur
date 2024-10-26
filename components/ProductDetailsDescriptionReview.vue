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
                            <table>
                                <thead>
                                    <tr>
                                        <th class="name"><h6 class="left">Componente</h6></th>
                                        <th class="weight"><h6>Peso</h6></th>
                                        <th><h6>Descripción</h6></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(value, key) in product.additional" :key="key">
                                        <td><strong>{{ key }}</strong></td>
                                        <td>{{ value.concentration }}</td>
                                        <td>{{ value.description }}</td>
                                    </tr>
                                </tbody>
                            </table>
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
