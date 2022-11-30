<template>
    <section class="group-list">
        <button v-if="!isFormOpen" @click="toggleForm"><span>+ </span>Add a list</button>
        <form v-if="isFormOpen" @submit.prevent="$emit('addGroup', {...this.group })">
            <input v-model="group.title" type="text" name="add-list" placeholder="Enter list title...">
            <button>Add list</button>
            <button type="button" @click="toggleForm">X</button>
        </form>
        <group v-for="group in groups" :key="group.id" />
    </section>
</template>

<script>
import group from './group.vue';
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

