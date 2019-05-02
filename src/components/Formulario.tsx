import React, { Component } from "react";

interface IFormularioProps {
  crearPost: (post: any) => void;
}
class Formulario extends Component<IFormularioProps> {
  state = {
    error: false
  };
  tituloRef = React.createRef<HTMLInputElement>();
  contenidoRef = React.createRef<HTMLTextAreaElement>();

  crearPost = (e: React.FormEvent) => {
    e.preventDefault();
    const post = {
      title: this.tituloRef.current ? this.tituloRef.current.value : "",
      body: this.contenidoRef.current ? this.contenidoRef.current.value : "",
      userId: 1
    };
    this.props.crearPost(post);
    // if (!post.title || !post.body) {
    //   this.setState({
    //     error: true
    //   });
    //   return;
    // }
  };

  // mostrarError = () => {
  //   let mensaje;
  //   this.state
  //     ? (mensaje = (
  //         <div className="alert alert-danger" role="alert">
  //           Todos los campos son obligarios
  //         </div>
  //       ))
  //     : (mensaje = "");
  //   return mensaje;
  // };
  render() {
    return (
      <form onSubmit={this.crearPost} className="col-8">
        <legend className="text-center">Crear nuevo Post</legend>
        <div className="form-group">
          <label htmlFor="">Título del Post:</label>
          <input
            ref={this.tituloRef}
            type="text"
            className="form-control"
            placeholder="Título del Post"
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Contenido:</label>
          <textarea
            ref={this.contenidoRef}
            className="form-control"
            placeholder="Contenido"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Crear
        </button>
      </form>
    );
  }
}

export default Formulario;
