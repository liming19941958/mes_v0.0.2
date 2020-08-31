<template>
    <div class="role-management">

        <div class="roles-menu-table">
            <div class="role-menu">
                <div class="roleList">
                    <span>角色列表</span>
                    <el-tooltip content="刷新" placement="bottom" popper-class="atooltip">
                    <span>
                                 <i @click="show" class="el-icon-refresh-right"></i>
                    </span>
                    </el-tooltip>
                </div>
                <div class="roleNameMenu">
                    <el-tree
                            :data="data"
                            :empty-text="dataText"
                            :expand-on-click-node="false"
                            :highlight-current="true"
                            :props="defaultProps"
                            @node-click="handleNodeClick"
                            default-expand-all
                            element-loading-background="rgba(0, 0, 0, 0.001)"
                            element-loading-spinner="el-icon-loading"
                            element-loading-text="拼命加载中"
                            style="background-color: #ecf3f0;width: 100%;"
                            v-loading="loading">
                    </el-tree>
                </div>
            </div>

            <div class="role-table">

                <el-table
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
                        @select="handleSelect"
                        @select-all="selectAll"
                        @selection-change="change"
                        @cell-click = "cellClick"
                        border
                        max-height="750"
                        ref="table"
                        row-key="id"
                        style="width: 100%;">
                    <el-table-column
                            min-width="55"
                            type="selection">
                    </el-table-column>
                    <el-table-column
                            label="菜单名称"
                            prop="menuName"
                            sortable
                            width="250px">
                    </el-table-column>
                    <el-table-column
                            label="模块列表"
                            prop="modulesMaps">
                        <template slot-scope="scope">
                            <el-checkbox-group v-model="scope.row.checkList" @change="handleCheckedModuleListChange">
                                <el-checkbox
                                             :key="index"
                                             :label="item"
                                             v-for="(item,index) in Object.keys(scope.row.modulesMaps)"></el-checkbox>
                            </el-checkbox-group>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button @click="SubmitForm" style="margin: 20px 0 0 20px" type="primary">确定</el-button>

            </div>

        </div>

    </div>

</template>

