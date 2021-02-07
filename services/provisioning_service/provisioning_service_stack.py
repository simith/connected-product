from aws_cdk import core
import aws_cdk.aws_lambda as _lambda
from aws_cdk.core import CfnOutput,Duration
import aws_cdk.aws_iot as iot
from aws_cdk.aws_iot import CfnTopicRule

from utils.cp_utils import CPUtils


class ProvisioningServiceStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        lambda_fn = _lambda.Function(
            self,
            'provisioningServiceHandler',
            runtime=_lambda.Runtime.PYTHON_3_7,
            timeout=Duration.seconds(30),
            code=_lambda.Code.asset('services/provisioning_service/lambdas/provisioningapi'),
            handler='app.on_request') 

        lambda_fn_jitr = _lambda.Function(
            self,
            'jitrServiceHandler',
            runtime=_lambda.Runtime.PYTHON_3_7,
            timeout=Duration.seconds(30),
            code=_lambda.Code.asset('services/provisioning_service/lambdas/provisioningapi'),
            handler='app.on_jitr_request_handler') 

        self.createJitrResources(lambda_fn_jitr.function_arn)
        

        # The code that defines your stack goes here
        utils = CPUtils()
        provisioning_api = utils.create_api_gateway(self,"provisioning-service",
                                "Provisioning service",
                                lambda_fn,
                                enable_proxy=True) 

        s3_bucket = utils.create_s3_bucket(self,"provisioning-models");    

    
    
    def createJitrResources(self, handler_function_arn):
        ''' Steps:
            create the lambda handle
            capture the IoT Rule and set the Lambda action
        '''
        topic_rule = iot.CfnTopicRule(self,
                                      id="justInTimeRegistrationTrigger",
                                      topic_rule_payload=iot.CfnTopicRule.TopicRulePayloadProperty(actions=[iot.CfnTopicRule.ActionProperty(lambda_=iot.CfnTopicRule.LambdaActionProperty(function_arn=handler_function_arn))],
                                                                                                   sql="SELECT * FROM '$aws/events/thing/+/created'",
                                                                                                   aws_iot_sql_version="2016-03-23",
                                                                                                   rule_disabled=False), rule_name="loraWANTriggerRule")

