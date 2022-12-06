<template>
    <section class="task-editor attachment-edit" @click.stop="">
        <div class="attachment-edit-header">
            <div>Attach from…</div>
            <button class="btn-close" @click.stop="closeEdit">
                <span class="trellicons x-icon"></span>
            </button>
        </div>

        <div class="attachment-edit-main">
            <div class="attachment-options">
                <button>Computer</button>
                <imgUploader @uploaded="attachImage" />
            </div>
            <div class="attachment-link">
                <div>Attach a link</div>
                <input type="text" placeholder="Paste any link here" v-model="url">

                <div v-if="url" class="link-name">
                    <div>Link name (optional)</div>
                    <input type="text" v-model="name">
                </div>

                <button @click="attachLink">Attach</button>
            </div>
        </div>
    </section>
</template>

<script>
import { utilService } from '../services/util.service';
import imgUploader from './img-uploader.vue';
export default {
    data() {
        return {
            name: '',
            url: ''
        }
    },

    methods: {
        attachImage(url) {
            const attachment = {
                url,
                name: 'Your attachment',
                id: utilService.makeId(),
                type: 'image',
                createdAt: Date.now()
            }
            this.$emit('updateTask', attachment)
        },
        attachLink() {
            const attachment = {
                url: this.url,
                name: this.name,
                id: utilService.makeId(),
                type: 'link',
                createdAt: Date.now()
            }
            this.$emit('updateTask', attachment)

            this.name = ''
            this.url = ''
        },
        closeEdit() {
            this.$emit('closeEdit')
        }
    },

    components: { imgUploader }
}
</script>