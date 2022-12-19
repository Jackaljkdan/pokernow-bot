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
            });
            return probabilityToAction[key];
        }

        random -= probability;
    }

    return { type: "check_or_fold" };
}

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

export function postfixNameToCall(name: string, state: State) {
    if (state.toCall > 0)
        return name + "-call";
    else
        return name + "-zero";
}

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

export function zeroFill(args: Partial<ProbabilisticActionArgs>): ProbabilisticActionArgs {
    for (const key of ProbabilisticActionArgsKeys)
        if (args[key] == undefined)
            args[key] = 0;

    return args as ProbabilisticActionArgs;
}

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
