/*
 * Copyright (C) 2017 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
module.exports = {
    root: {
        apptitle: "Basemap Fader Sample",
        custominfo: {
            content: "This app shows the functionality of the Basmeap Fader Bundle which allows you to fade two basemaps into each other. Please click on the button in the top right corner to see how it works"
        },
        map: {
            basemaps: {
                streets: "Street Map",
                topo: "Topographical Map",
                satellite: "Aerial (hybrid)",
                gray: "Grey"
            },
            basemap1: "Select a basemap",
            basemap2: "Select another basemap",
            close: "CLOSE"

        },
        search: {
            title: "Addresses"
        },
        tool: {
            title: "Basemap Fader",
            tooltip: "Basmap Fader"
        },
        common: {
            number: "Number",
            area: "Area [ha]",
            totalArea: "Percentage of the total area [%]",
            name: "Name",
            provider: "Provider",
            address: "Adress",
            furtherinfo: "Further Information",
            precint: "Precint",
            district: "District",
            private: "privater",
            municipal: "municipal"
        }
    },
    "de": true
};