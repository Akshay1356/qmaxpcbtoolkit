import { useState } from "react";

function Wavelength() {

  const faqs = [
    {
      q: "What is wavelength?",
      a: "Wavelength is the physical distance a wave travels during one complete cycle."
    },
    {
      q: "What is guided wavelength?",
      a: "Guided wavelength is the wavelength inside a dielectric material such as FR4."
    },
    {
      q: "Why is wavelength shorter in FR4?",
      a: "Electromagnetic waves travel slower in FR4 than in air, reducing wavelength."
    },
    {
      q: "What is quarter-wave length?",
      a: "Quarter-wave structures are commonly used in RF matching networks and antennas."
    },
    {
      q: "What is electrical length?",
      a: "Electrical length describes a conductor length relative to signal wavelength."
    },
    {
      q: "Why is propagation delay important?",
      a: "Propagation delay affects timing, signal integrity and high-speed PCB performance."
    },
    {
      q: "What is velocity factor?",
      a: "Velocity factor is the ratio of signal speed in a medium compared to vacuum."
    },
    {
      q: "When does trace length become critical?",
      a: "Trace length becomes important when it approaches a significant fraction of wavelength."
    },
    {
      q: "What is phase shift?",
      a: "Phase shift represents how much of a signal cycle is delayed by propagation."
    },
    {
      q: "How is wavelength used in PCB design?",
      a: "Wavelength is used in RF routing, antennas, impedance control and timing analysis."
    }
  ];

  const [frequency, setFrequency] = useState("1000000000");
  const [er, setEr] = useState("4.3");
  const [physicalLength, setPhysicalLength] = useState("100");
  const [results, setResults] = useState(null);
  const [verdicts, setVerdicts] = useState([]);

  const calculate = () => {

    const F = Number(frequency);
    const Er = Number(er);
    const L = Number(physicalLength);

    if (
      !F ||
      !Er ||
      !L
    ) return;

    const c =
      299792458;

    const freeSpaceLambda =
      c / F;

    const velocityFactor =
      1 /
      Math.sqrt(
        Er
      );

    const guidedVelocity =
      c *
      velocityFactor;

    const guidedLambda =
      guidedVelocity /
      F;

    const quarterWave =
      guidedLambda / 4;

    const halfWave =
      guidedLambda / 2;

    const delayPerMeter =
      1 /
      guidedVelocity;

    const propagationDelay =
      delayPerMeter *
      (L / 1000);

    const electricalLength =
      (
        (L / 1000) /
        guidedLambda
      ) * 360;

    const phaseShift =
      electricalLength;

    const degreesPerMM =
      360 /
      (
        guidedLambda *
        1000
      );

    const degreesPerInch =
      degreesPerMM *
      25.4;

    const signalFlightTime =
      propagationDelay *
      1e9;

    const notes = [];

    if (
      electricalLength < 45
    )
      notes.push(
        "✓ Trace is electrically short."
      );

    if (
      electricalLength >= 45 &&
      electricalLength < 180
    )
      notes.push(
        "⚠ Transmission line effects may be important."
      );

    if (
      electricalLength >= 180
    )
      notes.push(
        "⚠ Strong transmission line behavior expected."
      );

    if (
      signalFlightTime > 1
    )
      notes.push(
        "⚠ Propagation delay may impact timing."
      );

    if (
      notes.length === 0
    )
      notes.push(
        "✓ Design appears suitable."
      );

    setVerdicts(notes);

    setResults({

      freeSpaceWavelength:
        freeSpaceLambda.toFixed(4),

      guidedWavelength:
        guidedLambda.toFixed(4),

      quarterWave:
        quarterWave.toFixed(4),

      halfWave:
        halfWave.toFixed(4),

      velocityFactor:
        velocityFactor.toFixed(4),

      propagationVelocity:
        guidedVelocity.toExponential(3),

      propagationDelayNS:
        signalFlightTime.toFixed(3),

      electricalLengthDeg:
        electricalLength.toFixed(2),

      phaseShiftDeg:
        phaseShift.toFixed(2),

      degreesPerMM:
        degreesPerMM.toFixed(3),

      degreesPerInch:
        degreesPerInch.toFixed(2)

    });

  };
    return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-red-700 mb-2">
          Wavelength Pro X
        </h1>

        <p className="text-gray-600 mb-8">
          Advanced RF Wavelength, Electrical Length and Propagation Delay Analysis
        </p>

        <div className="grid md:grid-cols-3 gap-5">

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
              Physical Length (mm)
            </label>

            <input
              type="number"
              value={physicalLength}
              onChange={(e) =>
                setPhysicalLength(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

        </div>

        <button
          onClick={calculate}
          className="mt-8 bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-lg font-semibold"
        >
          Analyze RF Length
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

export default Wavelength;