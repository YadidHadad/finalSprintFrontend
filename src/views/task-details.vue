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
            <button>Checklist</button>
            <button>Dates</button>
            <button>Attachment</button>
            <button>Cover</button>
        </div>
        <div class="task-details-main">
            <labels-preview :labels="labels" />

            <div class="desc-container">
                <h3>Description</h3>
                <textarea placeholder="Add a more detailed description..." v-model="task.desc">
                    {{ task.desc }}
                </textarea>
            </div>

            <div class="task-activities">
                <h1>activities</h1>
                <button>Show details</button>
            </div>
        </div>

        <component v-if=detailsPicked.isPicked :is="detailsPicked.type" @closeEdit="closeEdit"
            v-click-outside="closeEdit" @updateLabels="updateLabels">
            <h2>HI</h2>
        </component>
    </section>
</template>

<script>
import labelsPreview from '../cmps/labels-preview.vue'
import labelsEdit from '../cmps/labels-edit.vue'
export default {
    data() {
        return {
            show: false,
            detailsPicked: {
                isPicked: false,
                type: ''
            },
            task: null,
            labels: null
            // testT: this.$store.getters.getEditedTask
        }
    },
    created() {
        this.task = JSON.parse(JSON.stringify(this.$store.getters.getEditedTask))
        this.labels = JSON.parse(JSON.stringify(this.$store.getters.board.labels))
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
        updateLabels(color) {
            console.log(color);
        },
        closeDetails() {
            this.$store.dispatch({ type: 'updateTask', payload: { task: this.task, boardId: this.$route.params.id } })
            this.$router.push(`/board/${this.$route.params.id}`)
        }
    },
    components: { labelsEdit, labelsPreview }

}
</script>