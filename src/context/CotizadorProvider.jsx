import { useState } from "react";
import { createContext } from "react";
import {
  obtenerDiferenciayear,
  calcularMarca,
  calcularPlan,
  formatearDinero,
} from "../helpers";

const CotizadorContext = createContext();

const CotizadorProvider = ({ children }) => {
  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: "",
  });
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState(0);
  const handleChangeDatos = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const cotizarSeguro = () => {
    // una base
    let resultado = 2000;
    // Obtener diferencia de años
    const diferencia = obtenerDiferenciayear(datos.year);
    // Hay que restar el 3% por cada año
    resultado -= (diferencia * 3 * resultado) / 100;
    // Americano 15%
    // Europeo 30%
    // Asiatico 5%
    resultado *= calcularMarca(datos.marca);
    // Basico 20%
    // Completo 50%
    resultado *= calcularPlan(datos.plan);
    // Formatear dinero
    resultado = formatearDinero(resultado);

    setCargando(true);
    setTimeout(() => {
      setResultado(resultado);
      setCargando(false);
    }, 2000);
  };
  return (
    <CotizadorContext.Provider
      value={{
        handleChangeDatos,
        datos,
        error,
        setError,
        cotizarSeguro,
        resultado,
        cargando,
      }}
    >
      {children}
    </CotizadorContext.Provider>
  );
};

export { CotizadorProvider };

export default CotizadorContext;
