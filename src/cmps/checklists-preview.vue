<template>
    <section class="checklist-preview">
        <div v-for="(checklist, index) in checklists">
            <input v-if="checklists[index]" @input="editChecklistTitle(checklist, $event)"
                @focus="pickChecklist(checklists[index].id)" :value="checklist.title" />
            <div class="title-btns" v-if="checklistPicked === checklists[index].id">
                <button>Save</button>
                <button>Cancel</button>
            </div>
        </div>
        <span>+</span>
    </section>
</template>

<script>
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
        }
    },
    created() {
        if (this.checklists) this.editedChecklists = JSON.parse(JSON.stringify(this.checklists))
    },
    methods: {
        pickChecklist(checklistId) {
            this.checklistPicked = checklistId
        },
        save() {
            const checklistIdx = this.editedChecklists.findIndex(checklist => checklist.id === this.editedChecklist.id)
            this.editedChecklists.splice(checklistIdx, 1, this.editedChecklist)
            this.$emit('updateTask', this.editedChecklists)
            this.checklistPicked = ''
            this.editedChecklist = null
        },
        editChecklistTitle(checklist, ev) {
            this.editedChecklist = JSON.parse(JSON.stringify(checklist))
            this.editedChecklist.title = ev.target.value
            console.log(this.editedChecklist);
        }
    },
    computed: {
        getChecklists() {
            return this.$store.getters.checklists || []
        }
    }
}
</script>