const map = new maptalks.Map("map", {
  center: [-0.113049, 51.498568],
  zoom: 14,
  baseLayer: new maptalks.TileLayer("base", {
    urlTemplate: "{urlTemplate}",
    subdomains: ["a", "b", "c", "d"],
    attribution: "{attribution}",
  }),
});

map.on("click", function (param) {
  const infoDom = document.getElementById("info");
  infoDom.innerHTML =
    "<div>" +
    new Date().toLocaleTimeString() +
    ": click map on " +
    param.coordinate.toFixed(5).toArray().join() +
    "</div>" +
    infoDom.innerHTML;
});
