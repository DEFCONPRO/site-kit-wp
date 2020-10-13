/**
 * AMP Homepage validation tests.
 *
 * Site Kit by Google, Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * WordPress dependencies
 */
import {
	activatePlugin,
	deactivatePlugin,
} from '@wordpress/e2e-test-utils';

/**
 * Internal dependencies
 */
import {
	activateAMPWithMode,
	deactivateUtilityPlugins,
	setupSiteKit,
} from '../../utils';

describe( 'AMP Homepage', () => {
	beforeAll( async () => {
		await setupSiteKit();
		await activatePlugin( 'e2e-tests-admin-bar-visibility' );
		await activateAMPWithMode( 'primary' );
	} );

	afterAll( async () => {
		await deactivatePlugin( 'amp' );
		await deactivateUtilityPlugins();
	} );

	describe( 'Logged-in user', () => {
		it( 'has no validation errors', async () => {
			await expect( '/' ).toHaveValidAMPForUser();
		} );
	} );
	describe( 'Non-logged-in user', () => {
		it( 'has no validation errors', async () => {
			await expect( '/' ).toHaveValidAMPForVisitor();
		} );
	} );
} );
