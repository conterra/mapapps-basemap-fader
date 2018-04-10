<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs6>
                <v-container grid-list-md>
                    <v-select v-model="selectedId" v-bind:items="basemaps" item-value="id"
                              item-text="title">
                    </v-select>
                </v-container>
            </v-flex>
            <v-flex xs6>
                <v-container grid-list-md>
                    <v-select v-model="selectedId2" v-bind:items="basemaps" item-value="id"
                              item-text="title" @input="$emit('addBasemapAsLayer', $event)">
                    </v-select>
                </v-container>
            </v-flex>
            <v-flex xs12>
                <v-container grid-list-md>
                    <v-slider class="pt-0" hide-details v-model="opacity"></v-slider>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import Bindable from "apprt-vue/mixins/Bindable";

    export default {
        mixins: [Bindable],
        data: function () {
            return {
                showMenu: false,
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
