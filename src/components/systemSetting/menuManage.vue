<template>
    <div class="menuPage">
        <el-tabs v-model="activeName">
            <el-tab-pane label="PC菜单" name="first">
                <pcMenu></pcMenu>
            </el-tab-pane>
            <el-tab-pane label="APP菜单" name="second">
                <component :is="'appMenu'"></component>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import pcMenu from './menutab/pcMenu'
    import appMenu from './menutab/appMenu'

    export default {
        name: "menuManage",
        data() {
            return {
                activeName: 'first',
            }
        },
        components: {
            pcMenu,
            appMenu
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
    .menuPage {
        position: relative;
        width: 100%;
        height: 100%;

    }
</style>
