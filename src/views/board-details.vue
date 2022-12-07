<template>
    <section v-if="board" class="board-details flex row" :style="boardBGC">
        <section class="main flex column grow">
            <board-header :board="board" :class="{ isDark: rgb.isDark, menuIsShown: !menuIsHidden }" :rgb="rgb"
                @toggleBoardMenu="toggleBoardMenu" @filterTasks="filterTasks" />
            <filter-tasks-modal v-if="showFilter" @closeFilter="(showFilter = false)"  @doFilter="doFilter"/>

            <group-list @addTask="addNewTask" @addGroup="addNewGroup" @removeGroup="removeGroup" :groups="board.groups"
                :boardId="board._id" :rgb="rgb" />
        </section>
        <board-nav :rgb="rgb" :boards="boards"></board-nav>
        <board-menu :menuIsHidden="menuIsHidden" :activities="board.activities" @toggleBoardMenu="toggleBoardMenu" />
        <!-- <router-view class="task-details-view"></router-view> -->
    </section>

    <task-details v-if="this.$route.params.taskId" />
</template>


<script>
import { boardService } from '../services/board.service.local'
import { boardStore } from '../store/modules/board-store'
import { FastAverageColor } from 'fast-average-color'

import boardHeader from '.././cmps/board-header.vue'
import groupList from '../cmps/group-list.vue'
import boardNav from '../cmps/board-nav.vue'
import boardMenu from '../cmps/board-menu.vue'
import taskDetails from '../views/task-details.vue'
import filterTasksModal from '../cmps/filter-tasks-modal.vue'


const fac = new FastAverageColor();

export default {

    emits: ['setRGB'],

    data() {
        return {
            menuIsHidden: true,
            // style: 'src/assets/img/bgc-img-5.jpg',
            rgb: {
                value: '',
                isDark: false,
            },
            showFilter: false,
        }
    },

    components: {
        boardNav,
        boardHeader,
        groupList,
        boardMenu,
        taskDetails,
        filterTasksModal
    },

    created() {
        this.setBoardId()

    },

    methods: {
        async setBoardId() {
            if (!this.$route.params.id) return
            const { id } = this.$route.params
            this.$store.commit({ type: 'setBoard', boardId: id })
            try {
                if (this.board.style.bgColor) {
                    this.rgb.value = this.hexToRgbA(this.board.style.bgColor)
                    // console.log(this.rgb.value)
                    this.rgb.isDark = true
                } else {

                    const avgColor = await this.avgColor()
                    this.rgb.value = avgColor.value
                    this.rgb.isDark = avgColor.isDark

                }
                this.$emit('setRGB', this.rgb)

            } catch (err) {
                console.log(err)
            }
        },
        async avgColor() {

            // console.log(this.board)
            const url = this.board.style.backgroundImage
            try {
                const color = await fac.getColorAsync(url)
                // console.log(color)
                return color
            } catch (err) {
                console.log(`err:`, err)
            }
        },

        async addNewGroup(group, activity) {
            var board = JSON.parse(JSON.stringify(this.board))
            try {
                await this.$store.dispatch({ type: 'addGroup', board: board, group, activity })
            }
            catch (err) {
                console.log(err)
            }
        },

        async removeGroup(groupId, activity) {
            var board = JSON.parse(JSON.stringify(this.board))
            try {
                await this.$store.dispatch({ type: 'removeGroup', board: board, groupId, activity })
            }
            catch (err) {
                console.log(err);
            }

        },

        async addNewTask(groupId, task, activity) {
            // var board = JSON.parse(JSON.stringify(this.board))
            const boardId = this.board._id
            try {
                await this.$store.dispatch({ type: 'addTask', boardId, groupId, task, activity })
            }
            catch (err) {
                console.log(err);
            }
        },

        hexToRgbA(hex) {
            // console.log(hex)
            var c;
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            const color = [(c >> 16) & 255, (c >> 8) & 255, c & 255, 255]
            // console.log(color)
            return color
        },

        toggleBoardMenu() {
            this.menuIsHidden = !this.menuIsHidden
        },

        filterTasks() {
            this.showFilter = true
        },

        doFilter(filterBy) {
            console.log(filterBy)
        }
    },

    computed: {
        boardBGC() {
            if (this.board.style.bgColor) return { backgroundColor: this.board.style.bgColor }

            return { backgroundImage: `url(${this.board.style.backgroundImage})` }
        },
        color() {
            return this.rgb
        },
        board() {
            return this.$store.getters.board
        },
        boards() {
            return this.$store.getters.boards
        },
        style() {
            return this.$store.getters.board?.style
        }
    },

    watch: {
        $route(to, from) {
            this.setBoardId()
        },
        style(to, from) {
            this.setBoardId()
        }

    }

}
</script>