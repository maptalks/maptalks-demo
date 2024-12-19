const map = new maptalks.Map("map", {
  center: [108.9594, 34.2193],
  zoom: 17.8,
  pitch: 58.4,
  bearing: 0,
  baseLayer: new maptalks.TileLayer("base", {
    urlTemplate: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
    subdomains: ["a", "b", "c", "d"],
    attribution: "&copy; <a href='http://osm.org'>OpenStreetMap</a> contributors, &copy; <a href='https://carto.com/'>CARTO</a>",
  }),
});

const layer = new maptalks.Geo3DTilesLayer("3dtiles", {
  services: [{
    url: "http://resource.dvgis.cn/data/3dtiles/dayanta/tileset.json",

    maximumScreenSpaceError: 1.0,
    pointOpacity: 0.5,
    pointSize: 3,
    heightOffset: -400,
  }, ],
});

/**start**/
const gltfLayer = new maptalks.GLTFLayer("gltf");



const vectorLayer = new maptalks.PointLayer("vector").addTo(map);
const lineLayer = new maptalks.LineStringLayer("line", { sceneConfig: { depthFunc: "always" }});

const symbol = {
  markerFile: "/resources/markers/site.svg",
  markerWidth: 24,
  markerHeight: 26,
};


const groupLayer = new maptalks.GroupGLLayer("group", [layer, lineLayer, gltfLayer], {
  sceneConfig: {
    postProcess: {
      enable: true,
      antialias: {
        enable: true,
      },
    },
  },
}).addTo(map);

let speed = 10;

const planeRoute = [
  {
    coordinate: [108.9585062962617, 34.21792224742464, 55.36973],
    time: 301000
  },
  {
    coordinate: [108.95941857376101, 34.21978314186296, 88.36877],
    time: 541000
  }
];

const planePlayer = new maptalks.RoutePlayer(maptalks.formatRouteData(planeRoute), { speed });

const carRoute = [{
    coordinate: [108.96099472732544, 34.21793272780141, 20.3101],
    time: 301000
  },
  {
    coordinate: [108.96046160202025, 34.217917380427224, 19.65663],
    time: 541000
  },
  {
    coordinate: [108.96047217636101, 34.21897194236598, 22.20198],
    time: 781000
  }
];

const carPlayer = new maptalks.RoutePlayer(maptalks.formatRouteData(carRoute), { speed });

let currentPlayer = planePlayer;

const plane = new maptalks.GLTFMarker(
  planeRoute[0].coordinate, {
    symbol: {
      url: "/resources/gltf/airplane/scene.gltf",
      modelHeight: 10,
      rotationZ: 150,
    },
  }
).addTo(gltfLayer);

const car = new maptalks.GLTFMarker(
  carRoute[0].coordinate, {
    symbol: {
      url: "/resources/gltf/ambulance_car/scene.gltf",
      modelHeight: 10,
      rotationZ: 90,
    },
  }
).addTo(gltfLayer);


planePlayer.on("playing", (param) => {
  const { coordinate, rotationZ, rotationX } = param;
  plane.setCoordinates(coordinate);
  plane.setRotation(rotationX, 0, rotationZ - 180);
});

carPlayer.on("playing", (param) => {
  const { coordinate, rotationZ, rotationX } = param;
  car.setCoordinates(coordinate);
  car.setRotation(rotationX, 0, rotationZ);
});


const planeStartPoint = new maptalks.Marker(
  planeRoute[0].coordinate, {
    symbol,
  }
);
const planeEndPoint = new maptalks.Marker(
  planeRoute[planeRoute.length - 1].coordinate, {
  symbol,
});
const carStartPoint = new maptalks.Marker(
  carRoute[0].coordinate, {
  symbol,
});
const carEndPoint = new maptalks.Marker(
  carRoute[carRoute.length - 1].coordinate, {
  symbol,
});

vectorLayer.addGeometry(planeStartPoint, planeEndPoint, carStartPoint, carEndPoint);

vectorLayer.setZIndex(1);

const planeLine = new maptalks.LineString(planePlayer.getCoordinates(), {
  symbol:{
    lineColor: "#ea6b48",
    lineWidth: 4,
  }
});

const carLine = new maptalks.LineString(carPlayer.getCoordinates(), {
  symbol:{
    lineColor: "#ea6b48",
    lineWidth: 4,
  }
});

lineLayer.addGeometry(planeLine, carLine);

function play() {
  planePlayer.setSpeed(speed);
  planePlayer.play();
  carPlayer.setSpeed(speed);
  carPlayer.play();
}

function pause() {
  planePlayer.pause();
  carPlayer.pause();
}

function replay() {
  planePlayer.cancel();
  carPlayer.cancel();
  play();
}

function setSpeed(value) {
  speed = value;
  planePlayer.setSpeed(value);
  carPlayer.setSpeed(value);
}

function toggleRouteVisivle(value) {
  if (value) {
    lineLayer.show();
  } else {
    lineLayer.hide();
  }
}

function toggleSiteVisivle(value) {
  if (value) {
    vectorLayer.show();
  } else {
    vectorLayer.hide();
  }
}
/**end**/

const gui = new mt.GUI();

gui
  .add({
    type: "button",
    label: "开始播放",
    role: "play",
  })
  .onClick(() => {
    play();
  });

gui
  .add({
    type: "button",
    label: "停止播放",
    role: "pause",
  })
  .onClick(() => {
    pause();
  });

gui
  .add({
    type: "button",
    label: "重新播放",
    role: "clear",
  })
  .onClick(() => {
    replay();
  });

gui
  .add({
    type: "slider",
    label: "速度",
    value: speed,
    min: 1,
    max: 100,
    step: 1,
  })
  .onChange((value) => {
    setSpeed(value);
  });

gui
  .add({
    type: "checkbox",
    label: "显示轨迹",
    value: true,
  })
  .onChange((value) => {
    toggleRouteVisivle(value);
  });

gui
  .add({
    type: "checkbox",
    label: "显示站点",
    value: true,
  })
  .onChange((value) => {
    toggleSiteVisivle(value);
  });
