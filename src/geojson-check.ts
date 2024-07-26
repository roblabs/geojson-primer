import fs from "fs";
import { Command } from "commander";
import { actionRunner } from "./utils";
import { check } from "@placemarkio/check-geojson"
import { type OptionValues } from "commander";
import type { FeatureCollection, Geometry } from "geojson";

export const action = async (geoJsonInput: string, options: OptionValues) => {

    /**
     * GeoJSON parsed from file
     */
    let geoJson: FeatureCollection<Geometry | null> = JSON.parse(
        fs.readFileSync(geoJsonInput, "utf-8")
    );

    // Check GeoJSON from CLI using @placemarkio/check-geojson.
    try {
        const parseValue = check(JSON.stringify(geoJson))
    } catch (e) {
        console.error(e)
    }
};

// ---

const PACKAGE_VERSION = require("../package.json").version;

const program = new Command();

program
  .version(PACKAGE_VERSION || "unknown version")
  .description("Check GeoJSON from CLI using @placemarkio/check-geojson.")
  .argument("<geojson>", "GeoJSON input file.")

  .showHelpAfterError();

program.action(actionRunner(action));

program.parse();