<template>
    <section class="board-preview" >
        <span class="trellicons icon-starred"></span>
        <!-- <h2>{{ board.title }}</h2> -->
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
            if (style?.backgroundImage || style?.backgroundColor)
                return { backgroundImage: `url(${style.backgroundImage || style.backgroundColor})` }
        }
    },
    components: { boardList },
    // created() {
    //     console.log(this.board)
    // },

}
</script>