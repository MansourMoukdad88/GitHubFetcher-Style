import React from "react";
import ReactDOM from "react-dom";
//import { Navbar } from "react-bootstrap";
import $ from "jquery";
import "./index.css";
import logo from "./github-logo-1.png";
//import Search from "./components/Search.jsx";
import RepoList from "./components/RepoList.jsx";
import ListView from "./components/ListView.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      repos: []
    };
  }

  search(term) {
    console.log(`${term} was searched`);
    // TODO
    $.ajax({
      type: "POST",
      url: "/repos",
      contentType: "application/json",
      data: JSON.stringify({ username: term }),
      success: data => {
        console.log(data);
        this.setState({ repos: data });
      }
    });
  }
  getUser(username) {
    return fetch(
      `https://api.github.com/users/${username}`
      //`https://api.github.com/users/${username}/repos`
    )
      .then(response => response.json())
      .then(response => {
        console.log("FETCH user from client", response);
        return response;
      });
  }
  getUserRepo(username) {
    return fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(response => {
        return response;
      });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const { value } = this.refs.username;
    let user = await this.getUser(value);
    let repos = await this.getUserRepo(value);

    this.setState({
      user: {
        avatar_url: user.avatar_url,
        username: user.login,
        followers: user.followers,
        following: user.following,
        url: user.url,
        public_repos: user.public_repos
      },
      repos
    });
  }

  renderRepos(repos) {
    return repos.map(item => {
      return (
        <div key={item.id} className="repoResults">
          <p>{item.name}</p>
        </div>
      );
    });
  }

  renderUser(user) {
    return (
      <div className="resultBadge">
        <span className="userImg">
          <img src={user.avatar_url} width="128" height="128" alt="ss" />
        </span>
        <p className="userInfo">
          <span className="bold"> Username:</span>
          {user.username}
        </p>
        <p className="followerInfo">
          <span className="bold"> Followers:</span>
          {user.followers}
        </p>
        <p className="followingInfo">
          <span className="bold">Following:</span> {user.following}
        </p>
      </div>
    );
  }

  render() {
    const { user } = this.state;
    return (
      <div className="GitHubSearch">
        <div className="Search-header">
          <header className="Search-header">
            <img
              className="logo"
              src={logo}
              width="128"
              height="128"
              alt="aa"
            />
            <h1 className="header1">Github Fetcher</h1>
            <p className="headSentence">
              Get User's Repos and the Other Details by typing Username.
            </p>
          </header>
        </div>

        <div className="container">
          <br />
          <br />
          <form onSubmit={e => this.handleSubmit(e)}>
            <input
              ref="username"
              type="text"
              placeholder="Search By Username"
            />
          </form>
        </div>

        <div className="Search-intro">
          <h4> User info</h4>
          <div className="userInfo">{user && this.renderUser(user)}</div>
        </div>

        <div className="ListView">
          <br />
          <RepoList repos={this.state.repos} />
          <h3>Repo List: </h3>
          <ListView repos={this.state.repos} />
        </div>
      </div>
    );
  }
}
export default App;

ReactDOM.render(<App />, document.getElementById("app"));
