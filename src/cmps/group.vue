<template>
    <div class="group">
        <h1>{{ group.title }}</h1>
        <ul>
            <li v-for="task in group.tasks" :key="task.id">
                    <task-preview :task="task" :boardId="boardId"/>
            </li>
        </ul>
        <button v-if="!isCardOpen" @click="toggleCard"><span class="fa-regular plus-icon"></span> Add a card</button>
        <form v-if="isCardOpen" @submit.prevent="$emit('addTask', {...this.task })" class="flex ">
            <input v-model="task.title" type="text" name="add-list" placeholder="Enter a title for this card...">
            <div class="add-list-btns">
                <button class="add-list-btn">Add card</button>
                <button type="button" @click.stop="toggleCard">X</button>
            </div>
        </form>
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
    data() {
        return {
            isCardOpen: false,
            task: {
                id: '',
                title: '',
                
            }
        }
    },
    created() {
        // console.log(this.boardId)
    },
    methods:{
        toggleCard() {
            console.log(this.isCardOpen);
            this.isCardOpen = !this.isCardOpen
        }
    },
    computed: {

    },
    components: { taskPreview },
}
</script>

