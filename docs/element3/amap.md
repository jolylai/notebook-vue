---
title: 高德地图
---

## TODO

- [ ] 地图初始化

```shell
yarn add vue-amap
```

`src/components/AMapDialog`

```vue
<template>
  <el-dialog title="地图" :visible="visible" :before-close="handleDialogCancel">
    <!-- 地图 -->
    <div class="amap-page-container">
      <el-amap-search-box
        class="search-box"
        :search-option="searchOption"
        :on-search-result="onSearchResult"
      />
      <el-amap
        vid="amapDemo"
        :plugin="plugin"
        :center="mapCenter"
        :zoom="12"
        class="amap-demo"
      >
        <el-amap-marker
          v-for="marker in markers"
          :key="marker[0]"
          :position="marker"
        />
      </el-amap>
    </div>
    <!-- footer -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleDialogCancel">取 消</el-button>
      <el-button type="primary" @click="handleDialogOk">确 定</el-button>
    </span>
  </el-dialog>
</template>

<style scoped>
.amap-demo {
  height: 300px;
}

.search-box {
  position: absolute;
  top: 25px;
  right: 20px;
}

.amap-page-container {
  position: relative;
}
</style>

<script>
import Vue from 'vue'
import VueAMap from 'vue-amap'
import { lazyAMapApiLoaderInstance } from 'vue-amap'

Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'd2b94f8c9ec90eb77fa8514bd3f56323',
  plugin: ['AMap.Geolocation', 'AMap.Geocoder']
})

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    ok: {
      type: Function,
      default: function() {}
    }
  },
  data: function() {
    const self = this
    return {
      markers: [[121.59996, 31.197646]],
      searchOption: {
        city: '厦门',
        citylimit: false
      },
      mapCenter: [121.59996, 31.197646],
      plugin: [
        {
          pName: 'Geolocation',
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  const { addressComponent, position } = result
                  self.searchOption.city = addressComponent.city
                  self.mapCenter = [position.lng, position.lat]
                  self.markers = [[position.lng, position.lat]]
                  self.$nextTick()
                }
              })
            }
          }
        }
      ]
    }
  },
  methods: {
    handleDialogOk() {
      const { lng, lat, addressComponent, formattedAddress } = this
      if (!this.lng || !this.lat) {
        this.$message({
          showClose: true,
          message: '请选择地址',
          type: 'warning'
        })
        return
      }
      //   传出的数据
      const { country, province, city, district } = addressComponent
      const data = {
        longitude: lng,
        latitude: lat,
        address: formattedAddress,
        country,
        province,
        city,
        area: district
      }
      this.$emit('ok', data)
      this.handleDialogCancel()
    },
    handleDialogCancel() {
      this.$emit('update:visible', false)
    },
    onSearchResult(pois) {
      if (Array.isArray(pois)) {
        const [{ lng, lat }] = pois
        this.mapCenter = [lng, lat]
        this.lng = lng
        this.lat = lat
        this.markers = [this.mapCenter]
        this.getAddress(this.mapCenter)
      }
    },
    /**
     * @param {Array} lnglat [lng, lat]
     */
    getAddress(lnglat) {
      const self = this
      lazyAMapApiLoaderInstance.load().then(() => {
        // eslint-disable-next-line
        AMap.plugin('AMap.Geocoder', function() {
          // eslint-disable-next-line
          const geocoder = new AMap.Geocoder()
          geocoder.getAddress(lnglat, function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // result中对应详细地理坐标信息
              const { addressComponent, formattedAddress } = result.regeocode
              self.addressComponent = addressComponent
              self.formattedAddress = formattedAddress
            } else {
              console.log('未查到相关地址')
            }
          })
        })
      })
    }
  }
}
</script>
```

## 思考

- 再组件中使用 `Vue.use()` 和在 `main.js` 中使用有什么区别
