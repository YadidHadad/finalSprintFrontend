<template>
    <section class="checklist-preview">
        <div v-for="(checklist, index) in getChecklists">
            hi
            <input v-if="getChecklists[index]" @input="updateChecklists(getChecklists[index].id, $event)"
                @focus="isTitleEdit(getChecklists[index].id, index)" />
            <div class="title-btns" v-if="isTitleEdit">
                <button>Save</button>
                <button>Cancel</button>
            </div>
            <!-- {{ checklists }} -->
        </div>
        <span>+</span>
    </section>
</template>

<script>
//v-model="checklists[index].title" 
export default {
    props: {
    },
    data() {
        return {
            checklists: [],
            isEditChecklists: []
        }
    },
    created() {
        // this.checklists = JSON.parse(JSON.stringify(this.getChecklists))
        this.isEditChecklists = this.getChecklists.map(c => false)
    },
    methods: {
        updateTitle(idx, ev) {
            console.log(this.checklists[idx].title);
            this.checklists = JSON.parse(JSON.stringify(this.getChecklists))
            this.checklists[idx].title = ev.target.value
        },
        updateChecklists(id, ev) {
            console.log();
        },
        isTitleEdit(id, idx) {
            this.checklists = JSON.parse(JSON.stringify(this.getChecklists))
            const editChecklist = this.checklists.find(c => c.id === id)
            this.isEditChecklists[idx] = true
        }
    },
    computed: {
        getChecklists() {
            console.log(this.$store.getters.checklists, 'hiiiiiiiiiiiiiiiiiiiii');
            return this.$store.getters.checklists || []
        }
    }
}
</script>