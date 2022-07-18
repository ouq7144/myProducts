<template>
    <div>
        <el-dialog :title="formTitle" :visible.sync="dialogVisible" width="30%" :show-close="false">
            <el-form ref="commonform1" :model="copyData" label-width="80px" class="commonform" :rules="rules">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="copyData.name" style="width: 220px"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <template>
                        <el-radio v-model="copyData.sex" :label=0>男</el-radio>
                        <el-radio v-model="copyData.sex" :label=1>女</el-radio>
                    </template>
                </el-form-item>
                <el-form-item label="家庭住址" prop="addr">
                    <el-input type="textarea" autosize v-model="copyData.addr" style="width: 220px"></el-input>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker v-model="copyData.birth" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="handleSubmit()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

export default {
    data() {
        return {
            copyData: JSON.parse(JSON.stringify(this.formData)),
            rules: {
                name: [
                    { required: true }
                ],
                sex: [
                    { required: true }
                ],
                age: [
                    { required: true }
                ],
                addr: [
                    { required: true }
                ],
                birth: [
                    { required: true }
                ]
            }
        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        formType: {
            type: String,
            default: 'add'
        },
        formData: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        handleCancel() {
            this.$emit('closeDialog', false)
        },
        handleSubmit() {
            if (this.formType === 'add') 
            {
                this.$refs.commonform1.validate((valid) => {
                if (valid) {
                    this.$http.post('/user/createUser', this.copyData).then(res => {
                    })
                    this.copyData = {}
                    this.$emit('updateUserData', false)
                    this.$message({
                    type: 'success',
                    message: '新增成功!'
                });
                } else {
                    return false
                }
            })
            } else if (this.formType === 'edit') {
                this.$refs.commonform1.validate((valid) => {
                if (valid) {
                    this.$http.post('/user/updateUser', this.copyData).then(res => {
                    })
                    this.copyData = {}
                    this.$emit('updateUserData', false)
                    this.$message({
                    type: 'success',
                    message: '编辑成功!'
                });
                } else {
                    return false
                }
            })
            }
        }
    },
    created() {
        console.log(this.copyData, '我是数据')
    },
    computed: {
        formTitle() {
            return this.formType === 'add' ? '新增用户' : '修改用户'
        }
    }
}
</script>

<style scoped>
.commonform {
    text-align: left;
}
</style>