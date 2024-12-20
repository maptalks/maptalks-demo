const map = new maptalks.Map("map", {
  center: [94.50812103, 29.45095163, 1469],
  zoom: 11,
  pitch: 60
});

// const token =
//   "pk.eyJ1IjoibWFwYm94LWdsLWpzIiwiYSI6ImNram9ybGI1ajExYjQyeGxlemppb2pwYjIifQ.LGy5UGNIsXUZdYMvfYRiAQ";
const token =
  "pk.eyJ1IjoiemhlbmZ1IiwiYSI6ImNsaTduNXM4ZjBtZnczbG1wbmNjenQ0OW8ifQ.UOkJDZYcC1zs9cXny6P8YQ";

/**start**/
const targetCoord = new maptalks.Coordinate(0, 0);
const POINT0 = new maptalks.Coordinate(0, 0);
const POINT1 = new maptalks.Coordinate(0, 0);

const layers = [
  new maptalks.TileLayer("base", {
    maxAvailableZoom: 20,
    spatialReference: {
      projection: "EPSG:3857"
    },
    urlTemplate: "http://webst{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
    subdomains: ["01", "02", "03", "04"],
    offset: function (z) {
      const center = map.getCenter();
      const c = maptalks.CRSTransform.transform(center.toArray(), "GCJ02", "WGS84");
      targetCoord.set(c[0], c[1]);
      const offset = map
        .coordToPoint(center, z, POINT0)
        ._sub(map.coordToPoint(targetCoord, z, POINT1));
      return offset._round().toArray();
    },
    attribution:
      '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>'
  })
];

const terrain = {
  type: "mapbox",
  tileSize: 512,
  spatialReference: "preset-3857-512",
  urlTemplate: `https://{s}.tiles.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=${token}`,
  subdomains: ["a", "b", "c", "d"]
};

const group = new maptalks.GroupGLLayer("group", layers, {
  terrain
});
group.addTo(map);

function setTerrain(value) {
  if (value) {
    group.setTerrain(terrain);
  } else {
    group.setTerrain(null);
  }
}
/**end**/

const gui = new mt.GUI();

gui
  .add({
    type: "checkbox",
    label: "显示地形",
    value: true
  })
  .onChange((value) => {
    setTerrain(value);
  });
