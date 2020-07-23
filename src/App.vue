<template>
    <div class="app-container">
        <transition><router-view></router-view></transition>

    </div>
</template>

<script>
    export default {
        name: "App"
    }
</script>

<style scoped lang="scss">
    .v-enter{
        transform: translateX(100%);
        opacity: 0;
        /*position: absolute;*/
    }
    .v-leave-to{
        transform: translateX(-100%);
        opacity: 0;
        position: absolute;
    }
    .v-leave-active,
    .v-enter-active{
        transition: all 0.4s ease;
    }
</style>