/*
 * Copyright (C) 2021 con terra GmbH (info@conterra.de)
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
import {declare} from "apprt-core/Mutable";

export default declare({

    opacity: 0,
    basemaps2: [],
    selectedId2: null,
    baselayer: null,

    $watch: {
        "selectedId2"(val) {
            this.addBasemapAsLayer(val);
        },
        "opacity"(val) {
            this.adjustOpacity(val);
        }
    },

    activate() {
        const basemapModel = this._basemapModel;
        const basemaps = this.basemaps = basemapModel.basemaps;
        this.selectedId2 = basemapModel.basemaps[1].id;

        this.waitForBasemaps(basemaps).then(() => {
            this.addBasemapAsLayer();
        });

        this._changeBasemap2(basemaps, basemapModel.selectedId);

        basemapModel.watch("selectedId", ({value}) => {
            this._changeBasemap2(basemaps, value);
        });

        basemapModel.watch("basemaps", (basemaps) => {
            this._changeBasemap2(basemaps, basemapModel.selectedId);
        });
    },

    _changeBasemap2(basemaps, selectedId) {
        this.basemaps2 = basemaps.filter((basemap) => {
            if (basemap.id !== selectedId) {
                return true;
            }
        });
        this.selectedId2 = this.basemaps2[0].id;
    },

    waitForBasemaps(basemaps) {
        return new Promise(resolve => {
            if (basemaps[0].basemap.baseLayers.items.length > 0) {
                resolve(this);
            }
            basemaps[0].basemap.baseLayers.watch("length", () => {
                resolve(this);
            });
        });
    },

    addBasemapAsLayer(layerId) {
        if (!layerId) {
            layerId = this.selectedId2;
        }
        const map = this._mapWidgetModel.get("map");
        if (this.baselayer) {
            map.remove(this.baselayer);
        }
        const basemap = this._basemapModel.findItemById(layerId).basemap;
        const clone = basemap.clone();
        clone.load();

        const baselayer2 = this.baselayer = clone.baseLayers.items[0];
        if (this.baselayer.id !== map.basemap.baseLayers.items[0].id) {
            baselayer2.set("opacity", this.opacity / 100);
        }

        map.add(baselayer2);
        map.reorder(baselayer2, 0);
        map.basemap.baseLayers.items[0].opacity = 1;
    },

    adjustOpacity(value) {
        if (this.baselayer.id === this._mapWidgetModel.get("map").basemap.baseLayers.items[0].id) {
            this.baselayer.opacity = 1;
            return;
        }
        if (this.baselayer) {
            this.baselayer.opacity = (value / 100);
        }
    }

});
