<template>
    <section class="user-preview" id="user-preview">
        <div class="user-preview-header">
            <h2>Account</h2>
            <div class="header-links">
                <span class="btn flex row profile-btn" @click="(showUserPreview = true)">
                    {{ getInitials(user.fullname) }}
                </span>
                <div>
                    {{ user.fullname }}
                </div>
                
            </div>
        </div>

        <div class="user-preview-main">
            <button @click="logout">Log out</button>
        </div>
    </section>
</template>

<script>
import { utilService } from '../services/util.service';
export default {
    props: {
        user: {
            type: Object,
            required: true,
        }
    },
    methods: {
        getInitials(fullname) {
            return utilService.getInitials(fullname)
        },
        logout() {
            this.$emit('logout')
        }
    },
}
</script>