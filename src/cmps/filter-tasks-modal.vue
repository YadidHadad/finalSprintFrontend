<template>
    <section class="tasks-filter">
        <div class="tasks-filter-header">
            <h2>Filter</h2>
            <span class="trellicons x-icon" @click="close"></span>
        </div>

        <div class="tasks-filter-main">
            <div class="text-filter">
                <p>Keyword</p>
                <input type="text" placeholder="Enter a keyword..." v-model="filterBy.title" @input="doFilter"
                    @keyup.enter="($event) => $event.target.blur()">
                <small>Search cards, members, labels, and more.</small>
            </div>
            <div class="members-filter">
                <p>Members</p>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            filterBy: {
                title: ''
            }
        }
    },
    methods: {
        doFilter() {
            this.$emit('doFilter', this.filterBy)
        },
        close() {
            this.$emit('closeFilter')
        }
    },
}
</script>