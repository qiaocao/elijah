<template>
  <el-row :gutter="20" style="padding:20px">
    <el-col :span="laySize.left">
      <!-- <div class="app-container"> -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="警员姓名">
          <el-input v-model="police_name" placeholder="警员姓名" clearable />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="queryList">查询</el-button>
          <el-button type="success" @click="showAddPolice">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="listLoading"
        :data="policedata.list"
        border
        fit
        stripe
        style="width: 100%"
      >
        <el-table-column align="center" prop="police_code" label="警员编号" width="200px" />
        <el-table-column align="center" prop="police_name" label="警员姓名" />
        <el-table-column align="center" prop="department_name" label="警员部门" />
        <el-table-column align="center" prop="police_tel" label="电话号码" />
        <el-table-column align="center" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="editPolice(scope.row)"
            >修改</el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="delPolice(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="policedata.totalnumber>0"
        :total="policedata.totalnumber || 0"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getPoliceList"
      />
      <!-- </div> -->
    </el-col>
    <transition name="el-fade-in-linear">
      <el-col v-show="laySize.showright" :span="laySize.right">
        <el-card>
          <component
            :is="laySize.formType"
            :depttreedata="deptTreeData"
            :policefrom="policefrom"
            :rolelist="rolelist"
            @closeFrom="closeFrom"
          />
        </el-card>
      </el-col>
    </transition>
  </el-row>
</template>
<script>
import Pagination from '@/components/Pagination'
import AddPolice from './components/AddPolice.vue'
import EditPolice from './components/EditPolice.vue'
export default {
  components: { Pagination },
  data() {
    return {
      deptTreeData: [],
      rolelist: [],
      listLoading: false,
      policedata: {},
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
      policefrom: null,
      showDel: false,
      police_name: ''
    }
  },
  mounted() {
    this.$post('Department/list').then(json => {
      this.deptTreeData = json.data
    })
    this.getPoliceList()
    this.getRoleList()
  },
  methods: {
    getPoliceList() {
      this.listLoading = true
      const start = (this.listQuery.page - 1) * this.listQuery.limit
      const length = this.listQuery.limit
      this.$post('Police/list', {
        start: start,
        length: length,
        police_name: this.police_name
      })
        .then(json => {
          this.policedata = json.data
          this.listLoading = false
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    editPolice(row) {
      if (this.laySize.showright) {
        this.laySize = {
          left: 24,
          right: 8,
          showright: false,
          formType: null
        }
        setTimeout(() => {
          this.policefrom = row
          this.laySize = {
            left: 16,
            right: 8,
            showright: true,
            formType: EditPolice
          }
        }, 500)
      } else {
        this.policefrom = row
        this.laySize = {
          left: 16,
          right: 8,
          showright: true,
          formType: EditPolice
        }
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
        this.getPoliceList()
      }
    },
    showAddPolice() {
      this.laySize = {
        left: 16,
        right: 8,
        showright: true,
        formType: AddPolice
      }
    },
    delPolice(row) {
      const { id } = row
      this.$confirm('确认删除该警员？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$post('Police/delete', { id }).then(json => {
            this.laySize = {
              left: 24,
              right: 8,
              showright: false,
              formType: null
            }
            this.listQuery.page = 1
            this.getPoliceList()
          })
        })
        .catch(action => {})
    },
    queryList() {
      this.listQuery.page = 1
      this.getPoliceList()
    },
    getRoleList() {
      this.$post('Operator/getRoleList', {
        start: '0',
        length: '200'
      }).then(json => {
        this.rolelist = json.data.list
      })
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
