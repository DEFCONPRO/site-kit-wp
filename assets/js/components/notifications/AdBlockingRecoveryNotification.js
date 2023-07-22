/**
 * AdBlockingRecoveryNotification component.
 *
 * Site Kit by Google, Copyright 2023 Google LLC
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
import { createInterpolateElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { removeQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 */
import Data from 'googlesitekit-data';
import BannerNotification from './BannerNotification';
import Link from '../Link';
import SuccessSVG from '../../../svg/graphics/ad-blocking-recovery-success.svg';
import {
	AD_BLOCKING_RECOVERY_SETUP_SUCCESS_NOTIFICATION_ID,
	ENUM_AD_BLOCKING_RECOVERY_SETUP_STATUS,
	MODULES_ADSENSE,
} from '../../modules/adsense/datastore/constants';
const { useSelect } = Data;

export default function AdBlockingRecoveryNotification() {
	const NOTIFICATION_ID = AD_BLOCKING_RECOVERY_SETUP_SUCCESS_NOTIFICATION_ID;

	const adBlockingRecoverySetupStatus = useSelect( ( select ) =>
		select( MODULES_ADSENSE ).getAdBlockingRecoverySetupStatus()
	);

	const adsenseAccountID = useSelect( ( select ) =>
		select( MODULES_ADSENSE ).getAccountID()
	);

	const privacyMessagingURL = useSelect( ( select ) =>
		select( MODULES_ADSENSE ).getServiceURL( {
			path: `/${ adsenseAccountID }/privacymessaging/ad_blocking`,
		} )
	);

	const handleDismiss = () => {
		const modifiedURL = removeQueryArgs(
			global.location.href,
			'notification'
		);
		global.history.replaceState( null, '', modifiedURL );
	};

	if (
		adBlockingRecoverySetupStatus !==
		ENUM_AD_BLOCKING_RECOVERY_SETUP_STATUS.SETUP_CONFIRMED
	) {
		return null;
	}

	return (
		<BannerNotification
			id={ NOTIFICATION_ID }
			className="googlesitekit-ad-blocking-recovery-notification"
			title={ __(
				'You successfully enabled the ad blocking recovery message',
				'google-site-kit'
			) }
			description={ createInterpolateElement(
				__(
					'Make sure to also create the message in <a>AdSense</a>, otherwise this feature won’t work.',
					'google-site-kit'
				),
				{
					a: (
						<Link
							href={ privacyMessagingURL }
							external
							hideExternalIndicator
						/>
					),
				}
			) }
			dismiss={ __( 'OK, Got it!', 'google-site-kit' ) }
			onDismiss={ handleDismiss }
			isDismissible
			type="win-success"
			WinImageSVG={ () => <SuccessSVG /> }
			format="small"
		/>
	);
}
