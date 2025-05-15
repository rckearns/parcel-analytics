import json
import os
import boto3
from boto3.dynamodb.conditions import Key

db = boto3.resource('dynamodb')
parcel_table = db.Table(os.environ['TABLE_NAME'])

def lambda_handler(event, context):
    body = json.loads(event.get('body', '{}'))
    if 'parcel' in body.get('query', ''):
        apn = body['query'].split('apn:\"')[1].split('\"')[0]
        resp = parcel_table.query(KeyConditionExpression=Key('apn').eq(apn))
        item = resp['Items'][0] if resp['Items'] else {}
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'data': {'parcel': item}})
        }
    return {'statusCode': 400, 'body': 'unsupported query'}
