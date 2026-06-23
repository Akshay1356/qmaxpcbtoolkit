import { useState } from "react";

function DifferentialPair() {

  const faqs = [
    {
      q: "What is differential impedance?",
      a: "Differential impedance is the impedance seen between two coupled traces carrying equal and opposite signals."
    },
    {
      q: "Why is 100Ω important?",
      a: "USB, Ethernet, HDMI and many high-speed interfaces are designed around a 100Ω differential impedance target."
    },
    {
      q: "What is odd mode impedance?",
      a: "Odd mode impedance occurs when equal and opposite currents flow through the differential pair."
    },
    {
      q: "What is even mode impedance?",
      a: "Even mode impedance occurs when both traces carry signals in the same direction."
    },
    {
      q: "How does spacing affect impedance?",
      a: "Reducing spacing increases coupling and lowers differential impedance."
    },
    {
      q: "Why do USB signals use differential pairs?",
      a: "Differential signaling improves noise immunity and reduces EMI."
    },
    {
      q: "How does dielectric constant affect impedance?",
      a: "Higher dielectric constants reduce impedance and slow signal propagation."
    },
    {
      q: "What causes differential skew?",
      a: "Unequal trace lengths and inconsistent routing cause skew."
    },
    {
      q: "What is coupling coefficient?",
      a: "It measures how strongly the two traces interact electromagnetically."
    },
    {
      q: "How do I tune differential impedance?",
      a: "Adjust width, spacing, height and dielectric constant until the target impedance is achieved."
    }
  ];

  const [er, setEr] = useState("4.2");
  const [width, setWidth] = useState("0.15");
  const [spacing, setSpacing] = useState("0.15");
  const [height, setHeight] = useState("0.18");
  const [thickness, setThickness] = useState("0.035");
  const [frequency, setFrequency] = useState("5000");
  const [targetImpedance, setTargetImpedance] = useState("100");

  const [results, setResults] = useState(null);
  const [verdicts, setVerdicts] = useState([]);

  const calculate = () => {

    const Er = Number(er);
    const W = Number(width);
    const S = Number(spacing);
    const H = Number(height);
    const T = Number(thickness);
    const F = Number(frequency);
    const Target = Number(targetImpedance);

    if (
      !Er ||
      !W ||
      !S ||
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

    const coupling =
      Math.exp(
        -0.96 *
        (S / H)
      );

    const oddMode =
      zo *
      (
        1 -
        0.48 *
        coupling
      );

    const evenMode =
      zo *
      (
        1 +
        0.48 *
        coupling
      );

    const differential =
      2 *
      oddMode;

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

    const couplingCoefficient =
      (
        (evenMode - oddMode) /
        (evenMode + oddMode)
      ) * 100;

    const swRatio =
      S / W;

    const whRatio =
      W / H;

    let fabrication;

    if (W < 0.08)
      fabrication =
        "High Difficulty";
    else if (W < 0.12)
      fabrication =
        "Medium Difficulty";
    else
      fabrication =
        "Easy";

    let crosstalkRisk;

    if (couplingCoefficient > 20)
      crosstalkRisk =
        "High";
    else if (
      couplingCoefficient > 10
    )
      crosstalkRisk =
        "Medium";
    else
      crosstalkRisk =
        "Low";

    let notes = [];

    const error =
      Math.abs(
        differential -
        Target
      );

    if (error <= 5)
      notes.push(
        "✓ Differential impedance is within target."
      );

    if (
      error > 5 &&
      error <= 10
    )
      notes.push(
        "⚠ Impedance is close but should be tuned."
      );

    if (error > 10)
      notes.push(
        "✖ Differential impedance is outside acceptable range."
      );

    if (crosstalkRisk === "High")
      notes.push(
        "⚠ High coupling detected."
      );

    if (fabrication === "High Difficulty")
      notes.push(
        "⚠ Trace width may be difficult to manufacture."
      );

    if (notes.length === 0)
      notes.push(
        "✓ Design appears acceptable."
      );

    setVerdicts(notes);

    setResults({
      singleEndedImpedance:
        zo.toFixed(2),

      differentialImpedance:
        differential.toFixed(2),

      oddModeImpedance:
        oddMode.toFixed(2),

      evenModeImpedance:
        evenMode.toFixed(2),

      effectiveEr:
        eeff.toFixed(4),

      velocityFactor:
        velocityFactor.toFixed(4),

      propagationDelay:
        propagationDelay.toFixed(2),

      guidedWavelength:
        wavelength.toFixed(2),

      couplingCoefficient:
        couplingCoefficient.toFixed(2),

      crosstalkRisk,

      fabricationDifficulty:
        fabrication,

      traceWidth:
        W.toFixed(3),

      spacing:
        S.toFixed(3),

      copperThickness:
        T.toFixed(3),

      swRatio:
        swRatio.toFixed(2),

      whRatio:
        whRatio.toFixed(2),

      impedanceError:
        error.toFixed(2)
    });
  };
    return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-red-700 mb-2">
          Differential Pair Pro X
        </h1>

        <p className="text-gray-600 mb-8">
          Advanced Differential Pair Impedance, Coupling,
          Crosstalk and Signal Integrity Analysis
        </p>

        <div className="grid md:grid-cols-4 gap-5">

          <div>
            <label className="block mb-2 font-medium">
              Dielectric Constant (Er)
            </label>

            <input
              type="number"
              value={er}
              onChange={(e) =>
                setEr(e.target.value)
              }
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
              onChange={(e) =>
                setWidth(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Trace Spacing (mm)
            </label>

            <input
              type="number"
              value={spacing}
              onChange={(e) =>
                setSpacing(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Height Above Plane (mm)
            </label>

            <input
              type="number"
              value={height}
              onChange={(e) =>
                setHeight(e.target.value)
              }
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
              onChange={(e) =>
                setThickness(e.target.value)
              }
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
              onChange={(e) =>
                setFrequency(e.target.value)
              }
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
                setTargetImpedance(
                  e.target.value
                )
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

        </div>

        <button
          onClick={calculate}
          className="mt-8 bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Analyze Differential Pair
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

export default DifferentialPair;