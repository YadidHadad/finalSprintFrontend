<template>
    <section class="board-details flex row" v-if="board" :style="boardBGC">
        <board-nav :color="color"></board-nav>
        <h1>{{ board.title }}</h1>
    </section>

</template>

<script>
import { boardService } from '../services/board.service.local'
import { FastAverageColor } from 'fast-average-color';

import boardNav from '../cmps/board-nav.vue'

const fac = new FastAverageColor();

export default {

    data() {
        return {
            board: null,
            style: 'src/assets/img/bgc-img-2.jpg',
            color: {
                rgb: '',
                isDark: false,
            },

        }
    },
    components: {
        boardNav
    },
    async created() {
        const { id } = this.$route.params
        this.board = await boardService.getById(id)
        const avgColor = await this.avgColor()
        console.log(avgColor)
        this.color.rgb = avgColor.rgb
        this.color.isDark = avgColor.isDark
        console.log(this.color)
        this.$emit('setColor', this.color)


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
        }
    },

    computed: {
        boardBGC() {
            return { backgroundImage: `url(${this.style})` }

        },
    },
}
</script>