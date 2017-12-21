<template>
    <div id="app">
        <v-app id="inspire">
            <div class="text-xs-center">
                <v-menu offset-y :close-on-content-click="false" :nudge-width="400" :nudge-right="5" v-model="menu">
                    <v-btn color="primary" dark slot="activator">Basemap Fader</v-btn>
                    <v-card>
                        <v-container grid-list-md>
                            <v-layout row wrap>
                                <v-flex xs6>
                                    <v-card>
                                        <div class="ml-2 mr-2">
                                            <v-select id="selectedId" v-model="selectedId" v-bind:items="basemaps"
                                                      class="input-group--focused" item-value="id" hide-selected="true"
                                                      item-text="title">
                                            </v-select>
                                        </div>
                                    </v-card>
                                </v-flex>


                                <v-flex xs6>
                                    <v-card>
                                        <div class="ml-2 mr-2">
                                        <v-select id="selectedBasemap2" v-model="selectedBasemap2"
                                                  v-bind:items="basemaps"
                                                  class="input-group--focused" item-value="id"
                                                  item-text="title" v-on:input="addBasemapAsLayer">
                                        </v-select>
                                        </div>
                                    </v-card>
                                </v-flex>

                                <v-flex xs12>
                                    <v-card>
                                        <v-card-text>
                                            <v-slider class="pt-0" hide-details id="slider" v-model="opacity"
                                                      v-on:input="adjustOpacity"></v-slider>
                                        </v-card-text>
                                    </v-card>
                                </v-flex>

                            </v-layout>

                        </v-container>
                    </v-card>
                </v-menu>
            </div>
        </v-app>
    </div>
</template>

<script>
import Bindable from "apprt-vue/mixins/Bindable";
import TileLayer from "esri/layers/TileLayer"

export default {
    mixins: [Bindable],
    data: function () {
        return {
            map: [],
            basemaps: [],
            layers: [],
            opacity: 0,
            selectedId: "",
            selectedBasemap2: "",
            basemapURL: [],
            baselayer: {},
        };
    },
    methods: {
        adjustOpacity: function (value) {
            let layers = this.layers.items;
            layers[0].opacity = (slider.__vue__.inputWidth / 100) //the second baselayer is defined as the first layer of the array (line 106)

        },

        changeBasemap: function () {
            let id = this.selectedId;
            debugger;
        },

        addBasemapAsLayer: function () {
            if (this.baselayer.id) {
                this.map.remove(this.baselayer)};
            let id = this.selectedBasemap2;

            let basemap = this.basemapModel.findItemById(id).basemap;
            let clone = basemap.clone();
            clone.load();

            let baselayer2 = this.baselayer = clone.baseLayers.items[0];
            baselayer2.set("opacity", this.opacity / 100);

            this.map.add(baselayer2);
            this.map.reorder(baselayer2, 0);
        }
    }
}
</script>
