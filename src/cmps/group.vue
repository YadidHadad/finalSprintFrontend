<template>
    <div class="group flex column">
        <div class="main-title flex justify-between">
            <input v-model="newGroupTitle" @input="updateGroup(this.newGroupTitle)" />
            <button @click="toggleMenu"><span class="fa-solid elipsis-icon"></span></button>
            <div v-if="isMenuOpen" class="group-menu">
                <section class="title flex">
                    <span class="main-title">List actions</span>
                    <button @click="toggleMenu" class="btn"><span class="fa-solid x-icon"></span></button>
                </section>
                <div @click="removeGroup" class="remove btn"><span> Remove list</span></div>
            </div>
        </div>

        <Container class="task-preview-container flex column" orientation="vertical" @drop="onDrop"
            group-name="group-tasks" :get-child-payload="getChildPayload" :drag-class="dragClass"
            :drop-class="dragClass">
            <Draggable id="task-preview" v-for="(task, i) in group.tasks" :key="i">
                <task-preview :task="task" :groupId="this.group.id" :boardId="boardId" />
            </Draggable>
            <div class="add-card-container">
                <button class="add-card-btn" v-if="!isCardOpen" @click="toggleCard">
                    <span class="fa-regular plus-icon"></span><span>Add a card</span>
                </button>
                <form class="add-card-form flex" v-if="isCardOpen" @submit.prevent="addTask">
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
        </Container>
    </div>
</template>

<script>
import taskPreview from "../cmps/task-preview.vue";
import { utilService } from "../services/util.service.js";
import { Container, Draggable } from "vue3-smooth-dnd";
import copyTaskEdit from './copy-task-edit.vue';
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
            isMenuOpen: false,
            newGroupTitle: JSON.parse(JSON.stringify(this.group.title))

        }
    },

    async created() {
        this.tasksCopy = JSON.parse(JSON.stringify(this.group.tasks || []))
        try {
            this.debounceHandler = utilService.debounce(this.updateGroup, 200)

        } catch (err) {
            console.log(err);
        }
    },

    methods: {
        async onDrop(dropResult) {
            try {
                this.tasksCopy = JSON.parse(JSON.stringify(this.group.tasks || []))
                this.tasksCopy = this.applyDrag(this.tasksCopy, dropResult);
                const tasks = await this.$store.dispatch({ type: 'updateTasks', payload: { tasks: this.tasksCopy, groupId: this.group.id } })
                this.tasksCopy = JSON.parse(JSON.stringify(this.group.tasks || []))
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
        updateGroup() {
            const activity = {
                id: '',
                txt: `Update Group: ${this.group.title}`,
                byMember: {
                    _id: this.user._id,
                    fullname: this.user.fullname,
                    imgUrl: this.user.imgUrl || '',
                },
                // task: this.task
            }
            if (!this.group.title) return
            const group = JSON.parse(JSON.stringify(this.group))
            group.title = this.newGroupTitle
            console.log('hgfhgfhgfdgfdgfdgd');
            this.$emit('updateGroup', group, activity)
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
    components: { taskPreview, Container, Draggable, copyTaskEdit },
};
</script>
