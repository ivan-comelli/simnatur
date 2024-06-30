<template>
    <div class="slider-book-store res-mrg-md-mb nav-style-1">
        <swiper :options="sliderOption">
            <swiper-slide class="single-slider-2 slider-height-18 d-flex align-items-center bg-img slider-overly-res" :style="{ backgroundImage:'url(/img/slider/slider-11.jpg)' }">
                <div class="slider-content-18 ml-70 slider-animation-1">
                    <h3>New Arrivals</h3>
                    <h1>Book Shop <br>Find Your Book</h1>
                    <div class="slider-btn-9 btn-hover">
                        <n-link to="/shop">SHOP NOW</n-link>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide class="single-slider-2 slider-height-18 d-flex align-items-center bg-img slider-overly-res" :style="{ backgroundImage:'url(/img/slider/slider-11-2.jpg)' }">
                <div class="slider-content-18 ml-70 slider-animation-1">
                    <h3 class="animated">New Arrivals</h3>
                    <h1 class="animated">Book Shop <br>Find Your Book</h1>
                    <div class="slider-btn-9 btn-hover">
                        <n-link to="/shop">SHOP NOW</n-link>
                    </div>
                </div>
            </swiper-slide>
            <!-- Swiper Navigation Start -->
            <div class="hero-slider-nav swiper-button-prev">
                <i class="pe-7s-angle-left"></i>
            </div>
            <div class="hero-slider-nav swiper-button-next">
                <i class="pe-7s-angle-right"></i>
            </div>
            <!-- Swiper Navigation End -->
        </swiper>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sliderOption: {
                    loop: true,
                    speed: 750,
                    autoplay: {
                        delay: 6000
                    },
                    effect: "fade",
                    fadeEffect: { 
                        crossFade: true 
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                }
            }
        },
    };
</script>