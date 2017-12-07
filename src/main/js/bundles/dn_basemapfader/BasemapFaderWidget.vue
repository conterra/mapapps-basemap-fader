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
                                        <v-select id="selectedId" v-model="selectedId" v-bind:items="basemaps"
                                                  item-value="id"
                                                  class="input-group--focused" item-value="id" hide-selected="true"
                                                  item-text="title"
                                                  v-on:input="changeBasemap">
                                        </v-select>
                                    </v-card>
                                </v-flex>


                                <v-flex xs6>
                                    <v-card>
                                        <v-select id="selectedBasemap2" v-model="selectedBasemap2"
                                                  v-bind:items="basemaps"
                                                  class="input-group--focused" item-value="id"
                                                  item-text="title" v-on:input="{addBasemapAsLayer(), adjustOpacity()}">
                                        </v-select>
                                    </v-card>
                                </v-flex>

                                <v-flex xs12>
                                    <v-card>
                                        <v-card-text>
                                            <v-slider id="slider" v-model.lazy="value"
                                                      v-on:input="adjustOpacity()"></v-slider>
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
            selectedId: "",
            selectedBasemap2: "",
            configLayer: [],
            basemapURL: [],
            baselayer: {},
            i18n: {
                type: Object,
                default: function () {
                    return {
                        basemaps: "Basemaps",
                        basemap1: "Select a basemap",
                        basemap2: "Select another basemap",
                        close: "Close"
                    }
                }
            }
        };
    },
    methods: {
        adjustOpacity: function () {
            let layers = this.layers.items;
            layers[0].opacity = (slider.__vue__.inputWidth / 100) //the second baselayer is defined as the first layer of the array (line 99)

        },

        changeBasemap: function () {
            let id = this.selectedId;
        },

        addBasemapAsLayer: function () {
            if (this.baselayer.id) {
                this.map.remove(this.baselayer)
            }
            let id = this.$data.selectedBasemap2;

            for (var i = 0; i < this.basemaps.length; i++) {
                if (this.basemaps[i].id === id) {

                    let basemap = this.basemaps[i].basemap;

                    if (basemap.baseLayers.items.length > 0) {
                        var layer = this.baselayer = new TileLayer({
                            id: basemap.id,
                            title: basemap.title,
                            url: basemap.baseLayers.items[0].url
                        });

                    } else var layer = this.baselayer = new TileLayer({
                        id: basemap.id,
                        title: basemap.title,
                        url: this.basemapURL[basemap.id]
                    });


                    this.map.add(layer);
                    this.map.reorder(layer, 0);
                }
                ;
            }
            ;

        },
        close: function () {
            this.$emit('close', {});
        }
    }
};
</script>
