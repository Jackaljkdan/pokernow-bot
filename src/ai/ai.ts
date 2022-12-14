import { ifThenElseAction } from "./ifThenElseAi";

export function getAction(state: State): Action {
    return ifThenElseAction(state);
}
