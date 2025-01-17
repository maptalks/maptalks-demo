const baseLayer = new maptalks.TileLayer("base", {
  urlTemplate: "{urlTemplate}",
  subdomains: ["a", "b", "c", "d"],
  attribution: "{attribution}",
});

// generate tile url
baseLayer.getTileUrl = function (x, y, z) {
  // replace with your own
  // e.g. return a url pointing to your sqlite database
  return maptalks.TileLayer.prototype.getTileUrl.call(this, x, y, z);
};

baseLayer.on("renderercreate", function (e) {
  // load tile image
  // img(Image): an Image object
  // url(String): the url of the tile
  e.renderer.loadTileImage = function (img, url) {
    // mocking getting image's base64
    // replace it by your own, e.g. load from sqlite database
    const remoteImage = new Image();
    remoteImage.crossOrigin = "anonymous";
    remoteImage.onload = function () {
      const base64 = getBase64Image(remoteImage);
      img.src = base64;
    };
    remoteImage.src = url;
  };
});

function getBase64Image(img) {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  const dataURL = canvas.toDataURL("image/png");
  return dataURL;
}

const map = new maptalks.Map("map", {
  center: [-0.113049, 51.498568],
  zoom: 11,
  baseLayer: baseLayer,
});
