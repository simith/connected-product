#!/usr/bin/env python3

from aws_cdk import core
from services.base_service.base_service_stack import BaseServiceStack

from services.provisioning_service.provisioning_service_stack import ProvisioningServiceStack
from services.onboarding_service.onboarding_service_stack import OnboardingServiceStack
from services.device_management_service.device_management_service_stack import DeviceManagementServiceStack
from services.voice_service.voice_service_stack import VoiceServiceStack

env_default = core.Environment(account="833254562002", region="ap-southeast-2")

app = core.App()
BaseServiceStack(app,"base-service",env=env_default)
ProvisioningServiceStack(app, "provisioning-service",env=env_default)
OnboardingServiceStack(app, "onboarding-service",env=env_default)
DeviceManagementServiceStack(app, "device-management-service",env=env_default)
VoiceServiceStack(app, "voice-service",env=env_default)
#
app.synth()
