<template>
    <section class="tasks-filter">
        <div class="tasks-filter-header">
            <h2>Filter</h2>
            <span class="trellicons x-icon" @click="close"></span>
        </div>

        <div class="tasks-filter-main">
            <div class="text-filter">
                <p>Keyword</p>
                <input type="text" placeholder="Enter a keyword..." v-model="filterBy.title" @input="doFilter"
                    @keyup.enter="($event) => $event.target.blur()">
                <small>Search cards, members, labels, and more.</small>
            </div>
            <div class="members-filter">
                <p>Members</p>
                <label for="no-members">
                    <input id="no-members" type="checkbox" @change="toggleIsNoMembers">
                    <div>
                        <span>

                        </span>
                        No members
                    </div>
                </label>
                <label for="self-assign">
                    <input id="self-assign" type="checkbox" @change="toggleIsAssignToMe">
                    <div>
                        <span class="user-icon">
                            {{ getInitials(loggedinUser.fullname) }}
                        </span>
                        Cards assigned to me
                    </div>
                </label>
                <!-- <label for="task-members">
                    <input id="task-members" type="checkbox"> -->
                <div @click="isShowMembers = !isShowMembers" class="board-members" >
                    Select members
                    <span>
                        >
                    </span>

                    <div v-for="member in members" v-if="isShowMembers" class="board-member">
                        <label @click.stop="">
                            <input type="checkbox" v-model="filterBy.membersIds" :value="member._id"
                                @change="filterByMember">
                                <span class="user-icon">
                                {{ getInitials(member.fullname) }}
                            </span>
                            <span>{{ member.fullname }}</span>
                        </label>
                    </div>
                </div>
                <!-- </label> -->
            </div>
        </div>
    </section>
</template>

<script>
import { utilService } from '../services/util.service';
export default {
    data() {
        return {
            filterBy: {
                title: '',
                membersIds: [],
                isNoMembers: false,
                isAssignToMe: false
            },
            isShowMembers: false,
        }
    },
    created() {
        console.log(this.loggedinUser);
    },
    methods: {
        doFilter() {
            this.$emit('doFilter', this.filterBy)
        },
        toggleIsNoMembers() {
            this.filterBy.isNoMembers = !this.filterBy.isNoMembers
            // console.log(this.filterBy.isNoMembers)
            this.$emit('doFilter', this.filterBy)
        },
        toggleIsAssignToMe() {
            this.filterBy.isAssignToMe = !this.filterBy.isAssignToMe
            this.$emit('doFilter', this.filterBy)
        },
        close() {
            this.$emit('closeFilter')
        },
        filterByMember(id) {
            console.log(this.filterBy.membersIds);
            this.$emit('doFilter', this.filterBy)
            // const memberIdx = this.membersIds.findIndex(memberId => memberId === id)
            // memberIdx === -1 ? this.membersIds.push(id) : this.membersIds.splice(memberIdx, 1)
        },
        getInitials(fullname) {
            return utilService.getInitials(fullname)
        },
    },
    computed: {
        members() {
            return this.$store.getters.board.members
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser
        }
    }
}
</script>