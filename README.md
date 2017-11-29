# Basemap Fader Bundle
This bundle provides a widget to fade from one baselayer to another baselayer.

Sample App
------------------
https://demos.conterra.de/mapapps/resources/apps/downloads_basemapfader/index.html

![Screenshot Sample App Basemap Fader](https://github.com/conterra/mapapps-basemap-fader/blob/3.x/basemapFader.JPG)

Installation Guide
------------------
Add the Bundle and at least two basemaps to the app. If you don't add it to another toolset it will automatically appear in the toolset in the left-middle.


Constraints
------------------

This bundle cannot be combined with the 

1. basemaptoggler or basemapgallery bundle.
The basemapgallery ensures that only one Baselayer is enabled for every MapModel structure change event.
The basemapfader bundle activates two basemaplayers at the same time.

2. followme bundle: The opacity of the base maps is controlled by CSS, which is not transmitted.

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
