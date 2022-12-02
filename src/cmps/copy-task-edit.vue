<template>
    <section class="copy-task-edit">
        <div class="copy-edit-header">
            <div>Copy card</div>
            <button @click.stop="closeEdit" class="trellicons x-icon"></button>
        </div>

        <div class="copy-edit-main">
            <label for="checklist-input">Title</label>
            <input type="text" v-model="checklist.title" id="checklist-input">
            <button @click="addChecklist">Create card</button>
        </div>
    </section>
</template>

<script>
export default {

}
</script>
