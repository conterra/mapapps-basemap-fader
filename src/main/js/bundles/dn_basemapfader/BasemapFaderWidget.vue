<template>
    <v-container grid-list-md class="pa-1">
        <v-layout row wrap>
            <v-flex xs6>
                <v-container grid-list-md class="pa-1">
                    <v-select v-model="selectedId" v-bind:items="basemaps" item-value="id"
                              item-text="title" hide-details>
                    </v-select>
                </v-container>
            </v-flex>
            <v-flex xs6>
                <v-container grid-list-md class="pa-1">
                    <v-select v-model="selectedId2" v-bind:items="basemaps" item-value="id"
                              item-text="title" hide-details @input="$emit('addBasemapAsLayer', $event)">
                    </v-select>
                </v-container>
            </v-flex>
            <v-flex xs12>
                <v-container grid-list-md class="pa-1">
                    <v-slider class="pt-0" hide-details v-model="opacity"></v-slider>
                </v-container>
            </v-flex>
            <v-flex xs12>
                <v-btn block
                       color="primary"
                       @click.native="close">
                    <v-icon left>clear</v-icon>
                    {{i18n.close}}
                </v-btn>
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
        },
        methods: {
            close: function () {
                this.$emit('close', {});
            }
        }
    }
</script>
