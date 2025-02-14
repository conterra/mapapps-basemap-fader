/*
 * Copyright (C) 2025 con terra GmbH (info@conterra.de)
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
            content: "This app shows the functionality of the Basemap Fader Bundle which allows you to fade two basemaps into each other. Please click on the button in the bottom right corner to see how it works."
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
            close: "CLOSE",
            koeln1: {
                title: "Basisdaten",
                districts: {
                    title: "Stadtviertel",
                    text: "Das K\xF6lner Stadtviertel <b>{STV_NAME}</b>."
                },
                boroughs: {
                    title: "Stadtteile",
                    text: "Der Stadtteil <b>{NAME}</b> liegt im K\xF6lner Stadtbezirk {STADTBEZIR}."
                },
                precints: {
                    title: "Stadtbezirke",
                    text: "Der K\xF6lner Stadtbezirk <b>{NAME}</b>."
                }
            },
            koeln2: {
                title: "Bildung und Kultur",
                description: "Liste aller Bibliotheken, Museen und Schulen in Köln.",
                libraries: {
                    title: "Bibliotheken"
                },
                museums: {
                    title: "Museen",
                    text: "Das Museum <b>{NAME}</b> liegt im K\xF6lner Stadtteil {STADTTEIL}."
                },
                schools: {
                    title: "Schulen",
                    text: ""
                }
            },
            koeln3: {
                title: "Freizeit",
                sights: {
                    title: "Sehensw\xFCrdigkeiten",
                    titleSingle: "Sehensw\xFCrdigkeit",
                    text: "Die Sehensw\xFCrdigkeit <b>{NAME}</b> liegt im K\xF6lner Stadtteil {STADTTEIL}."
                },
                playgrounds: {
                    title: "Spiel- und Sportpl\xE4tze",
                    text: "<b>{Spielplatzname}</b> liegt im K\xF6lner Stadtteil {Stadtteil}.",
                    baskets: "Basketballk\xF6rbe",
                    goals: "Fussballtore",
                    tables: "Tischtennis Tische",
                    walls: "Torwand",
                    skate: "Skaten",
                    misc: "Sonstiges"
                },
                places: {
                    title: "Veranstaltungsorte",
                    titleSingle: "Veranstaltungsort",
                    text: "<b>{NAME}</b> ist ein {expression/carrier} Veranstaltungsort."
                }
            }
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
