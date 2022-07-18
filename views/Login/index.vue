<template>
    <div>
        <el-card shadow="always" class="container">
            <h4 class="containertitle">系统登录</h4>
            <el-form label-width="80px" ref="login" :model="formData" :rules="rules">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="formData.userName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="formData.password"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" class="submitbtn" @click="login">登录</el-button>
        </el-card>
    </div>
</template>

<script>
import Mock from 'mockjs'
export default {
    name: 'Login',
    data() {
        return {
            formData: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true }
                ],
                password: [
                    { required: true }
                ]
            }
        }
    },
    methods: {
        login() {
            this.$refs.login.validate((valid) => {
                if (valid) {
                    // 使用mock生成token
                    const token = Mock.Random.guid()
                    // 为store中的token赋值
                    this.$store.commit('setToken', token)
                    // 跳转至首页
                    this.$router.push({
                        name: 'Home'
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
.containertitle {
    margin-bottom: 40px;
}

.container {
    width: 400px;
    height: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -80%);
    position: absolute;
    border-radius: 12px;
    text-align: center;
}

.submitbtn {
    margin-top: 20px;
}
</style>