/**
 * SurveyQuestionSingleSelectChoice component.
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
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import Radio from '../Radio';

/* eslint-disable camelcase */

const SurveyQuestionSingleSelectChoice = ( {
	value,
	setValue,
	// writeIn,
	// setWriteIn,
	choice,
} ) => {
	const { answer_ordinal, text } = choice;
	const isChecked = value === answer_ordinal;
	return (
		<Radio
			value={ answer_ordinal }
			checked={ isChecked }
			name={ text }
			onClick={ () => setValue( answer_ordinal ) }
		/>
	);
};

SurveyQuestionSingleSelectChoice.propTypes = {
	value: PropTypes.string.isRequired,
	setValue: PropTypes.func.isRequired,
	writeIn: PropTypes.string.isRequired,
	setWriteIn: PropTypes.func.isRequired,
	choice: PropTypes.shape( {
		answer_ordinal: PropTypes.oneOfType( [
			PropTypes.string,
			PropTypes.number,
		] ),
		text: PropTypes.string,
		write_in: PropTypes.bool,
	} ),
};

export default SurveyQuestionSingleSelectChoice;
