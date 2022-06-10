import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card } from "antd";
import Data from "./Data";
import "./Home.css";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar.js";

export default function Home() {
  const [selected, setSelected] = useState(Data);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const handleLogout = () => {
    localStorage.removeItem("Auth Token");
    navigate("/");
  };
  let navigate = useNavigate();
  useEffect(
    () => {
      if (!selectedFile) {
        setPreview(undefined);
        return;
      }

      const image = URL.createObjectURL(selectedFile);
      console.log(selectedFile);
      setPreview(image);
      if (selectedFile.size <= 5 * 1000 * 1000) {
        setSelected([{ image }, ...selected]);
        toast.error("Image Added Sucessfully to the Gallery");
      } else {
        toast.error("File too Big, please select a file less than 5mb");
      }

      return () => URL.revokeObjectURL(image);
    },
    [selectedFile],
    [selected]
  );

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    let authToken = localStorage.getItem("Auth Token");
    console.log(authToken);
    if (authToken) {
      navigate("/home");
    }

    if (!authToken) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      {console.log(selected)}
      <div className="homebtn_wrapper">
        <Navbar />
        <Button variant="contained" onClick={handleLogout}>
          Sign Out
        </Button>
      </div>
      <div>
        <div className="Bottom_Inner_2">
          <div
            className="img_grid_sec"
            style={{ borderRadius: "20px", padding: "0", width: "fit-Content" }}
          ></div>
          <label class="custom-file-upload">
            <input
              type="file"
              name="image-uploader"
              onChange={onSelectFile}
              id="image-uploader"
              accept="image/*"
              capture
            />
            Click Here to Upload Images
          </label>

          {/* <div className="img_grid_sec_last">+</div> */}
        </div>
        <Row>
          {selected.map((item, index) => {
            const { image } = item;
            return (
              <Col span={6} xs={24} sm={24} md={8} lg={8} xl={6} key={index}>
                <Card
                  style={{ margin: "15px" }}
                  cover={
                    <div
                      style={{
                        background: "#ececec",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        alt="/"
                        src={`${image}`}
                        style={{
                          width: "100%",
                          height: "200px",
                        }}
                      />
                    </div>
                  }
                ></Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
