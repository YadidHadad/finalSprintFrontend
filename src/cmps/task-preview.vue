<template>
    <section class="task-preview flex column" @click="goTo">
        <div v-if="getBackground" :class="getCoverType"
            :style="{ backgroundColor: getBackground, backgroundImage: `url(${getBackground})` }"></div>
        <section class="labels-preview">
            <ul class="clean-list flex">
                <li @click.stop="togglePreviewLabels" v-for="label in labels" :key="label.id"
                    :style="{ backgroundColor: label.color }">
                    <span v-if="isPreviewLabelsOpen">{{ label.title }}</span>
                </li>
            </ul>
        </section>
        <h3>{{ task.title }}</h3>
        <section class="task-preview-icons flex">
            <div v-if="taskTodosLength" class="task-todos flex" :style="{ backgroundColor: allTodosDone }">
                <span class="trellicons checklist-icon"></span>
                <span>{{ taskDoneTodos }}/{{ taskTodosLength }}</span>
            </div>
            <members-preview v-if="task.memberIds" :memberIds="task.memberIds" :isTaskDetails="false"
                class="task-members-preview" />
        </section>
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
        },

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
        },

        taskTodos() {
            const taskTodos = []
            if (this.task.checklists) {
                this.task.checklists.forEach(checklist => {
                    if (checklist.todos) {
                        checklist.todos.forEach(todo => {
                            taskTodos.push(todo)
                        })
                    }
                })
            }
            return taskTodos
        },

        taskDoneTodos() {
            const doneTodos = this.taskTodos.filter(todo => todo.isDone)
            return doneTodos.length
        },

        taskTodosLength() {
            console.log(this.taskTodos.length);
            return this.taskTodos.length
        },

        getBackground() {
            if (this.task.style?.bgColor) {
                return this.task.style.bgColor
            } else if (this.task.style?.imgUrl) {
                return this.task.style.imgUrl
            }
        },

        allTodosDone() {
            if (this.taskTodosLength === this.taskDoneTodos)
                return '#61bd4f'
        },
        getCoverType() {
            if (this.getBackground === this.task.style.bgColor)
                return 'background-color'
            else {
                return 'background-img'
            }
        }

    }
}
</script>