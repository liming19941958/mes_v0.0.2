<template>
    <div class="container2">
        <div class="editForm">
            添加班别
        </div>
        <div class="tableForm"></div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){

        },
        methods:{

        }
    }
</script>

<style scoped lang="scss">
        .container2 {
            position: relative;
            width: 100%;
            height: 100%;
            border-bottom: 1px solid #acacac;
            background-color: #b2e2ff;
            overflow-y: scroll;
            .editForm{
                position: relative;
                width: 100%;
                height: 40px;
                line-height: 40px;
                padding-left: 10px;
                background-color: #4eff65;
            }
            .tableForm{
                position: relative;
                width: 100%;
                height: 60%;
                min-height: 500px;
                background-color: #ffdc5f;
            }
        }
</style>