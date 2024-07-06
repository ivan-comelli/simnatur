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
    preference: null
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
    getPreference: state => state.preference
}

export const mutations =  {
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
    }
}

export const actions = {
    addToCartItem({ state, commit }, payload) {
      return new Promise((resolve, reject) => {
        if(state.auth.user) {
          commit('UPDATE_CART', payload);
          resolve();
        } else {
          const error = new Error("Usuario no autenticado");
          reject(error);
        }
      });
    },
    removeProductFromCart({ commit }, product) {
      commit('REMOVE_PRODUCT_FROM_CART', product);
    },
    decreaseProduct({ commit }, product) {
      commit('DECREASE_PRODUCT', product);
    },
    async addToWishlist({ state, commit }, payload) {
      try {
          await this.$axios.$post('/wishlist', payload.id);
          commit('ADD_TO_WISHLIST', payload);
      } catch {
        console.log("error")
      }
    },
    addToCompare({ commit }, payload) {
      commit('ADD_TO_COMPARE', payload);
    },
    removeProductFromWishlist({ commit }, product) {
      commit('REMOVE_PRODUCT_FROM_WISHLIST', product);
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
    }
}
