import React from 'react';
import { Button } from '@/components/ui/Button';
import { Mail, Phone, MapPin, MessageSquare, Clock } from 'lucide-react';

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent successfully (Demo)");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">Contact Us</h1>
          <p className="text-lg text-gray-500">
            Have a question, feedback, or need help with an order? We're here for you. Drop us a message below or use our contact information to reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 max-w-5xl mx-auto">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Get In Touch</h2>
            <div className="space-y-8">
              
              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-full flex-shrink-0 mt-1">
                  <Mail className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-gray-900">Email</h3>
                  <p className="text-gray-500 mt-1 mb-2">Our support team responds within 24 hours.</p>
                  <a href="mailto:support@fnfsupershop.com" className="text-orange-600 font-medium hover:underline">support@fnfsupershop.com</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-full flex-shrink-0 mt-1">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-gray-900">Phone</h3>
                  <p className="text-gray-500 mt-1 mb-2">Available Mon-Fri, 9am to 6pm EST.</p>
                  <a href="tel:+18005550199" className="text-orange-600 font-medium hover:underline">+1 (800) 555-0199</a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-full flex-shrink-0 mt-1">
                  <MapPin className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-gray-900">Office</h3>
                  <p className="text-gray-500 mt-1">
                    FNF Super Shop Headquarters<br />
                    123 Commerce Blvd, Suite 400<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-full flex-shrink-0 mt-1">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-bold text-gray-900">Business Hours</h3>
                  <p className="text-gray-500 mt-1">
                    Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                    Saturday & Sunday: Closed (Email support only)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MessageSquare className="w-6 h-6 mr-3 text-orange-600" />
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" id="firstName" required className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500" placeholder="Jane" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" id="lastName" required className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" id="email" required className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500" placeholder="jane@example.com" />
              </div>

              <div>
                <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">Order Number <span className="text-gray-400 font-normal">(optional)</span></label>
                <input type="text" id="order" className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500" placeholder="#ORD-123456" />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea id="message" rows={5} required className="block w-full border border-gray-300 rounded-lg p-3 focus:ring-orange-500 focus:border-orange-500" placeholder="How can we help you today?"></textarea>
              </div>

              <div className="pt-2">
                <Button type="submit" size="lg" className="w-full font-bold">Send Message</Button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
