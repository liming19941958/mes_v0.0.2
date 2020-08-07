<template>
    <div class="user-management-page">
            <el-row style="width: 15%;float:left;position: relative;border-right: 1px solid #cacaca">
                <el-col
                   style="height: 5%;width:100%;
                  position:relative;
                  text-align: center;
                  padding: 15px 0;
                  border-bottom: 1px solid #cacaca">组织架构</el-col>
                <el-col style="height: 95%;width:100%;position: relative;padding: 25px 25px 0 25px">
                    <el-tree
                            v-loading="loading2"
                            element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.001)"
                            :empty-text="dataText2"
                            :data="data"
                            :props="defaultProps"
                            default-expand-all=true
                            @node-click="handleNodeClick"
                            style="background-color: #effff3">
                    </el-tree>
                </el-col>
            </el-row>
            <el-row style="width: 85%;float:left;margin-left: 10px;border-left: 1px solid #cacaca;position: relative">
                <el-col style="height: 5%;min-height:35px;width:100%;position:
                        relative;padding: 6px 0;
                        border-bottom: 1px solid #cacaca">
                    <el-button type="primary" style="margin: 0 0 0 15px;display: inline-block;width: 5%;height: 100%;position: relative;text-align: center;padding: 0 0;"  @click="dialogFormModifyInformationVisible = true">新增</el-button>
                    <el-dialog width="30%" title="添加用户"  :visible.sync="dialogFormModifyInformationVisible">
<!--                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >-->
<!--                            <el-form-item  label="用户姓名" prop="use" style="margin-bottom: 15px;">-->
<!--                                <el-input placeholder="请输入用户姓名" v-model="ruleForm.username" ></el-input>-->
<!--                            </el-form-item>-->

<!--                            <el-form-item label="登录名" prop="login" style="margin-bottom: 15px;">-->
<!--                                <el-input placeholder="请输入登录名" v-model="ruleForm.new"></el-input>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="用户密码" prop="user_password" style="margin-bottom: 15px;">-->
<!--                                <el-input placeholder="请输入用户密码" v-model="ruleForm.repeat" type="password" @input="changePwd"></el-input>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="重复密码" prop="repeat" style="margin-bottom: 15px;">-->
<!--                                <el-input placeholder="请重复密码" v-model="ruleForm.repeat" type="password" @input="changePwd"></el-input>-->
<!--                            </el-form-item>-->

<!--                            <el-form-item label="邮箱地址" style="margin-bottom: 15px;">-->
<!--                                <el-input placeholder="请输入邮箱地址" v-model="ruleForm.repeat" type="password" @input="changePwd"></el-input>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="显示顺序" prop="repeat" style="margin-bottom: 15px;width: 25%;">-->
<!--                                <el-input v-model="ruleForm.order" @input="changePwd"></el-input>-->
<!--                            </el-form-item>-->
<!--                            <el-form-item label="所属部门" :label-width="formLabelWidth">-->
<!--                                <el-select ref= "mySelect" v-model="ruleForm.department" placeholder="请选择活动区域">-->
<!--                                    <el-option style="display: inline-block;">-->
<!--                                        <el-tree :data="data"-->
<!--                                                 :props="defaultProps"-->
<!--                                                 default-expand-all=true-->
<!--                                                 @node-click="handleNodeAddUser"-->
<!--                                                 style="position:relative;">-->
<!--                                        </el-tree>-->
<!--                                    </el-option>-->
<!--                                </el-select>-->

<!--                            </el-form-item>-->
<!--                            <el-form-item label="用户状态" :label-width="formLabelWidth">-->
<!--                                <el-select v-model="ruleForm.userStatus" placeholder="请选择活动区域">-->
<!--                                    <el-option label="正常" value="正常"></el-option>-->
<!--                                    <el-option label="禁用" value="禁用"></el-option>-->
<!--                                </el-select>-->
<!--                            </el-form-item>-->

