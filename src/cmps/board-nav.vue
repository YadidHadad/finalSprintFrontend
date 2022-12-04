<template>
    <section class="board-nav flex column wrap" :style="style"
        :class="{ isDark: isDark }, { navIsHidden: navIsHidden }">
        <div class="nav-title flex row align-center justify-between" :class="{ isDark: isDark }">
            <span>Workspace</span>
            <button class="btn-regular btn-toggle" @click="toggleBoardNav"> <span
                    class="fa-solid arrow-icon"></span></button>
        </div>

        <button v-for="(btn, i) in btns" :key="i" class="btn-nav" :class="{ isDark: isDark }">
            <span :class="btn.icon"></span>
            <span>{{ btn.txt }}</span>
        </button>
        <div class="nav-title flex row align-center justify-between ">
            <span>Your Boards</span>
            <button class="btn-regular"> <span class="fa-regular plus-icon"></span></button>
        </div>
        <button v-for="board in boards" :key="board._id" class="btn-nav"
            :class="{ isDark: isDark, isClicked: this.$route.params.id === board._id }" @click="goToBoard(board._id)">
            <div class="board-icon" :style="boardBGC(board.style)"></div>
            <span>{{ board.title }}</span>
        </button>
    </section>
</template>

<script>
import { utilService } from '../services/util.service'

export default {
    name: 'board-nav',
    props: ['rgb', 'boards'],
    components: {},
    created() {

    },
    data() {
        return {
            navIsHidden: true,
            isClicked: false,
            btns: [
                {
                    txt: 'Boards',
                    icon: 'fa-brands trello-icon'
                },
                {
                    txt: 'Members',
                    icon: 'trellicons members-icon'
                },
                {
                    txt: 'Settings',
                    icon: 'trellicons settings-icon'
                },
            ]
        }
    },
    methods: {
        toggleBoardNav() {
            this.navIsHidden = !this.navIsHidden
        },
        goToBoard(id) {
            return this.$router.push({ path: `/board/${id}` })
        },
        boardBGC(style) {
            console.log()
            return { backgroundImage: `url(${style.backgroundImage})` }
        },
    },
    computed: {
        style() {
            if (!this.rgb) return false
            return this.rgb.isDark ? utilService.getBCG(this.rgb.value, 0, 0.8) : utilService.getBCG(this.rgb.value, -0, 0.8)
        },
        isDark() {
            if (!this.rgb) return false
            return this.rgb.isDark
        },

    },
}
</script>
