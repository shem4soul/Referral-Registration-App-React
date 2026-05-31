'use client';

import { useState } from "react";
// import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { trpc } from "@/lib/trpc";
import { Upload, X, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useLocation } from "wouter";
import { TbLoader3 } from "react-icons/tb";

type StepType = "images" | "details" | "success";

export default function CreateProduct() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<StepType>("images");
  const [images, setImages] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Declutter");
  const [price, setPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(true);

//   const createProductMutation = trpc.products.create.useMutation({
//     onSuccess: () => {
//       setCurrentStep("success");
//     },
//   });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const target = event.target as FileReader;
          if (target && target.result) {
            setImages((prev) => [...prev, target.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    if (currentStep === "images" && images.length > 0) {
      setCurrentStep("details");
    } else if (currentStep === "details" && name && category && price) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
    //   await createProductMutation.mutateAsync({
    //     name,
    //     description,
    //     category,
    //     price,
    //     images,
    //   });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = ["Declutter", "Rent", "Property", "Market"];

  return (
    <div className="min-h-screen rounded-lg bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {currentStep === "images" && (
          <ImagesStep
            images={images}
            onImageUpload={handleImageUpload}
            onRemoveImage={removeImage}
            onContinue={handleContinue}
            onBack={() => router.back()}
          />
        )}

        {currentStep === "details" && (
          <DetailsStep
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            category={category}
            setCategory={setCategory}
            price={price}
            setPrice={setPrice}
            categories={categories}
            onContinue={handleContinue}
            onBack={() => setCurrentStep("images")}
            isSubmitting={isSubmitting}
            // isLoading={createProductMutation.isPending}
          />
        )}

        {currentStep === "success" && (
          <SuccessStep onBackToMarketplace={() => router.push("/markets")} />
        )}
      </div>
    </div>
  );
}

function ImagesStep({
  images,
  onImageUpload,
  onRemoveImage,
  onContinue,
  onBack,
}: {
  images: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <button
        onClick={onBack}
        className="text-slate-600 hover:text-slate-900 flex items-center gap-2 mb-8 transition-colors"
      >
        <span>←</span>
        <span>Back</span>
      </button>

      <Card className="shadow-lg rounded-lg border-0">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Add new product</h1>
          <p className="text-slate-600 mb-8">Upload images of your product</p>

          {images.length > 0 && (
            <div className="mb-8">
              <p className="text-sm font-semibold text-slate-900 mb-4">Selected images ({images.length})</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-slate-200"
                    />
                    <button
                      onClick={() => onRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-colors group">
            <Upload size={32} className="text-slate-500 group-hover:text-blue-500 mb-2" />
            <span className="text-slate-600 group-hover:text-blue-600 font-medium">Upload images of your product</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
            />
          </label>

          <Button
            onClick={onContinue}
            disabled={images.length === 0}
            className="w-full mt-8 py-5 text-lg font-bold rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Continue
          </Button>
        </div>
      </Card>
    </div>
  );
}

function DetailsStep({
  name,
  setName,
  description,
  setDescription,
  category,
  setCategory,
  price,
  setPrice,
  categories,
  onContinue,
  onBack,
  isSubmitting,
  isLoading,
}: {
  name: string;
  setName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  price: string;
  setPrice: (value: string) => void;
  categories: string[];
  onContinue: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
  isLoading?: boolean;
}) {
  return (
    <div className="rounded-lg">
      <button
        onClick={onBack}
        className="text-slate-600 hover:text-slate-900 flex items-center gap-2 mb-8 transition-colors"
      >
        <span>←</span>
        <span>Back</span>
      </button>

      <Card className="shadow-lg border-0">
        <div className="p-6 md:p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Provide product details</h1>
          <p className="text-slate-600 mb-8">Fill in the information about your product</p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Product name</label>
              <Input
                type="text"
                placeholder="Mercedes Benz"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-slate-200 h-12 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Product category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Product description</label>
              <Textarea
                placeholder="..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-24 border-slate-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Amount</label>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-slate-900">₦</span>
                <Input
                  type="text"
                  placeholder="200,000"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="ml-2 h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Location</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
              >
                {['Lekki', 'Victoria Island', 'Gbagada', 'Ajah'].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <Button
              onClick={onContinue}
              disabled={!name || !category || !price || isSubmitting || isLoading}
              className="w-full py-3 text-lg font-bold rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting || isLoading ? <div className="text flex items-center gap-3"><TbLoader3 size={20} className="animate-spin" /> Creating...</div>  : "Create product"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function SuccessStep({ onBackToMarketplace }: { onBackToMarketplace: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="shadow-lg border-0 p-8 md:p-12 text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <CheckCircle size={48} className="text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Product posted</h1>
        <p className="text-slate-600 mb-8">Your product will appear in the marketplace after a successful review</p>

        <Button
          onClick={onBackToMarketplace}
          className="w-full py-3 text-lg font-bold rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg transition-all"
        >
          Back to marketplace
        </Button>
      </Card>
    </div>
  );
}

