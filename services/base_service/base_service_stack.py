from aws_cdk import core
from aws_cdk.aws_events import EventBus
from aws_cdk.core import CfnOutput
from utils.cp_utils import CPUtils
from aws_cdk.aws_cloudwatch import Dashboard
from aws_cdk.aws_cloudwatch import TextWidget, SingleValueWidget, GraphWidget, Metric

class BaseServiceStack(core.Stack):

    def __init__(self, scope: core.Construct, id: str, **kwargs) -> None:
        super().__init__(scope, id, **kwargs)

        evt_bus = EventBus(self,
                          id="CPEventBus",
                           event_bus_name="cp-event-bus")
        
        exported_event_bus_name = CfnOutput(scope=self,id="event-bus-name",value=evt_bus.event_bus_name,export_name="CP-EVENT-BUS-NAME")
       