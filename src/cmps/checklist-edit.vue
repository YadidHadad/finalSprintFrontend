<template>
    <section class="checklist-edit">
        <div class="checklist-edit-header">
            <div>Add checklist</div>
            <button @click.stop="closeEdit">X</button>
        </div>
        <div class="checklist-edit-main">
            <label for="checklist-input">Title</label>
            <input type="text" v-model="checkList.title" id="checklist-input">
            <button @click="addChecklist">Add</button>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            checkList: {
                id: '',
                title: 'Checklist',
                todos: [
                    // {
                    //     id: '',
                    //     title: '',
                    //     isDone: false
                    // }
                ]
            }
        }
    },
    methods: {
        closeEdit() {
            this.$emit('closeEdit')
        },
        addChecklist() {
            this.$emit('addChecklist' , this.checkList)
        }
    },
}
</script>