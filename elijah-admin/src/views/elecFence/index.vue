<template>
  <div class="elecLay">
    <div class="elecLay-bg">
      <baidu-map
        class="bm-view"
        :ak="MapOptions.ak"
        :center="MapOptions.center"
        :zoom="MapOptions.zoom"
        :scroll-wheel-zoom="MapOptions.scrollwheelzoom"
        @ready="handler"
        @click="clickMap"
      />
    </div>

    <leftFenceList
      class="left"
      :fencelist="FenceList"
      @showEdit="showEdit"
      @showDetails="showDetails"
      @addFence="addFence"
    />

    <transition name="el-zoom-in-center">
      <component
        v-show="showRight"
        class="right"
        :is="rightCom"
        :fencedata="fenceData"
        :map="map"
        :bmap="bmap"
        @closeRight="closeRight"
      />
    </transition>
  </div>
</template>

<script>
import BaiduMap from "vue-baidu-map/components/map/Map.vue";
import { baiduMapAK } from "@/settings";
import LeftFenceList from "./components/LeftFenceList.vue";
import AddFence from "./components/AddFence.vue";
import EditFence from "./components/EditFence.vue";
import { setTimeout } from "timers";
export default {
  components: {
    BaiduMap,
    LeftFenceList,
    AddFence,
    EditFence
  },
  data() {
    return {
      map: null,
      bmap: null,
      // 地图参数
      MapOptions: {
        ak: baiduMapAK,
        // 中心点
        center: { lng: 116.404, lat: 39.915 },
        // 缩放比例
        zoom: 15,
        // 鼠标滚轮缩放
        scrollwheelzoom: true
      },
      // 右侧操作栏显示
      showRight: false,
      FenceList: [],
      rightCom: null,
      fenceData: {
        id: "",
        Region: "",
        Name: "",
        Comment: ""
      }
    };
  },
  mounted() {
    this.getFenceList();
  },
  methods: {
    handler({ BMap, map }) {
      this.map = map;
      this.bmap = BMap;
      var lc = new BMap.LocalCity();
      lc.get(lcr => {
        this.MapOptions.center.lng = lcr.center.lng;
        this.MapOptions.center.lat = lcr.center.lat;
      });
      this.MapOptions.zoom = 14;
    },
    getFenceList() {
      this.$post("Enclosure/list").then(json => {
        this.FenceList = json.data.list;
      });
    },
    showEdit(item) {
      if (this.showRight) {
        this.closeRight(false);
        setTimeout(() => {
          this.fenceData = item;
          this.rightCom = EditFence;
          this.showRight = !this.showRight;
        }, 500);
      } else {
        this.fenceData = item;
        this.rightCom = EditFence;
        this.showRight = !this.showRight;
      }
    },
    showDetails(item) {
      this.showRight = !this.showRight;
    },
    addFence() {
      this.closeRight(false);
      this.rightCom = AddFence;
      this.showRight = !this.showRight;
    },
    clickMap(type, target, point, pixel, overlay) {},
    closeRight(istrue) {
      if (istrue) {
        this.getFenceList();
      }
      this.map.setDefaultCursor("pointer");
      this.map.clearOverlays();
      this.map.removeEventListener("click", this.addpoint);
      this.rightCom = null;
      this.showRight = false;
    }
  }
};
</script>

<style lang="scss" scoped>
//区域高度
$fullheight: calc(100vh - 50px);
.elecLay {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  height: $fullheight;
  .left,
  .right {
    width: 20%;
    right: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
    height: $fullheight;
  }
  .left {
    background-color: rgba(109, 191, 235, 0.3);
  }
  .right {
    overflow-y: auto;
    background-color: rgba(109, 191, 235, 0.5);
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  &-bg {
    position: fixed;
    left: 210px;
    top: 50px;
    right: 0;
    bottom: 0;
  }
}
.app-main {
  padding: 0;
}
.bm-view {
  width: 100%;
  height: 100%;
}
</style>

