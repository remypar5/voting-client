import React from 'react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithClass,
	Simulate
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import {Results} from '../../src/components/Results';
import {expect} from 'chai';

describe('Results', function() {

	it('renders entries with vote counts or zero', function() {
		const pair = List.of('Trainspotting', '28 Days Later');
		const tally = Map({'Trainspotting': 5});
		const component = renderIntoDocument(
			<Results pair={pair} tally={tally} />
		);
		const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
		const [train, days] = entries.map(function(entry) {
			return entry.textContent;
		});


		expect(entries.length).to.equal(2);
		expect(train).to.contain('Trainspotting');
		expect(train).to.contain('5');
		expect(days).to.contain('28 Days Later');
		expect(days).to.contain('0');
	});

	it('invokes the next callback when the next button is clicked', function() {
		let nextInvoked = false;
		const next = function() {
			nextInvoked = true;
		}
		const pair = List.of('Trainspotting', '28 Days Later');
		const component = renderIntoDocument(
			<Results pair={pair}
				tally={Map()}
				next={next} />
		);
		Simulate.click(ReactDOM.findDOMNode(component.refs.next));

		expect(nextInvoked).to.equal(true);
	});

	it('renders the winner when there is one', function() {
		const component = renderIntoDocument(
			<Results winner="Trainspotting"
				pair={['Trainspotting', '28 Days Later']}
				tally={Map()} />
		);
		const winner = ReactDOM.findDOMNode(component.refs.winner);

		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain('Trainspotting');
	});
});
