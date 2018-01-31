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
import BasemapFaderWidget from "./BasemapFaderWidget.vue";
import Vue from "apprt-vue/Vue";
import VueDijit from "apprt-vue/VueDijit";
import Binding from "apprt-binding/Binding";

class BasemapFaderWidgetFactory {

    activate() {
        let basemapModel = this._basemapModel;
        this._initComponent(basemapModel);
    }

    _initComponent(basemapModel) {
        const vm = this.basemapFader = new Vue(BasemapFaderWidget);
        vm.basemaps = basemapModel.basemaps;
        vm.selectedId = basemapModel.selectedId;
        vm.selectedId2 = basemapModel.basemaps[1].id;
        vm.opacity = 0;

        vm.$on('addBasemapAsLayer', () => {
            this.addBasemapAsLayer();
        });
        vm.$on('adjustOpacity', (value) => {
            this.adjustOpacity(value);
        });

        this.waitForBasemaps(vm.basemaps).then(() => {
            this.addBasemapAsLayer();
            Binding
                .create()
                .bindTo(vm, basemapModel)
                .syncAll("basemaps", "selectedId")
                .enable();
        });
    }

    createInstance() {
        return VueDijit(this.basemapFader);
    }

    waitForBasemaps(basemaps) {
        return new Promise(resolve => {
            basemaps[0].basemap.baseLayers.watch("length", () => {
                resolve(this);
            });
        });
    }

    addBasemapAsLayer() {
        let map = this._mapWidgetModel.get("map");
        if (this.baselayer) {
            map.remove(this.baselayer)
        }
        let id = this.basemapFader.selectedId2;
        let basemap = this._basemapModel.findItemById(id).basemap;
        let clone = basemap.clone();
        clone.load();

        let baselayer2 = this.baselayer = clone.baseLayers.items[0];
        baselayer2.set("opacity", this.basemapFader.opacity / 100);
        map.add(baselayer2);
        map.reorder(baselayer2, 0);
    }

    adjustOpacity(value) {
        this.baselayer.opacity = (value / 100);
    }

}


module.exports = BasemapFaderWidgetFactory;
