<template>
    <section class="task-preview" @click="goTo">
        <div class="task-preview">
            <section class="labels-preview">
                <ul class="clean-list flex">
                    <li v-for="label in labels" :key="label.id" :style="{ backgroundColor: label.color }"><span
                            v-if="label.title">{{ label.title }}</span></li>
                </ul>
            </section>
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
        groupId: {
            type: String,
            required: true
        },
        boardId: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            taskLabelsIds: null
        }
    },

    created() {
        this.taskLabelsIds = this.task.labelIds
    },

    methods: {
        goTo() {
            this.$router.push(`/board/${this.boardId}/${this.groupId}/${this.task.id}`)
        }
    },

    computed: {
        labels() {
            const labels = this.$store.getters.labels
            if (!labels) return
            if (!this.taskLabelsIds) return
            console.log(this.task);
            console.log(this.taskLabelsIds);
            const newLabels = labels.filter((label) => {
                if (this.taskLabelsIds.includes(label.id)) return label
            })
            console.log('newLabels', newLabels)
            if (!newLabels) return
            return newLabels
        }

    }
}
</script>