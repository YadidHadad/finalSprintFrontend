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
                <li v-for="(label, index) in labels" :key="index" class="flex row align-center">
                    <input class="check-box" type="checkbox" @change="updateLabels()" v-model="labelIds"
                        :value="label.id">
                    <div class="label-color grow flex align-center" :style="{ backgroundColor: rgbaColors[label.id] }"
                        @click="updateLabels(label.id)">
                        <div :style="{ backgroundColor: label.color }" class="color-circle"></div>
                        {{ label.title }}
                    </div>
                    <span @click.stop="editTitle(label.color)">
                        <svg xmlns:xlink="http://www.w3.org/1999/xlink" width="16" height="16" role="presentation"
                            focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M7.82034 14.4893L9.94134 16.6103L18.4303 8.12131L16.3093 6.00031H16.3073L7.82034 14.4893ZM17.7233 4.58531L19.8443 6.70731C20.6253 7.48831 20.6253 8.7543 19.8443 9.53531L10.0873 19.2933L5.13734 14.3433L14.8943 4.58531C15.2853 4.19531 15.7973 4.00031 16.3093 4.00031C16.8203 4.00031 17.3323 4.19531 17.7233 4.58531ZM5.20094 20.4097C4.49794 20.5537 3.87694 19.9327 4.02094 19.2297L4.80094 15.4207L9.00994 19.6297L5.20094 20.4097Z"
                                fill="#5E6C84"></path>
                        </svg></span>
                </li>
                <div v-if="isEditTitle" class="edit-title-container">
                    <input type="text" placeholder="Enter title..." v-model="colorEdited.title">
                    <button @click.stop="save">Save</button>
                </div>
            </ul>
            <button class="create-label-btn" @click="openCreateLabel">Create a new label</button>
        </div>
        <create-label-modal v-if="isOpenModal" @createdLabel="createdLabel" />
    </section>
</template>

<script>
import createLabelModal from '../cmps/create-label-modal.vue';
import { utilService } from '../services/util.service';
export default {
    name: 'labels-edit',
    data() {
        return {
            // baseColors: ['#d6ecd2', '#faf3c0', '#fce6c6', '#f5d3ce', '#eddbf4', '#bcd9ea'],
            labelIds: [],
            isEditTitle: false,
            title: '',
            colorEdited: '',
            isOpenModal: false,
            rgbaColors: {},

        }
    },
    created() {
        // console.log('labels edit')
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
            // console.log(this.labelIds);
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
        },
        openCreateLabel() {
            this.isOpenModal = true
            // this.$emit('closeEditor')
        },
        createdLabel({ color, title }) {
            let label = this.labels.find(label => label.color === color)
            if (!label) {
                label = {
                    color,
                    title,
                    id: utilService.makeId()
                }
                this.$emit('updateBoardLabels', label)
            }
            this.updateLabels(label.id)
            console.log(label);
        },
        hexToRgbA(hex) {
            // console.log(hex)
            var c;
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.5)';
        },
    },
    computed: {
        labels() {
            const labels = this.$store.getters.labels
            labels.forEach(label => {
                // console.log(label.color)
                this.rgbaColors[label.id] = this.hexToRgbA(label.color)
            })
            return JSON.parse(JSON.stringify(labels))
        },

    },
    components: {
        createLabelModal
    }
}
</script>