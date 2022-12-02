<template>
    <section class="checklist-preview">
        <div v-for="(checklist, index) in getChecklists">
            hi
            <input v-if="getChecklists[index]" @input="updateTitle" v-model="getChecklists[index].title" />
            {{ checklists }}
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
            checklists: []
        }
    },
    created() {
        this.checklists = JSON.parse(JSON.stringify(this.getChecklists))
    },
    computed: {
        getChecklists() {
            // console.log(this.$store.getters.checklists, 'hiiiiiiiiiiiiiiiiiiiii');
            return this.$store.getters.checklists || []
        }
    }
}
</script>