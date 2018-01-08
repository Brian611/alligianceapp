import { tassign } from 'tassign';
import {
    UPDATE_QUESTION1,
    UPDATE_QUESTION2,
    UPDATE_AGE,
    UPDATE_ANNUAL_INCOME,
    UPDATE_TOTAL_ANNUAL_CONTRIBUTION,
    UPDATE_PLAYZONE,
    UPDATE_PERCENTAGE_COMPLETE
} from './actions';

export interface IAppState {
    question1: boolean,
    question2: boolean,
    playzone: boolean,
    age: number,
    annualIncome: number,
    totAnnualContribution: number,
    percentageComplete: number
}

export const INITIAL_STATE: IAppState = {
    question1: true,
    question2: false,
    playzone: false,
    age: null,
    annualIncome: null,
    totAnnualContribution: null,
    percentageComplete: 50
}

export function rootReduer(state: IAppState = INITIAL_STATE, action): IAppState {
    switch (action.type) {
        case UPDATE_QUESTION1:
            return tassign(state, { question1: action.payload });
        case UPDATE_QUESTION2:
            return tassign(state, { question2: action.payload });
        case UPDATE_PLAYZONE:
            return tassign(state, { playzone: action.payload });

        case UPDATE_AGE:
            return tassign(state, { age: action.payload });
        case UPDATE_ANNUAL_INCOME:
            return tassign(state, { annualIncome: action.payload });
        case UPDATE_TOTAL_ANNUAL_CONTRIBUTION:
            return tassign(state, { totAnnualContribution: action.payload });
        case UPDATE_PERCENTAGE_COMPLETE:
            return tassign(state, { percentageComplete: state.percentageComplete + action.payload })
    }
    return state;
}