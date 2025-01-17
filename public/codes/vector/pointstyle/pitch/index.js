const map = new maptalks.Map("map", {
  center: [-74.00912099912109, 40.71107610933129],
  zoom: 16,
  pitch: 30,
  lights: {
    directional: {
      direction: [1, 0, -1],
      color: [1, 1, 1]
    },
    ambient: {
      resource: {
        url: {
          front: "{res}/hdr/gradient/front.png",
          back: "{res}/hdr/gradient/back.png",
          left: "{res}/hdr/gradient/left.png",
          right: "{res}/hdr/gradient/right.png",
          top: "{res}/hdr/gradient/top.png",
          bottom: "{res}/hdr/gradient/bottom.png"
        },
        prefilterCubeSize: 32
      },
      exposure: 1,
      hsv: [0, 0.34, 0],
      orientation: 0
    }
  }
});

/**start**/
const layer = new maptalks.GeoJSONVectorTileLayer("geo", {
  data: "{res}/geojson/area.geojson"
});

layer.on("dataload", (e) => {
  map.fitExtent(e.extent);
});

const style = {
  style: [
    {
      filter: true,
      renderPlugin: {
        dataConfig: {
          type: "fill"
        },
        type: "fill"
      },
      symbol: {
        polygonFill: "#efc69e"
      }
    },
    {
      filter: true,
      renderPlugin: {
        dataConfig: {
          type: "line"
        },
        type: "line"
      },
      symbol: {
        lineColor: "#fff"
      }
    },
    {
      filter: true,
      renderPlugin: {
        dataConfig: {
          type: "point"
        },
        sceneConfig: {
          collision: true,
          fading: true,
          depthFunc: "always"
        },
        type: "icon"
      },
      symbol: [
        {
          markerType: "ellipse",
          markerFill: [0.53, 0.77, 0.94, 1],
          markerHeight: 80,
          markerWidth: 80,
          markerLineColor: [0.2, 0.29, 0.39, 1],
          markerLineWidth: 3,
          markerPitchAlignment: "map",
          textName: "{name}",
          textSize: 15,
          textPitchAlignment: "map"
        }
      ]
    }
  ]
};
layer.setStyle(style);
/**end**/

const sceneConfig = {
  environment: {
    enable: true,
    mode: 1,
    level: 0,
    brightness: 0
  },
  postProcess: {
    enable: true,
    antialias: {
      enable: true
    }
  }
};

const groupLayer = new maptalks.GroupGLLayer("group", [layer], {
  sceneConfig
});
groupLayer.addTo(map);
