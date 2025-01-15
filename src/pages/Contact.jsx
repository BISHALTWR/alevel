import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlineGlobe,
} from "react-icons/hi";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  // Add status state
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('https://formsubmit.co/8db3a79c4af65af7772bf66a6ab7cadf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "New message from A Level Website",
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 mb-6">
                Get in Touch
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Have questions or suggestions? I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 dark:bg-blue-400/10 flex items-center justify-center">
                  <HiOutlineMail className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Email
                  </h3>
                  <a
                    href="mailto:bishaltwr@gmail.com"
                    className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    bishaltwr@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 dark:bg-green-400/10 flex items-center justify-center">
                  <HiOutlinePhone className="w-6 h-6 text-green-500 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Phone
                  </h3>
                  <a
                    href="tel:+9779841234567"
                    className="text-green-500 hover:text-green-600 dark:hover:text-green-400"
                  >
                    +977 9808076305
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 dark:bg-purple-400/10 flex items-center justify-center">
                  <HiOutlineLocationMarker className="w-6 h-6 text-purple-500 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Location
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Kathmandu, Nepal
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 dark:bg-orange-400/10 flex items-center justify-center">
                  <HiOutlineGlobe className="w-6 h-6 text-blue-500 dark:text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Website
                  </h3>
                  <a
                    href="https://bishaltwr.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                  >
                    bishaltwr.com
                  </a>
                </div>
              </div>
            </div>
          </div>

                    {/* Contact Form */}
                    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-sm p-8 border border-gray-200/50 dark:border-gray-700/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white
                           focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white
                           focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-white
                           focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 
                         hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg
                         shadow-lg hover:shadow-xl transform-gpu hover:scale-[1.02] 
                         transition-all duration-300 ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>

              {status === 'success' && (
                <p className="mt-4 text-green-600 dark:text-green-400 text-center">
                  Message sent successfully!
                </p>
              )}

              {status === 'error' && (
                <p className="mt-4 text-red-600 dark:text-red-400 text-center">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Contact;
