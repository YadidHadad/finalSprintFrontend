<template>
    <section v-if="board" class="board-details flex row" :style="boardBGC">
        <board-nav :rgb="rgb"></board-nav>
        <section class="flex column grow">
            <board-header :title="board.title" :class="{ isDark: rgb.isDark }" :rgb="rgb" />
            <group-list @addTask="addNewTask" @addGroup="addNewGroup" :groups="board.groups" :boardId="board._id" />
        </section>
        <!-- <router-view class="task-details-view"></router-view> -->
    </section>

</template>


<script>
import { boardService } from '../services/board.service.local'
import boardHeader from '.././cmps/board-header.vue'
import groupList from '../cmps/group-list.vue'
import { FastAverageColor } from 'fast-average-color'

import boardNav from '../cmps/board-nav.vue'

const fac = new FastAverageColor();

export default {

    data() {
        return {
            board: null,
            style: 'src/assets/img/bgc-img-3.jpg',
            rgb: {
                value: [],
                isDark: false,
            },

        }
    },
    components: {
        boardNav,
        boardHeader,
        groupList
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
        addNewGroup(group) {
            this.board.groups.push(group)
            this.$store.dispatch({ type: 'addBoard', board: { ...this.board } })
        },
        addNewTask(group) {
            this.board.groups.push(group)
            this.$store.dispatch({ type: 'addBoard', board: { ...this.board } })
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