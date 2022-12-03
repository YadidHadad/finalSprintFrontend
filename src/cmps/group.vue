<template>
    <div class="group flex column">
        <div class="main-title flex justify-between">
            <h3>{{ group.title }}</h3>
            <button @click="toggleMenu"><span class="fa-solid elipsis-icon"></span></button>
            <div v-if="isMenuOpen" class="group-menu">
                <section class="title flex">
                    <span class="main-title">List actions</span>
                    <button @click="toggleMenu" class="btn"><span class="fa-solid x-icon"></span></button>
                </section>
                <div @click="removeGroup" class="remove btn"><span> Remove list</span></div>
            </div>
        </div>

        <ul class="clean-list flex column">
            <Container orientation="vertical" @drop="onDrop" group-name="group-tasks"
                :get-child-payload="getChildPayload" :drag-class="dragClass" :drop-class="dragClass">
                <Draggable v-for="(task, i) in group.tasks" :key="task.id">
                    <task-preview :task="task" :groupId="this.group.id" :boardId="boardId" />
                </Draggable>
            </Container>
        </ul>



        <button class="add-card-btn" v-if="!isCardOpen" @click="toggleCard">
            <span class="fa-regular plus-icon"></span><span>Add a card</span> 
        </button>
        <form v-if="isCardOpen" @submit.prevent="addTask" class="flex">
            <textarea v-model="currTask.title" type="textarea" name="add-task" rows="4"
                placeholder="Enter a title for this card..." v-focus></textarea>
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
import { Container, Draggable } from "vue3-smooth-dnd";
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
            currTask: {
                id: utilService.makeId(),
                title: '',
            },
            isMenuOpen: false

        }
    },

    created() {
        this.tasksCopy = JSON.parse(JSON.stringify(this.group.tasks || []))
    },

    methods: {
        async onDrop(dropResult) {
            try {
                this.tasksCopy = JSON.parse(JSON.stringify(this.group.tasks || []))
                this.tasksCopy = this.applyDrag(this.tasksCopy, dropResult);
                const newGroups = this.$store.dispatch({ type: 'updateTasks', payload: { tasks: this.tasksCopy, groupId: this.group.id } })
            }
            catch (prevGroups) {
                this.tasksCopy = JSON.parse(JSON.stringify(prevGroups))
            }
        },
        applyDrag(arr, dragResult) {
            const { removedIndex, addedIndex, payload } = dragResult;

            if (removedIndex === null && addedIndex === null) return arr;
            const result = [...arr];
            // console.log(result);
            let itemToAdd = payload;

            if (removedIndex !== null) {
                itemToAdd = result.splice(removedIndex, 1)[0];
            }
            if (addedIndex !== null && removedIndex !== null) {
                // console.log(itemToAdd);
                // console.log(itemToAdd.itemToMove);
                result.splice(addedIndex, 0, itemToAdd);
                // result.splice(addedIndex, 0, itemToAdd.itemToMove);
                // console.log(this.tasksCopy);
            }
            else if (addedIndex !== null) result.splice(addedIndex, 0, itemToAdd.itemToMove);
            return result;
        },
        getShouldAcceptDrop(index, sourceContainerOptions, payload) {
            return true;
        },
        getChildPayload(index) {
            console.log(this.tasksCopy);
            return {
                itemToMove: this.tasksCopy[index]
            }
        },

        toggleCard() {
            // console.log(this.isCardOpen);
            this.isCardOpen = !this.isCardOpen;
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
        addTask() {
            if (!this.currTask.title) return
            const activity = {
                id: '',
                txt: "Add new task",
                byMember: {
                    _id: this.user._id,
                    fullname: this.user.fullname,
                    imgUrl: this.user.imgUrl || '',
                },
                task: this.currTask
            }
            this.$emit('addTask', this.group.id, { ...this.currTask }, JSON.parse(JSON.stringify(activity)))
            this.currTask.title = ''
        },
        removeGroup() {
            this.toggleMenu
            const activity = {
                id: '',
                txt: ` Removed list ${this.group.title} `,
                byMember: {
                    _id: this.user._id,
                    fullname: this.user.fullname,
                    imgUrl: this.user.imgUrl || '',
                },
                task: this.currTask
            }
            this.$emit('removeGroup', this.group.id, JSON.parse(JSON.stringify(activity)))
        }

    },

    computed: {
        user() {
            return this.$store.getters.loggedinUser

        },
        dragClass() {
            return 'on-drag'
        }
    },
    components: { taskPreview, Container, Draggable },
};
</script>
