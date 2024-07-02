<a href="https://roblabs.com"><img src="https://avatars.githubusercontent.com/u/118112" style="border-radius:4px" width="20" /></a>
<a href="https://github.com/roblabs/geojson-tools"><img src="https://img.shields.io/github/stars/roblabs/geojson-tools?label=Source&amp;style=social" alt="GitHub Repo Source" /></a>
<img src="https://img.shields.io/github/license/roblabs/geojson-tools" alt="GitHub" />
[![vscode.dev](https://img.shields.io/badge/VSCode-.dev-blue)][vscode.dev]

# 🛠️ GeoJSON Tools 

A collection of Node based GeoJSON tools that plays well with Visual Studio Code.

## 🔨Visual Studio Code Extensions

* [GeoJSON.IO for VSCode] : https://marketplace.visualstudio.com/items?itemName=swallow.geojson-io-for-vscode "Create, Edit and Preview GeoJSON Data In VSCode"
* [Rainbow CSV] : https://marketplace.visualstudio.com/items?itemName=mechatroner.rainbow-csv "Highlight CSV and TSV files"
* Plus other useful VS Code extensions
    * Markdown editing (PDF, paste image, GitHub style preview)
    * Git Graph

## 🪓 GeoJSON Data

### 🔧 Creating GeoJSON

* [geojson-random] : https://www.npmjs.com/package/geojson-random "Generate random GeoJSON features."

### 🪚 Converting GeoJSON

* [geojson2csv] : https://www.npmjs.com/package/geojson2csv "converting a geojson file to a csv file"

### 🗜️ Precision for GeoJSON

* [geojson-precision-ts] : https://www.npmjs.com/package/geojson-precision-ts "Remove meaningless precision from GeoJSON"

### ⚙️ Validate GeoJSON

* [@mapbox/geojsonhint] : https://www.npmjs.com/package/@mapbox/geojsonhint "complete, fast, standards-based validation for geojson"

---

### 🔬 Visualizing GeoJSON

* [geojsonio-cli] : https://www.npmjs.com/package/geojsonio-cli "Use the command line to open GeoJSON"

#### Visualize at GeoJSON.io

* You can visualize your GeoJSON at <https://geojson.io>

```bash
# from a command line, open GeoJSON on disk
geojsonio data/parks.geojson
```

#### Visualize with NPS Park Tiles

* You can visualize your GeoJSON at <https://RobLabs.com/geojson> or inspect the [source for a GeoJSON visualizer](https://github.com/roblabs/geojson) to host on your own site.

```bash
# Pass in the domain of where to open your GeoJSON
geojsonio data/parks.geojson --domain=https://roblabs.com/geojson
```

---

<!-- Markdown Relative Links --> 
[vscode.dev]: https://vscode.dev/github/roblabs/geojson-tools "A lightweight version of VS Code running fully in the browser."
