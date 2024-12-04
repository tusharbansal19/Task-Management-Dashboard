import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBgColor, setTextColor, setTextSize, setIconColor } from "../features/styleSlice";

const StudioPage = () => {
  const dispatch = useDispatch();
  const styleSettings = useSelector((state) => state.style);

  // State for user inputs
  const [bgType, setBgType] = useState("color"); // 'color' or 'gradient'
  const [bgColor, setBgColorLocal] = useState("#ffffff"); // Default plain background color
  const [gradientDirection, setGradientDirection] = useState("to right");
  const [gradientFrom, setGradientFrom] = useState("#800080"); // Purple
  const [gradientTo, setGradientTo] = useState("#ffffff"); // White
  const [textColor, setTextColorLocal] = useState(styleSettings.textColor);
  const [textSize, setTextSizeLocal] = useState(styleSettings.textSize);
  const [iconColor, setIconColorLocal] = useState(styleSettings.iconColor);
  const [iconSize, setIconSize] = useState("32px");
  const [background, setBackground]=useState();

  const applyChanges = () => {
    const background =
      bgType === "gradient"
        ? `linear-gradient(${gradientDirection}, ${gradientFrom}, ${gradientTo})`
        : bgColor;

    dispatch(setBgColor(background));
    dispatch(setTextColor(textColor));
    dispatch(setTextSize(textSize));
    dispatch(setIconColor(iconColor));
  };
  const handlebgChange = ()=>{
    const background =
    bgType === "gradient"
      ? `linear-gradient(${gradientDirection}, ${gradientFrom}, ${gradientTo})`
      : bgColor;
      setBackground(background);
  }

  return (
    <div
      className="min-h-screen p-8 mt-20 sm:pl-[10%]"
      style={{
        background: styleSettings.bgColor,
      }}
    >
      <h1
        className="text-2xl mb-6"
        style={{
          color: styleSettings.textColor,
          fontSize: styleSettings.textSize,
        }}
      >
        Studio Page
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Background Selector */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Background</h2>
          <div className="flex items-center gap-4 mb-4">
            <label>
              <input
                type="radio"
                name="bgType"
                value="color"
                checked={bgType === "color"}
                onChange={() => setBgType("color")}
              />
              Color
            </label>
            <label>
              <input
                type="radio"
                name="bgType"
                value="gradient"
                checked={bgType === "gradient"}
                onChange={() => setBgType("gradient")}
              />
              Gradient
            </label>
          </div>

          {bgType === "color" ? (
            <input
              type="color"
              value={bgColor}
              onChange={(e) =>{ handlebgChange();setBgColorLocal(e.target.value)}}
              className="w-full h-12 rounded-lg border"
            />
          ) : (
            <div className="flex gap-4">
              <select
                value={gradientDirection}
                onChange={(e) => {handlebgChange();setGradientDirection(e.target.value)}}
                className="w-1/2 h-12 rounded-lg border"
              >
                {["to right", "to left", "to bottom", "to top"].map((dir) => (
                  <option key={dir} value={dir}>
                    {dir}
                  </option>
                ))}
              </select>
              <input
                type="color"
                value={gradientFrom}
                onChange={(e) =>{
                  handlebgChange();

                  setGradientFrom(e.target.value)
                } 
              }
                className="w-1/4 h-12 border"
              />
              <input
                type="color"
                value={gradientTo}
                onChange={(e) =>{ setGradientTo(e.target.value);handlebgChange();}}
                className="w-1/4 h-12 border"
              />
            </div>
          )}
        </div>

        {/* Text Color Selector */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Text Color</h2>
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColorLocal(e.target.value)}
            className="w-full h-12 rounded-lg border"
          />
        </div>

        {/* Text Size Selector */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Text Size</h2>
          <input value={textSize.replace("px" ,"")} type="range"
            min={1} max={50}
            onChange={(e) => setTextSizeLocal(e.target.value+'px')}
            className="w-full h-12 rounded-lg border"
          />size: {
            textSize
          }
            
          
        </div>

        {/* Icon Settings */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Icon</h2>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={iconColor}
              onChange={(e) => setIconColorLocal(e.target.value)}
              className="w-1/3 h-12 border"
            />
            <input
              type="range"
              min={16}
              max={64}
              value={iconSize.replace("px", "")}
              onChange={(e) => setIconSize(e.target.value + "px")}
              className="w-2/3"
            />
          </div>
          <p className="mt-2 text-sm">Size: {iconSize}</p>
        </div>
      </div>

      {/* Apply Changes Button */}
      <button
        onClick={applyChanges}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg mt-6 hover:bg-blue-600"
      >
        Apply Changes
      </button>

      {/* Preview Box */}
      <div className="mt-8 p-4 border rounded-lg">
        <h2 className="text-lg font-bold mb-4">Preview</h2>
        <div
          className="w-full h-40 flex items-center justify-center text-xl font-bold"
          style={{
            background:background,
            color:textColor,
          }}
        >
          <div
            style={{
              fontSize: iconSize,
              color: iconColor,
            }}
          >
             <span>I  </span> <br /> {/* Example Icon */}
          </div>
          <p style={{fontSize:textSize}}>

            Preview Your Settings Here!
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudioPage;
