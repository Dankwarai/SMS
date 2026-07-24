
import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, capitalize } from './helpers';

describe('Helper Functions', () => {
    describe('formatCurrency', () => {
        it('formats numbers as USD currency', () => {
            expect(formatCurrency(1000)).toBe('$1,000.00');
            expect(formatCurrency(50.5)).toBe('$50.50');
            expect(formatCurrency(0)).toBe('$0.00');
        });
    });

    describe('formatDate', () => {
        it('formats date strings correctly', () => {
            const date = '2023-11-25';
            // Note: This might depend on local timezone, so we check for parts
            const formatted = formatDate(date);
            expect(formatted).toContain('Nov');
            expect(formatted).toContain('25');
            expect(formatted).toContain('2023');
        });
    });

    describe('capitalize', () => {
        it('capitalizes the first letter of a string', () => {
            expect(capitalize('hello')).toBe('Hello');
            expect(capitalize('world')).toBe('World');
        });

        it('handles empty strings', () => {
            expect(capitalize('')).toBe('');
        });
    });
});
