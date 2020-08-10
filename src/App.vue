<template>
    <div class="app-container">
        <transition><router-view></router-view></transition>
    </div>
</template>

<script>
    export default {
        name: "App",
        created(){
            // 全局监听路由变化，并把末路由地址存入浏览器自带的sessionStorage中，供main.js中全局设置请求头使用
            this.$router.beforeEach((to, from, next) => {
                // console.log(to.path);
                let r_path =to.path;
                // alert(r_path);
                sessionStorage.setItem('Path',r_path );
                next();
            });
        },
        methods:{

        }
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
        transition: all 0.08s ease;
    }
</style>