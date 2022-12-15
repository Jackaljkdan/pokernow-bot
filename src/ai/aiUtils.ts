export function isOneCardFlushOrStraightPossible(cards: Card[]) {
    return isOneCardFlushPossible(cards) || isOneCardStraightPossible(cards);
}

export function hasFlushDrawOrOpenEndedStraight(cards: Card[]) {
    return isOneCardFlushPossible(cards) || isOpenEndedStraightPresent(cards);
}

export function isOneCardFlushPossible(cards: Card[]) {
    const counts: Partial<Record<CardSuit, number>> = {};
    
    for (const c of cards) {
        if (!counts[c.suit])
            counts[c.suit] = 1;
        else
            counts[c.suit]! += 1;
    }

    for (const suit in counts)
        if (counts[suit as CardSuit] === 4)
            return true;

    return false;
}

export function isOneCardStraightPossible(cards: Card[]) {
    // TODO: fai
    return false;
}

export function isOpenEndedStraightPresent(cards: Card[]) {
    // TODO: fai
    return false;
}
