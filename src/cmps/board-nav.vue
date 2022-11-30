<template>
    <section v-if="color" class="board-nav" :style="style">
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
        return {}
    },
    methods: {},
    computed: {
        style() {



            console.log(this.color)
            return { backgroundColor: this.color.rgb } || { backgroundColor: white }
        }
    },
}
</script>
