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
            this.addBasemapAsLayer();
        },
        "opacity"(val) {
            this.adjustOpacity(val);
        }
    },

    activate() {
        const basemapModel = this._basemapModel;
        this.selectedId2 = basemapModel.basemaps[1].id;

        this._changeBasemap2(basemapModel);

        basemapModel.watch("selectedId", ({value}) => {
            this._changeBasemap2(basemapModel);
        });

        basemapModel.watch("basemaps", (basemaps) => {
            this._changeBasemap2(basemapModel);
        });
    },

    _changeBasemap2(basemapModel) {
        this.basemaps2 = basemapModel.basemaps.filter((basemap) => {
            if (basemap.id !== basemapModel.selectedId) {
                return true;
            }
        });

        if (basemapModel.selectedId === this.selectedId2) {
            this._remove2ndBasemap();
            this.selectedId2 = this.basemaps2[0].id;
        }
    },

    addBasemapAsLayer() {
        const basemapModel = this._basemapModel;
        const selectedId = basemapModel.selectedId;
        const selectedId2 = this.selectedId2;

        this._remove2ndBasemap();
        const basemap2 = this._basemapModel.findItemById(selectedId2).basemap;
        const clone = basemap2.clone();
        clone.load().then(() => {
            const baselayer2 = this.baselayer = clone.baseLayers.items[0];
            baselayer2.listMode = "hide";
            baselayer2.legendEnabled = false;
            baselayer2.set("opacity", this.opacity / 100);

            baselayer2.load().then(() => {
                // Advanced Editing config to prevent snapping
                this._setAdvancedEditingConfig(baselayer2);
            });

            const map = this._mapWidgetModel.map;
            map.add(baselayer2);
            map.reorder(baselayer2, 0);

            const basemap = this._basemapModel.findItemById(selectedId)?.basemap;
            if (basemap) {
                basemap.baseLayers.items[0].opacity = (100 - this.opacity) / 100;
            } else {
                const watcher = this._basemapModel.watch("selectedId", () => {
                    watcher.remove();
                    basemap.baseLayers.items[0].opacity = (100 - this.opacity) / 100;
                });
            }
        });

    },

    adjustOpacity(value) {
        if (this.baselayer.id === this._mapWidgetModel.get("map").basemap.baseLayers.items[0].id) {
            this.baselayer.opacity = 1;
            return;
        }
        if (this.baselayer) {
            this.baselayer.opacity = (value / 100);
        }

        const basemapModel = this._basemapModel;
        const selectedId = basemapModel.selectedId;
        const basemap = this._basemapModel.findItemById(selectedId).basemap;
        basemap.baseLayers.items[0].opacity = (100 - value) / 100;
    },

    _remove2ndBasemap() {
        const map = this._mapWidgetModel.map;
        if (this.baselayer) {
            map.remove(this.baselayer);
        }
    },

    _setAdvancedEditingConfig(layer) {
        layer.advancedEditing = {
            allowSnapping: false,
            allowEditing: false
        };
        if (layer.sublayers && layer.sublayers.length) {
            layer.sublayers.forEach(sublayer => {
                this._setAdvancedEditingConfig(sublayer);
            });
        }
        if (layer.layers && layer.layers.length) {
            layer.layers.forEach(sublayer => {
                this._setAdvancedEditingConfig(sublayer);
            });
        }
    }

});