<!--                        </el-form>-->
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                            <el-form-item label="用户姓名" prop="username" style="margin-bottom: 15px;">
<!--                                prop的值要与 v-model的值相同-->
                                <el-input v-model="ruleForm.username"></el-input>
                            </el-form-item>

                            <el-form-item label="登录名" prop="login_name" style="margin-bottom: 15px;">
                                <el-input v-model="ruleForm.login_name"></el-input>
                            </el-form-item>
                            <el-form-item label="用户密码" prop="user_password" style="margin-bottom: 15px;">
                                <el-input v-model="ruleForm.user_password" type="password" @input="changePwd"></el-input>
                            </el-form-item>
                            <el-form-item label="重复密码" prop="repeat_password" style="margin-bottom: 15px;">
                                <el-input v-model="ruleForm.repeat_password" type="password" @input="changePwd"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码" prop="mobile_number" style="margin-bottom: 15px;width: 40%;">
                                <el-input
                                        type="text"
                                        placeholder="请输入手机号码"
                                        v-model="ruleForm.mobile_number"
                                        maxlength="11"
                                        show-word-limit
                                >
                                </el-input>
                            </el-form-item>
                            <el-form-item label="邮箱地址" style="margin-bottom: 15px;">
                                <el-input placeholder="请输入邮箱地址" v-model="ruleForm.email" type="password" @input="changePwd"></el-input>
                            </el-form-item>
                            <el-form-item label="显示顺序" prop="order" style="margin-bottom: 15px;width: 25%;">
                                <el-input v-model="ruleForm.order" @input="changePwd"></el-input>
                            </el-form-item>
                            <el-form-item label="所属部门" prop="department">
                                <el-select ref= "mySelect" v-model="ruleForm.department" placeholder="请选择所属部门">
                                    <el-option style="display: inline-block;">
                                        <el-tree :data="data"
                                                 :props="defaultProps"
                                                 default-expand-all=true
                                                 @node-click="handleNodeAddUser"
                                        >
                                        </el-tree>
                                    </el-option>
                                </el-select>

                            </el-form-item>
                            <el-form-item label="用户状态" prop="user_status">
                                <el-select v-model="ruleForm.user_status" placeholder="请选择用户状态">
                                    <el-option label="正常" value="1"></el-option>
                                    <el-option label="禁用" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormModifyInformationVisible = false">取 消</el-button>
                            <el-button type="primary" @click="addUser('ruleForm')">确 定</el-button>
                        </div>
                    </el-dialog>
                    <el-button type="primary" style="display: inline-block;float: right;margin-right: 20px;width: 5%;height: 100%;position: relative;padding: 0 0;" @click="getUserList">查询</el-button>
                    <el-input size="medium" v-model="params.search" placeholder="搜索关键字" style="display: inline-block;width: 20%;margin-right: 15px;position: relative;height: 100%;padding: 0 0;float: right"></el-input>

                </el-col>
                <el-col style="height: 100%;width:100%;padding: 15px 15px 15px 15px">
                    <el-table
                            v-loading="loading"
                            element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.08)"
                            lazy="true"
                            :empty-text="dataText"
                            :data="userList"
                            style="width: 100%;height: 83%;overflow: scroll">
                        <el-table-column
                                label="行号"
                                type="index"
                                :index="indexMethods">
                        </el-table-column>
                        <el-table-column
                                label="用户名">
                            <template slot-scope="scope">
<!--                                <el-popover trigger="hover" placement="top">-->
<!--                                    <p>姓名: {{ scope.row.name}}</p>-->
<!--                                    <p>住址: {{ scope.row.address }}</p>-->
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.userName }}</el-tag>
                                    </div>
<!--                                </el-popover>-->
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="登录名">
                            <template slot-scope="scope">
<!--                                <el-popover trigger="hover" placement="top">-->
<!--                                    <p>姓名: {{ scope.row.name }}</p>-->
<!--                                    <p>住址: {{ scope.row.address }}</p>-->
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.loginName }}</el-tag>
                                    </div>
