import React, { useEffect, useState } from "react";
import "./styles.css";
import QRCode from "react-qr-code";
import io from "socket.io-client";
import Announcement from "../Announcement/Announcement";
import { server2 } from "../../server";
const socket = io.connect(`${server2}`, {});

function Whatsapp() {
  const [qrCode, setQrCode] = useState("");
  const [isClientReady, setIsClientReady] = useState(false);

  console.log("qr-code", qrCode);

  useEffect(() => {
    socket.on("hello", (data) => {
      console.log("Server says:", data);
    });

    socket.on("qr", (data) => {
      const { qr } = data;
      console.log("the qr code is", qr);
      setQrCode(qr);
    });
    socket.on("clientReady", (data) => {
      const { isClientReady } = data;
      console.log("the client is", isClientReady);
      setIsClientReady(isClientReady);
    });
  }, []);

  return (
    <div className="App">
      {!isClientReady ? (
        <>
          <div style={{ margin: "0 30%" }}>
            <h1>WhatsApp Web Js</h1>
            <h1>Scan QR code</h1>
            <QRCode value={qrCode} />
          </div>
        </>
      ) : (
        <Announcement />
      )}
    </div>
  );
}

export default Whatsapp;
