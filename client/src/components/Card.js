import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { BigNumber, ethers } from "ethers";
import "./css/NFTCardStyles.css";
import Icon from "@ant-design/icons";

import Image from "react-bootstrap/Image";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CopyOutlined } from "@ant-design/icons";

const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);

const HeartIcon = (props) => (
  <Icon
    component={HeartSvg}
    onClick={(e) =>
      (e.target.style.color =
        e.target.style.color === "gray" ? "hotpink" : "gray")
    }
    {...props}
  />
);

function Card(props) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  const walletAddress = useSelector((state) =>
    state.user.value ? state.user.value.walletId : ""
  );

  const walletAddressLowerCase = walletAddress.toLowerCase();

  const walletAddressCompare = walletAddressLowerCase
    ? walletAddress.toLowerCase()
    : "";

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const propsOwner = props.owner.slice(0, 7) + "...";
  // console.log("Big Number in Modal: ", props.priceInBI);

  const loadMarketplaceItems = async () => {
    // console.log("NFT Modal instance", props.nft);
    // console.log("Marketplace Modal instance", props.marketplace);
    // console.log("Wallet Address : ", walletAddress);
    // console.log("Props owner : ", props.owner);
    // console.log(walletAddress !== props.owner);
    const itemCount = await props.marketplace.itemCount();
    let items = [];
    for (let i = 1; i <= itemCount; i++) {
      const item = await props.marketplace.items(i);
      if (!item.sold) {
        // get uri from nft contract
        const uri = await props.nft.tokenURI(item.tokenId);

        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri);
        const metadata = await response.json();

        // get total price of item ( item price + fee)
        const totalPrice = await props.marketplace.getTotalPrice(item.itemId);
        // console.log(ethers.utils.formatEther(totalPrice));
        const totalPriceInETH = ethers.utils.formatEther(totalPrice);

        // Add item to items array
        items.push({
          totalPriceInETH,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        });
      }
    }
    setItems(items);
  };

  const buyMarketplaceItem = async (itemID, itemTotalPrice) => {
    // console.log(itemID, itemTotalPrice);
    await (
      await props.marketplace.purchaseItem(itemID, {
        value: itemTotalPrice,
      })
    ).wait();
    // toast.success("Transaction successful", {
    //   position: "bottom-center",
    //   autoClose: 2000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: false,
    //   progress: undefined,
    // });
    loadMarketplaceItems();
  };

  useEffect(() => {
    loadMarketplaceItems();
  }, []);

  return (
    <>
      <Modal open={open} onBackdropClick={handleClose}>
        <Box className="modal-box">
          <div className="modal-content-section">
            <div className="modal-col">
              <Image className="modal-media" src={props.src} />
              <HeartIcon
                style={{ paddingTop: "25px", fontSize: "25px" }}
                className="heartIcon"
              />
            </div>
            <div className="modal-col">
              <div className="modal-row">
                <div className="modal-title">
                  <Typography fontSize={25}># {props.title}</Typography>
                </div>
                <div>
                  {props.sold ? (
                    <div className="onSaleEnabled">
                      <Typography> Not on Sale</Typography>
                    </div>
                  ) : (
                    <div className="onSaleDisabled">
                      <Typography>On Sale</Typography>
                    </div>
                  )}
                </div>
              </div>

              {/* <div className="modal-row modal-row-title">
                <div>
                  <Typography>Owner</Typography>
                </div>
                <div>
                  <Typography>createdBy</Typography>
                </div>
              </div> */}

              {/* <div className="modal-row">
                <div>
                  <Typography>@{props.owner}</Typography>
                </div>
                <div><Typography>@{props.created}</Typography></div>
              </div> */}

              {/* 
                  <div className="modal-row">
                            <div className='cardTags'>
                                {Object.keys(props.tags).map(tag => <div key={tag} className='cardTag'>{props.tags[tag]}</div>)}
                            </div>
                  </div> 
              */}

              <div className="modal-row modal-row-title">
                <div>
                  <Typography>Owner</Typography>
                </div>
              </div>

              <div className="modal-row">
                <div className="modal-address">
                  <Typography fontSize={15}>{props.owner}</Typography>
                </div>
                <CopyOutlined
                  onClick={() => {
                    if (props.owner) {
                      navigator.clipboard.writeText(props.owner);
                      toast.success("Copied to clipboard successfully", {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                      });
                    } else {
                      toast.error("Failed to copy to clipboard", {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: false,
                        progress: undefined,
                      });
                    }
                  }}
                />
              </div>

              <div className="modal-row modal-row-title">
                <div>
                  <Typography>Price</Typography>
                </div>
              </div>

              <div className="modal-row">
                <div className="modal-price">
                  <Typography fontSize={30}>
                    {props.price}
                    &nbsp;
                    <Image
                      className="modal-eth-logo"
                      height={30}
                      width={20}
                      src={require("./images/ethereum-brands.png")}
                    />
                  </Typography>
                </div>
              </div>

              {/* <div className="modal-row buy-sell">
                {walletAddress.toLowerCase() !== props.owner.toLowerCase() ? (
                  <Button
                    onClick={() =>
                      buyMarketplaceItem(props.itemId, props.priceInBI)
                    }
                    id="buyButton"
                    variant="contained"
                  >
                    <Typography>Buy</Typography>
                  </Button>
                ) : (
                  <Button id="sellButton" variant="contained">
                    <Typography>Sell</Typography>
                  </Button>
                )}
              </div> */}
            </div>
          </div>
        </Box>
      </Modal>

      <div key={props.key} className="userItem" onClick={handleOpen}>
        <div className="userItemCard">
          <img className="cardMedia" src={props.src} />
          <div className="cardContent">
            <HeartIcon className="heartIcon" />
            <div className="cardRow">
              <div className="cardTitle">{props.title}</div>
              {/* <div className="cardTags">
                {Object.keys(props.tags).map((tag) => (
                  <div key={tag} className="cardTag">
                    {props.tags[tag]}
                  </div>
                ))}
              </div> */}
            </div>
            <div className="cardRow">
              <div className="cardSubTitle">Price</div>
              <div className="cardSubTitle">Owner</div>
            </div>
            <div className="cardRow">
              <div className="cardPrice">{props.price} ETH</div>
              <div className="cardText">@{propsOwner}</div>
            </div>
            <div className="cardRow">
              <div className="cardSubTitle">Description</div>

              {/* <div className="cardSubTitle">Created by</div> */}
            </div>
            <div className="cardRow">
              {/* <div className="cardText">@{props.created}</div> */}
              <div className="cardText">{props.description}</div>
            </div>
          </div>
        </div>
        <ToastContainer
          toastStyle={{ backgroundColor: "black", color: "white" }}
        />
      </div>
      <div>
        {walletAddressCompare !== props.owner.toLowerCase() ? (
          <div
            className="card-buy-sell-btn"
            onClick={() => buyMarketplaceItem(props.itemId, props.priceInBI)}
          >
            Buy
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default Card;
