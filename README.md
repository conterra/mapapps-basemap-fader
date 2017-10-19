# Basemap Fader Bundle

Sample App
------------------
https://demos.conterra.de/mapapps/resources/apps/downloads_basemapfader/index.html

Installation Guide
------------------
Add the Bundle and at least two basemaps to the app. If you don't add it to another toolset it willn automatically appear in the toolset in the left-middle.

Constraints
------------------
The bundle does not work with neither the basemaptoggler nor the basemapgallery.
The follow-me function does not work.

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