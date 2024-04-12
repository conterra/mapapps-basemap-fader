/*
 * Copyright (C) 2024 con terra GmbH (info@conterra.de)
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
    apptitle: "Basemap Fader Sample",
    custominfo: {
        content: "Diese App zeigt das Basemap Fader Bundle, welches es erm\u00F6glicht, zwei Grundkarten zu \u00fcberblenden. Um die Funktionalit\u00e4t auszuprobieren, klicken Sie auf den Knopf in der unteren rechten Ecke"
    },
    map: {
        basemaps: {
            streets: "Stra\u00DFenkarte",
            topo: "Topographische Karte",
            satellite: "Satellitenbilder",
            gray: "Grau stilisiert"
        },
        basemaps1: "W\u00e4hlen Sie eine Grundkarte",
        basemap2: "W\u00e4hlen Sie eine andere Grundkarte",
        close: "Schließen",
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
        title: "Adressen"
    },
    tool:{
        title: "Grundkarten Fader",
        tooltip: "Grundkarten Fader"
    },
    common: {
        number: "Nummer",
        area: "Fl\u00E4che [ha]",
        totalArea: "Anteil an Gesamtfl\u00E4che [%]",
        name: "Name",
        provider: "Tr\u00E4ger",
        address: "Adresse",
        furtherinfo: "Weitere Informationen",
        precint: "Stadtbezirk",
        district: "Stadtviertel",
        private: "private",
        municipal: "st\u00E4dtischer"
    }
};
