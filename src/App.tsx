import React, {useState} from 'react'
import './App.css';
import LandscapeFaceMask from './img/mask_face_lndscp.svg';
import PortraitFaceMask from './img/mask_face_prtr.svg';
import LandscapeDocumentMask from './img/mask_card_lndscp.svg';
import PortraitDocumentMask from './img/mask_card_prtr.svg';
import 'dot-manual-capture';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'x-face-capture': any,
    }
  }
}


type Props = {
  imageType: 'png' | 'jpg';
  cameraFacing: 'user' | 'environment';
  uiCustomisation: any;
  isLandscape: boolean;
  landscapeMask: string;
  portraitMask: string;
  photoTakenCb: (data: string) => void;
};

// https://css-tricks.com/3-approaches-to-integrate-react-with-custom-elements/
// https://coryrylan.com/blog/using-web-components-in-react
// https://www.robinwieruch.de/react-web-components
// https://reactjs.org/docs/web-components.html
const FaceCamera: any = (props: Props) => {
  console.log('demo face camera props: ', props);
  return <x-face-capture cameraOptions={props} />;
};

const DocumentCamera: any = (props: Props) => {
  console.log('demo document camera props: ', props);
  return <x-face-capture cameraOptions={props} />;
};
function App() {
  type FacingMode = 'environment' | 'user';
  const [showing, setShowing] = useState('hub');
  const [facing, setFacing] = useState('user' as FacingMode);
  const [imageTaken, setImage] = useState<Blob>((null as unknown) as Blob);

  const handleFacePhotoTaken = async (image: string) => {
    const res = await fetch(image);
    const blob = await res.blob();

    setImage(blob);

    setShowing('imageData');

    console.log('photo taken');
  };

  const handleDocumentPhotoTaken = async (image: string) => {
    const res = await fetch(image);
    const blob = await res.blob();

    setImage(blob);

    setShowing('imageData');

    console.log('photo taken');
  };

  const uiCustomisation: any = {
    colors: {
      dotFaceCaptureCircleOutline: 'gold',
    },
  };
  return (
    <>
      {showing == 'hub' ? (
        <div>
          pick a component <br />
          <a
            onClick={(event) => {
              event.preventDefault();
              setShowing('selfie');
            }}
            href="#"
          >
            {' '}
            selfie
          </a>
          &nbsp;
          <a
            onClick={(event) => {
              event.preventDefault();
              setShowing('document');
            }}
            href="#"
          >
            document
          </a>
        </div>
      ) : showing == 'selfie' ? (
        <div>
          <select
            onChange={(event) => {
              setFacing((event.target as any).value as FacingMode);
            }}
          >
            <option value="user"> selfie camera </option>
            <option value="environment"> environment camera </option>
          </select>
          <FaceCamera
            imageType="png"
            isLandscape={false}
            cameraFacing={facing}
            uiCustomisation={uiCustomisation}
            photoTakenCb={handleFacePhotoTaken}
            landscapeMask={LandscapeFaceMask}
            portraitMask={PortraitFaceMask}
          />
        </div>
      ) : showing == 'document' ? (
        <DocumentCamera
          imageType="png"
          isLandscape
          cameraFacing={'environment'}
          uiCustomisation={uiCustomisation}
          photoTakenCb={handleDocumentPhotoTaken}
          landscapeMask={LandscapeDocumentMask}
          portraitMask={PortraitDocumentMask}
        />
      ) : showing == 'imageData' ? (
        <div>
          <a
            onClick={(event) => {
              event.preventDefault();
              setShowing('hub');
            }}
            href="#"
          >
            go back
          </a>
          <br />
          <img src={window.URL.createObjectURL(imageTaken)} />
          <br />
        </div>
      ) : (
        <span>invalid page selected.</span>
      )}
    </>
  );
}

export default App;
