<template>
    <section v-if="board" class="board-header flex row align-center justify-between wrap">
        <div class="flex align-center justify-start wrap">
            <input type="text" v-model="board.title" :style="titleLength" @input="debounceHandler"
                @keyup.enter="($event) => $event.target.blur()" />

            <button v-if="board" v-for="(btn, i) in btns" class="btn" :class="{ isDark: !isDark }"
                :style="buttonBackground" @click="btn.function">
                <span :class="btn.icon"></span>
                <span v-if="btn.txt" class="txt">{{ btn.txt }}</span>
            </button>
        </div>
        <div class="btns-container w-100 flex align-center row wrap  ">
            <span class="grow "></span>
            <button class="btn" :class="{ isDark: !isDark }" :style="buttonBackground" @click="filterTasks">
                <span class="trello-home filter-icon"></span>
                <span class="txt">Filter</span>
            </button>
            <div v-for="member in board.members" :key="member._id">
                <div v-if="member.imgUrl" class="member-image" :style="memberImage(member.imgUrl)"> </div>
                <span v-else class="member-initials">
                    {{ getInitials(member.fullname) }}
                </span>
            </div>
            <button class="btn" :class="{ isDark: !isDark }" :style="buttonBackground" @click="toggleBoardMenu">
                <span class="trello-home elipsis-icon"></span>
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
        this.debounceHandler = utilService.debounce(this.setBoardTitle, 200)
    },

    data() {
        return {
        }
    },

    methods: {
        memberImage(imgUrl) {
            return { backgroundImage: `url(${imgUrl})` };
        },
        getInitials(fullname) {
            return utilService.getInitials(fullname);
        },
        toggleBoardMenu() {
            this.$emit("toggleBoardMenu");
        },
        setBoardTitle() {

            if (this.board.title.length > 15) this.board.title = this.board.title.slice(0, 15) + '...'

            this.$store.dispatch({ type: "updateBoard", board: this.board });
        },
        setBoardStar() {
            console.log('star')
            if (!this.board) return
            this.board.isStarred = !this.board.isStarred
            this.$store.dispatch({ type: "updateBoard", board: this.board });
        },
        filterTasks() {
            this.$emit('filterTasks')
        }

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
            // return { width: `${(this.board.title.length)}` + "ch" };
            return { width: `${(this.board.title.length + 3) * 10}` + "px" };
        },
        board() {

            const board = JSON.parse(JSON.stringify(this.$store.getters.board || {}))

            if (board.title.length > 15) board.title = board.title.slice(0, 15)

            return board
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
                    icon: "trello-home board-icon",
                    function: 'setBoardStar()'

                },
                // {
                //     txt: "Board",
                //     icon: "fa-solid board-icon",
                //     function: 'setBoardStar()'

                // },
                {
                    txt: "Table",
                    icon: "trello-home table-icon",
                    function: 'setBoardStar()'

                },
                {
                    txt: "Calender",
                    icon: "trello-home calender-icon",
                    function: 'setBoardStar()'

                },
                {
                    txt: "Dashboard",
                    icon: "trello-home dashboard-icon",
                    function: 'setBoardStar()'

                },
                {
                    txt: "Map",
                    icon: "trello-home location-icon",
                    function: 'setBoardStar()'

                },
            ]
        }
    },

};
</script>

<style>

</style>
