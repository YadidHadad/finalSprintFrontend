<template>
    <section class="dates-preview">
        <div v-if="dueDate">{{ dueDate }}</div>
    </section>
</template>

<script>
export default {
    //
    data() {
        return {

        }
    },
    computed: {
        dueDate() {
            const dueDateStr = new Date(this.$store.getters.getEditedTask.dueDate)
            return dueDateStr.toLocaleTimeString('en-GB').slice(0, 5)
        }
    }
}
</script>
