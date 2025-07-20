import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { clubs, categories, allSizes, allColors, Product } from "@/types/product";
import { useProductsStore } from "@/stores/productsStore";
import { Upload, X, Plus } from "lucide-react";

interface AddProductProps {
  editingProduct?: Product;
  onClose?: () => void;
}

export const AddProduct = ({ editingProduct, onClose }: AddProductProps) => {
  const { toast } = useToast();
  const addProduct = useProductsStore((state) => state.addProduct);
  const updateProduct = useProductsStore((state) => state.updateProduct);
  const isEditMode = !!editingProduct;
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    club: "",
    category: "",
    description: "",
    stock: "",
    material: "",
    care: "",
    features: "",
    images: [] as string[]
  });
  
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const addImage = () => {
    if (newImageUrl.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()]
      }));
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.price || !formData.club || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (selectedSizes.length === 0) {
      toast({
        title: "Error", 
        description: "Please select at least one size",
        variant: "destructive"
      });
      return;
    }

    if (selectedColors.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one color", 
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would make an API call to add the product
    const newProduct: Product = {
      id: `product-${Date.now()}`,
      name: formData.name,
      price: parseInt(formData.price),
      originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : undefined,
      image: formData.images[0] || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
      images: formData.images.length > 0 ? formData.images : undefined,
      club: formData.club,
      category: formData.category,
      type: "Apparel",
      description: formData.description,
      rating: 0, // Will be updated by user reviews
      reviews: 0,
      sizes: selectedSizes,
      colors: selectedColors,
      isNew: true,
      inStock: parseInt(formData.stock) > 0,
      stock: parseInt(formData.stock) || 0,
      features: formData.features ? formData.features.split(',').map(f => f.trim()) : undefined,
      material: formData.material || undefined,
      care: formData.care ? formData.care.split(',').map(c => c.trim()) : undefined,
    };

    addProduct(newProduct);
    
    toast({
      title: "Success!",
      description: "Product has been added successfully and will appear in the shop",
    });

    // Reset form
    setFormData({
      name: "",
      price: "",
      originalPrice: "",
      club: "",
      category: "",
      description: "",
      stock: "",
      material: "",
      care: "",
      features: "",
      images: []
    });
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  const content = (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{isEditMode ? 'Edit Product' : 'Add New Product'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="999"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                    <Input
                      id="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                      placeholder="1299"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="club">Club *</Label>
                    <Select value={formData.club} onValueChange={(value) => handleInputChange("club", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select club" />
                      </SelectTrigger>
                      <SelectContent>
                        {clubs.filter(club => club !== "All").map((club) => (
                          <SelectItem key={club} value={club}>{club}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.filter(cat => cat !== "All").map((category) => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => handleInputChange("stock", e.target.value)}
                    placeholder="50"
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Enter product description"
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="material">Material</Label>
                  <Input
                    id="material"
                    value={formData.material}
                    onChange={(e) => handleInputChange("material", e.target.value)}
                    placeholder="100% Cotton"
                  />
                </div>

                <div>
                  <Label htmlFor="features">Features (comma separated)</Label>
                  <Input
                    id="features"
                    value={formData.features}
                    onChange={(e) => handleInputChange("features", e.target.value)}
                    placeholder="Comfortable, Durable, Breathable"
                  />
                </div>

                <div>
                  <Label htmlFor="care">Care Instructions (comma separated)</Label>
                  <Input
                    id="care"
                    value={formData.care}
                    onChange={(e) => handleInputChange("care", e.target.value)}
                    placeholder="Machine wash cold, Tumble dry low"
                  />
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <Label>Product Images</Label>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Enter image URL"
                    className="flex-1"
                  />
                  <Button type="button" onClick={addImage}>
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
                
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.images.map((url, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={url}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <Label>Available Sizes *</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {allSizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox
                      id={`size-${size}`}
                      checked={selectedSizes.includes(size)}
                      onCheckedChange={() => handleSizeToggle(size)}
                    />
                    <Label htmlFor={`size-${size}`} className="text-sm">
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
              {selectedSizes.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedSizes.map((size) => (
                    <Badge key={size} variant="secondary">
                      {size}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Colors */}
            <div>
              <Label>Available Colors *</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {allColors.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color}`}
                      checked={selectedColors.includes(color)}
                      onCheckedChange={() => handleColorToggle(color)}
                    />
                    <Label htmlFor={`color-${color}`} className="text-sm">
                      {color}
                    </Label>
                  </div>
                ))}
              </div>
              {selectedColors.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedColors.map((color) => (
                    <Badge key={color} variant="secondary">
                      {color}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  if (isEditMode) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return content;
};