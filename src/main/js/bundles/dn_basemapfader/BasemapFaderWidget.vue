<template>
    <div class="text-xs-center">
        <v-menu offset-y :close-on-content-click="false" :nudge-width="400" :nudge-right="5">
            <v-btn color="primary" dark slot="activator">Basemap Fader</v-btn>
            <v-card>
                <v-container grid-list-md>
                    <v-layout row wrap>
                        <v-flex xs6>
                            <div class="ml-2 mr-2">
                                <v-select v-model="selectedId" v-bind:items="basemaps" item-value="id"
                                          item-text="title">
                                </v-select>
                            </div>
                        </v-flex>
                        <v-flex xs6>
                            <div class="ml-2 mr-2">
                                <v-select v-model="selectedId2" v-bind:items="basemaps" item-value="id"
                                          item-text="title" v-on:input="$emit('addBasemapAsLayer', $event)">
                                </v-select>
                            </div>
                        </v-flex>
                        <v-flex xs12>
                            <v-container grid-list-md>
                                <v-card-text>
                                    <v-slider class="pt-0" hide-details v-model="opacity"></v-slider>
                                </v-card-text>
                            </v-container>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-menu>
    </div>
</template>
<script>
    import Bindable from "apprt-vue/mixins/Bindable";

    export default {
        mixins: [Bindable],
        data: function () {
            return {
                basemaps: [],
                opacity: 0,
                selectedId: "",
                selectedId2: ""
            };
        },
        watch: {
            opacity: {
                handler(val, oldVal) {
                    this.$emit('adjustOpacity', val);
                }
            }
        }
    }
</script>
