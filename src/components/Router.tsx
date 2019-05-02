import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Header from "./Header";
import Navegacion from "./Navegacion";
import Posts from "./Posts";
import SinglePost from "./SinglePost";
import Formulario from "./Formulario";
import EditarPost from "./EditarPost";

export interface IAppState {
  posts: any[];
}
interface IRouterProps {}
class Router extends Component<IRouterProps> {
  state: IAppState = {
    posts: []
  };

  componentDidMount() {
    this.obtenerPost();
  }

  obtenerPost = async () => {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts`
    );
    this.setState({ posts: response.data });
  };

  borrarPost = async (id: string) => {
    const response = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    if (response.status === 200) {
      const posts = [...this.state.posts];
      let resto = posts.filter(post => post.id !== Number(id));
      this.setState({
        posts: resto
      });
    }
  };

  crearPost = async (post: any) => {
    const response = await axios.post(
      `https://jsonplaceholder.typicode.com/posts`,
      { post }
    );
    if (response.status === 201) {
      const postId = { id: response.data.id };
      const nuevoPost = Object.assign({}, response.data.post, postId);

      this.setState({
        posts: [...this.state.posts, nuevoPost]
      });

      Swal.fire({
        title: "¡Creado!",
        text: "El post ha sido creado.",
        type: "success",
        timer: 750
      });
    }
  };

  editarPost = async (postActualizado: any) => {
    const { id } = postActualizado;
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      { postActualizado }
    );
    if (response.status === 200) {
      const postId = { id: response.data.id };
      const posts = [...this.state.posts];
      const indexPostEditar = posts.findIndex(post => post.id === postId.id);
      posts[indexPostEditar] = postActualizado;

      this.setState({
        posts
      });

      Swal.fire({
        title: "Actualizado!",
        text: "El post ha sido actualizado.",
        type: "success",
        timer: 750
      });
    }
  };

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <div className="row justify-content-center">
            <Header />
            <Navegacion />
            <Switch>
              <Route
                exact
                path="/"
                render={() => {
                  return (
                    <Posts
                      posts={this.state.posts}
                      borrarPost={this.borrarPost}
                    />
                  );
                }}
              />
              <Route
                exact
                path="/post/:postId"
                render={props => {
                  let idPost = props.location.pathname.replace("/post/", "");
                  const posts = this.state.posts;
                  let filtro = posts.filter(post => post.id === Number(idPost));
                  return <SinglePost post={filtro[0]} />;
                }}
              />
              <Route
                exact
                path="/editar/:postId"
                render={props => {
                  let idPost = props.location.pathname.replace("/editar/", "");
                  const posts = this.state.posts;
                  let filtro = posts.filter(post => post.id === Number(idPost));
                  return (
                    <EditarPost editarPost={this.editarPost} post={filtro[0]} />
                  );
                }}
              />
              <Route
                exact
                path="/crear"
                render={() => {
                  return <Formulario crearPost={this.crearPost} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Router;
