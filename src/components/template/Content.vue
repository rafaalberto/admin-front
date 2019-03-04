<template>
    <div class="content-wrapper">
        <section class="content">
            <router-view></router-view>
        </section>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Content',
    computed: mapState(['user'])
}
</script>

<style>
    .content-wrapper {
        background: #FAFAFA;
    }
</style>