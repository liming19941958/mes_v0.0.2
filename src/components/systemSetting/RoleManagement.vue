<template>
    <div class="role-management-page">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="角色基础信息" name="first">
                <div class="roles-menu-table">
                    <div class="role-menu">
                        <div class="roleList">
                            <span>角色列表</span>
                            <span class="addUpdate">
                                <i class="el-icon-plus" @click="addRole"></i>
                                <i class="el-icon-delete" v-show="isShow" @click="deleteList"></i>
                                 <i class="el-icon-refresh-right" @click="show" style="cursor: pointer"></i>
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
                        <el-container>
                            <el-header>角色详细信息</el-header>
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
                                <el-row style="height:7%;width:100%;padding: 12px 5px;font-size: 15px;border-top: 1px solid #d6d6d6;border-bottom: 1px solid #d6d6d6;">
                                    <span>包含用户</span>
                                    <span style="display: inline-block;
                                            float: right;
                                            margin-right: 30px;
                                            text-indent: 15px;
                                            color: #007aff">
                                        <i class="el-icon-plus" @click="addUser" style="cursor: pointer"></i>
                                        <i class="el-icon-delete" @click="deleteUser" style="cursor: pointer"></i>
                                        <i class="el-icon-refresh-right" @click="getRoleUserList" style="cursor: pointer"></i>
                                    </span>
                                </el-row>
                                <el-row style="height:93%;width:100%;overflow: scroll">
                                    <el-table
                                            ref="multipleTable"
                                            :data="tableData"
                                            tooltip-effect="dark"
                                            style="width: 100%;"
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
                                                width="840%">
                                            <template slot-scope="scope">{{ scope.row.loginName }}</template>
                                        </el-table-column>
                                        <el-table-column
                                                prop="name"
                                                label="用户名"
                                                >
                                            <template slot-scope="scope">{{ scope.row.userName }}</template>
                                        </el-table-column>
                                    </el-table>
                                    <div class="block" style="margin-left: 68.2%;margin-top: 30px">
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
        data(){
            return{
                isShow:false,
                activeName:'first',
                data:null,
                dataText:'',
                loading:true,
                total:'',
                totalPage:'0',
                defaultProps: {
                    children: 'Subdirectory',
                    label: 'name'
                },
                tableData: [],
                multipleSelection: [],//表格选中的项的数组
                arrSelects:[],
                params:{
                    size:'10',
                    page:'1',
                    orgId:'',
                    roleLeaf:'',
                    roleTf:'',
                    parentId: '',
                    addParentId:'',
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

            handleNodeClick(data){//组织架构选择树形控件各分支
                console.log(data);
                if (data.roleLeaf){
                    this.ruleForm.resource='角色'

                }else {
                    this.ruleForm.resource='非角色';
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

            addUser(){

            },
            deleteUser(){
                console.log(this.params.orgId);
                this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('role/deleteRoleUser',JSON.stringify({roleId:this.params.orgId,userIds:this.arrSelects})).then(()=>{
                        this.getRoleUserList();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
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

            deleteList(){
                this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('role/deleteList',{ids:this.params.orgId}).then(()=>{
                        this.show();
                        this.getRoleUserList();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            indexMethods(index) {
                return (this.params.page - 1) * this.params.size + index + 1;
            },

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

            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            handleSelectionChange(val) {
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

<style scoped lang="scss">

    .el-header{
        padding-left: 20px;
        padding-top: 15px;
        border-bottom: 1px solid #d3d3d3;

        color: #333;
        flex:0.4;
    }
     .el-footer {
          /*background-color: #B3C0D1;*/
          color: #333;

         /*height: 100vh;*/
         flex:7.7;

     }
    .el-main {
        /*padding-right: 800px;*/
        flex:2.3;
        padding: 15px 0 39px 15px;
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

            .role-menu{
                float: left;
                height: 100%;
                min-width: 200px;
                flex:1.5;
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
                display: flex;
                float: left;
                height: 100%;
                flex:8.5;
                background-color: #ecf3f0;

            }
        }
    }
</style>