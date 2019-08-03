<template>
  <div>
    <div class="ad-title">新增警员</div>
    <el-form ref="form" :model="addPoliceFrom" label-width="80px" :rules="rules">
      <el-form-item label="警员编号" prop="police_code">
        <el-input v-model="addPoliceFrom.police_code" />
      </el-form-item>
      <el-form-item label="警员名称" prop="police_name">
        <el-input v-model="addPoliceFrom.police_name" />
      </el-form-item>
      <el-form-item label="身份证号" prop="id_number">
        <el-input v-model="addPoliceFrom.id_number" />
      </el-form-item>
      <el-form-item label="IP地址" prop="IP">
        <el-input v-model="addPoliceFrom.IP" />
      </el-form-item>
      <el-form-item label="警员标识" prop="IP">
        <el-input v-model="addPoliceFrom.IP" />
      </el-form-item>
      <el-form-item label="是否锁定" prop="IP">
        <el-input v-model="addPoliceFrom.IP" />
      </el-form-item>
      <el-form-item label="用户有效期" prop="IP">
        <el-input v-model="addPoliceFrom.IP" />
      </el-form-item>
      <el-form-item label="密码有效期" prop="IP">
        <el-input v-model="addPoliceFrom.IP" />
      </el-form-item>
      <el-form-item label="用户有效" prop="IP">
        <el-input v-model="addPoliceFrom.IP" />
      </el-form-item>
      <el-form-item label="密码有效" prop="IP">
        <el-input v-model="addPoliceFrom.IP" />
      </el-form-item>
      <el-form-item label="允许登录时间" prop="IP">
        <el-input v-model="addPoliceFrom.IP" />
      </el-form-item>
      <el-form-item label="角色权限" prop="roleid">
        <el-select v-model="addPoliceFrom.roleid" placeholder="请选择" style="width:100%">
          <el-option
            v-for="item in rolelist"
            :key="item.RoleID"
            :label="item.RoleName"
            :value="item.RoleID"
          />
        </el-select>
        <!-- <el-input v-model="addPoliceFrom.roleid" /> -->
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
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="close(false)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddPolice',
  props: ['depttreedata', 'rolelist'],
  data() {
    return {
      addPoliceFrom: {
        police_code: '',
        police_name: '',
        police_tel: '',
        roleid: '',
        department_code: '',
        department_codeArr: [],
        id_number: '',
        police_flag: '',
        IP: '',
        islock: '',
        user_effective: '',
        pwd_effective: '',
        user_effective_flag: '',
        pwd_effective_flag: '',
        startTime: '',
        endTime: ''
      },
      rules: {
        police_code: [
          { required: true, message: '请输入警员编号', trigger: 'blur' }
        ],
        police_name: [
          { required: true, message: '请输入警员姓名', trigger: 'blur' }
        ],
        id_number: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { min: 18, max: 18, message: '请输入18位身份证号', trigger: 'blur' }
        ],
        IP: [{ required: true, message: '请输入IP', trigger: 'blur' }],
        //  roleid: [
        //   { required: true, message: '请输入警员姓名', trigger: 'blur' }
        // ],
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
  mounted() {},
  methods: {
    save() {
      this.addPoliceFrom.department_code = this.addPoliceFrom.department_codeArr[
        this.addPoliceFrom.department_codeArr.length - 1
      ]
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$post('Police/insert', this.addPoliceFrom).then(json => {
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

