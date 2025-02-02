import { Component, ComponentProps, MouseEventHandler, ReactNode } from 'react';

interface ErrorButtonState {
  error: boolean;
}

export default class ErrorButton extends Component<
  ComponentProps<'button'>,
  ErrorButtonState
> {
  state: ErrorButtonState = { error: false };
  handleOnClick: MouseEventHandler<HTMLButtonElement> = (): void => {
    this.setState({ error: true });
  };

  render(): ReactNode {
    if (this.state.error) {
      throw Error('Test error');
    }
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          style={{ margin: '30px 0' }}
          onClick={this.handleOnClick}
          {...this.props}
        >
          Error button
        </button>
      </div>
    );
  }
}
