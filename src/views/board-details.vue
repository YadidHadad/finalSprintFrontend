<template>
    <section v-if="board" class="board-details flex row" :style="boardBGC">
        <board-nav :rgb="rgb"></board-nav>
        <section class="main flex column grow">
            <board-header :title="board.title" :class="{ isDark: rgb.isDark, menuIsShown: !menuIsHidden }" :rgb="rgb"
                :members="board.members" :isStarred="board.isStarred" @toggleBoardMenu="toggleBoardMenu" />
            <group-list @addTask="addNewTask" @addGroup="addNewGroup" :groups="board.groups" :boardId="board._id" />
        </section>
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

const fac = new FastAverageColor();

export default {

    emits: ['setRGB'],

    data() {
        return {
            menuIsHidden: true,
            style: 'src/assets/img/bgc-img-5.jpg',
            rgb: {
                value: [],
                isDark: false,
            },
        }
    },

    components: {
        boardNav,
        boardHeader,
        groupList,
        boardMenu,
        taskDetails
    },

    async created() {
        const { id } = this.$route.params
        this.$store.commit({ type: 'setBoard', boardId: id })
        console.log(this.boards)
        try {
            // await this.$store.dispatch({ type: 'loadBoards' })
            // await this.$store.dispatch({ type: 'loadBoards' })
            const avgColor = await this.avgColor()
            this.rgb.value = avgColor.value
            this.rgb.isDark = avgColor.isDark
            this.$emit('setRGB', this.rgb)
        } catch (err) {
            console.log(err)
        }
    },

    methods: {
        async avgColor() {
            const url = this.style
            try {
                const color = await fac.getColorAsync(url)
                return color
            } catch (err) {
                console.log(`err:`, err)
            }
        },

        async addNewGroup(group) {
            var board = JSON.parse(JSON.stringify(this.board))
            try {
                await this.$store.dispatch({ type: 'addGroup', board: board, group })
            }
            catch (err) {
                console.log(err);
            }
        },

        async addNewTask(groupId, task, activity) {
            var board = JSON.parse(JSON.stringify(this.board))
            try {
                await this.$store.dispatch({ type: 'addTask', board, groupId, task, activity })
            }
            catch (err) {
                console.log(err);
            }
        },

        // async addNewTask(groupId, task, activity) {
        //     var board = JSON.parse(JSON.stringify(this.board))
        //     const groupIdx = board.groups.findIndex((group) => group.id === groupId)

        //     if (board.groups[groupIdx].tasks && board.activities) {
        //         board.groups[groupIdx].tasks.push(task)
        //         board.activities.push(activity)
        //     } else {
        //         board.groups[groupIdx].tasks = [task]
        //         board.activities = [activity]
        //     }
        //     try {
        //         this.$store.dispatch({ type: 'updateBoard', board: board })
        //     } catch (err) {
        //         board.groups[groupIdx].tasks.pop()
        //         board.activities.push(activity.txt = "Cannot add task")
        //         console.log(err);
        //         showErrorMsg("Cannot add task");
        //     }
        // pacimict
        // let boardToSave = structuredClone(this.board)
        // boardToSave.groups.push(group)
        // try {

        //     var board = this.$store.dispatch({ type: 'addBoard', board: boardToSave })
        //     this.board = board
        // } catch (err) {

        // }

        toggleBoardMenu() {
            console.log('toggleBoardMenu')
            this.menuIsHidden = !this.menuIsHidden
        }
    },

    computed: {
        boardBGC() {
            return { backgroundImage: `url(${this.style})` }
        },
        color() {
            return this.rgb
        },
        board() {
            console.log(this.$store.getters.board)
            return this.$store.getters.board
        },
        boards() {
            console.log(this.$store.getters.board)
            return this.$store.getters.boards
        }
    },
}
</script>