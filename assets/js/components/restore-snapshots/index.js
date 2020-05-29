/**
 * Snapshot restoration component.
 *
 * Site Kit by Google, Copyright 2019 Google LLC
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
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import Data from 'googlesitekit-data';
import { restoreAllSnapshots } from '../../googlesitekit/data/create-snapshot-store';
const { useRegistry } = Data;

const RestoreSnapshots = ( { children } ) => {
	const registry = useRegistry();
	const [ restoredSnapshots, setRestoredSnapshots ] = useState( false );

	useEffect( () => {
		if ( ! restoredSnapshots ) {
			( async () => {
				await restoreAllSnapshots( registry );

				setRestoredSnapshots( true );
			} )();
		}
	}, [ registry, restoredSnapshots ] );

	if ( ! restoredSnapshots ) {
		return null;
	}

	return children;
};

export default RestoreSnapshots;
