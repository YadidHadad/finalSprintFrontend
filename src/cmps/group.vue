<template>
    <div class="group flex column">
        <h1>{{ group.title }}</h1>
        <ul>
            <li v-for="task in group.tasks" :key="task.id">
                <router-link :to="`/board/${boardId}/task/${task.id}`">
                    <task-preview :task="task"/>
                </router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
 import taskPreview from '../cmps/task-preview.vue'
export default {
    props: {
        group: {
            type: Object,
            required: true
        },
        boardId: {
            type: String
        }
    },
    created() {
        // console.log(this.boardId)
    },
    components: {taskPreview},
}
</script>

