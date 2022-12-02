<template>
    <section class="checklist-preview">
        <div v-for="(checklist, index) in checklists" class="checklist-container">
            <div class="checklist-preview-header">
                <div v-if="checklistPicked !== checklists[index].id" @click="pickChecklist(checklist)">
                    <div>{{ checklist.title }}</div>
                    <button @click.stop="removeChecklist(checklist.id)">Delete</button>
                </div>
                <textarea v-else class="checklist-title-input " v-if="checklists[index]"
                    @input="editChecklistTitle(checklist, $event)" @focus="pickChecklist(checklist)"
                    :value="checklist.title">
                    </textarea>
            </div>
            <div class="title-btns" v-if="checklistPicked === checklists[index].id">
                <button class="save-btn" @click="save">Save</button>
                <button class="close-btn" @click="close">X</button>
            </div>

            <div class="todos-container">
                <div class="todo-container" v-for="todo in checklist.todos">
                    <input type="checkbox" @change="toggleTodo(todo, checklist)" v-model="doneTodosIds"
                        :value="todo.id">
                    <div>{{ todo.title }}</div>
                </div>
            </div>


            <button class="add-todo-btn" v-if="!isTodoPicked" @click="isTodoPicked = true">Add an item</button>
            <div v-else class="add-todo">
                <textarea placeholder="Add an item" v-model="todoTxt">
                </textarea>

                <button class="save-btn" @click="saveTodo(checklist)">Save</button>
                <button class="close-btn" @click="isTodoPicked = false">X</button>
            </div>
        </div>
    </section>
</template>

<script>
import { utilService } from '../services/util.service'

export default {
    props: {
        checklists: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            editedChecklists: null,
            checklistPicked: '',
            editedChecklist: null,
            todoTxt: '',
            isTodoPicked: false,
            doneTodosIds: []
        }
    },
    created() {
        if (this.checklists) this.editedChecklists = JSON.parse(JSON.stringify(this.checklists))
        if (this.checklists) {
            this.checklists.forEach(checklist => {
                checklist.todos.forEach(todo => {
                    if (todo.isDone) this.doneTodosIds.push(todo.id)
                })
            })
        }
        console.log(this.doneTodosIds, 'DONE TODOSSSSSSSSSS');
    },
    methods: {
        pickChecklist(checklist) {
            this.editedChecklist = JSON.parse(JSON.stringify(checklist))
            this.checklistPicked = checklist.id
            console.log(checklist);
        },
        save() {
            const checklistIdx = this.checklists.findIndex(checklist => checklist.id === this.editedChecklist.id)
            const updatedChecklists = JSON.parse(JSON.stringify(this.checklists))
            updatedChecklists.splice(checklistIdx, 1, this.editedChecklist)
            this.$emit('updateChecklists', updatedChecklists)
            this.editedChecklist = null
            setTimeout(() => {
                this.checklistPicked = ''
            }, 500)
        },
        editChecklistTitle(checklist, ev) {
            console.log('hiiiiii');
            this.editedChecklist = JSON.parse(JSON.stringify(checklist))
            this.editedChecklist.title = ev.target.value
            console.log(this.editedChecklist);
        },
        close() {
            this.checklistPicked = ''
        },
        removeChecklist(id) {
            const checklistIdx = this.checklists.findIndex(checklist => checklist.id === id)
            const updatedChecklists = JSON.parse(JSON.stringify(this.checklists))
            updatedChecklists.splice(checklistIdx, 1)
            this.$emit('updateChecklists', updatedChecklists)
        },
        saveTodo(checklist) {
            if (!this.todoTxt.trim()) return
            const newChecklist = JSON.parse(JSON.stringify(checklist))
            // newChecklist.todos.push()
            const newTodo = {
                id: utilService.makeId(),
                title: this.todoTxt,
                isDone: false
            }
            newChecklist.todos.push(newTodo)
            const checklistIdx = this.checklists.findIndex(cl => cl.id === checklist.id)
            const updatedChecklists = JSON.parse(JSON.stringify(this.checklists))
            updatedChecklists.splice(checklistIdx, 1, newChecklist)
            this.$emit('updateChecklists', updatedChecklists)
            this.isTodoPicked = false
            this.todoTxt = ''
        },
        toggleTodo(todo, checklist) {
            const newTodo = JSON.parse(JSON.stringify(todo))
            const newChecklist = JSON.parse(JSON.stringify(checklist))
            newTodo.isDone = !newTodo.isDone

            const todoIdx = checklist.todos.findIndex(currTodo => currTodo.id === todo.id)
            newChecklist.todos.splice(todoIdx, 1, newTodo)

            const checklistIdx = this.checklists.findIndex(cl => cl.id === checklist.id)
            const updatedChecklists = JSON.parse(JSON.stringify(this.checklists))
            updatedChecklists.splice(checklistIdx, 1, newChecklist)

            this.$emit('updateChecklists', updatedChecklists)
        }
    },
    // computed: {
    //     getChecklists() {
    //         return this.$store.getters.checklists || []
    //     }
    // }
}
</script>