<template>
    <section class="task-preview" @click="goTo">
        <div class="task-preview">
            <section class="labels-preview">
                <ul class="clean-list flex">
                    <li @click.stop="togglePreviewLabels" v-for="label in labels" :key="label.id"
                        :style="{ backgroundColor: label.color }">
                        <span v-if="isPreviewLabelsOpen">{{ label.title }}</span>
                    </li>
                </ul>
            </section>
            <h3>{{ task.title }}</h3>
        </div>
        <members-preview v-if="task.memberIds" :isTaskDetails="false" class="task-members" />
    </section>
</template>

<script>

import membersPreview from './members-preview.vue'

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

    components: {
        membersPreview
    },

    data() {
        return {
            taskLabelsIds: null,
            isLabelsOpen: false
        }
    },

    created() {
        this.taskLabelsIds = this.task.labelIds



    },

    methods: {
        goTo() {
            this.$router.push(`/board/${this.boardId}/${this.groupId}/${this.task.id}`)
        },
        togglePreviewLabels() {
            this.isLabelsOpen = !this.isLabelsOpen
            this.$store.commit({ type: 'togglePreviewLabels', isOpen: this.isLabelsOpen })
        }
    },

    computed: {
        labels() {
            if (!this.task.labelIds) return
            return this.$store.getters.board.labels.filter(labels => {
                if (this.task.labelIds.includes(labels.id))
                    return labels
            })
        },
        isPreviewLabelsOpen() {
            return this.$store.getters.isPreviewLabelsOpen
        }

    }
}
</script>