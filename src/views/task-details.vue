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
                <input v-model="title" @input="debounceHandler('title', title)" />
            </div>
            <div class="flex column pad-40">
                <span class="small">In list {{ getGroupName }}</span>
            </div>
        </section>

        <section class="task-details-aside ">
            <section class="flex column">
                <h4>Add to card</h4>
                <button class="btn" @click="pickEditor('members-edit')">
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
                <button class="btn" @click="pickEditor('dates-edit')">
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
            <section class="btns-actions flex column">
                <h4>Actions</h4>
                <button class="btn" @click="pickEditor('copy-task-edit')">
                    <span class="trellicons move"></span>
                    <span>Move</span>
                </button>
                <button class="btn" @click="pickEditor('copy-task-edit')">
                    <span class="trellicons copy"></span>
                    <span>Copy</span>
                </button>
                <button class="btn" @click="removeTask">
                    <span class="trellicons archive"></span>
                    <span>Remove</span>
                </button>
            </section>
        </section>
        <!-- @updateChecklists="updateTask('checklist-preview', $event)" /> -->
        <section class="task-main">
            <dates-preview @markComplete="updateTask('dates-preview', $event)" :isComplete="this.task.isComplete" />
            <section class="task-tags flex row pad-40">
                <members-preview v-if="task.memberIds" :memberIds="task.memberIds"
                    @openMembersEditor="openMembersEditor" :isTaskDetails="true" />
                <labels-preview v-if="task.labelIds" />
            </section>
            <description-preview :description="task.description"
                @updateDescription="updateTask('description', $event)" />
            <!-- <checklists-preview v-if="task.checklists" :checklists="task.checklists"
                @updateChecklists="updateTask('checklist-preview', $event)" /> -->
            <checklists-preview v-if="task.checklists" :checklists="task.checklists"
                @updateChecklists="debounceHandler('checklist-preview', $event)" />
            <activities-preview :taskId="task.id" />
        </section>

        <component :is="pickedEditor.editorType" @closeEdit="closeEditor" v-click-outside="closeEditor"
            @updateTask="updateTask(pickedEditor.editorType, $event)" @addChecklist="addChecklist"
            @updateLabel="updateLabel" @updateMembers="updateTask" @copyTask="copyTask">
            <h2>HI</h2>
        </component>
    </section>
</template>

<script>
import labelsPreview from "../cmps/labels-preview.vue";
import labelsEdit from "../cmps/labels-edit.vue";
import checklistEdit from "../cmps/checklist-edit.vue";
import membersEdit from "../cmps/members-edit.vue";
import checklistsPreview from "../cmps/checklists-preview.vue";
import activitiesPreview from "../cmps/activities-preview.vue";
import membersPreview from "../cmps/members-preview.vue";
import descriptionPreview from "../cmps/description-preview.vue";
import copyTaskEdit from "../cmps/copy-task-edit.vue";
import datesEdit from "../cmps/dates-edit.vue";
import datesPreview from "../cmps/dates-preview.vue";

import { utilService } from "../services/util.service";

export default {
    emits: ["setRGB"],
    props: {},
    components: {
        labelsEdit,
        labelsPreview,
        checklistEdit,
        membersEdit,
        checklistsPreview,
        activitiesPreview,
        membersPreview,
        descriptionPreview,
        copyTaskEdit,
        datesEdit,
        datesPreview
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
        this.debounceHandler = utilService.debounce(this.updateTask, 200)
        const { id, taskId, groupId } = this.$route.params;
        console.log(taskId);
        try {
            // await this.$store.dispatch({ type: 'loadBoards' })
            this.$store.commit({ type: "setBoard", boardId: id });
            this.$store.commit({ type: "setEditedTask", taskId, groupId, boardId: id });
            this.task = JSON.parse(JSON.stringify(this.getTask))

            this.title = this.getTask.title
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
        async removeTask() {
            try {
                await this.$store.dispatch({
                    type: 'removeTask', payload: {
                        taskId: this.task.id,
                        activity: {
                            txt: `Deleted ${this.task.title}`,
                            boardId: this.$route.params.id,
                            groupId: this.groupId,
                            taskId: this.task.id,
                            byMember: {
                                _id: this.user._id,
                                fullname: this.user.fullname,
                                imgUrl: this.user.imgUrl || "",
                            },
                        },
                    }
                })
                console.log('remove!');
                this.closeDetails()
            }
            catch (err) {
                console.log("Failed in task remove", err)
            }
        },
        async copyTask(data) {
            try {
                const { task, toGroupId, toBoardId } = data
                console.log(data, 'BOARDDDDDDDDDDDDDDDDDDD');
                task.id = utilService.makeId()
                this.$store.dispatch({
                    type: 'addTask', boardId: toBoardId, groupId: toGroupId, task,
                    activity: {
                        txt: `Made copy for ${task.title}`,
                        byMember: {
                            _id: this.user._id,
                            fullname: this.user.fullname,
                            imgUrl: this.user.imgUrl || "",
                        },
                    }
                })
                this.closeEditor()
            }
            catch (err) {
                console.log("Failed in task copy", err)
            }
        },
        updateDescription(payload) {
            console.log(payload);
        },

        async updateTask(type, data) {
            console.log('UPDATE TASKKKKKKK')
            console.log(type, data)
            let taskToUpdate = JSON.parse(JSON.stringify(this.task))
            let txt
            switch (type) {
                case "labels-edit":
                    if (!taskToUpdate?.labelIds) taskToUpdate.labelIds = [];
                    taskToUpdate.labelIds = data.labelIds;
                    txt = "Updated label";
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
                case "members-edit":
                    console.log('update task', data)
                    taskToUpdate.memberIds = data.memberIds
                    txt = `${data.action} ${data.fullname} ${data.action === 'added' ? 'to' : 'from'} ${this.task.title}`
                    console.log('*******************', txt)
                    console.log(this.task.memberIds)
                    break;
                case "checklist-preview":
                    txt = "Edited checklist";
                    taskToUpdate.checklists = data
                    break
                case "dates-edit":
                    txt = "Edited due date";
                    taskToUpdate.dueDate = data
                    break
                case 'dates-preview': {
                    data ? txt = `Marked ${this.task.title} as complete` : txt = `Unmarked ${this.task.title} as complete`
                    taskToUpdate.isComplete = data
                    break
                }
            }
            try {
                this.$store.commit({ type: 'updateTask', payload: { task: taskToUpdate, groupId: this.groupId } })
                this.task = JSON.parse(JSON.stringify(this.getTask))
                console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
                let updatedTask = await this.$store.dispatch({
                    type: "updateTask",
                    payload: {
                        task: taskToUpdate,
                        groupId: this.groupId,
                        activity: {
                            txt,
                            memberIds: this.task.memberIds,
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
            } catch (prevTask) {
                this.$store.commit({ type: 'updateTask', payload: { task: prevTask, groupId: this.groupId } })
                this.task = JSON.parse(JSON.stringify(this.getTask))
                console.log("Failed in task update")
                // this.task = prevTask
            }
        },
        closeDetails() {
            // this.$store.dispatch({
            //     type: "updateTask",
            //     payload: {
            //         task: this.task,
            //         boardId: this.$route.params.id,
            //         groupId: this.groupId,
            //     },
            // })
            this.$router.push(`/board/${this.$route.params.id}`)
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
            })
            this.closeEditor();
        },
        openMembersEditor() {
            this.pickEditor('members-edit')

        }
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
