import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '../src/component/Header';

// Mock the image import
jest.mock('../src/assets/wind.png', () => 'test-logo.png');

describe('Header Component', () => {
  test('renders the header with the logo', () => {
    render(<Header />);

    // Check if the header is rendered
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();

    // Check if the image is rendered with the correct src and alt attributes
    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toHaveAttribute('src', 'test-logo.png');
  });
});
