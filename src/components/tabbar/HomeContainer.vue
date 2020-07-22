
<template>
    <div class="Home-page">
        <div class="Sidebar">
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                <el-radio-button :label="false">展开</el-radio-button>
                <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>
            <el-menu background-color="rgba(17, 46, 100, 0.75)"
                     text-color="#9B9B9B"
                     active-text-color="#ffd04b"
                     default-active="1-4-1" class="el-menu-vertical-demo"
                     @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                <el-menu-item index="1">
                    <i class="el-icon-house"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">系统设置</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1">角色管理</el-menu-item>
                        <el-menu-item index="2-2">用户管理</el-menu-item>
                        <el-menu-item index="2-2">日志查询</el-menu-item>
                        <el-menu-item index="2-2">异常日志</el-menu-item>
                        <el-menu-item index="2-2">拓扑管理</el-menu-item>
                        <el-menu-item index="2-2">看板配置</el-menu-item>
                        <el-menu-item index="2-2">首页配置</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">基础资料</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="2-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="2-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">模具管理</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="3-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">设备管理</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="3-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">制造工艺</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="3-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="7">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">作业指导</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="3-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="8">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">异常管理</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="3-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="9">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">生产管理</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="3-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="10">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">条码管理</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="3-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="11">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">现场作业</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="3-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="12">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">生产报表</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="3-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="13">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span slot="title">看板预览</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="3-1">选项1</el-menu-item>
                        <el-menu-item index="3-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="3-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="3-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="3-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
            </el-menu>
        </div>
        <transition>
                <div class="page-information">
                    <div class="ModifyInformation">
                        <!-- Form -->
                        <el-dialog title="修改密码" :visible.sync="dialogFormChangePasswordVisible">
                            <el-form :model="form">
                                <el-form-item label="旧密码：" :label-width="formLabelWidth" >
                                    <el-input v-model="form.oldPassword" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="新密码：" :label-width="formLabelWidth">
                                    <el-input v-model="form.newPassword" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="重复密码：" :label-width="formLabelWidth">
                                    <el-input v-model="form.RepeatPassword" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormChangePasswordVisible = false">取 消</el-button>
                                <el-button type="primary" @click="[SubBtnPassword(),dialogFormChangePasswordVisible = false]">确 定</el-button>
                            </div>
                        </el-dialog>
                        <el-dialog title="修改信息" :visible.sync="dialogFormModifyInformationVisible">
                            <el-form :model="form">
                                <el-form-item label="用户姓名：" :label-width="formLabelWidth">
                                    <el-input v-model="form.name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码：" :label-width="formLabelWidth">
                                    <el-input v-model="form.phoneNumber" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="邮箱地址：" :label-width="formLabelWidth">
                                    <el-input v-model="form.email" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="用户图标：" :label-width="formLabelWidth">
                                    <el-input v-model="form.userIcon" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormModifyInformationVisible = false">取 消</el-button>
                                <el-button type="primary" @click="[SubBtnInformation(),dialogFormModifyInformationVisible = false]">确 定</el-button>
                            </div>
                        </el-dialog>
                    </div>
                    <div class="Home-page-menu">
                        <el-dropdown class="menu">

                            <el-button type="primary" class="btn-icon">
                                <i class="el-icon-s-custom"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <span class="UserCenter">用户中心</span>
                                <el-dropdown-item>
                                    <el-button type="text" @click="dialogFormChangePasswordVisible = true">修改密码</el-button>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button type="text" @click="dialogFormModifyInformationVisible = true">修改信息</el-button>
                                </el-dropdown-item>

                                <router-link to="/LoginPage">
                                    <el-dropdown-item >退出登录</el-dropdown-item>
                                </router-link>

                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "home",
        data() {
            return {
                isCollapse: true,
                dialogFormModifyInformationVisible: false,
                dialogFormChangePasswordVisible: false,
                form: {
                    oldPassword: '123456',
                    newPassword: '7891011',
                    RepeatPassword: '7891011',
                    name: '黎明',
                    phoneNumber:'18520930936',
                    email:'1119785311@qq.com',
                    userIcon:'是你吗？',
                },
                formLabelWidth: '120px'
            };
        },
        methods:{
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            SubBtnInformation:function(){
                console.log(this.form);
                var data = this.form;
                this.$http.post(('/api/employee/insert'),data,{emulateJSON:false}).then(response => {
                    console.log(response.body);
                    this.grouplist = response.body;
                    alert("提交成功！")
                }, response => {
                    console.log(response);
                    alert("出问题啦！")
                });

            },
            SubBtnPassword(){
                console.log(this.form);
                var data = this.form;
                this.$http.post(('/api/employee/insert'),data,{emulateJSON:false}).then(response => {
                    // console.log(response.body);
                    this.grouplist = response.body;
                    alert("提交成功！")
                }, response => {
                    console.log(response);
                    alert("出问题啦！")
                });
            }
        }
    }
</script>

<style  lang="scss" scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }



    a:link{
        text-decoration:none;
    }
    a:visited{
        text-decoration:none; /*指已经访问过的链接*/
    }
    a:hover{
        text-decoration:none;/*指鼠标在链接*/
    }
    a:active{
        text-decoration:none;/* 指正在点的链接*/}
    .UserCenter{
        display: inline-block;
        margin-left: 3px;
        color: #8f8f94;
    }
    .Home-page{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #d8d8d8;
        .page-information{
            .v-enter{
                transform: translateX(-100%);
                opacity: 0;
                /*position: absolute;*/
            }
            .v-leave-to{
                transform: translateX(100%);
                opacity: 0;
                position: absolute;
            }

            .v-enter-active,
            .v-leave-active{
                transition: all 1s ease;
            }
        }
        .Home-page-menu{
            text-align: center;
            position: absolute;
            right: 10px;
            top: 10px;
            .el-icon--right {
                 margin-left: 0;
            }
            .el-icon-s-custom{
                font-size: 37px;
                margin-left: -9px;
            }
            .el-button--primary {
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }

        }
    }
</style>