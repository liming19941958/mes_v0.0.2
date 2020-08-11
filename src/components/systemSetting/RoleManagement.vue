<template>
    <div class="role-management-page">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="角色基础信息" name="first">
                <div class="roles-menu-table">
                    <div class="role-menu">
                        <div class="roleList">
                            <span>角色列表</span>
                            <span class="addUpdate">
                                <el-tooltip popper-class="atooltip" content="添加" placement="bottom">
                                     <i class="el-icon-plus" @click="addRole"></i>
                                </el-tooltip>
                                <el-tooltip popper-class="atooltip" v-show="isShow" content="删除" placement="bottom">
                                    <i class="el-icon-delete" @click="deleteRoleWindow"></i>
                                </el-tooltip>
                                <el-tooltip popper-class="atooltip" content="刷新" placement="bottom">
                                    <i class="el-icon-refresh-right" @click="show" style="cursor: pointer"></i>
                                </el-tooltip>
                            </span>

                        </div>
<!--                        删除角色警告框-->
                        <el-dialog
                                title="提示"
                                :visible.sync="dialogRloeVisible"
                                width="20%!important" class="dialog1">
                            <i class="el-icon-question" style="color:#ffdc72;font-size:25px;position: absolute;top:19px;left:8px"></i>
                            <span style="font-size: 16px">确定删除？</span>
                            <span slot="footer" class="dialog-footer">
                                        <el-button @click="dialogRloeVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="deleteList">确 定</el-button>
                                    </span>
                        </el-dialog>

                        <div class="roleNameMenu">
                            <el-tree
                                    v-loading="loading"
                                    element-loading-text="拼命加载中"
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.001)"
                                    :empty-text="dataText"
                                    :data="data"
                                    :props="defaultProps"
                                    default-expand-all
                                    highlight-current=true
                                    :expand-on-click-node="false"
                                    @node-click="handleNodeClick"
                                    style="background-color: #ecf3f0;width: 100%;">
                            </el-tree>
                        </div>
                    </div>
                    <div class="role-table">
                        <el-header style="height: 5.45%;min-height: 51px">角色详细信息</el-header>
                        <el-main>
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                                <el-form-item label="角色名称" prop="name" style="margin-bottom: 10px;">
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
                        <el-footer style="position: relative;padding: 0 5px">
                            <el-row style="min-height:40px;width:100%;
                                padding: 12px 5px;font-size: 15px;
                                border-top: 1px solid #d6d6d6;
                                border-bottom: 1px solid #d6d6d6;">
                                <span>包含用户</span>

                                <span style="
                                          float: right;
                                          margin-right: 30px;
                                          text-indent: 15px;
                                          color: #007aff"
                                      v-show="isShowButton">
                                    <el-tooltip popper-class="atooltip" content="添加" placement="bottom" style="border: none!important;">
                                        <i class="el-icon-plus" @click="addUser" style="cursor: pointer"></i>
                                    </el-tooltip>

                                    <el-tooltip popper-class="atooltip" content="删除" placement="bottom">
                                       <i class="el-icon-delete" @click="deleteUserWindow" style="cursor: pointer"></i>
                                    </el-tooltip>
                                    <el-tooltip popper-class="atooltip" content="刷新" placement="bottom">
                                        <span> <i class="el-icon-refresh-right" @click="getRoleUserList" style="cursor: pointer"></i></span>
                                    </el-tooltip>
                                </span>
                                <el-dialog
                                        title="提示"
                                        :visible.sync="dialogVisible"
                                        width="20%!important" class="dialog1">
                                    <i class="el-icon-question" style="color:#ffdc72;font-size:25px;position: absolute;top:19px;left:8px"></i>
                                    <span style="font-size: 16px">确定删除？</span>
                                    <span slot="footer" class="dialog-footer">
                                        <el-button @click="dialogVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="deleteUser">确 定</el-button>
                                    </span>
                                </el-dialog>
