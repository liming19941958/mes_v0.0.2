
<template>
    <div class="Home-page">
<!--        侧边导航栏-->
            <div class="Sidebar" @mouseover="btnInnerIsShow=true"  @mouseleave="btnInnerIsShow=false">
                <span title="mouseover与mouseenter、mouseout与mouseleave用法注释">
                    <!--不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件。-->
                    <!--只有在鼠标指针从元素外穿入被选元素（到元素内）时，才会触发 mouseenter 事件。-->
                    <!-- mouseout与mouseleave 不论鼠标指针离开被选元素还是任何子元素，都会触发 mouseout 事件。-->
                    <!--只有在鼠标指针从元素内穿出被选元素（到元素外）时，才会触发 mouseleave 事件。-->
                </span>
                <button  v-show="btnInnerIsShow"
                         v-on:click = "[isCollapse = !isCollapse,appName=!appName,sideBarClass=!sideBarClass]"
                         class="btn-inner">
                    <i class="el-icon-d-arrow-left"></i>
                </button>
                <div class="logo"></div>
                <transition>
                   <h3 v-show="appName">智能工厂系统</h3>
                </transition>
                <el-scrollbar style="height: 70%">
                <el-menu background-color="rgb(17, 46, 100)"
                         text-color="#9B9B9B"
                         active-text-color="#ffd04b"
                         :default-active="active"
                         class="el-menu-vertical-demo"
                         @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <router-link to="/home">
                    <el-menu-item index="0">
                        <i class="el-icon-house"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    </router-link>
                    <el-submenu index="1" v-show="true">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span slot="title">系统设置</span>
                        </template>
                        <el-menu-item-group>
                            <router-link to="/role">
                                <el-menu-item index="1-1">角色管理</el-menu-item>
                            </router-link>
                            <router-link to="/organization">
                                 <el-menu-item index="1-2">用户管理</el-menu-item>
                            </router-link>
                            <router-link to="/userlog">
                                 <el-menu-item index="1-3">日志查询</el-menu-item>
                            </router-link>
                            <router-link to="/debuglog">
                                 <el-menu-item index="1-4">异常日志</el-menu-item>
                            </router-link>
                            <router-link to="/TopologyManagementPage">
                                 <el-menu-item index="1-5">拓扑管理</el-menu-item>
                            </router-link>
                            <router-link to="/KanbanConfigurationPage">
                                 <el-menu-item index="1-6">看板配置</el-menu-item>
                            </router-link>
                            <router-link to="/HomePageConfigurationPage">
                                 <el-menu-item index="1-7">首页配置</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-coin"></i>
                            <span slot="title">基础资料</span>
                        </template>
                        <el-menu-item-group>
                            <router-link to="/CustomerInformationPage">
                                <el-menu-item index="2-1">客户资料</el-menu-item>
                            </router-link>
                            <router-link to="/DataImportPage">
                                <el-menu-item index="2-2">资料导入</el-menu-item>
                            </router-link>
                            <el-submenu index="2-3">
                                <span slot="title">人力资料</span>
                                <router-link to="/StaffInformationPage">
                                    <el-menu-item index="2-3-1">职员资料</el-menu-item>
                                </router-link>
                                <router-link to="/ClassSettingPage">
                                    <el-menu-item index="2-3-2">班别设定</el-menu-item>
                                </router-link>
                                <router-link to="/SchedulingInformationPage">
                                     <el-menu-item index="2-3-3">排班资料</el-menu-item>
                                </router-link>
                            </el-submenu>
                            <el-submenu index="2-4">
                                <span slot="title">料件资源</span>
                                <router-link to="/UnitOfMeasurementPage">
                                    <el-menu-item index="2-4-1">计量单位</el-menu-item>
                                </router-link>
                                <router-link to="/MaterialInformationPage">
                                    <el-menu-item index="2-4-2">料件资料</el-menu-item>
                                </router-link>
                                <router-link to="/MaterialBOMPage">
                                    <el-menu-item index="2-4-3">物料BOM</el-menu-item>
                                </router-link>
                                <router-link to="/PackingSpecificationPage">
                                    <el-menu-item index="2-4-4">包装规格</el-menu-item>
                                </router-link>
                            </el-submenu>
                            <el-submenu index="2-5">
                                <span slot="title">品质项目</span>
                                <router-link to="/SamplingStandardPage">
                                    <el-menu-item index="2-5-1">抽样标准</el-menu-item>
                                </router-link>
                                <router-link to="/TestItemsPage">
                                    <el-menu-item index="2-5-2">检验项目</el-menu-item>
                                </router-link>
                                <router-link to="/InspectionPlanPage">
                                    <el-menu-item index="2-5-3">检验方案</el-menu-item>
                                </router-link>
                                <router-link to="/UnpleasantSightPage">
                                    <el-menu-item index="2-5-4">不良现象</el-menu-item>
                                </router-link>
                                <router-link to="/BadReasonsPage">
                                    <el-menu-item index="2-5-5">不良原因</el-menu-item>
                                </router-link>
                            </el-submenu>
                            <el-submenu index="2-6">
                                <span slot="title">调剂参数</span>
                                <router-link to="/ParametersPage">
                                    <el-menu-item index="2-6-1">参数资料</el-menu-item>
                                </router-link>
                                <router-link to="/TechnicalParameterPage">
                                    <el-menu-item index="2-6-2">技术参数</el-menu-item>
                                </router-link>
                                <router-link to="/VersionManagementPage">
                                    <el-menu-item index="2-6-3">版本管理</el-menu-item>
                                </router-link>
                                <router-link to="/TuningRecordPage">
                                    <el-menu-item index="2-6-4">调机记录</el-menu-item>
                                </router-link>
                            </el-submenu>
                            <router-link to="/JobManagementPage">
                            <el-menu-item index="2-7">
                                    <span slot="title">岗位管理</span>
                            </el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-set-up"></i>
                            <span slot="title">模具管理</span>
                        </template>
                        <el-menu-item-group>
                            <router-link to="/MoldInformationPage">
                                 <el-menu-item index="3-1">模具资料</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-s-grid"></i>
                            <span slot="title">设备管理</span>
                        </template>
                        <el-menu-item-group>
                            <router-link to="/EquipmentInformationPage">
                                <el-menu-item index="4-1">设备资料</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-s-operation"></i>
                            <span slot="title">制造工艺</span>
                        </template>
                        <el-menu-item-group>
                            <router-link to="/WorkstationManagementPage">
                                <el-menu-item index="5-1">工位管理</el-menu-item>
                            </router-link>
                            <router-link to="/ProcessManagementPage">
                                <el-menu-item index="5-2">工序管理</el-menu-item>
                            </router-link>
                            <router-link to="/CraftsManagementPage">
                                <el-menu-item index="5-3">工艺管理</el-menu-item>
                            </router-link>
                            <router-link to="/MaterialJourneyPage">
                                <el-menu-item index="5-4">料件途程</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title">
                            <i class="el-icon-notebook-2"></i>
                            <span slot="title">作业指导</span>
                        </template>
                        <el-menu-item-group>
                            <router-link to="/OperatingInstructionsPage">
                                <el-menu-item index="6-1">作业指导书</el-menu-item>
                            </router-link>
                            <router-link to="/GuideBookConnectionPage">
                                <el-menu-item index="6-2">指导书关联</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="7">
                        <template slot="title">
                            <i class="el-icon-info"></i>
                            <span slot="title">异常管理</span>
                        </template>
                        <el-menu-item-group>
                            <router-link to="/ExceptionDefinitionPage">
                                <el-menu-item index="7-1">异常定义</el-menu-item>
                            </router-link>
                            <router-link to="/WarningSettingsPage">
                                <el-menu-item index="7-2">预警设置</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="8">
                        <template slot="title">
                            <i class="el-icon-loading"></i>
                            <span slot="title">生产管理</span>
                        </template>
                        <el-menu-item-group>
                            <router-link to="/WorkOrderManagementPage">
                                <el-menu-item index="8-1">工单管理</el-menu-item>
                            </router-link>
                            <router-link to="/OrderManagementPage">
                                <el-menu-item index="8-2">排单管理</el-menu-item>
                            </router-link>
                            <router-link to="/MachineAdjustmentPage">
                                <el-menu-item index="8-3">机器调整</el-menu-item>
                            </router-link>
                            <router-link to="/OrderAdjustmentPage">
                                <el-menu-item index="8-4">顺序调整</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="9">
                        <template slot="title">
                            <i class="el-icon-c-scale-to-original"></i>
                            <span slot="title">条码管理</span>
                        </template>
                        <el-menu-item-group>
                            <router-link to="/TemplateFileManagementPage">
                            <el-menu-item index="9-1">模板文件管理</el-menu-item>
                            </router-link>
                            <router-link to="/SequenceNumberGenerationRulesPage">
                            <el-menu-item index="9-2">序号生成规则</el-menu-item>
                            </router-link>
                            <router-link to="/LabelTemplateManagementPage">
                            <el-menu-item index="9-3">标签模板管理</el-menu-item>
                            </router-link>
                            <router-link to="/ItemNumberTemplateAssociationPage">
                            <el-menu-item index="9-4">料号模板关联</el-menu-item>
                            </router-link>
                            <router-link to="/LabelPrintingApplicationPagePage">
                            <el-menu-item index="9-5">标签打印申请</el-menu-item>
                            </router-link>
                            <router-link to="/LabelPrintJobPagePage">
                            <el-menu-item index="9-6">标签打印作业</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="10">
                        <template slot="title">
                            <i class="el-icon-document"></i>
                            <span slot="title">现场作业</span>
                        </template>
                        <router-link to="/QualityInspectionRecordPage">
                            <el-menu-item index="10-1">质检记录</el-menu-item>
                        </router-link>
                    </el-submenu>

                    <el-submenu index="11">
                        <template slot="title">
                            <i class="el-icon-date"></i>
                            <span slot="title">生产报表</span>
                        </template>
                        <el-menu-item-group>
                            <router-link to="/YieldReportPage">
                                <el-menu-item index="11-1">产量报表</el-menu-item>
                            </router-link>
                            <router-link to="/InquiryPage">
                                <el-menu-item index="11-2">在制查询</el-menu-item>
                            </router-link>
                            <router-link to="/BootDailyPage">
                                <el-menu-item index="11-3">开机日报</el-menu-item>
                            </router-link>
                            <router-link to="/PostProcessDailyReportPage">
                                <el-menu-item index="11-4">后工序日报</el-menu-item>
                            </router-link>
                            <router-link to="/MachineProductionStatusPage">
                                <el-menu-item index="11-5">机台生产状况</el-menu-item>
                            </router-link>
                            <router-link to="/WorkOrderQualificationRatePage">
                                <el-menu-item index="11-6">工单合格率</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="12">
                        <template slot="title">
                            <i class="el-icon-monitor"></i>
                            <span slot="title">看板预览</span>
                        </template>
                        <el-menu-item-group>
                            <router-link to="/TestBrowsPanelPagePage">
                                <el-menu-item index="12-1">测试看板</el-menu-item>
                            </router-link>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
                </el-scrollbar>

                <h2 v-show="appName">
                    <div class="AppName">
                        <p>系统版本：0.0.1</p>
                        <p>版权所有：物联微电子有限公司</p>
                    </div>
                </h2>
            </div>
