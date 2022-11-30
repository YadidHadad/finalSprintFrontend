<template>
    <section class="group-list">
        <ul>
            <group v-for="group in groups" :group="group" :key="group.id" />
        </ul>
        <button v-if="!isFormOpen" @click="toggleForm"><span class="fa-regular plus-icon"></span> Add a list</button>
        <form v-if="isFormOpen" @submit.prevent="$emit('addGroup', { ...this.group })">
            <input v-model="group.title" type="text" name="add-list" placeholder="Enter list title...">
            <button>Add list</button>
            <button type="button" @click="toggleForm">X</button>
        </form>
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
        }
    },

    data() {
        return {
            isFormOpen: false,
            group: {
                id: utilService.makeId(),
                title: ''
            }
        }
    },
    methods: {
        toggleForm() {
            this.isFormOpen = !this.isFormOpen
        }
    },

    components: {
        group
    }

}
</script>

