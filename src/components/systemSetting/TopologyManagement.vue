<template>
    <div class="topology-management-page" style="display: flex;width: 100%;height: 100%;">
<!--        row为横向布局-->
        <el-row style="flex: 4;min-width: 310px;">
            <el-col style="padding: 25px 0 15px 0;
            position:relative;font-size:15px;
            width: 100%;height: 10%;
            min-height:45px;
           border-bottom:1px solid  #dadada;">
                <div style="padding-left: 25px;position:relative;width: 150px;height: 100%;float:left;display:flex; align-items:center;" >
                    <span style="line-height:30px;display:inline-block;width: 100px;height: 30px;">物业管理</span>
                </div>
                <div style="position:relative;width: 130px;height: 100%;float:right;display:flex; align-items:center;" >
                    <el-button style=" display:inline-block;
                                width: 100px;
                                height: 30px;
                                line-height: 5px;
                                position: relative"
                               @click="AddPropertyNode"
                                >+ 添加节点
                    </el-button>
                    <el-dialog width="30%" :title="titleType"  :visible.sync="dialogFormAddPropertyNodeVisible">
                        <el-form :model="addPropertyForm" :rules="rules" ref="addPropertyForm" label-width="100px" class="demo-addPropertyForm" >
                            <el-form-item label="父节点：" prop="parentNode" style="margin-bottom: 25px;">
                                <!--                                prop的值要与 v-model的值相同-->
                                <el-input :disabled="true" v-model="addPropertyForm.parentNode"></el-input>
                            </el-form-item>

                            <el-form-item label="节点名称：" prop="nodeName" style="margin-bottom: 25px;">
                                <el-input v-model="addPropertyForm.nodeName" placeholder="请输入节点名称"></el-input>
                            </el-form-item>
                            <el-form-item label="备注：" style="margin-bottom: 25px;">
                                <el-input v-model="addPropertyForm.remarks" type="textarea" placeholder="请输入备注信息"></el-input>
                            </el-form-item>
                            <el-form-item label="排序：" prop="sortNumber" style="margin-bottom: 25px;">
                                <el-input v-model="addPropertyForm.sortNumber" style="margin-bottom: 15px;width: 25%;min-width: 70px"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormAddPropertyNodeVisible = false">取 消</el-button>
                            <el-button type="primary" @click="addPropertyNodeSubmit('addPropertyForm')">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>

            </el-col>
            <el-col style="width: 100%;height: 90%;padding: 15px 0 100px 25px; overflow-y: scroll"
                    class="row1"  v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.001)">
                    <el-tree
                            ref="leftTree"
                            node-key="uuid"
                            :empty-text="dataText"
                            :data="data"
                            :props="defaultProps"
                            default-expand-all
                            :highlight-current="true"
                            :expand-on-click-node="false"
                            @node-click="handleNodeClick"
                            @node-contextmenu="handleNodeContextmenu"
                            style="display: inline-block"
                            >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>
                            <span v-if="data.uuid==='0'"  class="el-icon-s-unfold" alt></span>
                             <span v-if="data.nodeType" style="color: #26abff" alt><a-icon type="right-circle" /></span>
                            <span v-if="data.uuid !=='0' && !data.nodeType" style="color: #5a5a5a" alt><a-icon type="appstore" /></span>
                          {{ node.label }}
                        </span>
                   </span>
                    </el-tree>

                    <div :class="{'rightClickMenu':isRightClick}" id="right" ref="rightClick" v-show="isRightClick"  transiton="fade">
                        <ul style="list-style: none">
                            <li @click="addNode"><i class="el-icon-plus"></i> 添加子节点</li>
                            <li @click="editNode"><i class="el-icon-edit"></i> 修改节点</li>
                            <li v-show="isShowDeleteNode" @click="deleteNode"><i class="el-icon-delete"></i> 删除节点</li>
                        </ul>
                    </div>
