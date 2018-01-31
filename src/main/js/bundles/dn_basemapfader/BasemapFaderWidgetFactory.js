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
        this._initComponent({
            mapWidgetModel: this._mapWidgetModel,
            basemapModel: this._basemapModel,
            properties: this._properties
        });
    }

    _initComponent({basemapModel, mapWidgetModel, properties}) {
        const vm = this.basemapFaderRoleComponent = new Vue(BasemapFaderWidget);
        vm.basemapModel = basemapModel;
        vm.basemaps = basemapModel.basemaps;
        vm.selectedId = basemapModel.selectedId;
        vm.selectedBasemap2 = basemapModel.basemaps[1].id;
        vm.map = mapWidgetModel.get("map");
        vm.layers = vm.map.get("layers");
        vm.basemapURL = properties.basemapIDs;

        this.waitForBasemaps(vm.basemaps).then(() => {
            vm.addBasemapAsLayer();
            Binding //binds Items to each other
                .create()
                .bindTo(vm, basemapModel)
                .syncAll("basemapModel", "selectedBasemap", "basemaps", "selectedId", "selectedBasemap2")
                .enable();
        });
    }


    createInstance() {
        return VueDijit(this.basemapFaderRoleComponent);

    }

    waitForBasemaps(basemaps) {
        return new Promise(resolve => {
            basemaps[0].basemap.baseLayers.watch("length", () => {
                resolve(this);
            });
        });
    }

}


module.exports = BasemapFaderWidgetFactory;
