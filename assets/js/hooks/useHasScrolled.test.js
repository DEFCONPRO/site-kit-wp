/**
 * `useHasScrolled` hook tests.
 *
 * Site Kit by Google, Copyright 2021 Google LLC
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
 * Internal dependencies
 */
import { renderHook, actHook as act } from '../../../tests/js/test-utils';
import { useHasScrolled } from './useHasScrolled';

describe( 'useHasScrolled', () => {
	it.each( [
		[
			'should return true if the user has scrolled down the page',
			100,
			true,
		],
		[
			'should return false if the user is at the top of the page',
			0,
			false,
		],
		,
	] )( '%s', async ( _, args, expected ) => {
		let result;

		await act( async () => {
			( { result } = await renderHook( () => {
				Object.defineProperty( global.window, 'pageYOffset', {
					value: args,
					configurable: true,
				} );

				return useHasScrolled();
			} ) );
		} );

		expect( result.current ).toEqual( expected );
	} );
} );
