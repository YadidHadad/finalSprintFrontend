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
                    @keyup.enter="doFilter">
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
                    <div v-if="loggedinUser.imgUrl" class="member-image" :style="memberImage(loggedinUser.imgUrl)"
                        :title="loggedinUser.fullname"> </div>
                    <span v-else class="member-initials" :title="loggedinUser.fullname">
                        {{ getInitials(loggedinUser.fullname) }}
                    </span>
                    <span>Cards assigned to me</span>
                </label>
                <!-- <label for="task-members">
                    <input id="task-members" type="checkbox"> -->
                <div @click="isShowMembers = !isShowMembers" class="board-members">
                    Select members
                    <span :style="rotateIcon">
                        >
                    </span>

                    <div v-for="member in members" v-if="isShowMembers" class="board-member">
                        <label @click.stop="">
                            <input type="checkbox" v-model="filterBy.membersIds" :value="member._id"
                                @change="filterByMember">
                            <div v-if="member.imgUrl" class="member-image" :style="memberImage(member.imgUrl)"
                                :title="member.fullname"> </div>
                            <span v-else class="member-initials" :title="member.fullname">
                                {{ getInitials(member.fullname) }}
                            </span>
                            <span>{{ member.fullname }}</span>
                        </label>
                    </div>
                </div>

                <div class="board-labels">
                    <span>Labels</span>
                    <label>
                        <input type="checkbox" @change="toggleIsNoLabels">
                        <span>No labels</span>
                    </label>
                    <label v-for="(label, index) in labels" :key="label.id" class="flex row align-center">
                        <input class="check-box" type="checkbox" v-model="filterBy.labelIds" :value="label.id"
                            @change="doFilter">
                        <div class="label-color grow flex align-center"
                            :style="{ backgroundColor: rgbaColors[label.id] }">
                            <div :style="{ backgroundColor: label.color }" class="color-circle"></div>
                            {{ label.title }}
                        </div>
                    </label>
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
                isAssignToMe: false,
                labelIds: [],
                isNoLabels: false
            },
            isShowMembers: false,
            rgbaColors: {}
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
            // console.log(this.filterBy.membersIds);
            this.$emit('doFilter', this.filterBy)
            // const memberIdx = this.membersIds.findIndex(memberId => memberId === id)
            // memberIdx === -1 ? this.membersIds.push(id) : this.membersIds.splice(memberIdx, 1)
        },
        toggleIsNoLabels() {
            this.filterBy.isNoLabels = !this.filterBy.isNoLabels
            this.$emit('doFilter', this.filterBy)
        },
        getInitials(fullname) {
            return utilService.getInitials(fullname)
        },
        memberImage(imgUrl) {
            return { backgroundImage: `url(${imgUrl})` };
        },
        hexToRgbA(hex) {
            // console.log(hex)
            var c;
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',0.5)';
        },
    },
    computed: {
        members() {
            return this.$store.getters.board.members
        },
        labels() {
            const labels = this.$store.getters.labels
            labels.forEach(label => {
                // console.log(label.color)
                this.rgbaColors[label.id] = this.hexToRgbA(label.color)
            })
            return JSON.parse(JSON.stringify(labels))
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser
        },
        rotateIcon() {
            if (this.isShowMembers) {
                return { transform: 'rotate(90deg)' }
            }
        }
    }
}
</script>