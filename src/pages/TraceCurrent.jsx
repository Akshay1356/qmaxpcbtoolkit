import { useState } from "react";

function TraceCurrent() {

  const faqs = [
    {
      q: "What standard is used for trace current calculations?",
      a: "IPC-2152 is the modern standard while IPC-2221 is the older approximation method."
    },
    {
      q: "Why does copper weight matter?",
      a: "Higher copper weight increases cross-sectional area and current carrying capability."
    },
    {
      q: "Why does trace length matter?",
      a: "Longer traces increase resistance, voltage drop and power dissipation."
    },
    {
      q: "What causes voltage drop?",
      a: "Resistance in the copper trace causes voltage loss as current flows."
    },
    {
      q: "What causes heating?",
      a: "Power dissipated in the trace generates heat according to I²R."
    },
    {
      q: "Are internal traces different?",
      a: "Internal traces cool less efficiently and require larger widths."
    },
    {
      q: "What is current density?",
      a: "Current density is the amount of current flowing through a given copper area."
    },
    {
      q: "What is acceptable voltage drop?",
      a: "Most power rails target less than 2-5% voltage drop."
    },
    {
      q: "What is copper thickness?",
      a: "Copper thickness is determined by copper weight such as 1 oz or 2 oz."
    },
    {
      q: "How can trace heating be reduced?",
      a: "Increase width, copper weight, parallel paths or reduce current."
    }
  ];

  const [current, setCurrent] = useState("2");
  const [copperWeight, setCopperWeight] = useState("1");
  const [tempRise, setTempRise] = useState("10");
  const [traceLength, setTraceLength] = useState("100");
  const [ambientTemp, setAmbientTemp] = useState("25");
  const [supplyVoltage, setSupplyVoltage] = useState("5");
  const [layerType, setLayerType] = useState("external");

  const [results, setResults] = useState(null);
  const [verdicts, setVerdicts] = useState([]);

  const calculate = () => {

    const I = Number(current);
    const oz = Number(copperWeight);
    const dT = Number(tempRise);
    const L = Number(traceLength);
    const Tamb = Number(ambientTemp);
    const Vin = Number(supplyVoltage);

    if (
      !I ||
      !oz ||
      !dT ||
      !L
    ) return;

    const k =
      layerType === "external"
        ? 0.048
        : 0.024;

    const area =
      Math.pow(
        I /
        (
          k *
          Math.pow(
            dT,
            0.44
          )
        ),
        1 / 0.725
      );

    const thicknessMil =
      oz * 1.378;

    const widthMil =
      area / thicknessMil;

    const widthMm =
      widthMil * 0.0254;

    const thicknessMm =
      oz * 0.0348;

    const areaMM2 =
      widthMm *
      thicknessMm;

    const rho =
      1.724e-8;

    const resistance =
      (
        rho *
        (L / 1000)
      ) /
      (
        areaMM2 *
        1e-6
      );

    const voltageDrop =
      I *
      resistance;

    const powerLoss =
      I *
      voltageDrop;

    const efficiency =
      (
        (
          Vin -
          voltageDrop
        ) /
        Vin
      ) * 100;

    const currentDensity =
      I / areaMM2;

    const estimatedTemp =
      Tamb +
      dT;

    const voltageDropPercent =
      (
        voltageDrop /
        Vin
      ) * 100;

    let thermalRisk;

    if (
      estimatedTemp < 60
    )
      thermalRisk =
        "Low";

    else if (
      estimatedTemp < 90
    )
      thermalRisk =
        "Medium";

    else
      thermalRisk =
        "High";

    let fabrication;

    if (
      widthMm < 0.10
    )
      fabrication =
        "Extreme";

    else if (
      widthMm < 0.15
    )
      fabrication =
        "Hard";

    else if (
      widthMm < 0.20
    )
      fabrication =
        "Medium";

    else
      fabrication =
        "Easy";

    const notes = [];

    if (
      voltageDropPercent < 2
    )
      notes.push(
        "✓ Voltage drop is excellent."
      );

    else if (
      voltageDropPercent < 5
    )
      notes.push(
        "✓ Voltage drop is acceptable."
      );

    else
      notes.push(
        "✖ Excessive voltage drop detected."
      );

    if (
      thermalRisk ===
      "High"
    )
      notes.push(
        "⚠ Thermal risk is high."
      );

    if (
      fabrication ===
      "Extreme"
    )
      notes.push(
        "⚠ Width may require advanced fabrication."
      );

    if (
      currentDensity > 35
    )
      notes.push(
        "⚠ Current density is high."
      );

    if (
      notes.length === 1
    )
      notes.push(
        "✓ Design appears manufacturable."
      );

    setVerdicts(notes);

    setResults({

      requiredWidthMM:
        widthMm.toFixed(3),

      requiredWidthMIL:
        widthMil.toFixed(2),

      copperArea:
        areaMM2.toFixed(4),

      resistance:
        resistance.toFixed(4),

      voltageDrop:
        voltageDrop.toFixed(4),

      voltageDropPercent:
        voltageDropPercent.toFixed(2),

      powerLoss:
        powerLoss.toFixed(4),

      efficiency:
        efficiency.toFixed(2),

      currentDensity:
        currentDensity.toFixed(2),

      estimatedBoardTemp:
        estimatedTemp.toFixed(1),

      thermalRisk,

      fabricationDifficulty:
        fabrication,

      layerType:
        layerType,

      copperWeight:
        oz + " oz"

    });
  };
    return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-red-700 mb-2">
          Trace Current Pro X
        </h1>

        <p className="text-gray-600 mb-8">
          Advanced IPC-Based Current Carrying Capacity,
          Voltage Drop, Thermal and Power Integrity Analysis
        </p>

        <div className="grid md:grid-cols-4 gap-5">

          <div>
            <label className="block mb-2 font-medium">
              Current (A)
            </label>

            <input
              type="number"
              value={current}
              onChange={(e) =>
                setCurrent(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Copper Weight (oz)
            </label>

            <select
              value={copperWeight}
              onChange={(e) =>
                setCopperWeight(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            >
              <option value="0.5">0.5 oz</option>
              <option value="1">1 oz</option>
              <option value="2">2 oz</option>
              <option value="3">3 oz</option>
              <option value="4">4 oz</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Temperature Rise (°C)
            </label>

            <input
              type="number"
              value={tempRise}
              onChange={(e) =>
                setTempRise(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Trace Length (mm)
            </label>

            <input
              type="number"
              value={traceLength}
              onChange={(e) =>
                setTraceLength(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Ambient Temp (°C)
            </label>

            <input
              type="number"
              value={ambientTemp}
              onChange={(e) =>
                setAmbientTemp(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Supply Voltage (V)
            </label>

            <input
              type="number"
              value={supplyVoltage}
              onChange={(e) =>
                setSupplyVoltage(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Layer Type
            </label>

            <select
              value={layerType}
              onChange={(e) =>
                setLayerType(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            >
              <option value="external">
                External Layer
              </option>

              <option value="internal">
                Internal Layer
              </option>
            </select>
          </div>

        </div>

        <button
          onClick={calculate}
          className="mt-8 bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Analyze Trace
        </button>

        {results && (
          <>
            <div className="mt-10">

              <h2 className="text-2xl font-bold text-red-700 mb-6">
                Analysis Results
              </h2>

              <div className="grid md:grid-cols-4 gap-4">

                {Object.entries(results).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-4"
                    >
                      <div className="text-sm text-gray-500 capitalize">
                        {key.replace(
                          /([A-Z])/g,
                          " $1"
                        )}
                      </div>

                      <div className="text-xl font-bold text-red-700">
                        {value}
                      </div>
                    </div>
                  )
                )}

              </div>

            </div>

            <div className="mt-10 border border-gray-200 rounded-xl p-6">

              <h2 className="text-2xl font-bold text-red-700 mb-4">
                Engineering Verdict
              </h2>

              <div className="space-y-3">

                {verdicts.map(
                  (item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                    >
                      {item}
                    </div>
                  )
                )}

              </div>

            </div>

            <div className="mt-10 border border-gray-200 rounded-xl p-6">

              <h2 className="text-2xl font-bold text-red-700 mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">

                {faqs.map(
                  (faq, index) => (
                    <details
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <summary className="cursor-pointer font-semibold">
                        {faq.q}
                      </summary>

                      <p className="mt-3 text-gray-600">
                        {faq.a}
                      </p>
                    </details>
                  )
                )}

              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default TraceCurrent;