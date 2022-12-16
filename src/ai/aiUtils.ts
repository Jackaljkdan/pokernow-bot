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

export function getFirstPair(cards: Card[]): Card[] | null {
    const counts: Record<number, Card[]> = {};

    for (const c of cards) {
        if (!counts[c.value.code])
            counts[c.value.code] = [c];
        else
            counts[c.value.code].push(c);
    }
    
    for (const key in counts) {
        const counted = counts[key];
        if (counted.length === 2)
            return counted;
    }

    return null;
}

export function getHighestCard(cards: Card[]) {
    let max: Card | null = null;

    for (const c of cards)
        if (max === null || c.value.code > max.value.code)
            max = c;
    
    return max;
}

export function getLowestCard(cards: Card[]) {
    let min: Card | null = null;

    for (const c of cards)
        if (min === null || c.value.code > min.value.code)
            min = c;
    
    return min;
}
