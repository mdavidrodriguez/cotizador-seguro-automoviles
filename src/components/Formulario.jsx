import { Fragment, useContext } from "react";
import { MARCAS, YEARS, PLANES } from "../constants";
import useCotizador from "../hooks/useCotizador";
import Error from "./Error";

const Formulario = () => {
  const { handleChangeDatos, datos, error, setError, cotizarSeguro } =
    useCotizador();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(datos).includes("")) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");

    cotizarSeguro();
  };

  return (
    <>
      {error && <Error />}
      <form action="" onSubmit={handleSubmit}>
        <div className="my-5">
          <label
            htmlFor=""
            className="block mb-3 font-bold uppercase text-gray-400"
          >
            Marca
          </label>
          <select
            name="marca"
            className="w-full p-3 bg-white border-gray-200"
            onChange={(e) => handleChangeDatos(e)}
            value={datos.marca}
          >
            <option value="">-- Selecciona Marca --</option>
            {MARCAS.map((marca) => (
              <option value={marca.id} key={marca.id}>
                {marca.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="my-5">
          <label
            htmlFor=""
            className="block mb-3 font-bold uppercase text-gray-400"
          >
            Año
          </label>
          <select
            name="year"
            className="w-full p-3 bg-white border-gray-200"
            onChange={(e) => handleChangeDatos(e)}
            value={datos.year}
          >
            <option value="">-- Selecciona Año --</option>
            {YEARS.map((year) => (
              <option value={year} key={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="my-5">
          <label
            htmlFor=""
            className="block mb-3 font-bold uppercase text-gray-400"
          >
            Elige un Plan
          </label>
          <div className="flex gap-3 items-center">
            {PLANES.map((plan) => (
              <Fragment key={plan.id}>
                <label htmlFor="">{plan.nombre}</label>
                <input
                  type="radio"
                  name="plan"
                  value={plan.id}
                  onChange={(e) => handleChangeDatos(e)}
                />
              </Fragment>
            ))}
          </div>
          <input
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white cursor-pointer font-bold p-2"
            value={"Cotizar"}
          />
        </div>
      </form>
    </>
  );
};
export default Formulario;
