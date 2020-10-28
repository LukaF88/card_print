sudo docker build -t magic-client . 
sudo docker tag magic-client registry.zendownloader.com:5000/magic-client
sudo docker push registry.zendownloader.com:5000/magic-client
