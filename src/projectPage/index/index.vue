<template>
    <div>
        <el-container>
        <el-header>Header</el-header>
        <el-container>
          <el-aside width="200px">
            <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" >
              <el-submenu index="1" >
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title">导航一</span>
                </template>
                <el-menu-item-group>
                  <span slot="title">分组一</span>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-aside>
          <el-container>
            <el-main>Main</el-main>
            <el-footer>Footer</el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
          return {


          }
        },
      methods:{

        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>

</style>
