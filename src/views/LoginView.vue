<template>
  <div class="container">
    <section>
      <div class="login-box">
        <!-- 登录框左侧 -->
        <div class="login-left">
          <a href="/" title="CIT" class="logo">
            <img src="@/assets/img/foot-factory.png" alt="CIT" title="CIT" />
          </a>
          <div class="left-qrcode">
            <div id="qrcode" title="CIT">
              <canvas width="180" height="180" style="display: none"></canvas
              ><img src="@/assets/img/citlogo.jpeg" style="display: block" />
            </div>
            <div class="qrcode-text">扫码登录</div>
          </div>
          <div class="quick-login">快捷登录</div>
          <div class="qq-wx-wb">
            <div class="wx-login">
              <a href="/oauth/login/WECHAT_OPEN" title="微信登录"
                ><i class="fa fa-weixin"></i
              ></a>
            </div>
            <div class="qq-login">
              <a href="/oauth/login/qq" title="QQ登录"
                ><i class="fa fa-qq"></i
              ></a>
            </div>
            <div class="weibo-login">
              <a href="/oauth/login/weibo" title="微博登录"
                ><i class="fa fa-weibo"></i
              ></a>
            </div>
          </div>
        </div>
        <!-- 登录框右侧 -->
        <div class="login-right">
          <div class="login-form">
            <ul class="nav nav-tabs">
              <li
                v-for="item in loginTxt"
                :key="item.id"
                class="nav-items"
                :class="current == item.id ? 'actives' : ''"
                @click="loginChange(item.id)"
              >
                <a :class="current == item.id ? 'activess' : ''">{{
                  item.text
                }}</a>
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane fade show active" v-if="current == 1">
                <!-- 账号登录 -->
                <div class="tab-main">
                  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules">
                    <el-form-item class="login-user" prop="username">
                      <el-icon><avatar /></el-icon>
                      <el-input
                        v-model="ruleForm.username"
                        placeholder="请输入您的用户名"
                      />
                    </el-form-item>
                    <el-form-item class="login-password" prop="userpwd">
                      <el-icon><lock /></el-icon>
                      <el-input
                        type="password"
                        v-model="ruleForm.userpwd"
                        placeholder="请输入您的密码"
                      />
                    </el-form-item>
                    <el-form-item class="login-submit">
                      <el-button type="primary" @click="userBtn(ruleFormRef)"
                        >登录</el-button
                      >
                    </el-form-item>
                    <a class="forgetpwd">忘记密码？</a>
                    <div class="login-text">
                      登录即同意相关服务条款和隐私政策
                      <a>《小鹿线用户服务协议》</a><a>《小鹿线隐私政策》</a>
                      若您没有账号，系统将为您自动创建账号并登录。
                    </div>
                  </el-form>
                </div>
              </div>
              <div class="tab-pane fade" v-else>
                <!-- 短信登录 -->
                <div class="tab-main">
                  <el-form>
                    <el-form-item class="login-user" prop="phone">
                      <el-icon><avatar /></el-icon>
                      <el-input placeholder="请输入您的手机号" />
                    </el-form-item>

                    <el-form-item class="login-Verification" prop="captcha">
                      <el-input placeholder="请输入您的手机号" />
                      <el-button
                        class="btn btn-primary sendcaptcha"
                        type="primary"
                        >发送验证码</el-button
                      >
                    </el-form-item>
                    <div class="login-submit">
                      <el-button
                        class="btn btn-primary sendcaptcha"
                        type="primary"
                        >登录</el-button
                      >
                    </div>
                    <div class="login-text">
                      登录即同意相关服务条款和隐私政策
                      <a>《小鹿线用户服务协议》</a><a>《小鹿线隐私政策》</a>
                      若您没有账号，系统将为您自动创建账号并登录。
                    </div>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
//element-ui
import { Avatar, Lock, Iphone } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
//api
import { loginByJson } from '@/utils/api/api.js'
//pinia
import { useUserStore } from '@/store/user'
import router from '../router'
const userStore = useUserStore()

//账号登录和短信登录切换
let current = ref(1)
//账号登录和短信登录
let loginTxt = ref([
  { id: 1, text: '账号登录' },
  { id: 2, text: '短信登录' },
])
const loginChange = (id) => {
  current.value = id
}
//账号密码登录
const ruleFormRef = ref('')
let ruleForm = reactive({
  username: '',
  userpwd: '',
})
let rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 11, message: '请输入3-11位用户名', trigger: 'blur' },
  ],
  userpwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 11, message: '请输入3-11位密码', trigger: 'blur' },
  ],
})

//账号密码点击登录
const userBtn = (formEl) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      loginByJson({
        username: ruleForm.username,
        password: ruleForm.userpwd,
      }).then((res) => {
        //登录成功
        if (res.meta.success) {
          ElMessage({
            showClose: true,
            message: '登录成功',
            type: 'success',
          })
          console.log('登录成功')
          userStore.setToken(res.data.accessToken)
          router.push('/')
        } else {
          ElMessage({
            showClose: true,
            message: res.meta.msg,
            type: 'warning',
          })
        }
      })
    } else {
      ElMessage({
        showClose: true,
        message: '请输入正确格式',
        type: 'warning',
      })
    }
  })
}
</script>

