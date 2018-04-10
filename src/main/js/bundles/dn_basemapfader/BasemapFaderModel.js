/*
 * Copyright (C) 2018 con terra GmbH (info@conterra.de)
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

const BasemapFaderModel = declare({

    opacity: 0,
    basemaps: [],
    selectedId2: null,
    baselayer: null,

    activate() {
        let basemapModel = this._basemapModel;
        let basemaps = this.basemaps = basemapModel.basemaps;
        this.selectedId2 = basemapModel.basemaps[1].id;

        this.waitForBasemaps(basemaps).then(() => {
            this.addBasemapAsLayer();
        });
    },

    waitForBasemaps(basemaps) {
        return new Promise(resolve => {
            basemaps[0].basemap.baseLayers.watch("length", () => {
                resolve(this);
            });
        });
    },

    addBasemapAsLayer(layerId) {
        if (!layerId) {
            return;
        }
        let map = this._mapWidgetModel.get("map");
        if (this.baselayer) {
            map.remove(this.baselayer);
        }
        let basemap = this._basemapModel.findItemById(layerId).basemap;
        let clone = basemap.clone();
        clone.load();

        let baselayer2 = this.baselayer = clone.baseLayers.items[0];
        baselayer2.set("opacity", this.opacity / 100);
        map.add(baselayer2);
        map.reorder(baselayer2, 0);
    },

    adjustOpacity(value) {
        this.baselayer.opacity = (value / 100);
    }

});

module.exports = BasemapFaderModel;