<template>
    <section class="task-preview" @click="goTo">
        <div class="task-preview">
            <h3>{{ task.title }}</h3>
        </div>
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
            this.$router.push(`/board/${this.boardId}/task/${this.task.id}`)
        }
    },
}
</script>