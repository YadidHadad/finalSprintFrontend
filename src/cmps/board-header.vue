<template>
    <section class="board-header flex row align-center justify-between wrap">
        <div class="flex align-center justify-start wrap ">
            <input type="text" v-model="title" :style="titleLength" />

            <button v-for="btn in btns" class="btn" :class="{ isDark: !isDark }" :style="buttonBackground">
                <span :class="btn.icon"></span>
                <span v-if="btn.txt" class="txt">{{ btn.txt }}</span>
            </button>
        </div>
        <div class="flex align-center justify-end wrap self-end">
            <button class="btn" :class="{ isDark: !isDark }" :style="buttonBackground">
                <span class="fa-solid filter-icon"></span>
                <span class="txt">Filter</span>
            </button>
            <button v-for="member in this.members" class="btn-initials">
                <span>{{ this.getInitials(member.fullname) }}</span>
            </button>
            <button class="btn" :class="{ isDark: !isDark }" :style="buttonBackground" @click="toggleBoardMenu">
                <span class="fa-solid elipsis-icon"></span>
            </button>
        </div>
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
        isStarred: {
            type: Boolean,
            required: true,
        },
        members: {
            type: Array,
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
                    icon: this.isStarred ? 'fa-solid star-icon' : 'fa-regular star-icon'
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

            ]
        }
    },

    methods: {
        getInitials(fullname) {
            return utilService.getInitials(fullname)
        },
        toggleBoardMenu() {
            console.log('app header')
            this.$emit('toggleBoardMenu')
        }

    },

    computed: {
        isDark() {
            if (!this.rgb) return false
            return this.rgb.isDark
        },
        buttonBackground() {
            if (!this.rgb) return
            return this.rgb.isDark ? utilService.getBCG(this.rgb.value, 30, 0.5) : utilService.getBCG(this.rgb.value, 60, 0.5)
        },
        titleLength() {

            if (!this.title) return
            return { width: `${(this.title.length + 3) * 12}` + 'px' }
        }
    },


}
</script>

<style>

</style>