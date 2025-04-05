import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StatsButton from '../components/StatsButton/StatsButton';
import {describe, it, expect, vi} from 'vitest';

describe('StatsButton', () => {
  it('calls onClick when clicked', async () => {
    const mock = vi.fn();
    render(<StatsButton onClick={mock} />);

    await userEvent.click(screen.getByRole('button'));
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
