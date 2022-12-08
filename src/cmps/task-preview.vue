<template>
    <div v-if="getBackground" class="task-preview-cover" @click="goTo" :class="getCoverType"
        :style="{ backgroundColor: getBackground, backgroundImage: `url(${getBackground})` }"></div>
    <section class="task-preview-details flex column " @click="goTo">
        <section v-if="task.labelIds" class="labels-preview">
            <ul class="clean-list flex">
                <li :title="(label.title)" @click.stop="togglePreviewLabels" v-for="label in labels" :key="label.id"
                    :style="{ backgroundColor: label.color, height: isPreviewLabelsOpen ? '17px' : '', transition: isPreviewLabelsOpen ? 'all 0.7s' : 'all 0.7s', filter: !isPreviewLabelsOpen ? 'saturate(5)' : 'saturate(1.5)' }">
                    <div v-if="isPreviewLabelsOpen" :style="{ backgroundColor: label.color }" class="color-circle">
                    </div>
                    <span v-if="isPreviewLabelsOpen">{{ label.title }}</span>

                </li>
            </ul>
        </section>
        <div class="task-title">
            <h3>{{ task.title }}</h3>
        </div>
        <section class="task-preview-icons flex wrap justify-between gap2">
            <div class="flex row gap align-center">
                <div v-if="task.dueDate" class="task-date-preview flex">
                    <span class="trellicons icon-clock"></span>
                    <span class="date-str">{{ getDueDateStr }}</span>
                </div>
                <span v-if="task.description" class="trellicons desc-icon" title="This card has a description"></span>
                <div v-if="taskTodosLength" class="task-todos flex"
                    :style="{ backgroundColor: allTodosDone, color: allTodosDone ? '#fdfefd' : '' }" title="Checklist items">
                    <span class="trellicons checklist-icon"></span>
                    <span>{{ taskDoneTodos }}/{{ taskTodosLength }}</span>
                </div>
            </div>
            <!-- <section v-if="dueDateStr" class="dates-preview">
                <h4>Due date</h4>
                <div class="flex row">
                    <input type="checkbox" @change="toggleIsComplete" v-model="isComplete">
                    <button class="btn-date">{{ dueDateStr }}

                        <span v-if="isComplete" class="time-tag" :style="{ backgroundColor: '#61bd4f' }">complete</span>
                        <span v-else-if="dueDateMs < Date.now()" class="time-tag"
                            :style="{ backgroundColor: '#ec9488' }">overdue</span>

                    </button>
                </div>
            </section> -->
            <div class="flex row shrink justify-between grow">
                <div class=""></div>

                <members-preview v-if="task.memberIds" :memberIds="task.memberIds" :isTaskDetails="false"
                    class="members-task-preview justify-end"/>

            </div>
        </section>
    </section>
</template>
<script>

import membersPreview from './members-preview.vue'

export default {
    name: 'task-preview',
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
            isLabelsOpen: false,
            isComplete: false
        }
    },

    created() {
        this.taskLabelsIds = this.task.labelIds
        // this.getIsComplete ? this.isComplete = true : this.isComplete = false
        // console.log(this.isComplete);

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
            // console.log(this.taskTodos.length);
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
        },
        getDueDateStr() {
            return new Date(this.task.dueDate).toDateString().slice(4, 10)
        }

    }
}
</script>