<template>
    <section class="board-nav" :style="style" :class="{ dark: isDark }">


        navbar
    </section>
</template>
<script>
export default {
    name: 'board-nav',
    props: ['color'],
    components: {},
    created() {

    },
    data() {
        return {
        }
    },
    methods: {},
    computed: {
        style() {
            if (!this.color) return false

            console.log(this.color.rgb)
            return { backgroundColor: this.color.rgb }
        },
        isDark() {
            if (!this.color) return false
            return this.color.isDark
        }
    },
}
</script>
