<template>
    <section v-if="color" class="board-nav" :style="style" :class="{ dark: isDark }">


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
            isDark: this.color.isDark
        }
    },
    methods: {},
    computed: {
        style() {

            console.log(this.color.rgb)
            return { backgroundColor: this.color.rgb }
        }
    },
}
</script>
