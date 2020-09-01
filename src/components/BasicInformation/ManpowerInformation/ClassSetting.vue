<template>
    <div class="class-setting-page">
        <addShift  v-show="isShow2" ></addShift>
        <div class="container" v-show="isShow">
            <el-button type="text" style="margin-top: 12px" @click="changeStatus">
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
    import addShift from './classSettingAdd/index'
    export default {
        name: "CustomerInformation",
        data() {
            return {
                isShow2:false,
                isShow:true,
                total: null,
                totalPage: null,
                dataText: '',
                shiftData: [],
                loading: true,
                multipleSelection: [],
                arrSelects: [],
                params: {
                    size: 10,
                    page: 1,
                    search: '',
                },
            }
        },
        created() {
            this.getBaseShiftList();
        },
        components:{
            addShift
        },
        methods: {
            changeStatus(){
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
        /*background-color: #f6ff32;*/
        .container-table{
            padding: 0 10px 0 10px;
            background-color: #f1e0ff;
        }
        .container {
            width: 100%;
            height: 60px;
            /*line-height: 60px;*/
            background-color: #b2e2ff;
        }
    }
</style>