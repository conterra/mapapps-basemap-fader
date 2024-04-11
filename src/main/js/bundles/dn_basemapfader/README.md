# dn_basemapfader

The Basemap Fader is a new widget that allows you to fade two basemaps into each other.

## Usage

1. Add the bundle "dn_basemapfader" to your map.apps 4 app.
2. Additionally you should load at least two basemaps into the app.

Change the initial opacity value
```json
"dn_basemapfader":{
            "Config":{
            "opacity":0
            }

        },
```

| Property  | Type   | Possible Values                                        | Default      | Description                                                                                                             |
| --------- | ------ | ------------------------------------------------------ | ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| opacity   | Number |                                                        | ```0```      | Opacity                                                                                                                 |


### Restrictions
This bundle does not work for vector or hybrid basemaps.
