<template>
    <el-aside :width="isCollapse ? '80px' : '200px'">
        <div class="aside-title">{{asideTitle}}</div>
        <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
            <el-menu-item v-for="item in noChildren" :index="item.path + ''" :key="item.path + ''" @click="clickMenu(item)">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>
            <el-submenu v-for="item in hasChildren" :index="item.path + ''" :key="item.path + ''">
                <template slot="title">
                    <i :class="'el-icon-' + item.icon"></i>
                    <span slot="title">{{ item.label }}</span>
                </template>
                <el-menu-item-group v-for="children in item.children" :index="children.path + ''" :key="children.path + ''">
                    <el-menu-item :index="children.path + ''" @click="clickMenu(children)">
                        <i :class="'el-icon-' + children.icon"></i>
                        <span slot="title">{{ children.label }}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
export default {
    data() {
        return {
            menu: [
                {
                    path: '/',
                    name: 'Home',
                    label: '首页',
                    icon: 's-home',
                    url: 'Home/Home'
                },
                {
                    path: '/Mall',
                    name: 'Mall',
                    label: '商品管理',
                    icon: 'video-play',
                    url: 'MallManage/MallManage'
                },
                {
                    path: '/User',
                    name: 'User',
                    label: '用户管理',
                    icon: 'user',
                    url: 'UserManage/UserManage'
                },
                {
                    label: '其他',
                    icon: 'location',
                    children: [
                        {
                            path: '/Other/PageOne',
                            name: 'PageOne',
                            label: '页面1',
                            icon: 'setting',
                            url: 'PageOne'
                        },
                        {
                            path: '/Other/PageTwo',
                            name: 'PageTwo',
                            label: '页面2',
                            icon: 'setting',
                            url: 'PageTwo'
                        }
                    ]
                }
            ]
        }
    },
    computed: {
        // 一级菜单
        noChildren() {
            return this.menu.filter(item => !item.children)
        },
        // 二级菜单
        hasChildren() {
            return this.menu.filter(item => item.children)
        },
        // 是否折叠菜单
        isCollapse() {
            return this.$store.state.tab.isCollapse
        },
        // 侧栏标题
        asideTitle() {
            return this.isCollapse ? '后台' : '通用后台管理系统'
        }
    },
    methods: {
        clickMenu(item) {
            this.$router.push({
                name: item.name
            })
        }
    }
}
</script>

<style scoped>
.aside-title {
    height: 56px;
    line-height: 56px;
    text-align: center;
}

.el-aside {
    background-color: rgb(84, 92, 101);
    color: #fff;
    /* text-align: center; */
    line-height: 200px;
}

.el-menu {
    border-right: unset;
}
</style>