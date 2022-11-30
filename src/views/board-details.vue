<template>
    <section class="board" v-if="board">
        <board-header :board-header="board.title" />
        <group-list @addGroup="addNewGroup" :groups="board.groups" />
    </section>
</template>

<script>
import { boardService } from '../services/board.service.local'
import boardHeader from '.././cmps/board-header.vue'
import groupList from '../cmps/group-list.vue'
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
    methods: {
        addNewGroup(group) {
            this.board.groups.push(group)
            this.$store.dispatch({ type: 'addBoard', board: { ...this.board } })
        }
    },
    components: {
        boardHeader,
        groupList
    }
}
</script>