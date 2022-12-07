<template>
    <section class="add-board-members">
        <div class="add-board-members-header">
            <div>Share board</div>
            <button class="btn-close">
                <span class="trellicons x-icon" @click.stop="close"></span>
            </button>
        </div>

        <div class="add-board-members-search">
            <input type="text" placeholder="Email address or name">
            <button>Share</button>
        </div>

        <div class="board-members">
            <div v-for="member in boardMembers" :key="member._id" class="board-member">
                <div class="member-user flex row align-center" @click.stop="toggleMember(member._id)">
                    <div class="flex align-center grow">
                        <div v-if="member.imgUrl" class="member-image" :style="memberImage(member.imgUrl)"> </div>
                        <span v-else class="member-initials">
                            {{ getInitials(member.fullname) }}
                        </span>
                        <span class="fullname">{{ member.fullname + " " }}</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { utilService } from "../services/util.service";

export default {

    name: "members-edit",
    props: [],
    components: {},
    created() {
        this.debounceHandler = utilService.debounce(this.getBoardMembers, 500)

        // console.log(this.boardMembers)
    },
    data() {
        return {
            boardMembers: null,
            taskMembersIds: this.$store.getters.getEditedTask.memberIds,
            filterByName: '',
        };
    },
    methods: {
        getInitials(fullname) {
            return utilService.getInitials(fullname);
        },
        memberImage(imgUrl) {
            return { backgroundImage: `url(${imgUrl})` };
        },
        toggleMember(clickedMemberId) {
            this.$emit('toggleMember', clickedMemberId)
            var action
            const memberIdx = this.taskMembersIds.findIndex(id => {
                return clickedMember._id === id
            })
            if (memberIdx < 0) {
                this.taskMembersIds.push(clickedMember._id)
                action = 'added'
            } else {
                this.taskMembersIds.splice(memberIdx, 1)
                action = 'removed'
            }
            this.$emit('updateMembers', 'members-edit', { memberIds: this.taskMembersIds, fullname: clickedMember.fullname, action })

        },
        // isMemberInTask(memberId) {
        //     if (!this.taskMembersIds) return
        //     return this.taskMembersIds.includes(memberId)
        // },
        // getBoardMembers() {
        //     // console.log('members')
        //     const boardMembers = JSON.parse(JSON.stringify(this.$store.getters.members))

        //     const regex = new RegExp(this.filterByName, 'i');

        //     this.boardMembers = boardMembers.filter(member => regex.test(member.fullname))

        // },
        close() {
            this.$emit('close')
        }


    },
    computed: {

        boardMembers() {
            return this.$store.getters.board.members

        },
        users() {
            return this.$store.getters.users
        },
        noSearchResults() {
            return !this.boardMembers.length

        },


    },
};
</script>
