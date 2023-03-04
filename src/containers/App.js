import { useState } from "react";
import "./App.css";
import Navigation from "../components/Navigation/Navigation";
import Rank from "../components/Rank/Rank";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import FaceRecog from "../components/FaceRecog/FaceRecog";
import SignIn from "../components/SignIn/SignIn";
import Register from "../components/Register/Register";
import ParticlesBg from "../components/ParticlesBg/ParticlesBg";

const initialUser = {
  id: "",
  name: "",
  email: "",
  rank: "",
  joined: "",
};

const initialImageData = {
  imageLink: "",
  imageToLoad: "",
};

const initialFaceDetectionBoxArray = [
  {
    top: "",
    left: "",
    bottom: "",
    right: "",
  },
];

export default function App() {
  const [imageData, setImageData] = useState(initialImageData);
  const [route, setRoute] = useState("signIn");
  const [faceDetectionBoxArray, setFaceDetectionBoxArray] = useState(
    initialFaceDetectionBoxArray
  );
  const [user, setUser] = useState(initialUser);

  // console.log("App user log", user);

  function loadUser(user) {
    setUser(user);
  }

  function addUser(user) {
    setUser(user);
  }

  function resetSession() {
    setUser(initialUser);
    setImageData(initialImageData);
    setFaceDetectionBoxArray(initialFaceDetectionBoxArray);
  }

  function resetFaceDetectionBoxArray() {
    setFaceDetectionBoxArray(initialFaceDetectionBoxArray);
  }

  function changeRoute(route) {
    setRoute(route);
  }

  async function updateRank() {
    try {
      const imageSubmitResponse = await fetch(
        "https://fra-server.onrender.com/imageSubmit",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: user.id,
          }),
        }
      );
      const newRank = await imageSubmitResponse.json();
      setUser((prevState) => ({
        ...prevState,
        rank: newRank,
      }));
    } catch (err) {
      console.log("updateRank err: ", err);
    }
  }

  function calculateFaceDetectionBox(facePositionArray) {
    const loadedImage = document.querySelector("#loaded-image");
    const loadedImageHeight = loadedImage.height;
    const loadedImageWidth = loadedImage.width;
    const detectionBoxArray = [];
    facePositionArray.forEach((facePosition) => {
      const { top_row, left_col, bottom_row, right_col } =
        facePosition.region_info.bounding_box;
      const detectionBox = {
        top: loadedImageHeight * top_row,
        left: loadedImageWidth * left_col,
        bottom: loadedImageHeight - loadedImageHeight * bottom_row,
        right: loadedImageWidth - loadedImageWidth * right_col,
      };
      detectionBoxArray.push(detectionBox);
    });
    setFaceDetectionBoxArray(detectionBoxArray);
  }

  function handleButtonClick() {
    setImageData((prevData) => ({
      ...prevData,
      imageToLoad: imageData.imageLink,
    }));
    handleImageSubmit();
  }

  function handleInputChange(event) {
    const { value } = event.target;
    setImageData((prevData) => ({
      ...prevData,
      imageLink: value,
    }));
  }

  function handleEnterKeypress(event) {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  }

  async function handleImageSubmit() {
    try {
      const clarifaiApiResponse = await fetch(
        "https://fra-server.onrender.com/clarifaiApi",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageLink: imageData.imageLink,
          }),
        }
      );
      const facePositionArray = await clarifaiApiResponse.json();
      calculateFaceDetectionBox(facePositionArray);
      updateRank();
    } catch (err) {
      resetFaceDetectionBoxArray();
      console.log("handleImageSubmit err: ", err);
    }
  }

  const { imageLink, imageToLoad } = imageData;

  return (
    <div className="app">
      <Navigation
        route={route}
        changeRoute={changeRoute}
        resetSession={resetSession}
      />
      <main className="content center f-column">
        {route === "home" ? (
          <>
            <Rank user={user} />
            <ImageLinkForm
              imageLink={imageLink}
              handleInputChange={handleInputChange}
              handleButtonClick={handleButtonClick}
              handleEnterKeypress={handleEnterKeypress}
            />
            <FaceRecog
              imageToLoad={imageToLoad}
              faceDetectionBoxArray={faceDetectionBoxArray}
            />
          </>
        ) : route === "signIn" ? (
          <SignIn changeRoute={changeRoute} loadUser={loadUser} />
        ) : route === "register" ? (
          <Register changeRoute={changeRoute} addUser={addUser} />
        ) : (
          <SignIn changeRoute={changeRoute} loadUser={loadUser} />
        )}
      </main>
      <ParticlesBg />
    </div>
  );
}
