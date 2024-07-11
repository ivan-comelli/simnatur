<template>
    <div class="slider-banner-area">
        <div class="container">
            <div class="row flex-row-reverse">
                <div class="col-lg-8 col-md-12">
                    <HeroSliderBookStore />
                </div>
                <div class="col-lg-4 col-md-12">
                    <div class="row">
                        <div class="col-lg-12 col-md-6 col-sm-6">
                            <div class="single-banner mb-30">
                                <n-link to="/shop">
                                    <GlobalImage src="/img/banner/banner-38.png" alt="banner image" />
                                </n-link>
                                <div class="banner-content banner-pink">
                                    <h3>Book</h3>
                                    <h4>Starting at <span>$99.00</span></h4>
                                    <n-link to="/shop">
                                        <i class="fa fa-long-arrow-right"></i>
                                    </n-link>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-12 col-md-6 col-sm-6">
                            <div class="single-banner mb-30">
                                <n-link to="/shop">
                                    <GlobalImage src="/img/banner/banner-39.png" alt="banner image" />
                                </n-link>
                                <div class="banner-content banner-pink">
                                    <h3>Book</h3>
                                    <h4>Starting at <span>$79.00</span></h4>
                                    <n-link to="/shop">
                                        <i class="fa fa-long-arrow-right"></i>
                                    </n-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {

    };
</script>