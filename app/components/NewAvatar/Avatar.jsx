import { Box, Modal, Slider, Button } from "@mui/material";
import {useContext, useRef, useState} from "react";
import AvatarEditor from "react-avatar-editor";
import { FcAddImage } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import "./avatar.scss";
import {HiMiniPhoto} from "react-icons/hi2";
import UserContext from "@/app/context/userContext";

/*-----------------------------------------
  Author: Ajay Prakash P P
  Date : 13/09/2022
  Github: https://github.com/mrAJAY1
  LinkedIn: https://www.linkedin.com/in/ajay-prakash-8767a9218/

  Current Domain : MERN stack
--------------------------------------------*/

// Styles
const boxStyle = {
    width: "300px",
    height: "300px",
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center"
};
const modalStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

// Modal
const CropperModal = ({ src, modalOpen, setModalOpen, setPreview }) => {
    const [slideValue, setSlideValue] = useState(10);
    const cropRef = useRef(null);

    //handle save
    const handleSave = async () => {
        if (cropRef) {
            console.log(cropRef);
            const dataUrl = cropRef.current.getImage().toDataURL();
            // You can set a unique key for this data in local storage
            const storageKey = 'tempImageData';
            // Store the Data URL as a base64-encoded string in local storage
            localStorage.setItem(storageKey, dataUrl);
            setPreview(dataUrl);
            setModalOpen(false);
        }
    };

    return (
        <Modal sx={modalStyle} open={modalOpen}>
            <Box sx={boxStyle}>
                <AvatarEditor
                    ref={cropRef}
                    image={src}
                    style={{ width: "100%", height: "100%" }}
                    border={50}
                    borderRadius={150}
                    color={[0, 0, 0, 0.72]}
                    scale={slideValue / 10}
                    rotate={0}
                />

                {/* MUI Slider */}
                <Slider
                    min={10}
                    max={50}
                    sx={{
                        margin: "0 auto",
                        width: "80%",
                        color: "cyan"
                    }}
                    size="medium"
                    defaultValue={slideValue}
                    value={slideValue}
                    onChange={(e) => setSlideValue(e.target.value)}
                />
                <Box
                    sx={{
                        display: "flex",
                        padding: "10px",
                        border: "3px solid white",
                        background: "black"
                    }}
                >
                    <Button
                        size="small"
                        sx={{ marginRight: "10px", color: "white", borderColor: "white" }}
                        variant="outlined"
                        onClick={(e) => setModalOpen(false)}
                    >
                        cancel
                    </Button>
                    <Button
                        sx={{ background: "#5596e6" }}
                        size="small"
                        variant="contained"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

// Container
const Cropper = () => {
    // image src
    const [src, setSrc] = useState(null);

    const context=useContext(UserContext);

    // preview
    const [preview, setPreview] = useState(null);

    // modal state
    const [modalOpen, setModalOpen] = useState(false);

    // ref to control input element
    const inputRef = useRef(null);

    // handle Click
    const handleInputClick = (e) => {
        e.preventDefault();
        inputRef.current.click();
    };
    // handle Change
    const handleImgChange = (e) => {
        setSrc(URL.createObjectURL(e.target.files[0]));
        setModalOpen(true);
    };

    return (
        <>
            <header>

            </header>
            <main className="container">
                <CropperModal
                    modalOpen={modalOpen}
                    src={src}
                    setPreview={setPreview}
                    setModalOpen={setModalOpen}
                />
                <input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={handleImgChange}
                />
                <div className="img-container">
                    <img
                        src={
                            preview ||
                            " https://cdn1.iconfinder.com/data/icons/facely-metapeople-3d-avatar-set/512/17._Designer.png"
                        }
                        alt=""
                        className={`w-24`}
                    />
                    {((!preview && context.signupAvatarOpen) || (!preview && !context)) && <div
                        className={`absolute w-24 h-24 rounded-full bg-gray-200 opacity-50 top-0 flex justify-center items-center`}
                        onClick={handleInputClick}>
                        Select<br/> Image
                    </div>}

                </div>

            </main>


        </>
    );
};

export default Cropper;
