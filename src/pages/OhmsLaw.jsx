import { useState } from "react";

function OhmsLaw() {
  const faqs = [
    {
      q: "What is Ohm's Law?",
      a: "Ohm's Law defines the relationship between voltage, current and resistance."
    },
    {
      q: "How many values must I enter?",
      a: "Enter exactly two known values and the calculator will solve the remaining variables."
    },
    {
      q: "Can I calculate power?",
      a: "Yes. Power is automatically calculated from the solved circuit."
    },
    {
      q: "What combinations are supported?",
      a: "V+I, V+R, I+R, V+P, I+P and R+P."
    },
    {
      q: "What is a voltage divider?",
      a: "A voltage divider generates a lower voltage using two resistors."
    },
    {
      q: "Why calculate LED resistors?",
      a: "It prevents excessive LED current and improves reliability."
    },
    {
      q: "Why is resistor wattage important?",
      a: "Insufficient wattage can cause overheating and failure."
    },
    {
      q: "Can this be used for PCB design?",
      a: "Yes. It is useful for power rails, LEDs and resistor networks."
    },
    {
      q: "What units are used?",
      a: "Volts, Amps, Ohms and Watts."
    },
    {
      q: "Does it validate inputs?",
      a: "Yes. The calculator requires exactly two known values."
    }
  ];

  const [voltage, setVoltage] = useState("");
  const [current, setCurrent] = useState("");
  const [resistance, setResistance] = useState("");
  const [power, setPower] = useState("");

  const [vin, setVin] = useState("12");
  const [r1, setR1] = useState("1000");
  const [r2, setR2] = useState("1000");

  const [ledVoltage, setLedVoltage] = useState("2");
  const [ledCurrent, setLedCurrent] = useState("0.02");

  const [results, setResults] = useState(null);
  const [verdicts, setVerdicts] = useState([]);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");

    let V = voltage === "" ? null : Number(voltage);
    let I = current === "" ? null : Number(current);
    let R = resistance === "" ? null : Number(resistance);
    let P = power === "" ? null : Number(power);

    const entered =
      [V, I, R, P].filter(
        (value) => value !== null
      ).length;

    if (entered !== 2) {
      setResults(null);

      setError(
        "Enter exactly two known values among Voltage, Current, Resistance and Power."
      );

      return;
    }

    // V + I
    if (V !== null && I !== null) {
      R = V / I;
      P = V * I;
    }

    // V + R
    else if (V !== null && R !== null) {
      I = V / R;
      P = V * I;
    }

    // I + R
    else if (I !== null && R !== null) {
      V = I * R;
      P = V * I;
    }

    // V + P
    else if (V !== null && P !== null) {
      I = P / V;
      R = V / I;
    }

    // I + P
    else if (I !== null && P !== null) {
      V = P / I;
      R = V / I;
    }

    // R + P
    else if (R !== null && P !== null) {
      I = Math.sqrt(P / R);
      V = I * R;
    }

    const resistorHeat =
      I * I * R;

    const recommendedWattage =
      resistorHeat * 2;

    const inputVoltage =
      Number(vin);

    const resistor1 =
      Number(r1);

    const resistor2 =
      Number(r2);

    const dividerOutput =
      inputVoltage *
      (
        resistor2 /
        (
          resistor1 +
          resistor2
        )
      );

    const dividerCurrent =
      inputVoltage /
      (
        resistor1 +
        resistor2
      );

    const ledV =
      Number(ledVoltage);

    const ledI =
      Number(ledCurrent);

    const ledResistor =
      (
        inputVoltage -
        ledV
      ) / ledI;

    const ledPower =
      (
        inputVoltage -
        ledV
      ) * ledI;

    const notes = [];

    if (resistorHeat < 0.25) {
      notes.push(
        "✓ Low resistor heating."
      );
    }

    if (
      resistorHeat >= 0.25 &&
      resistorHeat < 1
    ) {
      notes.push(
        "⚠ Moderate resistor heating."
      );
    }

    if (resistorHeat >= 1) {
      notes.push(
        "⚠ High resistor heating detected."
      );
    }

    if (
      recommendedWattage >
      0.25
    ) {
      notes.push(
        "⚠ Consider a higher wattage resistor."
      );
    }

    if (notes.length === 0) {
      notes.push(
        "✓ Circuit appears healthy."
      );
    }

    setVerdicts(notes);

    setResults({
      voltage: V.toFixed(4),
      current: I.toFixed(4),
      resistance: R.toFixed(4),
      power: P.toFixed(4),

      resistorHeat:
        resistorHeat.toFixed(4),

      recommendedWattage:
        recommendedWattage.toFixed(4),

      dividerOutput:
        dividerOutput.toFixed(4),

      dividerCurrent:
        dividerCurrent.toFixed(6),

      ledResistor:
        ledResistor.toFixed(2),

      ledPower:
        ledPower.toFixed(4)
    });
  };
    return (
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold text-red-700 mb-2">
          Ohms Law Pro X 2.1
        </h1>

        <p className="text-gray-600 mb-8">
          Universal DC Circuit Solver • Enter Exactly Two Values
        </p>

        <div className="grid md:grid-cols-4 gap-5">

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
              placeholder="Known value"
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
              placeholder="Known value"
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
              placeholder="Known value"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Power (W)
            </label>

            <input
              type="number"
              value={power}
              onChange={(e) =>
                setPower(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
              placeholder="Known value"
            />
          </div>

        </div>

        <h2 className="text-2xl font-bold text-red-700 mt-10 mb-4">
          Voltage Divider
        </h2>

        <div className="grid md:grid-cols-3 gap-5">

          <div>
            <label className="block mb-2 font-medium">
              Input Voltage (V)
            </label>

            <input
              type="number"
              value={vin}
              onChange={(e) =>
                setVin(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              R1 (Ω)
            </label>

            <input
              type="number"
              value={r1}
              onChange={(e) =>
                setR1(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              R2 (Ω)
            </label>

            <input
              type="number"
              value={r2}
              onChange={(e) =>
                setR2(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

        </div>

        <h2 className="text-2xl font-bold text-red-700 mt-10 mb-4">
          LED Resistor Calculator
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="block mb-2 font-medium">
              LED Forward Voltage (V)
            </label>

            <input
              type="number"
              value={ledVoltage}
              onChange={(e) =>
                setLedVoltage(e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              LED Current (A)
            </label>

            <input
              type="number"
              value={ledCurrent}
              onChange={(e) =>
                setLedCurrent(e.target.value)
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

        {error && (
          <div className="mt-6 bg-red-50 border border-red-300 text-red-700 rounded-xl p-4">
            {error}
          </div>
        )}

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
          </>
        )}

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

      </div>
    </div>
  );
}

export default OhmsLaw;