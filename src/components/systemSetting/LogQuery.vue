<template>
    <div class="log-query-page">
        <el-row style="width: 100%;height: 1005px;">
            <el-col style="height: 5%;width:100%;position:
                    relative;padding: 6px 0;
                    border-bottom: 1px solid #cacaca">

                <el-button type="primary" style="display: inline-block;float: right;margin-right: 15px;">查询</el-button>
                <el-input size="medium" v-model="input" placeholder="搜索关键字" style="display: inline-block;width: 20%;height: 50px;float: right"></el-input>

            </el-col>
            <el-col style="height: 95%;width:100%;padding: 15px 15px 15px 15px">
                <el-table
                        :data="userList"
                        style="width: 100%">
                    <el-table-column
                            label="行号"
                            width="300vw"
                            type="index">
                    </el-table-column>
                    <el-table-column
                            label="用户名"
                            width="200">
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
                            width="200">
                        <template slot-scope="scope">
                            <!--                            <el-popover trigger="hover" placement="top">-->
                            <!--                                <p>姓名: {{ scope.row.name }}</p>-->
                            <!--                                <p>住址: {{ scope.row.address }}</p>-->
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.loginName }}</el-tag>
                            </div>
                            <!--                            </el-popover>-->
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="登录IP"
                            width="200">
                        <template slot-scope="scope">
                            <!--                            <el-popover trigger="hover" placement="top">-->
                            <!--                                <p>姓名: {{ scope.row.name }}</p>-->
                            <!--                                <p>住址: {{ scope.row.address }}</p>-->
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.mobileNumber }}</el-tag>
                            </div>
                            <!--                            </el-popover>-->
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="登录时间"
                            width="200">
                        <template slot-scope="scope">
                            <!--                            <el-popover trigger="hover" placement="top">-->
                            <!--                                <p>姓名: {{ scope.row.name }}</p>-->
                            <!--                                <p>住址: {{ scope.row.address }}</p>-->
                            <div slot="reference" class="name-wrapper">
                                <el-tag size="medium">{{ scope.row.emailAddress }}</el-tag>
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
            userList:{
                type:Array,
                required:true
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

                tableData: []

            };
        },
        methods: {
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