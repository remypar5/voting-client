import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', function() {

	it('handles SET_STATE action', function() {
		const state = Map();
		const action = {
			type: 'SET_STATE',
			state: Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({Trainspotting: 1})
				})
			})
		};
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			}
		}));
	});

	it('handles SET_STATE with a JSON payload', function() {
		const state = Map();
		const action = {
			type: 'SET_STATE',
			state: {
				vote: {
					pair: ['Trainspotting', '28 Days Later'],
					tally: { Trainspotting: 1 }
				}
			}
		}
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			}
		}));
	});

	it('handles SET_STATE without an initial state', function() {
		const action = {
			type: 'SET_STATE',
			state: {
				vote: {
					pair: ['Trainspotting', '28 Days Later'],
					tally: { Trainspotting: 1 }
				}
			}
		}
		const nextState = reducer(undefined, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			}
		}));
	});

	it('handles VOTE by setting hasVoted', function() {
		const state = fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			}
		});
		const action = { type: 'VOTE', entry: 'Trainspotting' };
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			},
			hasVoted: 'Trainspotting'
		}));
	});

	it('does not set hasVoted for VOTE in invalid entry', function() {
		const state = fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			}
		});
		const action = { type: 'VOTE', entry: 'Sunshine' };
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			}
		}));
	});

	it('removes hasVoted on SET_STATE if pair changes', function() {
		const state = fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: { Trainspotting: 1 }
			},
			hasVoted: 'Trainspotting'
		});
		const action = {
			type: 'SET_STATE',
			state: {
				vote: {
					pair: ['Sunshine', 'Slumdog Millionaire']
				}
			}
		};
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Sunshine', 'Slumdog Millionaire'],
			}
		}));
	});
});
