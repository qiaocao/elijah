<template>
  <div>
    <div class="ad-title">权限编辑</div>
    <el-form ref="form" :model="addRoleFrom" label-width="80px" :rules="rules">
      <el-form-item label="权限名称" prop="RoleName">
        <el-input v-model="addRoleFrom.RoleName" />
      </el-form-item>

      <el-form-item label="功能选择" prop="FunctionsArr">
        <el-checkbox-group v-model="addRoleFrom.FunctionsArr">
          <el-checkbox
            v-for="fitem in allFunction"
            :key="fitem.FunctionID"
            :label="fitem.FunctionID"
          >{{ fitem.FunctionName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="addRoleFrom.Comment" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="close(false)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'EditRole',
  props: ['allFunction', 'rolefrom'],
  data() {
    return {
      addRoleFrom: {
        RoleName: '',
        FunctionsArr: [],
        Functions: '',
        Comment: ''
      },
      rules: {
        RoleName: [
          { required: true, message: '请输入权限名称', trigger: 'blur' }
        ],
        FunctionsArr: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个功能菜单',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created() {
    this.addRoleFrom = Object.assign(this.addRoleFrom, this.rolefrom)
    for (const { FunctionID } of this.rolefrom.functionList) {
      this.addRoleFrom.FunctionsArr.push(FunctionID)
    }
  },
  methods: {
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.addRoleFrom.Functions = this.addRoleFrom.FunctionsArr.join(',')
          this.$post('Operator/updateRole', this.addRoleFrom).then(json => {
            this.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            })
            this.close(true)
          })
        } else {
          return false
        }
      })
    },
    close(istrue) {
      this.$emit('closeFrom', istrue)
    }
  }
}
</script>

<style lang="scss" scoped>
.ad-title {
  width: 100%;
  text-align: center;
  background: #eef1f6;
  padding: 8px 24px;
  margin-bottom: 20px;
  border-radius: 2px;
  display: block;
  line-height: 32px;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  color: #2c3e50;
  -webkit-font-smoothing: antialiased;
}
</style>

