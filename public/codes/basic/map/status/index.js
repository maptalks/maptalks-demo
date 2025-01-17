const map = new maptalks.Map("map", {
  center: [-0.113049, 51.498568],
  zoom: 14,
  centerCross: true,
  baseLayer: new maptalks.TileLayer("base", {
    urlTemplate: "{urlTemplate}",
    subdomains: ["a", "b", "c", "d"],
    attribution: "{attribution}",
  }),
});

map.on("zoomend moving moveend", getStatus);

getStatus();

function getStatus() {
  const extent = map.getExtent(),
    ex = [
      "{",
      "xmin:" + extent.xmin.toFixed(5),
      ", ymin:" + extent.ymin.toFixed(5),
      ", xmax:" + extent.xmax.toFixed(5),
      ", ymax:" + extent.xmax.toFixed(5),
      "}",
    ].join("");
  const center = map.getCenter();
  const mapStatus = [
    "Center : [" + [center.x.toFixed(5), center.y.toFixed(5)].join() + "]",
    "Extent : " + ex,
    "Size : " + map.getSize().toArray().join(),
    "Zoom : " + map.getZoom(),
    "MinZoom : " + map.getMinZoom(),
    "MaxZoom : " + map.getMaxZoom(),
    "Projection : " + map.getProjection().code,
  ];

  document.getElementById("status").innerHTML =
    "<div>" + mapStatus.join("<br>") + "</div>";
}
