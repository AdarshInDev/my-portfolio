import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-secondary" size={20} />,
      text: "adarsh@example.com",
      link: "mailto:adarsh@example.com"
    },
    {
      icon: <FaPhone className="text-secondary" size={20} />,
      text: "+91 1234567890",
      link: "tel:+911234567890"
    },
    {
      icon: <FaLinkedin className="text-secondary" size={20} />,
      text: "LinkedIn",
      link: "https://linkedin.com/in/yourusername"
    },
    {
      icon: <FaGithub className="text-secondary" size={20} />,
      text: "GitHub",
      link: "https://github.com/yourusername"
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="section-title">Get In Touch</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-textSecondary text-lg mb-8">
              I'm currently looking for new opportunities. Whether you have a question or just want to say hi, 
              I'll try my best to get back to you!
            </p>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-textPrimary hover:text-secondary transition-colors group"
                  whileHover={{ x: 10 }}
                >
                  <span className="group-hover:animate-bounce">{info.icon}</span>
                  <span>{info.text}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label htmlFor="name" className="text-textSecondary block mb-2">Name</label>
              <input
                type="text"
                id="name"
                className="w-full bg-lightNavy border border-lightestNavy rounded-md p-3 text-textPrimary focus:border-secondary focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="text-textSecondary block mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full bg-lightNavy border border-lightestNavy rounded-md p-3 text-textPrimary focus:border-secondary focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="text-textSecondary block mb-2">Message</label>
              <textarea
                id="message"
                rows="5"
                className="w-full bg-lightNavy border border-lightestNavy rounded-md p-3 text-textPrimary focus:border-secondary focus:outline-none transition-colors resize-none"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-primary w-full">
              Send Message
            </button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;