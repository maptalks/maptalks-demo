const map = new maptalks.Map("map", {
  center: [114.31135353780905, 30.5437759669405, 46.900001525878906],
  zoom: 18.20975314908587,
  pitch: 0,
  bearing: 0,
});

const targetCoord = new maptalks.Coordinate(0, 0);
const POINT0 = new maptalks.Coordinate(0, 0);
const POINT1 = new maptalks.Coordinate(0, 0);

const skinLayers = [
  new maptalks.TileLayer("base", {
    maxAvailableZoom: 20,
    spatialReference: {
      projection: "EPSG:3857",
    },
    offset: function (z) {
      const center = map.getCenter();
      const c = maptalks.CRSTransform.transform(
        center.toArray(),
        "GCJ02",
        "WGS84"
      );
      targetCoord.set(c[0], c[1]);
      const offset = map
        .coordToPoint(center, z, POINT0)
        ._sub(map.coordToPoint(targetCoord, z, POINT1));
      return offset._round().toArray();
    },
    urlTemplate:
      "http://webst{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
    subdomains: ["01", "02", "03", "04"],
    attribution:
      '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>',
  }),
];

const group = new maptalks.GroupGLLayer("group", skinLayers);
group.addTo(map);

/**start**/
const terrain = {
  type: "mapbox",
  tileSize: 512,
  spatialReference: "preset-3857-512",
  urlTemplate:
    "https://{s}.tiles.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=pk.eyJ1IjoibWFwYm94LWdsLWpzIiwiYSI6ImNram9ybGI1ajExYjQyeGxlemppb2pwYjIifQ.LGy5UGNIsXUZdYMvfYRiAQ",
  subdomains: ["a", "b", "c", "d"],
};

const gui = new mt.GUI();

gui
  .add({
    type: "slider",
    label: "地形高度",
    min: 1,
    max: 50,
    step: 1,
    value: 5,
  })
  .onChange((value) => {
    console.log(value);
  });
/**end**/
