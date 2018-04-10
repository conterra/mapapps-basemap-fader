# Basemap Fader Bundle
The Basemap Fader Bundle is a new Widget that allows you to fade two basemap into eacht other.

If you are using map.apps 3 see https://github.com/conterra/mapapps-basemap-fader/tree/3.x

Sample App
------------------
https://demos.conterra.de/mapapps/resources/apps/downloads_basemapfader4/index.html

![Screenshot Sample App Basemap Fader](https://github.com/conterra/mapapps-basemap-fader/blob/master/screenshot.png)

Installation Guide
------------------
**Requirement: map.apps 4.3.0**

Simply add the bundle "dn_basemapfader" to your map.apps 4 app. Additionally you should load at least
two basemaps into the app.

#### Restrictions
This bundle does not work for vector or hybrid basemaps.

Development Guide
------------------
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

##### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`
