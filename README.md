# Parcel Analytics MVP – AWS SAM bootstrap

Quick-start instructions:

```bash
sam build && sam deploy --guided
cd frontend && npm i && npm run build
aws s3 sync ./out s3://$FRONTEND_BUCKET --delete
aws cloudfront create-invalidation --distribution-id <ID> --paths '/*'
```

Replace dummy ETL bucket and add your Mapbox public token in `frontend/.env.local`.
