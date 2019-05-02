import React, { Component } from "react";

import Post from "./Post";

interface IPostsProps {
  posts: any[];
  borrarPost: (id: string) => void;
}
export class Listado extends Component<IPostsProps> {
  mostrarPosts = () => {
    const posts = this.props.posts;
    if (posts.length === 0) return;
    return (
      <React.Fragment>
        {Object.keys(posts).map(key => (
          <Post
            key={key}
            post={posts[parseInt(key)]}
            borrarPost={this.props.borrarPost}
          />
        ))}
      </React.Fragment>
    );
  };

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Título</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>{this.mostrarPosts()}</tbody>
      </table>
    );
  }
}

export default Listado;
