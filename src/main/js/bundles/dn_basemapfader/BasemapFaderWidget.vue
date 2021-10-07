<!--

    Copyright (C) 2021 con terra GmbH (info@conterra.de)

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

-->
<template>
    <v-container
        grid-list-md
        class="pa-1"
    >
        <v-layout
            row
            wrap
        >
            <v-flex xs6>
                <v-container
                    grid-list-md
                    class="pa-1"
                >
                    <v-select
                        v-model="selectedId"
                        :items="basemaps"
                        item-value="id"
                        item-text="title"
                        hide-details
                    />
                </v-container>
            </v-flex>
            <v-flex xs6>
                <v-container
                    grid-list-md
                    class="pa-1"
                >
                    <v-select
                        v-model="selectedId2"
                        :items="basemaps"
                        item-value="id"
                        item-text="title"
                        hide-details
                        @input="$emit('add-basemap-as-layer', $event)"
                    />
                </v-container>
            </v-flex>
            <v-flex xs12>
                <v-container
                    grid-list-md
                    class="pa-1"
                >
                    <v-slider
                        v-model="opacity"
                        class="pt-0"
                        hide-details
                    />
                </v-container>
            </v-flex>
            <v-flex xs12>
                <v-btn
                    block
                    color="primary"
                    @click.native="close"
                >
                    <v-icon left>
                        clear
                    </v-icon>
                    {{ i18n.close }}
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
                handler(val) {
                    this.$emit('adjust-opacity', val);
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
