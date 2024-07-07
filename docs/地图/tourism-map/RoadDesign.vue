<template>
  <el-checkbox v-model="isMerging" @change="handleIsMergingChange">合并多条路线</el-checkbox>
  <ol class="routes-list">
    <li v-for="(item, index) in allRoutes" :class="{active: index === selectedIndex || mergingOverlays[item.name]}" :key="index" @click="handleShowRoute(item, index)">
      <span v-if="editingName === item.name" @dblclick="handleEditName(item)">{{ item.name }}</span>
      <el-input v-else v-model="item.tempName" placeholder="请输入名称" @blur="handleSaveEditName(item)" />
      <button class="btn-delete" @click.stop="handleDelete(index)">删除</button>
    </li>
  </ol>
  <template v-if="confirmNameVisible">
    <div class="route-save-confirm--mask"></div>
    <div class="route-save-confirm">
      <input v-model="currentName" placeholder="请输入路线名称">
      <button @click="confirmNameVisible = false">取消</button>
      <button @click="saveRoute">保存</button>
    </div>
  </template>
  <div id="map" style="width: 100%; height: 500px;">
    <div class="btn-group">
      <button v-show="!isDrawing" @click="drawRoute">规划路线</button>
      <div v-show="isDrawing" style="color: red;">请点击地图上的位置绘制路线，双击结束！</div>
      <button v-show="roadShowing && currentRoute" @click="confirmNameVisible = true;currentName = undefined;">保存路线</button>
      <button v-show="roadShowing" @click="clearRoute">清空路线</button>
      <button v-if="isMerging" :disabled="Object.keys(mergingOverlays).length < 2" @click="handleSaveMerge">保存合并路线</button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';

const routeKey = "route-key";
const allRoutes = reactive(getRoutes())
// 存储路线
let currentRoute = ref(null);
let currentName = ref("");
let confirmNameVisible = ref(false);
let isDrawing = ref(false);
let map = null;
let roadOverlay = null;
let selectedIndex = ref(-1);
let isMerging = ref(false);
let editingName = ref();
let mergingOverlays = reactive({});
let mergingOverlaysMap = {};
const roadStyle = {
      strokeColor: "#3366FF",
      strokeOpacity: 1,
      strokeWeight: 5,
      strokeStyle: "solid"
  };
// 绘制完成的路线正在显示
let roadShowing = ref(false);
onMounted(() => {
      // 检查是否已经加载了百度地图API的脚本
      if (!document.querySelector('script[src="https://webapi.amap.com/maps?v=2.0&key=4d62f22699b61216316fc69765b32937"]')) {
        const script1 = document.createElement('script');
        script1.type = 'text/javascript';
        script1.innerHTML = `window._AMapSecurityConfig = {
    securityJsCode: "8623f4e00c62956918beb081ab5f87a1",
  };`;
        document.head.appendChild(script1);
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://webapi.amap.com/maps?v=2.0&key=4d62f22699b61216316fc69765b32937';
        document.head.appendChild(script);

        // 可以在脚本加载完成后执行一些操作
        script.onload = () => {
          // 在这里可以初始化百度地图等
          // 确保百度地图API脚本加载完成
          if (typeof AMap !== 'undefined') {
            map = new AMap.Map('map', {
                zoom:15.35,
                center: [106.507926,29.56852]
            });

            var marker = new AMap.Marker({
                position: [106.507926,29.56852] // 标记点坐标
            });
            marker.setMap(map);
            // 为地图实例添加点击事件监听
            // map.on('click', function(e) {
            //     // 缩放比例
            //     // var zoom = map.getZoom();
            //     var lnglat = [e.lnglat.getLng(), e.lnglat.getLat()];
            //     // 在点击位置添加标记点
            //     new AMap.Marker({
            //         position: lnglat,
            //         map: map
            //     });
    
            // });
          } else {
            console.error('地图API未成功加载');
          }
        };

        // 错误处理
        script.onerror = (error) => {
          console.error('地图API脚本加载失败', error);
        };
      }
});

/**
 * 绘制路线
 */
function drawRoute() {
  clearRoute();
  isDrawing.value = !isDrawing.value;
  if (isDrawing.value) {
    // 引入绘制工具插件
    console.log(111, map)
    AMap.plugin('AMap.MouseTool', function() {
      var mouseTool = new AMap.MouseTool(map); // 实例化MouseTool
      console.log(3333343, mouseTool)
      // 开启绘制折线模式
      mouseTool.polyline(roadStyle);
      console.log(333333, roadOverlay)
      
      // 监听绘制完成事件
      mouseTool.on('draw', function(event) {
        isDrawing.value = false;
        roadOverlay = event.obj;
        currentRoute.value = roadOverlay.getPath(); // 获取绘制的线路坐标数组
        roadShowing.value = true;
        mouseTool.close();
        console.log(currentRoute.value);
        // 可以在这里进行后续操作，比如保存路线数据等
      });
    });
  }
}

