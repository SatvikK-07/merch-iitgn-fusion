import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Calendar, Shield } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-heading font-bold gradient-text mb-8">
            My Profile
          </h1>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <User className="h-6 w-6 text-primary" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{user?.user_metadata?.name || 'User'}</h3>
                  <p className="text-muted-foreground">IITGN Community Member</p>
                </div>
              </div>
              
              <div className="grid gap-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/5">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email Address</p>
                    <p className="text-muted-foreground">{user?.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/5">
                  <Calendar className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Member Since</p>
                    <p className="text-muted-foreground">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/5">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Account Status</p>
                    <p className="text-green-600">Verified IITGN Account</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;