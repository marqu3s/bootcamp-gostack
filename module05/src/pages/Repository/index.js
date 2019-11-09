import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, Filter, IssueList, Paginator } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    issueState: 'closed',
    page: 1,
    per_page: 10,
    links: [],
  };

  repoName = '';

  issueStateOptions = [
    { code: 'all', label: 'All' },
    { code: 'open', label: 'Open' },
    { code: 'closed', label: 'Closed' },
  ];

  async componentDidMount() {
    const { match } = this.props;
    this.repoName = decodeURIComponent(match.params.repository);

    // const response = await api.get(`/repos/${repo.name}`);
    // const issues = await api.get(`/repos/${repo.name}/issues`);
    const [repository, issues] = await Promise.all([
      this.getRepoInfo(),
      this.getRepoIssues(),
    ]);

    const paginationLinks = issues.headers.link.split(',').map(url => url.trim());

    this.setState({
      repository: repository.data,
      issues: issues.data,
      links: paginationLinks,
      loading: false,
    });
  }

  getRepoInfo = async () => {
    return await api.get(`/repos/${this.repoName}`);
  }

  getRepoIssues = async () => {
    const { issueState, page, per_page } = this.state;

    return await api.get(`/repos/${this.repoName}/issues`, {
      params: {
        state: issueState,
        per_page: per_page,
        page: page,
      },
    });
  }

  handleIssueStateFilterChange = async e => {
    this.setState({ issueState: e.target.value });

    const issues = await this.getRepoIssues();

    this.setState({
      issues: issues.data,
    });
  }

  render() {
    const { repository, issues, loading, issueState } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
        <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Filter>
          <label>Estado do issue: </label>
          <select name="issueState" value={issueState} onChange={this.handleIssueStateFilterChange}>
            {this.issueStateOptions.map(option => (
              <option key={option.code} value={option.code}>{option.label}</option>
            ))}
          </select>
        </Filter>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)} issueColor={'#' + label.color}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <Paginator>

        </Paginator>
      </Container>
    );
  }
}