<!--                                  添加包含用户弹窗-->
                                <el-dialog width="55%!important" title="用户列表" :visible.sync="dialogFormAddUserInformationVisible">
                                    <el-row style="width: 100%;overflow: scroll;height: 100%;position: relative">
                                        <el-col style="min-height:42.5px;width:100%;position:
                                               relative;padding: 0 11px 0 11px;
                                               float: left">
                                            <div style="height: 32px;width: 18%;min-width: 236px;float:left;position: relative;display: inline-block;">
                                                <el-input
                                                        size="medium" v-model="params.search" placeholder="请输入查询内容"
                                                        style="display: inline-block;width: 20%;min-width: 220px;margin-right: 15px;position: relative;height: 32px;padding: 0 0;float: left">
                                                </el-input>
                                            </div>
                                            <el-button type="primary"
                                                       style="display: inline-block;
                                                         float: left;width: 10%;min-width: 40px;
                                                         height: 32px;position: relative;padding: 0 0;"
                                                       @click="addUser">查询
                                            </el-button>
                                        </el-col>
                                        <el-col style="height: 70%;width:100%;padding: 15px 15px 15px 15px;">
                                            <el-table
                                                    @selection-change="handleSelectionChangeAddUserList"
                                                    :empty-text="dataText3"
                                                    v-loading="loading3"
                                                    element-loading-text="拼命加载中"
                                                    element-loading-spinner="el-icon-loading"
                                                    element-loading-background="rgba(0, 0, 0, 0.08)"
                                                    :data="userListShow"
                                                    :max-height=410
                                                    :row-style="{height:'35px'}"
                                                    :cell-style="{padding:'0px'}"
                                                    style="width: 100%;height: 75%; position: relative">
                                                <el-table-column
                                                        type="selection"
                                                        width="55">
                                                </el-table-column>
                                                <el-table-column
                                                        label="行号"
                                                        type="index"
                                                        :index="indexMethods2">
                                                </el-table-column>

                                                <el-table-column
                                                        label="用户名">
                                                    <template slot-scope="scope">
                                                        <div slot="reference" class="name-wrapper">
                                                            <el-tag size="medium">{{ scope.row.userName }}</el-tag>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column
                                                        label="登录名">
                                                    <template slot-scope="scope">
                                                        <div slot="reference" class="name-wrapper">
                                                            <el-tag size="medium">{{ scope.row.loginName }}</el-tag>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column
                                                        label="手机号码">
                                                    <template slot-scope="scope">
                                                        <div slot="reference" class="name-wrapper">
                                                            <el-tag size="medium">{{ scope.row.mobileNumber }}</el-tag>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                                <el-table-column
                                                        label="邮箱地址">
                                                    <template slot-scope="scope">
                                                        <div slot="reference" class="name-wrapper">
                                                            <el-tag size="medium">{{ scope.row.emailAddress }}</el-tag>
                                                        </div>

                                                    </template>
                                                </el-table-column>
                                                <el-table-column
                                                        label="用户状态">
                                                    <template slot-scope="scope">

                                                        <div slot="reference" class="name-wrapper">
                                                            <el-tag size="medium">{{ scope.row.state | userStatus}}</el-tag>
                                                        </div>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                            <div class="block"
                                                 style="position:relative;
                                                   margin-top: 20px;float: right">
                                                <el-pagination
                                                        @size-change="handleSizeChangeAddUserList"
                                                        @current-change="handleCurrentChangeAddUserList"
                                                        :current-page="params.page2"
                                                        :page-sizes="[10, 20, 30, 40]"
                                                        :page-size="params.size2"
                                                        layout="total,slot,sizes, prev, pager, next, jumper"
                                                        :total="total2">
                                                    <span>共{{totalPage2}}页</span>
                                                </el-pagination>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <div slot="footer" class="dialog-footer">
                                        <el-button @click="dialogFormAddUserInformationVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="addUserList">确 定</el-button>
                                    </div>
                                </el-dialog>
                            </el-row>
