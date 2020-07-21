<template>
    <div class="app-container">
        <transition>
             <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "App"
    }
</script>

<style scoped lang="scss">
    .app-container{
        overflow: hidden;
    }
    .v-enter{
        transform: translateX(100%);
        opacity: 0;
    }
    .v-leave-to{
         transform: translateX(-100%);
         opacity: 0;
        position: absolute;
     }
    .v-enter-active,
    .v-leave-active{
        transition: all 0.7s ease;
    }
</style>