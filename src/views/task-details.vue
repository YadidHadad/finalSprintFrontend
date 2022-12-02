<template>
    <div class="screen"></div>
    <section v-if="task" class="task-details" v-click-outside="closeDetails">
        <section class="task-cover">
            <button class="btn" @click="closeDetails"><span class="trellicons x-icon"></span></button>

        </section>
        <section class="task-header task-cmp flex column align-start ">
            <div class="flex row align-center">
                <span class="trellicons card-icon large"></span>
                <input v-model="task.title" @input="updateTitle" />
            </div>
            <div class="flex column pad-40">
                <span class="small">In list {{ getGroupName }}</span>
            </div>
        </section>

        <section class="task-details-aside flex column">
            <button class="btn">
                <span class="trellicons members-icon"></span>
                <span>Members</span>
            </button>
            <button class="btn" @click="pickDetails('labels-edit')">
                <span class="trellicons labels-icon"></span>
                <span>Labels</span>
            </button>
            <button class="btn" @click="pickDetails('checklist-edit')">
                <span class="trellicons checklist-icon"></span>
                <span>Checklist</span>
            </button>
            <button class="btn">
                <span class="fa-regular date-icon"></span>
                <span>Dates</span>
            </button>
            <button class="btn">
                <span class="trellicons location-icon"></span>
                <span>Location</span>
            </button>
            <button class="btn">
                <span class="trellicons cover-icon"></span>
                <span>Cover</span>
            </button>
        </section>

        <section class="task-main">
            <labels-preview v-if="task.labels" :labels="task.labels" />

            <task-description :description="task.description"></task-description>
            <task-activities :taskId="task.id"></task-activities>

            <!-- <checklists-preview v-if="task" :checklists="getChecklists" /> -->


        </section>

        <component v-if=detailsPicked.isPicked :is="detailsPicked.type" @closeEdit="closeEdit"
            v-click-outside="closeEdit" @updateTask="updateTask(detailsPicked.type, $event)"
            @addChecklist="addChecklist">
            <h2>HI</h2>
        </component>
    </section>
</template>

<script>


import labelsPreview from "../cmps/labels-preview.vue";
import labelsEdit from "../cmps/labels-edit.vue";
import checklistEdit from "../cmps/checklist-edit.vue";
import checklistsPreview from "../cmps/checklists-preview.vue";
import taskDescription from '../cmps/task-description.vue'
import taskActivities from '../cmps/task-activities.vue'





export default {
    emits: ['setRGB'],
    props: {

    },
    components: {
        labelsEdit,
        labelsPreview,
        checklistEdit,
        checklistsPreview,
        taskDescription,
        taskActivities
    },

    data() {
        return {
            show: false,
            detailsPicked: {
                isPicked: false,
                type: "",
            },
            // task: null,
            groupId: '',
            showActivities: false,
            isDescOpen: false
            // labelIds: this.$store.getters.labelIds
        };
    },
    async created() {
        const { id, taskId, groupId } = this.$route.params;
        this.groupId = groupId
        try {
            // await this.$store.dispatch({ type: 'loadBoards' })
            this.$store.commit({ type: "setBoard", boardId: id });
            this.$store.commit({ type: "setEditedTask", taskId, groupId, boardId: id });

        } catch (err) {
            console.log(err);
        }
    },
    unmounted() {
        console.log('byeeeeeee');
    },
    methods: {
        updateTitle(ev) {
            console.log(ev.data)
            if (typeof ev.data !== "string") return;
            this.task.title += ev.data;
        },
        pickDetails(type) {
            this.detailsPicked.type = type;
            this.detailsPicked.isPicked = true;
        },
        async closeEdit() {
            // await this.updateTask()
            this.detailsPicked = {
                isPicked: false,
                type: "",
            };
        },
        async updateTask(type, { labelIds }) {
            let taskToUpdate = this.task;
            switch (type) {
                case 'labels-edit':
                    if (!taskToUpdate?.labelIds) taskToUpdate.labelIds = []
                    taskToUpdate.labelIds = data.labelIds
                    txt = 'Updated label'
                    // if (!this.task?.labelIds) this.task.labelIds = []
                    // this.task.labelIds = data.labelIds
                    break
            }
            try {
                let updatedTask = await this.$store.dispatch({
                    type: "updateTask",
                    payload: {
                        task: taskToUpdate,
                        groupId: this.groupId,
                        activity: {
                            txt: "Updated label",
                            boardId: this.$route.params.id,
                            groupId: this.groupId,
                            taskId: this.task.id,
                            byMember: {
                                _id: this.user._id,
                                fullname: this.user.fullname,
                                imgUrl: this.user.imgUrl || "",
                            },
                        },
                    },
                });
                this.task = taskToUpdate;
            } catch (err) {
                console.log("Failed in task update", err);
            }
        },
        closeDetails() {
            this.$store.dispatch({
                type: "updateTask",
                payload: {
                    task: this.task,
                    boardId: this.$route.params.id,
                    groupId: this.groupId,
                },
            });
            this.$router.push(`/board/${this.$route.params.id}`);
        },
        async addChecklist(checklist) {
            await this.$store.dispatch({
                type: "addChecklist",
                payload: {
                    task: this.task,
                    checklist,
                    groupId: this.groupId,
                    activity: {
                        txt: "Added checklist",
                        boardId: this.$route.params.id,
                        groupId: this.groupId,
                        taskId: this.task.id,
                    },
                },
            });
            this.closeEdit();
        },
    },
    computed: {
        getLabels() {
            return this.$store.getters.labels;
        },
        getChecklists() {
            return this.$store.getters.checklists;
        },

        user() {
            return this.$store.getters.loggedinUser;
        },
        task() {
            const task = JSON.parse(JSON.stringify(this.$store.getters.getEditedTask))
            return task
        },
        getTaskLabels() {
            if (!this.task?.labelIds) return []
            return this.$store.getters.labels.map(label => {
                if (this.task.labelIds.includes(label.id))
                    return label
            })
        },
        getGroupName() {
            const board = this.$store.getters.board
            console.log(`board:`, board)
            const group = board.groups.find(group => group.id === this.$route.params.groupId)
            return group.title

            // return JSON.parse(JSON.stringify(this.$store.getters.getEditedTask)).title

        }
    },
};
</script>
