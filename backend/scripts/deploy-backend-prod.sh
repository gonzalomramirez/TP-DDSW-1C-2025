TAG=gonramirez/birbnb-backend:prod

docker build --platform linux/amd64 \
  --build-arg NODE_ENV=production \
  -t $TAG ..

docker push $TAG