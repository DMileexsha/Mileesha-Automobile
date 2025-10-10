import React, { useState, useContext } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Input } from "./UI/input";
import { Button } from "./UI/button";
import { Separator } from "./UI/Separator";
import { Card, CardContent, CardHeader, CardTitle } from "./UI/card";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Car,
  CheckCircle,
} from "lucide-react";
import { auth, googleProvider, facebookProvider } from "../Firebase"; // <-- top-level import
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";


export default function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Normal sign-in
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    const mockUser = { firstName: "User", email: signInData.email };
    login(mockUser);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSignInData({ email: "", password: "" });
    }, 3000);
  };

  // Normal sign-up
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    const mockUser = { firstName: signUpData.firstName, email: signUpData.email };
    login(mockUser);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSignUpData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    }, 3000);
  };

  const handleSignInChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  // Google login
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      login({ firstName: user.displayName, email: user.email });
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  // Facebook login
  const handleFacebookSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      login({ firstName: user.displayName, email: user.email });
    } catch (error) {
      console.error("Facebook sign-in error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="pt-20 pb-12">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          {isSubmitted ? (
            <Card className="text-center">
              <CardContent className="p-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                  {isSignUp ? "Account Created!" : "Welcome Back!"}
                </h2>
                <p className="text-gray-600 mb-4">
                  {isSignUp
                    ? "Your account has been created. You can now sign in and use our services."
                    : "You have successfully signed in. Redirecting..."}
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-xl">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    Mileesha Automobile
                  </span>
                </div>
                <CardTitle className="text-2xl">
                  {isSignUp ? "Create Your Account" : "Welcome Back"}
                </CardTitle>
                <p className="text-gray-600">
                  {isSignUp
                    ? "Sign up to access vehicle services & maintenance"
                    : "Sign in to your account to continue"}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Toggle Buttons */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setIsSignUp(false)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      !isSignUp
                        ? "bg-white text-red-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => setIsSignUp(true)}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                      isSignUp
                        ? "bg-white text-red-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Sign In Form */}
                {!isSignUp && (
                  <form onSubmit={handleSignInSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          name="email"
                          type="email"
                          value={signInData.email}
                          onChange={handleSignInChange}
                          required
                          className="pl-10"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={signInData.password}
                          onChange={handleSignInChange}
                          required
                          className="pl-10 pr-10"
                          placeholder="Enter password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                      Sign In
                    </Button>
                  </form>
                )}

                {/* Sign Up Form */}
                {isSignUp && (
                  <form onSubmit={handleSignUpSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        name="firstName"
                        placeholder="First Name"
                        value={signUpData.firstName}
                        onChange={handleSignUpChange}
                        required
                      />
                      <Input
                        name="lastName"
                        placeholder="Last Name"
                        value={signUpData.lastName}
                        onChange={handleSignUpChange}
                        required
                      />
                    </div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={signUpData.email}
                      onChange={handleSignUpChange}
                      required
                    />
                    <Input
                      name="phone"
                      placeholder="Phone Number"
                      value={signUpData.phone}
                      onChange={handleSignUpChange}
                      required
                    />
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={signUpData.password}
                      onChange={handleSignUpChange}
                      required
                    />
                    <Input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={signUpData.confirmPassword}
                      onChange={handleSignUpChange}
                      required
                    />
                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                      Create Account
                    </Button>
                  </form>
                )}

                {/* Social Login */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleGoogleSignIn}
                    className="flex items-center justify-center gap-2 w-full border border-gray-300 bg-white text-gray-700 py-2 rounded transition"
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium">Google</span>
                  </button>

                  <button
                    onClick={handleFacebookSignIn}
                    className="flex items-center justify-center gap-2 w-full border border-gray-300 bg-white text-gray-700 py-2 rounded transition"
                  >
                    <img
                      src="https://www.svgrepo.com/show/452196/facebook-1.svg"
                      alt="Facebook"
                      className="w-5 h-5"
                    />
                    <span className="text-sm font-medium">Facebook</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