<!--                                </el-popover>-->
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="手机号码">
                            <template slot-scope="scope">
<!--                                <el-popover trigger="hover" placement="top">-->
<!--                                    <p>姓名: {{ scope.row.name }}</p>-->
<!--                                    <p>住址: {{ scope.row.address }}</p>-->
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.mobileNumber }}</el-tag>
                                    </div>
<!--                                </el-popover>-->
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="邮箱地址">
                            <template slot-scope="scope">
<!--                                <el-popover trigger="hover" placement="top">-->
<!--                                    <p>姓名: {{ scope.row.name }}</p>-->
<!--                                    <p>住址: {{ scope.row.address }}</p>-->
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.emailAddress }}</el-tag>
                                    </div>
<!--                                </el-popover>-->
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="用户状态">
                            <template slot-scope="scope">
<!--                                <el-popover trigger="hover" placement="top">-->
<!--                                    <p>姓名: {{ scope.row.name }}</p>-->
<!--                                    <p>住址: {{ scope.row.address }}</p>-->
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.state | userStatus}}</el-tag>
                                    </div>
<!--                                </el-popover>-->
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        style="text-align: center;"
                                        size="mini"
                                        @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block"
                         style="position: relative;
                     margin-top: 20px;float: right">
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
                </el-col>

        </el-row>

    </div>

</template>

