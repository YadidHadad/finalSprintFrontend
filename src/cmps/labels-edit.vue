<template>
    <section class="labels-edit">
        <div class="labels-edit-header">
            <div class="text-header">Labels</div>
            <button @click.stop="closeEdit">X</button>
        </div>
        <div class="labels-edit-main">
            <input type="text" placeholder="Search labels...">
            <p>Labels</p>
            <ul class="label-color-list">
                <li v-for="(c,index) in baseColors" :key="index">
                    <input class="check-box" type="checkbox" @change="updateLabels(index , $event)">
                    <div class="label-color" :style="{ backgroundColor: c }"></div>
                    <span class="fa-regular pen-icon"></span>
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
            baseColors: ['#d6ecd2', '#faf3c0', '#fce6c6', '#f5d3ce', '#eddbf4', '#bcd9ea'],
        }
    },
    methods: {
        closeEdit() {
            this.$emit('closeEdit')
        },
        updateLabels(idx) {
            this.$emit('updateLabels' , this.baseColors[idx])
        }
    },
}
</script>