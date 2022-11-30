<template>
    <section class="board-details" v-if="board">
        <h1>{{board.title}}</h1>
    </section>
</template>

<script>
import { boardService } from '../services/board.service.local'
export default {
    data() {
        return {
            board: null
        }
    },
    async created() {
        const { id } = this.$route.params
        this.board = await boardService.getById(id)
    },
}
</script>