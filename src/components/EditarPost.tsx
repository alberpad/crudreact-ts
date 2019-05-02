import React, { Component } from "react";

interface IFormularioProps {
  editarPost: (postActualizado: any) => void;
  post: any;
}
class EditarPost extends Component<IFormularioProps> {
  state = {
    error: false
  };
  tituloRef = React.createRef<HTMLInputElement>();
  contenidoRef = React.createRef<HTMLTextAreaElement>();

  cambiarPost = (e: React.FormEvent) => {
    e.preventDefault();
    const post = {
      title: this.tituloRef.current ? this.tituloRef.current.value : "",
      body: this.contenidoRef.current ? this.contenidoRef.current.value : "",
      userId: 1,
      id: this.props.post.id
    };
    this.props.editarPost(post);
  };
  cargarFormulario = () => {
    if (!this.props.post) return null;
    const { title, body } = this.props.post;

    return (
      <form onSubmit={this.cambiarPost} className="col-8">
        <legend className="text-center">Editar Post</legend>
        <div className="form-group">
          <label htmlFor="">Título del Post:</label>
          <input
            ref={this.tituloRef}
            type="text"
            className="form-control"
            defaultValue={title}
          />
        </div>
        <div className="form-group">
          <label htmlFor="">Contenido:</label>
          <textarea
            ref={this.contenidoRef}
            className="form-control"
            defaultValue={body}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
    );
  };
  render() {
    // console.log(this.props.post);
    return <React.Fragment>{this.cargarFormulario()}</React.Fragment>;
  }
}

export default EditarPost;
