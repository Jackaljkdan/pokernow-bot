export const AceCode = 14;
export const KingCode = 13;
export const QueenCode = 12;
export const JackCode = 11;
export const LowestStraightAceCode = 1;
export const InvalidCardCode = 0;

export function cardValueCodeFromName(name: CardValueName) {
    const parsed = parseInt(name);

    if (!isNaN(parsed))
        return parsed as CardValueCode;

    switch (name) {
        case "A":
            return AceCode;
        case "K":
            return KingCode;
        case "Q":
            return QueenCode;
        case "J":
            return JackCode;
        default:
            return InvalidCardCode;
    }
}

export function isCardValueCodeValid(code: number) {
    return code > InvalidCardCode && code <= AceCode;
}
