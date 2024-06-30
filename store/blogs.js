export const state = () => ({
    blogs: []
});

export const getters = {
    getBlogs: state => state.blogs
};

export const mutations = {
    SET_BLOG(state, blogs) {
        state.blogs = blogs;
    }
};

export const actions = {
    async fetchBlogs({ commit }) {
        try {
            const response = await this.$axios.$get('/blogs');
            commit('SET_BLOG', response);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    }
};
