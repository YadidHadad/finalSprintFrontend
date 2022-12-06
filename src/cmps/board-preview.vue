<template>
    <section class="board-preview">
        <img :src="getBoardBc">
        <span class="trellicons star" @click.stop="toggleStar"></span>
        <div class="board-title">{{ board.title }}</div>
        <!-- <group-list :group="board.groups"/> -->
    </section>
</template>

<script>
import boardList from './board-list.vue';
export default {
    name: 'board-preview',
    props: {
        board: Object,
    },
    computed: {
        getBoardBc() {
            const style = { ...this.board.style }
            // console.log(style);
            if (style.backgroundImage)
                return style.backgroundImage
            // return { backgroundImage: `url(${style.backgroundImage})` }
            else {
                style.backgroundColor
                // return { backgroundColor: style.backgroundColor }
            }
        },
        toggleStar() {
            this.$emit('toggleStar')
        }
    },
    components: { boardList },
    // created() {
    //     console.log(this.board)
    // },

}
</script>