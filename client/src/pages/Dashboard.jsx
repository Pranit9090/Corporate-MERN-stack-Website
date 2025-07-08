// src/pages/Dashboard.jsx
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiAccenture, SiTcs, SiWipro, SiInfosys } from "react-icons/si";
import { FaBuilding } from "react-icons/fa";
import { useAnimation, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  FaUserGraduate,
  FaBriefcase,
  FaUserFriends,
  FaChartLine,
} from "react-icons/fa";

const stats = [
  {
    title: "Active Users",
    count: 50000,
    icon: <FaUserFriends className="text-blue-500 text-3xl" />,
  },
  {
    title: "Internships Offered",
    count: 1500,
    icon: <FaBriefcase className="text-green-500 text-3xl" />,
  },
  {
    title: "Students Placed",
    count: 12000,
    icon: <FaUserGraduate className="text-purple-500 text-3xl" />,
  },
  {
    title: "Competitive Exams Cleared",
    count: 3000,
    icon: <FaChartLine className="text-orange-500 text-3xl" />,
  },
];

const AnimatedCounter = ({ from, to }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start({ count: to });
    }
  }, [inView, to, controls]);

  return (
    <motion.span
      ref={ref}
      initial={{ count: from }}
      animate={controls}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      {Math.floor(to).toLocaleString()}
    </motion.span>
  );
};

const logos = [
  { src: "/assets/logos/facebook.svg", alt: "Facebook" },
  { src: "/assets/logos/disney.svg", alt: "Disney" },
  { src: "/assets/logos/airbnb.svg", alt: "Airbnb" },
  { src: "/assets/logos/apple.svg", alt: "Apple" },
  { src: "/assets/logos/spark.svg", alt: "Spark" },
  { src: "/assets/logos/samsung.svg", alt: "Samsung" },
  { src: "/assets/logos/quora.svg", alt: "Quora" },
  { src: "/assets/logos/sass.svg", alt: "Sass" },
];

