import React, { Component, ReactNode } from 'react';

/**
 * ErrorBoundary component to catch errors in child components and render a fallback UI.
 * It also provides a refresh button to reload the page.
 *
 * @see https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
 */

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Update state to render fallback UI
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error details to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  // Reload the page
  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Render fallback UI with error message and refresh option
      return (
        <div
          role="alert"
          style={{
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb',
            borderRadius: '4px',
            marginTop: '20px',
          }}
        >
          <h2>Something went wrong.</h2>
          <p>
            {this.state.error?.message ||
              'An unexpected error occurred. Please try again later or contact us.'}
          </p>
          <button
            onClick={this.handleRefresh}
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#721c24',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    // Render children when there’s no error
    return this.props.children;
  }
}

export default ErrorBoundary;
