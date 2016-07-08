import React from 'react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag,
	Simulate
} from 'react-addons-test-utils';
import {List} from 'immutable';
import {Voting} from '../../src/components/Voting';
import {expect} from 'chai';

describe('Voting', function() {

	it('renders a pair of buttons', function() {
		const pair = ['Trainspotting', 'Sunshine'];
		const component = renderIntoDocument(
			<Voting pair={pair} />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons.length).to.equal(pair.length);
		expect(buttons[0].textContent).to.equal(pair[0]);
		expect(buttons[1].textContent).to.equal(pair[1]);
	});

	it('invokes callback when a button is clicked', function() {
		let votedWith;
		const vote = function(entry) {
			votedWith = entry;
		};
		const pair = ['Trainspotting', 'Sunshine'];
		const component = renderIntoDocument(
			<Voting pair={pair} vote={vote} />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(buttons[0]);

		expect(votedWith).to.equal(pair[0]);
	});

	it('adds label to the voted entry', function() {
		const component = renderIntoDocument(
			<Voting pair={['Trainspotting', 'Sunshine']}
				hasVoted="Trainspotting" />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons[0].textContent).to.contain('Voted');
	});

	it('renders just the winner when there is one', function() {
		const component = renderIntoDocument(
			<Voting winner="Trainspotting" />
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons.length).to.equal(0);

		const winner = ReactDOM.findDOMNode(component.refs.winner);
		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain('Trainspotting');
	});

	// it('renders as a pure component', () => {
	// 	const pair = ['Trainspotting', '28 Days Later'];
	// 	const container = document.createElement('div');
	// 	let component = ReactDOM.render(
	// 		<Voting pair={pair} />,
	// 		container
	// 	);

	// 	let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
	// 	expect(firstButton.textContent).to.equal('Trainspotting');

	// 	pair[0] = 'Sunshine';
	// 	component = ReactDOM.render(
	// 		<Voting pair={pair} />,
	// 		container
	// 	);
	// 	firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
	// 	expect(firstButton.textContent).to.equal('Trainspotting');
	// });

	it('does update the DOM when prop changes', function() {
		const pair = List.of('Trainspotting', '28 Days Later');
		const container = document.createElement('div');
		let component = ReactDOM.render(
			<Voting pair={pair} />,
			container
		);
		let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Trainspotting');

		const newPair = pair.set(0, 'Sunshine');
		component = ReactDOM.render(
			<Voting pair={newPair} />,
			container
		);

		firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
		expect(firstButton.textContent).to.equal('Sunshine');
	});
});