<!--                <a-tree-->
<!--                        v-if="data.length > 0"-->
<!--                        showIcon-->
<!--                        defaultExpandAll-->
<!--                        showLine-->
<!--                        :treeData="data"-->
<!--                        :replaceFields="defaultProps"-->
<!--                        :default-expanded-keys="['0-0-0', '0-0-1', '0-0-2']"-->
<!--                        @select="onSelect"-->
<!--                >-->

<!--                </a-tree>-->
            </el-col>
        </el-row>

        <el-row style="flex: 2;min-width: 120px;background-color: #ecf3f0;display:flex; justify-content:center; align-items:center;">
            <div style="width: 80px;height: 70%;">
                <el-button
                        :disabled="isDisabledBind"
                        :class="{'bindBtn':isbind}"
                        @click="bingDevice"
                    style="margin-bottom:120%;
                    width: 80px;height: 35px;
                    border:1px solid #b1b1b1;"
                >
                    <i class="el-icon-back"></i>
                    绑定
                </el-button>

                    <el-button
                        :disabled="isDisabled"
                        style="margin-bottom:120%;
                        width: 80px;height: 35px;
                        border:1px solid #b1b1b1;
                        margin-left: -1px;"
                        :class="{'unbind':isUnbind}"
                        @click="unbind"
                    >
                        <i class="el-icon-right"></i>
                    解绑
                </el-button>


                <div
                    class="property"
                    style="transition: all 0.3s ease;
                    cursor: pointer;color:#ffffff;
                    margin-bottom:120%;width: 80px;
                    height: 35px;
                    border:1px solid #b1b1b1;
                    background-color: #1890ff;
                    line-height: 35px;
                    text-align: center"
                    @click="PropertyNodeEquipmentAssociation"
                >
                    物业关联
                </div>
<!--                //物业关联弹窗-->
                <el-dialog width="50%!important" top="5vh" title="物业节点设备关联" :visible.sync="dialogFormPropertyNodeEquipmentAssociationVisible">
                    <el-row style="width: 100%;height: 100%;position: relative">
                        <el-col style="height: 80%;width:100%;padding: 15px 15px 15px 15px;">
                            <el-table
                                    :data="addPropertyForm.PropertyNodeEquipmentAssociation.PropertyNodeEquipmentAssociationData"
                                    max-height=650
                                    :row-style="{height:'35px'}"
                                    :cell-style="{padding:'0px'}"
                                    >
                                <el-table-column
                                        label="物业节点名称">
                                    <template slot-scope="scope">
                                        <div slot="reference" class="name-wrapper">
                                            <el-tag size="medium">{{ scope.row.propertytyName }}</el-tag>
                                        </div>
                                    </template>
                                </el-table-column>

                                <el-table-column
                                        label="关联设备">
                                    <template slot-scope="scope">
                                        <div slot="reference" class="name-wrapper">
                                            <el-tag size="medium">{{ scope.row.deviceAddress }}</el-tag>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="dialogFormPropertyNodeEquipmentAssociationVisible = false">取 消</el-button>
                    </div>
                </el-dialog>
                <div
                   class="machine"
                   style="transition: all 0.3s ease;
                   cursor: pointer;
                   color:#ffffff;
                   margin-bottom:120%;
                   width: 80px;
                   height: 35px;
                   border:1px solid #b1b1b1;
                   background-color: #1890ff;
                   line-height: 35px;
                   text-align: center"
                @click="DeviceAssociation"
                >
                    设备关联
                </div>
