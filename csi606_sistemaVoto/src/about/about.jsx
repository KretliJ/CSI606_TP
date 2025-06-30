import { Link } from "react-router-dom";

function about() {
  return (
    <body className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container bg-amber-50 border-2 border-black rounded-xl p-8 text-center">
        <h1 className="text-black"> Sistema votação v1.2 </h1>
      </div>
      <p className="flex p-8 items-center justify-center">
        <Link
          to="/"
          className="flex items-center justify-center border-black border-2 rounded-xl text-black bg-gray-200 changehover w-36"
        >
          {" "}
          <br></br>
          <div>Clique para voltar</div>
        </Link>
      </p>
    </body>
  );
}
export default about;
