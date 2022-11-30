<template>
    <section class="task-preview" @click="goTo">
        <h2>{{ task.title }}</h2>
    </section>
</template>

<script>
export default {
    props: {
        task: {
            type: Object,
            required: true
        },
        boardId: {
            type: String
        }
    },
    data() {
        return {

        }
    },
    methods: {
        goTo() {
            this.$store.commit({ type: 'setEditedTask', taskId: this.task.id })
            this.$router.push(`/board/${this.boardId}/task/${this.task.id}`)
        }
    },
}
</script>