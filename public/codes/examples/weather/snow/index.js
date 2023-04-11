const map = new maptalks.Map("map", {
  center: [-73.88756247170068, 40.68791104561976],
  zoom: 17.1,
  bearing: 168.1,
  pitch: 71.2,
  lights: {
    directional: {
      direction: [0.5, 0, -1],
      color: [1, 1, 1],
    },
    ambient: {
      resource: {
        url: "{res}/hdr/photo_studio_01_1k.hdr",
        sh: [
          0.35916795154960834, 0.37332532618710934, 0.3749743179025387,
          0.001946880750939448, 0.002781113205316295, 0.0038630691377190348,
          0.009650859029741232, 0.010718360804091567, 0.011421607564558255,
          0.024126928868387097, 0.024543636739605402, 0.023797007154584764,
          -0.004899031092214359, -0.0048242535892225324, -0.005206229725454972,
          -0.005589141785593036, -0.005507435440934302, -0.005472906061627375,
          -0.009765483272152252, -0.010407014201306911, -0.009769691118007934,
          -0.081841972255034, -0.0852762331787664, -0.0861865957833508,
          -0.005844864502254523, -0.006733772922993404, -0.005910269638953521,
        ],
      },
      exposure: 0.787,
      hsv: [0, 0, 0],
      orientation: 0,
    },
  },
});

const vtStyle = [
  {
    filter: [
      "all",
      ["==", "$layer", "entertainment"],
      ["==", "$type", "Polygon"],
    ],
    renderPlugin: {
      dataConfig: {
        type: "fill",
      },
      sceneConfig: {},
      type: "fill",
    },
    symbol: {
      polygonBloom: false,
      polygonFill: [
        0.5725490196078431, 0.6980392156862745, 0.5450980392156862, 1,
      ],
      polygonOpacity: 1,
      polygonPatternFile: null,
    },
  },
  {
    filter: [
      "all",
      ["==", "$layer", "entertainment"],
      ["==", "$type", "Polygon"],
    ],
    renderPlugin: {
      dataConfig: {
        type: "line",
      },
      sceneConfig: {},
      type: "line",
    },
    symbol: {
      lineBloom: false,
      lineCap: "butt",
      lineColor: [0.73, 0.73, 0.73, 1],
      lineDasharray: [0, 0, 0, 0],
      lineDashColor: [1, 1, 1, 0],
      lineDx: 0,
      lineDy: 0,
      lineJoin: "miter",
      lineOpacity: 1,
      linePatternAnimSpeed: 0,
      linePatternFile: null,
      lineStrokeWidth: 0,
      lineStrokeColor: [0, 0, 0, 1],
      lineJoinPatternMode: 0,
      lineWidth: 2,
    },
  },
  {
    filter: ["all", ["==", "$layer", "building"], ["==", "$type", "Polygon"]],
    renderPlugin: {
      type: "lit",
      dataConfig: {
        type: "3d-extrusion",
        altitudeProperty: "height",
        minHeightProperty: "min_height",
        altitudeScale: 1,
        defaultAltitude: 10,
        topThickness: 0,
        top: true,
        side: true,
      },
      sceneConfig: {
        animation: null,
        animationDuration: 800,
      },
    },
    symbol: {
      bloom: false,
      ssr: false,
      polygonOpacity: 1,
      material: {
        baseColorTexture: null,
        baseColorFactor: [1, 1, 1, 1],
        hsv: [0, 0, -0.32],
        baseColorIntensity: 1.532,
        contrast: 1,
        outputSRGB: 1,
        metallicRoughnessTexture: null,
        roughnessFactor: 1,
        metallicFactor: 0,
        normalTexture: null,
        noiseTexture: null,
        uvScale: [1, 1],
        uvOffset: [0, 0],
        uvRotation: 0,
        uvOffsetAnim: [0, 0],
        normalMapFactor: 1,
        normalMapFlipY: 0,
        bumpTexture: null,
        bumpScale: 0.02,
        clearCoatThickness: 5,
        clearCoatFactor: 0,
        clearCoatIor: 1.4,
        clearCoatRoughnessFactor: 0.04,
        occlusionTexture: null,
        emissiveTexture: "{res}/textures/897/1.jpg",
        emissiveFactor: [
          0.9333333333333333, 0.9254901960784314, 0.9607843137254902,
        ],
        emitColorFactor: 0.31,
        emitMultiplicative: 0,
      },
    },
  },
  {
    filter: [
      "all",
      ["==", "$layer", "secondary-road"],
      ["==", "$type", "LineString"],
    ],
    renderPlugin: {
      dataConfig: {
        type: "line",
      },
      sceneConfig: {},
      type: "line",
    },
    symbol: {
      lineBloom: false,
      lineCap: "butt",
      lineColor: [1, 1, 1, 1],
      lineDasharray: [0, 0, 0, 0],
      lineDashColor: [1, 1, 1, 0],
      lineDx: 0,
      lineDy: 0,
      lineJoin: "miter",
      lineOpacity: 1,
      linePatternAnimSpeed: 0,
      linePatternFile: "{res}/patterns/d4b.jpg",
      lineStrokeWidth: 0,
      lineStrokeColor: [0, 0, 0, 1],
      lineJoinPatternMode: 0,
      lineWidth: {
        type: "exponential",
        default: 2,
        stops: [
          [14, 2],
          [15, 4],
          [16, 10],
          [17, 20],
          [18, 50],
          [20.7, 100],
          [22, 200],
        ],
      },
    },
  },
];

const vtLayer = new maptalks.VectorTileLayer("vt", {
  urlTemplate: "http://tile.maptalks.com/test/planet-single/{z}/{x}/{y}.mvt",
  spatialReference: "preset-vt-3857",
  style: vtStyle,
});

const gltfLayer = new maptalks.GLTFLayer("gltf");

const gltfMarker = new maptalks.GLTFMarker(
  [-73.88713688860861, 40.68848442450471],
  {
    symbol: {
      shadow: true,
      url: "{res}/gltf/29c/scene.gltf",
      scaleX: 8.12466,
      scaleY: 8.12466,
      scaleZ: 8.12466,
      rotationZ: 299.6285,
      shader: "pbr",
      uniforms: {
        polygonFill: [1, 1, 1, 1],
        polygonOpacity: 1,
        baseColorIntensity: 1,
        outputSRGB: 1,
      },
    },
    zoomOnAdded: 17,
  }
);

gltfLayer.addGeometry(gltfMarker);

/**start**/
const sceneConfig = {
  environment: {
    enable: true,
    mode: 1,
    level: 0,
    brightness: 0.489,
  },
  shadow: {
    type: "esm",
    enable: true,
    quality: "high",
    opacity: 0.5,
    color: [0, 0, 0],
    blurOffset: 1,
  },
  postProcess: {
    enable: true,
  },
  weather: {
    enable: true,
    snow: {
      enable: true,
      snowGroundTexture: "{res}/images/perlin.png",
    },
  },
  ground: {
    enable: true,
    renderPlugin: {
      type: "fill",
    },
    symbol: {
      polygonFill: [0.803921568627451, 0.803921568627451, 0.803921568627451, 1],
      polygonOpacity: 1,
    },
  },
};
/**end**/

const groupGLLayer = new maptalks.GroupGLLayer("gl", [vtLayer, gltfLayer], {
  sceneConfig,
}).addTo(map);
