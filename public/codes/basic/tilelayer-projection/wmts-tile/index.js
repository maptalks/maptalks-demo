const url =
  "https://t0.tianditu.gov.cn/vec_c/wmts?request=GetCapabilities&service=wmts&tk=6901643c38b65f1f9770196343cf72b2";

maptalks.SpatialReference.loadWMTS(url, (err, conf) => {
  if (err) {
    throw new Error(err);
  }
  const params = conf[0];
  params.urlTemplate += "&tk=6901643c38b65f1f9770196343cf72b2";
  let spatialReference = params.spatialReference;
  const tileLayer = new maptalks.TileLayer("tilelayer", params);
  spatialReference = params.spatialReference;

  new maptalks.Map("map", {
    center: [114.3404041441181, 30.548730054693106],
    zoom: 10,
    spatialReference: spatialReference,
    baseLayer: tileLayer,
  });
});
