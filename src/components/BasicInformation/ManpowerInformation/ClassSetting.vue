<template>
    <div class="class-setting-page">
        <div class="container2" v-show="isShow2">
            <div class="editForm">
                添加班别
            </div>
            <div class="tableForm">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
                    <el-form-item label="班别编号：" prop="classNumber" style="margin-bottom: 15px;" >
                        <!--                                prop的值要与 v-model的值相同-->
                        <el-input v-model="ruleForm.code" placeholder="长度不能超过50"></el-input>
                    </el-form-item>

                    <el-form-item label="班别名称：" prop="className" style="margin-bottom: 15px;">
                        <el-input v-model="ruleForm.name" placeholder="长度不能超过100"></el-input>
                    </el-form-item>
                    <el-form-item label="班别类型：" prop="classType" style="margin-bottom: 15px;">
                        <el-select v-model="ruleForm.category"  placeholder="请选择班别类型">
                            <el-option
                                    v-for="(item,index) in shiftCategory"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div class="timeTable">
                        <div style="display: flex;flex: 1;width: 100%;">
                            <el-row style="flex:0.425;line-height:40px;"></el-row>
                            <el-row style="flex:1;line-height:40px;padding-right: 15px;">上班</el-row>
                            <el-row style="flex:1;line-height:40px;">下班</el-row>
                            <el-row style="flex:0.5;line-height:40px;">休息累计(分钟)</el-row>
                            <el-row style="flex:1;line-height:40px;">工时类型</el-row>
                            <el-row style="flex:1;line-height:40px;">有效工时(小时)</el-row>
                        </div>
                        <div style="flex: 1;display: flex;">
                            <el-row style="flex:0.425;line-height:40px;">
                                时间1：
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input type="text" v-model="ruleForm.onTime1" style="width: 90%"></el-input>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input type="text" v-model="ruleForm.offTime1" style="width: 90%"></el-input>
                            </el-row>
                            <el-row style="flex:0.5;line-height:40px;">
                                <el-input type="text" v-model="ruleForm.restTime1" style="width: 85%"></el-input>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-select v-model="ruleForm.timeCategory1"  placeholder="请选择班别类型" style="width: 90%">
                                    <el-option
                                            v-for="(item,index) in timeCategory"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input :disabled="true" type="text" v-model="ruleForm.effectiveTime1" style="width: 40%"></el-input>
                            </el-row>
                        </div>
                        <div style="flex: 1;display: flex;">
                            <el-row style="flex:0.425;line-height:40px;">时间2：</el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input type="text" v-model="ruleForm.onTime2" style="width: 90%"></el-input>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input type="text" v-model="ruleForm.offTime2" style="width: 90%"></el-input>
                            </el-row>
                            <el-row style="flex:0.5;line-height:40px;">
                                <el-input type="text" v-model="ruleForm.restTime2" style="width: 85%"></el-input>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-select v-model="ruleForm.timeCategory2"  placeholder="请选择班别类型" style="width: 90%">
                                    <el-option
                                            v-for="(item,index) in timeCategory"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input :disabled="true" type="text" v-model="ruleForm.effectiveTime2" style="width: 40%"></el-input>
                            </el-row>
                        </div>
                        <div style="flex: 1;display: flex;">
                            <el-row style="flex:0.425;line-height:40px;">时间3：</el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input type="text" v-model="ruleForm.onTime3" style="width: 90%"></el-input>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input type="text" v-model="ruleForm.offTime3" style="width: 90%"></el-input>
                            </el-row>
                            <el-row style="flex:0.5;line-height:40px;">
                                <el-input type="text" v-model="ruleForm.restTime3" style="width: 85%"></el-input>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-select v-model="ruleForm.timeCategory3"  placeholder="请选择班别类型" style="width: 90%">
                                    <el-option
                                            v-for="(item,index) in timeCategory"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input :disabled="true" type="text" v-model="ruleForm.effectiveTime3" style="width: 40%"></el-input>
                            </el-row>
                        </div>
                        <div style="flex: 1;display: flex;">
                            <el-row style="flex:0.425;line-height:40px;">时间4：</el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input type="text" v-model="ruleForm.onTime4" style="width: 90%"></el-input>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input type="text" v-model="ruleForm.offTime4" style="width: 90%"></el-input>
                            </el-row>
                            <el-row style="flex:0.5;line-height:40px;">
                                <el-input type="text" v-model="ruleForm.restTime4" style="width: 85%"></el-input>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-select v-model="ruleForm.timeCategory4"  placeholder="请选择班别类型" style="width: 90%">
                                    <el-option
                                            v-for="(item,index) in timeCategory"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input :disabled="true" type="text" v-model="ruleForm.effectiveTime4" style="width: 40%"></el-input>
                            </el-row>
                        </div>
                    </div>
                    <el-form-item label="有效否："  prop="Effectiveness"  style="margin-bottom: 25px;">
                        <el-radio-group v-model="ruleForm.Effectiveness">
                            <el-radio label="有效"></el-radio>
                            <el-radio label="无效"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="描述：" style="margin-bottom: 25px;">
                        <el-input v-model="ruleForm.description" type="textarea"  placeholder="请输入描述（200个字符以内）"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="addClassSubmit('ruleForm')">确 定</el-button>
                    <el-button @click="cancel('ruleForm')">返 回</el-button>
                </div>
            </div>
        </div>
        <div class="container" v-show="isShow">
            <el-button type="text" style="margin-top: 12px" @click="addClassSetting">
                <i class="el-icon-plus"></i>
                新增
            </el-button>
            <el-button type="text" style="margin-left:0;margin-top: 12px">
                <i class="el-icon-edit"></i>
                修改
            </el-button>
            <el-button type="text" style="margin-top: 12px">
                <i class="el-icon-delete"></i>
                删除
            </el-button>
        </div>
        <div class="container-table"  v-show="isShow">
            <el-table
                    @selection-change="handleSelectionChange"
                    :empty-text="dataText"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.08)"
                    :data="shiftData"
                    style="width: 100%;height: 83%; overflow: scroll">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        label="行号"
                        type="index"
                        :index="indexMethod">
                </el-table-column>

                <el-table-column
                        label="班别代码"
                >
                    <template slot-scope="scope">

                        <el-tooltip popper-class="atooltip" :content="scope.row.code" placement="bottom">
                            <p>{{ scope.row.code }}</p>
                            <el-button @click="handleClick(scope.row)" type="text" size="small">{{ scope.row.code }}</el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        label="班别名称">
                    <template slot-scope="scope">
                        <el-tooltip popper-class="atooltip" :content="scope.row.name" placement="bottom">
                            <p>{{ scope.row.name }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.name }}</el-tag>
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        label="班别类型">
                    <template slot-scope="scope">
                        <el-tooltip popper-class="atooltip" :content="scope.row.categoryName" placement="bottom">
                            <p>{{ scope.row.categoryName }}</p>
                            <div slot="reference" class="naonTime1me-wrapper">
                                <el-tag size="medium">{{ scope.row.categoryName }}</el-tag>
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        label="上班1">
                    <template slot-scope="scope">
                        <el-tooltip popper-class="atooltip" :content="scope.row.onTime1" placement="bottom">
                            <p>{{ scope.row.onTime1 }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.onTime1 }}</el-tag>
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>onTime2
                <el-table-column
                        label="下班1">
                    <template slot-scope="scope">
                        <el-tooltip popper-class="atooltip" :content="scope.row.offTime1" placement="bottom">
                            <p>{{ scope.row.offTime1 }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.offTime1 }}</el-tag>
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        label="上班2">
                    <template slot-scope="scope">
                        <el-tooltip popper-class="atooltip" :content="scope.row.onTime2" placement="bottom">
                            <p>{{ scope.row.onTime2 }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.onTime2 }}</el-tag>
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>offTime2
                <el-table-column
                        label="下班2">
                    <template slot-scope="scope">
                        <el-tooltip popper-class="atooltip" :content="scope.row.offTime2" placement="bottom">
                            <p>{{ scope.row.offTime2 }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.offTime2 }}</el-tag>
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        label="上班3">
                    <template slot-scope="scope">
                        <el-tooltip popper-class="atooltip" :content="scope.row.onTime3" placement="bottom">
                            <p>{{ scope.row.onTime3 }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.onTime3 }}</el-tag>
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>offTime3
                <el-table-column
                        label="下班3">
                    <template slot-scope="scope">
                        <el-tooltip popper-class="atooltip" :content="scope.row.offTime3" placement="bottom">
                            <p>{{ scope.row.offTime3 }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.offTime3 }}</el-tag>
                            </div>onTime4
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        label="上班4">
                    <template slot-scope="scope">
                        <el-tooltip popper-class="atooltip" :content="scope.row.onTime4" placement="bottom">
                            <p>{{ scope.row.onTime4 }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.onTime4 }}</el-tag>
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        label="下班4">
                    <template slot-scope="scope">
                        <el-tooltip popper-class="atooltip" :content="scope.row.offTime4" placement="bottom">
                            <p>{{ scope.row.offTime4 }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.offTime4 }}</el-tag>
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        label="有效">
                    <template slot-scope="scope">
                        <el-tooltip popper-class="atooltip" :content="scope.row.Effectiveness" placement="bottom">
                            <p>{{ scope.row.Effectiveness }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.Effectiveness }}</el-tag>
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                        label="描述">
                    <template slot-scope="scope">
                        <el-tooltip popper-class="atooltip" :content="scope.row.description" placement="bottom">
                            <p>{{ scope.row.description }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.description }}</el-tag>
                            </div>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block"
                 style="position:relative;
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
        </div>
    </div>
