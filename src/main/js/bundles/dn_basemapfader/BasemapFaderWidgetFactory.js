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
import BasemapFaderWidget from "./BasemapFaderWidget.vue";
import Vue from "apprt-vue/Vue";
import VueDijit from "apprt-vue/VueDijit";
import Binding from "apprt-binding/Binding";

export default class BasemapFaderWidgetFactory {

    #basemapModelBinding = undefined;
    #basemapFaderModelBinding = undefined;

    activate() {
        this._initComponent();
    }

    deactivate() {
        this.#basemapModelBinding.unbind();
        this.#basemapModelBinding = undefined;
        this.#basemapFaderModelBinding.unbind();
        this.#basemapFaderModelBinding = undefined;
    }

    _initComponent() {
        const basemapModel = this._basemapModel;
        const basemapFaderModel = this._basemapFaderModel;
        const vm = this.basemapFader = new Vue(BasemapFaderWidget);
        vm.i18n = this._i18n.get().ui;

        vm.$on('close', () => this._tool.set("active", false));

        this.#basemapModelBinding = Binding.for(vm, basemapModel)
            .sync("selectedId")
            .syncToLeft("basemaps", (basemaps) => basemaps.map((basemap) => {
                return {
                    id: basemap.id,
                    title: basemap.title
                };
            }))
            .enable()
            .syncToLeftNow();

        this.#basemapFaderModelBinding = Binding.for(vm, basemapFaderModel)
            .syncAll("selectedId2", "opacity")
            .syncToLeft("basemaps2")
            .enable()
            .syncToLeftNow();

    }

    createInstance() {
        return VueDijit(this.basemapFader);
    }

}
