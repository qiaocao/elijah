<template>
  <div>
    <div class="ad-title">编辑警员信息</div>
    <el-form ref="form" :model="addPoliceFrom" label-width="80px" :rules="rules">
      <el-form-item label="警员编号" prop="police_code">
        <el-input v-model="addPoliceFrom.police_code" />
      </el-form-item>
      <el-form-item label="警员名称" prop="police_name">
        <el-input v-model="addPoliceFrom.police_name" />
      </el-form-item>
      <el-form-item label="警员电话" prop="police_tel">
        <el-input v-model="addPoliceFrom.police_tel" />
      </el-form-item>
      <el-form-item label="警员部门" prop="department_codeArr">
        <el-cascader
          v-model="addPoliceFrom.department_codeArr"
          style="width:100%"
          :options="depttreedata"
          :props="{value:'departmentCode',checkStrictly: true }"
          clearable
        />
      </el-form-item>
      <el-form-item label="登录名" prop="operatorloginname">
        <el-input v-model="addPoliceFrom.operatorloginname" />
      </el-form-item>
      <el-form-item label="角色权限" prop="operatorroleid">
        <el-select v-model="addPoliceFrom.operatorroleid" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in rolelist"
            :key="item.RoleID"
            :label="item.RoleName"
            :value="item.RoleID"
          />
        </el-select>
        <!-- <el-input v-model="addPoliceFrom.roleid" /> -->
      </el-form-item>
      <el-form-item label="姓名" prop="operatorname">
        <el-input v-model="addPoliceFrom.operatorname" />
      </el-form-item>
      <el-form-item label="密码" prop="operatorpwd">
        <el-input v-model="addPoliceFrom.operatorpwd" show-password />
      </el-form-item>
      <el-form-item label="电话" prop="operatortel">
        <el-input v-model="addPoliceFrom.operatortel" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="close(false)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: 'AddPolice',
  props: ['depttreedata', 'policefrom', 'rolelist'],
  data() {
    return {
      addPoliceFrom: {
        police_code: '',
        police_name: '',
        police_tel: '',
        department_code: '',
        department_codeArr: [],
        operatorloginname: '',
        operatorname: '',
        operatorpwd: '',
        operatortel: '',
        operatorroleid: ''
      },
      rules: {
        police_code: [
          { required: true, message: '请输入警员编号', trigger: 'blur' }
        ],
        police_name: [
          { required: true, message: '请输入警员姓名', trigger: 'blur' }
        ],
        operatorloginname: [
          { required: true, message: '请输入登录名', trigger: 'blur' }
        ],
        department_codeArr: [
          {
            type: 'array',
            required: true,
            message: '请选择警员部门',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    this.addPoliceFrom = Object.assign(this.addPoliceFrom, this.policefrom)

    for (const i of this.depttreedata) {
      if (i.departmentCode === this.addPoliceFrom.department_code) {
        this.addPoliceFrom.department_codeArr.push(i.departmentCode)
      } else {
        for (const j of i.children) {
          if (j.departmentCode === this.addPoliceFrom.department_code) {
            this.addPoliceFrom.department_codeArr.push(i.departmentCode)
            this.addPoliceFrom.department_codeArr.push(j.departmentCode)
          } else {
            for (const k of j.children) {
              if (k.departmentCode === this.addPoliceFrom.department_code) {
                this.addPoliceFrom.department_codeArr.push(i.departmentCode)
                this.addPoliceFrom.department_codeArr.push(j.departmentCode)
                this.addPoliceFrom.department_codeArr.push(k.departmentCode)
              }
            }
          }
        }
      }
    }
  },
  methods: {
    save() {
      this.addPoliceFrom.department_code = this.addPoliceFrom.department_codeArr[
        this.addPoliceFrom.department_codeArr.length - 1
      ]
      var updata = { ...this.addPoliceFrom }
      if (updata.operatorpwd !== '') {
        updata.operatorpwd = md5(updata.operatorpwd)
      }

      this.$refs.form.validate(valid => {
        if (valid) {
          this.$post('Police/update', updata).then(json => {
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

