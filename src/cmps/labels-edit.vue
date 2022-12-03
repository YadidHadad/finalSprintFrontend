<template>
    <section class="task-editor labels-edit" @click.stop="">
        <button class="btn-close" @click.stop="closeEdit">
            <span class="trellicons x-icon"></span>
        </button>
        <div class="title">Labels</div>
        <div class="flex column">
            <input type="text" placeholder="Search labels...">
            <div class="mini-title">Labels</div>
            <ul class="label-color-list">
                <li v-for="(label, index) in labels" :key="label.id" class="flex row align-center">
                    <input class="check-box" type="checkbox" @change="updateLabels()" v-model="labelIds"
                        :value="label.id">
                    <div class="label-color grow" :style="{ backgroundColor: label.color }"
                        @click="updateLabels(label.id)">{{ label.title }}
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
        updateLabels(labelId = '') {
            if (labelId) {
                const lblIdx = this.labelIds.findIndex(currLblId => currLblId === labelId)
                lblIdx === -1 ? this.labelIds.push(labelId) : this.labelIds.splice(lblIdx, 1)
            }
            this.$emit('updateTask', { labelIds: [...this.labelIds] })
            console.log(this.labelIds);
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