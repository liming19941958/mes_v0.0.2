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
                                position: relative">+ 添加节点
                    </el-button>
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
                        :icon-class="iconClass"
                        default-expand-all
                        highlight-current=true
                        :expand-on-click-node="false"
                        @node-click="handleNodeClick"
                        @node-expand="handleNodeClickOpen"
                        @node-collapse="handleNodeClickClose"

                        style="width: 100%;">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>
                            <span v-if="data.uuid==='0'" class="el-icon-s-unfold" alt></span>
                             <span v-if="data.nodeType" class="el-icon-video-play" style="color: #0f7bff" alt></span>
                            <span v-if="data.uuid !=='0' && !data.nodeType" class="el-icon-menu" style="color: #8f8f8f" alt></span>
                          {{ node.label }}
                        </span>
                   </span>
                </el-tree>
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
                            <span v-if="data.type==='0001'" class="el-icon-s-unfold" alt></span>
                             <span v-else class="el-icon-video-play" style="color: #8f8f8f" alt></span>
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
              isOpenClose:false,
              loading:true,
              data:null,
              dataDevice:null,
              bind:null,
              dataText:'',
              defaultProps: {
                  children: 'Subdirectory',
                  label: 'propertytyName'
              },
              defaultProps2: {
                  children: 'children',
                  label: 'macAddress'
              },
          }
        },
        computed:{
            iconClass(){
                if (this.isOpenClose){
                    return'el-icon-remove-outline'
                }
                    return 'el-icon-circle-plus-outline'
            }
        },
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
                            let dd = Object.assign({}, bindItem);

                            if (dd.nodeType){
                                let device = act2[0].children;
                                device.forEach(deviceItem=>{
                                    deviceItem['sing'] ='0040';
                                });
                            }
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
                        // console.log( act2)
                        this.getallbinds(act2);
                        this.dataDevice=act2;

                        if(this.dataDevice.length !==0){
                            this.loading = false;
                        }else if (this.dataDevice.length === 0) {
                            this.dataText = "暂无数据";
                        }
                    }
                })
            }
        },
        handleNodeClickOpen(){
            this.isOpenClose = true;
        },
        handleNodeClickClose(){
            this.isOpenClose = false;
        }

    }
</script>

<style scoped lang="scss">

    .topology-management-page{
        width: 100%;
        height: 100%;

            .row1{
                /*.el-icon-video-play{*/
                /*    color: #267ce1;*/
                /*}*/
            }

        .row2{
            ::v-deep {
                .el-tree-node__expand-icon+span::before {
                    display: inline-block;
                    vertical-align: bottom;
                    margin-bottom: -3px;
                    width:15px;
                }
                .el-tree-node__content{
                    .el-tree-node__expand-icon+span::before {
                        content:url("../../images/mechine.png");
                        margin-right: 5px;
                    }
                }
                .el-tree-node__children{
                    .el-tree-node__expand-icon+span::before {
                        content:url("../../images/mechine.png");

                        margin-right: 5px;
                    }
                }
            }
        }

    }
</style>