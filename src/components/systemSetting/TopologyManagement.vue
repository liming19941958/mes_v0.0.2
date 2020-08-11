<template>
    <div class="topology-management-page" style="display: flex;width: 100%;height: 100%;">
<!--        row为横向布局-->
        <el-row style="flex: 2;background-color: #7fff35;">

        </el-row>
        <el-row style="flex: 8;background-color: #ff411d;">
            <div style="width: 80px;height: 80px;background-color: #20ff2f;float: right"></div>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "home-contain"
    }
</script>

<style scoped>
    *{
        padding: 0;
        margin: 0;
    }
    .topology-management-page{
        font-size: 50px;
        color: red;
        width: 100%;
        height: 100%;
        background-color: #effff3;
    }
</style>