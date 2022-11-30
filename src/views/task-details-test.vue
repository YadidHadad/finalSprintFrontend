<template>
    <section class="task-details">
        <div class="task-header">
            <p contenteditable @input="updateTitle">
                {{ task.title }}
            </p>
            <button>X</button>
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
            <textarea placeholder="Add a more detailed description..." v-model="task.desc">
                {{ task.desc }}
            </textarea>
        </div>
        <!-- <div class="task-activities">
            <h1>activities</h1>
        </div> -->


        <component v-if=detailsPicked.isPicked :is="detailsPicked.type" 
        @closeDetails="closeDetails" v-click-outside="closeDetails" @updateLabels="updateLabels">
            <h2>HI</h2>
        </component>
    </section>
</template>

<script>
import labelsEdit from '../cmps/labels-edit.vue'
export default {
    props: {
        // task: Object
    },
    data() {
        return {
            task: {
                "id": "c103",
                "title": "Do that",
                "archivedAt": 1589983468418,
            },
            detailsPicked: {
                isPicked: false,
                type: ''
            }
        }
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
        closeDetails() {
            this.detailsPicked = {
                isPicked: false,
                type: ''
            }
        },
        updateLabels(color) {
            console.log(color);
        }
    },
    components: { labelsEdit }

}
</script>