import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as UserPortal from '../lib/user-portal-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new UserPortal.UserPortalStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
