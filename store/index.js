import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const myMiddleware = store => {
  store.subscribeAction((action, state) => {
    // Aquí puedes ejecutar código antes de que cada acción se ejecute
    console.log(`Action ${action.type} dispatched`);
  });
};

export const plugins = [myMiddleware];

export const state = () => ({
    cart: [],
    wishlist: [],
    compare: [],
    preference: null,
    statusModal: false
})

export const getters = {
    getCart: state => state.cart,
    cartItemCount: state => state.cart.length,
    getWishlist: state => state.wishlist,
    wishlistItemCount: state => state.wishlist.length,
    getCompare: state => state.compare,
    compareItemCount: state => state.compare.length,
    getTotal: state => {
      let total = 0;
      state.cart.forEach(item => {
        let price = item.discount ? item.price - (item.price * item.discount / 100) : item.price;
        total += price * item.cartQuantity;
      });
      return total;
    },
    getPreference: state => state.preference,
    getStatusModal: state => state.statusModal
}

export const mutations =  {
    SET_CART(state, payload) {
      state.cart = payload;
    },
    UPDATE_CART(state, payload) {
      const item = state.cart.find(el => payload.id === el.id);
      if (item) {
        const price = item.discount ? item.price - (item.price * item.discount / 100) : item.price;
        item.cartQuantity = item.cartQuantity + payload.cartQuantity;
        item.total = item.cartQuantity * price;
      } else {
        const price = payload.discount ? payload.price - (payload.price * payload.discount / 100) : payload.price;
        state.cart.push({ ...payload, cartQuantity: payload.cartQuantity, total: price });
      }
    },
    REMOVE_PRODUCT_FROM_CART(state, product) {
      state.cart = state.cart.filter(item => product.id !== item.id);
    },
    DECREASE_PRODUCT(state, payload) {
      const found = state.cart.find(el => payload.id === el.id);
      const price = found.discount ? found.price - (found.price * found.discount / 100) : found.price;
      found.cartQuantity = found.cartQuantity - payload.cartQuantity;
      found.total = found.cartQuantity * price;
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    ADD_TO_WISHLIST(state, product) {
      const item = state.wishlist.find(el => product.id === el.id);
      if (item) return;
      state.wishlist.push(product);
    },
    REMOVE_PRODUCT_FROM_WISHLIST(state, product) {
      state.wishlist = state.wishlist.filter(item => product.id !== item.id);
    },
    ADD_TO_COMPARE(state, product) {
      const item = state.compare.find(el => product.id === el.id);
      if (item) return;
      state.compare.push(product);
    },
    REMOVE_FROM_COMPARE(state, product) {
      state.compare = state.compare.filter(item => product.id !== item.id);
    },
    UPDATE_PREFERENCE(state, id) {
      state.preference = id;
    },
    UPDATE_WISHLIST(state, products) {
      state.wishlist = products;
    },
    UPDATE_STATUS_MODAL(state, status) {
      state.statusModal = status;
    }
}

export const actions = {
    addToCartItem({ state, commit }, payload) {
      return new Promise(async (resolve, reject) => {
        try {
            if (state.auth.user) {
                await this.$axios.$post('/cart', { id: payload.id });
                commit('UPDATE_CART', payload);
                resolve();
            } else {
                const error = new Error("Usuario no autenticado");
                reject(error);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            reject(error);
        }
      });
    },
    async removeProductFromCart({ commit }, product) {
      try {
        const response = await this.$axios.$delete('/cart/' + product.id);
        commit('REMOVE_PRODUCT_FROM_CART', product);
      }catch (error) {
        console.error('Error deleting cart:', error.message);
      }
    },
    decreaseProduct({ commit }, product) {
      commit('DECREASE_PRODUCT', product);
    },
    async addToWishlist({ state, commit }, payload) {
      return new Promise(async (resolve, reject) => {
          try {
              if (state.auth.user) {
                  await this.$axios.$post('/wishlist', { id: payload.id });
                  commit('ADD_TO_WISHLIST', payload);
                  resolve();
              } else {
                  const error = new Error("Usuario no autenticado");
                  reject(error);
              }
          } catch (error) {
              console.error("Error adding to wishlist:", error);
              reject(error);
          }
      });
    },
    async fetchWishList({ commit, state }) {
      try {
        if (!state.auth.user) {
          throw new Error('No user found');
        }
        const response = await this.$axios.$get('/wishlist');
        commit('UPDATE_WISHLIST', response.data)
      } catch (error) {
        console.error('Error fetching wishlist:', error.message);
      }
    },
    async fetchCart({ commit, state }) {
      try {
        if (!state.auth.user) {
          throw new Error('No user found');
        }
        const response = await this.$axios.$get('/cart');
        commit('SET_CART', response.data)
      } catch (error) {
        console.error('Error fetching cart:', error.message);
        commit('SET_CART', [])
      }
    },
    addToCompare({ commit }, payload) {
      commit('ADD_TO_COMPARE', payload);
    },
    async removeProductFromWishlist({ commit }, product) {
      try {
        const response = await this.$axios.$delete('/wishlist/' + product.id);
        commit('REMOVE_PRODUCT_FROM_WISHLIST', product);
      }catch (error) {
        console.error('Error deleting wishlist:', error.message);
      }
    },
    removeFromCompare({ commit }, product) {
      commit('REMOVE_FROM_COMPARE', product);
    },
    async paymentCart({ commit, state }) {
      try {
        const response = await this.$axios.$post('/checkout/create-order', state.cart);
        commit('UPDATE_PREFERENCE', response);
      } catch (error) {
        console.error('Error during nuxtServerInit:', error);
      }
    },
    openModal({ commit }) {
      commit('UPDATE_STATUS_MODAL', true);
    },
    closeModal({ commit }) {
      commit('UPDATE_STATUS_MODAL', false);
    }
}