<!--        主内容区-->
            <div class="main-contain-box" :class="{'main-contain-box-active':sideBarClass}">
                <div class="nav-header">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/HomeContainer' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="main-content-table" style="">
                     <transition mode="out-in">
                        <router-view></router-view>
                     </transition>
                </div>
            </div>

            <div class="page-information">
                <div class="ModifyInformation" >
                    <!-- Form -->
                    <el-dialog width="30%" title="修改密码" :visible.sync="dialogFormChangePasswordVisible">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                            <el-form-item label="旧密码" prop="old" style="margin-bottom: 15px;">
                                <el-input v-model="ruleForm.old" type="password"></el-input>
                            </el-form-item>

                            <el-form-item label="新密码" prop="new" style="margin-bottom: 15px;">
                                <el-input v-model="ruleForm.new" type="password"></el-input>
                            </el-form-item>
                            <el-form-item label="重复密码" prop="repeat" style="margin-bottom: 15px;">
                                <el-input v-model="ruleForm.repeat" type="password" @input="changePwd"></el-input>
                            </el-form-item>

                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormChangePasswordVisible = false">取 消</el-button>
                            <el-button type="primary" @click="SubBtnPassword('ruleForm')">确 定</el-button>
                        </div>
                    </el-dialog>
                    <el-dialog width="30%" title="修改信息" :visible.sync="dialogFormModifyInformationVisible">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="用户姓名：" prop="user" :label-width="formLabelWidth" style="margin-bottom: 15px;">
                                <el-input v-model="ruleForm.user"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码：" :label-width="formLabelWidth" style="margin-bottom: 15px;">
                                <el-input v-model="ruleForm.mobile"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱地址：" :label-width="formLabelWidth" style="margin-bottom: 15px;">
                                <el-input v-model="ruleForm.email"></el-input>
                            </el-form-item>
                            <el-form-item label="用户图标：" :label-width="formLabelWidth" style="margin-bottom: 15px;">
                                <el-input v-model="ruleForm.avatar"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormModifyInformationVisible = false">取 消</el-button>
                            <el-button type="primary" @click="SubBtnInformation('ruleForm')">确 定</el-button>
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

                            <router-link to="/login">
                                <el-dropdown-item >退出登录</el-dropdown-item>
                            </router-link>

                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
