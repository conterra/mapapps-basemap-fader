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

## Quick start

Clone this project and ensure that you have all required dependencies installed correctly (see [Documentation](https://docs.conterra.de/en/mapapps/latest/developersguide/getting-started/set-up-development-environment.html)).

Then run the following commands from the project root directory to start a local development server:

```bash
# install all required node modules
$ mvn initialize

# start dev server
$ mvn compile -Denv=dev -Pinclude-mapapps-deps

# run unit tests
$ mvn test -P run-js-tests,include-mapapps-deps
```
