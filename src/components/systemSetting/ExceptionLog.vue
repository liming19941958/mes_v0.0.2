<template>
    <div class="log-query-page">
        <el-row style="width: 100%;overflow: scroll;height: 100vh;position: relative">
            <el-col style="min-height:42.5px;width:100%;position:
                    relative;padding: 6px 11px;
                    border-bottom: 1px solid #cacaca;
                    float: left">
                <!--                <div style="height: 32px;width: 6%;color: #7e7e7e;min-width: 98px;float:left;align-items:center; display: flex;">选择时间区间：</div>-->
                <!--                <DatePicker type="datetimerange" placeholder="请选择日期" style="width: 20%;min-width: 315px;float: left;margin-right: 40%;"></DatePicker>-->
                <div class="block" style="height: 32px;min-width: 350px;float: left;align-items:center; display: flex;">
                    <span class="demonstration">开始时间：</span>
                    <el-date-picker
                            v-model="value1"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div class="block" style="height: 32px;min-width: 350px;float: left;align-items:center;display: flex;">
                    <span class="demonstration">结束时间：</span>
                    <el-date-picker
                            v-model="value2"
                            type="datetime"
                            placeholder="选择日期时间">
                    </el-date-picker>
                </div>
                <div style="height: 32px;width: 18%;min-width: 305px;float:left;position: relative;display: inline-block;">
                    <div style="height: 32px;color: #7e7e7e;float:left;line-height: 32px;position: relative;display: inline-block;">搜索内容：</div>
                    <el-input
                            size="medium" v-model="params.search" placeholder="请输入查询内容"
                            style="display: inline-block;width: 20%;min-width: 220px;margin-right: 15px;position: relative;height: 32px;padding: 0 0;float: left">
                    </el-input>
                </div>
                <el-button type="primary" style="display: inline-block;float: left;width: 5%;min-width: 35px;height: 32px;position: relative;padding: 0 0;" @click=" getSysDebugLogList">查询</el-button>

            </el-col>
            <el-col style="height: 100%;width:100%;padding: 15px 15px 15px 15px;">
                <el-table
                        @selection-change="handleSelectionChange"
                        :empty-text="dataText"
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.08)"
                        :data="ExceptionLog"
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
                            label="文件名称"
                    >
                        <template slot-scope="scope">
                            <el-tooltip popper-class="atooltip" :content="scope.row.fileName" placement="bottom">
                                <p>{{ scope.row.fileName }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.fileName }}</el-tag>
                                </div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="文件路径">
                        <template slot-scope="scope">
                            <el-tooltip popper-class="atooltip" :content="scope.row.filePath" placement="bottom">
                                <p>{{ scope.row.filePath }}</p>
                                 <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.filePath }}</el-tag>
                                 </div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="创建时间">
                        <template slot-scope="scope">
                            <el-tooltip popper-class="atooltip" content="scope.row.date" placement="bottom">
                                <p>{{ scope.row.date }}</p>
                                <div slot="reference" class="name-wrapper">
                                  <el-tag size="medium">{{ scope.row.date }}</el-tag>
                                </div>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button style="margin-top: 10px;background-color: #3592ff;color: aliceblue" v-on:click="download">下载</el-button>
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
            </el-col>
        </el-row>
    </div>
</template>

<script>
    // import qs from 'qs'
    export default {
        name: "UserManagement",
        data() {
            return {
                value1: '',
                value2: '',
                startTime:'',
                endTime:'',
                total:'',
                totalPage:'',
                dataText:'',
                ExceptionLog:[],
                loading:true,
                tableData: [],
                multipleSelection: [],
                arrSelects:[],
                params:{
                    size:'10',
                    page:'1',
                    search:'',
                },
            };
        },
        created(){
            this.getSysDebugLogList();
        },
        mounted(){

        },
        methods: {
            getSysDebugLogList(){
                this.dataText = ' ';
                this.params.startTime = this.changeDateTime(this.value1);
                this.params.endTime = this.changeDateTime(this.value2);
                if(this.params.startTime === this.params.endTime){
                    this.params.startTime=this.params.endTime=null;
                }
                this.$http.get('sysDebugLog/list',
                    {
                        params:{
                            'size':this.params.size,
                            'page':this.params.page,
                            'startTime':this.params.startTime,
                            'endTime':this.params.endTime,
                            'search':this.params.search
                        }
                    }).then(result=>{
                    if (result.status === 200) {
                        this.ExceptionLog = result.body.result.data;
                        this.total = result.body.result.totalCount;
                        this.totalPage = result.body.result.totalPage;
                        if(this.ExceptionLog.length !==0){
                            this.loading = false;
                        }
                    }else if(this.ExceptionLog.length === 0){
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
                this.params.size= `${val}`;
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
                for (var i =0;i<array.length; i++){
                    let arr= array[i].id;
                    // console.log(arr);
                    arrSelect.push(arr);
                }
                this.arrSelects=arrSelect;
            },
            download(){
                this.$http.get(//url中的参数可以自行拼接字符串
                        ('sysDebugLog/download'+'?'+ this.$qs.stringify({ids:this.arrSelects},{arrayFormat:'repeat'})),
                        {responseType: 'blob'},
                        {headers: {'content-type': 'application/x-www-form-urlencoded'}}
                    ).then(respons=>{
                    if (respons.status===200){
                        console.log(respons);
                        const blob = respons.data;
                        const reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onload = (e) => {
                            const a = document.createElement('a');
                            a.download = `系统调试日志.zip`;
                            // 后端设置的文件名称在res.headers的 "content-disposition": "form-data; name=\"attachment\"; filename=\"20181211191944.zip\"",
                            a.href = e.target.result;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        };
                        this.$message({
                            message:'下载成功！',
                            type:'success'
                        });
                    }
                }).catch((err) => {
                    this.$message({
                        message:'下载失败！',
                        type:'error'
                    });
                    console.log(err.message);
                });
            },
            indexMethod(index) {
                return (this.params.page - 1) * this.params.size + index + 1;
            },
        }
    }
</script>

<style scoped lang="scss">
    .user-management-page{
        display: flex;
        position: absolute;
        width: 100%;
        height: 100%;
        /*background-color: #ffee80*/
    }
</style>
