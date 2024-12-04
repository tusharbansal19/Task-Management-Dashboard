import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUsers, FaLightbulb, FaGlobe, FaRocket } from "react-icons/fa";

const AboutUsPage = () => {
  const dispatch = useDispatch();
  const styleSettings = useSelector((state) => state.style);



  return (
    <div
      className="min-h-screen flex flex-col items-center py-12 px-6"
     
    >
      {/* Page Header */}
      <header className="text-center mb-8 mt-20">
        <h1
          className="text-5xl font-bold mb-2 text-black"
          style={{
            background: styleSettings.textGradient,
            WebkitBackgroundClip: styleSettings.textGradient ? "text" : "initial",
            WebkitTextFillColor: styleSettings.textGradient ? "transparent" : styleSettings.textColor,
           
          }}
        >
          <span className="text-black" style={{
            color: "black",
            textTransform: "uppercase",
            letterSpacing: "2px",
          }}>
          About Us
          </span>
            
        </h1>
        <p className="text-lg" style={{ }}>
          Learn more about who we are and what drives us forward.
        </p>
      </header>

      {/* About Sections */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Our Team */}
        <div
          className="flex items-center space-x-4 bg-black  p-6 rounded-lg shadow-md"
          style={{ backgroundColor: "red"||styleSettings.bgColor,color: styleSettings.textColor || "black", }}
        >
          <FaUsers className="text-2xl" style={{ color: styleSettings.iconColor || "#4FD1C5" }} />
          <div>
            <h3 className="text-lg font-semibold text-white" style={{color: styleSettings.textColor || "black", }}>
              Our Team
            </h3>
            <p className="text-sm  opacity-70" style={{color: styleSettings.textColor || "black",}}>
              A passionate group of individuals committed to delivering excellence.
            </p>
          </div>
        </div>
        {/* Our Mission */}
        <div
          className="flex items-center space-x-4 bg-black bg-opacity-80 p-6 rounded-lg shadow-md "
      style={{
          background: styleSettings.bgGradient || styleSettings.bgColor,color: styleSettings.textColor || "black",
        }}
        >
          <FaLightbulb className="text-2xl" style={{ color: styleSettings.iconColor || "#4FD1C5" }} />
          <div>
              <h3 className="text-lg font-semibold text-white" style={{  color: styleSettings.textColor || "black", }}>
              Our Mission
            </h3>
                <p className="text-sm text-white opacity-80 " style={{ color: styleSettings.textColor || "black", }}>
              Empowering people with innovative solutions to make life better.
            </p>
          </div>
        </div>
        {/* Global Impact */}
        <div
          className="flex items-center space-x-4 bg-black bg-opacity-30 p-6 rounded-lg shadow-md"
      style={{
          background: styleSettings.bgGradient || styleSettings.bgColor,color: styleSettings.textColor || "black",
        }}
        >
          <FaGlobe className="text-2xl" style={{ color: styleSettings.iconColor || "#4FD1C5" }} />
          <div>
              <h3 className="text-lg font-semibold text-white" style={{  color: styleSettings.textColor || "black", }}>
              Global Impact
            </h3>
                <p className="text-sm text-white opacity-80 " style={{color: styleSettings.textColor || "black",  }}>
              Making a difference in communities across the world.
            </p>
          </div>
        </div>
        {/* Future Vision */}
        <div
          className="flex items-center space-x-4 bg-black bg-opacity-30 p-6 rounded-lg shadow-md"
      style={{
          background: styleSettings.bgGradient || styleSettings.bgColor,color: styleSettings.textColor || "black",
        }}
        >
          <FaRocket className="text-2xl" style={{ color: styleSettings.iconColor || "#4FD1C5" ,}} />
          <div>
              <h3 className="text-lg font-semibold text-white" style={{ color: styleSettings.textColor || "black",  }}>
              Future Vision
            </h3>
                <p className="text-sm text-white opacity-80 " style={{  color: styleSettings.textColor || "black",}}>
              Pioneering the future with innovative ideas and cutting-edge technology.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div
        className="w-full max-w-2xl bg-black bg-opacity-40 p-8 rounded-lg shadow-md text-center "
        style={{
          background: styleSettings.bgGradient || styleSettings.bgColor,color: styleSettings.textColor || "black",
        }}      >
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: styleSettings.textColor }}
        >
          Join Us on This Journey
        </h2>
        <p
          className="text-gray-300 mb-6 opacity-20"
          style={{ color: styleSettings.textColor || "#D1D5DB" }}
        >
          Be a part of our story and contribute to making a lasting impact.
        </p>
        <button
          className="w-full p-3 bg-gradient-to-r from-blue-900 via-sky-800 to-indigo-900 hover:to-teal-500 text-white rounded-lg font-medium"
          style={{ background: styleSettings.bgGradient || "#4FD1C5",color: styleSettings.textColor || "black", }}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default AboutUsPage;
