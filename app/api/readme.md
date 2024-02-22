to run the docker
    
    cd /app/api

run for building image
  
    docker compose up --build

for pushing image

    docker compose push

then clean 

    docker images               (list images)
    docker rmi -f 85            (first 2 numbers of imageid)
    docker ps -a                (list container)
    docker rm -f 7              (first number of container id)

then run 
  
    docker run -p5050:5050 ash502/mlapp for accessing image and running it locally on any machine