<script>
    export default {
        name: "UserManagement",
        filters:{
            userStatus:function(data) {
                if (data.state===1){
                    return data+'正常';
                }else {
                    return data+'禁用';
                }
            }
        },
        data() {
            return {
                data: null,
                defaultProps: {
                    children: 'Subdirectory',
                    label: 'departmentName'
                },
                dialogFormModifyInformationVisible: false,
                dialogFormChangePasswordVisible: false,
                ruleForm:{
                    username: '',
                    login_name:'',
                    repeat_password: '',
                    mobile_number:'',
                    order:'999',
                    user_status:'',
                    department:'',
                    user_password:'',
                    email:"",
                    change:true,
                    errorMsg:''
                },
                rules: {
                    // 定义是否必填项
                    username: [
                        { required: true, message: '请输入用户姓名', trigger: 'blur' },
                    ],
                    login_name: [
                        { required: true, message: '请输入登录名', trigger: 'blur' },
                    ],
                    user_password: [
                        { required: true, message: '请输入用户密码', trigger: 'blur' },
                        { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
                    ],
                    repeat_password: [
                        { required: true, message: '请输入用户姓名', trigger: 'blur' },
                    ],
                    mobile_number: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                    ],
                    user_status: [
                        { required: true, message: '请输入用户状态', trigger: 'blur' },
                    ],
                    department: [
                        { required: true, message: '请输入所属部门', trigger: 'blur' },
                    ],
                    order: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                    ]
                },
                formLabelWidth: '120px',
                text: '',
                total:'',
                totalPage:'',
                params:{
                    size:'10',
                    page:'1',
                    search:'',
                    orgId:'',
                },
                dataText:'',
                loading: true,
                dataText2:'',
                loading2: true,
                userList: [],

            };
        },
        created(){
            this.show();
            this.getUserList();
        },
        mounted(){
        },
        methods: {
            //获取组织架构树
            show(){
                this.dataText2 = ' ';
                let r_path = '/organization';
                sessionStorage.setItem('Path',r_path );
                this.$http.post(('organization/show'),{}).then(response=>{
                    if (response.status===200){
                        let act = JSON.parse(response.body.result);
                        this.data=act;
                        if(this.data.length !==0){
                            this.loading2 = false;
                        }else if (this.data.length === 0) {
                            this.dataText2 = "暂无数据";
                        }
                    }
                })
            },
            getUserList(){
                this.dataText = ' ';
                let r_path = '/organization';
                sessionStorage.setItem('Path',r_path );
                this.$http.get('user/getUserList',
                    {
                        params:{
                            'size':this.params.size,
                            'page':this.params.page,
                            'search':this.params.search,
                            'orgId':this.params.orgId
                        }
                    }).then(result=>{
                    if (result.status === 200) {
                        let userListData = result.body.result.data;
                        this.userList = userListData;
                        console.log(this.userList);
                        this.total = result.body.result.totalCount;
                        this.totalPage = result.body.result.totalPage;
                        if(this.userList.length !==0){
                            this.loading = false;
                        }else if (this.userList.length === 0) {
                            this.dataText = "暂无数据";
                        }
                    }
                })
            },
            //修改密码重复密码验证
            changePwd(){
                console.log(this.ruleForm.repeat)
                if (this.ruleForm.user_password===this.ruleForm.repeat_password) {
                    this.ruleForm.change = true
                    console.log(this.ruleForm.change);
                }else {
                    this.ruleForm.change = false
                }
            },
            addUser(formName){

                if (this.ruleForm.department===this.data[0].label){//根目录
                    this.ruleForm.orgIds=this.data[0].uuid;
                }else if (this.ruleForm.department===this.data[0].children[0].label) {//根目录的孩子1（无孩子）
                    this.ruleForm.orgIds=this.data[0].children[0].uuid
                }else if (this.ruleForm.department===this.data[0].children[1].label) {//根目录的孩子2（有孩子）
                    this.ruleForm.orgIds=this.data[0].children[1].uuid
                }else if (this.ruleForm.department===this.data[0].children[1].children[0].label) {//根目录的孩子的孩子1）
                    this.ruleForm.orgIds=this.data[0].children[1].children[0].uuid
                }else if (this.ruleForm.department=== this.data[0].children[1].children[1].label) {//根目录的孩子的孩子2）
                    this.ruleForm.orgIds=this.data[0].children[1].children[1].uuid
                }
                console.log(this.ruleForm.orgIds);
                // 先做校验（valid）有效性！
                if (this.ruleForm.change) {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.$http.post(('user/save'),JSON.stringify({
                                userName:this.ruleForm.username,
                                emailAddress:this.ruleForm.email,
                                inheritMode: "true",
                                loginName:this.ruleForm.login_name,
                                mobileNumber:this.ruleForm.mobile_number,
                                modifyPassword:this.ruleForm.user_password,
                                modifyPassword1:this.ruleForm.repeat_password,
                                showIndex: this.ruleForm.order,
                                state: this.ruleForm.user_status,
                                orgIds:this.ruleForm.orgIds
                            })).then(response => {
                                console.log(response.body);
                                if (response.body.status===200){
                                    this.dialogFormModifyInformationVisible = false;
                                    this.$message({
                                        message:'新增成功！',
                                        type:'success'
                                    });
                                    this.getUserList();
                                }else if (response.body.status ===500) {
                                    console.log(response.body);
                                    this.ruleForm.errorMsg = response.body.message;
                                    this.$message({
                                        message:this.ruleForm.errorMsg,
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
            },
            handleNodeClick(data){
                this.params.orgId=data.uuid;
                this.getUserList();
            },
            handleNodeAddUser(data) {

                this.ruleForm.department=data.label;
                console.log(this.ruleForm.department);
                this.$refs.mySelect.handleClose();//设置选中后自动收起
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleSizeChange(val) {
                this.params.size= `${val}`;
                this.getUserList();
                console.log(this.params.size);
            },
            handleCurrentChange(val) {
                this.params.page = `${val}`;
                this.getUserList();
                console.log(`当前页: ${val}`);
            },
            indexMethods(index) {
                return (this.params.page - 1) * this.params.size + index + 1;
            },
        }
    }
</script>

<style scoped lang="scss">
    .user-management-page{
        overflow: hidden;
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        /*min-width: 863px;*/
        /*background-color: #ffee80*/
    }
</style>