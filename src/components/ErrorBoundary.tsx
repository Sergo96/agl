import { ReactNode, PureComponent } from 'react';
import { IProps } from 'interfaces/props';

interface Props extends IProps {
  children?: ReactNode;
}
interface State {
  error: Error | null;
  errorInfo: { componentStack: string } | null;
}

export default class ErrorBoundary extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }): void {
    // Catch errors in any components below and re-render with error message
    this.setState({ error, errorInfo });
  }

  render(): ReactNode {
    const { children } = this.props;
    const { errorInfo, error } = this.state;

    return errorInfo ? (
      <div data-testid="error-view">
        <h2>Something went wrong.</h2>
        <details style={{ whiteSpace: 'pre-wrap' }}>
          {error && error.toString()}
          <br />
          {errorInfo.componentStack}
        </details>
      </div>
    ) : (
      children || null
    );
  }
}
