<template>
    <div class="role-management-page">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="角色基础信息" name="first">
                <div class="roles-menu-table">
                    <div class="role-menu">
                        <div class="roleList">
                            <span>角色列表</span>
                            <span>
                                <i class="el-icon-plus"></i>
                                 <i class="el-icon-refresh-right"></i>
                            </span>
                        </div>
                        <div class="roleNameMenu">
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

                                        <el-menu-item index="1-6">主管</el-menu-item>
                                        <el-menu-item index="1-7">组员</el-menu-item>
                                        <el-menu-item index="1-8">客户管理员</el-menu-item>
                                        <el-menu-item index="1-9">客户1</el-menu-item>
                                        <el-menu-item index="1-10">客户2</el-menu-item>

                                        <el-menu-item index="1-1">主管</el-menu-item>
                                        <el-menu-item index="1-2">组员</el-menu-item>
                                        <el-menu-item index="1-3">客户管理员</el-menu-item>
                                        <el-menu-item index="1-4">客户1</el-menu-item>
                                        <el-menu-item index="1-5">客户2</el-menu-item>
                                        <el-menu-item index="1-1">主管</el-menu-item>
                                        <el-menu-item index="1-2">组员</el-menu-item>
                                        <el-menu-item index="1-3">客户管理员</el-menu-item>
                                        <el-menu-item index="1-4">客户1</el-menu-item>
                                        <el-menu-item index="1-5">客户2</el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                            </el-menu>
                        </div>
                    </div>
                    <div class="role-table">
                        <el-container>
                            <el-header>角色详细信息</el-header>
                            <el-main>
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                                    <el-form-item label="角色名称" prop="name">
                                        <el-input v-model="ruleForm.name"></el-input>
                                    </el-form-item>
                                    <el-form-item label="节点类型">
                                        <el-radio-group v-model="ruleForm.resource">
                                            <el-radio label="角色"></el-radio>
                                            <el-radio label="非角色"></el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="排序码" prop="SortCode">
                                        <el-input v-model="ruleForm.SortCode"></el-input>
                                    </el-form-item>
                                    <el-form-item label="描述" prop="desc">
                                        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-main>
                            <el-footer>Footer</el-footer>
                        </el-container>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="PC可操作权限" name="second">
                <div class="roles-menu-table">
                    <div class="role-menu">
                        <div class="roleList">
                            <span>角色列表</span>
                            <span>
                                <i class="el-icon-plus"></i>
                                 <i class="el-icon-refresh-right"></i>
                            </span>
                        </div>
                        <div class="roleNameMenu">
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

                                        <el-menu-item index="1-6">主管</el-menu-item>
                                        <el-menu-item index="1-7">组员</el-menu-item>
                                        <el-menu-item index="1-8">客户管理员</el-menu-item>
                                        <el-menu-item index="1-9">客户1</el-menu-item>
                                        <el-menu-item index="1-10">客户2</el-menu-item>

                                        <el-menu-item index="1-1">主管</el-menu-item>
                                        <el-menu-item index="1-2">组员</el-menu-item>
                                        <el-menu-item index="1-3">客户管理员</el-menu-item>
                                        <el-menu-item index="1-4">客户1</el-menu-item>
                                        <el-menu-item index="1-5">客户2</el-menu-item>
                                        <el-menu-item index="1-1">主管</el-menu-item>
                                        <el-menu-item index="1-2">组员</el-menu-item>
                                        <el-menu-item index="1-3">客户管理员</el-menu-item>
                                        <el-menu-item index="1-4">客户1</el-menu-item>
                                        <el-menu-item index="1-5">客户2</el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                            </el-menu>
                        </div>
                    </div>
                    <div class="role-table">

                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="app可操作权限" name="third">
                <div class="roles-menu-table">
                    <div class="role-menu">
                        <div class="roleList">
                            <span>角色列表3</span>
                            <span>
                                <i class="el-icon-plus"></i>
                                 <i class="el-icon-refresh-right"></i>
                            </span>
                        </div>
                        <div class="roleNameMenu">
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

                                        <el-menu-item index="1-6">主管</el-menu-item>
                                        <el-menu-item index="1-7">组员</el-menu-item>
                                        <el-menu-item index="1-8">客户管理员</el-menu-item>
                                        <el-menu-item index="1-9">客户1</el-menu-item>
                                        <el-menu-item index="1-10">客户2</el-menu-item>

                                        <el-menu-item index="1-1">主管</el-menu-item>
                                        <el-menu-item index="1-2">组员</el-menu-item>
                                        <el-menu-item index="1-3">客户管理员</el-menu-item>
                                        <el-menu-item index="1-4">客户1</el-menu-item>
                                        <el-menu-item index="1-5">客户2</el-menu-item>
                                        <el-menu-item index="1-1">主管</el-menu-item>
                                        <el-menu-item index="1-2">组员</el-menu-item>
                                        <el-menu-item index="1-3">客户管理员</el-menu-item>
                                        <el-menu-item index="1-4">客户1</el-menu-item>
                                        <el-menu-item index="1-5">客户2</el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>
                            </el-menu>
                        </div>
                    </div>
                    <div class="role-table">

                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>









</div>
</template>

<script>

    export default {
        name: "RoleManagement",
        data(){
            return{
               activeName:'first',
                ruleForm: {
                    name: '',
                    SortCode:'',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],



                }

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
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }


    }
</script>

<style scoped lang="scss">
    .el-header{
        padding-left: 20px;
        padding-top: 15px;
        border-bottom: 1px solid #d3d3d3;
        /*background-color: #B3C0D1;*/
        color: #333;
        /*text-align: center;*/
        /*height: 10vh;*/
        flex:0.4;
    }
     .el-footer {
          background-color: #B3C0D1;
          color: #333;
         /*height: 100vh;*/
         flex:8;

     }
    .el-main {
        padding-right: 800px;
        flex:2;


    }
    .role-management-page{
        position: relative;
        /*font-size: 50px;*/
        /*color: red;*/
        width: 100%;
        height: 100%;
        background-color: #effff3;
        .roles-menu-table{
            /*position: relative;*/
            display: flex;
            height: 100vh;
            width: 100%;
            /*background-color: #74ff57;*/
            .role-menu{
                float: left;
                height: 100%;
                flex:2.2;
                margin-right: 8px;
                background-color: #eafaee;
                    .roleList{
                        width: 100%;
                        height: 50px;
                        border-bottom: 1px solid #d5d5d5;
                        line-height: 50px;
                        span:nth-child(1){
                            display: inline-block;
                            margin-left: 30px;
                        }
                        span:nth-child(2){
                            /*font-size: 30px;*/
                            display: inline-block;
                            float: right;
                            margin-right: 30px;
                            text-indent: 15px;
                        }
                    }
                    .roleNameMenu{
                        height: 100%;
                        overflow: scroll;
                    }
            }
            .role-table{
                display: flex;
                float: left;
                height: 100%;
                flex:7.8;
                background-color: #eafaee;
            }
        }
    }
</style>