#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { UserPortalStack } from '../lib/user-portal-stack';

const app = new cdk.App();
new UserPortalStack(app, 'UserPortalStack');
