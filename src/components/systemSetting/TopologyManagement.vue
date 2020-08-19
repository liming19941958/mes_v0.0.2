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
                    <el-dialog width="30%" title="添加物业节点"  :visible.sync="dialogFormAddPropertyNodeVisible">
                        <el-form :model="addPropertyForm" :rules="rules" ref="addPropertyForm" label-width="100px" class="demo-addPropertyForm" >
                            <el-form-item label="父节点：" prop="parentNode" style="margin-bottom: 25px;">
                                <!--                                prop的值要与 v-model的值相同-->
                                <el-input :disabled="true" v-model="addPropertyForm.parentNode"></el-input>
                            </el-form-item>

                            <el-form-item label="节点名称：" prop="nodeName" style="margin-bottom: 25px;">
                                <el-input v-model="addPropertyForm.nodeName"></el-input>
                            </el-form-item>
                            <el-form-item label="备注：" prop="Remarks" style="margin-bottom: 25px;">
                                <el-input v-model="addPropertyForm.Remarks" type="textarea"></el-input>
                            </el-form-item>
                            <el-form-item label="排序：" prop="order" style="margin-bottom: 25px;">
                                <el-input v-model="addPropertyForm.order" style="margin-bottom: 15px;width: 25%;"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormAddPropertyNodeVisible = false">取 消</el-button>
                            <el-button type="primary" @click="addPropertyNodeSubmit('addPropertyForm')">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>

            </el-col>
            <el-col style="width: 100%;height: 90%;padding: 15px 0 100px 25px; overflow-y: scroll" class="row1">
                <el-tree
                        v-loading="loading"
                        element-loading-text="拼命加载中"
                        element-loading-spinner="el-icon-loading"
                        element-loading-background="rgba(0, 0, 0, 0.001)"
                        node-key="id"
                        ref="tree"
                        :empty-text="dataText"
                        :data="data"
                        :props="defaultProps"

                        default-expand-all
                        highlight-current=true
                        :expand-on-click-node="false"
                        @node-click="handleNodeClick"
                        @node-contextmenu="handleNodeContextmenu"
                        style="width: 100%;">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>
                            <span v-if="data.uuid==='0'"  :icon-class="iconClass" class="el-icon-s-unfold" alt></span>
                             <span v-if="data.nodeType" style="color: #26abff" alt><a-icon type="right-circle" /></span>
                            <span v-if="data.uuid !=='0' && !data.nodeType" style="color: #5a5a5a" alt><a-icon type="appstore" /></span>
                          {{ node.label }}
                        </span>
                   </span>
                </el-tree>
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
                <div style="margin-bottom:120%;width: 80px;height: 35px;border:1px solid #b1b1b1;background-color: #ffffff;line-height: 35px;text-align: center">
                    <i class="el-icon-back" style="margin-right: 10px;"></i>
                    绑定
                </div>
                <div style="margin-bottom:120%;width: 80px;height: 35px;border:1px solid #b1b1b1;background-color: #ffffff;line-height: 35px;text-align: center">
                    解绑
                    <i class="el-icon-right" style="margin-left: 10px;"></i>
                </div>
                <div style="color:#ffffff;margin-bottom:120%;width: 80px;height: 35px;border:1px solid #b1b1b1;background-color: #1890ff;line-height: 35px;text-align: center">
                    物业关联
                </div>
                <div style="color:#ffffff;margin-bottom:120%;width: 80px;height: 35px;border:1px solid #b1b1b1;background-color: #1890ff;line-height: 35px;text-align: center">
                    设备关联
                </div>
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
            <el-col style="width: 100%;height: 90%;padding: 15px 0 100px 25px; overflow-y: scroll">
            <el-tree
                    v-loading="loading"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.001)"
                    :empty-text="dataText"
                    :data="dataDevice"
                    :props="defaultProps2"
                    default-expand-all
                    highlight-current=true
                    :expand-on-click-node="false"
                    @node-click="handleNodeClick"
                    style="width: 100%;">
                   <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>
<!--                            <span v-if="data.type==='0001'" class="el-icon-s-unfold" alt></span>-->
                            <span v-if="!data.name" style="color: #383838" alt><a-icon type="cluster" /></span>
                            <span v-if="data.name" style="color: #26abff" alt><a-icon type="left-circle" /></span>
                          {{ node.label }}
                        </span>
                   </span>
            </el-tree>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "home-contain",
        data(){
          return{
              rootNode:false,
              dialogFormAddPropertyNodeVisible:false,
              showLine:true,
              showIcon:true,
              loading:true,
              data:null,
              dataDevice:null,
              bind:null,
              dataText:'',
              addPropertyForm:{
                  order:'999',
                  parentNode:"",
                  nodeName:"",
                  Remarks:"",
              },
              rules: {
                  // 定义是否必填项
                  nodeName: [
                      { required: true, message: '请输入节点名称', trigger: 'blur' },
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
        },
        methods:{
            getallbinds(act2){
                this.$http.get('organddevicenode/getallbinds', {}).then(response => {
                    if (response.body.status === 200) {
                        let bind= response.body.result;
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
                        // console.log(this.data)
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
                            // console.log(bindItem)
                            let dd = Object.assign({}, bindItem);
                                let device = act2[0].children;
                                device.forEach(deviceItem=>{
                                    if (bindItem.deviceMacAddress=== deviceItem.macAddress) {
                                        deviceItem['name'] = true;
                                    }
                                });
                            dd['propertytyName'] = dd.deviceMacAddress;
                            arr.push(dd);
                            // console.log(item)
                        }
                    });
                        if (item.Subdirectory && item.Subdirectory.length > 0){
                            item.Subdirectory = item.Subdirectory.concat(arr);
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
                        // console.log(this.dataDevice)
                        if(this.dataDevice.length !==0){
                            this.loading = false;
                        }else if (this.dataDevice.length === 0) {
                            this.dataText = "暂无数据";
                        }
                    }
                })
            },
            AddPropertyNode(){
                this.dialogFormAddPropertyNodeVisible= true;
                this.rootNode = true;
            },
            addPropertyNodeSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.rootNode){
                            alert('单纯添加根节点')
                        }
                    }else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            handleNodeClick(data){
                console.log(data)
            },
            handleNodeContextmenu(val){
                console.log(val)
            },
            // handleNodeClickOpen(){
            //     this.isOpenClose = true;
            // },
            // handleNodeClickClose(){
            //     this.isOpenClose = false;
            // }
        },
    }
</script>

<style scoped lang="scss">
    .topology-management-page{
        width: 100%;
        height: 100%;
        ::v-deep {
            /*/ /默认图旋转90度 动画取消*/
            .el-tree-node__expand-icon.expanded {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }
            /*取消无孩子的节点展开折叠图标显示*/
            .el-tree-node__expand-icon.is-leaf:before{
                margin-right: 5px;
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