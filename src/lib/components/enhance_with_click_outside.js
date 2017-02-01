import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import hoistNonReactStatic from 'hoist-non-react-statics';

export default function enhanceWithClickOutside(WrappedComponent) {
  const componentName = WrappedComponent.displayName || WrappedComponent.name;

  class EnhancedWithClickOutside extends Component {

    constructor(props) {
      super(props);
      this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
      document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutside, true);
    }

    handleClickOutside(e) {
      const node = ReactDOM.findDOMNode(this);
      if ((!node || !node.contains(e.target)) && 
        typeof this.wrappedComponent.handleClickOutside === 'function') {
        this.wrappedComponent.handleClickOutside(e);
      }
    }

    render() {
      return <WrappedComponent { ...this.props } ref={(wrappedComponent) => {this.wrappedComponent = wrappedComponent;}} />;
    }
  }

  EnhancedWithClickOutside.displayName = `EnhanceWithClickOutside(${componentName})`

  return hoistNonReactStatic(EnhancedWithClickOutside, WrappedComponent);
}

