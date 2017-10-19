define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/BasemapFader.html",
    "ct/util/css",
    "ct/_lang",
    "ct/ui/controls/forms/TransparencySlider",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dijit/form/Select"
], function(declare, d_array, _Widget, _TemplatedMixin, _WidgetsInTemplateMixin, template, css, ct_lang) {
    return declare([_Widget, _TemplatedMixin, _WidgetsInTemplateMixin],{
        
        baseClass: "ctBasemapFader",
        templateString: template,
        _initialized: null,
        _watchHandlers: null,
        
        /**
         * - fadeToBaselayer above basemaplayer by higher renderPriority 
         * - transparency slider shows transparency of the basemaplayer, but is set as opacity of the fadeToBaselayer. this is calculated as the following: 
         *   fadeToBaselayer.opacity = (100 - (100 - basemaplayer.transparency)) / 100;
         *   or shorter:
         *   fadeToBaselayer.opacity = basemaplayer.transparency / 100;
         */
        constructor: function(){
            this._watchHandlers = [];
        },
        
        postCreate: function(){
            this._applyTransparencySliderPatches();
            this.inherited(arguments);
        },
        
        // TODO: remove this when the TransparencySlider support passing the intermediateChange property
        _applyTransparencySliderPatches: function(){
            var slider = this.transparencySlider;
            slider._slider.set("intermediateChanges", true);
            // remove the delay time that the slider waits when click to set the position
            slider._slider.set("slideDuration", 0);
        },
        
        startup: function(){
            this.inherited(arguments);

            this.setupSelectBoxes();
            this._setupConnections();
            
            this.refreshFader();
            
            this._initialized = true;
        },
        
        setupSelectBoxes: function(){
            var baseLayers = this._mapModel.getBaseLayer().children;
            // setup the baselayer selectbox
            this._setupBaselayerSelectbox(baseLayers);
            // setup the fadeToLayerSelectbox
            this._setupFadeToLayerSelectbox(baseLayers);
        },
        
        _setupConnections: function(){
            var that = this;
            this._watchHandlers.push(this.baselayerSelectbox.watch("value", function(name, oldValue, newValue){
                if(name === "value"){
                    that._onBaselayerSelectboxChange(oldValue, newValue);
                }
            }));
            this._watchHandlers.push(this.fadetoLayerSelectbox.watch("value", function(name, oldValue, newValue){
                if(name === "value"){
                    that._onFadetoLayerSelectboxChange(oldValue, newValue);
                }
            }));
        },
        
        refreshFader: function(){
            if(this.setTransparencyForBothLayers){
                this._manipulateMapModelNode(this.getSelectedBaseLayer(), true, 0, this._getBaseMapTransparency());
            } else {
                this._manipulateMapModelNode(this.getSelectedBaseLayer(), true, 0, 0);
            }
            this._manipulateMapModelNode(this.getSelectedFadeToLayer(), true, 1, this._getFadeToMapTransparency());
            
            this._mapModel.fireModelNodeStateChanged();
        },
        
        _getBaseMapTransparency: function(){
            return ct_lang.chk(this.transparencySlider._slider.get("value"), 0);
        },
        _getFadeToMapTransparency: function(){
            return 100 - this._getBaseMapTransparency();
        },
        
        _manipulateMapModelNode: function(node, enabled, renderPrio, transparency){
            node.set("renderPriority", renderPrio);
            this._setLayerTransparency(node, transparency);
            // it won't be possible to enable two basemaps with set
            node.enabled = enabled;
        },
        
        _setLayerTransparency: function(layer, transparency){
            // calculate the opacity from the transparency
            var opacity = (100 - transparency) / 100;
            // set it on the layer
//            console.error("setting opacity "+opacity+" for node with id "+layer.get("id"));
            layer.set("opacity", opacity);
        },
        
        _setupBaselayerSelectbox: function(baseLayers){
            var baselayerSelectbox = this.baselayerSelectbox;
            var options = [];
            d_array.forEach(baseLayers, function(baseLayer) {
                options.push({
                    label: baseLayer.get("title"),
                    value: baseLayer.get("id"),
                    selected: baseLayer.get("enabled")
                });
            });
            baselayerSelectbox.addOption(options);
        },  
        
        _setupFadeToLayerSelectbox: function(baseLayers){
            var baseLayerCount = baseLayers.length;
            var fadetoLayerSelectbox = this.fadetoLayerSelectbox;
            
            if(baseLayerCount > 1){
                this._displayFadeToSelectBox(true);
                this._displayNoLayerMessage(false);
                
                var options = [];
                var selectedId = this.initialFadeToBaseMapId || baseLayers[0].get("id");
                d_array.forEach(baseLayers, function(baseLayer) {
                    if(baseLayer.id !== this.baselayerSelectbox.get("value")){
                        options.push({
                            label: baseLayer.get("title"),
                            value: baseLayer.get("id"),
                            selected: baseLayer.get("id") === selectedId
                        });
                    }
                }, this);
                fadetoLayerSelectbox.addOption(options);
            } 
        },
        
        resize: function(dim){
            this.borderContainerNode.resize(dim);
            this.inherited(arguments);
        },
        
        destroy: function(){
            this.disconnect();
            d_array.forEach(this._watchHandlers, function(watchHandle){
                watchHandle.unwatch();
            }, this);
            this.inherited(arguments);
        },
        
        _onTransparencyChange: function(curTransparency){
            if(this.setTransparencyForBothLayers){
                this._setLayerTransparency(this.getSelectedBaseLayer(), this._getBaseMapTransparency());
            }
            this._setLayerTransparency(this.getSelectedFadeToLayer(), this._getFadeToMapTransparency());
            
            this._mapModel.fireModelNodeStateChanged();
        },
        
        setSelectedBaselayer: function(mapModelNodeId){
            this.baselayerSelectbox.set("value", mapModelNodeId);
        },
        
        _onBaselayerSelectboxChange: function(oldValue, newValue){
            // reset the last active baselayer
            this._resetMapModelNodesByIds([oldValue]);
            
            // update selectbox options for the fadetoselectbox
            var fadetoLayerSelectbox = this.fadetoLayerSelectbox;
            var oldNode = this._getMapModelNodeById(oldValue);
            fadetoLayerSelectbox.addOption({
                label: oldNode.get("title"),
                value: oldNode.get("id")
            });
            fadetoLayerSelectbox.removeOption(newValue);
            this.refreshFader();
            
            this.onBaselayerSelectboxChange();
        },
        
        _onFadetoLayerSelectboxChange: function(oldValue, newValue){
            // reset the last active baselayer
            this._resetMapModelNodesByIds([oldValue]);
            this.refreshFader();
            
            this.onFadetoLayerSelectboxChange();
        },
        
        activateBasemapFader: function(){
            if(this._initialized){
                this.refreshFader();
            }
        },
        
        deactivateBasemapFader: function(){
            // as now there are two basemaps enabled, we need to reset this to the normal state (just one enabled)
            this._resetAllMapModelNodes();
        },
        
        _resetAllMapModelNodes: function(){
            this._resetMapModelNodes([
                this.getSelectedBaseLayer(),
                this.getSelectedFadeToLayer()
            ]);
        },
        
        _resetMapModelNodesByIds: function(nodeIds){
            d_array.forEach(nodeIds, function(nodeId){
                this._resetMapModelNodes([this._getMapModelNodeById(nodeId)]);
            }, this);
        },
        
        _resetMapModelNodes: function(nodesArr){
            var selectedNodeId = this.baselayerSelectbox.get("value");
            d_array.forEach(nodesArr, function(node){
                var enabled = (node.get("id") === selectedNodeId);
                this._manipulateMapModelNode(node, enabled, null, 0);
            }, this);
            this._mapModel.fireModelNodeStateChanged();
        },
        
        _getMapModelNodeById: function(id){
            return this._mapModel.getNodeById(id);
        },
        
        getSelectedBaseLayer: function(){
            return this._getMapModelNodeById(this.baselayerSelectbox.get("value"));
        },
        
        getSelectedFadeToLayer: function(){
            return this._getMapModelNodeById(this.fadetoLayerSelectbox.get("value"));
        },
        
        _displayFadeToSelectBox: function(display){
            css.switchHidden(this.fadetoLayerSelectbox.domNode, !display);
        },
        
        _displayNoLayerMessage: function(display){
            css.switchHidden(this.noLayersMessageNode, !display);
        },
        
        onBaselayerSelectboxChange: function(){},
        onFadetoLayerSelectboxChange: function(){}
        
    });
});