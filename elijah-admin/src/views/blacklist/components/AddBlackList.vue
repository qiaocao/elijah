<template>
  <div>
    <div class="ad-title">新增黑名单</div>
    <el-form ref="form" :model="addBlackListFrom" label-width="80px" :rules="rules">
      <el-form-item label="车牌号码" prop="platenum">
        <el-input v-model="addBlackListFrom.platenum" />
      </el-form-item>
      <el-form-item label="车牌类型" prop="platetype">
        <el-select v-model="addBlackListFrom.platetype" placeholder="请选择车牌类型" style="width:100%">
          <el-option
            v-for="item in platetypeoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <!-- <el-input v-model="addBlackListFrom.platetype" /> -->
      </el-form-item>
      <el-form-item label="车辆颜色" prop="color">
        <el-input v-model="addBlackListFrom.color" />
      </el-form-item>
      <el-form-item label="车辆品牌" prop="brand">
        <el-input v-model="addBlackListFrom.brand" />
      </el-form-item>
      <el-form-item label="违法类型" prop="typeid">
        <el-select v-model="addBlackListFrom.typeid" placeholder="违法类型" style="width:100%">
          <el-option
            v-for="item in typelist"
            :key="item.typeid"
            :label="item.typename"
            :value="item.typeid"
          />
        </el-select>
        <!-- <el-input v-model="addBlackListFrom.platetype" /> -->
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
  name: 'AddBlackList',
  props: ['typelist'],
  data() {
    return {
      addBlackListFrom: {
        platenum: '',
        platetype: '',
        color: '',
        brand: '',
        typeid: '',
        operator_id: JSON.parse(sessionStorage.getItem('userInfo')).data
          .operatorID
      },
      rules: {
        platenum: [
          { required: true, message: '请输入车牌号码', trigger: 'blur' }
        ],
        platetype: [
          { required: true, message: '请输入车牌类型', trigger: 'blur' }
        ],
        typeid: [{ required: true, message: '请选择违法类型', trigger: 'blur' }]
      },
      platetypeoptions: [
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

  methods: {
    save() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$post('BlackList/insert', this.addBlackListFrom).then(json => {
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

