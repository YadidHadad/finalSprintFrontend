<template>
    <section class="board-nav flex column" :style="style" :class="{ isDark: isDark }, { navIsHidden: navIsHidden }">
        <div class="nav-title flex row align-center justify-between" :class="{ isDark: isDark }">
            <span>Workspace</span>
            <button class="btn-regular btn-toggle" @click="toggleBoardNav"> <span
                    class="fa-solid arrow-icon"></span></button>
        </div>

        <button v-for="btn in btns" :key="btn.txt" class="btn-nav" :class="{ isDark: isDark }">
            <span :class="btn.icon"></span>
            <span>{{ btn.txt }}</span>
        </button>
        <div class="nav-title flex row align-center justify-between">
            <span>Your Boards</span>
            <button class="btn-regular"> <span class="fa-regular plus-icon"></span></button>
        </div>


    </section>
</template>



<script>
import { utilService } from '../services/util.service'

export default {
    name: 'board-nav',
    props: ['rgb'],
    components: {},
    created() {

    },
    data() {
        return {
            navIsHidden: true,
            btns: [
                {
                    txt: 'Boards',
                    icon: 'fa-brands trello-icon'
                },
                {
                    txt: 'Members',
                    icon: 'fa-regular user-icon'
                },
                {
                    txt: 'Settings',
                    icon: 'fa-solid settings-icon'
                },
            ]
        }
    },
    methods: {
        toggleBoardNav() {
            this.navIsHidden = !this.navIsHidden
        }
    },
    computed: {
        style() {
            if (!this.rgb) return false
            return this.rgb.isDark ? utilService.getBCG(this.rgb.value, 0, 0.8) : utilService.getBCG(this.rgb.value, -0, 0.8)
        },
        isDark() {
            if (!this.rgb) return false
            return this.rgb.isDark
        }
    },
}
</script>
