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
            color: null

        }
    },
    components: {
        boardNav
    },
    async created() {
        const { id } = this.$route.params
        this.board = await boardService.getById(id)
        this.color = await this.avgColor()
        console.log(this.color)
        this.$emit('setHeaderColor', this.color)


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
        }
    },

    computed: {
        boardBGC() {
            return { backgroundImage: `url(${this.style})` }

        },
    },
}
</script>