// src/pages/ContactUs.jsx
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">Contact Us</h1>
        <p className="text-gray-600 text-lg">
          We'd love to hear from you! Fill out the form and we'll get back to
          you.
        </p>
      </div>

      {/* Layout: Form + Contact Info */}
      <div className="grid md:grid-cols-2 gap-10 bg-white rounded-xl shadow-lg p-8">
        {/* Contact Form */}
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Subject
            </label>
            <input
              type="text"
              placeholder="Subject"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Message
            </label>
            <textarea
              placeholder="Write your message here..."
              rows={5}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg shadow hover:from-blue-600 hover:to-blue-800 transition font-semibold"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Phone className="text-blue-600" />
            <span className="text-gray-700 text-lg">+91 9822189978</span>
          </div>

          <div className="flex items-center gap-4">
            <Mail className="text-blue-600" />
            <span className="text-gray-700 text-lg">corporate@gmail.com</span>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="text-blue-600" />
            <span className="text-gray-700 text-lg">
              Balewadi Highstreeet , Sector-9, Pune.
            </span>
          </div>

          <div className="mt-10">
            <h3 className="text-blue-700 font-semibold text-lg mb-2">
              Working Hours
            </h3>
            <p className="text-gray-600">Monday - Friday: 9:00 AM to 6:00 PM</p>
            <p className="text-gray-600">Saturday - Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
