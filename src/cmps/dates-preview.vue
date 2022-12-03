<template>
    <section class="dates-preview">
        <div v-if="dueDateStr">
            <input type="checkbox" @change="toggleIsComplete">
            <span>{{ dueDateStr }}</span>
        </div>
        <span v-if="isComplete" :style="{ backgroundColor: 'rgb(97, 189, 79)' }">complete</span>
        <span v-else-if="dueDateMs < Date.now()" :style="{ backgroundColor: 'red' }">overDue</span>
    </section>
</template>

<script>
export default {
    //
    data() {
        return {
            isComplete: this.getIsComplete || false
        }
    },
    created() {
        // if(!this.isComplete) this.isComplete = false
    },
    methods: {
        toggleIsComplete() {
            this.isComplete = !this.isComplete
            this.$emit('markComplete' , this.isComplete)
        }
    },
    computed: {
        dueDateStr() {
            const dueDateStr = new Date(this.$store.getters.getEditedTask.dueDate).toLocaleTimeString('en-GB').slice(0, 5)
            console.log(dueDateStr, ',,,,,,,,,,,,,,,,,,,,,,,,,,,,');
            return dueDateStr
        },
        dueDateMs() {
            return this.$store.getters.getEditedTask.dueDate
        },
        getIsComplete() {
            return this.$store.getters.getEditedTask.isComplete
        }
    }
}
</script>
