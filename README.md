A Project for managing simple cards on multiple card boards.
The Project has two subprojects. The Backend and the Frontend.

Setting up your production environment.
Build Prerequisites:
* Maven
* NodeJS
* Java

Execution Prerequisites:
* Java

Build an executable .jar-File:
* Run "npm install" in the angular directory.
* Run "ng build" in the angular directory.
* Copy the content of angular/dist directory to src/main/resources/static (if it not exists create it).
* Two options for persisting data:
  * Saving the data in a local filebased SQL-Database (default)
  * Connecting the program to a MySQL-Server
  
  For connecting to a MySQL-Server edit the src/main/resources/application-prod.properties file (spring.datasource properties).
  You can change the port in the src/main/resources/application-prod.properties file (default 8080).
* Run "mvn clean package" in the root directory.


* Copy "target/taskboard-0.0.1-SNAPSHOT.jar" file to your production server.
* Run "java -jar taskboard-0.0.1-SNAPSHOT.jar --spring.profiles.active=prod" on the production server.
