import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    page: 1,
    perPage: 3,
    loading: true,
    refreshing: false,
  };

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    const { stars, page, perPage } = this.state;

    this.setState({ loading: true });

    const response = await api.get(
      `/users/${user.login}/starred?page=${page}&per_page=${perPage}`
    );

    this.setState({
      stars: [...stars, ...response.data],
      page: page + 1,
      loading: false,
    });
  };

  handleNavigation = repo => {
    const { navigation } = this.props;
    navigation.navigate('Repo', { repo });
  };

  refreshList = async () => {
    this.setState({ stars: [], page: 1, refreshing: true });
    await this.getUserInfo();
    this.setState({ refreshing: false });
  };

  renderListFooter = () => {
    const { loading } = this.state;

    if (!loading) return null;

    return <ActivityIndicator color="#7159c1" size="large" />;
  };

  render() {
    const { navigation } = this.props;
    const { stars, refreshing } = this.state;

    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          onEndReached={this.getUserInfo}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={
            <Text>Nenhum repositório marcado com estrela.</Text>
          }
          ListFooterComponent={this.renderListFooter}
          onRefresh={this.refreshList}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => this.handleNavigation(item)}>
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            </TouchableWithoutFeedback>
          )}
        />
      </Container>
    );
  }
}
