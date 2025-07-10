import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Eye, Mail, Phone, Star } from "lucide-react";

export const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock user data - in real app this would come from backend
  const users = [
    {
      id: "user-1",
      name: "John Doe",
      email: "john.doe@iitgn.ac.in",
      phone: "+91 9876543210",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      joinDate: "2024-01-15",
      totalOrders: 5,
      totalSpent: 4247,
      averageRating: 4.2,
      status: "Active",
      lastOrder: "2024-07-08",
      recentPurchases: [
        { product: "IITGN Official T-Shirt", amount: 899, date: "2024-07-08", rating: 5 },
        { product: "Amalthea Hoodie", amount: 1299, date: "2024-06-22", rating: 4 },
        { product: "Blithchron Mug", amount: 399, date: "2024-06-15", rating: 4 },
      ]
    },
    {
      id: "user-2", 
      name: "Jane Smith",
      email: "jane.smith@iitgn.ac.in",
      phone: "+91 9876543211",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c0?w=64&h=64&fit=crop&crop=face",
      joinDate: "2024-02-03",
      totalOrders: 8,
      totalSpent: 6890,
      averageRating: 4.6,
      status: "Active",
      lastOrder: "2024-07-09",
      recentPurchases: [
        { product: "TEDx Varsity Jacket", amount: 2499, date: "2024-07-09", rating: 5 },
        { product: "Hallabol T-Shirt", amount: 799, date: "2024-07-01", rating: 4 },
        { product: "IITGN Official Hoodie", amount: 1599, date: "2024-06-28", rating: 5 },
      ]
    },
    {
      id: "user-3",
      name: "Mike Johnson", 
      email: "mike.johnson@iitgn.ac.in",
      phone: "+91 9876543212",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      joinDate: "2024-03-12",
      totalOrders: 3,
      totalSpent: 2147,
      averageRating: 3.8,
      status: "Active",
      lastOrder: "2024-07-05",
      recentPurchases: [
        { product: "Blithchron Mug", amount: 399, date: "2024-07-05", rating: 4 },
        { product: "IITGN Official T-Shirt", amount: 899, date: "2024-06-20", rating: 3 },
        { product: "Amalthea Sticker Pack", amount: 199, date: "2024-06-12", rating: 4 },
      ]
    },
    {
      id: "user-4",
      name: "Sarah Wilson",
      email: "sarah.wilson@iitgn.ac.in", 
      phone: "+91 9876543213",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      joinDate: "2024-01-28",
      totalOrders: 12,
      totalSpent: 8934,
      averageRating: 4.8,
      status: "VIP",
      lastOrder: "2024-07-10",
      recentPurchases: [
        { product: "TEDx Varsity Jacket", amount: 2499, date: "2024-07-10", rating: 5 },
        { product: "Amalthea Hoodie", amount: 1299, date: "2024-07-03", rating: 5 },
        { product: "IITGN Official Mug", amount: 449, date: "2024-06-25", rating: 4 },
      ]
    },
    {
      id: "user-5",
      name: "David Brown",
      email: "david.brown@iitgn.ac.in",
      phone: "+91 9876543214", 
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
      joinDate: "2024-04-05",
      totalOrders: 2,
      totalSpent: 1198,
      averageRating: 4.0,
      status: "Active",
      lastOrder: "2024-07-02",
      recentPurchases: [
        { product: "Hallabol T-Shirt", amount: 799, date: "2024-07-02", rating: 4 },
        { product: "Blithchron Keychain", amount: 149, date: "2024-06-18", rating: 4 },
      ]
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "VIP":
        return "default" as const;
      case "Active":
        return "secondary" as const;
      default:
        return "outline" as const;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>User Management</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Avg Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3" />
                          {user.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>
                      <div>
                        <span className="font-medium">{user.totalOrders}</span>
                        <p className="text-xs text-muted-foreground">
                          Last: {user.lastOrder}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">₹{user.totalSpent.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{user.averageRating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {users.filter(u => u.status === "Active").length}
            </div>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {users.filter(u => u.status === "VIP").length}
            </div>
            <p className="text-sm text-muted-foreground">VIP Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              ₹{Math.round(users.reduce((sum, u) => sum + u.totalSpent, 0) / users.length).toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Avg Spend</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent User Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.slice(0, 3).map((user) => (
              <div key={user.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusVariant(user.status)}>
                    {user.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {user.recentPurchases.slice(0, 3).map((purchase, index) => (
                    <div key={index} className="bg-muted/50 rounded-lg p-3">
                      <p className="font-medium text-sm">{purchase.product}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-semibold">₹{purchase.amount}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{purchase.rating}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{purchase.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};