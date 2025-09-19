import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-20 bg-black border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <p className="text-gray-400 leading-relaxed text-lg">
              The premium expense splitting platform that combines luxury design with powerful functionality.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all duration-300">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-6">
            <h3 className="font-luxury text-xl font-semibold text-white">Product</h3>
            <ul className="space-y-4">
            <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-all duration-300 text-lg hover:translate-x-1 inline-block">Features</a></li>
            <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-all duration-300 text-lg hover:translate-x-1 inline-block">About</a></li>
            <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-all duration-300 text-lg hover:translate-x-1 inline-block">Contact</a></li>
          </ul>
          </div>

          {/* Company */}
          <div className="space-y-6">
            <h3 className="font-luxury text-xl font-semibold text-white">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-all duration-300 text-lg hover:translate-x-1 inline-block">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-all duration-300 text-lg hover:translate-x-1 inline-block">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-all duration-300 text-lg hover:translate-x-1 inline-block">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-all duration-300 text-lg hover:translate-x-1 inline-block">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h3 className="font-luxury text-xl font-semibold text-white">Support</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-all duration-300 text-lg hover:translate-x-1 inline-block">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-all duration-300 text-lg hover:translate-x-1 inline-block">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-all duration-300 text-lg hover:translate-x-1 inline-block">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-all duration-300 text-lg hover:translate-x-1 inline-block">Security</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-gray-400 text-lg">
            © 2025 SplitSetGo. Designed with love.
          </p>
          <div className="flex items-center space-x-8">
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-all duration-300 hover:translate-x-1">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-all duration-300 hover:translate-x-1">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-all duration-300 hover:translate-x-1">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};