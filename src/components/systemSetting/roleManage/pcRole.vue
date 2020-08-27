<template>
    <div class="role-management">

        <div class="roles-menu-table">
            <div class="role-menu">
                <div class="roleList">
                    <span>角色列表</span>
                    <el-tooltip popper-class="atooltip" content="刷新" placement="bottom">
                    <span>
                                 <i class="el-icon-refresh-right" @click="show"></i>
                    </span>
                    </el-tooltip>
                </div>
                <div class="roleNameMenu">
                    <el-tree
                            v-loading="loading"
                            element-loading-text="拼命加载中"
                            element-loading-spinner="el-icon-loading"
                            element-loading-background="rgba(0, 0, 0, 0.001)"
                            :empty-text="dataText"
                            :data="data"
                            :props="defaultProps"
                            default-expand-all
                            highlight-current=true
                            :expand-on-click-node="false"
                            @node-click="handleNodeClick"
                            style="background-color: #ecf3f0;width: 100%;">
                    </el-tree>
                </div>
            </div>

            <div class="role-table">

                <el-table
                        :data="tableData"
                        style="width: 100%;overflow-y: scroll"
                        row-key="id"
                        :indent="20"
                        border
                        max-height="70%"
                        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                        :header-cell-style="{
                            'color': '#303133',
                            'font-weight': '800',
                            'font-size': '16px',
                            'line-height': '10px',
                            'text-align': 'center',
                       }"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            min-width="55">
                    </el-table-column>
                    <el-table-column
                            prop="menuName"
                            label="菜单名称"
                            sortable
                            width="250px">
                    </el-table-column>
                    <el-table-column
                            prop="modulesMaps"
                            label="模块列表">
                        <template slot-scope="scope">
                            <el-checkbox-group v-model="checkList[scope.row.id]" @change ="handleChange">
                                <el-checkbox :label="item" v-for="(item,index) in Object.keys(scope.row.modulesMaps)" :key="index" ></el-checkbox>
                            </el-checkbox-group>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" style="margin: 20px 0 0 20px" @click="SubmitForm">确定</el-button>

            </div>

        </div>

    </div>

</template>

<script>

    export default {
        name: "pcRole",
        data(){
            return{
                checkList:[],
                data:null,
                defaultProps: {
                    children: 'Subdirectory',
                    label: 'name'
                },
                params:{
                   page:'1',
                    size:'10',
                    roleId:'',
                    menuType:'',
                },
                tableData: null,
                dataFirstNoChildren:null,
            }
        },
        created(){
            this.params.menuType="PC";
            this.show();
        },
        methods:{
            handleSelectionChange(val){
                console.log(val)
            },
            SubmitForm(){
                console.log(this.checkList);
            },
            //获取组织架构树
            show(){
                this.dataText = ' ';
                // let r_path = '/organization';
                // sessionStorage.setItem('Path',r_path );
                this.$http.post(('role/show'),{}).then(response=>{
                    if (response.status===200){
                        let act = JSON.parse(response.body.result);
                        this.data=act;
                        if(this.data.length !==0){
                            this.loading = false;
                        }else if (this.data.length === 0) {
                            this.dataText = "暂无数据";
                        }
                    }
                })
            },
            //组织架构选择树形控件各分支
            handleNodeClick(data){
                this.params.roleId=data.id;
                this.getMenuPermissions();
                console.log(this.params.roleId);
                this.getMenuList();
            },
            handleChange(val){
               console.log(val)
            },
            getMenuPermissions(){
               this.$http.get('rolePermissions/getMenuPermissions',{
                  params:{
                      roleId:this.params.roleId,
                      menuType:this.params.menuType
                  }
               }).then(response=>{
                   if (response.body.status===200){
                       this.$message({
                           type:"success",
                           message: "操作成功"
                       })
                   }else {
                       this.$message({
                           type:"error",
                           message: "获取权限信息失败，请联系管理员！"
                       })
                   }
               })
            },
            getMenuList(){
                this.$http.get('menu/getMenuList',{
                    params: {
                        page:this.params.page,
                        size: this.params.size
                    }
                }).then(response=>{
                    if (response.body.status===200){
                        this.$message({
                            message:'操作成功!',
                            type:'success',
                        });
                        this.tableData=response.data.result.data;
                        // this.tableData.forEach(item=>{
                        //     item['checked'] = [];
                        //     item.children.forEach(items=>{
                        //         items['checked'] = [];
                        //         items.children.forEach(itemss=>{
                        //             itemss['checked'] = [];
                        //         })
                        //     })
                        // })
                        console.log(this.tableData)
                        this.tableData.forEach(item=>{
                            this.$set(this.checkList,item.id,[]);
                            item.children.forEach(items=>{
                                this.$set(this.checkList,items.id,[]);
                                items.children.forEach(itemss=>{
                                    this.$set(this.checkList,itemss.id,[])
                                })

                            })
                        })

                    }
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .role-management{
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #effff3;
        ::v-deep .el-table th {
            padding:8px 0;
        }
        .el-table ::v-deep td{
            text-align: left;
            padding-left: 8px;
            min-width: 67px;
        }

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




    .roles-menu-table{
        display: flex;
        height: 95vh;
        width: 100%;
    .role-menu{
        position: relative;
        display: inline-block;
        float: left;
        height: 100%;
        width: 28%;
        min-width: 200px;
        margin-right: 8px;
        background-color: #ecf3f0;
    .roleList{
        position: relative;
        display: inline-block;
        width: 100%;
        border-bottom: 1px solid #d5d5d5;
        line-height: 50px;
    span:nth-child(1){
        float: left;
        display: inline-block;
        margin-left: 30px;
    }
    span:nth-child(2){
        position: relative;
        color:  #007aff !important;
    i:hover{
        cursor: pointer;
    }
    display: inline-block;
    float: right;
    margin-right: 30px;
    text-indent: 10px;
    }
    }
    .roleNameMenu{
        float: left;
        width: 100%;
        padding: 20px 0 0 20px;
        height: 100%;
        overflow: scroll;
    }

    }
    .role-table{
        overflow: scroll;
        position: relative;
        display: inline-block;
        float: right;
        width: 100%;
        height: 100vh;
        background-color: #ecf3f0;

    }
    }
    }
</style>