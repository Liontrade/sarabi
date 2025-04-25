global.requestAnimationFrame = cb => setTimeout(cb, 0);
global.cancelAnimationFrame = id => clearTimeout(id);

import React from 'react';

const motionProxy = new Proxy(
    {},
    {
        get: (_target, tag) => {
            const Component = React.forwardRef<never, { children?: React.ReactNode }>(({ children, ...props }, ref) =>
                React.createElement(tag as string, { ref, ...props }, children),
            );
            Component.displayName = `Motion.${String(tag)}`;
            return Component;
        },
    },
);

jest.mock('framer-motion', () => ({
    ...jest.requireActual('framer-motion'),
    motion: motionProxy,
    AnimatePresence: ({ children }: { children: React.ReactNode }) =>
        React.createElement(React.Fragment, null, children),
}));

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
