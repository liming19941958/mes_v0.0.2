<template>
    <div class="user-management-page">
            <el-row style="width: 15%;float:left;position: relative;border-right: 1px solid #cacaca">
                <el-col
                   style="height: 5%;width:100%;
                  position:relative;
                  text-align: center;
                  padding: 15px 0;
                  border-bottom: 1px solid #cacaca">组织架构1{{name}}</el-col>
                <el-col style="height: 95%;width:100%;position: relative;padding: 25px 25px 0 25px">
                    <el-tree :data="data" :props="defaultProps" default-expand-all=true @node-click="handleNodeClick" style="background-color: #effff3"></el-tree>
                </el-col>
            </el-row>
            <el-row style="width: 85%;float:left;margin-left: 10px;border-left: 1px solid #cacaca;position: relative">
                <el-col style="height: 5%;min-height:35px;width:100%;position:
                        relative;padding: 6px 0;
                        border-bottom: 1px solid #cacaca">
                    <el-button type="primary" style="margin: 0 0 0 15px;display: inline-block;width: 5%;height: 100%;position: relative;text-align: center;padding: 0 0;">新增</el-button>
                    <el-button type="primary" style="display: inline-block;float: right;margin-right: 20px;width: 5%;height: 100%;position: relative;padding: 0 0;">查询</el-button>
                    <el-input size="medium" v-model="input" placeholder="搜索关键字" style="display: inline-block;width: 20%;margin-right: 15px;position: relative;height: 100%;padding: 0 0;float: right"></el-input>

                </el-col>
                <el-col style="height: 100%;width:100%;padding: 15px 15px 15px 15px">
                    <el-table
                            v-loading="loading"
                            element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.08)"
                            lazy=true
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
                                        <el-tag size="medium">{{ scope.row.state }}</el-tag>
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
        data() {
            return {
                // currentPage1: 1,
                data: [{
                    label: '壕玮集团',
                    children: [
                        {
                            label: '客户一部'
                        },
                        {
                            label: '注塑部',
                            children: [
                                {label: '注塑二部'},
                                {label: '注塑三部'},
                            ]
                        }
                    ]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                total:'',
                totalPage:'',
                params:{
                    size:'10',
                    page:'1'
                },
                dataText:'',
                loading: true,
                userList: []
            };
        },
        created(){
            this.getUserList();
        },
        mounted(){

        },
        methods: {
            getUserList(){
                this.dataText = ' ';
                let r_path = '/organization';
                sessionStorage.setItem('Path',r_path );
                this.$http.get('user/getUserList',
                    {
                        params:{
                            'size':this.params.size,
                            'page':this.params.page,
                        }
                    }).then(result=>{
                    if (result.status === 200) {
                        let userListData = result.body.result.data;
                        this.userList = userListData;
                        this.total = result.body.result.totalCount;
                        this.totalPage = result.body.result.totalPage;
                        console.log(this.totalPage);
                        if(this.userList.length !==0){
                            this.loading = false;
                        }
                    }
                    if(this.userList.length === 0){
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