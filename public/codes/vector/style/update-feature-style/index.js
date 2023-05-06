const map = new maptalks.Map("map", {
  center: [-74.00912099912109, 40.71107610933129],
  zoom: 16,
  pitch: 70,
  lights: {
    directional: {
      direction: [1, 0, -1],
      color: [1, 1, 1],
    },
    ambient: {
      resource: {
        url: {
          front: "{res}/hdr/gradient/front.png",
          back: "{res}/hdr/gradient/back.png",
          left: "{res}/hdr/gradient/left.png",
          right: "{res}/hdr/gradient/right.png",
          top: "{res}/hdr/gradient/top.png",
          bottom: "{res}/hdr/gradient/bottom.png",
        },
        prefilterCubeSize: 1024,
      },
      exposure: 1,
      hsv: [0, 0.34, 0],
      orientation: 0,
    },
  },
});

/**start**/
const style = {
  style: [
    {
      filter: true,
      renderPlugin: {
        dataConfig: {
          type: "fill",
        },
        sceneConfig: {},
        type: "fill",
      },
      symbol: {
        polygonFill: "#89c2be",
        polygonOpacity: 1,
      },
    },
    {
      filter: true,
      renderPlugin: {
        dataConfig: {
          type: "line",
        },
        sceneConfig: {},
        type: "line",
      },
      symbol: {
        lineColor: "#E2E2E2",
        lineWidth: 2,
      },
    },
  ],
  featureStyle: [
    {
      id: 12,
      style: [
        {
          renderPlugin: {
            dataConfig: {
              type: "fill",
            },
            sceneConfig: {},
            type: "fill",
          },
          symbol: {
            polygonFill: "#89c2be",
            polygonOpacity: 1,
          },
        },
        {
          renderPlugin: {
            dataConfig: {
              type: "line",
            },
            sceneConfig: {},
            type: "line",
          },
          symbol: {
            lineColor: "#E2E2E2",
            lineWidth: 2,
          },
        },
      ],
    },
  ],
};

const geo = new maptalks.GeoJSONVectorTileLayer("geo", {
  data: "{res}/geojson/area.geojson",
  style,
});

geo.on("dataload", (e) => {
  map.fitExtent(e.extent);
});

function updateFeatureStyle() {
  geo.updateFeatureSymbol(0, 0, {
    polygonFill: "#efc69e",
  });
  geo.updateFeatureSymbol(0, 1, {
    lineColor: "#CB7575",
  });
}
/**end**/

const groupLayer = new maptalks.GroupGLLayer("group", [geo], {
  sceneConfig: {
    environment: {
      enable: true,
      mode: 1,
      level: 0,
      brightness: 0,
    },
  },
});
groupLayer.addTo(map);

const gui = new mt.GUI();

gui
  .add({
    type: "button",
    text: "Update feature style",
  })
  .onClick(() => {
    updateFeatureStyle();
  });
