import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <h1>The application crashed. Please try again later.</h1>;
    }

    return this.props.children;
  }
}
