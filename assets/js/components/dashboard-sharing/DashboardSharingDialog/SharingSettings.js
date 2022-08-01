/**
 * DashboardSharingSettingsButton component.
 *
 * Site Kit by Google, Copyright 2022 Google LLC
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
import { __ } from '@wordpress/i18n';
import { Icon, arrowLeft } from '@wordpress/icons';
import {
	createInterpolateElement,
	Fragment,
	useCallback,
	useEffect,
	useRef,
} from '@wordpress/element';

/**
 * Internal dependencies
 */
import Data from 'googlesitekit-data';
import Link from '../../Link';
import Button from '../../Button';
import ShareIcon from '../../../../svg/icons/share.svg';
import Footer from '../DashboardSharingSettings/Footer';
import DashboardSharingSettings from '../DashboardSharingSettings';
import { CORE_UI } from '../../../googlesitekit/datastore/ui/constants';
import { CORE_MODULES } from '../../../googlesitekit/modules/datastore/constants';
import { CORE_USER } from '../../../googlesitekit/datastore/user/constants';
import { BREAKPOINT_SMALL, useBreakpoint } from '../../../hooks/useBreakpoint';
import { DialogContent, DialogFooter } from '../../../material-components';
import {
	EDITING_USER_ROLE_SELECT_SLUG_KEY,
	RESET_SETTINGS_DIALOG,
	SETTINGS_DIALOG,
} from '../DashboardSharingSettings/constants';
import sharingSettingsTour from '../../../feature-tours/dashboard-sharing-settings';
const { useSelect, useDispatch } = Data;

export default function SharingSettings() {
	const breakpoint = useBreakpoint();
	const { setValue } = useDispatch( CORE_UI );

	const dialogOpen = useSelect(
		( select ) => !! select( CORE_UI ).getValue( SETTINGS_DIALOG )
	);
	const haveSettingsChanged = useSelect( ( select ) =>
		select( CORE_MODULES ).haveSharingSettingsChanged()
	);

	// Rollback any temporary selections to saved values if settings have changed and modal is closed.
	const { rollbackSharingSettings } = useDispatch( CORE_MODULES );
	useEffect( () => {
		if ( ! dialogOpen && haveSettingsChanged ) {
			rollbackSharingSettings();
		}
	}, [ dialogOpen, haveSettingsChanged, rollbackSharingSettings ] );

	const triggeredTourRef = useRef();
	const { triggerOnDemandTour } = useDispatch( CORE_USER );
	useEffect( () => {
		if ( dialogOpen && ! triggeredTourRef.current ) {
			triggeredTourRef.current = true;
			triggerOnDemandTour( sharingSettingsTour );
		}
	}, [ dialogOpen, triggerOnDemandTour ] );

	const closeDialog = useCallback( () => {
		setValue( SETTINGS_DIALOG, false );
		setValue( EDITING_USER_ROLE_SELECT_SLUG_KEY, undefined );
	}, [ setValue ] );

	const openResetDialog = useCallback( () => {
		closeDialog();
		setValue( RESET_SETTINGS_DIALOG, true );
	}, [ closeDialog, setValue ] );

	return (
		<Fragment>
			<div
				className="googlesitekit-dialog__back-wrapper"
				aria-hidden={ breakpoint !== BREAKPOINT_SMALL }
			>
				<Button
					aria-label={ __( 'Back', 'google-site-kit' ) }
					className="googlesitekit-dialog__back"
					onClick={ closeDialog }
				>
					<Icon icon={ arrowLeft } />
				</Button>
			</div>
			<DialogContent className="googlesitekit-dialog__content">
				<div className="googlesitekit-dialog__header">
					<div
						className="googlesitekit-dialog__header-icon"
						aria-hidden={ breakpoint === BREAKPOINT_SMALL }
					>
						<span>
							<ShareIcon width={ 20 } height={ 20 } />
						</span>
					</div>

					<div className="googlesitekit-dialog__header-titles">
						<h2 className="googlesitekit-dialog__title">
							{ __(
								'Dashboard sharing & permissions',
								'google-site-kit'
							) }
						</h2>

						<p className="googlesitekit-dialog__subtitle">
							{ createInterpolateElement(
								__(
									'Share a view-only version of your Site Kit dashboard with other WordPress roles. <a>Learn more</a>',
									'google-site-kit'
								),
								{
									a: (
										<Link
											aria-label={ __(
												'Learn more about dashboard sharing',
												'google-site-kit'
											) }
											href="https://sitekit.withgoogle.com/documentation/using-site-kit/dashboard-sharing/"
											external
										/>
									),
								}
							) }
						</p>
					</div>
				</div>

				<div className="googlesitekit-dialog__main">
					<DashboardSharingSettings />
				</div>
			</DialogContent>
			<DialogFooter className="googlesitekit-dialog__footer">
				<Footer
					closeDialog={ closeDialog }
					openResetDialog={ openResetDialog }
				/>
			</DialogFooter>{ ' ' }
		</Fragment>
	);
}
