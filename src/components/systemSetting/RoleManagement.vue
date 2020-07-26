<template>
    <div class="role-management-page">
        <el-container>
            <el-header>
                <div class="header-nav">
                    <el-tabs @tab-click="handleClick">
                        <el-tab-pane label="用户管理" name="first">角色基础信息</el-tab-pane>
                        <el-tab-pane label="配置管理" name="second">PC可操作权限</el-tab-pane>
                        <el-tab-pane label="角色管理" name="third">app可操作权限</el-tab-pane>
                    </el-tabs>
                </div>
            </el-header>
            <div>
                <el-container>
                    <el-aside width="400px">
                        <div class="rolesListTitle">角色列表</div>
                        <div class="rolesList">
                            <div class="rolesListContent">
                                <el-col :span="12">
                                    <el-menu
                                            default-active="2"
                                            class="el-menu-vertical-demo"
                                            @open="handleOpen"
                                            @close="handleClose"
                                            background-color="#EFFFF3"
                                            text-color="#000000"
                                            active-text-color="#389DFF">
                                        <el-submenu index="1">
                                            <template slot="title">
                                                <i class="el-icon-location"></i>
                                                <span>壕玮集团</span>
                                            </template>
                                            <el-menu-item-group>
                                                <el-menu-item index="1-1">主管</el-menu-item>
                                                <el-menu-item index="1-2">组员</el-menu-item>
                                                <el-menu-item index="1-3">客户管理员</el-menu-item>
                                                <el-menu-item index="1-4">客户1</el-menu-item>
                                                <el-menu-item index="1-5">客户2</el-menu-item>
                                            </el-menu-item-group>


                                        </el-submenu>

                                    </el-menu>
                                </el-col>
                            </div>
                        </div>
                    </el-aside>
                    <el-main>
                        <div class="roleMain">
<!--                            <input type="button" value="登录" @click="compo='login'">-->
<!--                            <input type="button" value="注册" @click="compo='register'">-->
<!--                            <transition name="papa" mode="out-in">-->
<!--                                <component :is="compo"></component>-->
<!--                            </transition>-->
                        </div>
                    </el-main>
                </el-container>
            </div>

        </el-container>

    </div>


</template>

<script>
    // import Vue from 'vue'
    // Vue.component('login',{
    //     template:'<h1>这是登录页面</h1>', //通过template属性，指定了组件要展示的HTML结构
    // })
    // Vue.component('register',{
    //     template:'<h2>这是注册页面</h2>', //通过template属性，指定了组件要展示的HTML结构
    //     data: function () {
    //         return {
    //             message:'8888'
    //         }
    //     }
    // })
    // new Vue({
    //     el:'#role-management-page',
    //     data:{
    //         compo:'login'
    //     },
    //     methods:{
    //
    //     }
    // })
    export default {
        name: "RoleManagement",
        data(){
            return{
               // compo:'login'
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style scoped lang="scss">
    .papa-enter,
    .papa-leave-to{
        transform: translateX(150px);
    }
    .papa-enter-active,
    .papa-leave-active{
        transition: all 0.8s ease;
    }
    .el-header {
        height: 50px!important;
        line-height: 35px;
        background-color: #effff3;
        color: #333;
        text-align: center;
    }
    .el-aside {
        border-right: 1px solid #e0e0e0;
        position: absolute;
        background-color: rgba(239, 255, 243, 0.1);
        color: #333;
        height: 100%;
        /*padding-left: 45px;*/
        /*text-align: center;*/

        .rolesListTitle{
            padding-left: 45px;
            /*position: fixed;*/
            line-height: 70px;
            font-size: 25px;
            width: 100%;
            height: 70px;
            border-bottom: 1px solid #c0c0c0;
            /*background-color: #85c3ff;*/
        }
        .rolesList{
            overflow: scroll;
            /*position: absolute;*/
            padding:25px 0 0 35px;
            top: 70px;
            width: 100%;
            height: 90%;
            /*background-color: #b3ffb9;*/
        }
    }

    .el-main {
        /*border-top: 1px solid #cdcdcd;*/
        position: absolute;
        left: 400px;
        width: 100%;
        height: 100%;
        background-color: #effff3;
        color: #333;
        text-align: center;
        padding: 2px;
        .roleMain{
            width: 100%;
            height: 100%;
            /*background-color: #5eff7f;*/
        }
    }

    *{
        padding: 0;
        margin: 0;
    }
    .role-management-page{
        font-size: 50px;
        color: red;
        width: 100%;
        height: 100%;
        background-color: #effff3;
    }
</style>