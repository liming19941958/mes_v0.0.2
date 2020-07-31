<template>
    <div class="log-query-page">
        <el-row style="width: 100%;height: 1005px;">
            <el-col style="height: 5%;width:100%;position:
                    relative;padding: 6px 0;
                    border-bottom: 1px solid #cacaca">

                <el-button type="primary" style="display: inline-block;float: right;margin-right: 20px;width: 5%;height: 100%;position: relative;padding: 0 0;">查询</el-button>
                <el-input size="medium" v-model="input" placeholder="搜索关键字" style="display: inline-block;width: 20%;margin-right: 15px;position: relative;height: 100%;padding: 0 0;float: right"></el-input>

            </el-col>
            <el-col style="height: 100%;width:100%;padding: 15px 15px 15px 15px;">
                <el-table
                        :empty-text="dataText"
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.08)"
                        lazy=true
                        :data="userLog"
                        style="width: 100%;height: 75%;overflow: scroll">
                    <el-table-column
                            label="行号"

                            type="index">
                    </el-table-column>
                    <el-table-column
                            label="用户名"
                            >
                        <template slot-scope="scope">
                            <!--                            <el-popover trigger="hover" placement="top">-->
                            <!--                                <p>姓名: {{ scope.row.name}}</p>-->
                            <!--                                <p>住址: {{ scope.row.address }}</p>-->
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.userName }}</el-tag>
                            </div>
                            <!--                            </el-popover>-->
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="信息"
                           >
                        <template slot-scope="scope">
                            <!--                            <el-popover trigger="hover" placement="top">-->
                            <!--                                <p>姓名: {{ scope.row.name }}</p>-->
                            <!--                                <p>住址: {{ scope.row.address }}</p>-->
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.content }}</el-tag>
                            </div>
                            <!--                            </el-popover>-->
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="登录IP"
                           >
                        <template slot-scope="scope">
                            <!--                            <el-popover trigger="hover" placement="top">-->
                            <!--                                <p>姓名: {{ scope.row.name }}</p>-->
                            <!--                                <p>住址: {{ scope.row.address }}</p>-->
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.ipAddress }}</el-tag>
                            </div>
                            <!--                            </el-popover>-->
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="登录时间"
                            >
                        <template slot-scope="scope">
                            <!--                            <el-popover trigger="hover" placement="top">-->
                            <!--                                <p>姓名: {{ scope.row.name }}</p>-->
                            <!--                                <p>住址: {{ scope.row.address }}</p>-->
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.createDate }}</el-tag>
                            </div>
                            <!--                            </el-popover>-->
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "UserManagement",
        props:{
            userLog:{
                type:Array,
                required:true
            },
            dataText:{
                type:String,
                required:true
            },
            loadStatus:{
                type: String,
                required: true
            }
        },
        data() {
            return {
                data: [{
                    label: '壕玮集团',
                    children: [
                        {label: '客户一部'},
                        {
                            label: '注塑部',
                            children: [
                                {label: '注塑二部'},
                                {label: '注塑三部'},
                            ]
                        }

                    ]}],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                loading:true,
                tableData: []

            };
        },
        created(){
            this.loadind();
        },
        // mounted(){
        //     this.loadind();
        // },
        methods: {
            loadind(){
                console.log("getLog"+this.loadStatus);
                console.log("getLogggg"+this.dataText);
                console.log("loghhhhhhh"+this.userLog.length);
                if (this.loadStatus == 'ok'){
                    this.loading=false;
                    // console.log(this.loading)
                }
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
            indexMethod(index) {
                return (index +1 );
            }
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