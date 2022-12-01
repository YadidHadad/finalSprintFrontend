<template>
    <section class="board-menu flex column" :class="{ menuIsHidden: menuIsHidden }">
        <section class="title flex justify-between row">
            <button class="btn" @click="toggleBoardMenu">
                <span class="fa-solid arrow-icon"></span>
            </button>
            <span>Menu</span>
            <button class="btn" @click="toggleBoardMenu">
                <span class="fa-solid x-icon"></span>
            </button>
        </section>

        <section class="nav-btns flex column">
            <button class="btn">
                <span class="fa-brands trello-icon"></span>
                <span>About this board</span>
            </button>
            <button class="btn">
                <span class="fa-regular img-icon"></span>
                <span>Change background</span>
            </button>
        </section>

        <section class="activities">
            <button class="btn">
                <span class="fa-solid act-icon"></span>
                <span>Activity</span>
            </button>
            <div>
                <div v-for="activity in activities" class="activity flex row align-baseline">
                    <span class="btn">{{ getInitials(activity.byMember.fullname) }}</span>
                    <div>
                        <span>{{ activity.byMember.fullname }}</span>
                        <span>{{ activity.txt }}</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- <div class="nav-btns flex column">
            <button v-for="btn in btns" class="btn">
                <span :class="btn.icon"></span>
                <span>{{ btn.txt }}</span>
            </button>
        </div> -->




    </section>
</template>
<script>

import { utilService } from '../services/util.service';

export default {
    name: 'board-menu',
    props: ['menuIsHidden', 'activities'],
    components: {},
    created() {

        console.log(`activities:`, this.activities)
    },
    data() {
        return {

        };
    },
    methods: {
        getInitials(fullname) {

            return utilService.getInitials(fullname)
        },
        toggleBoardMenu() {
            console.log("A");
            this.$emit("toggleBoardMenu", this.toggleBoardMenu);
        },
    },
    computed: {},
};
</script>
