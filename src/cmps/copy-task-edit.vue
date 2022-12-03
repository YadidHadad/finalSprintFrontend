<template>
    <section v-if="task" class="copy-task-edit task-editor" @click.stop="">
        <button class="btn-close" @click.stop="closeEdit">
            <span class="trellicons x-icon"></span>
        </button>
        <div class="title">Copy task</div>

        <form class="copy-edit-main">
            <label for="copy-input">Title</label>
            <textarea type="text" v-model="task.title" id="copy-input"></textarea>

            <select class="board-select" v-model="toBoardId" @change="setBoard">
                <option v-for="board in getBoards" :value="board._id">{{ board.title }}</option>
            </select>

            {{ toBoardId }}

            <select class="group-select" v-model="toGroupId" @change="setGroup">
                <option v-for="group in board.groups" :value="group.id">{{ group.title }}
                </option>
            </select>

            {{ toGroupId }}
            <button class="btn-add" @click="copyTask">Create card</button>
        </form>
    </section>
</template>

<script>
export default {
    data() {
        return {
            toGroupId: '',
            toBoardId: '',
            // task: JSON.parse(JSON.stringify(this.getTask)),
            // toBoard: JSON.parse(JSON.stringify(this.getBoard)),
        }
    },
    created() {
        this.task = JSON.parse(JSON.stringify(this.getTask))
        this.board = JSON.parse(JSON.stringify(this.getBoard))
        this.group = JSON.parse(JSON.stringify(this.board))
        this.toGroupId = ''
        this.toBoardId = ''
    },

    methods: {
        closeEdit() {
            this.$emit('closeEdit')
        },
        copyTask() {
            delete this.task.id
            //TODOOOOOOO
            this.$emit('copyTask', { task: this.task, toGroupId: this.toGroupId, toBoardId: this.toBoardId })
        },
        setBoard() {
            this.board = this.getBoards.find(b => b._id === this.toBoardId)
            console.log(this.board);
        },
        setGroup() {
            this.group = this.board.groups.find(g => g.id === this.toGroupId)
            console.log(this.group);
        }
    },
    computed: {
        getTask() {
            return this.$store.getters.getEditedTask
        },
        getBoards() {
            return this.$store.getters.boards
        },
        getBoard() {
            return this.$store.getters.board
        },
        getGroups() {
            return this.board.groups
        }
    }

}
</script>
