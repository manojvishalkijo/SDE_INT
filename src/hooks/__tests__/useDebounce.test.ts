import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('should update value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'test', delay: 500 } }
    );

    expect(result.current).toBe('test');

    // Update the value
    rerender({ value: 'testing', delay: 500 });

    // Value should not update immediately
    expect(result.current).toBe('test');

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Value should update after delay
    expect(result.current).toBe('testing');
  });
});
