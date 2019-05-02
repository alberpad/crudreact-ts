import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

interface IPostProps {
  post: any;
  borrarPost: (id: string) => void;
}
class Post extends Component<IPostProps> {
  handleBorrarClick = (e: React.MouseEvent) => {
    const { id } = this.props.post;
    e.preventDefault();
    Swal.fire({
      title: "¿Estas seguro?",
      text: "La eliminación es definitiva!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si, bórralo!",
      cancelButtonText: "Cancelar"
    }).then((result: any) => {
      if (result.value) {
        this.props.borrarPost(id);

        Swal.fire({
          title: "¡Borrado!",
          text: "El post ha sido borrado.",
          type: "success",
          timer: 750
        });
      }
    });
  };
  render() {
    const { id, title } = this.props.post;
    return (
      <tr>
        <td>{id}</td>
        <td>{title}</td>
        <td>
          <Link to={`/post/${id}`} className="btn btn-primary">
            Ver
          </Link>
          <Link to={`/editar/${id}`} className="btn btn-warning">
            Editar
          </Link>
          <button
            // onClick={() => this.props.borrarPost(id)}
            onClick={this.handleBorrarClick}
            type="button"
            className="btn btn-danger"
          >
            Borrar
          </button>
        </td>
      </tr>
    );
  }
}

export default Post;