const categories = [
  {
    title: "General Aptitude",
    topics: [
      "Arithmetic Aptitude",
      "Data Interpretation",
      "Online Aptitude Test",
      "Logical Reasoning",
      "Verbal Ability",
    ],
  },
  {
    title: "Technical Fundamentals",
    topics: [
      "Operating System (OS)",
      "Computer Networks",
      "DBMS (Database Management System)",
      "Software Engineering",
      "Computer Architecture",
    ],
  },
  {
    title: "Programming & DSA",
    topics: [
      "C/C++ Basics",
      "Java / Python Basics",
      "Data Structures",
      "Algorithms",
      "Problem Solving Patterns",
    ],
  },
  {
    title: "Data Interpretation & Reasoning",
    topics: [
      "Pie Charts",
      "Bar Graphs",
      "Line Charts",
      "Tables & Caselets",
      "Logical Puzzles",
    ],
  },
  {
    title: "Web Development",
    topics: [
      "HTML / CSS / JavaScript",
      "React / Angular",
      "Node.js / Express",
      "MongoDB / Firebase",
      "REST APIs",
    ],
  },
  {
    title: "AI & Machine Learning",
    topics: [
      "Basics of AI",
      "Supervised / Unsupervised Learning",
      "Neural Networks",
      "Python for ML",
      "Projects & Mini-Models",
    ],
  },
  {
    title: "App Development",
    topics: [
      "Android with Kotlin",
      "Jetpack Compose",
      "Flutter & Dart",
      "Firebase Integration",
      "Play Store Deployment",
    ],
  },
  {
    title: "Cybersecurity & Networking",
    topics: [
      "Network Protocols",
      "Encryption / Decryption",
      "Ethical Hacking Basics",
      "Firewalls / VPN",
      "Security Tools",
    ],
  },
  {
    title: "Resume & Interview Prep",
    topics: [
      "Resume Builder",
      "HR Interview Questions",
      "Technical Interview MCQs",
      "Group Discussion Tips",
      "Mock Interview Practice",
    ],
  },
  {
    title: "Competitive Exams Prep",
    topics: [
      "GATE CS",
      "ISRO / DRDO",
      "UPSC CSAT (Tech Students)",
      "Bank PO Aptitude",
      "SSC CGL Reasoning",
    ],
  },
  {
    title: "Tools & Projects",
    topics: [
      "Git & GitHub",
      "VS Code Shortcuts",
      "Project Ideas",
      "Portfolio Website",
      "Deployment Tools (Vercel, Netlify)",
    ],
  },
  {
    title: "Communication & Soft Skills",
    topics: [
      "Spoken English Practice",
      "Group Discussion Tips",
      "Presentation Skills",
      "Email Writing",
      "Personality Development",
    ],
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* 🌀 Infinite Logo Scroll Styles */}
      <style>
        {`
          @layer utilities {
            @keyframes infinite-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-100%); }
            }
            .animate-infinite-scroll {
              animation: infinite-scroll 25s linear infinite;
            }
          }
        `}
      </style>

      {/* 🏢 Infinite Logo Carousel */}
      <div className="overflow-hidden py-6 bg-gray-900 border-y border-gray-300 mb-8">
        <div className="flex w-max space-x-24 px-8 animate-infinite-scroll">
          {[...logos, ...logos].map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-16 w-auto brightness-200 drop-shadow-lg"
            />
          ))}
        </div>
      </div>

      {/* 🧩 Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl p-6 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-blue-500 mb-4 flex items-center justify-between">
              {category.title} <FaArrowRight className="text-blue-400" />
            </h2>
            <ul className="space-y-2">
              {category.topics.map((topic, idx) => (
                <li
                  key={idx}
                  onClick={() =>
                    window.open(
                      `https://www.geeksforgeeks.org/${topic
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^\w-]/g, "")}/`,
                      "_blank"
                    )
                  }
                  className="text-gray-700 hover:text-blue-600 hover:translate-x-1 transform transition-all duration-300 cursor-pointer text-base"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* 🙌 Testimonials Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-50 to-white rounded-3xl shadow-inner mt-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-600 mb-6">
          What Students Say About{" "}
          <span className="text-blue-800">Corporate</span>
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Our platform has helped thousands of learners crack job interviews,
          clear competitive exams, and build amazing careers.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Priya Sharma",
              role: "Placed at Infosys",
              comment:
                "Corporate was a turning point in my preparation. The aptitude tests and mock interviews helped me build confidence!",
              img: "https://randomuser.me/api/portraits/women/65.jpg",
            },
            {
              name: "Rahul Verma",
              role: "Cracked GATE CS",
              comment:
                "Thanks to the technical fundamentals and problem-solving sections, I was able to score 60+ in GATE.",
              img: "https://randomuser.me/api/portraits/men/76.jpg",
            },
            {
              name: "Sneha Patil",
              role: "Selected in Capgemini",
              comment:
                "From resume building to mock HR questions — this platform helped me every step of the way!",
              img: "https://randomuser.me/api/portraits/women/68.jpg",
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 shadow"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-blue-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 text-base leading-relaxed italic">
                “{testimonial.comment}”
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 📊 Stats Counter Section */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">
            📈 Platform Impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-blue-50 p-6 rounded-2xl shadow hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-4xl font-bold text-gray-800">
                  <AnimatedCounter from={0} to={stat.count} />+
                </div>
                <p className="mt-2 text-gray-600 text-lg">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 💳 Pricing Plans Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-700">
              Choose Your Plan
            </h2>
            <p className="text-gray-600 mt-3 text-lg">
              Flexible pricing tailored to students, freshers, and
              professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="border border-gray-200 rounded-2xl p-8 shadow hover:shadow-lg transition duration-300 bg-white">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Free</h3>
              <p className="text-sm text-gray-500 mb-4">
                For learners starting their career prep
              </p>
              <p className="text-4xl font-bold text-blue-600 mb-6">
                ₹0
                <span className="text-base text-gray-500 font-medium">
                  /month
                </span>
              </p>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li>✅ Aptitude & Reasoning Tests</li>
                <li>✅ Resume Templates</li>
                <li>✅ Company-wise Questions</li>
                <li>❌ Mock Interviews</li>
                <li>❌ Premium Mentorship</li>
              </ul>
              <button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-2 rounded-lg transition">
                Start for Free
              </button>
            </div>

            {/* Premium Plan - Highlighted */}
            <div className="border-2 border-blue-600 bg-blue-50 rounded-2xl p-8 shadow-2xl transform scale-105">
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Premium
              </h3>
              <p className="text-sm text-blue-700 mb-4">
                Ideal for serious aspirants preparing for placements
              </p>
              <p className="text-4xl font-bold text-blue-800 mb-6">
                ₹499
                <span className="text-base text-blue-700 font-medium">
                  /month
                </span>
              </p>
              <ul className="space-y-3 text-blue-900 mb-6 font-medium">
                <li>✅ Everything in Free</li>
                <li>✅ Mock Interviews</li>
                <li>✅ Real-time Doubt Solving</li>
                <li>✅ Roadmaps & Daily Targets</li>
                <li>❌ 1-on-1 Mentorship</li>
              </ul>
              <button
                onClick={() => {
                  localStorage.setItem("selectedPlan", "Pro"); // or Premium/Free
                  navigate("/payment");
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
              >
                Buy Now
              </button>
            </div>

            {/* Pro Plan */}
            <div className="border border-gray-200 rounded-2xl p-8 shadow hover:shadow-lg transition duration-300 bg-white">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Pro</h3>
              <p className="text-sm text-gray-500 mb-4">
                For ambitious learners and competitive exam aspirants
              </p>
              <p className="text-4xl font-bold text-purple-600 mb-6">
                ₹999
                <span className="text-base text-gray-500 font-medium">
                  /month
                </span>
              </p>
              <ul className="space-y-3 text-gray-700 mb-6">
                <li>✅ All Premium Features</li>
                <li>✅ 1-on-1 Mentorship</li>
                <li>✅ Placement Guidance</li>
                <li>✅ AI-based Progress Tracker</li>
                <li>✅ 24/7 Priority Support</li>
              </ul>
              <button
                onClick={() => {
                  localStorage.setItem("selectedPlan", "Pro"); // or Premium/Free
                  navigate("/payment");
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-white text-gray-700 border-t shadow-inner mt-10">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Platform */}
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-3">
              Corporate
            </h3>
            <p className="text-sm">
              Your trusted platform for aptitude, technical, and soft skill
              preparation—built for tech students and job seekers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-500 transition-colors duration-200 cursor-pointer">
                Home
              </li>
              <li className="hover:text-blue-500 transition-colors duration-200 cursor-pointer">
                Jobs
              </li>
              <li className="hover:text-blue-500 transition-colors duration-200 cursor-pointer">
                Mock Interview
              </li>
              <li className="hover:text-blue-500 transition-colors duration-200 cursor-pointer">
                Resume Builder
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-3">
              Top Categories
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-blue-500 transition-colors duration-200 cursor-pointer">
                Aptitude
              </li>
              <li className="hover:text-blue-500 transition-colors duration-200 cursor-pointer">
                Technical
              </li>
              <li className="hover:text-blue-500 transition-colors duration-200 cursor-pointer">
                Interview Prep
              </li>
              <li className="hover:text-blue-500 transition-colors duration-200 cursor-pointer">
                Soft Skills
              </li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-3">
              Connect With Me
            </h4>
            <div className="flex gap-4 mt-2 text-blue-600">
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition-transform duration-200"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:scale-110 transition-transform duration-200"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Made with ❤️ by Pranit Kadam
            </p>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400 py-4 border-t">
          &copy; {new Date().getFullYear()} Corporate. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