/**
 * 将当前路线信息存起来
 */
function saveRoute() {
  if (!currentName.value) {
    return;
  }
  if (!currentRoute.value) {
    return;
  }
  allRoutes.push({
    name: currentName.value,
    path: currentRoute.value
  });
  localStorage.setItem(routeKey, JSON.stringify(allRoutes));
  clearRoute();
  confirmNameVisible.value = false;
}

/**
 * 获取缓存中的路线信息
 */
function getRoutes() {
  return JSON.parse(localStorage.getItem(routeKey) || "[]");
}

/**
 * 清除路线显示
 */
function clearRoute() {
  currentRoute.value = null;
  selectedIndex.value = null;
  roadShowing.value = false;
  console.log(3434, roadOverlay)
  if(roadOverlay) {
    map.remove(roadOverlay);
    roadOverlay = null;
  }
}

/**
 * 删除某条路线
 */
function handleDelete(index) {
  allRoutes.splice(index, 1);
  localStorage.setItem(routeKey, JSON.stringify(allRoutes));
}

/**
 * 显示选定路线
 */
function handleShowRoute(item, index) {
  if (isMerging.value) {
    // 原本是显示的，取消显示
    if(mergingOverlaysMap[item.name]) {
      console.log(3434343434, mergingOverlaysMap[item.name])
      map.remove(mergingOverlaysMap[item.name]);
      delete mergingOverlaysMap[item.name];
      delete mergingOverlays[item.name];
    } else {
      // 原本没有显示的，添加显示
    mergingOverlaysMap[item.name] = new AMap.Polyline({
        path: item.path,
        ...roadStyle
      });
      mergingOverlaysMap[item.name].setMap(map);
      console.log(22222222222, item.name)
      mergingOverlays[item.name] = true;
    }
    return;
  }
  clearRoute();
  selectedIndex.value = index;
  roadShowing.value = true;
  console.log(333, item, typeof item)
  // 使用坐标信息创建折线并添加到地图上
  roadOverlay = new AMap.Polyline({
      path: item.path,
      ...roadStyle
  });
  roadOverlay.setMap(map);
}
/**
 * 清空所有状态
 */
function handleIsMergingChange() {
  clearRoute();
  Object.keys(mergingOverlaysMap).forEach(v => {
    map.remove(mergingOverlaysMap[v]);
    delete mergingOverlays[v];
  })
  mergingOverlaysMap = {};
}

function handleSaveMerge() {
  allRoutes.push({
    name: `合并${new Date().getTime()}`,
    path: allRoutes.filter(v => mergingOverlays[v.name]).reduce((arr, item) => {
      arr.push(...item.path);
      return arr;
    }, [])
  })
  localStorage.setItem(routeKey, JSON.stringify(allRoutes));
}

function handleEditName(item) {
  item.tempName = ref(item.name);
  editingName.value = item.name;
}

function handleSaveEditName(item) {
  editingName.value = undefined;
  item.name = item.tempName;
  delete item.tempName;
  localStorage.setItem(routeKey, JSON.stringify(allRoutes));
}
</script>

<style scoped lang="less">
#map {
  position: relative;
}
.routes-list {
  li {
    &:hover {
      background-color: pink;
    }
    &.active {
      background-color: skyblue;
    }
  }
  button.btn-delete {
    float: right;
  }
}
.common-button() {
  background-color: skyblue;
  border-radius: 4px;
  padding: 3px 6px;
}
.route-save-confirm--mask {
  position: fixed;
  z-index: 9;
  inset: 0;
  background: #ddd;
}
.route-save-confirm {
  position: fixed;
  top: 50%;
  width: 300px;
  background: #fff;
  padding: 20px 60px;
  z-index: 9;
  border-radius: 4px;
  left: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  button {
    .common-button();
    width: 80px;
    margin-top: 20px;
    & + button {
      margin-left: 10px;
    }
  }
}
.btn-group {
  position: absolute;
  right: 0;
  z-index: 1;
  gap: 10px;
  display: flex;

  button {
    background-color: skyblue;
    border-radius: 4px;
    padding: 3px 6px;
  }
}
</style>