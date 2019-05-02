import React, { Component } from "react";
interface ISinglePostProps {
  post: any;
}
class SinglePost extends Component<ISinglePostProps> {
  mostrarPost = (post: any) => {
    if (!post)
      return (
        <React.Fragment>
          <div className="alert alert-danger mt-5" role="alert">
            No existe el post!
          </div>
        </React.Fragment>
      );
    const { title, body, userId } = post;
    return (
      <React.Fragment>
        <div className="card border-primary mb-3 mt-5">
          <div className="card-header">Autor Id: {userId}</div>
          <div className="card-body">
            <h3 className="card-title">{title}</h3>
            <p className="card-text">{body}</p>
          </div>
        </div>
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="col-12 col-md-8">{this.mostrarPost(this.props.post)}</div>
    );
  }
}

export default SinglePost;