</template>

<script>

    export default {
        // name: "home",
        data() {
            return {
                routePath:'',
                active:'',
                sideBarClass:false,
                btnInnerIsShow:false,
                appName:true,
                isCollapse: false,
                dialogFormModifyInformationVisible: false,
                dialogFormChangePasswordVisible: false,
                ruleForm:{
                    old: '',
                    new:'',
                    repeat: '',
                    user:"",
                    mobile:"",
                    email:"",
                    avatar:"",
                    change:true
                },
                rules: {
                    // 定义是否必填项
                    old: [
                        { required: true, message: '请输入旧密码', trigger: 'blur' },
                        { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
                    ],
                    new: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
                    ],
                    repeat: [
                        { required: true, message: '请重复密码', trigger: 'blur' },
                        { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
                    ],
                    user: [
                        { required: true, message: '请输入用户姓名', trigger: 'blur' },
                    ],
                },
                formLabelWidth: '120px',
            };
        },
        created(){

        },
        mounted(){
            this.active = this.$route.name;

        },
        methods:{
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            SubBtnInformation(formName){
                // 后台接口需要传给他json字符串格式所以需要用 Json.stringify
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.$http.post(('user/changeProfile'),JSON.stringify({
                                avatar: this.ruleForm.avatar,
                                emailAddress: this.ruleForm.email,
                                mobileNumber: this.ruleForm.mobile,
                                userName: this.ruleForm.user
                            })).then(response => {
                                if (response.body.status===200) {
                                    this.$message({
                                        message:'修改信息成功，请重新登录！',
                                        type:'success'
                                    });
                                    this.$router.push('/login')
                                }
                                console.log(response.body);
                            }, response => {
                                console.log(response);
                                alert("出问题啦！")
                            });
                        } else{
                            this.dialogFormModifyInformationVisible = true;
                            return false;
                        }
                    });

            },
            //修改密码重复密码验证
            changePwd(){
                console.log(this.ruleForm.repeat)
                if (this.ruleForm.repeat===this.ruleForm.new) {
                    this.ruleForm.change = true
                    console.log(this.ruleForm.change);
                }else {
                    this.ruleForm.change = false
                }
            },
            SubBtnPassword(formName){
                // 先做校验（valid）有效性！
                if (this.ruleForm.change) {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.$http.post(('user/changePassWord'),{oldPwd:this.ruleForm.old,newPwd:this.ruleForm.new,repeatNewPwd:this.ruleForm.repeat}).then(response => {
                                console.log(response.body);
                                if (response.body.status===200){
                                    this.$message({
                                        message:'修改密码成功，请重新登录！',
                                        type:'success'
                                    });
                                    this.$router.push('/login')
                                }else if (response.body.status ===500) {
                                    this.$message({
                                        message:'用户名或密码错误，请重新输入！',
                                        type:'error',

                                    });

                                }
                            }, response => {
                                console.log(response);
                                alert("出问题啦！")
                            });
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }else if (!this.ruleForm.change) {
                    this.$message({
                        message:'两次输入的密码不一致，请重新输入！',
                        type:'error'
                    });
                }


            }
        }
    }
