<template>
    <div class="user-management-page">
        <el-row style="flex: 1.5;position: relative;border-right: 1px solid #cacaca">
            <el-col
               style="height: 5%;width:100%;
              position:
                relative;text-align: center;padding: 15px 0;
                 border-bottom: 1px solid #cacaca">组织架构1</el-col>
            <el-col style="height: 95%;width:100%;position: relative;padding: 25px 25px 0 25px">
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" style="background-color: #effff3"></el-tree>
            </el-col>
        </el-row>
        <el-row style="flex: 8.5;margin-left: 10px;border-left: 1px solid #cacaca;">
            <el-col style="height: 5%;width:100%;position:
                    relative;padding: 6px 0;
                    border-bottom: 1px solid #cacaca">
                <el-button type="primary" style="margin: 0 0 0 15px;display: inline-block">新增</el-button>
                <el-button type="primary" style="display: inline-block;float: right;margin-right: 15px;">查询</el-button>
                <el-input size="medium" v-model="input" placeholder="搜索关键字" style="display: inline-block;width: 20%;height: 50px;float: right"></el-input>

            </el-col>
            <el-col style="height: 95%;width:100%;position: relative;padding: 15px 15px 15px 15px">
                <el-table
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            label="行号"
                            width="180">
                        <template slot-scope="scope">
                            <i class="el-icon-time"></i>
                            <span style="margin-left: 10px">{{ scope.row.date }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="用户名"
                            width="180">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>姓名: {{ scope.row.name }}</p>
                                <p>住址: {{ scope.row.address }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="登录名"
                            width="180">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>姓名: {{ scope.row.name }}</p>
                                <p>住址: {{ scope.row.address }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="手机号码"
                            width="180">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>姓名: {{ scope.row.name }}</p>
                                <p>住址: {{ scope.row.address }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="邮箱地址"
                            width="180">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>姓名: {{ scope.row.name }}</p>
                                <p>住址: {{ scope.row.address }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="用户状态"
                            width="180">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top">
                                <p>姓名: {{ scope.row.name }}</p>
                                <p>住址: {{ scope.row.address }}</p>
                                <div slot="reference" class="name-wrapper">
                                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
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
        data() {
            return {
                data: [{
                    label: '一级 1',
                    children: [
                        {label: '二级 1-1'},
                        {
                            label: '一级 1',
                            children: [
                                {label: '二级 1-1'},
                                {label: '二级 1-2'},
                            ]
                        }

                        ]}],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },

                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },{
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    },{
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }]

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