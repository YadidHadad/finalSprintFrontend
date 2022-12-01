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
                <li v-for="(c, index) in baseColors" :key="index">
                    <input class="check-box" type="checkbox" @change="updateLabels(index, $event)"
                        v-model="colorsSelected" :value="c">
                    <div class="label-color" :style="{ backgroundColor: c }">{{ labelTitle(c) }}</div>
                    <span class="fa-regular pen-icon" @click="editTitle(index)"></span>
                </li>
                <div class="edit-title-container">
                    <input v-if="isEditTitle" type="text" placeholder="Enter title..." v-model="title">
                    <button @click="save">Save</button>
                </div>
            </ul>
            <button>Create a new label</button>
        </div>
    </section>
</template>

<script>
import { utilService } from '../services/util.service'
export default {
    data() {
        return {
            baseColors: ['#d6ecd2', '#faf3c0', '#fce6c6', '#f5d3ce', '#eddbf4', '#bcd9ea'],
            labels: this.$store.getters.labels,
            colorsSelected: [],
            isEditTitle: false,
            title: '',
            colorEdited: ''
        }
    },
    created() {
        this.colorsSelected = this.labels.map(label => label.color)
    },
    methods: {
        closeEdit() {
            this.$emit('closeEdit')
        },
        updateLabels(idx) {
            this.$emit('updateLabels', { color: this.baseColors[idx], title: ''})
        },
        editTitle(idx) {
            this.isEditTitle = true
            this.colorEdited = this.baseColors[idx]
            // this.$emit('updateLabels' , {color: this.baseColors[idx] , title:})
        },
        save() {
            this.$emit('updateLabelText', { title: this.title, color: this.colorEdited})
            this.isEditTitle = false
            this.colorEdited = ''
            this.title = ''
        },
        labelTitle(c) {
            const currLabel = this.labels.find(label => label.color === c)
            if (currLabel) return currLabel.title
        }
    },
}
</script>