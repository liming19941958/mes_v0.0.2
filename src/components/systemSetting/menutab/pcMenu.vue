<template>
    <div class="pcMenu">
        <div class="pcMenu-table">
            <div class="headerBar">
                <el-button type="primary">新增</el-button>
            </div>
            <div class="tableBar">
                <el-table
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.08)"
                        :empty-text="dataText"
                        :data="tableData"
                        :header-cell-style="{
                            'color': '#303133',
                            'font-weight': '800',
                            'font-size': '16px',
                            'line-height': '10px',
                            'text-align': 'center',
                            }"
                        :indent="20"
                        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                        max-height="750"
                        ref="table"
                        row-key="id"
                        style="width: 100%;">
                    <el-table-column
                            label="菜单名称"
                            prop="menuName"
                            width="350"
                    >
                    </el-table-column>
                    <el-table-column
                            label="菜单地址"
                            prop="menuLink"
                            width="350">
                    </el-table-column>
                    <el-table-column
                            label="模块列表"
                            prop="modulesMaps">
                        <template slot-scope="scope">
                            <span :key="index"
                                  v-for="(item,index) in Object.keys(scope.row.modulesMaps)">
                                <el-tooltip popper-class="atooltip"
                                            :content="scope.row.modulesMaps[item]+''"
                                            placement="bottom">
                                    <span style="color: #1890ff;">{{item}}</span>
                                    </el-tooltip>
                                    <span v-if="Object.keys(scope.row.modulesMaps).length>1 && index<(Object.keys(scope.row.modulesMaps).length -1)"
                                          style="font-size: 14px; display:inline-block; color: #d4d4d4;margin: 0 8px 8px 8px">
                                        |
                                    </span>
                            </span>

                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button
                                    style="text-align: center; color: #1890ff;font-size: 15px"
                                    size="mini"
                                    @click="handleAdd(scope.$index, scope.row)" title="添加子菜单"><i
                                    class="el-icon-plus"></i></el-button>
                            <el-button
                                    style="text-align: center;color: #1890ff;font-size: 15px"
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)" title="修改"><i class="el-icon-edit"></i>
                            </el-button>
                            <el-button
                                    style="text-align: center;color: #1890ff;font-size: 15px"
                                    size="mini"
                                    @click="handleDelete(scope.$index, scope.row)" title="删除"><i
                                    class="el-icon-delete"></i></el-button>
                        </template>
                    </el-table-column>

                </el-table>
                <!--                    修改子菜单/添加子菜单（dialog不能放在el-table标签里面）-->
                <el-dialog width="780px!important" :title="ruleForm.title"  :visible.sync="dialogFormEditInformationVisible">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                        <el-form-item label="父级菜单：" style="margin-bottom: 15px;">
                            <!--                                prop的值要与 v-model的值相同-->
                            <el-input :disabled="true" v-model="ruleForm.parentMenu" style="width: 126%!important;"></el-input>
                        </el-form-item>

                        <el-form-item label="菜单名称：" prop="menuName" style="margin-bottom: 15px;">
                            <el-input v-model="ruleForm.menuName" placeholder="请输入菜单名称" style="width: 125%!important;"></el-input>
                        </el-form-item>
                        <el-form-item label="采单地址："  prop="menuAddress" style="margin-bottom: 15px;">
                            <el-input v-model="ruleForm.menuAddress" placeholder="请输入菜单地址" style="width: 125%!important;"></el-input>
                        </el-form-item>
                        <el-form-item label="图标地址：" style="margin-bottom: 15px;">
                            <el-input v-model="ruleForm.iconAddress" placeholder="请输入图标地址" style="width: 125%!important;"></el-input>
                        </el-form-item>
                        <el-form-item label="显示顺序：" prop="order" style="margin-bottom: 15px;width: 125%;">
                            <el-input
                                    placeholder="请输入显示顺序"
                                    v-model="ruleForm.order"
                                    >
                            </el-input>
                        </el-form-item>
                        <el-form-item label="显示状态：" prop="displayStatus" style="margin-bottom: 15px;">
                            <el-select v-model="ruleForm.displayStatus" placeholder="请选择显示状态" style="width: 125%!important;">
                                <el-option label="显示" value="1"></el-option>
                                <el-option label="隐藏" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="模块：" style="margin-bottom: 15px;width: 25%;">
                            <div class="add-moudles">
                                <div v-for="(items,index) in moduleList" :key="index" style="display: flex">
                                   <span style="flex: 1;">{{items.name}}</span>
                                    <span style="flex: 1;text-align: center">{{items.apiAddress[0].api}}</span>
                                    <span style="flex: 1;text-align: right">
                                        <i class="el-icon-circle-close" style="margin-right: 10px;cursor:pointer;font-size:18px;color:#0f97ff;display: inline-block" @click="deleteModule(index)"></i>
                                        <i class="el-icon-edit" style="cursor:pointer;font-size:18px;color:#0f97ff;display: inline-block" @click="editModule(index,items)"></i>
                                    </span>

                                </div>
                                <div class="addChild" @click="addmodule">
                                    <i class="el-icon-circle-plus-outline" style="margin-right: 10px"></i>
                                    <span >添加子集</span>
                                </div>
                            </div>
                        </el-form-item>


                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="cancelDialogParent">取 消</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                    </div>
                </el-dialog>
                <el-dialog width="650px!important" :title="ruleForm.title" :visible.sync="dialogFormAddVisible">
                    <el-form :model="moduleForm" :rules="rules" ref="moduleForm" label-width="100px" class="demo-moduleForm" >
                        <el-form-item label="模块名称：" prop="name" style="margin-bottom: 15px;">
                            <el-input v-model="moduleForm.name" placeholder="请输入菜单名称" style="width: 125%!important;"></el-input>
                        </el-form-item>
                        <el-form-item label="API地址："  prop="apiAddress" style="margin-bottom: 15px;width: 25%;">
                            <div class="add-moudles">
                                <div v-for="(item,index) in moduleForm.apiAddress " :key="index">
                                    <el-input v-model="item.api" placeholder="请输入内容"  style="width: 92%;margin: 0 10px 15px 0;display: inline-block"></el-input>
                                    <i class="el-icon-circle-close" style="cursor:pointer;font-size:18px;color:#0f97ff;display: inline-block" @click="deleteapi(index)"></i>
                                </div>
                                <div class="addChild" @click="addapi">
                                    <i class="el-icon-circle-plus-outline" style="margin-right: 10px;"></i>
                                    <span>添加子集</span>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="cancelDialog">取 消</el-button>
                        <el-button type="primary" @click="submit('moduleForm')">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pcMenu",
        data() {
            return {
                loading: true,
                addOrEdit:true,
                dataText: '',
                url:[],
                tableData: [],
                moduleList:[],
                index:'',
                row:'',
                dialogFormAddVisible:false,
                dialogFormEditInformationVisible:false,
                defaultProps: {
                    children: 'Subdirectory',
                    label: 'name'
                },
                moduleForm:{
                    name:'',
                    apiAddressInput:'',
                    apiAddress:[]
                },
                ruleForm:{
                    id:'',
                    title:'添加模块',
                    parentMenu:'',
                    menuName:'',
                    menuAddress:'',
                    iconAddress:'',
                    modulesMaps:{},
                    parentId:'',
                    displayStatus:'1',
                    order:'',
                    Module:''
                },
                rules: {
                    // 定义是否必填项
                    menuName: [
                        { required: true, message: '请输入菜单名称', trigger: 'blur' },
                    ],
                    menuAddress: [
                        { required: true, message: '请输入菜单地址', trigger: 'blur' },
                    ],
                    displayStatus: [
                        { required: true, message: '请输入显示状态', trigger: 'blur' },
                    ],
                    order: [
                        { required: true, message: '请输入显示顺序', trigger: 'blur' },
                    ],
                    name:[
                        { required: true, message: '请输入模块名称', trigger: 'blur' },
                    ],
                    apiAddress:[
                        { required: true, message: '请输入API地址', trigger: 'blur' },
                    ],
                },
                page: 1,
                size: 40,
            }
        },
        created() {
            this.getMenuList();
        },
        methods: {
            addapi(){
                var n = {api:''};
                this.moduleForm.apiAddress.push(n);
                // console.log(this.moduleForm.apiAddress);
            },
            deleteapi(index){
                if (index >0){
                    this.$delete(this.moduleForm.apiAddress,index)
                }else{
                    this.moduleForm.apiAddress[index].api = ' ';

                }

               console.log(index)
            },
            cancelDialog(){
                this.moduleForm.name = ' ';
                this.moduleForm.apiAddress = [];
                this.dialogFormAddVisible = false;
            },
            submit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let obj = {};
                        obj['name']= this.moduleForm.name;
                        obj['apiAddress']= this.moduleForm.apiAddress;
                        if (this.addOrEdit){
                            this.moduleList.push(obj);
                            this.moduleForm.name = ' ';
                            this.moduleForm.apiAddress = [];
                        }else{
                            this.moduleForm.name = ' ';
                            this.moduleForm.apiAddress = [];
                        }
                        this.dialogFormAddVisible = false;
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            addmodule(){
                this.addOrEdit = true;
                if (this.addOrEdit){
                    this.moduleForm.apiAddress = [];
                    var n = {api:''};
                    this.moduleForm.apiAddress.push(n);
                    this.dialogFormAddVisible = true;
                }
            },
            deleteModule(index){
                this.$delete(this.moduleList,index)
                console.log(this.moduleList);
            },
            editModule(index,items){
                this.addOrEdit = false;
                if (!this.addOrEdit){
                    this.ruleForm.title = '修改模块';
                    this.moduleForm.name = items.name;
                    this.moduleForm.apiAddress = items.apiAddress;
                    this.dialogFormAddVisible = true;
                    console.log(index,items)
                }

            },
            submitForm(formName){
                let moduleMap = this.moduleList;
                console.log(moduleMap)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(moduleMap)
                        let obj = {};
                        moduleMap.forEach(item=>{
                            let arrApi = [];
                            item.apiAddress.forEach(apis=>{
                                arrApi.push(apis.api);
                            })
                            obj[item.name] = arrApi;
                        });
                        console.log(obj);
                        let state = '';
                        if (this.ruleForm.displayStatus ===1) {
                            state = true;
                        }else{
                            state = false;
                        }
                        this.$http.post(this.url,JSON.stringify({
                            id:this.ruleForm.id,
                            menuIcon:this.ruleForm.iconAddress,
                            menuLink:this.ruleForm.menuAddress,
                            menuName:this.ruleForm.menuName,
                            modulesMaps:obj,
                            parentId:this.ruleForm.parentId,
                            showIndex:this.ruleForm.order + 1,
                            state:state,
                        })).then(response=>{
                            if (response.body.status === 200){
                                this.getMenuList();
                                this.dialogFormEditInformationVisible = false;
                                this.$message({
                                    type:"success",
                                    message:"操作成功！"
                                })
                            }else{
                                this.dialogFormEditInformationVisible = false;
                                this.$message({
                                    type:"error",
                                    message: response.body.result,
                                })
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            cancelDialogParent(){
                this.moduleList = [];
                this.ruleForm.menuName = '';
                this.ruleForm.menuAddress = '';
                this.ruleForm.iconAddress = '';
                this.ruleForm.displayStatus = '1';
                this.dialogFormEditInformationVisible = false
            },
            getMenuList() {
                this.dataText = ' ';
                this.$http.get('menu/getMenuList', {
                    params: {
                        page: this.page,
                        size: this.size
                    }
                }).then(response => {
                    if (response.body.status === 200) {
                        this.tableData = response.body.result.data;
                        if (this.tableData.length > 0) {
                            this.loading = false;
                        } else {
                            this.dataText = '';
                            this.loading = false;
                        }
                        // console.log(this.tableData)
                    }
                })
            },
            handleAdd(index,row){
                this.url = 'menu/save';
                this.index = index;
                this.row = row;
                this.moduleList = [];
                // console.log(index,row)
                this.dialogFormEditInformationVisible = true;
                this.ruleForm.order = index;
                this.ruleForm.title = '新增';
                this.ruleForm.parentMenu = row.menuName
            },
            handleEdit(index,row){
                this.url = 'menu/update'
                this.moduleList = [];
                this.ruleForm.title = '修改';
                this.ruleForm.id = row.id;
                this.ruleForm.parentId = row.parentId;
                this.ruleForm.order = index;
                this.ruleForm.menuName = row.menuName;
                this.ruleForm.menuAddress = row.menuLink;
                let keys = Object.keys(row.modulesMaps);
                // console.log(row)
                keys.forEach(item=>{
                    let obj = {};
                    let apiAddress = [];
                    if (row.modulesMaps[item].length>0){
                        row.modulesMaps[item].forEach(item1=>{
                            let n = {api:''};
                            n['api'] = item1;
                            apiAddress.push(n);
                        });
                        obj['name'] = item;
                        obj['apiAddress'] = apiAddress;
                        this.moduleList.push(obj)
                    }else{
                        let n = {api:''};
                        n['api'] = ' ';
                        apiAddress.push(n);
                        obj['name'] = item;
                        obj['apiAddress'] = apiAddress;
                        this.moduleList.push(obj)
                    }
                });
                this.dialogFormEditInformationVisible = true;
                if (row.parentId === null){
                    this.ruleForm.parentMenu = '顶级菜单';
                }else{
                    let data = this.tableData;
                    let parentId = row.parentId;
                    this.findNode(data,parentId);
                }
            },
            findNode(data,parentId){
                data.forEach(item=>{
                    if (item.id === parentId){
                        this.ruleForm.parentMenu = item.menuName;
                    }
                    if (item.children && item.children.length >0){
                        this.findNode(item.children,parentId)
                    }else{
                        if (item.id === parentId){
                            this.ruleForm.parentMenu = item.menuName;
                        }
                    }

                })
            },
            handleDelete(index, row) {
                this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get('menu/delete',{
                        params:{
                            id:row.id,
                        }
                    }).then(respons=>{
                        if (respons.body.status ===200){
                            this.getUserList();
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }else{
                            this.$message({
                                type: 'warning',
                                message:respons.body.message
                            });
                        }

                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                console.log(index, row);
            },
        }
    }
</script>

<style scoped lang="scss">

    .pcMenu {
        position: relative;
        width: 100%;
        height: 100%;

        .pcMenu-table {
            position: relative;
            height: 96vh;
            width: 100%;
            padding-bottom: 80px;
            overflow: scroll;

            .headerBar {
                position: relative;
                width: 100%;
                height: 60px;
                padding: 15px 0 0 25px;
                border-bottom: 2px solid #e6e6e6;
            }

           .add-moudles{
               margin-bottom: 12px;
               position: relative;
               min-width: 70px;
               width: 500%;
               min-height: 80px;
               padding:25px;
               border: 1px solid #dbdbdb;
               .addChild{
                   cursor: pointer;
                   width: 100%;
                   text-align: center;
                   line-height: 32px;
                   height: 32px;
                   color:#328fff;
                   transition: all 0.6s ease;
                   border-radius: 3px;
                   border: 1px  dashed #cdcdcd;
               }
               .addChild:hover{
                   border-radius: 3px;
                   transition: all 0.6s ease;
                   border: 1px  dashed #328fff;
               }

           }
            /*设置表头文字居中*/
            /*::v-deep .el-table th {*/
            /*    padding: 8px 0;*/
            /*}*/
            /*设置表格单元格内容左对齐*/
            /*.el-table ::v-deep td {*/
            /*    text-align: left;*/
            /*    padding-left: 50px;*/
            /*    min-width: 67px;*/
            /*}*/

            //有子节点 且未展开
            .el-table ::v-deep .el-icon-arrow-right:before {
                content: '+';
                display: inline-block;
                margin-right: 3px;
                width: 16px;
                height: 16px;
                line-height: 12px;
                font-size: 16px;
                border: 1px solid #999999;
            }

            //有子节点 且已展开
            .el-table ::v-deep .el-table__expand-icon--expanded {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);

                .el-icon-arrow-right:before {
                    content: '-';
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    margin-right: 3px;
                    line-height: 10px;
                    font-size: 18px;
                    border: 1px solid #999999;
                }
            }
        }
    }
</style>
