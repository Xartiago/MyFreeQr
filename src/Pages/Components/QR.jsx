import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { FlexCent, FlexRowCent } from "../../Styles";
import { DownloadBttn, SelectTW } from "../../Styles/Qr";

const qrCode = new QRCodeStyling({
  width: 200,
  height: 200,
  dotsOptions: {
    color: "#4267b2",
    type: "rounded"
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20
  }
});

export const QR = ({ url }) => {
  const [fileExt, setFileExt] = useState("png");
  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url
    });
  }, [url]);

  const onUrlChange = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    qrCode.download({
      extension: fileExt
    });
  };

  return (
    <div className={FlexCent}>
      <div ref={ref} />
      <div className={`${FlexRowCent} mt-2`}>
        <select onChange={onExtensionChange} value={fileExt} className={SelectTW}>
          <option value="png">PNG</option>
          <option value="jpeg">JPEG</option>
        </select>
        <button onClick={onDownloadClick} className={`${DownloadBttn} ml-2`}>Descargar</button>
      </div>
    </div>
  );
}
