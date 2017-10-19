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