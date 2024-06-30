export const state = () => ({
    user: null,
})
  
export const getters = {
    getUser: state => state.user,
};
  
export const mutations = {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
};
  
export const actions = {
    async login({ commit }, { email, password }) {
      try {
        const response = await this.$axios.$post('/api/auth/login', { email, password });
        localStorage.setItem('token', response.token);
        commit('SET_USER', response.user);
      } catch (error) {
        console.error('Error during login:', error);
      }
    },
  
    async register({ commit }, userData) {
      try {
        const response = await this.$axios.$post('/api/auth/signup', userData);
        commit('SET_USER', response);
      } catch (error) {
        console.error('Error registering user:', error);
        throw error;
      }
    },
  
    async fetchUser({ commit }) {
      try {
        const response = await this.$axios.$get('/api/auth/me');
        commit('SET_USER', response.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    },
  
    async logout({ commit }) {
      try {
        const response = await this.$axios.$post('/api/auth/logout');
        commit('CLEAR_USER');
        localStorage.removeItem('token');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    },
};
  