</script>

<style  lang="scss" scoped>

    .v-enter{
        transform: translateX(0px);
        opacity: 0;
    }
    .v-leave-to{
        transform: translateX(200px);
        opacity: 0;
        /*position: absolute;*/
    }
    .v-enter-active,
    .v-leave-active{
        transition: all 0.5s ease;
    }
    .el-button--text {
        color: #606266;
    }
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
        background-color: #f3f3f3;

        .main-contain-box{
            position: absolute;
            top:0;
            bottom: 0;
            right: 0;
            width: calc(100% - 200px);
            .nav-header{
                padding: 15px 0 0 10px;
                background-color: #ecf3f0;
                height: 45px;
                border-bottom: 1px solid #bbbbbb;
            }
            .main-content-table{
                width: 100%;
                height: 100%;
            }
        }
        .main-contain-box-active{
            width: calc(100% - 64px);
        }
        .Sidebar{
            .v-enter{
                transform: translateX(-100%);
                opacity: 0;
            }
            .v-leave-active,
            .v-enter-active{
                transition: all 0.05s ease;
            }
            .logo{
                width: 100%;
                height: 50px;
                padding: 5px;
                background: url("../../images/logo.a616fe89.png") no-repeat;
                background-size: 81%;
                margin: 6px 9px 5px;
                /*background-color: #deff52;*/
            }
            h3{
                width: 100%;
                height: 50px;
                color: rgb(69, 166, 255);
                text-align: center;
                font-size: 24px;
                padding: 0px 8px;
                /*display: block;*/
                font-weight: bold;
                }
            .AppName{
                position: fixed;
                bottom: 10px;
                p{
                    font-weight: normal;
                    color: #ffffff;
                    font-size: 10px;
                    text-align: left;
                    padding:0px 5px 0px 10px;
                }

            }

        }
        .Home-page-menu{

            text-align: center;
            position: absolute;
            right: 10px;
            top: 3px;
            .el-icon--right {
                 margin-left: 0;
            }
            .el-icon-s-custom{
                font-size: 25px;
                margin-left: -13px;
                margin-top: -8px;
                color: #8d8d92;
            }
            .el-button--primary {
                width: 40px;
                height: 40px;
                border:none;
                background-color: #ecf3f0;
            }

        }
    }
</style>
