import React, { useState } from "react";
import type { ImageUploadProps } from "../interface/ImageUploadProps";

const ImageUpload: React.FC<ImageUploadProps> = ({ onSubmit }) => {
  const [image, setImage] = useState<File | null>(null);
  const [invert, setInvert] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(null);

  // ✅ Verificar dimensiones antes de aceptar la imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target?.result as string;
    };

    img.onload = () => {
      const width = img.width;
      const height = img.height;
      setDimensions({ width, height });

      if (width !== 28 || height !== 28) {
        setError(`❌ La imagen debe tener exactamente 28x28 píxeles. (Actual: ${width}x${height})`);
        setImage(null);
        setPreview(null);
      } else {
        setError(null);
        setImage(file);
        setPreview(URL.createObjectURL(file));
      }
    };

    reader.readAsDataURL(file);
  };

  // ✅ Solo enviar si cumple con los requisitos
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setError("Por favor selecciona una imagen válida de 28x28 antes de enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("invert", invert.toString());
    formData.append("image", image);

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 sm:gap-6 text-sm sm:text-base"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border border-gray-300 p-2 sm:p-3 rounded-lg w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {dimensions && (
        <p className="text-gray-600 text-center text-xs">
          Dimensiones detectadas: {dimensions.width}x{dimensions.height}px
        </p>
      )}

      <label className="flex items-center gap-2 text-gray-700">
        <input
          type="checkbox"
          checked={invert}
          onChange={(e) => setInvert(e.target.checked)}
          className="h-4 w-4 accent-blue-500"
        />
        Invertir colores (blanco sobre negro)
      </label>

      {preview && (
        <div className="flex justify-center">
          <img
            src={preview}
            alt="Vista previa"
            className="w-28 h-28 sm:w-32 sm:h-32 border rounded-lg object-contain shadow-sm"
          />
        </div>
      )}

      {error && (
        <p className="text-red-500 text-center text-sm sm:text-base">{error}</p>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={!image || !!error}
      >
        Enviar imagen
      </button>
    </form>
  );
};

export default ImageUpload;
