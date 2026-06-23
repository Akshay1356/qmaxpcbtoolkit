import { useState } from "react";

function Reactance() {

  const faqs = [
    {
      q: "What is capacitive reactance?",
      a: "Capacitive reactance is the opposition a capacitor presents to AC current."
    },
    {
      q: "What is inductive reactance?",
      a: "Inductive reactance is the opposition an inductor presents to AC current."
    },
    {
      q: "Why does capacitive reactance decrease with frequency?",
      a: "Higher frequency allows current to pass through a capacitor more easily."
    },
    {
      q: "Why does inductive reactance increase with frequency?",
      a: "An inductor opposes changing current more strongly as frequency rises."
    },
    {
      q: "What is resonance?",
      a: "Resonance occurs when capacitive and inductive reactances are equal."
    },
    {
      q: "What is Q factor?",
      a: "Q factor measures the sharpness and selectivity of a resonant circuit."
    },
    {
      q: "Why is resonance important?",
      a: "Resonance is used in filters, oscillators and RF circuits."
    },
    {
      q: "What is phase angle?",
      a: "Phase angle describes the phase difference between voltage and current."
    },
    {
      q: "What is impedance?",
      a: "Impedance is the total opposition to AC current including resistance and reactance."
    },
    {
      q: "Where is reactance used in PCB design?",
      a: "Reactance is critical in RF, power delivery, filters, decoupling and signal integrity."
    }
  ];

  const [frequency, setFrequency] = useState("1000000");
  const [capacitance, setCapacitance] = useState("1e-9");
  const [inductance, setInductance] = useState("1e-6");
  const [resistance, setResistance] = useState("50");

  const [results, setResults] = useState(null);
  const [verdicts, setVerdicts] = useState([]);

  const calculate = () => {

    const F = Number(frequency);
    const C = Number(capacitance);
    const L = Number(inductance);
    const R = Number(resistance);

    if (
      !F ||
      !C ||
      !L ||
      !R
    ) return;

    const xc =
      1 /
      (
        2 *
        Math.PI *
        F *
        C
      );

    const xl =
      2 *
      Math.PI *
      F *
      L;

    const resonance =
      1 /
      (
        2 *
        Math.PI *
        Math.sqrt(
          L * C
        )
      );

    const impedance =
      Math.sqrt(
        (R * R) +
        Math.pow(
          xl - xc,
          2
        )
      );

    const phaseAngle =
      Math.atan(
        (xl - xc) /
        R
      ) *
      (
        180 /
        Math.PI
      );

    const qFactor =
      xl / R;

    const bandwidth =
      resonance / qFactor;

    const reactanceDifference =
      Math.abs(
        xl - xc
      );

    let circuitState;

    if (
      reactanceDifference < 1
    )
      circuitState =
        "Resonant";

    else if (
      xl > xc
    )
      circuitState =
        "Inductive";

    else
      circuitState =
        "Capacitive";

    const notes = [];

    if (
      circuitState ===
      "Resonant"
    )
      notes.push(
        "✓ Circuit is operating near resonance."
      );

    if (
      qFactor > 10
    )
      notes.push(
        "✓ High-Q resonant circuit."
      );

    if (
      qFactor < 2
    )
      notes.push(
        "⚠ Low-Q circuit may have poor selectivity."
      );

    if (
      Math.abs(
        phaseAngle
      ) > 60
    )
      notes.push(
        "⚠ Significant phase shift detected."
      );

    if (
      notes.length === 0
    )
      notes.push(
        "✓ Circuit operating normally."
      );

    setVerdicts(notes);

    setResults({

      capacitiveReactance:
        xc.toFixed(2),

      inductiveReactance:
        xl.toFixed(2),

      resonantFrequency:
        resonance.toFixed(2),

      impedance:
        impedance.toFixed(2),

      phaseAngle:
        phaseAngle.toFixed(2),

      qFactor:
        qFactor.toFixed(2),

      bandwidth:
        bandwidth.toFixed(2),

      circuitState,

      reactanceDifference:
        reactanceDifference.toFixed(2)

    });
  };
    return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-red-700 mb-2">
          Reactance Pro X
        </h1>

        <p className="text-gray-600 mb-8">
          Advanced AC, RLC, Resonance and Impedance Analysis
        </p>

        <div className="grid md:grid-cols-4 gap-5">

          <div>
            <label className="block mb-2 font-medium">
              Frequency (Hz)
            </label>

            <input
              type="number"
              value={frequency}
              onChange={(e) =>
                setFrequency(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Capacitance (F)
            </label>

            <input
              type="number"
              value={capacitance}
              onChange={(e) =>
                setCapacitance(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Inductance (H)
            </label>

            <input
              type="number"
              value={inductance}
              onChange={(e) =>
                setInductance(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Resistance (Ω)
            </label>

            <input
              type="number"
              value={resistance}
              onChange={(e) =>
                setResistance(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

        </div>

        <button
          onClick={calculate}
          className="mt-8 bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Analyze Circuit
        </button>

        {results && (
          <>
            <div className="mt-10">

              <h2 className="text-2xl font-bold text-red-700 mb-6">
                Analysis Results
              </h2>

              <div className="grid md:grid-cols-3 gap-4">

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

export default Reactance;