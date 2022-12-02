<template>
    <section class="group-list flex">
        <group @addTask="addTask" @removeGroup="$emit('removeGroup', $event)" v-for="group in groups" :group="group" :boardId="boardId" :key="group.id" />
        <section class="add-new-list">
            <transition name="slide-in">
                <button class="open-add-list" v-if="!isFormOpen" @click="toggleForm"><span
                        class="fa-regular plus-icon"></span> Add a list</button>
            </transition>
            <transition name="slide-out">
                <form v-if="isFormOpen" @submit.prevent="addGroup" class="flex group-list-form">
                    <input v-model="group.title" type="text" name="add-list" placeholder="Enter list title...">
                    <div class="add-list-btns flex">
                        <button class="add-list-btn" @click="toggleForm">Add list</button>
                        <button type="button" @click="toggleForm"><span class="fa-solid x-icon"></span></button>
                    </div>
                </form>
            </transition>
        </section>
    </section>
</template>

<script>
import group from './group.vue';
import { utilService } from '../services/util.service.js';
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
                title: ''
            },

        }
    },

    methods: {
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
                task: this.task
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
        }
    },

    components: {
        group
    }

}
</script>