<!--                 设备关联弹窗-->
                <el-dialog width="50%!important" top="5vh" title="设备关联物业节点" :visible.sync="dialogFormDeviceAssociationVisible">
                    <el-row style="width: 100%;height: 100%;position: relative">
                        <el-col style="height: 80%;width:100%;padding: 15px 15px 15px 15px;">
                            <el-table
                                    :data="deviceData"
                                    max-height=650
                                    :row-style="{height:'35px'}"
                                    :cell-style="{padding:'0px'}"
                            >
                                <el-table-column
                                        label="设备名称">
                                    <template slot-scope="scope">
                                        <div slot="reference" class="name-wrapper">
                                            <el-tag size="medium">{{ scope.row.deviceMacAddress }}</el-tag>
                                        </div>
                                    </template>

                                </el-table-column>

                                <el-table-column
                                        label="关联物业节点">
                                    <template slot-scope="scope">
                                        <div v-for="(item,index) in scope.row.node" :key="index" class="name-wrapper">
                                            <span style="display: inline-block">{{item}}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="dialogFormDeviceAssociationVisible = false">取 消</el-button>
                    </div>
                </el-dialog>
            </div>

        </el-row>
        <el-row style="flex: 4;min-width: 310px;" class="row2">
            <el-col style="padding: 25px 0 15px 0;
            position:relative;font-size:15px;
            width: 100%;height: 10%;
            min-height:45px;
           border-bottom:1px solid  #dadada;
           ">
                <div style="padding-left: 25px;position:relative;width: 150px;height: 100%;float:left;display:flex; align-items:center;" >
                    <span style="line-height:30px;display:inline-block;width: 100px;height: 30px;">设备管理</span>
                </div>
            </el-col>
            <el-col style="width: 100%;height: 90%;padding: 15px 0 100px 25px; overflow-y: scroll"
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.001)">
            <el-tree
                    ref="rightTree"
                    node-key = "id"
                    :empty-text="dataText"
                    :data="dataDevice"
                    :props="defaultProps2"
                    default-expand-all
                    :highlight-current="true"
                    :expand-on-click-node="false"
                    @node-click="handleDeviceNodeClick"
                    style="width: 245px;">
                   <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>
