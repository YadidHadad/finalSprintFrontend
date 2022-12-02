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
                    <div class="label-color" :style="{ backgroundColor: label.color }">{{ labelTitle(label.title) }}
                    </div>
                    <span class="fa-regular pen-icon" @click="editTitle(index)"></span>
                </li>
                <div v-if="isEditTitle" class="edit-title-container">
                    <input type="text" placeholder="Enter title..." v-model="title">
                    <button @click="save">Save</button>
                </div>
            </ul>
            <button>Create a new label</button>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            // baseColors: ['#d6ecd2', '#faf3c0', '#fce6c6', '#f5d3ce', '#eddbf4', '#bcd9ea'],
            labels: this.$store.getters.labels,
            labelIds: this.$store.getters.labelIds,
            isEditTitle: false,
            title: '',
            colorEdited: ''
        }
    },
    created() {
        this.colorsSelected = this.labels.map(label => label.color)
        // console.log(this.$store.getters.getEditedTask , '*********');
        if (this.$store.getEditedTask?.labelIds)
            this.labelIds = this.$store.getEditedTask.labelIds.map(l => l.id)
    },
    methods: {
        closeEdit() {
            this.$emit('closeEdit')
        },
        updateLabels() {
            this.$emit('updateTask', { labelIds: this.labelIds })
        },
        editTitle(idx) {
            this.isEditTitle = true
            this.colorEdited = this.baseColors[idx]
            // this.$emit('updateLabels' , {color: this.baseColors[idx] , title:})
        },
        save() {
            this.$emit('updateLabelText', { title: this.title, color: this.colorEdited })
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