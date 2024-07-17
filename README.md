## Creating docker image of database:

  docker run --detach --name moto-mariadb --env MARIADB_USER=moto_swiat --env MARIADB_PASSWORD=moto_pass --env MARIADB_DATABASE=moto_db --env MARIADB_ROOT_PASSWORD=root_pass -p 3307:3306  mariadb:latest
	
  cmd /c "docker exec -i some-mariadb mariadb -uroot -proot_pass moto_db < C:\your\path\to\app.sql"
	
## Installing and starting client app:

  npm install
	
  npm start
