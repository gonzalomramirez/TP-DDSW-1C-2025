TAG=gonramirez/birbnb-backend:dev

docker build --platform linux/amd64 \
  --build-arg NODE_ENV=development \
  -t $TAG ..

docker push $TAG