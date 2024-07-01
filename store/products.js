export const state = () => ({
    products: []
})

export const getters = {
    getProducts: state => state.products,
    getNewProducts: state => state.products.filter(item => item.new),
    getBestProducts: state => state.products.filter(item => item.best),
    getSaleProducts: state => state.products.filter(item => item.discount),
    categoryList: state => ["all categories", ...new Set(state.products.map(product => product.category).flat())],
    tagList: state => [...new Set(state.products.map(product => product.tag).flat())],
    sizeList: state => ["all sizes", ...new Set(state.products.map(product => product.variation?.sizes).flat())].filter(Boolean),
    colorList: state => ["all colors", ...new Set(state.products.map(product => product.variation?.color).flat())].filter(Boolean)
}

export const mutations = {
    SET_PRODUCT(state, products) {
        state.products = products;
    }
}

export const actions = {
    async fetchProducts({ commit }) {
        try {
            const response = await this.$axios.$get('/products');
            commit('SET_PRODUCT', response);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
}