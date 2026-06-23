import { useState } from "react";

function Stripline() {

  const faqs = [
    {
      q: "What is a stripline?",
      a: "A stripline is a PCB transmission line embedded between two reference planes."
    },
    {
      q: "Why use stripline instead of microstrip?",
      a: "Stripline provides better EMI containment and reduced radiation."
    },
    {
      q: "What impedance is commonly used?",
      a: "50Ω single-ended and 100Ω differential are the most common targets."
    },
    {
      q: "What affects stripline impedance?",
      a: "Trace width, dielectric spacing, copper thickness and dielectric constant."
    },
    {
      q: "Why is symmetry important?",
      a: "Symmetrical spacing improves impedance control and reduces skew."
    },
    {
      q: "What is propagation delay?",
      a: "The time required for a signal to travel through the transmission line."
    },
    {
      q: "What is return loss?",
      a: "Return loss measures reflections caused by impedance mismatches."
    },
    {
      q: "How does Er affect stripline?",
      a: "Higher dielectric constants lower impedance and reduce propagation speed."
    },
    {
      q: "When should stripline be used?",
      a: "For high-speed interfaces such as DDR, PCIe, Ethernet and SerDes."
    },
    {
      q: "Why is stripline preferred for EMI control?",
      a: "The electromagnetic field is contained inside the PCB stackup."
    }
  ];

  const [er, setEr] = useState("4.2");
  const [width, setWidth] = useState("0.15");
  const [thickness, setThickness] = useState("0.035");

  const [topHeight, setTopHeight] = useState("0.18");
  const [bottomHeight, setBottomHeight] = useState("0.18");

  const [frequency, setFrequency] = useState("5000");

  const [targetImpedance, setTargetImpedance] = useState("50");

  const [tolerance, setTolerance] = useState("10");

  const [results, setResults] = useState(null);
  const [verdicts, setVerdicts] = useState([]);

  const calculate = () => {

    const Er = Number(er);
    const W = Number(width);
    const T = Number(thickness);

    const H1 = Number(topHeight);
    const H2 = Number(bottomHeight);

    const F = Number(frequency);

    const Target = Number(targetImpedance);
    const Tol = Number(tolerance);

    if (
      !Er ||
      !W ||
      !H1 ||
      !H2
    ) return;

    const H =
      (H1 + H2) / 2;

    const z0 =
      (
        60 /
        Math.sqrt(Er)
      ) *
      Math.log(
        (
          4 * H
        ) /
        (
          0.67 *
          Math.PI *
          (W + T)
        )
      );

    const velocityFactor =
      1 /
      Math.sqrt(Er);

    const propagationDelay =
      85 *
      Math.sqrt(Er);

    const wavelength =
      (
        300 /
        Math.sqrt(Er)
      ) /
      (
        F / 1000
      );

    const capacitancePerLength =
      (
        100 * Er
      ) / z0;

    const inductancePerLength =
      z0 *
      z0 *
      capacitancePerLength;

    const impedanceError =
      Math.abs(
        z0 -
        Target
      );

    const reflectionCoefficient =
      (
        Target -
        z0
      ) /
      (
        Target +
        z0
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

    const symmetryError =
      Math.abs(
        H1 - H2
      );

    let symmetry;

    if (
      symmetryError <
      0.01
    )
      symmetry =
        "Excellent";

    else if (
      symmetryError <
      0.05
    )
      symmetry =
        "Good";

    else
      symmetry =
        "Poor";

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
      risk = "High";
    else
      risk = "Low";

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
      symmetry ===
      "Poor"
    )
      notes.push(
        "⚠ Stripline stackup is not symmetrical."
      );

    if (
      fabrication ===
      "Extreme"
    )
      notes.push(
        "⚠ Geometry may require HDI fabrication."
      );

    if (
      returnLoss < 20
    )
      notes.push(
        "⚠ Return loss indicates impedance mismatch."
      );

    if (
      notes.length === 1
    )
      notes.push(
        "✓ Design appears manufacturable."
      );

    setVerdicts(notes);

    setResults({

      characteristicImpedance:
        z0.toFixed(2),

      effectiveEr:
        Er.toFixed(2),

      velocityFactor:
        velocityFactor.toFixed(4),

      propagationDelay:
        propagationDelay.toFixed(2),

      guidedWavelength:
        wavelength.toFixed(2),

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

      symmetry,

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
          Stripline Pro X
        </h1>

        <p className="text-gray-600 mb-8">
          Advanced Stripline Impedance, Signal Integrity,
          EMI and Manufacturing Analysis
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
              Top Plane Distance (mm)
            </label>

            <input
              type="number"
              value={topHeight}
              onChange={(e) => setTopHeight(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Bottom Plane Distance (mm)
            </label>

            <input
              type="number"
              value={bottomHeight}
              onChange={(e) => setBottomHeight(e.target.value)}
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
          Analyze Stripline
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

export default Stripline;