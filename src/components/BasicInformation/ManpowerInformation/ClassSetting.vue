<template>
    <div class="class-setting-page">
        <div class="container2" v-show="isShow2">
            <div class="editForm">
                {{tableTitle}}
            </div>
            <div class="tableForm">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="班别编号：" prop="code" style="margin-bottom: 15px;">
                        <!--                                prop的值要与 v-model的值相同-->
                        <el-input :disabled="isDisable" v-model="ruleForm.code" placeholder="长度不能超过50"></el-input>
                    </el-form-item>

                    <el-form-item label="班别名称：" prop="name" style="margin-bottom: 15px;">
                        <el-input :disabled="isDisable" v-model="ruleForm.name" placeholder="长度不能超过100"></el-input>
                    </el-form-item>
                    <el-form-item label="班别类型：" prop="category" style="margin-bottom: 15px;">
                        <el-select :disabled="isDisable" v-model="ruleForm.category" placeholder="请选择班别类型">
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
                                <el-input :disabled="isDisable"
                                          type="text"
                                          v-model="ruleForm.onTime1"
                                          style="width: 90%"
                                          @input="inputChange">
                                </el-input>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input :disabled="isDisable"
                                          type="text"
                                          v-model="ruleForm.offTime1"
                                          style="width: 90%"
                                          @input="inputChange">
                                </el-input>
                            </el-row>
                            <el-row style="flex:0.5;line-height:40px;">
                                <el-input :disabled="isDisable"
                                          type="text"
                                          v-model="ruleForm.restTime1"
                                          style="width: 85%"></el-input>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-select :disabled="isDisable" v-model="ruleForm.timeCategory1" placeholder="请选工时类型"
                                           style="width: 90%">
                                    <el-option
                                            v-for="(item,index) in timeCategory"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input :disabled="isEffectiveTimeDisable" type="text" v-model="ruleForm.effectiveTime1"
                                          style="width: 40%"></el-input>
                            </el-row>
                        </div>
                        <div style="flex: 1;display: flex;">
                            <el-row style="flex:0.425;line-height:40px;">时间2：</el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input :disabled="isDisable"
                                          type="text"
                                          v-model="ruleForm.onTime2"
                                          style="width: 90%"
                                          @input="inputChange">
                                </el-input>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input :disabled="isDisable"
                                          type="text"
                                          v-model="ruleForm.offTime2"
                                          style="width: 90%"
                                          @input="inputChange">
                                </el-input>
                            </el-row>
                            <el-row style="flex:0.5;line-height:40px;">
                                <el-input :disabled="isDisable"
                                          type="text" v-model="ruleForm.restTime2"
                                          style="width: 85%"></el-input>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-select :disabled="isDisable" v-model="ruleForm.timeCategory2" placeholder="请选择工时类型"
                                           style="width: 90%">
                                    <el-option
                                            v-for="(item,index) in timeCategory"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input :disabled="isEffectiveTimeDisable" type="text" v-model="ruleForm.effectiveTime2"
                                          style="width: 40%"></el-input>
                            </el-row>
                        </div>
                        <div style="flex: 1;display: flex;">
                            <el-row style="flex:0.425;line-height:40px;">时间3：</el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input :disabled="isDisable"
                                          type="text"
                                          v-model="ruleForm.onTime3"
                                          style="width: 90%"
                                          @input="inputChange">
                                </el-input>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input :disabled="isDisable"
                                          type="text"
                                          v-model="ruleForm.offTime3"
                                          style="width: 90%"
                                          @input="inputChange">
                                </el-input>
                            </el-row>
                            <el-row style="flex:0.5;line-height:40px;">
                                <el-input :disabled="isDisable" type="text" v-model="ruleForm.restTime3"
                                          style="width: 85%"></el-input>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-select :disabled="isDisable" v-model="ruleForm.timeCategory3" placeholder="请选择工时类型"
                                           style="width: 90%">
                                    <el-option
                                            v-for="(item,index) in timeCategory"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input :disabled="isEffectiveTimeDisable" type="text" v-model="ruleForm.effectiveTime3"
                                          style="width: 40%"></el-input>
                            </el-row>
                        </div>
                        <div style="flex: 1;display: flex;">
                            <el-row style="flex:0.425;line-height:40px;">时间4：</el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input :disabled="isDisable"
                                          type="text"
                                          v-model="ruleForm.onTime4"
                                          style="width: 90%"
                                          @input="inputChange">
                                </el-input>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input :disabled="isDisable"
                                          type="text"
                                          v-model="ruleForm.offTime4"
                                          style="width: 90%"
                                          @input="inputChange">
                                </el-input>
                            </el-row>
                            <el-row style="flex:0.5;line-height:40px;">
                                <el-input :disabled="isDisable" type="text" v-model="ruleForm.restTime4"
                                          style="width: 85%"></el-input>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-select :disabled="isDisable" v-model="ruleForm.timeCategory4" placeholder="请选择工时类型"
                                           style="width: 90%">
                                    <el-option
                                            v-for="(item,index) in timeCategory"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-row>
                            <el-row style="flex:1;line-height:40px;">
                                <el-input :disabled="isEffectiveTimeDisable"
                                          type="text"
                                          v-model="ruleForm.effectiveTime4"
                                          style="width: 40%">
                                </el-input>
                            </el-row>
                        </div>
                    </div>
                    <el-form-item label="有效否：" prop="enabled1" style="margin-bottom: 25px;">
                        <el-radio-group :disabled="isDisable" v-model="ruleForm.enabled1">
                            <el-radio label="有效"></el-radio>
                            <el-radio label="无效"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="描述：" style="margin-bottom: 25px;">
                        <el-input :disabled="isDisable" v-model="ruleForm.description" type="textarea"
                                  placeholder="请输入描述（200个字符以内）"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">

                    <el-button v-show="isShowEdit" type="primary" @click="editList">修 改</el-button>
                    <el-button v-show="isShowCopyAdd" type="primary" @click="copyAdd">复制添加</el-button>
                    <el-button v-show="isShowComfirm" type="primary" @click="addClassSubmit('ruleForm')">确定</el-button>
                    <el-button @click="cancel('ruleForm')">返 回</el-button>
                </div>
            </div>
        </div>
        <div class="container" v-show="isShow">
            <el-button type="text" style="margin-top: 12px" @click="addClassSetting">
                <i class="el-icon-plus"></i>
                新增
            </el-button>
            <el-button type="text" style="margin-left:0;margin-top: 12px" @click="editListBtn">
                <i class="el-icon-edit"></i>
                修改
            </el-button>
            <el-button type="text" style="margin-top: 12px" @click="deleteList">
                <i class="el-icon-delete"></i>
                删除
            </el-button>
        </div>
        <div class="container-table" v-show="isShow">
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
                            <el-button @click="handleClick(scope.row)" type="text" size="small">{{ scope.row.code }}
                            </el-button>
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
                </el-table-column>
                onTime2
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
                </el-table-column>
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
                </el-table-column>

                <el-table-column
                        label="下班3">
                    <template slot-scope="scope">
                        <el-tooltip popper-class="atooltip" :content="scope.row.offTime3" placement="bottom">
                            <p>{{ scope.row.offTime3 }}</p>
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.offTime3 }}</el-tag>
                            </div>

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
                url: '',
                selects: [],
                isShowComfirm: true,
                isShowCopyAdd: false,
                isShowEdit: false,
                isEffectiveTimeDisable:true,
                isDisable: true,
                isShow2: false,
                isShow: true,
                total: null,
                totalPage: null,
                shiftCategory: [],
                timeCategory: [],
                dataText: '',
                shiftData: [],
                loading: true,
                multipleSelection: [],
                arrSelects: [],
                tableTitle: '',
                ruleForm: {
                    name: "",
                    category: '',
                    code: "",
                    description: "",
                    effectiveTime1: 24,
                    effectiveTime2: "5",
                    effectiveTime3: 2,
                    effectiveTime4: 7,
                    enabled1: "有效",
                    enabled: null,
                    onTime1: null,
                    onTime2: null,
                    onTime3: null,
                    onTime4: null,
                    offTime1: null,
                    offTime2: null,
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
                    code: [
                        {required: true, message: '请输入班别编号', trigger: 'blur'},
                        {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '请输入班别名称', trigger: 'blur'},
                        {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
                    ],
                    category: [
                        {required: true, message: '请选择班别类型', trigger: 'blur'},
                    ],
                    enabled1: [
                        {required: true, message: '请选择班别类型', trigger: 'blur'},
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
            inputChange(){
                var onTime1 = this.makeDurationToSeconds(this.ruleForm.onTime1);
                var offTime1 = this.makeDurationToSeconds(this.ruleForm.offTime1);
                if (offTime1 > onTime1){
                    this.ruleForm.effectiveTime1 = (offTime1 - onTime1) / 3600;
                }else if (offTime1 === onTime1){
                    this.ruleForm.effectiveTime1 = 0;
                }else {
                    this.ruleForm.effectiveTime1 = (24*60*60 - onTime1 + offTime1) / 3600;
                }
                var onTime2 = this.makeDurationToSeconds(this.ruleForm.onTime2);
                var offTime2 = this.makeDurationToSeconds(this.ruleForm.offTime2);
                if (offTime2 > onTime2){
                    this.ruleForm.effectiveTime2 = (offTime2 - onTime2) / 3600;
                }else if (offTime2 === onTime2){
                    this.ruleForm.effectiveTime2 = 0;
                }else {
                    this.ruleForm.effectiveTime2 = (24*60*60 - onTime2 + offTime2) / 3600;
                }
                var onTime3 = this.makeDurationToSeconds(this.ruleForm.onTime3);
                var offTime3 = this.makeDurationToSeconds(this.ruleForm.offTime3)
                if (offTime3 > onTime3){
                    this.ruleForm.effectiveTime3 = (offTime3 - onTime3) / 3600;
                }else if (offTime3 === onTime3){
                    this.ruleForm.effectiveTime3 = 0;
                }else {
                    this.ruleForm.effectiveTime3 = (24 * 60 * 60 - onTime3 + offTime3) / 3600;
                }
                var onTime4 = this.makeDurationToSeconds(this.ruleForm.onTime4);
                var offTime4 = this.makeDurationToSeconds(this.ruleForm.offTime4);
                if (offTime4 > onTime4){
                    this.ruleForm.effectiveTime4 = (offTime4 - onTime4) / 3600;
                }else if (offTime4 === onTime4){
                    this.ruleForm.effectiveTime4 = 0;
                }else {
                    this.ruleForm.effectiveTime4 = (24 * 60 * 60 - onTime4 + offTime4) / 3600;
                }
            },
            addClassSubmit(formName) {
                if (this.ruleForm.enabled1 === '有效') {
                    this.ruleForm.enabled = true;
                } else {
                    this.ruleForm.enabled = false;
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post(this.url, JSON.stringify({
                            category: this.ruleForm.category,
                            code: this.ruleForm.code,
                            description: this.ruleForm.description,
                            effectiveTime1: this.ruleForm.effectiveTime1,
                            effectiveTime2: this.ruleForm.effectiveTime2,
                            effectiveTime3: this.ruleForm.effectiveTime3,
                            effectiveTime4: this.ruleForm.effectiveTime4,
                            enabled: this.ruleForm.enabled,
                            name: this.ruleForm.name,
                            offTime1: this.ruleForm.offTime1,
                            offTime2: this.ruleForm.offTime2,
                            offTime3: this.ruleForm.offTime3,
                            offTime4: this.ruleForm.offTime4,
                            onTime1: this.ruleForm.onTime1,
                            onTime2: this.ruleForm.onTime2,
                            onTime3: this.ruleForm.onTime3,
                            onTime4: this.ruleForm.onTime4,
                            restTime1: this.ruleForm.restTime1,
                            restTime2: this.ruleForm.restTime2,
                            restTime3: this.ruleForm.restTime3,
                            restTime4: this.ruleForm.restTime4,
                            shiftId: this.ruleForm.shiftId,
                            timeCategory1: this.ruleForm.timeCategory1,
                            timeCategory2: this.ruleForm.timeCategory2,
                            timeCategory3: this.ruleForm.timeCategory3,
                            timeCategory4: this.ruleForm.timeCategory4,
                        })).then(response => {
                            if (response.body.status === 200) {
                                this.getBaseShiftList();
                                this.$message({
                                    type: "success",
                                    message: "操作成功！"
                                });
                                this.ruleForm.description = null;
                                this.ruleForm.code = null;
                                this.ruleForm.name = null;
                                this.isShow = !this.isShow;
                                this.isShow2 = !this.isShow2;
                                this.$refs[formName].resetFields();

                            } else if (response.body.status === 500) {
                                this.$message({
                                    type: "error",
                                    message: response.body.message
                                })
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            editList() {
                this.url = 'base/baseShift/update'
                this.tableTitle = "修改班别";
                this.isDisable = false;
                this.isShowEdit = false;
                this.isShowCopyAdd = false;
                this.isShowComfirm = true;
            },
            editListBtn() {
                if (this.selects.length === 0) {
                    this.$message({
                        type: "warning",
                        message: "请选择一条要修改的数据！"
                    })
                } else if (this.selects.length > 1) {
                    this.$message({
                        type: "warning",
                        message: "只能选择一条！"
                    })
                } else if (this.selects.length === 1) {
                    this.url = 'base/baseShift/update'
                    this.isDisable = false;
                    this.isShow = !this.isShow;
                    this.isShow2 = !this.isShow2;
                    this.tableTitle = '修改班别';
                    this.ruleForm.category = this.selects[0].category;
                    this.ruleForm.code = this.selects[0].code;
                    this.ruleForm.description = this.selects[0].description;
                    // this.ruleForm.effectiveTime1 =;
                    // this.ruleForm.effectiveTime2 =;
                    // this.ruleForm.effectiveTime3 =;
                    // this.ruleForm.effectiveTime4 =;
                    this.ruleForm.enabled1 = this.selects[0].Effectiveness;
                    this.ruleForm.name = this.selects[0].name;
                    this.ruleForm.shiftId = this.selects[0].shiftId;
                    this.ruleForm.offTime1 = this.selects[0].offTime1;
                    this.ruleForm.offTime2 = this.selects[0].offTime2;
                    this.ruleForm.offTime3 = this.selects[0].offTime3;
                    this.ruleForm.offTime4 = this.selects[0].offTime4;
                    this.ruleForm.onTime1 = this.selects[0].onTime1;
                    this.ruleForm.onTime2 = this.selects[0].onTime2;
                    this.ruleForm.onTime3 = this.selects[0].onTime3;
                    this.ruleForm.onTime4 = this.selects[0].onTime4;
                    this.ruleForm.restTime1 = this.selects[0].restTime1;
                    this.ruleForm.restTime2 = this.selects[0].restTime2;
                    this.ruleForm.restTime3 = this.selects[0].restTime3;
                    this.ruleForm.restTime4 = this.selects[0].restTime4;
                    this.ruleForm.timeCategory1 = this.selects[0].timeCategory1;
                    this.ruleForm.timeCategory2 = this.selects[0].timeCategory2;
                    this.ruleForm.timeCategory3 = this.selects[0].timeCategory3;
                    this.ruleForm.timeCategory4 = this.selects[0].timeCategory4;
                }
            },
            copyAdd() {
                this.url = 'base/baseShift/save';
                this.tableTitle = "添加班别";
                this.isDisable = false;
                this.isShowEdit = false;
                this.isShowCopyAdd = false;
                this.isShowComfirm = true;
            },
            deleteList() {
                if (this.selects.length>0){
                    this.$confirm('确定删除?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.post('base/baseShift/delete',
                            JSON.stringify(this.arrSelects)
                        ).then(response => {
                            if (response.body.status === 200) {
                                this.getBaseShiftList();
                                this.$message({
                                    type: 'success',
                                    message: response.body.result
                                });
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: response.body.message
                                });
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }else {
                    this.$message({
                        type: 'warning',
                        message: '请选择要删除的数据!'
                    });
                }
            },
            handleClick(val) {//点击班别编号查看班别设定信息
                this.isShowComfirm = false;
                this.isShowCopyAdd = true;
                this.isDisable = true;
                this.isShowEdit = true;
                this.tableTitle = "查看班别";
                this.ruleForm.category = val.category;
                this.ruleForm.code = val.code;
                this.ruleForm.description = val.description;
                // this.ruleForm.effectiveTime1 =;
                // this.ruleForm.effectiveTime2 =;
                // this.ruleForm.effectiveTime3 =;
                // this.ruleForm.effectiveTime4 =;
                this.ruleForm.enabled1 = val.Effectiveness;
                this.ruleForm.name = val.name;
                this.ruleForm.shiftId = val.shiftId;
                this.ruleForm.offTime1 = val.offTime1;
                this.ruleForm.offTime2 = val.offTime2;
                this.ruleForm.offTime3 = val.offTime3;
                this.ruleForm.offTime4 = val.offTime4;
                this.ruleForm.onTime1 = val.onTime1;
                this.ruleForm.onTime2 = val.onTime2;
                this.ruleForm.onTime3 = val.onTime3;
                this.ruleForm.onTime4 = val.onTime4;
                this.ruleForm.restTime1 = val.restTime1;
                this.ruleForm.restTime2 = val.restTime2;
                this.ruleForm.restTime3 = val.restTime3;
                this.ruleForm.restTime4 = val.restTime4;
                this.ruleForm.timeCategory1 = val.timeCategory1;
                this.ruleForm.timeCategory2 = val.timeCategory2;
                this.ruleForm.timeCategory3 = val.timeCategory3;
                this.ruleForm.timeCategory4 = val.timeCategory4;
                this.isShow = !this.isShow;
                this.isShow2 = !this.isShow2;
            },
            cancel(formName) {
                this.isShowEdit = false;
                this.isShowCopyAdd = false;
                this.ruleForm.description = null;
                this.ruleForm.code = null;
                this.ruleForm.name = null;
                this.isShow = !this.isShow;
                this.isShow2 = !this.isShow2;
                this.$refs[formName].resetFields();
            },
            addClassSetting() {
                this.url = 'base/baseShift/save';
                this.isShowComfirm = true;
                this.isDisable = false;
                this.tableTitle = "添加班别";
                //点击新增按钮默认选中正常班
                this.ruleForm.category = '10000205';
                //点击新增按钮默认选中有效
                this.ruleForm.Effectiveness = '有效';
                this.ruleForm.onTime1 = "00:00:00";
                this.ruleForm.onTime2 = "00:00:00";
                this.ruleForm.onTime3 = "00:00:00";
                this.ruleForm.onTime4 = "00:00:00";
                this.ruleForm.offTime1 = "00:00:00";
                this.ruleForm.offTime2 = "00:00:00";
                this.ruleForm.offTime3 = "00:00:00";
                this.ruleForm.offTime4 = "00:00:00";
                this.ruleForm.restTime1 = 0;
                this.ruleForm.restTime2 = 0;
                this.ruleForm.restTime3 = 0;
                this.ruleForm.restTime4 = 0;
                this.ruleForm.timeCategory1 = this.timeCategory[1].id;
                this.ruleForm.timeCategory2 = this.timeCategory[1].id;
                this.ruleForm.timeCategory3 = this.timeCategory[1].id;
                this.ruleForm.timeCategory4 = this.timeCategory[1].id;
                var onTime1 = this.makeDurationToSeconds(this.ruleForm.onTime1);
                var offTime1 = this.makeDurationToSeconds(this.ruleForm.offTime1);
                if (offTime1 > onTime1){
                    this.ruleForm.effectiveTime1 = (offTime1 - onTime1) / 3600;
                }else if (offTime1 === onTime1){
                    this.ruleForm.effectiveTime1 = 0;
                }else {
                    this.ruleForm.effectiveTime1 = (24*60*60 - onTime1 + offTime1) / 3600;
                }
                var onTime2 = this.makeDurationToSeconds(this.ruleForm.onTime2);
                var offTime2 = this.makeDurationToSeconds(this.ruleForm.offTime2);
                if (offTime2 > onTime2){
                    this.ruleForm.effectiveTime1 = (offTime2 - onTime2) / 3600;
                }else if (offTime2 === onTime2){
                    this.ruleForm.effectiveTime2 = 0;
                }else {
                    this.ruleForm.effectiveTime2 = (24*60*60 - onTime2 + offTime2) / 3600;
                }
                var onTime3 = this.makeDurationToSeconds(this.ruleForm.onTime3);
                var offTime3 = this.makeDurationToSeconds(this.ruleForm.offTime3)
                if (offTime3 > onTime3){
                    this.ruleForm.effectiveTime3 = (offTime3 - onTime3) / 3600;
                }else if (offTime3 === onTime3){
                    this.ruleForm.effectiveTime3 = 0;
                }else {
                    this.ruleForm.effectiveTime3 = (24 * 60 * 60 - onTime3 + offTime3) / 3600;
                }
                var onTime4 = this.makeDurationToSeconds(this.ruleForm.onTime4);
                var offTime4 = this.makeDurationToSeconds(this.ruleForm.offTime4);
                if (offTime4 > onTime4){
                    this.ruleForm.effectiveTime4 = (offTime4 - onTime4) / 3600;
                }else if (offTime4 === onTime4){
                    this.ruleForm.effectiveTime4 = 0;
                }else {
                    this.ruleForm.effectiveTime4 = (24 * 60 * 60 - onTime4 + offTime4) / 3600;
                }
                this.isShow = !this.isShow;
                this.isShow2 = !this.isShow2;
            },
            makeDurationToSeconds(time){
                var str = time;
                var arr = str.split(':');
                var hs = parseInt(arr[0]*3600);
                var ms = parseInt(arr[1]*60);
                var ss = parseInt(arr[2]);
                var seconds = hs + ms + ss;
                return seconds;
            },
            changeStatus2() {
                this.isShow = !this.isShow;
                this.isShow2 = !this.isShow2;
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
                        tableData.forEach(item => {
                            if (item.enabled) {
                                this.$set(item, 'Effectiveness', '有效')
                            } else {
                                this.$set(item, 'Effectiveness', '无效')
                            }
                        });
                        this.shiftData = tableData;
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
            addDetails() {
                this.$http.get('base/baseShift/addDetails').then(response => {
                    if (response.body.status === 200) {
                        this.shiftCategory = response.body.result.shiftCategory;
                        this.timeCategory = response.body.result.timeCategory;
                        this.ruleForm.timeCategory1 = this.ruleForm.timeCategory2 = this.ruleForm.timeCategory3 = this.ruleForm.timeCategory4 = this.timeCategory[1].id;
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
                this.selects = val;
                this.multipleSelection = val;
                let array = this.multipleSelection;
                let arrSelect = [];
                for (var i = 0; i < array.length; i++) {
                    let arr = array[i].shiftId;
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

        .container {
            position: relative;
            width: 100%;
            height: 60px;
            line-height: 40px;
            padding-left: 10px;

        }

        .container-table {
            position: relative;
            width: 100%;
        }

        .container2 {
            position: relative;
            width: 100%;
            height: 100%;

            .editForm {
                position: relative;
                width: 100%;
                height: 50px;
                line-height: 50px;
                padding-left: 10px;
                border-bottom: 1px solid #c6c6c6;
            }

            .tableForm {
                position: relative;
                width: 100%;
                height: 75%;
                padding-left: 100px;
                padding-bottom: 50px;
                padding-top: 30px;
                overflow-y: scroll;

                .timeTable {
                    padding-left: 15px;
                    width: 80%;
                    min-width: 950px;
                    height: 200px;
                    margin-bottom: 15px;
                    /*background-color: #ddf0ff;*/
                    display: flex;
                    flex-direction: column
                }
            }
        }
    }
</style>