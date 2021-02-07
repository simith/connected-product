from aws_cdk import core
import aws_cdk.aws_lambda as _lambda
from aws_cdk.core import CfnOutput,Duration

from utils.cp_utils import CPUtils

class DeviceManagementServiceStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        # The code that defines your stack goes here
        lambda_fn = _lambda.Function(
            self,
            'deviceManagementServiceHandler',
            runtime=_lambda.Runtime.PYTHON_3_7,
            timeout=Duration.seconds(30),
            code=_lambda.Code.asset('services/device_management_service/lambdas/devicemanagementapi'),
            handler='app.on_request')  

        # The code that defines your stack goes here
        utils = CPUtils()
        provisioning_api = utils.create_api_gateway(self,"devicemanagement-service",
                                "Devicemanagement service",
                                lambda_fn,
                                enable_proxy=True)  
