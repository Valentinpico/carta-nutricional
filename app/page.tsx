"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";

import sopa from "../public/sopa.jpg";
import normal from "../public/normal.jpg";
import dieta from "../public/dieta.jpg";
import logoPS from "../public/restaurant-logo.png";
import logo from "../public/lg.png";
type Plato = {
  id: number;
  nombre: string;
  tipo: string;
  imagen: StaticImageData;
  proteinas: Array<{
    fuente: string;
    gramos: number;
  }>;
  alergenos: string[];
};

type MenuType = "almuerzo" | "merienda";

const menuData: Record<MenuType, Plato[]> = {
  almuerzo: [
    {
      id: 1,
      nombre: "Sopa de Verduras con Pollo a la Plancha",
      tipo: "sopa",
      imagen: sopa,
      proteinas: [
        { fuente: "Pollo", gramos: 25 },
        { fuente: "Verduras", gramos: 5 },
      ],
      alergenos: ["Gluten", "Apio"],
    },
    {
      id: 2,
      nombre: "Arroz con Lomo de Res y Ensalada",
      tipo: "normal",
      imagen: normal,
      proteinas: [
        { fuente: "Res", gramos: 30 },
        { fuente: "Arroz", gramos: 3 },
      ],
      alergenos: ["Ninguno"],
    },
    {
      id: 3,
      nombre: "Pasta con Pollo y Champiñones",
      tipo: "normal",
      imagen: normal,
      proteinas: [
        { fuente: "Pollo", gramos: 28 },
        { fuente: "Pasta", gramos: 5 },
      ],
      alergenos: ["Gluten", "Lácteos"],
    },
    {
      id: 4,
      nombre: "Pescado al Vapor con Vegetales",
      tipo: "dieta",
      imagen: dieta,
      proteinas: [
        { fuente: "Pescado", gramos: 22 },
        { fuente: "Vegetales", gramos: 3 },
      ],
      alergenos: ["Pescado"],
    },
  ],
  merienda: [
    {
      id: 5,
      nombre: "Pollo en Salsa de Vino con Papa al Horno",
      tipo: "normal",
      imagen: normal,
      proteinas: [
        { fuente: "Pollo", gramos: 28 },
        { fuente: "Papa", gramos: 2 },
      ],
      alergenos: ["Sulfitos"],
    },
    {
      id: 6,
      nombre: "Carne Mechada con Maduro y Ensalada",
      tipo: "normal",
      imagen: normal,
      proteinas: [
        { fuente: "Carne", gramos: 27 },
        { fuente: "Plátano", gramos: 1 },
      ],
      alergenos: ["Ninguno"],
    },
    {
      id: 7,
      nombre: "Ensalada de Quinoa con Pavo",
      tipo: "dieta",
      imagen: dieta,
      proteinas: [
        { fuente: "Pavo", gramos: 20 },
        { fuente: "Quinoa", gramos: 4 },
      ],
      alergenos: ["Ninguno"],
    },
  ],
};

