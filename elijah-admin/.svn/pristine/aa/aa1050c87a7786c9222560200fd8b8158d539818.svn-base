<template>
  <el-row :gutter="20" style="padding:20px">
    <el-col :span="laySize.left">
      <!-- <div class="app-container"> -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="权限名称">
          <el-input v-model="rolename" placeholder="权限名称" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryList">查询</el-button>
          <el-button type="success" @click="showAddRole">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="listLoading" :data="roledata.list" border fit stripe style="width: 100%">
        <el-table-column align="center" prop="RoleName" label="权限名称" width="200px" />
        <el-table-column align="center" label="可用功能">
          <template slot-scope="{row}">
            <el-tag
              v-for="fitem in row.functionList"
              :key="fitem.FunctionID"
              class="functionitem"
            >{{ fitem.FunctionName }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" prop="Comment" label="备注" />

        <el-table-column align="center" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="editRole(scope.row)"
            >修改</el-button>

            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="delRole(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="roledata.totalnumber>0"
        :total="roledata.totalnumber || 0"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getRoleList"
      />
      <!-- </div> -->
    </el-col>
    <transition name="el-fade-in-linear">
      <el-col v-show="laySize.showright" :span="laySize.right">
        <el-card>
          <component
            :is="laySize.formType"
            :all-function="allFunctionList"
            :rolefrom="rolefrom"
            @closeFrom="closeFrom"
          />
        </el-card>
      </el-col>
    </transition>
  </el-row>
</template>
<script>
import Pagination from '@/components/Pagination'
import AddRoleVue from './components/AddRole.vue'
import EditRoleVue from './components/EditRole.vue'
export default {
  components: { Pagination, AddRoleVue },
  data() {
    return {
      allFunctionList: [],
      listLoading: false,
      roledata: {},
      listQuery: {
        page: 1,
        limit: 10
      },
      laySize: {
        left: 24,
        right: 8,
        showright: false,
        formType: null
      },
      rolefrom: null,
      showDel: false,
      rolename: ''
    }
  },
  mounted() {
    this.getFunctionList()
    this.getRoleList()
  },
  methods: {
    getRoleList() {
      this.listLoading = true
      const start = (this.listQuery.page - 1) * this.listQuery.limit
      const length = this.listQuery.limit
      this.$post('Operator/getRoleList', {
        start: start,
        length: length,
        RoleName: this.rolename
      }).then(json => {
        this.roledata = json.data
        this.listLoading = false
      })
    },
    getFunctionList() {
      this.$post('Operator/getFunctionList').then(json => {
        this.allFunctionList = json.data
      })
    },
    editRole(row) {
      this.rolefrom = row
      this.laySize = {
        left: 16,
        right: 8,
        showright: true,
        formType: EditRoleVue
      }
    },
    closeFrom(istrue) {
      this.laySize = {
        left: 24,
        right: 8,
        showright: false,
        formType: null
      }
      if (istrue) {
        this.getRoleList()
      }
    },
    showAddRole() {
      this.laySize = {
        left: 16,
        right: 8,
        showright: true,
        formType: AddRoleVue
      }
    },
    delRole(row) {
      const { RoleID } = row
      this.$confirm('确认删除该权限？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$post('Operator/deleteRole', { RoleID }).then(json => {
            this.laySize = {
              left: 24,
              right: 8,
              showright: false,
              formType: null
            }
            this.listQuery.page = 1
            this.getRoleList()
          })
        })
        .catch(action => {})
    },
    queryList() {
      this.listQuery.page = 1
      this.getRoleList()
    }
  }
}
</script>

<style lang="scss" scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(150px);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.functionitem {
  margin-left: 5px;
  margin-bottom: 2px;
}
</style>
