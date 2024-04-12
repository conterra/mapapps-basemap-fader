[![devnet-bundle-snapshot](https://github.com/conterra/mapapps-basemap-fader/actions/workflows/devnet-bundle-snapshot.yml/badge.svg)](https://github.com/conterra/mapapps-basemap-fader/actions/workflows/devnet-bundle-snapshot.yml)
![Static Badge](https://img.shields.io/badge/tested_for_map.apps-4.17.0-%20?labelColor=%233E464F&color=%232FC050)

# Basemap Fader Bundle
The Basemap Fader bundle provides a widget that allows you to fade two basemap into each other.

## Sample App

https://demos.conterra.de/mapapps/resources/apps/downloads_basemapfader4/index.html

![Screenshot Sample App Basemap Fader](https://github.com/conterra/mapapps-basemap-fader/blob/master/screenshot.PNG)

## Installation Guide

**Requirement: map.apps 4.3.0**

[dn_basemapfader Documentation](https://github.com/conterra/mapapps-basemap-fader/tree/master/src/main/js/bundles/dn_basemapfader)

## Development Guide
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

##### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`
