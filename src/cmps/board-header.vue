<template>
    <section v-if="board" class="board-header flex row align-center justify-between wrap">
        <div class="flex align-center justify-start wrap">
            <input type="text" v-model="board.title" :style="titleLength" @input="debounceHandler" />

            <button v-if="board" v-for="btn in btns" class="btn" :class="{ isDark: !isDark }" :style="buttonBackground"
                @click="btn.function">
                <span :class="btn.icon"></span>
                <span v-if="btn.txt" class="txt">{{ btn.txt }}</span>
            </button>
        </div>
        <div class="flex align-center justify-end wrap self-end">
            <button class="btn" :class="{ isDark: !isDark }" :style="buttonBackground">
                <span class="location filter-icon"></span>
                <span class="txt">Filter</span>
            </button>
            <button v-for="member in board.members" class="btn-initials">
                <span>{{ this.getInitials(member.fullname) }}</span>
            </button>
            <button class="btn" :class="{ isDark: !isDark }" :style="buttonBackground" @click="toggleBoardMenu">
                <span class="fa-solid elipsis-icon"></span>
            </button>
        </div>
    </section>
</template>

<script>
import { utilService } from "../services/util.service";

export default {
    name: "board-header",
    props: {
        rgb: {
            type: Object,
            required: true,
        },
    },
    created() {
        this.debounceHandler = utilService.debounce(this.setBoardTitle, 500)
    },

    data() {
        return {
        }
    },

    methods: {
        getInitials(fullname) {
            return utilService.getInitials(fullname);
        },
        toggleBoardMenu() {
            this.$emit("toggleBoardMenu");
        },
        setBoardTitle() {
            this.$store.dispatch({ type: "updateBoard", board: this.board });
        },
        setBoardStar() {
            console.log('star')
            if (!this.board) return
            this.board.isStarred = !this.board.isStarred
            this.$store.dispatch({ type: "updateBoard", board: this.board });
        },
    },

    computed: {
        isDark() {
            if (!this.rgb) return false;
            return this.rgb.isDark;
        },
        buttonBackground() {
            if (!this.rgb) return;
            return this.rgb.isDark
                ? utilService.getBCG(this.rgb.value, 30, 0.5)
                : utilService.getBCG(this.rgb.value, 60, 0.5);
        },
        titleLength() {
            if (!this.board.title) return;
            return { width: `${(this.board.title.length + 3) * 12}` + "px" };
        },
        board() {
            return JSON.parse(JSON.stringify(this.$store.getters.board || {}))
        },
        isStarred() {
            // return "fa-regular star-icon"
            // if (!this.board.isStarred) return "fa-regular star-icon"
            return this.board.isStarred ? "fa-solid star-icon" : "fa-regular star-icon"
        },
        btns() {
            return [
                {
                    txt: null,
                    icon: this.board.isStarred ? "fa-solid star-icon" : "fa-regular star-icon",
                    function: this.setBoardStar
                },
                {
                    txt: "Board",
                    icon: "fa-solid board-icon",
                    function: 'setBoardStar()'

                },
                {
                    txt: "Table",
                    icon: "fa-solid table-icon",
                    function: 'setBoardStar()'

                },
                {
                    txt: "Calender",
                    icon: "fa-solid calender-icon",
                    function: 'setBoardStar()'

                },
                {
                    txt: "Dashboard",
                    icon: "fa-solid dashboard-icon",
                    function: 'setBoardStar()'

                },
                {
                    txt: "Map",
                    icon: "trellicons location-icon",
                    function: 'setBoardStar()'

                },
            ]
        }
    },

};
</script>

<style>

</style>
