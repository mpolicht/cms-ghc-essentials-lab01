export interface ClaimLineItem {
    amount: number;
    adjustmentRate: number;
}

export function calculateClaimTotal(lineItems: ClaimLineItem[]): number {
    const subtotal = lineItems.reduce(
        (total, item) => total + item.amount,
        0
    );

    const averageAdjustmentRate = lineItems.reduce(
        (total, item) => total + item.adjustmentRate,
        0
    ) / lineItems.length;

    const adjustment = subtotal * averageAdjustmentRate;

    return Number((subtotal + adjustment).toFixed(2));
}

export function isValidNpi(npi: string): boolean {
    if (!/^\d{10}$/.test(npi)) {
        return false;
    }

    // The NPI check-digit calculation uses the healthcare identifier prefix 80840.
    const digits = `80840${npi}`;
    let sum = 0;
    let doubleDigit = false;

    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = Number(digits[i]);

        if (doubleDigit) {
            digit *= 2;

            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        doubleDigit = !doubleDigit;
    }

    return sum % 10 === 0;
}