<style scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  /* background: url(../assets/img/citlogo.jpeg) no-repeat center; */
}
section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  z-index: 10;
}
.login-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 950px;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  box-shadow: 0px 0px 5px #777;
}
.login-left {
  width: 475px;
  height: 500px;
  background: #388fff;
}
.login-right {
  position: relative;
  width: 475px;
  height: 500px;
  background: url(../assets/img/citlogo.jpeg) no-repeat center center;
}

.nav-tabs {
  border-bottom: none;
}
.login-form {
  padding: 10px 40px;
  width: 350px;
  height: 440px;
  background: #ffffff;
  box-shadow: 0 0 8px #cccccc;
  border-radius: 8px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.nav-tabs {
  display: flex;
  justify-content: space-between;
  text-align: center;
}
.nav-tabs li {
  width: 40%;
  padding: 0px 0;
  font-size: 17px;
  font-weight: bold;
}
.nav-tabs li a {
  color: #333;
  display: block;
  height: 45px;
  line-height: 45px;
}
.actives {
  color: #388eff;
  border-bottom: 4px solid #388eff;
}
.activess {
  color: #388eff !important;
}
.nav-tabs li a:hover {
  text-decoration: none;
}
.tab-main {
  height: 360px;
  padding: 1px 0 0 0;
}
.login-user {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #666;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-user i {
  font-size: 18px;
  color: #666;
  margin-left: 5px;
}
.login-user input {
  width: calc(100% - 30px);
  height: 35px;
  outline: none;
  color: #666666;
  border: 0;
  padding: 0 5px;
}
.login-password {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #666;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-password i {
  font-size: 18px;
  color: #666;
  margin-left: 5px;
}
.login-password input {
  width: calc(100% - 30px);
  height: 35px;
  outline: none;
  color: #666666;
  border: 0;
  padding: 0 5px;
}
.login-Verification {
  width: 100%;
  height: 40px;
  margin-top: 30px;
  border-bottom: 1px solid #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-Verification .captcha {
  width: 130px;
  height: 35px;
  outline: none;
  color: #666666;
  border: none;
}
.login-Verification .sendcaptcha {
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 20px;
}
.login-submit {
  width: 100%;
  height: 40px;
  margin-top: 30px;
  display: flex;
  align-items: center;
}
.login-submit button {
  width: 100%;
  height: 35px;
  outline: none;
  border: none;
  letter-spacing: 5px;
  border-radius: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}
.forgetpwd {
  float: right;
  color: #888;
}
.login-text {
  width: 100%;
  margin-top: 50px;
  color: #666;
  text-align: justify;
}
.login-left {
  padding: 20px;
}
.login-left .logo img {
  width: 120px;
}
.left-qrcode {
  width: 200px;
  margin: 30px auto 0 auto;
}
.left-qrcode #qrcode {
  width: 200px;
  height: 200px;
  padding: 10px;
  background: #ffffff;
}
.left-qrcode #qrcode img {
  width: 100% !important;
  height: 100% !important;
}
.login-left .qrcode-text {
  text-align: center;
  color: white;
  line-height: 35px;
  margin-top: 10px;
}
.quick-login {
  text-align: center;
  margin: 20px 0;
  color: #dddddd;
  position: relative;
}
.quick-login:before {
  content: '';
  width: 80px;
  height: 1px;
  background: #dddddd;
  position: absolute;
  left: 100px;
  top: 50%;
}
.quick-login:after {
  content: '';
  width: 80px;
  height: 1px;
  background: #dddddd;
  position: absolute;
  right: 100px;
  top: 50%;
}
.qq-wx-wb {
  width: 180px;
  height: 55px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.qq-wx-wb .qq-login {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  font-size: 18px;
  text-align: center;
  line-height: 30px;
  background: #e5ffe1;
}
.qq-wx-wb .qq-login a {
  color: #368afe;
}
.qq-wx-wb .wx-login {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  font-size: 18px;
  text-align: center;
  line-height: 30px;
  background: #e5ffe1;
}
.qq-wx-wb .wx-login a {
  color: #09bb07;
}
.qq-wx-wb .weibo-login {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  font-size: 18px;
  text-align: center;
  line-height: 30px;
  background: #e5ffe1;
}
.qq-wx-wb .weibo-login a {
  color: #d81e06;
}
:deep .el-form-item__content {
  flex-wrap: nowrap;
}
:deep .el-input__wrapper {
  border: none !important;
  box-shadow: none !important;
}
:deep .el-input__inner {
  border: none !important;
  box-shadow: none !important;
}
:deep .el-select {
  --el-select-input-focus-border-color: transparent;
}
:deep .el-form-item__error {
  top: 120%;
}
</style>
