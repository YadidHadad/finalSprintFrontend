<template>
    <section class="board-menu" :class="{ menuIsHidden: menuIsHidden }">
        <section v-if="!showBGCMenu" class="board-menu-page  flex column">
            <section class="title flex justify-between row">
                <button class="btn" @click="toggleBoardMenu">
                    <!-- <span class="fa-solid arrow-icon"></span> -->
                </button>
                <span>Menu</span>
                <button class="btn" @click="toggleBoardMenu">
                    <span class="fa-solid x-icon"></span>
                </button>
            </section>

            <section class="menu-container actions">
                <section class="nav-btns flex column">
                    <button class="btn">
                        <span class="fa-brands trello-icon"></span>
                        <span>About this board</span>
                    </button>
                    <button class="btn" @click="this.showBGCMenu = !this.showBGCMenu">
                        <span class="fa-regular img-icon"></span>
                        <span>Change background</span>
                    </button>
                </section>

                <section class="activities">
                    <button class="btn ">
                        <span class="trellicons activity-icon"></span>
                        <span>Activity</span>
                    </button>
                    <div class="activities-container">
                        <div v-for="activity in activities" class="activity flex row align-start">
                            <div class="activity">
                                <span class="btn flex row align-baseline align-center justify-center">{{
                                        getInitials(activity.byMember.fullname)
                                }}</span>
                            </div>
                            <div class=" flex column justify-start">
                                <div>
                                    <span class="fullname">{{ activity.byMember.fullname + ' ' }}</span>
                                    <span>{{ activity.txt }}</span>
                                </div>
                                <span>{{ getTimeAgo(activity.createdAt) }}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </section>

        <section v-if="showBGCMenu" class="board-menu-page  flex column">
            <section class="title flex justify-between row">
                <button class="btn" @click="this.showBGCMenu = !this.showBGCMenu">
                    <span class="fa-solid arrow-icon"></span>
                </button>
                <span>Change background</span>
                <button class="btn" @click="toggleBoardMenu">
                    <span class="fa-solid x-icon"></span>
                </button>
            </section>
            <section>
                <div class="  flex row align-center justify-between">
                    <div class=" photos flex column align-center">
                        <div class="btn">
                        </div>
                        <span>Photos</span>
                    </div>
                    <div class="colors flex column  align-center">
                        <div class="btn">
                        </div>
                        <span>Colors</span>
                    </div>
                </div>
            </section>
            <section>
                <span>Costume</span>

                <div class="costume flex column ">
                    <div class="btn flex align-center justify-center">
                        <span class="fa-regular plus-icon"></span>
                    </div>
                </div>
            </section>
        </section>
    </section>
</template>
<script>

import { utilService } from '../services/util.service';

export default {
    name: 'board-menu',
    emit: ['toggleBoardMenu'],
    props: ['menuIsHidden', 'activities'],
    components: {},
    created() {
    },
    data() {
        return {

            showBGCMenu: false,

        };
    },
    methods: {
        getInitials(fullname) {

            return utilService.getInitials(fullname)
        },
        getTimeAgo(timestamp) {

            return utilService.timeAgo(timestamp)
        },
        toggleBoardMenu() {
            console.log("A");
            this.$emit("toggleBoardMenu", this.toggleBoardMenu);
        },
    },
    computed: {},
};
</script>
