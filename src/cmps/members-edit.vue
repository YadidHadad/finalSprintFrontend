<template>
    <section class="task-editor flex column">
        <span class="title">Members</span>
        <input type="search" placeholder="Search members" />
        <span class="mini-title">Board members</span>
        <div v-for="member in members" class="member flex row align-start grow">
            <div class="member-user flex row align-center">
                <span class="btn member-image flex row align-baseline align-center justify-center"
                    :style="memberImage(member.imgUrl)">
                </span>
                <span class="fullname">{{ member.fullname + " " }}</span>
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
    created() { },
    data() {
        return {
            members: this.$store.getters.members,
        };
    },
    methods: {
        getInitials(fullname) {
            return utilService.getInitials(fullname);
        },
        memberImage(imgUrl) {
            console.log(imgUrl);
            return { backgroundImage: `url(${imgUrl})` };
        },
    },
    computed: {},
};
</script>
