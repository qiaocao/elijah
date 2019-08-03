<template>
  <div class="navbar">
    <!-- <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />-->

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <!-- <el-dropdown class="avatar-container" trigger="click"> -->
      <div class="avatar-wrapper">
        <!-- <img
            :src="'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'"
            class="user-avatar"
        >-->
        <span style="font-size:14px;margin-right:10px">欢迎：{{ operatorName }}</span>
        <i class="el-icon-switch-button" style="margin-right:10px;color:red" @click="logout" />
        <!-- <el-dropdown-item divided>
            <span style="display:block;" @click="logout">登出</span>
        </el-dropdown-item>-->
      </div>
      <!-- <el-dropdown-menu slot="dropdown" class="user-dropdown">

          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">登出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { removeToken } from '@/utils/auth'
import store from '@/store'
import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      operatorName: JSON.parse(sessionStorage.getItem('userInfo')).data
        .operatorName
    }
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      // await this.$store.dispatch('user/logout')
      removeToken()
      store.dispatch('user/resetToken')
      store.dispatch('permission/removeRoutes')

      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push(`/login`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
    margin-left: 20px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
