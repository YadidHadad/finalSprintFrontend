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
                <li v-for="(label, index) in labels" :key="label.id">
                    <input class="check-box" type="checkbox" @change="updateLabels()" v-model="labelIds"
                        :value="label.id">
                    <div class="label-color" :style="{ backgroundColor: label.color }">{{ label.title }}
                    </div>
                    <span class="fa-regular pen-icon" @click.stop="editTitle(label.color)"></span>
                </li>
                <div v-if="isEditTitle" class="edit-title-container">
                    <input type="text" placeholder="Enter title..." v-model="colorEdited.title">
                    <button @click.stop="save">Save</button>
                </div>
            </ul>
            <button class="create-label-btn">Create a new label</button>
        </div>
    </section>
</template>

<script>
export default {
    name: 'labels-edit',
    data() {
        return {
            // baseColors: ['#d6ecd2', '#faf3c0', '#fce6c6', '#f5d3ce', '#eddbf4', '#bcd9ea'],
            labels: JSON.parse(JSON.stringify(this.$store.getters.labels)),
            labelIds: [],
            isEditTitle: false,
            title: '',
            colorEdited: ''
        }
    },
    created() {
        console.log('labels edit')
        this.colorsSelected = this.labels.map(label => label.color)
        if (this.$store.getters.getEditedTask?.labelIds)
            this.labelIds = [...this.$store.getters.getEditedTask.labelIds]
    },
    methods: {
        closeEdit() {
            this.$emit('closeEdit')
        },
        updateLabels() {
            this.$emit('updateTask', { labelIds: this.labelIds })
        },
        editTitle(color) {
            this.isEditTitle = true
            this.colorEdited = this.labels.find(l => l.color === color)
            // this.$emit('updateLabels' , {color: this.baseColors[idx] , title:})
        },
        save() {
            this.$emit('updateLabel', this.colorEdited)
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