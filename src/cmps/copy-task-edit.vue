<template>
    <section v-if="task" class="copy-task-edit">
        <div class="copy-edit-header">
            <div>Copy card</div>
            <button @click.stop="closeEdit" class="trellicons x-icon"></button>
        </div>

        <form class="copy-edit-main">
            <label for="copy-input">Title</label>
            <textarea type="text" v-model="task.title" id="copy-input"></textarea>

            <select class="board-select" v-model="toBoardId">
                <option v-for="board in boards" :value="board._id">{{ board.title }}</option>
            </select>

            <select class="group-select" v-model="toGroupId">
                <option v-for="group in board.groups" :value="group.id">{{ group.title }}
                </option>
            </select>

            <button @click="createCard">Create card</button>
        </form>
    </section>
</template>

<script>
export default {
    created() {
        this.task = JSON.parse(JSON.stringify(this.getTask))
        this.toGroupId = ''
        this.toBoardId = ''
    },

    methods: {
        closeEdit() {
            this.$emit('closeEdit')
        },
        createCard() {
            delete this.task.id
            //TODOOOOOOO
            this.$emit('copyTask', { task: this.task, toGroupId: this.toGroupId, toBoardId: this.toBoardId })
        }
    },
    computed: {
        getTask() {
            return this.$store.getters.getEditedTask
        },
        boards() {
            return this.$store.getters.boards
        },
        board() {
            return this.$store.getters.board
        }
    }

}
</script>