<!--                              包含用户列表-->
                            <el-row style="height:60vh;width:100%;">
                                <el-table
                                        ref="multipleTable"
                                        :data="tableData"
                                        tooltip-effect="dark"
                                        size="small"
                                        style="height: 60%;overflow-y: scroll;"
                                        @selection-change="handleSelectionChange">
                                    <el-table-column type="selection">
                                    </el-table-column>
                                    <el-table-column
                                            label="行号"
                                            type="index"
                                            :index="indexMethods">
                                    </el-table-column>
                                    <el-table-column
                                            label="登录名"
                                    >
                                        <template slot-scope="scope">{{ scope.row.loginName }}</template>
                                    </el-table-column>
                                    <el-table-column
                                            prop="name"
                                            label="用户名"
                                    >
                                        <template slot-scope="scope">{{ scope.row.userName }}</template>
                                    </el-table-column>
                                </el-table>
                                <div class="block" style="position:relative;margin-right: 30px; float: right;margin-top: 30px">
                                    <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="params.page"
                                            :page-sizes="[10, 20, 30, 40]"
                                            :page-size="params.size"
                                            layout="total,slot,sizes, prev, pager, next, jumper"
                                            :total="total">
                                        <span>共{{totalPage}}页</span>
                                    </el-pagination>
                                </div>
                            </el-row>
                        </el-footer>
                    </div>
                </div>
            </el-tab-pane>

            <el-tab-pane label="PC可操作权限" name="second">
                <div class="roles-menu-table">
                    <div class="role-menu">
                        <div class="roleList">
                            <span>角色列表</span>
                            <span>

                                 <i class="el-icon-refresh-right"></i>
                            </span>
                        </div>
                        <div class="roleNameMenu">
                            <el-tree
                                    v-loading="loading"
                                    element-loading-text="拼命加载中"
                                    element-loading-spinner="el-icon-loading"
                                    element-loading-background="rgba(0, 0, 0, 0.001)"
                                    :empty-text="dataText"
                                    :data="data"
                                    :props="defaultProps"
                                    default-expand-all
                                    highlight-current=true
                                    :expand-on-click-node="false"
                                    @node-click="handleNodeClick"
                                    style="background-color: #ecf3f0;width: 100%;">
                            </el-tree>
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
                                        <el-menu-item index="1-5">客户3</el-menu-item>

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
        filters:{
            userStatus:function(state) {
                if (state===1){
                    return '正常';
                }else {
                    return '禁用';
                }
            }
        },
        data(){
            return{
                isShow:false,
                isShowButton:false,
                isShowTip:false,
                activeName:'first',
                data:null,
                dataText:'',
                dataText3:'',
                loading:true,
                loading3:true,
                total:'',
                total2:'',
                totalPage:'0',
                totalPage2:'0',
                defaultProps: {
                    children: 'Subdirectory',
                    label: 'name'
                },
                tableData: [],
                userListShow:[],
                multipleSelection: [],//表格选中的项的数组
                arrSelects:[],
                arrSelectsAddUserLists:[],
                dialogFormAddUserInformationVisible:false,
                dialogVisible:false,
                dialogRloeVisible:false,
                params:{
                    size:'10',
                    size2:'10',
                    page:'1',
                    page2:'1',
                    orgId:'',
                    roleLeaf:'',
                    roleTf:'',
                    parentId: '',
                    addParentId:'',
                    search:'',
                },
                ruleForm: {
                    resource:'',
                    name: '',
                    SortCode:'999',
                    nodeType: '',
                    desc: '',
                    addOrUpdate:true,
                },
                rules: {
                    // 定义是否必填项
                    name: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    nodeType: [
                        { required: false, message: '请选择节点类型', trigger: 'change' }
                    ],
                    desc: [
                        { required: false, message: '请填写活动形式', trigger: 'blur' }
                    ]
                },


            }
        },
        created(){
            this.show();
        },
        methods: {
            //获取组织架构树
            show(){
                this.dataText = ' ';
                // let r_path = '/organization';
                // sessionStorage.setItem('Path',r_path );
                this.$http.post(('role/show'),{}).then(response=>{
                    if (response.status===200){
                        let act = JSON.parse(response.body.result);
                        this.data=act;
                        if(this.data.length !==0){
                            this.loading = false;
                        }else if (this.data.length === 0) {
                            this.dataText = "暂无数据";
                        }
                    }
                })
            },

            //组织架构选择树形控件各分支
            handleNodeClick(data){
                console.log(data);
                if (data.roleLeaf){
                    this.ruleForm.resource='角色';
                    this.isShowButton=true;

                }else {
                    this.ruleForm.resource='非角色';
                    this.isShowButton=false;
                }
                this.ruleForm.desc=data.description;
                this.ruleForm.name=data.name;
                this.roleLeaf=data.roleLeaf;
                this.params.orgId=data.id;
                this.params.parentId=data.parentId;
                this.ruleForm.SortCode= data.sort;

                if (data.parentId ==0){
                    this.params.addParentId=data.id;
                    this.isShow=false;
                    // console.log('豪威集团'+ this.isShow);
                }else if (data.parentId !==0) {
                    this.isShow=true;
                    // console.log('客户管理员'+ this.isShow);
                }
                this.getRoleUserList();
                // console.log('用户所属部门'+this.params.orgId);
            },
             //获取角色包含用户列表
            getRoleUserList(){
                this.$http.get('role/getRoleUserList',{
                    params:{
                        roleId:this.params.orgId,
                        size:this.params.size,
                        page:this.params.page
                    }
                }).then(response=>{
                    if (response.status===200){
                        // console.log(response.body.result.totalPage)
                        this.tableData = response.body.result.data;
                        this.total = response.body.result.totalCount;
                        this.totalPage = response.body.result.totalPage;
                    }
                    // console.log(response.body.result.data);
                }).catch(err=>{
                    this.$message({
                        message:err,
                        type:'error'
                    });
                    console.log(err)
                })
            },

            //添加角色
            addRole(){
                // console.log('父节点id:'+this.params.addParentId);
                if (this.roleLeaf==null) {
                    this.$message({
                        message:'请在角色列表先选择一个节点!',
                        type:'warning',
                    });
                }else if (this.roleLeaf){
                    this.$message({
                        message:'角色节点不能再添加角色!',
                        type:'warning',
                    });
                }else if (!this.roleLeaf) {
                    this.ruleForm.desc=null;
                    this.ruleForm.addOrUpdate = !this.ruleForm.addOrUpdate;
                    this.ruleForm.name=null;
                    this.ruleForm.resource='角色';
                }
            },
            //删除角色列表中的用户信息
            deleteList(){
                this.dialogRloeVisible=false;
                    this.$http.post('role/deleteList',{ids:this.params.orgId}).then(response=>{
                        if (response.body.status===200){
                            this.show();
                            this.$message({
                                type: 'success',
                                message: response.body.result
                            });
                        }
                    }).catch((err)=>{
                        this.$message({
                            type: 'error',
                            message: err
                        });
                    })
                },

            // 角色包含用户添加用户获取用户列表信息
            addUser(){
                this.dataText3= ' ';
                this.$http.get('user/getUserList',{
                    params:{
                        page:this.params.page2,
                        size:this.params.size2,
                        search:this.params.search
                    }
                }).then(response=>{
                    if (response.body.status===200){
                        this.userListShow=response.body.result.data;
                        this.total2 = response.body.result.totalCount;
                        this.totalPage2 = response.body.result.totalPage;
                        if(this.userListShow.length !==0){
                            this.loading3 = false;
                        }else if (this.userListShow.length === 0) {
                            this.dataText3 = "暂无数据";
                        }
                        // console.log(this.userListShow);
                    }
                }).catch((err)=>{
                    console.log(err);
                })
                this.dialogFormAddUserInformationVisible=true;

            },

            // 选中用户信息后提交表单以添加包含用户
            addUserList(){
                if (this.arrSelectsAddUserLists.length===0){
                    this.$message({
                        type:"warning",
                        message:"请选择一条数据！"
                    })
                }else {
                    this.$http.post('role/saveRoleUser',JSON.stringify(
                        {
                            roleId:this.params.orgId,
                            userIds:this.arrSelectsAddUserLists,
                        }
                    )).then(response=>{
                        if (response.body.status===200){
                            this.dialogFormAddUserInformationVisible=false;
                            this.getRoleUserList();
                            this.$message({
                                type:"success",
                                message:"添加成功！"
                            })

                        }

                    }).catch((err)=>{
                        this.$message({
                            type:"error",
                            message:err
                        })
                    })
                }

            },

            deleteRoleWindow(){
              this.dialogRloeVisible=true;
            },
            deleteUserWindow(){
                if (this.arrSelects.length===0){
                    this.$message({
                        type: 'warning',
                        message: '请选择要删除的数据!'
                    });
                }else {
                    this.dialogVisible = true
                }
            },
            //删除包含用户列表信息
            deleteUser(){
                    this.$http.post('role/deleteRoleUser',
                        JSON.stringify({roleId:this.params.orgId,userIds:this.arrSelects}
                        )).then(response=>{
                            if (response.body.status===200) {
                                this.getRoleUserList();
                                this.dialogVisible = false;
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            }
                    }).catch((err)=>{
                        this.$message({
                            type: 'error',
                            message: err
                        });
                    })
                },

           // 包含用户列表分页方法
            indexMethods(index) {
                return (this.params.page - 1) * this.params.size + index + 1;
            },

            //添加包含用户弹窗中的分页方法
            indexMethods2(index) {
                return (this.params.page2 - 1) * this.params.size2 + index + 1;
            },

            // 编辑和新增角色信息
            submitForm(formName) {
                if(this.ruleForm.resource=='角色'){
                    this.params.roleTf='1';
                }else if (this.ruleForm.resource=='非角色'){
                    this.params.roleTf='0';
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                      if (this.ruleForm.addOrUpdate){//updateRole
                          this.$http.post('role/update'+"?"+this.$qs.stringify({
                              roleLeaf:this.params.roleTf,
                              description:this.ruleForm.desc,
                              id:this.params.orgId,
                              name:this.ruleForm.name,
                              parentId:this.params.parentId,
                              sort:this.ruleForm.SortCode
                          })).then(response=>{
                              if (response.body.status===200){
                                  this.$message({
                                      message:'修改成功!',
                                      type:'success',
                                  });
                                  this.show();
                              }
                          }).catch((err)=>{
                              this.$message({
                                  message:'修改失败',
                                  type:'error',
                              });
                              console.log(err)
                          })
                      }else{
                          this.$http.post('role/add'+"?"+this.$qs.stringify({
                              roleLeaf:this.params.roleTf,
                              description:this.ruleForm.desc,
                              id:this.params.orgId,
                              name:this.ruleForm.name,
                              parentId:this.params.addParentId,
                              sort:this.ruleForm.SortCode
                          })).then(response=>{
                              if (response.body.status===200){
                                  this.$message({
                                      message:'添加成功!',
                                      type:'success',
                                  });
                                  this.show();
                              }
                          }).catch((err)=>{
                              this.$message({
                                  message:'添加失败！',
                                  type:'error',
                              });
                              console.log(err);
                          })
                      }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            handleSizeChangeAddUserList(val) {//添加包含用户(弹窗页面)
                this.params.size2= `${val}`;
                this.addUser();
                console.log(`每页 ${val} 条`);
            },

            handleCurrentChangeAddUserList(val) {//添加包含用户(弹窗页面)
                this.params.page2 = `${val}`;
                this.addUser();
                console.log(`当前页: ${val}`);
            },

            handleSelectionChangeAddUserList(val) {
                this.multipleSelectionAddUserList = val;
                let array = this.multipleSelectionAddUserList;
                let arrSelectAddUserList = [];
                for (var i =0;i<array.length; i++){
                    let arr= array[i].id;
                    arrSelectAddUserList.push(arr);
                }
                this.arrSelectsAddUserLists=arrSelectAddUserList;
                console.log(this.arrSelectsAddUserLists);
            },
            handleSizeChange(val) {//角色中包含用户的列表页面
                this.params.size= `${val}`;
                this.getRoleUserList();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {//角色中包含用户的列表页面
                this.params.page = `${val}`;
                this.getRoleUserList();
                console.log(`当前页: ${val}`);
            },
            handleSelectionChange(val) {//角色中包含用户的列表页面
                this.multipleSelection = val;
                let array = this.multipleSelection;
                let arrSelect = [];
                for (var i =0;i<array.length; i++){
                    let arr= array[i].id;
                    arrSelect.push(arr);
                }
                this.arrSelects=arrSelect;
                console.log(this.arrSelects);
            },
        }


    }
</script>
<style lang="scss">
    .el-tabs__item {
        color: #515A6E;
    }

</style>
<style scoped lang="scss">

    .el-header{
        padding-left: 20px;
        padding-top: 15px;
        border-bottom: 1px solid #d3d3d3;
        color: #333;
        height: 10vh;
    }
     .el-footer {
          color: #333;
     }
    .el-main {
        padding: 15px 0 39px 15px;
    }
    .role-management-page{
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #effff3;

        .roles-menu-table{
           display: flex;
            height: 95vh;
            width: 100%;
            .role-menu{
                position: relative;
                display: inline-block;
                float: left;
                height: 100%;
                width: 15%;
                min-width: 200px;
                margin-right: 8px;
                background-color: #ecf3f0;
                    .roleList{
                        position: relative;
                        display: inline-block;
                        width: 100%;
                        border-bottom: 1px solid #d5d5d5;
                        line-height: 50px;
                        span:nth-child(1){
                            float: left;
                            display: inline-block;
                            margin-left: 30px;
                        }
                        span:nth-child(2){
                            position: relative;
                            color:  #007aff !important;
                            i:hover{
                                cursor: pointer;
                            }
                            display: inline-block;
                            float: right;
                            margin-right: 30px;
                            text-indent: 10px;
                        }
                    }
                    .roleNameMenu{
                        float: left;
                        padding: 20px 0 0 20px;
                        height: 100%;
                        overflow: scroll;
                    }

            }
            .role-table{
                overflow: scroll;
                position: relative;
                display: inline-block;
                float: right;
                width: 100%;
                height: 100vh;
                background-color: #ecf3f0;

            }
        }
    }
</style>