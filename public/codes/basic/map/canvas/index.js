const res =
  (window.devicePixelRatio ||
    window.screen.deviceXDPI / window.screen.logicalXDPI) > 1;
if (res) {
  // retina, see https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
  const canvas = document.getElementById("map");
  const r = 2;
  canvas.width *= r;
  canvas.height *= r;
  canvas.style.cssText +=
    "width:" +
    Math.round(canvas.width / r) +
    "px;height:" +
    Math.round(canvas.height / r) +
    "px";
}

const map = new maptalks.Map("map", {
  center: [-0.113049, 51.498568],
  zoom: 14,
  zoomControl: true, // ignored in a canvas container
  scaleControl: true, // ignored in a canvas container
  baseLayer: new maptalks.TileLayer("base", {
    urlTemplate: "{urlTemplate}",
    subdomains: ["a", "b", "c", "d"],
    attribution: "{attribution}",
  }),
});
