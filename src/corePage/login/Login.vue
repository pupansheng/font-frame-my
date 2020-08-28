<template >
  <div class="content">

    <div id="particles-js"></div>
    <div id="wrapper">
      <div>
       <!-- <img src="./assets/img/zhihu_logo.png" />-->         <!--logo位置-->
        <h1> 项目管理系统</h1>
        <h2>-------</h2>
      </div>
      <nav class="switch_nav">
        <a href="javascript:;" id="switch_signup" class="switch_btn">注册</a>
        <a href="javascript:;" id="switch_login" class="switch_btn on">登陆</a>
        <div class="switch_bottom" id="switch_bottom"></div>
      </nav>
      <div id="login">
        <div >
          <ul class="group_input">
            <li>
              <input type="text" v-model="user.username" class="mobile required" id="mobile" placeholder="手机号或邮箱" />
            </li>
            <li>
              <input type="password" v-model="user.password" class="psd required" id="psd" placeholder="密码" />
            </li>
          </ul>
          <button class="submit_btn" id="btnSubmit" @click="login2">登陆</button>
        </div>
        <div class="states">
          <span class="left"><a href="javascript:;">手机验证码登陆</a></span>
          <span class="right"><a href="javascript:;">无法登陆？</a></span>
        </div>

      </div>

      <div id="footer">

      </div>
    </div>



  </div>

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



      },
      login2(){

        const  that=this;
        if(!this.user.username){

          this.$message.info("用户不能为空")

          return
        }

        if(!this.user.password){

          this.$message.info("密码不能为空")

          return
        }

        that.$store.dispatch('login',that.user).then(res=>{

          this.$router.push("/")

        },err=>{


          that.load=false;

        })



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

    }


</style>
<style scoped>

  @import "assets/css/base.css";
  @import "assets/css/login.css";

</style>
