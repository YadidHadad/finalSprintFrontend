<template>
    <section class="create-label-modal">
        <div class="create-label-header">
            <div class="title">Edit Label</div>
            <button class="close-btn">X</button>
        </div>
        <div class="create-label-main">
            <div class="picked-color" :style="{ backgroundColor: getPickedColor }"><span>{{ title }}</span></div>
            <p>Title</p>
            <input type="text" v-model="title">
            <p>Select a color</p>
            <div class="colors-container">
                <div class="label-color" v-for="color in colorPallet" :style="{ backgroundColor: color }"
                    @click="(pickedColor = color)"></div>
            </div>
            <button>x Remove color</button>
            <button @click="save">Save</button>
            <button>Delete</button>
        </div>
    </section>
</template>

<script>
export default {
    name: 'create-label-modal',
    data() {
        return {
            colorPallet: ['#b7ddb0', '#f5ea92', '#fad29c', '#efb3ab', '#dfc0eb'
                , '#7bc86c', '#f5dd29', '#ffaf3f', '#ef7564', '#cd8de5', '#8bbdd9', '#8fdfeb'
                , '#b3f1d0', '#f9c2e4', '#505f79', '#5ba4cf', '#29cce5', '#6deca9'
                , '#ff8ed4', '#344563'],
            pickedColor: '',
            title: ''
        }
    },
    methods: {
        save() {
            this.$emit('createdLabel', { color: this.pickedColor, title: this.title })
        }
    },
    computed: {
        getPickedColor() {
            return this.pickedColor
        }
    }
}
</script>