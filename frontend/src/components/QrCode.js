import React, { useState } from "react";
import axios from "axios";
import QRcode from "qrcode.react";
// import QrReader from "react-qr-reader";

const QrCode = () => {
  const [outpassId, setOutpassId] = useState("");
  const [qrCode, setQrCode] = useState("");

  const handleGenerateQRCode = async () => {
    try {
      setOutpassId("64540eaf38db506875809b5b");
      const response = await axios.get(` http://localhost:5000/api/qrcode/${outpassId}`);
      setQrCode(response.data.qrCode);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Outpass QR Code</h1>
      <div>
        <button onClick={handleGenerateQRCode}>Generate QR Code</button>
      </div>
      {qrCode ? (
        <div>
          <QRcode 
                        id="myqr"
                        value={qrCode} 
                        size={320}
                        includeMargin={true}
                    />
          <p>Scan this QR code with the security app:</p>
          {/* <p>{qrCodeImage}</p> */}
        </div>
      ) : null}
    </div>
  );
};

export default QrCode;
