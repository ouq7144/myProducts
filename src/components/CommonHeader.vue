<template>
    <div>
        <el-header>
            <div class="left-content">
                <el-button size="small" @click="collaspe">
                    <i class="el-icon-menu"></i>
                </el-button>
                <el-breadcrumb separator="/" class="breadcrumbs">
                    <el-breadcrumb-item class="curPosition">首页</el-breadcrumb-item>
                    <el-breadcrumb-item v-show="this.$route.meta.label !== '首页' && this.$route.meta.index === 2" class="curPosition">{{this.$route.meta.label}}</el-breadcrumb-item>
                    <el-breadcrumb-item v-show="this.$route.meta.index === 3" class="curPosition">其他</el-breadcrumb-item>
                    <el-breadcrumb-item v-show="this.$route.meta.label !== '首页' && this.$route.meta.index === 3" class="curPosition">{{this.$route.meta.label}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-dropdown trigger="click" placement="bottom">
                <!-- <span class="el-dropdown-link">
                            下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                        </span> -->
                <img src="../../resources/userImg.jpg" alt="" class="userImg">
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人信息</el-dropdown-item>
                    <el-dropdown-item @click.native="quit">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-header>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        // 折叠菜单
        collaspe() {
            this.$store.commit('collapseMenu')
        },
        // 退出登录
        quit() {
            this.$store.commit('clearToken')
            this.$router.push({name: 'Login'})
        }
    }
}
</script>

<style scoped>
.el-header {
    background-color: rgb(51, 51, 51);
    color: #fff;
    line-height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.left-content {
    display: flex;
    align-items: center;
}
.breadcrumbs {
    margin-left: 20px;
}
.curPosition>>>.el-breadcrumb__inner {
    color: #fff;
}

.curPosition>>>.el-breadcrumb__inner:hover {
    color: skyblue;
}

.userImg {
    width: 50px;
    height: 50px;
    vertical-align: middle;
    border-radius: 50%;
    cursor: pointer;
}
</style>