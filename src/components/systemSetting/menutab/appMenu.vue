<template>
    <div class="appMenu">
        <div class="appMenu-table">
            <div class="headerBar">
                <el-button type="primary">新增</el-button>
            </div>
            <div class="tableBar">
                <el-table
                        lazy="true"
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
                            width="350"
                            style="text-align: center">
                    </el-table-column>
                    <el-table-column
                            label="模块列表"
                            prop="modulesMaps">
                        <template slot-scope="scope">
                           <span  :key="index"
                                  v-for="(item,index) in Object.keys(scope.row.modulesMaps)">
                               <span style="color: #1890ff;">{{item}}</span>
                               <span v-if="Object.keys(scope.row.modulesMaps).length>1 && index<(Object.keys(scope.row.modulesMaps).length -1)"  style="display:inline-block; color: #d4d4d4;margin: 0 8px 8px 8px">|</span>
                           </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template slot-scope="scope">
                            <el-button
                                    style="text-align: center; color: #1890ff;font-size: 15px"
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)" title="添加子菜单"><i class="el-icon-plus"></i></el-button>
                            <el-button
                                    style="text-align: center;color: #1890ff;font-size: 15px"
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)" title="修改"><i class="el-icon-edit"></i></el-button>
                            <el-button
                                    style="text-align: center;color: #1890ff;font-size: 15px"
                                    size="mini"
                                    @click="handleDelete(scope.$index, scope.row)" title="删除"><i class="el-icon-delete"></i></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "appMenu",
        data(){
            return{
                loading: true,
                dataText:'',
                tableData:[],
                defaultProps: {
                    children: 'Subdirectory',
                    label: 'name'
                },
                page:1,
                size:40,
            }
        },
        created(){
            this.getMenuList();
        },
        methods:{
            getMenuList(){
                this.dataText = ' ';
                this.$http.get('appMenu/getMenuList',{
                    params:{
                        page:this.page,
                        size:this.size
                    }
                }).then(response=>{
                    if (response.body.status === 200) {
                        this.tableData = response.body.result.data;
                        if (this.tableData.length>0){
                            this.loading =  false;
                        }else {
                            this.dataText = '';
                            this.loading =  false;
                        }
                        console.log(this.tableData )
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .appMenu{
        position: relative;
        width: 100%;
        height: 100%;

        .appMenu-table{
            position: relative;
            height: 96vh;
            width: 100%;
            .headerBar{
                position: relative;
                width: 100%;
                height: 60px;
                padding: 15px 0 0 25px;
                border-bottom: 2px solid #e6e6e6;
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
