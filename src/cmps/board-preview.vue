<template>
    <section class="board-preview">
        <h2>{{board.title}}</h2>
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
    components: {boardList},
    // created() {
    //     console.log(this.board)
    // },

}
</script>