<!--                            <span v-if="data.type==='0001'" class="el-icon-s-unfold" alt></span>-->

                            <span v-if="data.name==='10'" style="color: #26abff" alt><a-icon type="left-circle" /></span>
                             <span v-else style="color: #383838" alt><a-icon type="cluster" /></span>
                          {{ node.label }}
                        </span>
                   </span>
            </el-tree>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    // noinspection UnterminatedStatementJS
    export default {
        name: "home-contain",
        data(){
          return{
              dialogFormPropertyNodeEquipmentAssociationVisible:false,
              dialogFormDeviceAssociationVisible:false,
              isDisabledBind:true,
              isbind:false,
              isDisabled:true,
              isUnbind:false,
              isRightClick:false,
              rootNode:false,
              isShowDeleteNode:true,
              dialogFormAddPropertyNodeVisible:false,
              showLine:true,
              showIcon:true,
              loading:true,
              data:null,
              deviceData:[],
              dataDevice:null,
              bindData:null,
              dataText:'',
              titleType:'',
              isAddNode:false,
              isEditNode:false,
              addPropertyForm:{
                  bingForm:{
                      orgIds:'',
                      deviceNodeIds:'',
                  },
                  PropertyNodeEquipmentAssociation:{
                      PropertyNodeEquipmentAssociationData:null,
                      DeviceAssociationData:null,
                  },
                  deviceMacAddress:'',
                  isNodeType:false,
                  sortNumber:'',
                  parentNode:"",
                  parentNodeNumber:'',
                  nodeName:"",
                  remarks:"",
                  uuid:'',
                  orgId:'',
                  deviceNodeId:'',
                  addParentNodeNumber:"",
                  editParentNodeNumber:"",
                  addNodeParentNode:'',
                  editNodeParentNode:'',
                  addNodeName:'',
                  editNodeName:'',
                  editNodeRemarks:'',
                  editNodeSortNumber:'',
              },
              rules: {
                  // 定义是否必填项
                  nodeName: [
                      { required: true, message: '请输入节点名称', trigger: 'blur' },
                  ],
                  sortNumber: [
                      { required: true, message: '排序数字不能为空', trigger: 'blur' },
                  ],
              },
              defaultProps: {
                  children: 'Subdirectory',
                  label:'propertytyName',
                  // key:'id'
              },
              defaultProps2: {
                  children: 'children',
                  label: 'macAddress'
              },
          }
        },
        // computed:{
        //     iconClass(){
        //         if (this.isOpenClose){
        //             return'el-icon-remove-outline'
        //         }else{
        //             return 'el-icon-circle-plus-outline'
        //         }
        //     }
        // },
        created(){
            this.getDeviceNodeTree();
            document.oncontextmenu = function(){
                var right = document.getElementById('right');
                right.style.display = "none"
            };
            document.onclick = function(){
                var right = document.getElementById('right');
                right.style.display = "none"
            };
        },
        methods:{
            // 物业关联弹窗
            PropertyNodeEquipmentAssociation(){
                this.dialogFormPropertyNodeEquipmentAssociationVisible = true;
                let addressData =  this.data;
                // console.log(addressData)
                let arrList = [];
                this.findAddress( arrList,addressData);
                this.addPropertyForm.PropertyNodeEquipmentAssociation.PropertyNodeEquipmentAssociationData = arrList;
            },
            findAddress(arrList,addressData){//物业关联弹窗递归方法
                addressData.forEach(itemChild=>{
                    // table数据要的是对象数组
                    if (itemChild.Subdirectory &&itemChild.Subdirectory.length >0 ){
                        let itemChilds = itemChild.Subdirectory;
                        let obj = {};

                        for (var s = 0;s<itemChilds.length;s++){
                            let firstNode = itemChilds[0];
                            if (!firstNode.nodeType){
                                obj['propertytyName'] = itemChild.propertytyName;
                                obj['deviceAddress'] = null;
                            }
                        }
                        itemChilds.forEach(childs =>{
                            if (childs.nodeType){
                                obj['propertytyName'] = itemChild.propertytyName;
                                obj['deviceAddress'] = childs.deviceMacAddress;
                            }
                        });
                        arrList.push(obj);
                        this.findAddress(arrList,itemChild.Subdirectory)
                    }else if (itemChild.uuid) {
                        let obj = {};
                        obj['propertytyName'] = itemChild.propertytyName;
                        obj['deviceAddress'] = null;
                        arrList.push(obj);
                    }

                })
            },
            // 设备关联弹窗
            DeviceAssociation(){
                this.deviceData = this.findDeviceList();
                this.dialogFormDeviceAssociationVisible = true;
            },
            findDeviceList(){
                let map = new Map()
                this.bindData.forEach(item=>{
                    console.log(item)
                    let tempArr =[];
                    let tempNodeStr = '';
                    if (map.get(item.deviceMacAddress)){//以下一个item中的键在上一个map中查找是否有相同的键
                        let  temp = map.get(item.deviceMacAddress)// 返回 下一个item.deviceMacAddress 键对应的上一个map对应的value（找相同键的值）
                      for (var i=0;i<temp.node.length;i++){
                          tempNodeStr +=  temp.node[i];

                      }
                        if (!tempNodeStr.includes(item.node)){
                            //找到相同键的值后，如果在上一个map中的value中的node值中不包含下一个item中的node值，
                            //则把上一个map中的value中的node值与下一个item中的node值拼接起来
                            // temp.node += '   |    '+item.node
                            temp.node.push(item.node);
                    }
                    }else {
                        tempArr.push(item.node);
                        item.node = tempArr;
                        map.set(item.deviceMacAddress,item)
                    }
                })
                let arr =[]
                for (let item of map.values()) {
                    arr.push(item)

                }
                //遍历map中的value
                // map.forEach(value=>{
                //     // console.log(key)
                //     arr.push(value)
                    console.log(arr)
                // });
                return arr
            },
            getallbinds(act2){
                this.$http.get('organddevicenode/getallbinds', {}).then(response => {
                    if (response.body.status === 200) {
                        let bind= response.body.result;

                        this.bindData = bind;
                        // console.log(bind)
                        let device = act2[0].children;
                        device.forEach(deviceItem=>{
                            bind.forEach(itemBinds=>{
                                if (itemBinds.deviceMacAddress=== deviceItem.macAddress) {
                                    deviceItem['name'] = '10';
                                }
                            })
                        });
                        this.show(bind,act2);
                    }
                })
            },
            show(bind,act2){
                this.dataText = ' ';
                this.$http.post(('propertyty/show'),{}).then(response=>{
                    if (response.status===200){
                        let treeData = JSON.parse(response.body.result);
                        this.findNode(treeData,bind,act2);
                        this.data = treeData;
                        if(treeData.length !==0){
                            this.loading = false;
                        }else if (treeData.length === 0) {
                            this.dataText = "暂无数据";
                        }
                    }
                })
            },
            findNode(treeData,bind,act2){
                    treeData.forEach(item => {
                        let arr =[];
                        bind.forEach(bindItem=> {
                        if (item.uuid && item.uuid === bindItem.orgId) {
                            let dd = Object.assign({}, bindItem);
                            dd['propertytyName'] = dd.deviceMacAddress;
                            arr.push(dd);
                            bindItem.node = item.propertytyName
                        }
                    });
                        if (item.Subdirectory && item.Subdirectory.length > 0){
                            item.Subdirectory = arr.concat(item.Subdirectory);
                            this.findNode(item.Subdirectory,bind,act2);
                        }else{
                            item['Subdirectory'] =arr;
                        }
                });
            },
            getDeviceNodeTree(){
                this.dataText = ' ';
                this.$http.get(('devicenode/getDeviceNodeTree'),{}).then(response=>{
                    if (response.status===200){
                        let act2 = response.body.result;
                        this.getallbinds(act2);
                        this.dataDevice=act2;
                        if(this.dataDevice.length !==0){
                            this.loading = false;
                        }else if (this.dataDevice.length === 0) {
                            this.dataText = "暂无数据";
                        }
                    }
                })
            },
            AddPropertyNode(){
                this.titleType = '添加物业节点';
                this.addPropertyForm.parentNode = null;
                this.addPropertyForm.remarks = null;
                this.addPropertyForm.nodeName = null;
                this.dialogFormAddPropertyNodeVisible= true;
                this.addPropertyForm.sortNumber = '999';
                this.isAddNode = false;
                this.isEditNode = false;
                this.rootNode = true;
            },
            addNode(){
                this.titleType = '添加物业节点';
                this.addPropertyForm.parentNode = this.addPropertyForm.addNodeParentNode;
                this.addPropertyForm.parentNodeNumber = this.addPropertyForm.addParentNodeNumber;
                this.addPropertyForm.remarks = null;
                this.addPropertyForm.nodeName = null;
                this.addPropertyForm.sortNumber = '999';
                this.isAddNode = true;
                this.isEditNode = false;
                this.rootNode = false;
                this.dialogFormAddPropertyNodeVisible= true;
            },
            editNode(){
                this.titleType = '修改物业节点';
                this.addPropertyForm.parentNode = this.addPropertyForm.editNodeParentNode;
                this.addPropertyForm.parentNodeNumber = this.addPropertyForm.editParentNodeNumber;
                this.addPropertyForm.nodeName = this.addPropertyForm.editNodeName;
                this.addPropertyForm.remarks = this.addPropertyForm.editNodeRemarks;
                this.addPropertyForm.sortNumber = this.addPropertyForm.editNodeSortNumber;
                this.isEditNode = true;
                this.isAddNode = false;
                this.rootNode = false;
                this.dialogFormAddPropertyNodeVisible= true;
            },
            addPropertyNodeSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.rootNode){// 单纯添加根节点
                            this.$http.post('propertyty/save',{
                                propertytyName: this.addPropertyForm.nodeName,
                                remarks: this.addPropertyForm.remarks,
                                sortNumber:this.addPropertyForm.sortNumber,
                            }).then(response=>{
                                if (response.body.status === 200){
                                    this.getDeviceNodeTree();
                                    this.$message({
                                        message:'添加成功！',
                                        type:'success'
                                    });
                                }
                            }).catch((err)=>{
                                this.$message({
                                    message:err,
                                    type:'error'
                                });
                            });
                            this.dialogFormAddPropertyNodeVisible= false;
                        }else{
                            if (this.isAddNode){//添加树节点
                                this.$http.post('propertyty/save',{
                                    propertytyName: this.addPropertyForm.nodeName,
                                    remarks: this.addPropertyForm.remarks,
                                    sortNumber:this.addPropertyForm.sortNumber,
                                    parentNode:this.addPropertyForm.parentNodeNumber
                                }).then(response=>{
                                    if (response.body.status === 200){
                                        this.getDeviceNodeTree();
                                        this.$message({
                                            message:'添加成功！',
                                            type:'success'
                                        });
                                    }
                                }).catch((err)=>{
                                    this.$message({
                                        message:err,
                                        type:'error'
                                    });
                                });
                            }else if (this.isEditNode){//修改树节点
                                this.$http.post('propertyty/update',{
                                    propertytyName: this.addPropertyForm.nodeName,
                                    remarks: this.addPropertyForm.remarks,
                                    sortNumber:this.addPropertyForm.sortNumber,
                                    id:this.addPropertyForm.parentNodeNumber,
                                    parentNode:this.addPropertyForm.editNodeParentNode,
                                }).then(response=>{
                                    if (response.body.status === 200){
                                        this.getDeviceNodeTree();
                                        this.$message({
                                            message:'修改成功！',
                                            type:'success'
                                        });
                                    }
                                }).catch((err)=>{
                                    this.$message({
                                        message:err,
                                        type:'error'
                                    });
                                });
                            }
                            this.dialogFormAddPropertyNodeVisible= false;
                        }
                    }else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            deleteNode() {
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get('base/baseMachine/isMachineandDepartment',{
                        params:{
                           uuid:this.addPropertyForm.uuid
                        }
                    }).then(response=>{
                        if (response.body.result){
                            this.$http.post('propertyty/delete',{
                                uuid:this.addPropertyForm.uuid
                            }).then(response=>{
                                if (response.body.status === 200){
                                    this.getDeviceNodeTree();
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                }
                            }).catch((err)=>{
                                this.$message({
                                    type: 'error',
                                    message: err
                                });
                            })
                        }else{
                            this.$message({
                                type: 'warning',
                                message: '删除失败，请联系管理员！'
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleNodeClick(data){
                console.log(data)
                this.isRightClick = false;
                let childrenNode = data.Subdirectory;
                if (data.nodeType){//使解绑按钮可用
                    this.addPropertyForm.isNodeType = true;
                    this.addPropertyForm.orgId = data.orgId;
                    this.addPropertyForm.deviceNodeId = data.deviceNodeId;
                    this.addPropertyForm.deviceMacAddress = data.deviceMacAddress;
                    let deviceNumber = this.dataDevice;
                    // console.log(deviceNumber)
                    deviceNumber.forEach(itemDevice =>{
                        let itemDeviceChildren = itemDevice.children;
                        itemDeviceChildren.forEach(deviceChildren=>{
                            if (deviceChildren.macAddress === data.deviceMacAddress ) {
                                this.$refs.rightTree.setCurrentKey(deviceChildren.id)
                                console.log('找到了'+ deviceChildren.macAddress)
                            }
                        })

                    });
                    // console.log(deviceNumber);
                    // console.log(data.deviceMacAddress)
                    this.isDisabled = false;
                    this.isUnbind = true;

                }else if (childrenNode.length >0) {
                    let currentKey = this.$refs.rightTree.getCurrentKey();
                    console.log('右边id：'+ currentKey);
                    if (currentKey != null){
                        this.addPropertyForm.bingForm.deviceNodeIds = currentKey;
                        console.log('点击左边终于找到了右边的设备id:'+ this.addPropertyForm.bingForm.deviceNodeIds)
                        this.addPropertyForm.bingForm.orgIds = data.uuid;
                        console.log('点击左边终于找到了左边的uuid:'+ this.addPropertyForm.bingForm.orgIds)
                        this.isDisabledBind = false;
                        this.isbind = true;
                    }
                    for (var t=0;t<childrenNode.length;t++){
                        let item = childrenNode[0];
                        if (item.nodeType){//使解绑按钮可用
                            this.addPropertyForm.isNodeType =false;
                            this.addPropertyForm.orgId = item.orgId;
                            this.isDisabled = false;
                            this.isUnbind = true;
                        } else{
                            console.log('没设备')
                            this.isDisabled = true;
                            this.isUnbind = false;
                        }
                    }
                    // childrenNode.forEach(item=>{
                    //     console.log(item);
                    //     if ( item.nodeType ==='0040'){//使解绑按钮可用
                    //         console.log('kkk')
                    //         this.addPropertyForm.isNodeType =false;
                    //         this.addPropertyForm.orgId = item.orgId;
                    //         this.isDisabled = false;
                    //         this.isUnbind = true;
                    //     }else {//使解绑按钮不可用
                    //         console.log('没设备')
                    //         this.isDisabled = true;
                    //         this.isUnbind = false;
                    //     }
                    // });
                }else {
                    let currentKey = this.$refs.rightTree.getCurrentKey();
                    console.log('右边id：'+ currentKey);
                    if (currentKey != null){
                        this.addPropertyForm.bingForm.deviceNodeIds = currentKey;
                        console.log('点击左边终于找到了右边的设备id:'+ this.addPropertyForm.bingForm.deviceNodeIds)
                        this.addPropertyForm.bingForm.orgIds = data.uuid;
                        console.log('点击左边终于找到了左边的uuid:'+ this.addPropertyForm.bingForm.orgIds)
                        this.isDisabledBind = false;
                        this.isbind = true;
                    }
                    console.log('没孩子')
                    this.isDisabled = true;
                    this.isUnbind = false;
                }

            },
            // 解绑设备
            unbind(){
                if (this.addPropertyForm.isNodeType){
                    this.$http.post('organddevicenode/unbind',{
                        orgId:this.addPropertyForm.orgId ,
                        deviceNodeId:this.addPropertyForm.deviceNodeId,
                    }).then(response=>{
                        if (response.body.status === 200){
                            this.isDisabled = true;
                            this.isUnbind = false;
                            this.getDeviceNodeTree();
                            this.$message({
                                message:'解绑成功！',
                                type:'success'
                            });
                        }
                    }).catch((err)=>{
                        this.$message({
                            message:err,
                            type:'error'
                        });
                    })
                }else {
                    this.$http.post('organddevicenode/unbind',{
                        orgId:this.addPropertyForm.orgId
                    }).then(response=>{
                        if (response.body.status === 200){
                            this.isDisabled = true;
                            this.isUnbind = false;
                            this.getDeviceNodeTree();
                            this.$message({
                                message:'解绑成功！',
                                type:'success'
                            });
                        }
                    }).catch((err)=>{
                        this.$message({
                            message:err,
                            type:'error'
                        });
                    })
                }
            },
            // 右键点击物业树节点
            handleNodeContextmenu(val,data,nodes){
                console.log(data);
                if (data.id){//判断是否为非设备节点
                    this.addPropertyForm.uuid = data.uuid;
                    this.addPropertyForm.addNodeParentNode = data.propertytyName;
                    this.addPropertyForm.editNodeParentNode = nodes.parent.data.propertytyName;
                    this.addPropertyForm.addParentNodeNumber = data.id;
                    this.addPropertyForm.editParentNodeNumber = data.id;
                    this.addPropertyForm.editNodeName = data.propertytyName;
                    this.addPropertyForm.editNodeRemarks = data.remarks;
                    this.addPropertyForm.editNodeSortNumber = data.sortNumber;
                    this.$refs.rightClick.style.display="block";
                    this.isRightClick = true;
                    let ChildrenNode = data.Subdirectory;
                    if (ChildrenNode.length === 1){
                        ChildrenNode.forEach(childrenItem=>{
                            // console.log(childrenItem.nodeType)
                            if (childrenItem.nodeType !=='0040'){
                                // console.log(childrenItem.nodeType);
                                this.isShowDeleteNode = false;
                            }else if (childrenItem.nodeType ==='0040'){
                                console.log(childrenItem.nodeType);
                                this.isShowDeleteNode = true;
                            }
                        })
                    }else if (ChildrenNode.length > 1){
                        this.isShowDeleteNode = false;
                    }else if (ChildrenNode.length ===0 ){
                        this.isShowDeleteNode = true;
                    }
                }else if (!data.id){//已绑定设备节点
                    // this.$refs.rightClick.style.display="none";
                    this.isRightClick = false;

                }
                this.$refs.rightClick.style.left = val.x - 200 +'px';
                this.$refs.rightClick.style.top = val.y - 44 +'px';
                const boxPosition = this.$refs.rightClick.getBoundingClientRect();
                const boxPositionTop = boxPosition.bottom;
                this.getScreenSize(val,boxPositionTop);
                if (data.parentNode ===0) {
                    this.addPropertyForm.editNodeParentNode = '根节点';
                    this.addPropertyForm.editParentNodeNumber = data.id;
                }
            },
            //获取body高度以及设置元素在页面中的位置
            getScreenSize(val,boxPositionTop) {
                var count= document.body.offsetHeight;
                var countY = count - boxPositionTop;
                if (countY <20){
                    this.$refs.rightClick.style.top = val.y - 150 +'px';
                }
            },
            handleDeviceNodeClick(data){
                let currentLeftKey = this.$refs.leftTree.getCurrentKey();

                console.log('左边uuid：'+ currentLeftKey);
                if (currentLeftKey != null){
                    this.addPropertyForm.bingForm.deviceNodeIds = data.id;
                    this.addPropertyForm.bingForm.orgIds = currentLeftKey;
                    this.isDisabledBind = false;
                    this.isbind = true;
                }
                console.log(data)
                // alert('陈勇股神')
            },
            bingDevice(){
                if (this.isbind){
                    this.$http.post('organddevicenode/bind',{
                        orgIds: this.addPropertyForm.bingForm.orgIds,
                        deviceNodeIds: this.addPropertyForm.bingForm.deviceNodeIds
                    }).then(response=>{
                        if (response.body.status === 200){
                            this.getDeviceNodeTree();
                            this.$message({
                                type: 'success',
                                message: '绑定成功!'
                            });
                        }
                    }).catch((err)=>{
                        this.$message({
                            type: 'error',
                            message: err
                        });
                    })
                }
            },

        },
    }
</script>
<style>

</style>
<style scoped lang="scss">
    .topology-management-page{
        width: 100%;
        height: 100%;
        ::v-deep .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
            background-color: #cfdeef;
        }
        .bindBtn{
            background-color: #1890ff;
            color:#ffffff;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .bindBtn:hover{
            background-color: rgba(24, 144, 255, 0.82) !important;
            transition: all 0.3s ease;
        }
        .unbind{
            background-color: #1890ff;
            color:#ffffff;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        .unbind:hover{
            background-color: rgba(24, 144, 255, 0.82) !important;
            transition: all 0.3s ease;
        }
        .machine:hover{
            background-color: rgba(24, 144, 255, 0.82) !important;
            transition: all 0.3s ease;
        }
        .property:hover{
            background-color: rgba(24, 144, 255, 0.82) !important;
            transition: all 0.3s ease;
        }
        .rightClickMenu{
            width: 120px;
            box-shadow: 2px 1px 5px 1px rgb(149, 149, 149);
            position: absolute;
            background-color: #fff;
            z-index: 991999;
            li{
                cursor: pointer;
                padding: 8px 0 8px 10px;
            }
            li:hover{
                background-color: rgba(61,131,255,0.17);
            }
        }
        ::v-deep {
            .custom-tree-node{

            }
            /*/ /默认图旋转90度 动画取消*/
            .el-tree-node__expand-icon.expanded {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }
            /*取消无孩子的节点展开折叠图标显示*/
            .el-tree-node__expand-icon.is-leaf:before{
                margin-right: 20px;
                content:"";
                /*content:url("../../images/fileicon.png");*/
            }
            /*/ / 收起*/
            .el-tree-node__expand-icon:before {
                content:url("../../images/opentree.png") ; /*具体的图标*/
                margin-right: 5px;
            }
            /*/ / 展开*/
            .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
                content: url("../../images/closetree.png");
                margin-right: 5px;
            }
        }
    }
</style>