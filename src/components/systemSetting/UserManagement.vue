<template>
    <div class="user-management-page">
        <el-row style="flex: 1.5;position: relative;border-right: 1px solid #cacaca">
            <el-col
               style="height: 5%;width:100%;
              position:
                relative;text-align: center;padding: 15px 0;
                 border-bottom: 1px solid #cacaca">组织架构</el-col>
            <el-col style="height: 95%;width:100%;position: relative"></el-col>
        </el-row>
        <el-row style="flex: 8.5;"></el-row>
    </div>
</template>

<script>
    export default {
        name: "UserManagement"
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