export default function CartaNutricional() {
  const [platoSeleccionado, setPlatoSeleccionado] = useState<Plato>(
    menuData.almuerzo[0]
  );
  const [tipoMenu, setTipoMenu] = useState<MenuType>("almuerzo");

  const handlePlatoClick = (plato: Plato) => {
    setPlatoSeleccionado(plato);
  };

  const handleMenuChange = (tipo: MenuType) => {
    setTipoMenu(tipo);
    setPlatoSeleccionado(menuData[tipo][0]);
  };

  const calcularTotalProteinas = () => {
    return platoSeleccionado.proteinas.reduce(
      (total, proteina) => total + proteina.gramos,
      0
    );
  };

  return (
    <div className="container py-4 bg-white">
      {/* Header */}
      <div className="row mb-4 align-items-center">
        <div className="col-auto p-0">
          <Image
            src={logoPS}
            alt="Logo Restaurante"
            width={150}
            height={150}
            className="rounded p-0"
          />
        </div>
        <div className="col text-center">
          <h1 className="display-5 fw-bold text-dark mb-0">
            Carta Nutricional
          </h1>
          <div className="border-bottom border-2 border-secondary w-50 mx-auto mt-2"></div>
        </div>
        <div className="col-auto">
          <Image
            src={logo}
            alt="Logo Restaurante"
            width={200}
            height={160}
            className="rounded"
          />
        </div>
      </div>

      <div className="row g-4">
        {/* Panel izquierdo - Menú */}
        <div className="col-md-8">
          {/* Tabs de navegación */}
          <ul className="nav nav-tabs mb-3">
            <li className="nav-item w-50">
              <button
                className={`nav-link w-100 ${
                  tipoMenu === "almuerzo" ? "active fw-bold" : ""
                }`}
                onClick={() => handleMenuChange("almuerzo")}
              >
                Almuerzo{" "}
                <span className="ms-1 text-muted small">(10am - 4pm)</span>
              </button>
            </li>
            <li className="nav-item w-50">
              <button
                className={`nav-link w-100 ${
                  tipoMenu === "merienda" ? "active fw-bold" : ""
                }`}
                onClick={() => handleMenuChange("merienda")}
              >
                Merienda{" "}
                <span className="ms-1 text-muted small">(5pm - 9pm)</span>
              </button>
            </li>
          </ul>

          {/* Contenido del menú */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h2 className="card-title h4 mb-3">
                Menú de {tipoMenu === "almuerzo" ? "Almuerzo" : "Merienda"}
              </h2>

              {tipoMenu === "almuerzo" && (
                <div className="mb-4">
                  <h3 className="h5 mb-2">Sopa del día</h3>
                  {menuData.almuerzo
                    .filter((plato) => plato.tipo === "sopa")
                    .map((plato) => (
                      <div
                        key={plato.id}
                        className={`p-2 border rounded mb-2 cursor-pointer ${
                          platoSeleccionado.id === plato.id
                            ? "border-primary bg-primary bg-opacity-10"
                            : "border-light"
                        }`}
                        onClick={() => handlePlatoClick(plato)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="row g-0 align-items-center">
                          <div className="col-auto me-3">
                            <Image
                              src={plato.imagen}
                              alt={plato.nombre}
                              width={90}
                              height={70}
                              className="rounded"
                            />
                          </div>
                          <div className="col">
                            <h4 className="h6 mb-0">{plato.nombre}</h4>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              <div className="mb-4">
                <h3 className="h5 mb-2">Platos principales</h3>
                {menuData[tipoMenu]
                  .filter((plato: Plato) => plato.tipo === "normal")
                  .map((plato: Plato) => (
                    <div
                      key={plato.id}
                      className={`p-2 border rounded mb-2 ${
                        platoSeleccionado.id === plato.id
                          ? "border-primary bg-primary bg-opacity-10"
                          : "border-light"
                      }`}
                      onClick={() => handlePlatoClick(plato)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="row g-0 align-items-center">
                        <div className="col-auto me-3">
                          <Image
                            src={plato.imagen}
                            alt={plato.nombre}
                            width={90}
                            height={70}
                            className="rounded"
                          />
                        </div>
                        <div className="col">
                          <h4 className="h6 mb-0">{plato.nombre}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div>
                <h3 className="h5 mb-2">Opción de dieta</h3>
                {menuData[tipoMenu]
                  .filter((plato: Plato) => plato.tipo === "dieta")
                  .map((plato: Plato) => (
                    <div
                      key={plato.id}
                      className={`p-2 border rounded mb-2 ${
                        platoSeleccionado.id === plato.id
                          ? "border-primary bg-primary bg-opacity-10"
                          : "border-light"
                      }`}
                      onClick={() => handlePlatoClick(plato)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="row g-0 align-items-center">
                        <div className="col-auto me-3">
                          <Image
                            src={plato.imagen}
                            alt={plato.nombre}
                            width={90}
                            height={70}
                            className="rounded"
                          />
                        </div>
                        <div className="col">
                          <h4 className="h6 mb-0">{plato.nombre}</h4>
                          <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 mt-1">
                            Dieta
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Panel derecho - Información nutricional */}
        <div className="col-md-4">
          {/* Proteínas */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h2 className="card-title h4 mb-3">Proteínas Disponibles</h2>
              <div className="mb-2">
                <div className="row fw-bold border-bottom pb-2 mb-2">
                  <div className="col">Fuente</div>
                  <div className="col-auto">Gramos Totales</div>
                </div>
                {platoSeleccionado.proteinas.map((proteina, index) => (
                  <div key={index} className="row mb-1">
                    <div className="col">{proteina.fuente}</div>
                    <div className="col-auto">{proteina.gramos}g</div>
                  </div>
                ))}
                <div className="row fw-bold border-top pt-2 mt-2">
                  <div className="col">Total</div>
                  <div className="col-auto">{calcularTotalProteinas()}g</div>
                </div>
              </div>
            </div>
          </div>

          {/* Alérgenos */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h2 className="card-title h4 mb-3">Alérgenos Presentes</h2>
              {platoSeleccionado.alergenos.includes("Ninguno") ? (
                <p className="text-center fst-italic text-success">
                  No se encontraron alérgenos en este plato
                </p>
              ) : (
                <div className="d-flex flex-wrap gap-2">
                  {platoSeleccionado.alergenos.map((alergeno, index) => (
                    <span
                      key={index}
                      className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25"
                    >
                      {alergeno}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Frase */}
      <div className="row mt-4">
        <div className="col text-center">
          <p className="fst-italic text-muted">
            &quot;La buena comida es como la música que se puede saborear, el
            color que se puede oler.&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
