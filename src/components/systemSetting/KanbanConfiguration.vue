<template>
    <div class="kanban-configuration-page">
        <!--        <img src="../../images/a.jpg" alt="">-->

        <p @click="compo='book'">登录</p>
        <p @click="compo='money'">注册</p>
        <transition mode="out-in">
            <component :is="compo"></component>
        </transition>
    </div>
</template>

<script>
    import book from './child/book'
    import money from './child/money'
    export default {
        name: "UserManagement",
        data(){
            return {
                compo:'book'
            }
        },
        components: {  // 挂载组件，子组件关联到父组件
            book,
            money
        },
        methods:{

        }
    }
</script>

<style scoped lang="scss">
    *{
        padding: 0;
        margin: 0;
    }
    .kanban-configuration-page{
        font-size: 50px;
        color: red;
        width: 100%;
        height: 100%;
        background-color: #effff3;

        .v-enter,
        .v-leave-to{
            transform: translateX(100px);
            opacity: 0;
        }
        .v-enter-active,
        .v-leave-active{
            transition: all 0.9s ease;
        }
    }
</style>