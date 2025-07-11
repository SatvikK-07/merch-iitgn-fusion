import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/stores/cartStore";
import { useProductsStore } from "@/stores/productsStore";
import { 
  Package, 
  Users, 
  ShoppingCart, 
  TrendingUp,
  Star,
  DollarSign
} from "lucide-react";

export const AdminDashboard = () => {
  const products = useProductsStore((state) => state.products);
  const cartItems = useCartStore((state) => state.items);
  
  // Mock data - in real app this would come from backend
  const stats = {
    totalProducts: products.length,
    totalUsers: 156,
    totalSales: 2847,
    totalRevenue: 45620,
    averageRating: 4.2,
    totalOrders: 234
  };

  const recentSales = [
    { id: 1, product: "IITGN Official T-Shirt", amount: 899, user: "John Doe", date: "2024-07-10" },
    { id: 2, product: "Amalthea Hoodie", amount: 1299, user: "Jane Smith", date: "2024-07-10" },
    { id: 3, product: "Blithchron Mug", amount: 399, user: "Mike Johnson", date: "2024-07-09" },
    { id: 4, product: "TEDx Varsity Jacket", amount: 2499, user: "Sarah Wilson", date: "2024-07-09" },
    { id: 5, product: "Hallabol T-Shirt", amount: 799, user: "David Brown", date: "2024-07-08" },
  ];

  const topProducts = [
    { name: "IITGN Official T-Shirt", sales: 234, revenue: 210466 },
    { name: "Amalthea Hoodie", sales: 187, revenue: 242813 },
    { name: "Blithchron Mug", sales: 156, revenue: 62244 },
    { name: "TEDx Varsity Jacket", sales: 89, revenue: 222411 },
    { name: "Hallabol T-Shirt", sales: 123, revenue: 98277 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">Active products in store</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter(p => p.stock > 0).length}</div>
            <p className="text-xs text-muted-foreground">Products available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.filter(p => p.stock < 10 && p.stock > 0).length}</div>
            <p className="text-xs text-orange-600">Need restocking</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Revenue tracking, user management, and sales analytics will be available once customers start making purchases.
            </p>
            <p className="text-sm text-muted-foreground">
              Add products and start building your store inventory!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};