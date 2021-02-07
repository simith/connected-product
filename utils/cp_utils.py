import aws_cdk.aws_s3 as s3
import aws_cdk.aws_lambda as lambda_
import aws_cdk.aws_apigateway as apigw
from aws_cdk.aws_cognito import UserPool, CfnIdentityPool


class CPUtils():

    def __init__(self):
        super()

    def create_api_gateway(self,
                           stack,
                           api_name,
                           api_desc,
                           lambda_fn,
                           enable_proxy=False):
        api = apigw.LambdaRestApi(
            stack,
            id=api_name,
            rest_api_name=api_name,
            description=api_desc,
            handler=lambda_fn,
            proxy=enable_proxy
           )
        
        return api


    def create_s3_bucket(self,stack,bucket_name):
        if bucket_name == None:
            raise Exception("name not provided for S3 bucket creation") 
        s3_bucket = s3.Bucket(stack,bucket_name,cors=[{'allowedOrigins':['*'],'allowedHeaders':['*'],'allowedMethods':[s3.HttpMethods.GET,s3.HttpMethods.POST,s3.HttpMethods.PUT]}])
        return s3_bucket

    def create_user_and_id_pool(self,scope):
         #create the userpool
        signInAlias = cognito.SignInAliases(email=True)
        userpool = cognito.UserPool(scope,'accountUsersPool',self_sign_up_enabled=True,
        sign_in_aliases=signInAlias)
        userpool_client = userpool.add_client("user_pool_client",generate_secret=False)
        print(userpool_client.user_pool_client_id)
        print( userpool.user_pool_provider_name)
        identitypool = cognito.CfnIdentityPool(scope,'stream4allidentitypool',allow_unauthenticated_identities=False,
        cognito_identity_providers=[{'clientId': userpool_client.user_pool_client_id, 'providerName': userpool.user_pool_provider_name },
                                    ],)
        #create auth and unauth roles
        unAuthRole = iam.Role(scope,'Stream4AllIdPoolUnauthRole',assumed_by=iam.FederatedPrincipal(federated='cognito-identity.amazonaws.com',conditions={
            "StringEquals": { "cognito-identity.amazonaws.com:aud": identitypool.ref },
            "ForAnyValue:StringLike": { "cognito-identity.amazonaws.com:amr": "unauthenticated" },
        }, assume_role_action="sts:AssumeRoleWithWebIdentity"))
    
        authRole = iam.Role(scope,'Stream4AllIdPoolAuthRole',assumed_by=iam.FederatedPrincipal(federated='cognito-identity.amazonaws.com',conditions={
            "StringEquals": { "cognito-identity.amazonaws.com:aud": identitypool.ref },
            "ForAnyValue:StringLike": { "cognito-identity.amazonaws.com:amr": "authenticated" },
        }, assume_role_action="sts:AssumeRoleWithWebIdentity"))

        defaultPolicy =  cognito.CfnIdentityPoolRoleAttachment(scope, 
        'DefaultValid',
        identity_pool_id=identitypool.ref,roles={ 'unauthenticated': unAuthRole.role_arn,
            'authenticated': authRole.role_arn})