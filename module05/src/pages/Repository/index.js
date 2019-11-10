import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, Filter, IssueList, IssueLabel, Paginator } from './styles';

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
    await Promise.all([
      this.getRepoInfo(),
      this.getRepoIssues(),
    ]);

    this.setState({
      loading: false,
    });
  }

  getRepoInfo = async () => {
    const repository = await api.get(`/repos/${this.repoName}`);

    this.setState({
      ...this.state,
      repository: repository.data,
    });
  }

  getRepoIssues = async () => {
    const { issueState, page, per_page } = this.state;

    const issues = await api.get(`/repos/${this.repoName}/issues`, {
      params: {
        state: issueState,
        per_page: per_page,
        page: page,
      },
    });

    this.setState({ issues: issues.data });
  }

  handleIssueStateFilterChange = async e => {
    await this.setState({ issueState: e.target.value });

    await this.getRepoIssues();
  }

  handleNextPage = async e => {
    await this.setState((state, props) => ({
      page: state.page + 1,
    }));

    this.getRepoIssues();
  }

  handlePreviousPage = async e => {
    await this.setState((state, props) => ({
      page: state.page - 1,
    }));

    this.getRepoIssues();
  }

  render() {
    const { repository, issues, loading, issueState, page } = this.state;

    if (loading) {
      return <Loading>Loading...</Loading>;
    }

    return (
      <Container>
        <Owner>
        <Link to="/">Back to repositories</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Filter>
          <label>Issue state: </label>
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
                    <IssueLabel key={String(label.id)} issueColor={'#' + label.color}>{label.name}</IssueLabel>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <Paginator>
            <button type="button" onClick={this.handlePreviousPage} disabled={page === 1}>
              Prev ({page - 1})
            </button>
            <button type="button" onClick={this.handleNextPage}>
              Next ({page + 1})
            </button>
        </Paginator>
      </Container>
    );
  }
}
