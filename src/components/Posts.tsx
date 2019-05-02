import React, { Component } from "react";

import Listado from "./Listado";

interface IPostsProps {
  posts: any[];
  borrarPost: (id: string) => void;
}
class Posts extends Component<IPostsProps> {
  render() {
    return (
      <div className="col-12 col-md-12">
        <h2 className="text-center">Posts</h2>
        <Listado posts={this.props.posts} borrarPost={this.props.borrarPost} />
      </div>
    );
    // return Object.keys(
    //   this.props.posts.map(key => {
    //     <Post key={key} post={this.props.posts[key]} />;
    //   })
    // );
  }
}

export default Posts;
