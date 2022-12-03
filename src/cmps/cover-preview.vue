<template>
    <section class="cover-preview" :style="bgcStyle">
        <!-- <img :src="coverStyle"> -->
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
        },
        bgcStyle() {
            console.log(this.coverBcg);
            // return this.coverBcg ?  { backgroundImage: `url(${this.coverBcg})` } : ''
            // return { backgroundImage: `url(${this.coverBcg.imgUrl})` }

            if (this.style.imgUrl) return { backgroundImage: `url(${this.coverBcg.imgUrl})` }
            if (this.style.bgColor) return { backgroundColor: `${this.coverBcg.bgColor}` }

        }
    }
}
</script>