import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { Buttons, FlexCent, FlexRowCent } from "../../Styles";
import { DownloadBttn, SelectTW } from "../../Styles/Qr";

export const QR = ({ url }) => {
  const [fileExt, setFileExt] = useState("png");
  /* Qr´s Styles sttes */
  const [dots, setDots] = useState('rounded')
  const [color, setColor] = useState('#312D81')
  const [bgColor, setBgColor] = useState('#FFFFFF')


  const qrCode = new QRCodeStyling({
    data: url,
    width: 200,
    height: 200,
    dotsOptions: {
      color: "#312D81",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 20
    }
  });

  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current);
  }, [dots, color, bgColor, url]);

  useEffect(() => {
    if (!url) url = 'https://xartiago.vercel.app/'
    qrCode.update({
      data: url,
      dotsOptions: { type: dots, color: color },
      backgroundOptions: { color: bgColor }
    });
  }, [dots, color, bgColor, url]);

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
        {qrCode._options.data && <button onClick={onDownloadClick} className={`${DownloadBttn} ml-2`}>Descargar</button>}
      </div>
      <div className='w-10/12 grid grid-cols-3 gap-2 my-5'>
        <div>
          {/* Dots options */}
          <h4 className="py-1">Tipo de puntos</h4>
          <select onChange={e => setDots(e.target.value)} className={`${SelectTW} w-full`}>
            <option value="rounded" defaultValue>Redondeado</option>
            <option value="dots">Puntos</option>
            <option value="extra-rounded">Extra redondo</option>1
            <option value="square">Cuadrado</option>1
            <option value="classy">Clasico</option>1
            <option value="classy-rounded">Clasico redondo</option>
          </select>
        </div>
        <div>
          {/* Corners Square options */}
          <h4 className="py-1">Color</h4>
          <input type="color" onChange={(e) => setColor(e.target.value)} value={color} className="w-full rounded-sm border-none h-8" />
        </div>
        <div>
          {/*  */}
          <h4 className="py-1">Color de fondo</h4>
          <input type="color" onChange={e => setBgColor(e.target.value)} value={bgColor} className="w-full rounded-sm border-none h-8" />
        </div>
      </div>
    </div>
  );
}
