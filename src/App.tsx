import { useState } from "react";
import HeroSection from "./components/HeroSection";
import ImageUpload from "./components/ImageUpload";
import type { ImageRecognitionResponse } from "./interface/ImageRecognitionResponse";

function App() {
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [result, setResult] = useState<ImageRecognitionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (formData: FormData) => {
    setResult(null);
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        "http://ec2-54-81-142-28.compute-1.amazonaws.com:8080/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

      const data: ImageRecognitionResponse = await response.json();
      console.log(data.accuracy)
      console.log(data.prediction)
      console.log(data.process_time)
      setResult({
        process_time: data.process_time,
        prediction: data.prediction,
        accuracy: data.accuracy,
      });

    } catch (err) {
      console.error(err);
      setError("No se pudo conectar con la API o la respuesta fue inválida.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {!showAnalyzer ? (
        <HeroSection onStart={() => setShowAnalyzer(true)} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 min-h-screen flex flex-col">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 sm:p-10 ">
            <button
              onClick={() => setShowAnalyzer(false)}
              className="text-blue-600 text-sm font-medium hover:underline mb-4"
            >
              ← Volver al inicio
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 text-center mb-6">
              Analizador de Imagen
            </h2>

            <ImageUpload onSubmit={handleFormSubmit} />

            {loading && (
              <p className="mt-4 text-gray-500 text-sm text-center animate-pulse">
                Enviando imagen, por favor espera...
              </p>
            )}

            {error && (
              <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-red-100 border border-red-300 text-red-700 rounded-xl text-center text-sm sm:text-base">
                ❌ {error}
              </div>
            )}

            {result && (
              <div className="mt-6 sm:mt-8 p-6 bg-green-50 border border-green-300 text-green-800 rounded-xl shadow-sm text-center">
                <h3 className="text-xl font-bold mb-3">
                  ✅ Resultado de la Predicción
                </h3>

                <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm sm:text-base">
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-green-200">
                    <span className="font-semibold">Predicción:</span>{" "}
                    {result.prediction}
                  </div>
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-green-200">
                    <span className="font-semibold">Precisión:</span>{" "}
                    {result.accuracy.toFixed(2)}%
                  </div>
                  <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-green-200">
                    <span className="font-semibold">Tiempo:</span>{" "}
                    {result.process_time} s
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
