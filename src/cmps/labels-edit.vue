<template>
    <section class="labels-edit">
        <div class="labels-edit-header">
            <h3>Labels</h3>
            <button @click="closeDetails">X</button>
        </div>
        <div class="labels-edit-main">
            <input type="text" placeholder="Search labels...">
            <h5>Labels</h5>
            <ul class="label-color-list">
                <li v-for="c in baseColors">
                    <input type="checkbox">
                    <div class="label-color" :style="{ backgroundColor: c }"></div>
                    <span>I</span>
                </li>
            </ul>
            <button>Create a new label</button>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            baseColors: ['#4bbf6b', '#faf3c0', '#fce6c6', '#f5d3ce', '#eddbf4', '#bcd9ea']
        }
    },
    methods: {
        closeDetails() {
            this.$emit('closeDetails')
        }
    },
}
</script>