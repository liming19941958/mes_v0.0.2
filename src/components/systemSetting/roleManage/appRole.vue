<template>
    <div class="role-management">
        <div class="roles-menu-table">
            <div class="role-menu">
                <div class="roleList">
                    <span>角色列表</span>
                    <span>
                                 <i class="el-icon-refresh-right"></i>
                    </span>
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

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pcRole",
        data(){
            return{
                data:null,
                defaultProps: {
                    children: 'Subdirectory',
                    label: 'name'
                },
            }
        },
        created(){
            this.show();
        },
        methods:{
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
        }
    }
</script>

<style scoped lang="scss">
    .role-management{
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #effff3;

        .roles-menu-table{
            display: flex;
            height: 95vh;
            width: 100%;
            .role-menu{
                position: relative;
                display: inline-block;
                float: left;
                height: 100%;
                width: 15%;
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