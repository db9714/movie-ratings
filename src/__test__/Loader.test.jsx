import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from '../components/Loader';

describe('Loader Component', () => {
  afterEach(cleanup); // Cleanup after each test to avoid memory leaks

  test('renders loader when loading is true', () => {
    render(<Loader loading={true} />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

//   test('does not render loader when loading is false', () => {
//     render(<Loader loading={false} />);
//     const loader = screen.queryByTestId('loader');
//     expect(loader).not.toBeInTheDocument();
//   });
});
