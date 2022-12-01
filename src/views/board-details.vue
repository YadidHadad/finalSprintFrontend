<template>
    <section v-if="board" class="board-details flex row" :style="boardBGC">
        <board-nav :rgb="rgb"></board-nav>
        <section class="main flex column grow">
            <board-header :title="board.title" :class="{ isDark: rgb.isDark, menuIsShown: !menuIsHidden }" :rgb="rgb"
                :members="board.members" :isStarred="board.isStarred" @toggleBoardMenu="toggleBoardMenu" />
            <group-list @addTask="addNewTask" @addGroup="addNewGroup" :groups="board.groups" :boardId="board._id" />
        </section>
        <board-menu :menuIsHidden="menuIsHidden" @toggleBoardMenu="toggleBoardMenu" />
        <!-- <router-view class="task-details-view"></router-view> -->
    </section>

</template>


<script>
import { boardService } from '../services/board.service.local'
import { boardStore } from '../store/modules/board-store'
import { FastAverageColor } from 'fast-average-color'

import boardHeader from '.././cmps/board-header.vue'
import groupList from '../cmps/group-list.vue'
import boardNav from '../cmps/board-nav.vue'
import boardMenu from '../cmps/board-menu.vue'
import { toHandlers } from 'vue'


const fac = new FastAverageColor();

export default {

    data() {
        return {
            menuIsHidden: true,
            board: null,
            style: 'src/assets/img/bgc-img-1.jpg',
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
    },
    async created() {
        const { id } = this.$route.params
        this.board = await boardService.getById(id)
        const avgColor = await this.avgColor()
        console.log(avgColor)
        this.rgb.value = avgColor.value
        this.rgb.isDark = avgColor.isDark
        console.log(this.rgb)
        this.$emit('setRGB', this.rgb)


    },
    methods: {
        async avgColor() {
            const url = this.style
            try {
                const color = await fac.getColorAsync(url)
                console.log(`avg color:`, color)
                return color
            } catch (err) {
                console.log(`err:`, err)
            }
        },

        async addNewGroup(group) {
            this.board.groups.push(group)
            try {
                this.$store.dispatch({ type: 'addBoard', board: { ...this.board } })

            }
            catch (err) {
                this.board.groups.pop()
                console.log(err);
                showErrorMsg("Cannot add list");
            }
        },

        async addNewTask(groupId, task, activity) {
            const groupIdx = this.board.groups.findIndex((group) => group.id === groupId)
            this.board.groups[groupIdx].tasks.push(task)
            this.board.activities.push(activity)
            try {
                this.$store.dispatch({ type: 'addBoard', board: { ...this.board } })
            } catch (err) {
                this.board.groups[groupIdx].tasks.pop()
                this.board.activities.push(activity.txt = "Cannot add task")
                console.log(err);
                showErrorMsg("Cannot add task");
            }
            // pacimict
            // let boardToSave = structuredClone(this.board)
            // boardToSave.groups.push(group)
            // try {

            //     var board = this.$store.dispatch({ type: 'addBoard', board: boardToSave })
            //     this.board = board
            // } catch (err) {

            // }
        },
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
        }
    },
}
</script>