</template>

<script>
    export default {
        name: "CustomerInformation",
        data() {
            return {
                isShow2:false,
                isShow:true,
                total: null,
                totalPage: null,
                shiftCategory:[],
                timeCategory:[],
                dataText: '',
                shiftData: [],
                loading: true,
                multipleSelection: [],
                arrSelects: [],
                ruleForm:{
                    name: "",
                    category: '',
                    code: "",
                    description: "",
                    effectiveTime1: 24,
                    effectiveTime2: "5",
                    effectiveTime3: 2,
                    effectiveTime4: 7,
                    enabled: "true",
                    onTime1: "08:00:00",
                    onTime2: "00:00:00",
                    onTime3: "00:00:00",
                    onTime4: "00:00:00",
                    offTime1: "07:59:59",
                    offTime2: "00:00:00",
                    offTime3: "00:00:00",
                    offTime4: "00:00:00",
                    restTime1: "10",
                    restTime2: "100",
                    restTime3: "10",
                    restTime4: "10",
                    shiftId: "",
                    timeCategory1: "",
                    timeCategory2: "",
                    timeCategory3: "",
                    timeCategory4: "",

                },
                rules: {
                    // 定义是否必填项
                    classNumber: [
                        { required: true, message: '请输入班别编号', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                    ],
                    className: [
                        { required: true, message: '请输入班别名称', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
                    ],
                    classType: [
                        { required: true, message: '请选择班别类型', trigger: 'blur' },
                    ],
                    enabled:[
                        { required: true, message: '请选择班别类型', trigger: 'blur' },
                    ]

                },
                params: {
                    size: 10,
                    page: 1,
                    search: '',
                },
            }
        },
        created() {
            this.getBaseShiftList();
            this.addDetails();
        },
        methods: {
            addClassSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            cancel(formName){
                console.log(this.ruleForm.category);
                console.log(this.ruleForm.enabled);
                this.ruleForm.code = null;
                this.ruleForm.name = null;
                this.isShow =!this.isShow;
                this.isShow2 =!this.isShow2;
                this.$refs[formName].resetFields();
            },
            addClassSetting(){
                //点击新增按钮默认选中正常班
              this.ruleForm.category = '10000205';
                //点击新增按钮默认选中有效
                this.ruleForm.Effectiveness= '有效';
              this.isShow =!this.isShow;
              this.isShow2 =!this.isShow2;
            },
            changeStatus2(){
                this.isShow =!this.isShow;
                this.isShow2 =!this.isShow2;
            },
            getBaseShiftList() {
                this.dataText = ' ';
                this.$http.get('base/baseShift/list',
                    {
                        params: {
                            'size': this.params.size,
                            'page': this.params.page,
                            'search': this.params.search
                        }
                    }).then(result => {
                    if (result.status === 200) {
                        let tableData = result.body.result.data;
                        tableData.forEach(item=>{
                           if (item.enabled){
                               this.$set(item, 'Effectiveness', '有效')
                           }else {
                               this.$set(item, 'Effectiveness', '无效')
                           }
                        });
                        this.shiftData = tableData
                        this.total = result.body.result.totalCount;
                        this.totalPage = result.body.result.totalPage;
                        if (this.shiftData.length !== 0) {
                            this.loading = false;
                        }
                    } else if (this.ExceptionLog.length === 0) {
                        this.dataText = "暂无数据";
                    }
                })
            },
            addDetails(){
                this.$http.get('base/baseShift/addDetails').then(response=>{
                    if(response.body.status === 200){
                        this.shiftCategory = response.body.result.shiftCategory;
                        this.timeCategory = response.body.result.timeCategory;
                        this.ruleForm.timeCategory1 = this.ruleForm.timeCategory2 = this.ruleForm.timeCategory3= this.ruleForm.timeCategory4 = this.timeCategory[1].id;
                        console.log(this.shiftCategory)
                    }
             })
            },
            handleNodeClick(data) {
                console.log(data);
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            handleSizeChange(val) {
                this.params.size = `${val}`;
                this.getSysDebugLogList();
                console.log(this.params.size);
            },
            handleCurrentChange(val) {
                this.params.page = `${val}`;
                this.getSysDebugLogList();
                console.log(`当前页: ${val}`);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                let array = this.multipleSelection;
                let arrSelect = [];
                for (var i = 0; i < array.length; i++) {
                    let arr = array[i].id;
                    // console.log(arr);
                    arrSelect.push(arr);
                }
                this.arrSelects = arrSelect;
            },
            indexMethod(index) {
                return (this.params.page - 1) * this.params.size + index + 1;
            },
        }
    }
</script>

<style scoped lang="scss">
    .class-setting-page {
        position: relative;
        width: 100%;
        height: 100%;
        padding-right: 10px;
        .container{
            position: relative;
            width: 100%;
            height: 60px;
            line-height: 40px;
            padding-left: 10px;

        }
        .container-table{
            position: relative;
            width: 100%;
        }
        .container2 {
            position: relative;
            width: 100%;
            height: 100%;

            .editForm{
                position: relative;
                width: 100%;
                height: 50px;
                line-height: 50px;
                padding-left: 10px;
                border-bottom: 1px solid #c6c6c6;
            }
            .tableForm{
                position: relative;
                width: 100%;
                height: 75%;
                padding-left: 100px;
                padding-bottom: 50px;
                padding-top: 30px;
               overflow-y: scroll;
                .timeTable{
                    padding-left: 15px;
                    width: 80%;
                    min-width: 950px;
                    height: 200px;
                    margin-bottom: 15px;
                    /*background-color: #ddf0ff;*/
                    display: flex;
                    flex-direction:column
                }
            }
        }
    }
</style>