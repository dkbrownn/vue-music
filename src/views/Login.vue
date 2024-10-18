<script setup>
// git测试
const isCheck = ref('')
const loginIcon = ref(false)
const phoneNumber = ref('')
const isPass = reactive({
  show: false,
  msg: ''
})
const timer = ref(60)
const buttonInfo = ref('登录')
const toLogin = ref(true)
let stop
//修改buttonInfo 
const changeButtonInfo = () =>{
  buttonInfo.value = '验证码登录'
}
//校验逻辑
const checkInput = (str) => {
  if (str.length !== 11) {
    return false
  }
  let number = parseInt(str, 10)
  return number.toString().length === 11
}
// 校验号码是否正确
const handleLogin = () => {
  if (checkInput(phoneNumber.value)) {
    isPass.show = true
    isPass.msg = '登陆成功' 
  } else {
    isPass.show = true
    isPass.msg = '请输入正确号码'
  }
  toLogin.value = false
  setTimeout(() => {
    isPass.show = false
    isPass.msg = ''
  }, 3000)
   stop = setInterval(() => {
    timer.value--
    if (timer.value == 0) {
      clearInterval(stop)
    }
  },1000)
}
//返回login
const backToLogin = () => {
  toLogin.value = true
  clearInterval(stop)
  timer.value = 60
}
</script>

<template>
<div class="wrapper">
  <div class="guest" @click="$router.push('/')">
    立即体验
  </div>
  <div class="music-icon"></div>
  <transition name="login" mode="out-in">
    <div class="login" v-if="toLogin" key="first">
      <div class="login-phone">
        <i>+86</i>
        <input placeholder="输入手机号" v-model="phoneNumber" @input="changeButtonInfo"/>
      </div>
      <button class="login-button" @click="handleLogin">{{buttonInfo}}</button>
      <div class="login-txt">
        <input type="checkbox" v-model="isCheck"/>
        <span>我已阅读并同意</span> <span class="blue">《服务条款》</span><span  class="blue">《隐私政策》</span>
      </div>
    </div>
    <div v-else class="captcha">
      <div class="login-phone">
        <!-- <div class="msg">已向{{ phoneNumber }}</div> -->
        <input placeholder="输入验证码"/>
        <div class="time">{{timer}}s</div>
      </div>
      <div class="back" @click="backToLogin">
        <span><-</span>
      </div>
    </div>
  </transition> 
  <div class="toast" v-show="isPass.show">{{isPass.msg}}</div>
  <div class="login-info">
    <div class="other-login" v-show="loginIcon">
      <img class="wechat" src="/public/tencent wechat.svg.png">
      <img class="qq" src="/public/tencent QQ.svg.png">
      <img class="weibo" src="/public/sina weibo.svg.png">
      <img class="neatse" src="/public/NetEase music.svg.png">
    </div>
    <span class="login-info-problem">登陆遇到问题 </span>
    <span class="login-info-way" @click="loginIcon = true"
    v-show="!loginIcon"
    > | 其他登录方式 ></span>
  </div>
</div>
</template>

<style scoped lang='scss'>
.wrapper {
  position: absolute;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background-color: #fbfbfb;
  font-size:13Px;
  color:#ccced5;
  padding:15Px;
  font-family: Roboto, sans-serif;
  .guest {
    text-align: end;
  }
  .toast {
    position: absolute;
    bottom: 15%;
    left: 50%;
    transform: translateX(-50%);
    z-index:100;
  }
  .music-icon {
    position: absolute;
    top:21%;
    left: 50%;
    transform: translateX(-50%);
    height: 69Px;
    width: 69Px;
    border-radius: 50%;
    text-align: center;
    background-image: url(/public/icon_logo.png);
    background-size: cover;
  }
  .login {
    position: absolute;
    top:50%;
    height: 150Px;
    left: 0;
    right: 0;
    //transform: translateY(100Px);
    //transition: all .5s;
    &-phone {
      height: 41Px;
      width: 61%;
      margin: 0 auto;
      background-color: #ccced5;
      border-radius: 15Px;
      display: flex;
      align-items: center;
      i {
        color: #1a1a1c;
        font-size: 15Px;
        padding:15Px;
      }
      input {
        flex:1;
        height: 50%;
        padding:0 15Px;
        border:none;
        border-left: 1Px solid #9a9ca3;
        outline: none;
        background-color: transparent;
        font-size: 15Px;
        font-weight: 500;
      }
    }
    &-button {
      display: block;
      width: 61%;
      margin: 0 auto;
      margin-top: 25Px;
      line-height: 41Px;
      font-size: 17Px;
      background-color: #f83937;
      border:none;
      border-radius: 15Px;
      color:#fbfbfb;
    }
    &-txt {
      display: flex;
      padding-top: 25Px;
      align-items:flex-end;
      justify-content: center;
      font-size: 11Px;
      input {
        margin:0 5Px 0 0;
      }
      .blue {
        color: rgb(17, 121, 209);
      }
    }
  }
  //此处css复用了兄弟元素的css样式
  .captcha {
    position: absolute;
    top:50%;
    width: 100%;
    transform: translateY(-100Px);
    input {
      padding: 0 0 0 15Px;
      border:none;
    }
    .back {
      width: 36Px;
      height: 36Px;
      font-size: 36Px;
      line-height: 36Px;
      color:#fff;
      background-color: #9a9ca3;
      border-radius: 50%;
      text-align: center;
      margin:15Px auto;
    }
    .msg {
      position: absolute;
      top:-25Px;
    }
    .time {
      color:#1a1a1c;
      padding: 0 5Px;
    }
  }
  .login-button:active {
    box-shadow: 1.5Px 2.5Px #a77c7b;
  }
  .login-info {
    position: absolute;
    bottom: 15Px;
    left:50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 13Px;
    text-align: center;
    .other-login {
      display: flex;
      justify-content: space-around;
      padding-bottom:15Px;
      width: 200Px;
      img {
        object-fit: contain;
        height: 21Px;
        width: 21Px;
        padding:5Px;
        background-color: #9a9ca3;
        border-radius: 50%;
      }
      .wechat {

      }
      .qq {
        color:#22a2f9;
      }
      .weibo {

      }
      .neatse {

      }
    }
    &-problem {
      transition: all .5s;
    }
  }
}
.login-enter-active, .login-leave-active {
  transition: all .9s;
  .login-button {
    transition: all  .9s;
  }
}
.login-enter-from {
  transform: translateY(-100Px);
  //opacity: 0;
  .login-button {
    width: 0;
    font-size: 0;
    height: 0;
  }
}
.login-enter-to {
  
}
.login-leave-to {
  transform: translateY(-100Px);
  //opacity: 0;
  .login-button {
    width: 0;
     font-size: 0;
  }
}
</style>