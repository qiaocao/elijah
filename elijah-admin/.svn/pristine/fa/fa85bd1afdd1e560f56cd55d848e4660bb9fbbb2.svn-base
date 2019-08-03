<template>
  <el-row :gutter="20" style="padding:20px">
    <el-col :span="laySize.left">
      <!-- <div class="app-container"> -->
      <el-form :inline="true" class="demo-form-inline">
        <!-- <el-form-item label="设备代码">
          <el-input v-model="devcode" placeholder="设备代码" clearable/>
        </el-form-item>-->
        <el-form-item label="设备代码">
          <el-input v-model="fenname" placeholder="设备代码" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryList">查询</el-button>
          <el-button type="success" @click="showAddDevice">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="listLoading"
        :data="devicedata.list"
        border
        fit
        stripe
        style="width: 100%"
      >
        <el-table-column align="center" prop="code" label="设备代码" width="200px" />
        <el-table-column align="center" prop="department_name" label="所属部门" />
        <el-table-column align="center" prop="police_name" label="警员名称" />
        <el-table-column align="center" prop="police_car_number" label="警车编号" />
        <el-table-column align="center" label="围栏信息" width="300px">
          <template slot-scope="{row}">
            <el-tag v-for="fitem in row.array" :key="fitem.id" class="functionitem">{{ fitem.Name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="editDevice(scope.row)"
            >修改</el-button>

            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="delDevice(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="devicedata.totalnumber>0"
        :total="devicedata.totalnumber || 0"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getDeviceList"
      />
      <!-- </div> -->
    </el-col>
    <transition name="el-fade-in-linear">
      <el-col v-show="laySize.showright" :span="laySize.right">
        <el-card>
          <component
            :is="laySize.formType"
            :devicefrom="devicefrom"
            :depttreedata="deptTreeData"
            :fencelist="FenceList"
            @closeFrom="closeFrom"
          />
        </el-card>
      </el-col>
    </transition>
  </el-row>
</template>
<script>
import Pagination from '@/components/Pagination'
import AddDevice from './components/AddDevice.vue'
import EditDevice from './components/EditDevice.vue'
export default {
  components: { Pagination },
  data() {
    return {
      listLoading: false,
      devicedata: {},
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
      devicefrom: null,
      showDel: false,
      platenum: '',
      deptTreeData: '',
      FenceList: [],
      devcode: '',
      fenname: ''
    }
  },
  mounted() {
    this.getDeviceList()
    this.getDeptList()
    this.getFenceList()
  },
  methods: {
    getDeviceList() {
      this.listLoading = true
      const start = (this.listQuery.page - 1) * this.listQuery.limit
      const length = this.listQuery.limit
      this.$post('Client/list', {
        start: start,
        length: length,
        code: this.fenname
      })
        .then(json => {
          this.devicedata = json.data
          this.listLoading = false
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    editDevice(row) {
      if (this.laySize.showright) {
        this.laySize = {
          left: 24,
          right: 8,
          showright: false,
          formType: null
        }
        setTimeout(() => {
          this.devicefrom = row
          this.laySize = {
            left: 16,
            right: 8,
            showright: true,
            formType: EditDevice
          }
        }, 500)
      } else {
        this.devicefrom = row
        this.laySize = {
          left: 16,
          right: 8,
          showright: true,
          formType: EditDevice
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
        this.getDeviceList()
      }
    },
    showAddDevice() {
      this.laySize = {
        left: 16,
        right: 8,
        showright: true,
        formType: AddDevice
      }
    },
    delDevice(row) {
      const { id } = row
      this.$confirm('确认删除该条记录？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$post('Client/delete', { id }).then(json => {
            this.laySize = {
              left: 24,
              right: 8,
              showright: false,
              formType: null
            }
            this.listQuery.page = 1
            this.getDeviceList()
          })
        })
        .catch(action => {})
    },
    queryList() {
      this.listQuery.page = 1
      this.getDeviceList()
    },
    /** 查询部门 */
    getDeptList() {
      this.$post('Department/list').then(json => {
        this.deptTreeData = json.data
      })
    },
    /** 查询电子围栏 */
    getFenceList() {
      this.$post('Enclosure/list').then(json => {
        this.FenceList = json.data.list
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
