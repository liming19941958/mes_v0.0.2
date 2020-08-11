<template>
    <div>
        <el-tab-pane label="PC可操作权限" name="second">
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
        </el-tab-pane>
    </div>
</template>

<script>
    export default {
        name: "pcRole"
    }
</script>

<style scoped>

</style>