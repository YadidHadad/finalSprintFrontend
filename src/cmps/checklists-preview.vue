<template>
    <section class="checklist-preview">
        <div v-for="(checklist, index) in checklists" :key="checklist.id" class="checklist-container">
            <div class="flex align-center justify-between">
                <span class="trellicons checklist-icon large"></span>
                <div v-if="checklistPicked !== checklists[index].id" class="task-cmp-title grow"
                    @click="pickChecklist(checklist)">
                    <div>{{ checklist.title }}</div>
                </div>
                <textarea v-else class="checklist-title-input task-cmp-title grow" v-if="checklists[index]"
                    @input="editChecklistTitle(checklist, $event)" @focus="pickChecklist(checklist)"
                    :value="checklist.title">
                    </textarea>
                <button v-if="!editedChecklist" class="btn-delete "
                    @click.stop="removeChecklist(checklist.id)">Remove</button>
            </div>
            <div class="title-btns pad-40" v-if="checklistPicked === checklists[index].id">
                <button class="save-btn" @click="save">Save</button>
                <button class="close-btn" @click="close">Cancel</button>
            </div>
            <section class="pad-40 flex column">
                <progress :value="checklist.todos.filter(todo => todo.isDone).length"
                    :max="checklist.todos.length"></progress>
                <form class="todos-container flex column" @change="updateTodos(checklist)">
                    <div class="todo-container flex row w-100" v-for="(todo, i) in checklist.todos" :key="i">
                        <input type="checkbox" v-model="doneTodosIds" @change="toggleTodo" :value="todo.id">
                        <div class="todo-edit-container" @click="todoEditId = todo.id">
                            <div v-if="(todoEditId !== todo.id)" class="grow" :class="{ 'line-through': todo.isDone }">{{
                                    todo.title
                            }}</div>
                            <div class="todo-edit" v-else>
                                <textarea class="todo-title-input task-cmp-title grow" @focus="pickChecklist(checklist)"
                                    :value="todo.title">
                                </textarea>
                                <div class="todo-edit-btns">
                                    <button class="btn-save" @click.stop="updateTodo(todo, checklist)">Save</button>
                                    <button @click.stop="todoEditId=''">X</button>
                                </div>
                            </div>
                        </div>

                        <button v-if="isOpenOptions" class="btn-delete margin-0"
                            @click="removeTodo(index, checklist)">Remove</button>
                        <button class="btn-delete margin-0" @click="isOpenOptions = !isOpenOptions">
                            <span class=" fa-solid elipsis-icon">
                            </span></button>
                    </div>
                </form>
                <button class="add-todo-btn" v-if="!isTodoPicked" @click="isTodoPicked = true">Add an item</button>
                <div v-else class="add-todo flex column">
                    <textarea placeholder="Add an item" v-model="todoTxt"></textarea>
                    <div>
                        <button class="save-btn" @click="saveTodo(checklist)">Save</button>
                        <button class="close-btn" @click="isTodoPicked = false">Cancel</button>
                    </div>
                </div>
            </section>
        </div>
    </section>
</template>

<script>
import { utilService } from '../services/util.service'

export default {

    //DEBOUNCE FOR INPUT
    props: {
        checklists: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            // editedChecklists: null,
            checklistPicked: '',
            editedChecklist: null,
            todoTxt: '',
            isTodoPicked: false,
            doneTodosIds: [],
            isOpenOptions: false,
            todoEditId: ''
        }
    },
    created() {
        this.debounceHandler = utilService.debounce(this.toggleTodo, 500)

        // if (this.checklists) this.editedChecklists = JSON.parse(JSON.stringify(this.checklists))
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
            this.updateChecklists(newChecklist, checklist)
            this.isTodoPicked = false
            this.todoTxt = ''
        },
        removeTodo(todoIdx, checklist) {
            console.log(todoIdx, checklist);
            const newChecklist = JSON.parse(JSON.stringify(checklist))
            newChecklist.todos.splice(todoIdx, 1)

            this.updateChecklists(newChecklist, checklist)
        },
        updateChecklists(newChecklist, checklist) {
            const checklistIdx = this.checklists.findIndex(cl => cl.id === checklist.id)
            const updatedChecklists = JSON.parse(JSON.stringify(this.checklists))
            updatedChecklists.splice(checklistIdx, 1, newChecklist)
            this.$emit('updateChecklists', updatedChecklists)
        },
        toggleTodo(ev) {
            console.log(this.doneTodosIds);
        },
        updateTodos(checklist) {
            // console.log(checklist);
            const newChecklist = JSON.parse(JSON.stringify(checklist))
            newChecklist.todos.forEach(todo => {
                if (this.doneTodosIds.includes(todo.id)) {
                    console.log('hi');
                    todo.isDone = true
                }
                else {
                    todo.isDone = false
                }
            })
            console.log(newChecklist.todos);

            // newChecklist.todos = updatedTodos
            this.updateChecklists(newChecklist, checklist)
        },
        updateTodo(todo, checklist) {
            // const todoIdx = checklist.todos.findIndex(currTodo => todo.id === currTodo.id)
            // checklist.splice(todoIdx, 1, checklist.todos)
            // console.log(todoIdx, '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        }
    },
    computed: {

    }
}
</script>