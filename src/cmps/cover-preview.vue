<template>
    <section class="cover-preview" :style="coverStyle">
        <img :src="coverStyle">
        <h1>Cover</h1>
    </section>
</template>

<script>
export default {
    props: {
        coverBcg: {
            type: String,
            required: true
        }
    },
    computed: {
        coverStyle() {
            console.log(this.coverBcg);
            // return this.coverBcg ?  { backgroundImage: `url(${this.coverBcg})` } : ''
            // return { backgroundImage: `url(${this.coverBcg.imgUrl})` }
            return this.coverBcg.imgUrl
        }
    }
}
</script>