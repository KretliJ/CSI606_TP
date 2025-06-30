import { Link } from "react-router-dom";

function about() {
  return (
    <body className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container bg-amber-50 border-2 border-black rounded-xl p-8 text-center">
        <h1 className="text-black"> Sistema votação v1.2 </h1>
      </div>
      <p className="flex p-8 items-center justify-center">
        <div
          class="text-black p-0"
          style={{ position: "absolute", top: 10, left: 10 }}
        >
          <Link to="/">
            <button
              id="returntolandingbutton"
              className="btn btn-sm"
              type="button"
              style={{ padding: 8 }}
            >
              Voltar
            </button>
          </Link>
        </div>
      </p>
    </body>
  );
}
export default about;
