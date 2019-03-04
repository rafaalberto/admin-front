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
    .page-enter-active, .page-leave-active {
        transition: opacity 0.5s, transform 0.5s;
    }
    .page-enter, .page-leave-to {
        opacity: 0;
    }
</style>