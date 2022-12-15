import { ifThenElseAction } from "./ifThenElse/ifThenElseAi";

export function getAction(state: State): Action {
    return ifThenElseAction(state);
}
