import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Shield, Users, Zap } from 'lucide-react';
import logoImage from "@/assets/logo.png";

const Auth = () => {
  const { user, loading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4">
            <img 
              src={logoImage}
              alt="The GN Collective" 
              className="h-16 w-auto"
            />
            <div>
              <h1 className="text-4xl font-heading font-bold gradient-text">
                The GN Collective
              </h1>
              <p className="text-muted-foreground">Official Merchandise Store</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-heading font-bold text-foreground">
              Welcome to Your Exclusive Store
            </h2>
            <p className="text-lg text-muted-foreground">
              Access premium merchandise, exclusive collections, and event gear designed for the IITGN community.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/50 backdrop-blur-sm">
                <Users className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Exclusive Access</h3>
                  <p className="text-sm text-muted-foreground">IITGN community only</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 rounded-lg bg-white/50 backdrop-blur-sm">
                <Zap className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold">Latest Drops</h3>
                  <p className="text-sm text-muted-foreground">First access to new releases</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Card */}
        <div className="flex justify-center">
          <Card className="w-full max-w-md glass-card">
            <CardHeader className="text-center space-y-4">
              <Shield className="h-12 w-12 text-primary mx-auto" />
              <div>
                <CardTitle className="text-2xl font-heading">Secure Access</CardTitle>
                <CardDescription className="mt-2">
                  Sign in with your IITGN Google account to access exclusive merchandise
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-secondary">
                  <Mail className="h-4 w-4" />
                  <span className="font-medium">Authorized Domain</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Only @iitgn.ac.in email addresses are permitted
                </p>
              </div>
              
              <Button 
                onClick={handleGoogleSignIn}
                className="w-full cta-button h-12 text-base font-medium"
                size="lg"
              >
                <img 
                  src="https://developers.google.com/identity/images/g-logo.png" 
                  alt="Google" 
                  className="h-5 w-5 mr-3"
                />
                Continue with Google
              </Button>
              
              <div className="text-center space-y-2">
                <p className="text-xs text-muted-foreground">
                  By signing in, you agree to our terms and privacy policy
                </p>
                <p className="text-xs text-muted-foreground">
                  Secure authentication powered by Supabase
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;