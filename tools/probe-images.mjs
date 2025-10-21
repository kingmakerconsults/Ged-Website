import fs from "node:fs";
import http from "node:http";

const arr = JSON.parse(fs.readFileSync("image_metadata_final.json", "utf8"));
const pick = (n = 30) => arr.sort(() => 0.5 - Math.random()).slice(0, n);

function head(path) {
  return new Promise((res) => {
    const req = http.request(
      {
        host: "localhost",
        port: process.env.PORT || 3000,
        path,
        method: "GET",
      },
      (r) => {
        res({ status: r.statusCode, path });
        r.resume();
      },
    );
    req.on("error", () => res({ status: 0, path }));
    req.end();
  });
}

const sample = pick(30);
const results = await Promise.all(sample.map((m) => head(`/img/${encodeURIComponent(m.file)}`)));
const bad = results.filter((r) => r.status !== 200);
if (bad.length) {
  console.error("BAD_IMAGES", bad.slice(0, 5));
  process.exit(3);
}
console.log("PROBE_OK", results.length);
