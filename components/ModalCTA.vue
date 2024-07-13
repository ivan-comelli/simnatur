<template>
    <div>
      <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <h2>{{ title }}</h2>
          <p>{{ subtitle }}</p>
          <button @click="ctaAction">{{ ctaText }}</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    name: 'Modal',
    data() {
      return {
        title: '¿Tiene cuenta? Pase y Disfrute',
        subtitle: 'Para poder comprar necesitamos que entre a su cuenta',
        ctaText: 'Entrar'
      };
    },
    computed: {
      ...mapGetters({
        getStatusModal: 'getStatusModal'
      }),
      isModalOpen() {
        return this.getStatusModal;
      }
    },
    methods: {
      ...mapActions({
        closeModal: 'closeModal'
      }),
      ctaAction() {
        alert('CTA button clicked!');
        this.closeModal();
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 30em;
  }
  
  button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
  }
  
  button:hover {
    background-color: #35495e;
  }
  </style>
  