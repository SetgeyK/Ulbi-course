import * as React from 'react';
import { PageError } from 'widgets/PageError';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.log(
      error,
      info.componentStack,
      React.captureOwnerStack(),
    );
  }

  render() {
    const {hasError} = this.state
    const {children} = this.props
    if (hasError) {
      return <PageError />;
    }

    return children;
  }
}

export default ErrorBoundary