<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">微人事</div>
        <el-dropdown class="userInfo" @command="commandHandler">
  <span class="el-dropdown-link">
<!--  :src  是vue的v-model  -->
    {{ user.name }}<i><img :src="user.userface"></i>
  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout" divided>注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- select: el的菜单事件 -->
          <!--  //两种写法，加了router，不必再写@select事件 -->
          <!-- <el-menu @select="selectMenu">-->
          <el-menu router>
            <!--    options.routes：表示router.js中所有的routes        -->
            <el-submenu index="1" v-for="opt in this.$router.options.routes" :key="opt.id" v-if="!opt.hidden">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="chilies in opt.children" :key="chilies.id" :index="chilies.path">
                  {{ chilies.name }}
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-aside>
        <el-main>
          <!-- 这里需要去配置菜单在右面显示，加上下面的标签去router.js配置添加children属性即可，
          先来这里找<router-view/>,如果有，现在这进行跳转 -->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("user"))
    }
  },
  methods: {
    // params（随便取名字）参数就是userinfo，setting，logout这三者其一，进行判断，字符串是谁就进行哪个点击事件
    commandHandler(params) {
      if (params == 'logout') {
        this.$confirm('此操作将注销, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 跳转注销
          this.getRequest("/logout")
          // 清空用户信息
          window.sessionStorage.removeItem("user");
          // 跳转到登陆页
          this.$router.replace("/")
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      }
    }
    //两种写法，加了router，不必再写@select事件
    // },
    // selectMenu(index) {
    //   this.$router.push(index)
    // }
  }
}
</script>

<style scoped>
.homeHeader {
  background-color: cornflowerblue;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  box-sizing: border-box;
}

.title {
  font-size: 30px;
  font-family: 华文行楷;
  color: #99f69c;
}

.userInfo {
  /*设置手指样式*/
  cursor: pointer;
}

.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>