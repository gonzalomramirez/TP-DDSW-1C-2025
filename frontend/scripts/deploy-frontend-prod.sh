TAG=gonramirez/birbnb-frontend:prod
API_URL=https://birbnb-backend.onrender.com

docker build --platform linux/amd64 \
  --build-arg REACT_APP_API_URL=$API_URL \
  -t $TAG ..

docker push $TAG