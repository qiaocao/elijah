<template>
  <el-row :gutter="20" style="padding:20px">
    <el-col :span="laySize.left">
      <!-- <div class="app-container"> -->
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="类型编码">
          <el-input v-model="lxbm" placeholder="类型编码" clearable />
        </el-form-item>
        <el-form-item label="类型含义">
          <el-input v-model="lxhy" placeholder="类型含义" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryList">查询</el-button>
          <el-button type="success" @click="showAddDataDict">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table
        v-loading="listLoading"
        :data="datadictdata.list"
        border
        fit
        stripe
        style="width: 100%"
      >
        <el-table-column align="center" prop="zxmbm" label="类型编码" />

        <el-table-column align="center" prop="hy" label="类型含义" />
        <el-table-column align="center" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="editDataDict(scope.row)"
            >修改</el-button>

            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="delDataDict(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="datadictdata.totalnumber>0"
        :total="datadictdata.totalnumber || 0"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getDataDictList"
      />
      <!-- </div> -->
    </el-col>
    <transition name="el-fade-in-linear">
      <el-col v-show="laySize.showright" :span="laySize.right">
        <el-card>
          <component :is="laySize.formType" :datadictfrom="datadictfrom" @closeFrom="closeFrom" />
        </el-card>
      </el-col>
    </transition>
  </el-row>
</template>
<script>
import Pagination from '@/components/Pagination'
import AddDataDict from './components/AddDataDict.vue'
import EditDataDict from './components/EditDataDict.vue'
export default {
  components: { Pagination },
  data() {
    return {
      cpcolor: { '01': '黄色', '02': '蓝色', '52': '绿色' },
      listLoading: false,
      datadictdata: {},
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
      datadictfrom: null,
      showDel: false,
      lxbm: '',
      lxhy: '',
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
    this.getDataDictList()
  },
  methods: {
    getDataDictList() {
      this.listLoading = true
      const start = (this.listQuery.page - 1) * this.listQuery.limit
      const length = this.listQuery.limit
      this.$post('DataDict/list', {
        start: start,
        length: length,
        zxmbm: this.lxbm,
        hy: this.lxhy
      })
        .then(json => {
          this.datadictdata = json.data
          this.listLoading = false
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    editDataDict(row) {
      if (this.laySize.showright) {
        this.laySize = {
          left: 24,
          right: 8,
          showright: false,
          formType: null
        }
        setTimeout(() => {
          this.datadictfrom = row
          this.laySize = {
            left: 16,
            right: 8,
            showright: true,
            formType: EditDataDict
          }
        }, 500)
      } else {
        this.datadictfrom = row
        this.laySize = {
          left: 16,
          right: 8,
          showright: true,
          formType: EditDataDict
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
        this.getDataDictList()
      }
    },
    showAddDataDict() {
      this.laySize = {
        left: 16,
        right: 8,
        showright: true,
        formType: AddDataDict
      }
    },
    delDataDict(row) {
      const { ID } = row
      this.$confirm('确认删除该条记录？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$post('DataDict/delete', { id: ID }).then(json => {
            this.laySize = {
              left: 24,
              right: 8,
              showright: false,
              formType: null
            }
            this.listQuery.page = 1
            this.getDataDictList()
          })
        })
        .catch(action => {})
    },
    queryList() {
      this.listQuery.page = 1
      this.getDataDictList()
    },
    showExportDataDict() {
      this.laySize = {
        left: 16,
        right: 8,
        showright: true,
        formType: ExportDataDict
      }
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
