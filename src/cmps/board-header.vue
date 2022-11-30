<template>
    <section class="board-header flex row align-center">

        <input type="text" v-model="title" :style="titleLength" />

        <button v-for="btn in btns" class="btn" :class="{ isDark: !isDark }" :style="buttonBackground">
            <span :class="btn.icon"></span>
            <span v-if="btn.txt" class="txt">{{ btn.txt }}</span>
        </button>
    </section>
</template>



<script>
import { utilService } from '../services/util.service'


export default {
    name: 'board-header',
    props: {
        title: {
            type: String,
            required: true,
        },
        rgb: {
            type: Object,
            required: true,
        }
    },


    data() {
        return {

            btns: [
                {
                    txt: null,
                    icon: 'fa-regular star-icon'
                },
                {
                    txt: 'Board',
                    icon: 'fa-solid board-icon'
                },
                {
                    txt: 'Table',
                    icon: 'fa-solid table-icon'
                },
                {
                    txt: 'Calender',
                    icon: 'fa-solid calender-icon'
                },
                {
                    txt: 'Dashboard',
                    icon: 'fa-solid dashboard-icon'
                },
                {
                    txt: 'Map',
                    icon: 'fa-solid location-icon'
                },
                {
                    txt: 'Filter',
                    icon: 'fa-solid filter-icon'
                },
            ]
        }
    },

    computed: {
        isDark() {
            if (!this.rgb) return false
            return this.rgb.isDark
        },
        buttonBackground() {
            if (!this.rgb) return
            return this.rgb.isDark ? utilService.getBCG(this.rgb.value, 30, 1) : utilService.getBCG(this.rgb.value, -30, 1)
        },
        titleLength() {

            if (!this.title) return
            console.log(this.title.length)
            return { width: `${(this.title.length + 3) * 10}` + 'px' }
        }
    },


}
</script>

<style>

</style>