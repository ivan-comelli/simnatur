<!-- components/GlobalImage.vue -->

<template>
    <img :src="$getHashedUrl(src)" :alt="altText">
  </template>
  
  <script>
  export default {
    props: {
      src: {
        type: String,
        required: true
      },
      altText: {
        type: String,
        default: ''
      }
    }
  };
  </script>
  