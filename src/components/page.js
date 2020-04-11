
import React, { Component } from 'react'
import { Helmet } from 'react-helmet';
import { useSSRLocalStorage } from '../use-ssr-local-storage';

export const defaultTheme = '#bed3f3';

function WithTheme(Component) {
  return function WrappedComponent(props) {
    const [theme] = useSSRLocalStorage('theme', defaultTheme);
    return <Component {...props} theme={theme} />;
  }
}

class ThemeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { hasMounted: false };
  }

  componentDidMount() {
    this.setState({ hasMounted: true });
  }

  render() {
    const themeClass = `theme-${this.props.theme.replace('#', '').toUpperCase()}`

    return <>
    <Helmet title={this.props.title}>
        <meta name="theme-color" content={this.props.theme} />
        <meta name="description" content="Helps you practice the 4-7-8 breathing technique" />
      </Helmet>
    {this.state.hasMounted && <div className={`content ${themeClass} ${this.props.className || ''}`}>
      {this.props.children}
    </div>}</>
  }
}

export default WithTheme(ThemeComponent)