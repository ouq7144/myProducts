<template>
    <div>
        <el-container collapse-transition="false">
            <common-aside :isCollapse="isCollapse"></common-aside>
            <el-container>
                <el-header style="height: 0px;"></el-header>
                <common-header></common-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue'
import CommonHeader from '@/components/CommonHeader.vue'
export default {
    name: 'Home',
    components: { CommonAside, CommonHeader },
    data() {
        return {
            isCollapse: false
        }
    },
    methods: {
    }
}
</script>

<style scoped>
.el-container {
    height: 100vh;
}
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
</style>