<script>

    export default {
        name: "pcRole",
        data() {
            return {
                selected: false,
                isSelectAll: false,
                data: null,
                cellClickRow:{},
                selects: [],
                defaultProps: {
                    children: 'Subdirectory',
                    label: 'name'
                },
                params: {
                    page: '1',
                    size: '10',
                    roleId: '',
                    menuType: '',
                },
                tableData: [],
                rows: {},
                dataFirstNoChildren: null,
                selectRow: []
            }
        },
        created() {
            this.show();

        },
        methods: {
            handleCheckedModuleListChange(val){//选中模块列表中的项后同时选中该行及其父节点
                if (val.length>0){
                    if (this.selects.indexOf(this.cellClickRow) ===-1){
                        this.$refs.table.toggleRowSelection(this.cellClickRow);
                        if (this.cellClickRow.parentId){
                            // console.log(this.cellClickRow.parentId)
                            this.tableData.forEach(itemData=>{
                                if (this.cellClickRow.parentId ===itemData.id ){
                                    if (this.selects.indexOf(itemData) ===-1) {
                                        this.$refs.table.toggleRowSelection(itemData);
                                    }
                                }
                                itemData.children.forEach(itemDataChild=>{
                                    if (this.cellClickRow.parentId ===itemDataChild.id ){
                                        if (this.selects.indexOf(itemDataChild) ===-1) {
                                            this.$refs.table.toggleRowSelection(itemDataChild);
                                        }
                                        if (itemDataChild.parentId){//判断有没有祖父节点
                                            if (this.selects.indexOf(itemData) ===-1) {//若祖父节点没有被选择，则选中它
                                                this.$refs.table.toggleRowSelection(itemData);
                                            }
                                        }
                                    }
                                })
                            })
                        }
                    }
                }else {
                    if (this.selects.indexOf(this.cellClickRow) !==-1){
                        this.$refs.table.toggleRowSelection(this.cellClickRow);
                    }
                }
            },
            cellClick(row){//点击单元格获取该行对象
                this.cellClickRow = row
            },
            selectAll(selections) {
                this.tableData.forEach(itemTableData => {
                    if (selections.indexOf(itemTableData) !== -1) {//全选
                        if (itemTableData.children.length > 0) {
                            itemTableData.children.forEach(item1 => {
                                if (selections.indexOf(item1) === -1){//只选中没有选中的项
                                    this.$refs.table.toggleRowSelection(item1);
                                    item1.checkList = Object.keys(item1.modulesMaps)
                                }
                                item1.children.forEach(item2 => {
                                    if (selections.indexOf(item2) === -1){
                                        this.$refs.table.toggleRowSelection(item2);
                                        item2.checkList = Object.keys(item2.modulesMaps)
                                    }
                                })
                            })
                        } else {
                            itemTableData.checkList = Object.keys(itemTableData.modulesMaps)
                        }
                    } else {//取消全选
                        if (itemTableData.children.length > 0) {
                            itemTableData.children.forEach(item1 => {
                                if (selections.indexOf(item1) !== -1){//只取消选择已经选中的项
                                    this.$refs.table.toggleRowSelection(item1);
                                    item1.checkList = []
                                }
                                item1.children.forEach(item2 => {
                                    if (selections.indexOf(item2) !== -1){
                                        this.$refs.table.toggleRowSelection(item2);
                                        item2.checkList = []
                                    }
                                })
                            })
                        } else {
                            itemTableData.checkList = []
                        }
                    }
                })
            },
            change(val) {
                this.selects = val;
                // console.log('change:',val)
            },

            handleSelect(selection, row) {
                this.rows = row;
                if (row.children.length > 0){
                    this.$nextTick(() => {
                        row.children.forEach(item => {
                            if (this.selects.indexOf(row) !== -1) {//判断所点击的父节点是否选中，若选中，则选中其所有子孙节点
                                this.$refs.table.toggleRowSelection(item);
                                item.checkList = Object.keys(item.modulesMaps)
                                // return
                                // console.log(item)
                            }else{//取消选中父节点后也取消选中其子节点
                                if (this.selects.indexOf(item) !==-1) {//只取消选择已选中的子节点
                                    this.$refs.table.toggleRowSelection(item);
                                    item.checkList = [];
                                }

                            }
                            item.children.forEach(items => {
                                if (this.selects.indexOf(item) !== -1) {//选中孙节点
                                    this.$refs.table.toggleRowSelection(items)
                                    items.checkList = Object.keys(items.modulesMaps)
                                }else{//取消选中孙节点
                                    if (this.selects.indexOf(items) !==-1) {//只取消选择已选中的子节点
                                        this.$refs.table.toggleRowSelection(items);
                                        items.checkList = [];
                                    }
                                }
                            })
                        })
                    })
                } else {
                    if (row.parentId){
                        this.tableData.forEach(itemTree=>{
                            if (itemTree.children.length>0){
                                if (row.parentId === itemTree.id){
                                    if (selection.indexOf(itemTree) !==-1){
                                        return
                                    }else{
                                        this.$refs.table.toggleRowSelection(itemTree)
                                    }
                                }
                                itemTree.children.forEach(itemChildren=> {
                                    if (row.parentId === itemChildren.id){
                                        if (selection.indexOf(itemChildren) === -1) {
                                            this.$refs.table.toggleRowSelection(itemChildren)
                                        }
                                }
                                })
                            }
                        })
                    }
                    if (selection.length > 0) {
                        selection.forEach(itemSelectChange => {
                            // let msg = '';
                            if (row.id === itemSelectChange.id) {
                                row.checkList = Object.keys(row.modulesMaps)
                            } else {
                                row.checkList = [];
                            }
                        })
                    } else {
                        row.checkList = [];
                    }
                }
            },
            SubmitForm() {
                let selectArray = [];
                this.selects.forEach(itemSelects=>{
                    let selectObject ={};
                    selectObject['menuId'] = itemSelects.id;
                    selectArray.push(selectObject)
                    let modulesMapsItem = itemSelects.modulesMaps;
                    let modulesMapsItemKeys = Object.keys(modulesMapsItem);
                    let obj ={};
                    modulesMapsItemKeys.forEach(itemKeys=>{
                        itemSelects.checkList.forEach(checkListItem=>{
                            if (checkListItem === itemKeys) {
                                obj[checkListItem] = modulesMapsItem[itemKeys];
                            }
                        })
                    })
                    selectObject['modulesMaps'] = obj;
                });
                // console.log(selectArray)
                // Form Data 转Request payload，使用JSON.stringify(data)
                this.$http.post(('rolePermissions/setMenuPermissions' + '/' + this.params.roleId),JSON.stringify(selectArray)
                ).then(response=>{
                   console.log(response.body.status)
                    if (response.body.status === 200) {
                        this.$message({
                            message: '操作成功!',
                            type:"success"

                        })
                    }
                })
            },
            //获取组织架构树
            show() {
                this.dataText = ' ';
                // let r_path = '/organization';
                // sessionStorage.setItem('Path',r_path );
                this.$http.post(('role/show'), {}).then(response => {
                    if (response.status === 200) {
                        let act = JSON.parse(response.body.result);
                        this.data = act;
                        if (this.data.length !== 0) {
                            this.loading = false;
                        } else if (this.data.length === 0) {
                            this.dataText = "暂无数据";
                        }
                    }
                })
            },
            //组织架构选择树形控件各分支
            handleNodeClick(data) {
                this.params.roleId = data.id;
                this.params.menuType = 'PC';
                this.getMenuList();
                // console.log(this.params.roleId);

            },
            getMenuPermissions(){//获取模块列表权限表
                this.$http.get('rolePermissions/getMenuPermissions',{
                    params:{
                        roleId:this.params.roleId,
                        menuType:this.params.menuType,
                    }
                }).then(response=>{
                   if (response.body.status === 200){
                       let dataPermissions = response.body.result
                       let nodeListKeys = Object.keys(dataPermissions);
                       this.tableData.forEach(treeData=>{
                           nodeListKeys.forEach(itemKeys=>{
                               if (treeData.id === itemKeys ){
                                   this.$refs.table.toggleRowSelection(treeData);
                                   //js中想根据动态key得到某对象中相对应的value的方法有两个(⊙o⊙)哦：
                                   // 1、var key = "name1";var value = obj[key];
                                   // 2、var key = "name1";var value = eval("obj."+key);
                                   var a = dataPermissions[itemKeys];
                                   treeData.checkList = Object.keys(a)
                               }
                               treeData.children.forEach(treeDataChild=>{
                                   if (treeDataChild.id === itemKeys ){
                                       this.$refs.table.toggleRowSelection(treeDataChild);
                                       var b = dataPermissions[itemKeys];
                                       treeDataChild.checkList = Object.keys(b)
                                   }
                                   treeDataChild.children.forEach(treeDataChilds=>{
                                       if (treeDataChilds.id === itemKeys ){
                                           this.$refs.table.toggleRowSelection(treeDataChilds);
                                           var c = dataPermissions[itemKeys];
                                           treeDataChilds.checkList = Object.keys(c)
                                       }
                                   })
                               })
                           })
                       })
                   }
                })
            },
            getMenuList() {
                this.$http.get('menu/getMenuList', {
                    params: {
                        page: this.params.page,
                        size: this.params.size
                    }
                }).then(response => {
                    if (response.body.status === 200) {
                        this.$message({
                            message: '操作成功!',
                            type: 'success',
                        });
                        this.tableData = response.data.result.data;
                        this.tableData.forEach(item => {
                            this.$set(item, 'checkList', [])
                            item.children.forEach(items => {
                                this.$set(items, 'checkList', []);
                                // items['checked']=true;
                                items.children.forEach(Tirth => {
                                    this.$set(Tirth, 'checkList', []);
                                    // Tirth['checked']=false;
                                })
                            })
                        })
                        this.getMenuPermissions();
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .role-management {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #effff3;

        ::v-deep .el-table th {
            padding: 8px 0;
        }

        .el-table ::v-deep td {
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


        .roles-menu-table {
            display: flex;
            height: 95vh;
            width: 100%;

            .role-menu {
                position: relative;
                display: inline-block;
                float: left;
                height: 100%;
                width: 28%;
                min-width: 200px;
                margin-right: 8px;
                background-color: #ecf3f0;

                .roleList {
                    position: relative;
                    display: inline-block;
                    width: 100%;
                    border-bottom: 1px solid #d5d5d5;
                    line-height: 50px;

                    span:nth-child(1) {
                        float: left;
                        display: inline-block;
                        margin-left: 30px;
                    }

                    span:nth-child(2) {
                        position: relative;
                        color: #007aff !important;

                        i:hover {
                            cursor: pointer;
                        }

                        display: inline-block;
                        float: right;
                        margin-right: 30px;
                        text-indent: 10px;
                    }
                }

                .roleNameMenu {
                    float: left;
                    width: 100%;
                    padding: 20px 0 0 20px;
                    height: 100%;
                    overflow: scroll;
                }

            }

            .role-table {
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