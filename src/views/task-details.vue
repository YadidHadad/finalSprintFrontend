<template>
    <div class="screen"></div>
    <section v-if="task" class="task-details" v-click-outside="closeDetails">
        <section class="task-cover">
            <button class="btn" @click="closeDetails">
                <span class="trellicons x-icon"></span>
            </button>
        </section>
        <section class="task-header task-cmp flex column align-start">
            <div class="flex row align-center">
                <span class="trellicons card-icon large"></span>
                <input v-model="title" @input="updateTitle" />
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
            <button class="btn" @click="pickEditor('labels-edit')">
                <span class="trellicons labels-icon"></span>
                <span>Labels</span>
            </button>
            <button class="btn" @click="pickEditor('checklist-edit')">
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
            <labels-preview />
            <description-preview :description="task.description" @updateDescription="updateTask" />
            <activities-preview :taskId="task.id" />

            <checklists-preview :checklists="task.checklist" />
        </section>

        <component v-if="pickedEditor.isOpen" :is="pickedEditor.editorType" @closeEdit="closeEditor"
            v-click-outside="closeEditor" @updateTask="updateTask(pickedEditor.editorType, $event)"
            @addChecklist="addChecklist" @updateLabel="updateLabel">
            <h2>HI</h2>
        </component>
    </section>
</template>

<script>
import labelsPreview from "../cmps/labels-preview.vue";
import labelsEdit from "../cmps/labels-edit.vue";
import checklistEdit from "../cmps/checklist-edit.vue";
import checklistsPreview from "../cmps/checklists-preview.vue";
import activitiesPreview from "../cmps/activities-preview.vue";
import descriptionPreview from "../cmps/description-preview.vue";

import { utilService } from "../services/util.service";

export default {
    emits: ["setRGB"],
    props: {},
    components: {
        labelsEdit,
        labelsPreview,
        checklistEdit,
        checklistsPreview,
        activitiesPreview,
        descriptionPreview,
    },

    data() {
        return {
            show: false,
            pickedEditor: {
                isOpen: false,
                editorType: "",
            },
            groupId: this.$route.params.groupId,
            boardId: this.$route.params.boardId,
            task: null,
            showActivities: false,
            description: "",
            title: "",
            // labelIds: this.$store.getters.labelIds
        };
    },
    async created() {
        const { id, taskId, groupId } = this.$route.params;
        console.log(taskId);
        try {
            // await this.$store.dispatch({ type: 'loadBoards' })
            this.$store.commit({ type: "setBoard", boardId: id });
            this.$store.commit({ type: "setEditedTask", taskId, groupId, boardId: id });
            this.task = JSON.parse(JSON.stringify(this.getTask));

            this.title = this.task.title;
            this.description = this.task.description;
        } catch (err) {
            console.log(err);
        }
    },
    methods: {
        updateTitle(ev) {
            console.log(ev.data);
            if (typeof ev.data !== "string") return;
            this.task.title += ev.data;
        },
        pickEditor(type) {

            this.pickedEditor.editorType = type;
            this.pickedEditor.isOpen = true;
            console.log(this.pickedEditor);
        },
        async closeEditor() {
            // await this.updateTask()
            this.pickedEditor = {
                isOpen: false,
                type: "",
            };
        },
        updateLabel(label) {
            this.$store.dispatch({
                type: "updateLabel",
                payload: {
                    label,
                    activity: {
                        txt: "Updated label title",
                        boardId: this.$route.params.id,
                        groupId: this.groupId,
                        taskId: this.task.id,
                        task: {
                            id: this.task.id,
                            title: this.task.title
                        },
                        byMember: {
                            _id: this.user._id,
                            fullname: this.user.fullname,
                            imgUrl: this.user.imgUrl || "",
                        },
                    },
                },
            });
        },
        async updateTask(type, data) {
            console.log(type, data);
            console.log("update task");
            let taskToUpdate = JSON.parse(JSON.stringify(this.task));
            let txt;
            switch (type) {
                case "labels-edit":
                    if (!taskToUpdate?.labelIds) taskToUpdate.labelIds = [];
                    taskToUpdate.labelIds = data.labelIds;
                    txt = "Updated label";
                    // if (!this.task?.labelIds) this.task.labelIds = []
                    // this.task.labelIds = data.labelIds
                    break;
                case "description":
                    txt = "Updated description";
                    taskToUpdate.description = data;
                    break;
                case "title":
                    txt = "Updated title";
                    taskToUpdate.title = data;
                    break;
                case "checklist-edit":
                    txt = "Added checklist";
                    if (!taskToUpdate?.checklists) taskToUpdate.checklists = [];
                    data.id = utilService.makeId();
                    taskToUpdate.checklists.push(data);
                    this.closeEditor();
                    break;
            }
            try {
                let updatedTask = await this.$store.dispatch({
                    type: "updateTask",
                    payload: {
                        task: taskToUpdate,
                        groupId: this.groupId,
                        activity: {
                            txt,
                            boardId: this.$route.params.id,
                            groupId: this.groupId,
                            taskId: this.task.id,
                            task: {
                                id: this.task.id,
                                title: this.task.title
                            },
                            byMember: {
                                _id: this.user._id,
                                fullname: this.user.fullname,
                                imgUrl: this.user.imgUrl || "",
                            },
                        },
                    },
                });
                this.task = updatedTask;
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
            this.closeEditor();
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
        getTask() {
            const task = this.$store.getters.getEditedTask;
            console.log(task);
            return task;
        },
        getTaskLabels() {
            if (!this.task?.labelIds) return [];
            return this.$store.getters.labels.map((label) => {
                if (this.task.labelIds.includes(label.id)) return label;
            });
        },
        getGroupName() {
            const board = this.$store.getters.board;
            console.log(`board:`, board);
            const group = board.groups.find((group) => group.id === this.$route.params.groupId);
            return group.title;

            // return JSON.parse(JSON.stringify(this.$store.getters.getEditedTask)).title
        },
    },
};
</script>
