const map = new maptalks.Map("map", {
  center: [108.9594, 34.2193],
  zoom: 13.5,
  pitch: 10,
  baseLayer: new maptalks.TileLayer("base", {
    urlTemplate: "{urlTemplate}",
    subdomains: ["a", "b", "c", "d"],
    attribution: "{attribution}"
  })
});

/**start**/
const lineLayer = new maptalks.LineStringLayer("line", { sceneConfig: { depthFunc: "always" }});
const gltfLayer = new maptalks.GLTFLayer("gltf");
const groupLayer = new maptalks.GroupGLLayer("group", [gltfLayer, lineLayer], {
  sceneConfig: {
    postProcess: {
      enable: true,
      antialias: {
        enable: true
      }
    }
  }
}).addTo(map);

const marker = new maptalks.GLTFMarker([108.9585062962617, 34.21792224742464, 55.36973], {
  symbol: {
    url: "{res}/gltf/airplane/scene.gltf",
    modelHeight: 150,
    rotationZ: 150
  }
}).addTo(gltfLayer);

let speed = 5;

let route = [
  { coordinate: [108.92712766113277, 34.231719296446016, 500], time: 301000 },
  { coordinate: [108.98841077270504, 34.23335141067818, 500], time: 541000 },
  { coordinate: [108.98866826477047, 34.229377512075274, 500], time: 781000 },
  { coordinate: [108.92747098388668, 34.22795821712711, 500], time: 901000 },
  { coordinate: [108.92747098388668, 34.22412600129431, 500], time: 1021000 },
  { coordinate: [108.9878099578857, 34.22483568404786, 500], time: 1201000 },
  { coordinate: [108.98763829650875, 34.22043555458956, 500], time: 1441000 },
  { coordinate: [108.92755681457515, 34.219370972610335, 500], time: 1681000 }
];

route = maptalks.formatRouteData(route);

const player = new maptalks.RoutePlayer(route, groupLayer, { speed });


let follow = false;

player.on("playing", (param) => {
  const { coordinate, rotationZ, rotationX } = param;
  marker.setCoordinates(coordinate);
  marker.setRotation(rotationX, 0, rotationZ - 180);
  if (follow) {
    map.setView({
      center: [coordinate[0], coordinate[1]],
      zoom: 16,
      pitch: 10
    });
  }
});


const line = new maptalks.LineString(player.getCoordinates(), {
  symbol:{
    lineColor: "#ea6b48",
    lineWidth: 2
  }
});
lineLayer.addGeometry(line);

function play() {
  player.setSpeed(speed);
  player.play();
}

play();

function changeView(value) {
  if (value === "down") {
    map.animateTo({
      center: [108.9594, 34.2193],
      zoom: 14,
      pitch: 10
    });
    follow = false;
  } else if (value === "side") {
    map.animateTo({
      center: [108.9594, 34.2193],
      zoom: 14,
      pitch: 60
    });
    follow = false;
  } else {
    follow = true;
  }
}
/**end**/

const gui = new mt.GUI();

gui
  .add({
    label: "视角",
    type: "select",
    value: "down",
    options: [
      {
        label: "跟随视角",
        value: "follow"
      },
      {
        label: "俯视视角",
        value: "down"
      },
      {
        label: "侧面视角",
        value: "side"
      }
    ]
  })
  .onChange((value) => {
    changeView(value);
  });

