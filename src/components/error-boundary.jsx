import React from 'react'

export default class ErrorBoundary 
  extends React.Component
{
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
  }

  render() {
    const { error } = this.state
    if (error) {
      // You can render any custom fallback UI
      return <>
        <h1>{error.message || error}</h1>
        <pre>{error.stack}</pre>
      </>;
    }

    return this.props.children; 
  }
}