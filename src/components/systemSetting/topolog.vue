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
                        default-expand-all
                        highlight-current=true
                        :expand-on-click-node="false"
                        @node-click="handleNodeClick"
                        style="width: 100%;">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>
                        <span v-if="data.uuid==0" class="el-icon-s-unfold" alt></span>
                        <span v-else class="el-icon-menu" style="color: #8f8f8f" alt></span>
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
                        :data="data2"
                        :props="defaultProps2"
                        default-expand-all
                        highlight-current=true
                        :expand-on-click-node="false"
                        @node-click="handleNodeClick"
                        style="width: 100%;">
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
                loading:true,
                data:null,
                data2:null,
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
        created(){
            this.getallbinds();
            this.getDeviceNodeTree();
        },

        methods:{
            getallbinds(){
                this.$http.get('organddevicenode/getallbinds', {}).then(response => {
                    if (response.body.status === 200) {
                        let bindArr= response.body.result;
                        this.show(bindArr);
                    }
                })
            },
            show(bindArr){
                this.dataText = ' ';
                this.$http.post(('propertyty/show'),{}).then(response=>{
                    if (response.status===200){
                        let showArr = JSON.parse(response.body.result);
                        this.findNode(showArr,bindArr);
                        this.data = showArr;
                        if(showArr.length !==0){
                            this.loading = false;
                        }else if (showArr.length === 0) {
                            this.dataText = "暂无数据";
                        }
                    }
                })

            },
            findNode(showArr, bindArr){
                showArr.forEach(item => {
                    let arr = []
                    bindArr.forEach(subItem => {
                        if(item.uuid && item.uuid === subItem.orgId){
                            let bb = Object.assign({}, subItem)
                            bb["propertytyName"] = bb.deviceMacAddress
                            arr.push(bb)
                        }
                    });
                    if(item.Subdirectory && item.Subdirectory.length>0){
                        let arr1 =  item.Subdirectory;
                        arr.forEach(arrItem=>{
                            arr1.push(arrItem)
                        });
                        // item.Subdirectory = item.Subdirectory.concat(arr);
                        //concat() 方法用于连接两个或多个数组,该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。
                        this.findNode(item.Subdirectory, bindArr);
                    }else{
                        item["Subdirectory"] = arr
                    }
                })
            },
            // findNode(showArr, bindArr){
            //     showArr.forEach(item => {
            //         let arr = []
            //         bindArr.forEach(subItem => {
            //             if(item.uuid && item.uuid === subItem.orgId){
            //                 let bb = Object.assign({}, subItem)
            //                 bb["propertytyName"] = bb.deviceMacAddress
            //                 arr.push(bb)
            //             }
            //         });
            //         if(item.Subdirectory && item.Subdirectory.length>0){
            //             item.Subdirectory.concat(arr)
            //             this.findNode(item.Subdirectory, bindArr)
            //         }else{
            //             item["Subdirectory"] = arr
            //         }
            //     })
            // },
            // findNode(act,it){
            //     let arr =[];
            //     act.forEach(item => {
            //         if (item.uuid === it.orgId){
            //             let dd = Object.assign({},it);
            //             dd['propertytyName'] = dd.deviceMacAddress;
            //             arr.push(dd);
            //             item['Subdirectory'] = arr;
            //             // console.log(item);
            //             return
            //         }else {
            //             if (Object.prototype.hasOwnProperty.call(item, "Subdirectory")){
            //                 this.findNode(item.Subdirectory,it)
            //             }
            //         }
            //     });
            // },
            getDeviceNodeTree(){
                this.dataText = ' ';
                this.$http.get(('devicenode/getDeviceNodeTree'),{}).then(response=>{
                    if (response.status===200){
                        let act2 = response.body.result;
                        this.data2=act2;
                        if(this.data2.length !==0){
                            this.loading = false;
                        }else if (this.data2.length === 0) {
                            this.dataText = "暂无数据";
                        }
                    }
                })
            }
        }

    }
</script>

<style scoped lang="scss">

    .topology-management-page{
        width: 100%;
        height: 100%;

        /*.row1{*/
        /*    ::v-deep{*/
        /*        .el-icon-caret-right:before {*/
        /*            content: "--";*/
        /*        }*/
        /*    }*/
        /*}*/

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