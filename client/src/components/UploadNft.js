import "./css/UploadNft.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

import { Row, Form, Button } from "react-bootstrap";

import { useSelector } from "react-redux";

import { useState, useRef } from "react";
import { ethers } from "ethers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { create as ipfsHttpClient } from "ipfs-http-client";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

const { Dragger } = Upload;

function UploadNft({ nftInstance, marketplaceInstance }) {
  // const walletAddress = useSelector((state) =>
  //   state.user.value ? state.user.value.walletId : null
  // );

  const [image, setImage] = useState("");
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const imageInputRef = useRef();

  // console.log("nftInstance: ", nftInstance);
  // console.log("marketplaceInstance: ", marketplaceInstance);

  const uploadToIPFS = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (typeof file !== "undefined") {
      try {
        const result = await client.add(file);
        console.log(result.path);
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`);
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  };
  const createNFT = async () => {
    if (!image || !price || !name || !description) return;
    try {
      const result = await client.add(
        JSON.stringify({ image, price, name, description })
      );
      mintThenList(result);
      toast.success("NFT minted successfully", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    } catch (error) {
      toast.error("Error encountered while minting NFT", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
      console.log("ipfs uri upload error: ", error);
    }
    setName("");
    setPrice("");
    setDescription("");
    imageInputRef.current.value = "";
    setImage(null);
  };
  const mintThenList = async (result) => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`;
    // mint nftInstance
    await (await nftInstance.mint(uri)).wait();
    // get tokenId of new nftInstance
    const id = await nftInstance.tokenCount();
    // approve marketplaceInstance to spend nftInstance
    await (
      await nftInstance.setApprovalForAll(marketplaceInstance.address, true)
    ).wait();
    // add nftInstance to marketplaceInstance
    const listingPrice = ethers.utils.parseEther(price.toString());
    await (
      await marketplaceInstance.makeItem(nftInstance.address, id, listingPrice)
    ).wait();
  };

  return (
    <>
      <NavBar />
      <ToastContainer
        toastStyle={{ backgroundColor: "black", color: "white" }}
      />
      <div className="UploadNft__Header">
        <div className="UploadNft__Header__row1">
          | <br />
          Explore{/* #F18A24 */}
        </div>
        <div className="UploadNft__Header__row2">Upload Your Item</div>
        <div className="UploadNft__Header__row3">
          {" "}
          Home {">"} <span>Upload Item</span>{" "}
        </div>
        {/* <div className="UploadNft_box">
          <Dragger>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              PNG, GIF, WEBP, MP4 or MP3. Max 100mb
            </p>
          </Dragger>
        </div> */}

        <div className="content mx-auto">
          <Row className="g-4">
            <Form.Control
              type="file"
              required
              name="file"
              onChange={uploadToIPFS}
              ref={imageInputRef}
            />
          </Row>
        </div>

        <div className="d-grid px-0 mt-5">
          <div className="create-nft-btn-custom" onClick={createNFT} size="lg">
            Create & List NFT!
          </div>
        </div>

        <div className="uploadNftCol">
          <div className="uploadNftSectionHeader">Item</div>
          <div className="uploadNftSectionRow">
            {/* User Detail Input */}
            <div className="uploadNftSectionCol">
              <div className="uploadNftLabel">Item Name</div>
              <div className="uploadNftInput">
                <input
                  onChange={(e) => setName(e.target.value)}
                  required
                  type="text"
                  id="firstName"
                  className="uploadNftInputField"
                  placeholder="Item Name"
                  value={name}
                />
              </div>
            </div>
            <div className="uploadNftSectionCol">
              <div className="uploadNftLabel">Title</div>
              <div className="uploadNftInput">
                <input
                  id="lastName"
                  className="uploadNftInputField"
                  placeholder="Title"
                />
              </div>
            </div>
          </div>
          <div className="uploadNftSectionRow">
            {/* User Detail Input */}
            <div className="uploadNftSectionCol">
              <div className="uploadNftLabel">Creator</div>
              <div className="uploadNftInput">
                <input
                  id="emailAddress"
                  className="uploadNftInputField"
                  placeholder="Creator"
                />
              </div>
            </div>
            <div className="uploadNftSectionCol">
              <div className="uploadNftLabel">Description</div>
              <div className="uploadNftInput">
                <input
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  required
                  as="textarea"
                  id="bio"
                  className="uploadNftInputField"
                  placeholder="Description"
                />
              </div>
            </div>
          </div>
          <div className="uploadNftSectionHeader">Property</div>
          <div className="uploadNftSectionRow">
            {/* User Detail Input */}
            <div className="uploadNftSectionCol">
              <div className="uploadNftLabel">Item Size</div>
              <div className="uploadNftInput">
                <input
                  id="size"
                  className="uploadNftInputField"
                  placeholder="Size"
                />
              </div>
            </div>
            <div className="uploadNftSectionCol">
              <div className="userDetailLabel">Item Currency</div>
              <div className="userDetailInput">
                <input
                  id="currency"
                  className="userDetailInputField"
                  placeholder="Currency"
                />
              </div>
            </div>
            <div className="uploadNftSectionCol">
              <div className="userDetailLabel">Item Price</div>
              <div className="userDetailInput">
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                  type="number"
                  id="price"
                  className="userDetailInputField"
                  placeholder="Price"
                />
              </div>
            </div>
            {/* <div className="userNftSectionCol">
              <div className="updateNftSectionButton">
                <div
                  className="updateProfileButton"
                  onClick={() => {
                    toast.success("Profile updated successfully", {
                      position: "bottom-center",
                      autoClose: 2000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: false,
                      progress: undefined,
                    });
                  }}
                >
                  Upload Nft
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UploadNft;
