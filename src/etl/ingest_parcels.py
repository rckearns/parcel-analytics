import csv
import json
import os
import tempfile
import boto3

s3 = boto3.client('s3')
db = boto3.resource('dynamodb')
parcel_table = db.Table(os.environ['TABLE_NAME'])

def lambda_handler(event, context):
    provider_bucket = 'my-parcel-provider'
    key = f'exports/parcel_dump_{context.aws_request_id}.csv'
    with tempfile.NamedTemporaryFile() as tmp:
        s3.download_file(provider_bucket, key, tmp.name)
        with open(tmp.name) as fh:
            reader = csv.DictReader(fh)
            with parcel_table.batch_writer() as batch:
                for row in reader:
                    batch.put_item(Item=row)
    return {'statusCode': 200}
