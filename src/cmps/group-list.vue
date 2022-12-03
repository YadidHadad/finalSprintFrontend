<template>
    <section class="group-list flex">
        <Container orientation="horizontal" @drop="onDrop" group-name="group-lists" :get-child-payload="getChildPayload"
            :drag-class="dragClass" :drop-class="dragClass">
            <Draggable v-for="(group, i) in groups" :key="group.id">
                <group @addTask="addTask" @removeGroup="$emit('removeGroup', $event)" :group="group"
                    :boardId="boardId" />
            </Draggable>
        </Container>
        <section class="add-new-list">
                <button class="open-add-list" v-if="!isFormOpen" @click="toggleForm"><span
                        class="fa-regular plus-icon"></span> Add a list</button>
                <form v-if="isFormOpen" @submit.prevent="addGroup" class="flex group-list-form">
                    <input v-model="group.title" type="text" name="add-list" placeholder="Enter list title..." v-focus>
                    <div class="add-list-btns flex">
                        <button class="add-list-btn">Add list</button>
                        <button type="button" @click="toggleForm"><span class="fa-solid x-icon"></span></button>
                    </div>
                </form>
        </section>
    </section>
</template>

<script>
import group from './group.vue';
import { utilService } from '../services/util.service.js';
import { Container, Draggable } from "vue3-smooth-dnd";
export default {
    name: 'group-list',
    props: {
        groups: {
            type: Array,
            required: true
        },
        boardId: {
            type: String
        }
    },

    data() {
        return {
            isFormOpen: false,
            group: {
                id: '',
                title: '',
                groupsCopy: [],
                isDrag: false
            },

        }
    },
    created() {
        this.groupsCopy = JSON.parse(JSON.stringify(this.groups))
    },

    methods: {
        async onDrop(dropResult) {
            try {
                this.groupsCopy = JSON.parse(JSON.stringify(this.groups))
                this.groupsCopy = this.applyDrag(this.groupsCopy, dropResult);
                const newGroups = this.$store.dispatch({ type: 'updateGroups', groups: this.groupsCopy })
            }
            catch(prevGroups) {
                this.groupsCopy = JSON.parse(JSON.stringify(prevGroups))
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
                // console.log(this.groupsCopy);
            }
            else if (addedIndex !== null) result.splice(addedIndex, 0, itemToAdd.itemToMove);
            return result;
        },
        getShouldAcceptDrop(index, sourceContainerOptions, payload) {
            return true;
        },
        getChildPayload(index) {
            console.log(index);
            return {
                itemToMove: this.groupsCopy[index]
            }
        },




        toggleForm() {
            this.isFormOpen = !this.isFormOpen
        },

        addGroup() {
            const activity = {
                id: '',
                txt: "Add new Group",
                byMember: {
                    _id: this.user._id,
                    fullname: this.user.fullname,
                    imgUrl: this.user.imgUrl || '',
                },
                // task: this.task
            }
            if (!this.group.title) return
            this.$emit('addGroup', { ...this.group }, activity)
            this.group.title = ''
        },

        addTask(groupId, task, activity) {
            this.$emit('addTask', groupId, task, activity)
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

    components: {
        group,
        Container,
        Draggable
    }

}
</script>

