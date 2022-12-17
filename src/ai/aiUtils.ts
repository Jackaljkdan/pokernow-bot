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
    // TODO: gestisci asso in scala A2345
    
    if (cards.length < 4)
        return false;

    const sorted = sortInPlaceAscending([...cards]);
    const consecutives = findFirstConsecutives(sorted, 0);
   
    if (consecutives === null)
        return false;

    if (consecutives.count >= 4)
        return true;

    if (consecutives.count === 2) {
        const followingConsecutives = findFirstConsecutives(cards, consecutives.startIndex + consecutives.count);

        if (followingConsecutives === null)
            return false;
        
        return consecutives.min.value.code + 3 === followingConsecutives.min.value.code;
    }

    // consecutives count is 3

    if (consecutives.startIndex > 0) {
        if (consecutives.min.value.code === sorted[consecutives.startIndex - 1].value.code + 2)
            return true;
    }

    if (consecutives.startIndex + 3 < sorted.length) {
        if (consecutives.min.value.code + 4 === sorted[consecutives.startIndex + 3].value.code)
            return true;
    }

    return false;
}

export function isOpenEndedStraightPresent(cards: Card[]) {
    // TODO: fai
    return false;
}

type Consecutives = {
    startIndex: number,
    count: number,
    min: Card,
};

export function findFirstConsecutives(sortedCards: Card[], startIndex = 0) {
    if (sortedCards.length - startIndex < 2)
        return null;

    const consecutives: Consecutives | null = {
        startIndex,
        count: 1,
        min: sortedCards[startIndex],
    };

    for (let i = startIndex + 1; i < sortedCards.length; i++) {
        if (sortedCards[i].value.code === consecutives.min.value.code + consecutives.count) {
            consecutives.count += 1;
        }
        else if (consecutives.count === 1) {
            consecutives.startIndex = i;
            consecutives.min = sortedCards[i];
        }
        else {
            return consecutives;
        }
    }
    
    return null;
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

export function sortInPlaceAscending(cards: Card[]): Card[] {
    return cards.sort((c1, c2) => c1.value.code - c2.value.code);
}
