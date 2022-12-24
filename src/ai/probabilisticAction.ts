const ProbabilisticActionArgs = {
    checkFoldProbability: 0,
    callProbability: 0,
    minRaiseProbability: 0,
    halfPotRaiseProbability: 0,
    // tqPotRaiseProbability: 0,
    potRaiseProbability: 0,
    // overbetProbability: 0,
    allInProbability: 0,
};

export type ProbabilisticActionArgs = typeof ProbabilisticActionArgs;

export const ProbabilisticActionArgsKeys = Object.keys(ProbabilisticActionArgs).map(key => key as keyof typeof ProbabilisticActionArgs);

export type ProbabilityToAction = Record<keyof typeof ProbabilisticActionArgs, Action>;

const probabilityToAction: ProbabilityToAction = {
    checkFoldProbability: { type: "check_or_fold" },
    callProbability: { type: "call" },
    minRaiseProbability: { type: "raise", raiseAmount: "min" },
    halfPotRaiseProbability: { type: "raise", raiseAmount: "1/2_pot" },
    // tqPotRaiseProbability: { type: "raise", raiseAmount: "3/4_pot" },
    potRaiseProbability: { type: "raise", raiseAmount: "pot" },
    // overbetProbability: { type: "raise", raiseAmount: "overbet" },
    allInProbability: { type: "raise", raiseAmount: "all_in" },
};

export type CheckCallBasedProbabilisticActionArgs = {
    checkFoldProbability: number,
    callProbability: number,
    remainingMinRaiseShare: number, 
    remainingHalfPotRaiseShare: number,
    remainingPotRaiseShare: number,
    remainingAllInShare: number,
}


/**
 * Returs an action chosen randomly according to the probabilities you pass in `args`.
 * 
 * Note that if to call is zero then the call probability is forced to zero
 * and that the probabilities are always normalized such that they sum to 1.
 * `args` is not modified in this process.
 * 
 * This function logs all info regarding the choice, including a `name` you provide
 * that is very convenient when debugging.
 */
export function probabilisticAction(name: string, state: State, args: ProbabilisticActionArgs): Action {
    const copy = {...args};
    
    if (state.toCall === 0)
        copy.callProbability = 0;
    
    const normalized = normalize(copy);

    let random = Math.random();

    for (const key of ProbabilisticActionArgsKeys) {
        const probability = normalized[key];

        if (random < probability) {
            console.log(`"probabilistic action (${name})`, {
                input: args,
                normalized,
                random,
                chosen: probabilityToAction[key],
            });
            return probabilityToAction[key];
        }

        random -= probability;
    }

    return { type: "check_or_fold" };
}

/**
 * Returns a normalized version of `args` such that the probabilities sum to 1
 */
function normalize(args: ProbabilisticActionArgs): ProbabilisticActionArgs {
    let sum = 0;

    for (const key of ProbabilisticActionArgsKeys)
        sum += args[key];

    for (const key of ProbabilisticActionArgsKeys)
        args[key] /= sum;

    return args;
}

type ToCallDependent = {
    zero: Omit<ProbabilisticActionArgs, "callProbability">,
    nonZero: ProbabilisticActionArgs,
};

export function toCallDependent(state: State, args: ToCallDependent): ProbabilisticActionArgs {
    if (state.toCall > 0)
        return args.nonZero;
    
    return {
        ...args.zero,
        callProbability: 0,
    };
}

/**
 * Appends "-call" if `state.toCall > 0` and "-zero" otherwise
 */
export function postfixNameToCall(name: string, state: State) {
    if (state.toCall > 0)
        return name + "-call";
    else
        return name + "-zero";
}

/**
 * This let's you specify directly only check/fold and call probabilities, while allowing you
 * to specify the raise probabilities proportional to whatever is left.
 * 
 * This is only useful if you don't know a priori the probability of either check/fold of call,
 * because for instance they are the result of a computation
 * (imagine that you want to fold with a probability based on the amount to call).
 * 
 * @example
 * // imagine that you want to code a probabilistic bluff raise
 * // an that state.toCall === 75 and state.prevPhasePot === 100
 * // the following will make you fold 75% of the time
 * // pot raise 25% * 0.8 = 20% of the time
 * // go all in 25% * 0.2 = 5% of the time
 * checkCallBased({
 *     checkFoldProbability: state.toCall / state.prevPhasePot,
 *     remainingPotRaiseShare: 0.8,
 *     remainingAllInShare: 0.2,
 * })
 */
export function checkCallBased(args: CheckCallBasedProbabilisticActionArgs): ProbabilisticActionArgs {
    const sum = args.callProbability + args.checkFoldProbability;
    const remaining = Math.max(1 - sum, 0);

    return {
        checkFoldProbability: args.checkFoldProbability,
        callProbability: args.callProbability,
        minRaiseProbability: remaining * args.remainingMinRaiseShare,
        halfPotRaiseProbability: remaining * args.remainingHalfPotRaiseShare,
        potRaiseProbability: remaining * args.remainingPotRaiseShare,
        allInProbability: remaining * args.remainingAllInShare,
    };
}

/**
 * Returns a copy of `args` where undefined probabilities are set to 0
 */
export function zeroFill(args: Partial<ProbabilisticActionArgs>): ProbabilisticActionArgs {
    for (const key of ProbabilisticActionArgsKeys)
        if (args[key] == undefined)
            args[key] = 0;

    return args as ProbabilisticActionArgs;
}

/**
 * Returns a copy of `args` where undefined probabilities get an equal share of the remaining probability
 */
export function uniformFill(args: Partial<ProbabilisticActionArgs>): ProbabilisticActionArgs {
    const undefinedCount = countUndefinedActions(args);
    const definedSum = sumDefinedActions(args);
    const remainingValue = 1 - definedSum;

    let fillValue;

    if (remainingValue <= 0)
        fillValue = 0;
    else
        fillValue = remainingValue / undefinedCount;

    for (const key of ProbabilisticActionArgsKeys)
        if (args[key] == undefined)
            args[key] = fillValue;

    return args as ProbabilisticActionArgs;
}

function countUndefinedActions(args: Partial<ProbabilisticActionArgs>) {
    let undefinedCount = 0;

    for (const key of ProbabilisticActionArgsKeys)
        if (args[key] == undefined)
            undefinedCount++;
    
    return undefinedCount;
}

function sumDefinedActions(args: Partial<ProbabilisticActionArgs>) {
    let sum = 0;

    for (const key of ProbabilisticActionArgsKeys) {
        const val = args[key];
        if (val != undefined)
            sum += val;
    }

    return sum;
}
