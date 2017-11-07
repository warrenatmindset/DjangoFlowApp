/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import SessionApp from 'components/SessionApp';
import SessionDash from 'components/SessionDash';
import SessionPage from 'components/SessionPage';
import SessionEnd from 'components/SessionEnd';

export default (
	<Route path='/' component={SessionApp}>
		<IndexRoute component={SessionDash} />
		<Route path='/session' component={SessionPage} />
		<Route path='/end' component={SessionEnd} />
	</Route>
);