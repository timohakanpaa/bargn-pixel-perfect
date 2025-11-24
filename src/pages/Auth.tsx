import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { z } from "zod";

const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must not exceed 128 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character");

const emailSchema = z.string()
  .email("Please enter a valid email address")
  .max(255, "Email must not exceed 255 characters");

// Rate limiting configuration
const MAX_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

interface RateLimitData {
  attempts: number;
  firstAttempt: number;
  blockedUntil?: number;
}

const getRateLimitKey = (action: 'signin' | 'signup') => `auth_ratelimit_${action}`;

const checkRateLimit = (action: 'signin' | 'signup'): { allowed: boolean; waitTime?: number } => {
  const key = getRateLimitKey(action);
  const stored = localStorage.getItem(key);
  const now = Date.now();
  
  if (!stored) {
    const data: RateLimitData = { attempts: 1, firstAttempt: now };
    localStorage.setItem(key, JSON.stringify(data));
    return { allowed: true };
  }
  
  const data: RateLimitData = JSON.parse(stored);
  
  // Check if currently blocked
  if (data.blockedUntil && now < data.blockedUntil) {
    const waitTime = Math.ceil((data.blockedUntil - now) / 1000);
    return { allowed: false, waitTime };
  }
  
  // Reset if window expired
  if (now - data.firstAttempt > RATE_LIMIT_WINDOW) {
    const newData: RateLimitData = { attempts: 1, firstAttempt: now };
    localStorage.setItem(key, JSON.stringify(newData));
    return { allowed: true };
  }
  
  // Increment attempts
  data.attempts += 1;
  
  if (data.attempts > MAX_ATTEMPTS) {
    data.blockedUntil = now + RATE_LIMIT_WINDOW;
    localStorage.setItem(key, JSON.stringify(data));
    const waitTime = Math.ceil(RATE_LIMIT_WINDOW / 1000);
    return { allowed: false, waitTime };
  }
  
  localStorage.setItem(key, JSON.stringify(data));
  return { allowed: true };
};

const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const rateCheck = checkRateLimit('signup');
    if (!rateCheck.allowed) {
      toast.error(`Too many signup attempts. Please try again in ${rateCheck.waitTime} seconds.`);
      return;
    }
    
    // Sanitize and validate inputs
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
    
    if (!sanitizedEmail || !sanitizedPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    // Validate email and password
    try {
      emailSchema.parse(sanitizedEmail);
      passwordSchema.parse(sanitizedPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
        return;
      }
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: sanitizedEmail,
      password: sanitizedPassword,
      options: {
        emailRedirectTo: `${window.location.origin}/`
      }
    });

    setLoading(false);

    if (error) {
      // Generic error message to avoid leaking information
      if (import.meta.env.DEV) {
        console.error("Signup error:", error);
      }
      toast.error("Unable to create account. Please try a different email or contact support.");
    } else {
      toast.success("Account created successfully! Please sign in.");
      setEmail("");
      setPassword("");
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const rateCheck = checkRateLimit('signin');
    if (!rateCheck.allowed) {
      toast.error(`Too many login attempts. Please try again in ${rateCheck.waitTime} seconds.`);
      return;
    }
    
    // Sanitize and validate inputs
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);
    
    if (!sanitizedEmail || !sanitizedPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    // Validate email format
    try {
      emailSchema.parse(sanitizedEmail);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.issues[0].message);
        return;
      }
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: sanitizedEmail,
      password: sanitizedPassword,
    });

    setLoading(false);

    if (error) {
      // Generic error message to avoid leaking information
      if (import.meta.env.DEV) {
        console.error("Signin error:", error);
      }
      toast.error("Invalid credentials. Please check your email and password.");
    } else {
      toast.success("Signed in successfully!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome to Bargn Admin</CardTitle>
            <CardDescription>Sign in to access analytics dashboards</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="admin@bargn.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      minLength={8}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="admin@bargn.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      minLength={8}
                    />
                    <p className="text-xs text-muted-foreground">
                      Must be 8+ characters with uppercase, lowercase, number, and special character
                    </p>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;