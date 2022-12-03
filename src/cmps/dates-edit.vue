<template>
    <section class="dates-edit">
        <form @submit.prevent="addDate">
            <div class="dates-picker">
                <input type="date" v-model="timeStr">
            </div>
            <button>Save</button>
            <button>Remove</button>
            <span>{{ getDateInMs }}</span>
        </form>
    </section>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    created() {
        this.timeStr = this.formatDateInput
    },
    methods: {
        addDate(ev) {
            console.log(ev.target.value);
            // this.$emit('updateTask', this.getDateInMs)
        }
    },
    computed: {
        getDateInMs() {
            // return Date.parse(new Date().toISOString().split('T')[0] + 'T' + this.timeStr)
        },
    }
}
</script>