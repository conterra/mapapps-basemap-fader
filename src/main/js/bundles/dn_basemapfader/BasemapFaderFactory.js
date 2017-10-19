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
define([
    "dojo/_base/declare", 
    "./BasemapFader"
], function(declare, BasemapFader, undefined) {
    return declare([], {
        // injected
        _mapModel: undefined,
        _instance: undefined,
        
        createInstance: function() {
            var i18n = this._i18n.get().ui;
            var props = this._properties || {};
            this._instance = new BasemapFader({
                i18n: i18n,
                _mapModel: this._mapModel,
                initialFadeToBaseMapId: props.initialFadeToBaseMapId,
                setTransparencyForBothLayers: props.setTransparencyForBothLayers
            });
            return this._instance;
        },
        
        handleBaseLayerSelectionChanged: function(args){
            var faderWidget = this._instance;
            if(faderWidget._initialized && this._properties.applyBaseMapTogglerChange){
                var enabledBaseLayerNodeId = args.basemap.id;
                var curBaseLayerNodeId = faderWidget.getSelectedBaseLayer().get("id");
                if(curBaseLayerNodeId !== enabledBaseLayerNodeId){
                    faderWidget.setSelectedBaselayer(enabledBaseLayerNodeId);
                }
            }
        }
    });
});