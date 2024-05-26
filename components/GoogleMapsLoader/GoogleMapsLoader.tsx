import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { initialize, isFirebaseSupported } from "../../firebase";
import { getToken, onMessage } from "firebase/messaging";
import { useJsApiLoader } from "@react-google-maps/api";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";


/* @ts-ignore TODO: Refactor link to address type error */
const GoogleMapsLoader = ({ children, LIBRARIES, GOOGLE_MAPS_KEY }) => {
    const [message, setMessage] = useState(null);
    const { t, i18n } = useTranslation();
  
    useEffect(() => {
      const initializeFirebase = async () => {
        if (await isFirebaseSupported()) {
          const messaging = initialize();
          Notification.requestPermission()
            .then(() => {
              getToken(messaging, {
                vapidKey:
                  "BOpVOtmawD0hzOR0F5NQTz_7oTlNVwgKX_EgElDnFuILsaE_jWYPIExAMIIGS-nYmy1lhf2QWFHQnDEFWNG_Z5w",
              })
                .then((token:any) => {
                  localStorage.setItem("messaging-token", token);
                })
                .catch((err:any) => {
                  console.log("getToken error", err);
                });
            })
            .catch(console.log);
  
          onMessage(messaging, function (payload:any) {
            // Customize notification here
            const { title, body } = payload.notification;
          
            
          });
        }
      };
      initializeFirebase();
    }, [t, i18n]);
  
    const handleClose = () => {
      setMessage(null);
    };
  
    const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: GOOGLE_MAPS_KEY,
      libraries: LIBRARIES,
    });
    console.log("isLoaded ", isLoaded);
    if (!isLoaded) {
      return (
     <LoadingSpinner/>
      );
    }
  
    return (
      <>
        {children}
        {/* <FlashMessage
          severity={"info"}
          alertMessage={message}
          open={message !== null}
          handleClose={handleClose}
        /> */}
      </>
    );
  };

  export default GoogleMapsLoader;