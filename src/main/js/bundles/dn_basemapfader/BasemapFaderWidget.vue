<!--

    Copyright (C) 2024 con terra GmbH (info@conterra.de)

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
                        class="pt-0"
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
                        class="pt-0"
                        :items="basemaps2"
                        item-value="id"
                        item-text="title"
                        hide-details
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
                        always-dirty
                        class="pt-0"
                        hide-details
                    />
                </v-container>
            </v-flex>
            <v-flex xs12>
                <v-btn
                    block
                    color="primary"
                    @click="$emit('close')"
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
        props:{
            opacity: {
                type: Number,
                default: 0
            },
            basemaps: {
                type: Array,
                default: () => []
            },
            basemaps2: {
                type: Array,
                default: () => []
            },
            selectedId: {
                type: String,
                default: ""
            },
            selectedId2: {
                type: String,
                default: ""
            }
        }
    };
</script>
