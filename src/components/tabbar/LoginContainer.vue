<template>
    <div class="login-page">
        <div class="f-login-container">
            <div class="f-logo">
                <h1>智能工厂系统</h1>
            </div>
            <div class="ant-form ant-form-horizontal f-login-form">
                <form action="http://192.168.1.124:8090/#/home" >
                    <div class="f-logo-input">
                        <div class="login-account-number">
                            <i class="el-icon-user"></i>
                            <input type="text" v-model="username" class="login-input" placeholder="登录名/手机/邮箱">
                        </div>
                        <div class="login-account-password">
                            <i class="el-icon-lock"></i>
                            <input type="text" v-model="password" class="login-password" placeholder="请输入密码">
                        </div>
                        <el-row class="login-btn-row">
                            <el-button type="primary submit" round class="login-btn" @click="login()" >登录</el-button>
                        </el-row>
                    </div>
                </form>
            </div>

            <div class="f-bottom-mes">
                <p class="f-version">物联微电子有限公司</p>
                <p class="f-version">版本：0.0.1</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                username:'',
                password:''
            }
        },
        // created(){
        //     login();
        // },
        methods:{

            login(){

                // var a=this.username;
                // var b = this.password;
                if(this.username==='admin'&& this.password==='123456'){
                        alert('登录成功')
                }else {
                    alert('登录失败')
                }
            }
        }
    }
</script>

<style scoped lang="scss">
.login-page {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: url("../../images/loginbg.jpg") no-repeat 100%;
    .f-bottom-mes{
        margin-top: 200px;
    }
    .f-login-container{
        width: 800px;
        height: 500px;
        margin: 150px auto;
        color: #ffffff;
        text-align: center;
        h1{
            font-size: 70px;
        }
        .f-login-form{
            padding:32px;
            margin: 90px auto;
            width: 675px;
            height: 100px;
            color: rgba(0, 0, 0, 0.60);
            background-color:rgba(255, 255, 255, 0.4);
            .f-logo-input{
                position: relative;
                padding:0 5px;
                margin: auto;
                width: 610px;
                height: 36px;
                .login-account-number{float: left;
                    width: 230px;
                    height: 100%;
                    border:1px solid #dad9d9;
                    border-radius: 10px;
                    background-color: #fff;
                    i{
                        color: rgba(2, 2, 2,0.8);
                    }
                    .login-input{
                        margin-left: 3px;
                        width: 200px;
                        height: 100%;
                        outline:none;
                        border:none;
                    }
                }
                .login-account-password{
                    margin-left: 20px;
                    float: left;
                    width: 230px;
                    height: 100%;
                    border:1px solid #dad9d9;
                    border-radius: 10px;
                    background-color: #fff;
                    i{
                        color: rgba(2, 2, 2,0.8);
                    }
                    .login-password{
                        margin-left: 3px;
                        width: 200px;
                        height: 100%;
                        outline:none;
                        border:none;
                    }
                }
                .login-btn-row{
                    position: absolute;
                    top:0;
                    right:5px;
                    width: 100px;
                }
                .login-btn{
                    width: 100px;
                    height: 100%;
                }
            }
        }
    }
}

</style>