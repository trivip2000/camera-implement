import React,{useState} from 'react'
import './App.css';
import './main';
import LandscapeFaceMask from './img/mask_face_lndscp.svg';
import PortraitFaceMask from './img/mask_face_prtr.svg';

const uiCustomisation = {
  colors: {
    dotFaceCaptureCircleOutline: 'gold',
  },
};
type Props = {
  imageType: 'png' | 'jpg';
  cameraFacing: any;
  uiCustomisation: any;
  isLandscape: boolean;
  landscapeMask: string;
  portraitMask: string;
  photoTakenCb: (data: string, resolution: any) => void;
};
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'x-dot-manual-capture': { cameraOptions: object };
    }
  }
}
const FaceCamera = (props: Props) => {
  console.log('demo face camera props: ', props);
  return <x-dot-manual-capture cameraOptions={props} />;
};
function App() {
  const [facing, setFacing] = useState('user');
  const handleFacePhotoTaken = async (image: string, resolution: Resolution) => {
    
  };
  return (
    <div className="App">
      <header className="App-header">
      <FaceCamera
            imageType="png"
            isLandscape={false}
            cameraFacing={facing}
            uiCustomisation={uiCustomisation}
            photoTakenCb={handleFacePhotoTaken}
            landscapeMask={LandscapeFaceMask}
            portraitMask={PortraitFaceMask}
          />
      </header>
    </div>
  );
}

export default App;
