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
                                position: relative">+ 添加节点
                    </el-button>
                </div>

            </el-col>
            <el-col style="width: 100%;height: 90%;"></el-col>
        </el-row>

        <el-row style="flex: 2;min-width: 120px;background-color: #ecf3f0;display:flex; justify-content:center; align-items:center;">
            <div style="width: 80px;height: 70%;">
                <div style="margin-bottom:120%;width: 80px;height: 35px;border:1px solid #b1b1b1;background-color: #ffffff;line-height: 35px;text-align: center">
                    <i class="el-icon-back" style="margin-right: 10px;"></i>
                    555
                </div>
                <div style="margin-bottom:120%;width: 80px;height: 35px;background-color: #20ff2f;">555</div>
                <div style="margin-bottom:120%;width: 80px;height: 35px;background-color: #20ff2f;">555</div>
                <div style="margin-bottom:120%;width: 80px;height: 35px;background-color: #20ff2f;">555</div>
            </div>

        </el-row>
        <el-row style="flex: 4;min-width: 310px;">
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

    .topology-management-page{

        width: 100%;
        height: 100%;

    }
</style>