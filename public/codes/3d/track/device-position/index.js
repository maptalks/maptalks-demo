const map = new maptalks.Map("map", {
  center: [108.9594, 34.2193],
  zoom: 17.8,
  pitch: 58.4,
  bearing: 0,
  baseLayer: new maptalks.TileLayer("base", {
    urlTemplate: "{urlTemplate}",
    subdomains: ["a", "b", "c", "d"],
    attribution: "{attribution}"
  })
});

const geo3DTileslayer = new maptalks.Geo3DTilesLayer("3dtiles", {
  services: [
    {
      url: "http://resource.dvgis.cn/data/3dtiles/dayanta/tileset.json",
      maximumScreenSpaceError: 1.0,
      pointOpacity: 0.5,
      pointSize: 3,
      heightOffset: -400
    }
  ]
});

/**start**/
const lineLayer = new maptalks.LineStringLayer("line", { sceneConfig: { depthFunc: "always" } });
const gltfLayer = new maptalks.GLTFLayer("gltf");
const groupGLLayer = new maptalks.GroupGLLayer("group", [geo3DTileslayer, lineLayer, gltfLayer], {
  sceneConfig: {
    postProcess: {
      enable: true,
      antialias: {
        enable: true
      }
    }
  }
}).addTo(map);

const gltfMarker1 = new maptalks.GLTFMarker([108.958438, 34.217715, 17.5], {
  symbol: {
    url: "{res}/gltf/tractor/tractor.gltf",
    rotationZ: 180,
    modelHeight: 25,
    animation: true,
    loop: true,
    uniforms: {
      roughnessFactor: 0.8,
      metallicFactor: 0.2
    }
  }
}).addTo(gltfLayer);
gltfMarker1.setInfoWindow({
  content: "播种机1"
});
gltfMarker1.openInfoWindow();

const gltfMarker2 = new maptalks.GLTFMarker([108.960868, 34.217992, 19.5], {
  symbol: {
    url: "{res}/gltf/tractor/tractor.gltf",
    rotationZ: -90,
    modelHeight: 25,
    animation: true,
    loop: true,
    uniforms: {
      roughnessFactor: 0.8,
      metallicFactor: 0.2
    }
  }
}).addTo(gltfLayer);
gltfMarker2.setInfoWindow({
  content: "播种机2",
  dx: 20
});
gltfMarker2.openInfoWindow();

let speed = 7;
let route1 = [
  { coordinate: [108.958438, 34.217715, 17.5], time: 301000 },
  { coordinate: [108.958403, 34.219752, 19.2], time: 541000 },
];

let route2 = [
  { coordinate: [108.96099472732544, 34.21793272780141, 20.3101], time: 301000 },
  { coordinate: [108.96046160202025, 34.217917380427224, 19.656632], time: 541000 },
  { coordinate: [108.96047217636101, 34.21897194236598, 22.20198], time: 781000 },
];


route1 = maptalks.formatRouteData(route1);
const player1 = new maptalks.RoutePlayer(route1, { speed });
const routeLine1 = new maptalks.LineString(player1.getCoordinates(), {
  symbol: {
    lineColor: "#ea6b48",
    lineWidth: 2
  }
});


route2 = maptalks.formatRouteData(route2);
const player2 = new maptalks.RoutePlayer(route2, { speed });
const routeLine2 = new maptalks.LineString(player2.getCoordinates(), {
  symbol: {
    lineColor: "#dbd34b",
    lineWidth: 2
  }
});
lineLayer.addGeometry(routeLine1, routeLine2);

player1.on("playing", (param) => {
  const { coordinate, rotationZ, rotationX } = param;
  gltfMarker1.setCoordinates(coordinate);
  gltfMarker1.setRotation(rotationX, 0, rotationZ - 180);
});

player2.on("playing", (param) => {
  const { coordinate, rotationZ, rotationX } = param;
  gltfMarker2.setCoordinates(coordinate);
  gltfMarker2.setRotation(rotationX, 0, rotationZ - 180);
});

function play() {
  player1.play();
  player2.play();
}

play()
/**end**/

// play();
function positioningA() {
  const coordinates = gltfMarker1.getCoordinates();
  map.animateTo({
    center: [coordinates.x, coordinates.y],
    // bearing: 0,
    pitch: 0,
    zoom: 18
  });
}
function positioningB() {
  const coordinates = gltfMarker2.getCoordinates();
  map.animateTo({
    center: [coordinates.x, coordinates.y],
    // bearing: -90,
    pitch: 0,
    zoom: 18
  });
}

const gui = new mt.GUI();

gui
  .add({
    label: "选择车辆",
    type: "select",
    value: "1",
    options: [
      {
        label: "播种机1",
        value: "1"
      },
      {
        label: "播种机2",
        value: "2"
      }
    ]
  })
  .onChange((value) => {
    if (value === "1") {
      positioningA();
    } else {
      positioningB();
    }
  });

