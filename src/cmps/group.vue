<template>
    <div class="group flex column">
        <div class="flex justify-between">
            <h3>{{ group.title }}</h3>
            <span class="fa-solid elipsis-icon"></span>
        </div>
        <ul class="clean-list flex column">
            <li v-for="task in group.tasks" :key="task.id">
                <task-preview :task="task" :groupId="this.group.id" :boardId="boardId" />
            </li>
        </ul>

        <button class="add-card-btn" v-if="!isCardOpen" @click="toggleCard">
            <span class="fa-regular plus-icon"></span> Add a card
        </button>
        <form v-if="isCardOpen" @submit.prevent="addTask" class="flex">
            <textarea v-model="task.title" type="textarea" name="add-task" rows="4"
                placeholder="Enter a title for this card..."></textarea>
            <div class="add-list-btns flex">
                <button class="add-list-btn">Add card</button>
                <button type="button" @click.stop="toggleCard">
                    <span class="fa-solid x-icon"></span>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import taskPreview from "../cmps/task-preview.vue";
import { utilService } from "../services/util.service.js";
export default {
    props: {
        group: {
            type: Object,
            required: true,
        },
        boardId: {
            type: String,
        },
    },
    data() {
        return {
            isCardOpen: false,
            task: {
                id: "",
                title: "",
            },
            activity: {
                id: utilService.makeId(),
                txt: "Add new task",
                createdAt: Date.now(), //change this in the service
                byMember: "Moshe",
                task: this.task,
            },
        };
    },
    created() { },
    methods: {
        toggleCard() {
            console.log(this.isCardOpen);
            this.isCardOpen = !this.isCardOpen;
        },
        addTask() {
            this.$emit("addTask", this.group.id, { ...this.task }, { ...this.activity });
        },
    },
    computed: {},
    components: { taskPreview },
};
</script>
