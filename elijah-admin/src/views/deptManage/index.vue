<template>
  <el-row class="treeLayout" :gutter="20">
    <!-- 左侧树 -->
    <el-col :span="8" :offset="1">
      <div class="treeLayout">
        <el-row style="margin-bottom:10px">
          <el-col :span="14">
            <el-input v-model="filterText" placeholder="输入关键字进行过滤" />
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button type="primary" round @click="appendTop()">新增</el-button>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button type="warning" round @click="getTreeList">刷新</el-button>
          </el-col>
        </el-row>

        <el-tree
          ref="tree"
          v-loading="treeLoading"
          :data="treeData"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          @current-change="nodecheck"
        >
          <span slot-scope="{ node }" class="custom-tree-node">
            <span
              class="nodelabel"
              :class="`nodelabel-lv${node.data.departmentCode.length/2}`"
            >{{ node.label }}</span>
            <!-- <el-tag>{{ node.label }}</el-tag> -->
            <div style="margin-left:20px">
              <span v-if="checkNode == node" style="margin-left:20%">
                <el-button
                  v-if="node.data.departmentCode.length < 6"
                  type="success"
                  icon="el-icon-plus"
                  circle
                  @click="() => append(node)"
                />
                <el-button type="warning" icon="el-icon-edit" circle @click="() => editDept(node)" />
                <el-popover
                  v-model="showDel"
                  placement="top"
                  width="160"
                  style="margin-left: 10px;"
                >
                  <p>确定删除该部门？</p>
                  <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="showDel = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="delDept(node)">确定</el-button>
                  </div>
                  <el-button
                    v-if="!node.data.children || node.data.children.length == 0"
                    slot="reference"
                    type="danger"
                    icon="el-icon-minus"
                    circle
                  />
                </el-popover>
              </span>
            </div>
          </span>
        </el-tree>
      </div>
    </el-col>
    <!-- 右侧form -->
    <transition name="el-fade-in-linear">
      <el-col v-show="showedit" :span="8" :offset="3">
        <component :is="formType" :deptfrom="deptfrom" @closeFrom="closeFrom" />
      </el-col>
    </transition>
  </el-row>
</template>

<script>
import AddDept from './components/AddDept.vue'
import AddTopDept from './components/AddTopDept.vue'
import EditDept from './components/EditDept.vue'
import { setTimeout } from 'timers'
export default {
  components: {
    AddDept,
    AddTopDept,
    EditDept
  },
  data() {
    return {
      treeLoading: false,
      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'departmentName'
      },
      deptfrom: {},
      checkNode: '',
      showedit: false,
      rules: {
        departmentName: [
          { required: true, message: '请输入部门名称', trigger: 'blur' }
        ],
        departmentCode: [
          { required: true, message: '请输入部门编号', trigger: 'blur' }
        ]
      },
      formType: '',
      showDel: false
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  created() {
    this.getTreeList()
  },
  methods: {
    /**
     * 新增节点
     */
    append(node) {
      this.deptfrom = JSON.parse(JSON.stringify(node.data))
      this.formType = AddDept
      this.showedit = true
    },
    /**
     * 删除节点
     */
    delDept(node) {
      const id = node.data.id
      this.$post('Department/delete', { id }).then(json => {
        this.$notify({
          title: '成功',
          message: '操作成功！',
          type: 'success'
        })
        this.showDel = false
        this.getTreeList()
      })
    },
    /** 修改部门 */
    editDept(node) {
      if (this.showedit) {
        this.showedit = false
        this.formType = null
        setTimeout(() => {
          this.deptfrom = JSON.parse(JSON.stringify(node.data))
          this.formType = EditDept
          this.showedit = true
        }, 500)
      } else {
        this.deptfrom = JSON.parse(JSON.stringify(node.data))
        this.formType = EditDept
        this.showedit = true
      }
    },
    appendTop() {
      this.deptfrom = {}
      this.formType = AddTopDept
      this.showedit = true
    },
    /**
     * 树过滤
     */
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    getTreeList() {
      this.treeLoading = true
      this.$post('Department/list').then(json => {
        this.treeData = json.data
      })
      this.treeLoading = false
    },
    nodecheck(data, node) {
      // this.showDel = false
      this.checkNode = node
    },
    closeFrom(suc) {
      if (suc) this.getTreeList()
      this.showedit = false
      this.formType = null
    }
  }
}
</script>

<style lang="scss" scoped>
.nodelabel {
  display: inline-block;
  height: 24px;
  padding: 0 10px;
  line-height: 24px;
  font-size: 14px;
  border: 1px solid #d9ecff;
  border-radius: 4px;
  box-sizing: border-box;
  white-space: nowrap;

  &-lv1 {
    background-color: #ecf5ff;
    color: #409eff;
    border-color: #d9ecff;
  }
  &-lv2 {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
    color: #67c23a;
  }
  &-lv3 {
    background-color: #fdf6ec;
    border-color: #faecd8;
    color: #e6a23c;
  }
}
.treeLayout {
  padding: 10px;
  background: #fff;
  height: 100%;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.el-button.is-circle {
  padding: 2px;
}
</style>
