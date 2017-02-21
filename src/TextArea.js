import React, { Component } from 'react';

export default class TextArea extends Component {
  static propTypes = {
    defaultValue: React.PropTypes.string,
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    maxLength: React.PropTypes.number,
    onChange: React.PropTypes.func,
  }

  static defaultProps = {
    defaultValue: '',
    placeholder: 'anything goes'
  }

  constructor(props) {
    super(props);

    let {
      value,
      defaultValue,
      maxLength
    } = props;

    value = value || defaultValue;

    if (maxLength !== undefined) {
      value = value.substr(0, maxLength);
    }

    this.state = {value};
  }

  _handleChange(e) {
    let value = e.target.value;

    this.setState({value});

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  render() {

    let {placeholder, value, maxLength} = this.state;

    return (
             <textarea
                 placeholder={placeholder}
                 maxLength={maxLength}
                 onChange={this._handleChange.bind(this)}
                 aria-required={true}
                 value={value}
             />
        );
  }
}
