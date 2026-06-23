import { useState } from "react";

function ViaCurrent() {
  const faqs = [
    {
      q: "What is via current capacity?",
      a: "Via current capacity is the estimated maximum current a via can safely carry before excessive heating occurs."
    },
    {
      q: "Why does plating thickness matter?",
      a: "Thicker plating increases copper cross-sectional area, lowering resistance and improving current capacity."
    },
    {
      q: "What is aspect ratio?",
      a: "Aspect ratio is board thickness divided by drill diameter. Lower ratios are easier to manufacture."
    },
    {
      q: "Why is annular ring important?",
      a: "A larger annular ring improves manufacturability and reliability."
    },
    {
      q: "What is via inductance?",
      a: "Via inductance is a parasitic property that affects signal integrity at high frequencies."
    },
    {
      q: "What is via capacitance?",
      a: "Via capacitance exists between the via barrel and surrounding copper structures."
    },
    {
      q: "Why does skin effect matter?",
      a: "At high frequencies current flows only near the conductor surface, increasing AC resistance."
    },
    {
      q: "What causes via resonance?",
      a: "The interaction of via inductance and capacitance creates resonant frequencies."
    },
    {
      q: "When should multiple vias be used?",
      a: "Multiple vias reduce resistance, voltage drop, and improve thermal performance."
    },
    {
      q: "What is a good aspect ratio?",
      a: "Most PCB fabricators prefer aspect ratios below 10:1."
    }
  ];

  const [drill, setDrill] = useState("0.30");
  const [padDiameter, setPadDiameter] = useState("0.60");
  const [antiPad, setAntiPad] = useState("1.20");
  const [plating, setPlating] = useState("25");
  const [boardThickness, setBoardThickness] = useState("1.6");

  const [viaCount, setViaCount] = useState("1");
  const [current, setCurrent] = useState("1");
  const [voltage, setVoltage] = useState("5");
  const [frequency, setFrequency] = useState("1000");
  const [ambientTemp, setAmbientTemp] = useState("25");

  const [results, setResults] = useState(null);
  const [verdicts, setVerdicts] = useState([]);

  const calculate = () => {
    const D = Number(drill);
    const PD = Number(padDiameter);
    const AP = Number(antiPad);
    const P = Number(plating);
    const BT = Number(boardThickness);

    const VC = Number(viaCount);
    const I = Number(current);
    const V = Number(voltage);

    const freqHz =
      Number(frequency) * 1000000;

    if (
      !D ||
      !PD ||
      !AP ||
      !P ||
      !BT ||
      !VC ||
      !I
    )
      return;

    const rho = 1.724e-8;

    const diameterM = D / 1000;
    const platingM = P / 1000000;
    const lengthM = BT / 1000;

    const copperArea =
      Math.PI *
      diameterM *
      platingM;

    const resistanceSingle =
      (rho * lengthM) /
      copperArea;

    const resistance =
      resistanceSingle / VC;

    const currentPerVia =
      I / VC;

    const voltageDrop =
      resistance * I;

    const powerLoss =
      voltageDrop * I;

    const currentDensity =
      I /
      (copperArea *
        1000000 *
        VC);

    const maxCurrentSingle =
      copperArea *
      1000000000000 *
      0.03;

    const maxCurrent =
      maxCurrentSingle *
      VC;

    const tempRise =
      powerLoss * 35;

    const aspectRatio =
      BT / D;

    const annularRing =
      (PD - D) / 2;

    const inductance =
      5.08 *
      BT *
      (
        Math.log(
          (4 * BT) / D
        ) + 1
      );

    const capacitance =
      (
        1.41 *
        4.2 *
        BT *
        D
      ) / 10;

    const inductanceH =
      inductance * 1e-9;

    const capacitanceF =
      capacitance * 1e-12;

    const viaImpedance =
      Math.sqrt(
        inductanceH /
          capacitanceF
      );

    const propagationDelay =
      Math.sqrt(
        inductanceH *
          capacitanceF
      ) * 1e12;

    const resonance =
      1 /
      (
        2 *
        Math.PI *
        Math.sqrt(
          inductanceH *
            capacitanceF
        )
      );

    const skinDepth =
      Math.sqrt(
        rho /
          (
            Math.PI *
            freqHz *
            (4e-7 *
              Math.PI)
          )
      ) * 1000000;

    const acResistance =
      resistance *
      Math.sqrt(
        freqHz / 1000
      );

    const quarterWaveStub =
      (
        300 /
        (
          resonance /
          1000000000
        )
      ) /
      4;

    const suggestedViaCount =
      Math.ceil(
        I /
          Math.max(
            maxCurrentSingle,
            0.01
          )
      );

    let notes = [];

    if (aspectRatio > 10)
      notes.push(
        "⚠ High aspect ratio may be difficult to manufacture."
      );

    if (annularRing < 0.10)
      notes.push(
        "⚠ Annular ring is very small."
      );

    if (I > maxCurrent)
      notes.push(
        "⚠ Current exceeds estimated via capacity."
      );

    if (skinDepth < P)
      notes.push(
        "⚠ Skin effect is significant at this frequency."
      );

    if (notes.length === 0)
      notes.push(
        "✓ Design appears acceptable."
      );

    setVerdicts(notes);

    setResults({
      resistance:
        resistance.toFixed(5),

      currentPerVia:
        currentPerVia.toFixed(2),

      voltageDrop:
        voltageDrop.toFixed(5),

      powerLoss:
        powerLoss.toFixed(5),

      currentDensity:
        currentDensity.toFixed(2),

      currentCapacity:
        maxCurrent.toFixed(2),

      temperatureRise:
        tempRise.toFixed(2),

      aspectRatio:
        aspectRatio.toFixed(2),

      annularRing:
        annularRing.toFixed(3),

      inductance:
        inductance.toFixed(2),

      capacitance:
        capacitance.toFixed(2),

      impedance:
        viaImpedance.toFixed(2),

      propagationDelay:
        propagationDelay.toFixed(2),

      resonance:
        (
          resonance /
          1000000000
        ).toFixed(2),

      skinDepth:
        skinDepth.toFixed(2),

      acResistance:
        acResistance.toFixed(5),

      quarterWaveStub:
        quarterWaveStub.toFixed(2),

      suggestedViaCount
    });
  };
    return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-red-700 mb-2">
          Via Pro X
        </h1>

        <p className="text-gray-600 mb-8">
          Advanced Via Analysis Tool for PCB Power, Thermal,
          Manufacturing and Signal Integrity Design
        </p>

        {/* INPUTS */}

        <div className="grid md:grid-cols-5 gap-5">

          <div>
            <label className="block mb-2 font-medium">
              Drill Diameter (mm)
            </label>

            <input
              type="number"
              value={drill}
              onChange={(e) =>
                setDrill(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Pad Diameter (mm)
            </label>

            <input
              type="number"
              value={padDiameter}
              onChange={(e) =>
                setPadDiameter(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Anti-Pad (mm)
            </label>

            <input
              type="number"
              value={antiPad}
              onChange={(e) =>
                setAntiPad(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Plating (µm)
            </label>

            <input
              type="number"
              value={plating}
              onChange={(e) =>
                setPlating(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Board Thickness (mm)
            </label>

            <input
              type="number"
              value={boardThickness}
              onChange={(e) =>
                setBoardThickness(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Via Count
            </label>

            <input
              type="number"
              value={viaCount}
              onChange={(e) =>
                setViaCount(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

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
              Voltage (V)
            </label>

            <input
              type="number"
              value={voltage}
              onChange={(e) =>
                setVoltage(e.target.value)
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

        </div>

        <button
          onClick={calculate}
          className="mt-8 bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Analyze Via
        </button>

        {results && (
          <>
            {/* RESULTS */}

            <div className="mt-10">

              <h2 className="text-2xl font-bold text-red-700 mb-6">
                Via Analysis Results
              </h2>

              <div className="grid md:grid-cols-4 gap-4">

                {Object.entries(results).map(
                  ([key, value]) => (
                    <div
                      key={key}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-4"
                    >
                      <div className="text-gray-500 text-sm capitalize">
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

            {/* ENGINEERING VERDICT */}

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

            {/* FAQ */}

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

export default ViaCurrent;