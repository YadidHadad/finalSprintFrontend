<template>
    <section v-if="task" class="task-details" v-click-outside="closeDetails">
        <div class="task-header">
            <p contenteditable @input="updateTitle">
                {{ task.title }}
            </p>
            <button @click="closeDetails">X</button>
        </div>
        <div class="task-details-aside">
            <button>Members</button>
            <button @click="pickDetails('labels-edit')">Labels</button>
            <button @click="pickDetails('checklist-edit')">Checklist</button>
            <button>Dates</button>
            <button>Attachment</button>
            <button>Cover</button>
        </div>
        <div class="task-details-main">
            <labels-preview :labels="getLabels" />

            <div class="desc-container">
                <h3>Description</h3>
                <textarea placeholder="Add a more detailed description..." v-model="task.desc">
                    {{ task.desc }}
                </textarea>
            </div>
            <checklists-preview v-if="task" :checklists="getChecklists" />

            <div class="task-activities">
                <h1>activities</h1>
                <button @click="showActivities = !showActivities">Show details</button>
                <ul v-if="showActivities && getActivities.length">
                    <li v-for="act in getActivities" :key="act.taskId">
                        <span>{{ act.txt }}</span>
                    </li>
                </ul>
            </div>
        </div>

        <component v-if=detailsPicked.isPicked :is="detailsPicked.type" @closeEdit="closeEdit"
            v-click-outside="closeEdit" @updateLabels="updateTask(detailsPicked.type, $event)"
            @addChecklist="addChecklist">
            <h2>HI</h2>
        </component>
    </section>
</template>

<script>
import labelsPreview from '../cmps/labels-preview.vue'
import labelsEdit from '../cmps/labels-edit.vue'
import checklistEdit from '../cmps/checklist-edit.vue'
import checklistsPreview from '../cmps/checklists-preview.vue'
export default {
    props: {
        groupId: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            show: false,
            detailsPicked: {
                isPicked: false,
                type: ''
            },
            task: null,
            labels: null,
            showActivities: false
            // testT: this.$store.getters.getEditedTask
        }
    },
    created() {
        this.task = JSON.parse(JSON.stringify(this.$store.getters.getEditedTask))
    },
    methods: {
        updateTitle(ev) {
            if (typeof ev.data !== 'string') return
            this.task.title += ev.data
        },
        pickDetails(type) {
            this.detailsPicked.type = type
            this.detailsPicked.isPicked = true
        },
        closeEdit() {
            this.detailsPicked = {
                isPicked: false,
                type: ''
            }
        },
        async updateTask(type, label) {
            switch (type) {
                case 'labels-edit':
                    if (!this.task?.labelIds) this.task.labelIds = []
                    this.task.labelIds.push(label.id)
                    break;
            }

            try {
                await this.$store.dispatch({
                    type: 'updateTask', payload: {
                        task: JSON.parse(JSON.stringify(this.task)),
                        groupId: this.groupId,
                        activity: {
                            txt: 'Updated label', boardId: this.$route.params.id,
                            groupId: this.groupId, taskId: this.task.id
                        }
                    }
                })
            }
            catch (err) {
                console.log('Failed in task update', err)
            }

        },
        updateLabels(label) {
            this.$store.dispatch({
                type: 'updateLabels', payload: {
                    task: this.task, label,
                    groupId: this.groupId,
                    activity: {
                        txt: 'Updated label', boardId: this.$route.params.id,
                        groupId: this.groupId, taskId: this.task.id
                    }
                }
            })
        },
        closeDetails() {
            this.$store.dispatch({
                type: 'updateTask', payload:
                {
                    task: this.task, boardId: this.$route.params.id,
                    groupId: this.groupId,
                },
            })
            this.$router.push(`/board/${this.$route.params.id}`)
        },
        async addChecklist(checklist) {
            await this.$store.dispatch({
                type: 'addChecklist', payload: {
                    task: this.task, checklist,
                    groupId: this.groupId,
                    activity: {
                        txt: 'Added checklist', boardId: this.$route.params.id,
                        groupId: this.groupId, taskId: this.task.id
                    }
                }
            })
            this.closeEdit()
        }
    },
    computed: {
        getLabels() {
            return this.$store.getters.labels
        },
        getChecklists() {
            return this.$store.getters.checklists
        },
        getActivities() {
            const acts = []
            this.$store.getters.activities.forEach(act => {
                if (act.taskId === this.task.id)
                    acts.push(act)
            })
            return acts
        }
    },
    components: { labelsEdit, labelsPreview, checklistEdit, checklistsPreview }

}
</script>