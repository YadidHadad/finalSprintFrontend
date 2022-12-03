<template>
    <section v-if="boardMembers" class="members-preview flex column">
        <span v-if="isTaskDetails" class="title">Members</span>
        <section class="members-container flex row align-center">
            <div v-for="member in taskMembers">
                <div class=" member-image" :style="memberImage(member.imgUrl)"> </div>
            </div>
            <div v-if="isTaskDetails" class="btn-plus flex justify-center align-center" @click="openMembersEditor">
                <span class="fa-regular plus-icon"></span>
            </div>
        </section>
    </section>
</template>

<script>

export default {
    name: 'members-preview',
    props: ['memberIds', 'isTaskDetails'],
    components: {},
    created() {
        console.log(this.memberIds, '***************')
        this.boardMembers = this.$store.getters.members

    },
    data() {
        return {
            boardMembers: null,
            // taskMembers: null,

        }
    },
    methods: {
        memberImage(imgUrl) {
            return { backgroundImage: `url(${imgUrl})` };
        },
        openMembersEditor() {
            this.$emit('openMembersEditor')
        }

    },
    computed: {
        taskMembers() {

            const members = this.boardMembers.filter(member => {
                return this.memberIds.includes(member._id)
            })

            return members
        },
    },
}
</script>
