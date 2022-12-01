<template>
    <div class="group">
        <h1>{{ group.title }}</h1>
        <ul>
            <li v-for="task in group.tasks" :key="task.id">
                <task-preview :task="task" :boardId="boardId" />
            </li>
        </ul>
        <button v-if="!isCardOpen" @click="toggleCard"><span class="fa-regular plus-icon"></span> Add a card</button>
        <form v-if="isCardOpen" @submit.prevent="addTask" class="flex ">
            <input v-model="task.title" type="text" name="add-task" placeholder="Enter a title for this card...">
            <div class="add-list-btns">
                <button class="add-list-btn">Add card</button>
                <button type="button" @click.stop="toggleCard">X</button>
            </div>
        </form>
        <router-view :groupId="group.id"></router-view>
    </div>
</template>

<script>
import taskPreview from '../cmps/task-preview.vue'
import { utilService } from '../services/util.service.js';
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
    data() {
        return {
            isCardOpen: false,
            task: {
                id: '',
                title: '',
            },
            activity: {
                id: utilService.makeId(),
                txt: "Add new task",
                createdAt: Date.now(),
                byMember: 'Moshe',
                task: this.task
            }
        }
    },
    created() {
        // console.log(this.boardId)
    },
    methods: {
        toggleCard() {
            console.log(this.isCardOpen);
            this.isCardOpen = !this.isCardOpen
        },
        addTask() {
            this.$emit('addTask', this.group.id, { ...this.task }, { ...this.activity })
        }

    },
    computed: {

    },
    components: { taskPreview },
}
</script>

