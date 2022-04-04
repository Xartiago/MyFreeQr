import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { FlexCent, FlexRowCent } from "../../Styles";
import { DownloadBttn, SelectTW } from "../../Styles/Qr";

export const QR = ({ url }) => {
  const [fileExt, setFileExt] = useState("png");
  /* Qr´s Styles sttes */
  const [dots, setDots] = useState('rounded')

  const qrCode = new QRCodeStyling({
    width: 200,
    height: 200,
    dotsOptions: {
      color: "#4267b2",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 20
    }
  });

  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current);
  }, [dots]);

  useEffect(() => {
    qrCode.update({
      data: url,
      dotsOptions: { type: dots }
    });
  }, [dots]);

  const onExtensionChange = (event) => {
    setFileExt(event.target.value);
  };

  const onColorChange = ({ target: { value } }) => {
    qrCode.update({
      dotsOptions: { color: value }
    })
  }
  const onBackgroundChange = ({ target: { value } }) => {
    qrCode.update({
      backgroundOptions: { color: value }
    })
  }

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
      <div className='w-10/12 grid grid-cols-3 gap-2 my-5'>
        <div>
          {/* Dots options */}
          <h4 className="py-1">Tipo de puntos</h4>
          <select onChange={e => setDots(e.target.value)} className={`${SelectTW} w-full`}>
            <option value="dots">Puntos</option>
            <option value="rounded">Redondeado</option>
            <option value="extra-rounded">Extra redondo</option>1
            <option value="square">Cuadrado</option>1
            <option value="classy">Clasico</option>1
            <option value="classy-rounded">Clasico redondo</option>
          </select>
        </div>
        <div>
          {/* Corners Square options */}
          <h4 className="py-1">Color</h4>
          <input type="color" onChange={(e) => onColorChange(e)} className="w-full rounded-sm border-none h-8" />
        </div>
        <div>
          {/*  */}
          <h4 className="py-1">Color de fondo</h4>
          <input type="color" onChange={e => onBackgroundChange(e)} className="w-full rounded-sm border-none h-8" />
        </div>
        <div>
          <h4 className="py-1">Tipo de puntos</h4>
          <select onChange={onExtensionChange} value={fileExt} className={`${SelectTW} w-full`}>
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
          </select>
        </div>
      </div>
    </div>
  );
}
