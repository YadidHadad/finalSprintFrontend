<template>
    <section v-if="board" class="board-details flex row" :style="boardBGC">
        <board-nav :rgb="rgb" :boards="boards"></board-nav>
        <section class="main flex column grow">
            <board-header :title="board.title" :class="{ isDark: rgb.isDark, menuIsShown: !menuIsHidden }" :rgb="rgb"
                :members="board.members" :isStarred="board.isStarred" @toggleBoardMenu="toggleBoardMenu" />
            <group-list @addTask="addNewTask" @addGroup="addNewGroup" @removeGroup="removeGroup" :groups="board.groups"
                :boardId="board._id" />
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
            // style: 'src/assets/img/bgc-img-5.jpg',
            rgb: {
                value: '',
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

    created() {
        this.setBoardId()

    },

    methods: {
        async setBoardId() {
            const { id } = this.$route.params
            this.$store.commit({ type: 'setBoard', boardId: id })
            try {

                const avgColor = await this.avgColor()
                this.rgb.value = avgColor.value
                this.rgb.isDark = avgColor.isDark
                this.$emit('setRGB', this.rgb)
            } catch (err) {
                console.log(err)
            }
        },
        async avgColor() {

            console.log(this.board)
            const url = this.board.style.backgroundImage
            try {
                const color = await fac.getColorAsync(url)
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

        // pacimict
        // let boardToSave = structuredClone(this.board)
        // boardToSave.groups.push(group)
        // try {

        //     var board = this.$store.dispatch({ type: 'addBoard', board: boardToSave })
        //     this.board = board
        // } catch (err) {

        // }

        toggleBoardMenu() {
            this.menuIsHidden = !this.menuIsHidden
        },

    },

    computed: {
        boardBGC() {
            console.log()
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
    },

    watch: {
        $route(to, from) {
            this.setBoardId()
        }

    }

}
</script>