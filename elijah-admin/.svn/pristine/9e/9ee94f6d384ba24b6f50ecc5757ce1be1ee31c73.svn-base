<template>
  <el-row :gutter="20" style="padding:20px">
    <el-col :span="laySize.left">
      <!-- <div class="app-container"> -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="车牌号码">
          <el-input v-model="platenum" placeholder="车牌号码" clearable />
        </el-form-item>
        <el-form-item label="车牌类型">
          <el-select v-model="platetype" placeholder="请选择车牌类型" style="width:100%">
            <el-option
              v-for="item in platetypeoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryList">查询</el-button>
          <el-button type="success" @click="showAddBlackList">新增</el-button>
          <el-button type="warning" @click="showExportBlackList">导入</el-button>
          <a href="/Template/黑名单导入模板.xlsx" style="margin-left:12px" target="_block">
            <el-button type="text">下载模版</el-button>
          </a>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="listLoading"
        :data="blacklistdata.list"
        border
        fit
        stripe
        style="width: 100%"
      >
        <el-table-column align="center" prop="platenum" label="车牌号码" width="200px" />
        <el-table-column align="center" prop="platetype" label="车牌类型">
          <template slot-scope="scope">
            <span>{{ cpcolor[scope.row.platetype] }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="color" label="车身颜色" />
        <el-table-column align="center" prop="brand" label="车辆品牌" />
        <el-table-column align="center" prop="typename" label="违法类型" />
        <el-table-column align="center" prop="operator_id" label="操作员" />
        <el-table-column align="center" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="editBlackList(scope.row)"
            >修改</el-button>

            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="delBlackList(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="blacklistdata.totalnumber>0"
        :total="blacklistdata.totalnumber || 0"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getBlackListList"
      />
      <!-- </div> -->
    </el-col>
    <transition name="el-fade-in-linear">
      <el-col v-show="laySize.showright" :span="laySize.right">
        <el-card>
          <component
            :is="laySize.formType"
            :typelist="typelist"
            :blacklistfrom="blacklistfrom"
            @closeFrom="closeFrom"
          />
        </el-card>
      </el-col>
    </transition>
  </el-row>
</template>
<script>
import Pagination from '@/components/Pagination'
import AddBlackList from './components/AddBlackList.vue'
import EditBlackList from './components/EditBackList.vue'
import ExportBlackList from './components/ExportBlackList.vue'
export default {
  components: { Pagination },
  data() {
    return {
      cpcolor: { '01': '黄色', '02': '蓝色', '52': '绿色' },
      listLoading: false,
      blacklistdata: {},
      typelist: [],
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
      blacklistfrom: null,
      showDel: false,
      platenum: '',
      platetype: '',
      platetypeoptions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '01',
          label: '黄色'
        },
        {
          value: '02',
          label: '蓝色'
        },
        {
          value: '52',
          label: '绿色'
        }
      ]
    }
  },
  mounted() {
    this.getBlackListList()
    this.getTypeList()
  },
  methods: {
    getBlackListList() {
      this.listLoading = true
      const start = (this.listQuery.page - 1) * this.listQuery.limit
      const length = this.listQuery.limit
      this.$post('BlackList/list', {
        start: start,
        length: length,
        platenum: this.platenum,
        platetype: this.platetype
      })
        .then(json => {
          this.blacklistdata = json.data
          this.listLoading = false
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    editBlackList(row) {
      if (this.laySize.showright) {
        this.laySize = {
          left: 24,
          right: 8,
          showright: false,
          formType: null
        }
        setTimeout(() => {
          this.blacklistfrom = row
          this.laySize = {
            left: 16,
            right: 8,
            showright: true,
            formType: EditBlackList
          }
        }, 500)
      } else {
        this.blacklistfrom = row
        this.laySize = {
          left: 16,
          right: 8,
          showright: true,
          formType: EditBlackList
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
        this.getBlackListList()
      }
    },
    showAddBlackList() {
      this.laySize = {
        left: 16,
        right: 8,
        showright: true,
        formType: AddBlackList
      }
    },
    delBlackList(row) {
      const { id } = row
      this.$confirm('确认删除该条记录？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$post('BlackList/delete', { id }).then(json => {
            this.laySize = {
              left: 24,
              right: 8,
              showright: false,
              formType: null
            }
            this.listQuery.page = 1
            this.getBlackListList()
          })
        })
        .catch(action => {})
    },
    queryList() {
      this.listQuery.page = 1
      this.getBlackListList()
    },
    showExportBlackList() {
      this.laySize = {
        left: 16,
        right: 8,
        showright: true,
        formType: ExportBlackList
      }
    },
    getTypeList() {
      this.$post('BlackList/wflxList')
        .then(json => {
          this.typelist = json.data
        })
        .catch(() => {})
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
