import { Facebook, Instagram, Twitter, Github, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-6 py-12">
                {/* Navigation Links */}
                <nav className="flex flex-wrap justify-center space-x-6 mb-6 text-sm text-gray-600">
                    <a href="#" className="hover:text-gray-900">About</a>
                    <a href="#" className="hover:text-gray-900">Blog</a>
                    <a href="#" className="hover:text-gray-900">Jobs</a>
                    <a href="#" className="hover:text-gray-900">Press</a>
                    <a href="#" className="hover:text-gray-900">Accessibility</a>
                    <a href="#" className="hover:text-gray-900">Partners</a>
                </nav>

                {/* Social Media Icons */}
                <div className="flex justify-center space-x-6 mb-6 text-gray-600">
                    <a href="#"><Facebook size={20} /></a>
                    <a href="#"><Instagram size={20} /></a>
                    <a href="#"><Twitter size={20} /></a>
                    <a href="#"><Github size={20} /></a>
                    <a href="#"><Youtube size={20} /></a>
                </div>

                {/* Copyright */}
                <p className="text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} MyKos. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
