<template>
    <div class="blog-area container-fluid">
        <SectionTitleWithSubTitle title="NUESTROS ARTICULOS" classes="section-title mb-55" />
        <div class="adjust-row collage-grid">
            <div v-for="(blog, index) in blogData.slice(0, 3)" :key="index">
                <BlogItem :blog="blog" />
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    export default {
        components: {
            BlogItem: () => import('@/components/BlogItem')
        },
        computed: {
            ...mapGetters('blogs', ['getBlogs']),
            blogData() {
                return this.getBlogs
            }
        },
        created() {
            this.fetchBlogs();
        },
        methods: {
            ...mapActions('blogs', ['fetchBlogs'])
        }
    };
</script>