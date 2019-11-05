import React, { Component } from 'react';
import Post from './Post';

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Julio Alcantara",
          avatar: "https://avatars2.githubusercontent.com/u/16533158?s=60&v=4"
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar: "https://avatars1.githubusercontent.com/u/26551306?s=60&v=4"
            },
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet ea sed impedit, dolores est iusto?"
          }
        ]
      },
      {
        id: 2,
        author: {
          name: "Julio Alcantara",
          avatar: "https://avatars3.githubusercontent.com/u/16545335?s=60&v=4"
        },
        date: "04 Jun 2019",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore odio molestias, eligendi, officiis veniam, vero quae corrupti accusantium consectetur esse dolorum. Repellat deserunt voluptate enim inventore illo explicabo dolore, iste doloribus numquam laborum consequatur nesciunt molestias repellendus deleniti labore architecto magni maiores quod exercitationem, assumenda, obcaecati nostrum et cum eum! Ipsum laborum ducimus id nostrum dicta? At laborum vero quam modi, aspernatur unde veritatis, architecto reiciendis ducimus explicabo quisquam facilis itaque dolor rerum quos. Inventore suscipit at id veniam quo voluptas soluta quod, officiis distinctio nihil, quae, maiores molestiae est eaque rem necessitatibus consequatur quasi maxime labore hic quis assumenda.",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar: "https://avatars1.githubusercontent.com/u/26551306?s=60&v=4"
            },
            content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam natus beatae error minima atque sed harum vero modi nesciunt, maiores minus quas qui repellat aut eligendi labore tempora mollitia! Fuga ex numquam ipsum unde quam vero cumque temporibus, sint non laborum dolores eum totam at laboriosam facilis quaerat nostrum dicta!"
          }
        ]
      },
      {
        id: 3,
        author: {
          name: "Julio Alcantara",
          avatar: "https://avatars3.githubusercontent.com/u/16545335?s=60&v=4"
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: []
      }
    ]
  };

  render() {
    return (
      <div className="post-list-wrapper">
        {this.state.posts.map(post => <Post key={post.id} data={post} />)}
      </div>
    );
  }
}

export default PostList