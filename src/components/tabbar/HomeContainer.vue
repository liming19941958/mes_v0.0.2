<template>
    <div class="Home-page">
        <div class="welcome">
            <h1>欢迎访问！</h1>
            <div class="Home-page-menu">
                <el-dropdown class="menu">

                    <el-button type="primary" class="btn-icon">
                        <i class="el-icon-s-custom"></i>
<!--                        <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>黄金糕</el-dropdown-item>
                        <el-dropdown-item>狮子头</el-dropdown-item>
                        <el-dropdown-item>螺蛳粉</el-dropdown-item>
                        <el-dropdown-item>修改密码</el-dropdown-item>
                        <router-link to="/LoginPage">
                            <el-dropdown-item >退出登录</el-dropdown-item>
                        </router-link>

                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        // name: "home",
        data(){
            return {
            }
        },
        methods:{

        }
    }
</script>

<style  lang="scss" scoped>
    a:link{
        text-decoration:none;
    }
    a:visited{
        text-decoration:none; /*指已经访问过的链接*/
    }
    a:hover{
        text-decoration:none;/*指鼠标在链接*/
    }
    a:active{
        text-decoration:none;/* 指正在点的链接*/}
    .Home-page{
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #efffed;
        .welcome{
            width: 500px;
            height: 18px;
            margin: 0 auto;

            color: #ff0312;
        }
        .Home-page-menu{
            text-align: center;
            position: absolute;
            right: 10px;
            top: 10px;
            .el-icon--right {
                 margin-left: 0;
            }
            .el-icon-s-custom{
                font-size: 37px;
                margin-left: -9px;
            }
            .el-button--primary {
                width: 60px;
                height: 60px;
                border-radius: 50%;
            }

        }
    }
</style>