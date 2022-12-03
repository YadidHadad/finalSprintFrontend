<template>
    <section v-if="dueDateStr" class="dates-preview">
        <span class="title">Due date</span>
        <div class="flex row">
            <input type="checkbox" @change="toggleIsComplete">
            <button class="btn-date">{{ dueDateStr }}

                <span v-if="isComplete" class="time-tag" :style="{ backgroundColor: '#61bd4f' }">complete</span>
                <span v-else-if="dueDateMs < Date.now()" class="time-tag"
                    :style="{ backgroundColor: '#ec9488' }">overdue</span>

            </button>
        </div>
    </section>
</template>

<script>
export default {
    //
    data() {
        return {

        }
    },
    created() {
        const isComplete = this.getIsComplete || false
    },
    methods: {
        toggleIsComplete() {
            this.isComplete = !this.isComplete
            this.$emit('markComplete', this.isComplete)
        }
    },
    computed: {
        dueDateStr() {
            if (!this.$store.getters.getEditedTask?.dueDate) return ''
            const dueDateStr = new Date(this.$store.getters.getEditedTask.dueDate)
            return dueDateStr.toLocaleString('en-US', {
                dateStyle: 'long',
                timeStyle: 'short',
            })

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
