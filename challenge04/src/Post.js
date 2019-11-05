import React, { Component } from 'react';
import Comment from './Comment';

class Post extends Component {
  render() {
    return (
      <div className="post" key={this.props.data.id}>
        <div className="post-header">
          <img src={this.props.data.author.avatar}/>
          <div class="post-info">
            <span className="author">{this.props.data.author.name}</span>
            <span className="date">{this.props.data.date}</span>
          </div>
        </div>
        
        <div className="post-body">
          {this.props.data.content}
        </div>

        <div className="comments">
          {this.props.data.comments.map(comment => <Comment key={comment.id} data={comment} />)}
        </div>
      </div>
    );
  }
}

export default Post