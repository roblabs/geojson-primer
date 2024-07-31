#!/usr/bin/env node

/**
 * Request URL
 * https://central.nps.gov/units/api/v1/parks/list/npsgov?details=true&format=geojson
 */

import { Command } from "commander";
import { actionRunner } from "./utils";
import { check } from "@placemarkio/check-geojson"

import fs from "fs";
import { type OptionValues } from "commander";
import type { FeatureCollection, Geometry } from "geojson";

const PACKAGE_VERSION = require("../package.json").version;

interface Type {
  name: string
  id: string
}

interface ParkList {
  typeId: string
  type: Type
  code: string
  codes: string[]
  name: string
}

type Units = {
    metadata: any
    units: any
}

const action = async (geoJsonInput: string, options: OptionValues) => {

    const option = Object.keys(options)[0]; // console.log(option)

    /**
     * JSON parsed from file
     */
    let json: FeatureCollection<Geometry | null> = JSON.parse(
        fs.readFileSync(geoJsonInput, "utf-8")
    );

    // Check GeoJSON from CLI using @placemarkio/check-geojson.
    try {
        const parseValue = check(JSON.stringify(json))
    } catch (e) {
        console.error(e)
    }

    var globalJSON: Units = {"metadata": {"version": PACKAGE_VERSION}, "units": {}}

    json.features.map((feature, index) => {
        if (feature.properties) {

            switch (option) {
                case "csv":
                    centralParksList2csv(feature.properties as ParkList, index)
                    break
                case "markdownTable":
                    centralParksList2markdown(feature.properties as ParkList, index)
                    break
                case "units":
                    // Converts a GeoJSON `Feature` from Central.NPS.gov to JSON, for use Typescript
                    const p = feature.properties as ParkList
                    globalJSON.units[feature.properties.code.toLowerCase()] = [p.name, p.type.name]
                    break            
                default:
                    break
            }                    
        }
    });

    
    // Calculate basic statistics on cleanup
    switch (option) {
        case "csv":
            break
        case "markdownTable":
            console.log(`| Total: ${json.features.length} |  | | |`)
            break
        case "units":
            globalJSON.metadata.count = json.features.length
            console.log(JSON.stringify(globalJSON, null, 2))
            break            
        default:
            break
    }
};

const program = new Command();

program
  .version(PACKAGE_VERSION || "unknown version")
  .description("Central ParksList/npsgov to CSV or Markdown or update a `Units` list.")
  .option( "-c, --csv", "Convert parksList GeoJSON to a CSV file.")
  .option( "-m, --markdownTable", "Convert parksList GeoJSON to a Markdown table.")
  .option( "-u, --units", "Convert parksList GeoJSON to a custom `Units` object.")
  .argument("<central-parkget>", "<JSON file of the response from Central ParksList/npsgov>")

  .showHelpAfterError();

program.action(actionRunner(action));

program.parse();

//////////

/**
 * Converts a GeoJSON `Feature` from Central.NPS.gov to CSV.
 * The unit name is enclosed in double quotes `"`,
 * to account for NPS Units that may have a comma
 * 
 * @param properties 
 * @param index
 * 
 * Example output in `.csv`
 * 
```csv
code,codes.length,codes,name,type.name
ABLI,1,"ABLI","Abraham Lincoln Birthplace National Historical Park",National Historical Park
ACAD,1,"ACAD","Acadia National Park",National Park
MLKM,1,"MLKM","Martin Luther King, Jr Memorial",National Memorial
```
 */
function centralParksList2csv(properties: ParkList, index: number) {
    /// Setup CSV Header
    if(index === 0) {
        console.log("code,codes.length,codes,name,type.name")
    }

    console.log(`${properties.code},${properties.codes.length},"${properties.codes}","${properties.name}",${properties.type.name}`)
}

/**
 * Converts a GeoJSON `Feature` from Central.NPS.gov to a Markdown table.
 * 
 * @param properties 
 * @param index 
 * 
 * Example output in `.md`
 * 
| `code` | `codes` | `name` | `type.name`
| :--- | :---  | :--- | :---
[ABLI](https://NPS.gov/ABLI) | ABLI | [Abraham Lincoln Birthplace National Historical Park](https://NPS.gov/ABLI) | National Historical Park
[ACAD](https://NPS.gov/ACAD) | ACAD | [Acadia National Park](https://NPS.gov/ACAD) | National Park
 */
function centralParksList2markdown(properties: ParkList, index: number) {
    /// Setup Markdown Table Header
    if(index === 0) {
        console.log("| `code` | `codes` | `name` | `type.name`")
        console.log("| :--- | :---  | :--- | :---")
    }

    console.log(`[${properties.code}](https://NPS.gov/${properties.code}) | ${properties.codes} | [${properties.name}](https://NPS.gov/${properties.code}) | ${properties.type.name}`)
}
