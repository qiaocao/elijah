<template>
  <div>
    <div class="fltitle">
      <span class="fltitle-text">电子围栏</span>
    </div>
    <el-form
      ref="addForm"
      :label-position="'top'"
      :model="addForm"
      :rules="rules"
      label-width="100px"
      class="demo-addForm"
    >
      <el-form-item label="围栏名称" prop="Name">
        <el-input v-model="addForm.name" />
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input v-model="addForm.comment" type="textarea" />
      </el-form-item>
      <el-form-item label="围栏坐标">
        <span>点击地图，选取围栏坐标</span>
        <el-tag
          v-for="(ritem,index) in RegionArr"
          :key="ritem.join(',')"
          closable
          :type="'success'"
          @close="handleClose(ritem)"
        >
          ({{ index + 1 }})
          经度：{{ ritem[0] }}
          纬度：{{ ritem[1] }}
        </el-tag>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save()">保存</el-button>
        <el-button @click="closeRight(false)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'AddFence',
  props: {
    map: { type: Object, required: true, default: () => {} },
    bmap: { type: Object, required: true, default: () => {} }
  },
  data() {
    return {
      rules: {
        name: [{ required: true, message: '请输入围栏名称', trigger: 'blur' }]
      },
      addForm: {
        name: '',
        region: '',
        comment: ''
      },
      RegionArr: [],
      drawingManager: null
    }
  },

  watch: {
    RegionArr(val) {
      const BMap = this.bmap
      // 解析数组
      var marr = []
      for (var ar of val) {
        marr.push(ar.join(','))
      }
      this.addForm.region = marr.join('|')
      this.map.clearOverlays()
      // 描绘多边形
      var points = []
      for (let i = 0; i < val.length; i++) {
        var point = new BMap.Point(val[i][0], val[i][1])
        var marker = new BMap.Marker(point)
        var label = new BMap.Label(i + 1, {
          offset: new BMap.Size(20, -10)
        })
        marker.setLabel(label)
        points.push(point)
        this.map.addOverlay(marker)
      }
      if (val.length > 2) {
        var polygon = new BMap.Polygon(points, {
          strokeColor: 'blue',
          strokeWeight: 2,
          strokeOpacity: 0.5
        }) // 创建多边形
        this.map.addOverlay(polygon)
        polygon.addEventListener('lineupdate', e => {
          const pointArr = e.target.so
          const regd = []
          for (const p of pointArr) {
            regd.push([p.lng, p.lat])
          }
          this.RegionArr = regd
        })
        polygon.enableEditing()
      }
    }
  },
  created() {
    this.map.setDefaultCursor('crosshair')
    this.map.addEventListener('click', this.addpoint)
  },
  destroyed() {
    this.map.removeEventListener('click', this.addpoint)
  },
  methods: {
    closeRight(istrue) {
      this.map.clearOverlays()
      this.map.removeEventListener('click', this.addpoint)
      this.$emit('closeRight', istrue)
    },
    addpoint(e) {
      // alert(e.point.lng + ',' + e.point.lat)
      this.RegionArr.push([e.point.lng, e.point.lat])
    },
    handleClose(ritem) {
      this.RegionArr.remove(ritem)
    },
    save() {
      if (this.RegionArr.length < 3) {
        this.$notify({
          title: '警告',
          message: '请选择至少三个坐标行程围栏！',
          type: 'warning'
        })
        return false
      }
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$post('Enclosure/insert', this.addForm).then(json => {
            this.$notify({
              title: '成功',
              message: '操作成功！',
              type: 'success'
            })
            this.closeRight(true)
          })
        }
      })
    }
  }
}
// eslint-disable-next-line no-extend-native
Array.prototype.remove = function(val) {
  var index = this.indexOf(val)
  if (index > -1) {
    this.splice(index, 1)
  }
}
</script>
<style lang="scss" scoped>
.fltitle {
  height: 40px;
  text-align: center;
  &-text {
    font-size: 20px;
  }
}
</style>
