<template>
    <section v-if="boardMembers" class="task-editor flex column">
        <span class=" title">Members</span>
        <input type="search" placeholder="Search members" />
        <span class="mini-title">Board members</span>
        <section class="members-container">
            <div v-for="member in boardMembers" class="member ">
                <div class="member-user flex row align-center " @click.stop="toggleMember(member)">
                    <div class="flex align-center  grow ">
                        <span class="btn member-image " :style="memberImage(member.imgUrl)">
                        </span>
                        <span class="fullname ">{{ member.fullname + " " }}</span>
                    </div>
                    <div v-if="isMemberInTask(member._id)">
                        <div class="trellicons tick-icon "></div>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>
<script>
import { utilService } from "../services/util.service";

export default {
    name: "members-edit",
    props: [],
    components: {},
    created() { },
    data() {
        return {
            boardMembers: this.$store.getters.members.slice() || null,
            taskMembersIds: this.$store.getters.getEditedTask.memberIds.slice() || null,
        };
    },
    methods: {
        getInitials(fullname) {
            return utilService.getInitials(fullname);
        },
        memberImage(imgUrl) {
            return { backgroundImage: `url(${imgUrl})` };
        },
        toggleMember(clickedMember) {
            this.getTaskMembersIds
            console.log('********************', clickedMember)
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
        isMemberInTask(memberId) {
            if (!this.taskMembersIds) return
            return this.taskMembersIds.includes(memberId)
        }

    },
    computed: {
        getBoardMembers() {
            this.boardMembers = JSON.parse(JSON.stringify(this.$store.getters.members));

        },
        getTaskMembersIds() {
            this.taskMembersIds = JSON.parse(JSON.stringify(this.$store.getters.getEditedTask.memberIds));

        }


    },
};
</script>
