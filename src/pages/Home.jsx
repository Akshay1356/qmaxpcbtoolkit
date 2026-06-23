import CalculatorCard from "../components/CalculatorCard";

function Home() {
  const calculators = [
    {
      title: "Ohm's Law Calculator",
      description: "Voltage, Current, Resistance and Power calculations.",
      path: "/ohms",
    },
    {
      title: "Reactance Calculator",
      description: "Capacitive and inductive reactance calculations.",
      path: "/reactance",
    },
    {
      title: "Wavelength Calculator",
      description: "Calculate wavelength from frequency.",
      path: "/wavelength",
    },
    {
      title: "Microstrip Calculator",
      description: "Controlled impedance microstrip design.",
      path: "/microstrip",
    },
    {
      title: "Stripline Calculator",
      description: "Stripline impedance calculations.",
      path: "/stripline",
    },
    {
      title: "Differential Pair Calculator",
      description: "Differential impedance calculations.",
      path: "/differential-pair",
    },
    {
      title: "Via Current Calculator",
      description: "Estimate via current carrying capability.",
      path: "/via-current",
    },
    {
      title: "PCB Trace Current Calculator",
      description: "Calculate trace width based on current.",
      path: "/trace-current",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white text-gray-900">

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">

          <div className="inline-flex items-center rounded-full bg-red-50 border border-red-200 px-5 py-2 text-red-700 font-medium mb-8">
            Engineering Tools for PCB Designers
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight">
            <span className="text-black">Qmax</span>{" "}
            <span className="text-red-700">PCB Toolkit</span>
          </h1>

          <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Professional PCB Design, Signal Integrity, RF and Manufacturing
            Calculators for Engineers and Hardware Designers.
          </p>

        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">

        <h2 className="text-4xl font-bold mb-10 text-center">
          Engineering Calculators
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {calculators.map((calc) => (
            <CalculatorCard
              key={calc.title}
              title={calc.title}
              description={calc.description}
              link={calc.path}
            />
          ))}

        </div>

      </section>

      <footer className="border-t border-gray-200 py-8 text-center text-gray-500">
        © 2026 Qmax PCB Toolkit
      </footer>

    </div>
  );
}

export default Home;