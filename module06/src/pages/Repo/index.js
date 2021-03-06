import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { WebView } from 'react-native-webview';

// import { Container } from './styles';

export default class Repo extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repo').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  render() {
    const { navigation } = this.props;
    const repo = navigation.getParam('repo');

    return (
      <WebView
        startInLoadingState
        source={{ uri: repo.html_url }}
        style={{ flex: 1 }}
      />
    );
  }
}
