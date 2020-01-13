<template>
    <div style="height: 100vh; width: 100%">
        <loading :active.sync="$root.routeLoading"
                 :can-cancel="false"
                 :is-full-page="true"
                 :opacity="1"/>
        <router-view/>
    </div>
</template>

<script>
    import Loading from 'vue-loading-overlay'

    export default {
        components: {Loading},
        watch: {
            '$route'(to, from) {
                document.title = `${to.meta.title} - ToDo App` || 'ToDo App'
            }
        },

    }
</script>

