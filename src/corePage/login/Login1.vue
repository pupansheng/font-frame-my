<template >
  <div class="content">


    <div class="container" @mouseup="mouseU">
      <h1>登录</h1>
      <form action="">
        <input class="tbx" type="text" placeholder="用户名">
        <input class="tbx" type="password" placeholder="密码">
        <input class="sub" type="submit" value="登录">
      </form>
    </div>


  </div>

 <!-- <div class="content">


    <div  v-bind:class="{ 'middle': isActive,'middle-flip':!isActive, 'mainbody': true }" >

      <form class="form-box front">
        <div>
          <h1>管理系统</h1>
        </div>
        <div>
          <el-form :model="user" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item style="width: 350px" label="用户名" prop="name">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" style="width: 350px" prop="password">
              <el-input type="password" v-model="user.password"></el-input>
            </el-form-item>
          </el-form>
          <button style="margin-left: 170px" class="btn-submit" @click="login" ref="login" type="submit">
          登录
        </button>
        </div>
        <div>
          <p style="margin-top: 40px">如果你没有账号？请</p>
          <p>点击这里<a id="signin" @click="sign">注册</a></p>
        </div>
      </form>
      &lt;!&ndash; 对的你没看错，上下两个表单基本上没区别，一个front，一个back &ndash;&gt;
      <form class="form-box back">
        <div>
          <h1>注册</h1>
        </div>
        <div style="display: flex;flex-direction: column;justify-content: center">

          <div style="display: flex;justify-content: center">

          <el-form :model="user" :rules="rules"   ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item style="width: 350px" label="用户名" prop="name">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" style="width: 350px" prop="password">
              <el-input type="password" v-model="user.password"></el-input>
            </el-form-item>
            <el-form-item label="电话" style="width: 350px" prop="phone">
              <el-input type="password" v-model="user.phone"></el-input>
            </el-form-item>
          </el-form>
          </div>

          <button  class="btn-submit" @click="register" ref="register" type="submit">
            注册
          </button>

        </div>
        <div>
          <p style="margin-top: 40px">已经有一个账号了？你可以</p>
          <p>点击这里 <a id="login" @click="login2">登录</a></p>
        </div>
      </form>
    </div>

  </div>-->

<!--  <div class="content2">
   <div class="content">

       <h1 class="head">登录</h1>
       <div class="form">

         <el-form :model="user" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
           <el-form-item label="用户名" prop="name">
             <el-input v-model="user.name"></el-input>
           </el-form-item>
           <el-form-item label="密码" prop="password">
             <el-input type="password" v-model="user.password"></el-input>
           </el-form-item>
           <el-form-item >
             <el-button type="primary" @click="login" :loading="load">登录</el-button>
           </el-form-item>
         </el-form>

       </div>



   </div>
  </div>-->
</template>

<script>
  import API from "./lib/API";
    export default {
    name: "PersonProfile",
    data(){
      return {
         user:{
          name:'',
           password:''
         },
        isActive:true,
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },

        load:false,
        isIn:true,  //鼠标进去的门，默认打开
        isOut:false
      }
    },
    methods:{
      mouseU(e){




      },
      sign(){

       this.isActive=false;

      },
      login2(){

       this.isActive=true

      },
      register(){



      },
      login(){

        const  that=this;
        this.$refs['ruleForm'].validate((valid) => {

          if (valid) {
            that.load=true;
            that.$store.dispatch('login',that.user).then(res=>{

              this.$router.push("/")

            },err=>{


              that.load=false;

            })

          } else {

            return false;
          }
        });



      }


    }

    }
</script>

<style scoped lang="scss">
  @import "../../projectCommon/style/common.scss";

  .content{
    /*颜色这个看个人喜好*/
   // background: darkolivegreen;
    /*字体这个看个人喜好*/
  //  font-family: sans-serif;
    height: 100%;
    margin: 0;
    padding: 0;
    /* 伸缩盒子模型 */
    display: flex;
    /* 下面两个属性让body里的子类居中 */
    justify-content: center;
    align-items: center;
    background-color: #2c3e50;
    }


</style>
<style scoped>



  *{
    margin: 0;
    padding: 0;
  }
  body{
    /* 设置窗口的高度为100%的窗口高度 */
    height: 100vh;
    /* 伸缩盒子模型 */
    display: flex;
    /* 下面两个属性让body里的子类居中 */
    justify-content: center;
    align-items: center;
    background-color: #2c3e50;
  }
  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 300px;
    height: 450px;
    border-radius: 20px;
    background-color: #34495e;
    box-shadow: 15px 15px 10px rgba(33,45,58,0.3);
    overflow: hidden;
    position: relative;
  }
  .container form{
    width: 300px;
    height: 200px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    z-index: 1;
  }
  .container form .tbx{
    width: 200px;
    height: 40px;
    outline: none;
    border: none;
    border-bottom: 1px solid #fff;
    background:none;
    color: #fff;
  }
  /* 设置placeholder */
  .container form .tbx::placeholder{
    color: #fff;
    font-size: 15px;
  }
  .container form .sub{
    width: 200px;
    height: 40px;
    outline: none;
    border: 1px solid #fff;
    border-radius: 20px;
    letter-spacing: 5px;
    color: #fff;
    background: none;
    cursor: pointer;
  }
  .container h1{
    z-index: 1;
    color: #ecf0f1;
    letter-spacing: 5px;
    padding-left: 5px;
    font-size: 50px;
    font-weight: 100;
    text-shadow: 5px 5px 5px rgba(33,45,58,0.3);
  }
  /* 设置鼠标进入的样式 */
  .container .in{
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: #3498bd;
    transform: translate(-50%,-50%);
    /* 使用in动画，持续0.5s,缓出的时间函数，停留在最后一帧 */
    animation: in 0.5s ease-out forwards;
  }
  /* 设置鼠标离开的样式 */
  .container .out{
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 1200px;
    height: 1200px;
    border-radius: 50%;
    background: #3498bd;
    transform: translate(-50%,-50%);
    animation: out 0.5s ease-out forwards;
  }
  /* 设置鼠标进入时，元素的动画 */
  @keyframes in{
    /* 初始关键帧 */
    0%{
      width: 0;
      height: 0;
    }
    /* 结尾关键帧 */
    100%{
      width: 1200px;
      height: 1200px;
    }
  }
  /* 设置鼠标离开时，元素的动画 */
  @keyframes out{
    /* 初始关键帧 */
    0%{
      width: 1200px;
      height: 1200px;
    }
    /* 结尾关键帧 */
    100%{
      width: 0;
      height: 0;
    }
  }
</style>
