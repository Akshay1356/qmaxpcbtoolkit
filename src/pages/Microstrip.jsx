import { useState } from "react";

function Microstrip() {

  const faqs = [
    {
      q: "What is a microstrip?",
      a: "A microstrip is a PCB transmission line consisting of a trace over a reference plane separated by dielectric material."
    },
    {
      q: "Why is 50Ω common?",
      a: "50Ω provides a practical compromise between power handling and signal loss."
    },
    {
      q: "How does dielectric constant affect impedance?",
      a: "Higher dielectric constant lowers impedance and slows signal propagation."
    },
    {
      q: "What is effective dielectric constant?",
      a: "It represents the effective dielectric seen by electromagnetic fields travelling partly in air and partly in dielectric."
    },
    {
      q: "What causes impedance variation?",
      a: "Changes in width, dielectric thickness, copper thickness and material properties."
    },
    {
      q: "What is propagation delay?",
      a: "The time required for a signal to travel through a transmission line."
    },
    {
      q: "What is velocity factor?",
      a: "The signal velocity relative to the speed of light."
    },
    {
      q: "What is return loss?",
      a: "Return loss indicates how much signal energy is reflected due to impedance mismatch."
    },
    {
      q: "How do I tune impedance?",
      a: "Adjust trace width, dielectric height, copper thickness and dielectric constant."
    },
    {
      q: "When should stripline be used instead?",
      a: "Stripline is preferred when EMI reduction and field containment are critical."
    }
  ];

  const [er, setEr] = useState("4.2");
  const [width, setWidth] = useState("0.30");
  const [height, setHeight] = useState("0.18");
  const [thickness, setThickness] = useState("0.035");
  const [frequency, setFrequency] = useState("1000");
  const [targetImpedance, setTargetImpedance] = useState("50");
  const [tolerance, setTolerance] = useState("10");

  const [results, setResults] = useState(null);
  const [verdicts, setVerdicts] = useState([]);

  const calculate = () => {

    const Er = Number(er);
    const W = Number(width);
    const H = Number(height);
    const T = Number(thickness);
    const F = Number(frequency);
    const Target = Number(targetImpedance);
    const Tol = Number(tolerance);

    if (
      !Er ||
      !W ||
      !H
    ) return;

    const u = W / H;

    const eeff =
      ((Er + 1) / 2) +
      ((Er - 1) / 2) *
      (
        1 /
        Math.sqrt(
          1 + 12 / u
        )
      );

    const zo =
      (
        120 *
        Math.PI
      ) /
      (
        Math.sqrt(eeff) *
        (
          u +
          1.393 +
          0.667 *
          Math.log(
            u + 1.444
          )
        )
      );

    const velocityFactor =
      1 /
      Math.sqrt(
        eeff
      );

    const propagationDelay =
      85 *
      Math.sqrt(
        eeff
      );

    const wavelength =
      (
        300 /
        Math.sqrt(
          eeff
        )
      ) /
      (
        F / 1000
      );

    const criticalLength =
      (
        wavelength * 1000
      ) / 10;

    const capacitancePerLength =
      (
        100 *
        eeff
      ) / zo;

    const inductancePerLength =
      zo * zo *
      capacitancePerLength;

    const impedanceError =
      Math.abs(
        zo - Target
      );

    const reflectionCoefficient =
      (
        Target - zo
      ) /
      (
        Target + zo
      );

    const returnLoss =
      -20 *
      Math.log10(
        Math.abs(
          reflectionCoefficient
        )
      );

    const whRatio =
      W / H;

    const copperRatio =
      T / W;

    let fabrication;

    if (W < 0.075)
      fabrication =
        "Extreme";

    else if (W < 0.10)
      fabrication =
        "Hard";

    else if (W < 0.15)
      fabrication =
        "Medium";

    else
      fabrication =
        "Easy";

    let risk;

    if (
      impedanceError >
      Target *
      (Tol / 100)
    )
      risk =
        "High";

    else
      risk =
        "Low";

    const notes = [];

    if (
      impedanceError <=
      Target *
      (Tol / 100)
    )
      notes.push(
        "✓ Impedance within target tolerance."
      );

    else
      notes.push(
        "✖ Impedance outside target tolerance."
      );

    if (
      fabrication ===
      "Extreme"
    )
      notes.push(
        "⚠ Fabrication may require HDI processes."
      );

    if (
      returnLoss < 20
    )
      notes.push(
        "⚠ Return loss indicates possible mismatch."
      );

    if (
      notes.length === 1
    )
      notes.push(
        "✓ Geometry appears manufacturable."
      );

    setVerdicts(notes);

    setResults({

      characteristicImpedance:
        zo.toFixed(2),

      effectiveEr:
        eeff.toFixed(4),

      velocityFactor:
        velocityFactor.toFixed(4),

      propagationDelay:
        propagationDelay.toFixed(2),

      guidedWavelength:
        wavelength.toFixed(2),

      criticalLength:
        criticalLength.toFixed(2),

      capacitancePerLength:
        capacitancePerLength.toFixed(2),

      inductancePerLength:
        inductancePerLength.toFixed(2),

      reflectionCoefficient:
        reflectionCoefficient.toFixed(4),

      returnLoss:
        returnLoss.toFixed(2),

      impedanceError:
        impedanceError.toFixed(2),

      fabricationDifficulty:
        fabrication,

      impedanceRisk:
        risk,

      whRatio:
        whRatio.toFixed(2),

      copperRatio:
        copperRatio.toFixed(3)
    });
  };
    return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-red-700 mb-2">
          Microstrip Pro X
        </h1>

        <p className="text-gray-600 mb-8">
          Advanced Controlled Impedance, Signal Integrity,
          Reflection and Manufacturing Analysis
        </p>

        <div className="grid md:grid-cols-4 gap-5">

          <div>
            <label className="block mb-2 font-medium">
              Dielectric Constant (Er)
            </label>

            <input
              type="number"
              value={er}
              onChange={(e) => setEr(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Trace Width (mm)
            </label>

            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Dielectric Height (mm)
            </label>

            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Copper Thickness (mm)
            </label>

            <input
              type="number"
              value={thickness}
              onChange={(e) => setThickness(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Frequency (MHz)
            </label>

            <input
              type="number"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Target Impedance (Ω)
            </label>

            <input
              type="number"
              value={targetImpedance}
              onChange={(e) =>
                setTargetImpedance(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Tolerance (%)
            </label>

            <input
              type="number"
              value={tolerance}
              onChange={(e) =>
                setTolerance(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

        </div>

        <button
          onClick={calculate}
          className="mt-8 bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Analyze Microstrip
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

export default Microstrip;