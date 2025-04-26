global.requestAnimationFrame = cb => setTimeout(cb, 0);
global.cancelAnimationFrame = id => clearTimeout(id);

global.IntersectionObserver = class {
    observe() {
        /* no-op */
    }

    unobserve() {
        /* no-op */
    }

    disconnect() {
        /* no-op */
    }
} as unknown as typeof IntersectionObserver;

global.ResizeObserver = class {
    observe() {
        /* no-op */
    }

    unobserve() {
        /* no-op */
    }

    disconnect() {
        /* no-op */
    }
} as unknown as typeof ResizeObserver;

import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
import { cleanup } from '@testing-library/react';

if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
    global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;
}

afterEach(() => {
    cleanup();
    jest.clearAllTimers();
});
