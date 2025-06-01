import React, { useState, ChangeEvent, CSSProperties, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export default function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturate: 100,
    hueRotate: 0,
    blur: 0,
    sepia: 0,
  });
  useEffect(() => {
    document.title = 'OSiRuO Editor';
  }, []);
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      event.target.value = ""; // Clear the input to allow re-uploading the same file
    }
  };

  const handleFilterChange = (filterName: keyof typeof filters, value: number) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      brightness: 100,
      contrast: 100,
      saturate: 100,
      hueRotate: 0,
      blur: 0,
      sepia: 0,
    });
  };

  const imageStyle: CSSProperties = {
    filter: `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturate}%) hue-rotate(${filters.hueRotate}deg) blur(${filters.blur}px) sepia(${filters.sepia}%)`,
    transition: "filter 0.1s ease-in-out",
    objectFit: "contain", // Ensures the image isn't stretched/cropped by filters that might affect dimensions
  };


  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <header className="w-full py-6">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-4xl font-bold text-gray-800">OSiRuO-Editor</h1>
        </div>
      </header>

      <main className="container mx-auto flex flex-col items-center justify-center flex-grow px-4 py-8">
        <Card className="w-full max-w-2xl shadow-xl rounded-lg overflow-hidden">
          <CardHeader className="bg-gray-100 border-b">
            <CardTitle className="text-2xl font-semibold text-gray-700 text-center">
              Upload Your Image
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <label
                htmlFor="imageUpload"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <Input
                  id="imageUpload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
              {fileName && <p className="text-sm text-gray-600">Selected file: {fileName}</p>}
            </div>

            {uploadedImage && (
              <div className="mt-8 flex flex-col items-center space-y-4">
                <h2 className="text-xl font-semibold text-gray-700">Image Preview</h2>
                <div className="w-full max-w-md p-2 border border-gray-200 rounded-lg shadow-sm bg-white overflow-hidden">
                  <img
                    src={uploadedImage}
                    alt="Uploaded preview"
                    className="max-w-full h-auto rounded-md"
                    style={{ ...imageStyle, maxHeight: "400px" }}
                  />
                </div>
              </div>
            )}

            {!uploadedImage && (
              <div className="mt-8 text-center text-gray-500">
                <p>Your uploaded image will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {uploadedImage && (
          <Card className="mt-6 w-full max-w-2xl shadow-xl rounded-lg overflow-hidden">
            <CardHeader className="bg-gray-100 border-b">
              <CardTitle className="text-xl font-semibold text-gray-700">Adjust Filters</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="brightness" className="text-sm font-medium text-gray-700">Brightness ({filters.brightness}%)</Label>
                  <Slider
                    id="brightness"
                    min={0}
                    max={200}
                    step={1}
                    value={[filters.brightness]}
                    onValueChange={([value]) => handleFilterChange("brightness", value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="contrast" className="text-sm font-medium text-gray-700">Contrast ({filters.contrast}%)</Label>
                  <Slider
                    id="contrast"
                    min={0}
                    max={200}
                    step={1}
                    value={[filters.contrast]}
                    onValueChange={([value]) => handleFilterChange("contrast", value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="saturate" className="text-sm font-medium text-gray-700">Saturation ({filters.saturate}%)</Label>
                  <Slider
                    id="saturate"
                    min={0}
                    max={200}
                    step={1}
                    value={[filters.saturate]}
                    onValueChange={([value]) => handleFilterChange("saturate", value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="hueRotate" className="text-sm font-medium text-gray-700">Hue Rotate ({filters.hueRotate}°)</Label>
                  <Slider
                    id="hueRotate"
                    min={0}
                    max={360}
                    step={1}
                    value={[filters.hueRotate]}
                    onValueChange={([value]) => handleFilterChange("hueRotate", value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="blur" className="text-sm font-medium text-gray-700">Blur ({filters.blur}px)</Label>
                  <Slider
                    id="blur"
                    min={0}
                    max={10}
                    step={0.1}
                    value={[filters.blur]}
                    onValueChange={([value]) => handleFilterChange("blur", value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="sepia" className="text-sm font-medium text-gray-700">Sepia ({filters.sepia}%)</Label>
                  <Slider
                    id="sepia"
                    min={0}
                    max={100}
                    step={1}
                    value={[filters.sepia]}
                    onValueChange={([value]) => handleFilterChange("sepia", value)}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={resetFilters} variant="outline" className="rounded-md">
                  Reset Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {uploadedImage && (
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-md shadow-sm w-full max-w-2xl text-center">
            <p className="text-sm text-blue-700">
              To save your filtered image, please use your device&apos;s screenshot functionality.
              <br />
              Common shortcuts: <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Windows Key + Shift + S</kbd> (Windows) or <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Cmd + Shift + 4</kbd> (Mac).
            </p>
          </div>
        )}
      </main>

      <footer className="w-full py-4 mt-auto">
        <div className="container mx-auto text-center text-sm text-gray-500 px-4">
          &copy; {new Date().getFullYear()} OSiRuO-Editor. All rights reserved. | Made by Damir, Mugdin, Azam and Muhamed
        </div>
      </footer>
    </div>
  );
}
