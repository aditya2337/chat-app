import React, { Component } from 'react';
import { connect } from 'react-redux';

class Input extends Component {

  constructor (props) {
    super(props);

    this.state = {
      text: null
    }
  }

  onChangeText = (text) => {
    this.setState({ text: text.target.value })
  };

  onSubmitEditing = () => {
    this.props.dispatch(
      this.props.submitAction(this.state.text)
    );

    if (!this.props.noclear) {
      this.setState({
        text: null
      });
    }
  }

  onFocus = (event) => {
    if (this.props.onFocus) {
      this.props.onFocus(this.refs.input);
    }
  }

  onBlur = () => {
    if (this.props.submitOnBlur) {
      this.onSubmitEditing();
    }
  }

  onLayout = (event) => {
    if (this.props.onLayout) {
      this.props.onLayout(event);
    }
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter' && this.props.purpose === 'chat') {
      this.props.submitAction(this.state.text)
      this.setState({
        text: ''
      })
    }
  }

  render() {
    return (
      <input placeholder={this.props.placeholder}
        onChange={this.onChangeText}
        onSubmitEditing={this.onSubmitEditing}
        onLayout={this.onLayout}
        value={this.state.text}
        onFocus={this.onFocus}
        className='pa3 w-100 tc box'
        onBlur={this.onBlur}
        onKeyPress={this._handleKeyPress}
        ref="input"/>
    )
  }
}

export default connect()(Input);
