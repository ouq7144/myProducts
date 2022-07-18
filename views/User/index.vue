<template>
    <div>
        <div class="header">
            <el-button type="primary" @click="addNew">+新增</el-button>
            <div class="search">
                <el-input placeholder="请输入内容" v-model="searchMsg">
                    <i slot="suffix" class="el-input__icon el-icon-circle-close" @click="clearInput" style="cursor: pointer;"></i>
                </el-input>
                <el-button type="primary" class="searchbtn" @click="searchSomeOne">搜索</el-button>
            </div>
        </div>
        <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" stripe
            style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180px">
            </el-table-column>
            <el-table-column prop="sex" label="性别" :formatter="sexFormate" width="180px">
            </el-table-column>
            <el-table-column prop="birth" label="出生日期" width="220px">
            </el-table-column>
            <el-table-column prop="addr" label="地址">
            </el-table-column>
            <el-table-column prop="" label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" plain @click="edit(scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini" plain @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page.sync="currentPage2" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                layout="sizes, prev, pager, next" :total="total">
            </el-pagination>
        </div>
        <common-dialog :dialogVisible="dialogVisible" @closeDialog="closeDialog" :formData="formData"
            :formType="formType" v-if="dialogVisible" @updateUserData="updateUserData">
        </common-dialog>
    </div>
</template>

<script>
import CommonDialog from '@/components/CommonDialog.vue'
export default {
    name: 'User',
    components: { CommonDialog },
    data() {
        return {
            searchMsg: '',
            updateData: false,
            formType: 'add',
            formData: {},
            dialogVisible: false,
            userName: '',
            userAge: '',
            radio: 1,
            value1: '',
            userAddr: '',
            tableData: [],
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,
            currentPage: 1,
            total: 0,
            pageSize: 10
        }
    },
    methods: {
        // 关闭弹窗
        closeDialog() {
            this.dialogVisible = false
            // this.$router.go(0)
        },
        // 性别数据格式化
        sexFormate(row) {
            return row.sex === 0 ? '男' : '女'
        },
        // 关闭新增弹窗并刷新数据
        updateUserData() {
            this.getData()
            // this.$router.go(0)
            this.dialogVisible = false
        },
        // 清空搜索框内容
        clearInput() {
            this.searchMsg = ''
        },
        // 获取表格数据
        getData() {
            this.$http.get('/user/getTableData').then(res => {
                console.log(res.data)
                if (res.data.code === 20000) {
                    this.total = res.data.data.tableData.length
                    console.log(this.total, 'total')
                    console.log(this.pageSize, 'pageSize')
                    console.log(this.currentPage, 'currentPage')
                    this.tableData = res.data.data.tableData
                }
            })
        },
        // 新增用户
        addNew() {
            this.formType = 'add'
            this.formData = {
                name: '',
                birth: '',
                sex: '',
                addr: ''
            }
            this.dialogVisible = true
        },
        // 编辑用户
        edit(row) {
            this.formType = 'edit'
            this.formData = row
            console.log(row)
            this.dialogVisible = true
        },
        // 删除用户
        del(row) {
            console.log(row)
            this.$confirm(`确定要删除用户 ${row.name} 吗?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.post('/user/deleteUser', row.id).then(res => {
                    this.searchSomeOne()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                })
            }).catch(() => {})
        },
        // 搜索用户
        searchSomeOne() {
            if (!this.searchMsg) {
                this.getData()
            } else {
                this.$http.post('/user/searchUser', this.searchMsg).then(res => {
                    const results = res.data.data.searchResults
                    this.tableData = results
                })
            }
        },
        handleSizeChange(val) {
            this.pageSize = val
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val
            console.log(`当前页: ${val}`);
        }
    },
    created() {
        this.getData()
    }
}
</script>

<style scoped>
.header {
    height: 60px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.search {
    display: flex;
}

.searchbtn {
    margin-left: 20px;
}

.block {
    background: #fff;
    text-align: right;
}
</style>