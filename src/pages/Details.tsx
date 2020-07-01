import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle,IonListHeader,IonBackButton,IonGrid,IonRow,IonCol,IonLabel,IonToolbar, IonTextarea, IonIcon, IonImg, IonButton, IonButtons } from '@ionic/react';
import './Details.css';
import { arrowBack } from 'ionicons/icons';

import { useSelector } from 'react-redux';
import { AppState } from '../store';
import { useParams } from 'react-router-dom';

const RequestsPage: React.FC = () => {

  const requests = useSelector((state:AppState) => state.requests)
  const validationProviders = useSelector((state:AppState) => state.validationProviders)
  const { id } = useParams()

  const requestDetails = requests.txn.filter((txn: any) => txn.id === id)[0]

  let providerName = '';  
  if(requestDetails.validationType === 'email'){
     providerName = validationProviders.emailValidationProviders.filter((provider:any) => provider.id === requestDetails.provider)[0].name
  }

  const copyText = function (elementId: any){
    let copyText:any = document.querySelector("#" + elementId);
    let inputField = copyText.getElementsByTagName("textarea")[0];
    inputField.select();
    document.execCommand("copy");    
  }

  return (
    <>
    <IonPage className="Details">
      <IonHeader className="main-header">
        <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton icon={arrowBack} text="" />
        </IonButtons>
        <IonImg className="Navbar-Logo" src="/assets/images/ui components/empty.png"></IonImg>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonToolbar className="sub-header">
          <IonTitle className="ion-text-start">Request Details</IonTitle>
        </IonToolbar>
        <IonGrid className="pad-me--top thick-padding">


          <IonRow 
          className={`text-center 
          ${requestDetails.status === "Approved" ? "approved-tooltip" : ""} 
          ${requestDetails.status === "Pending" ? "pending-tooltip" : ""}
          ${requestDetails.status === "Rejected" ? "rejected-tooltip" : ""}
          ${requestDetails.status === "Expired" ? "expired-tooltip" : ""}
          `}>
            <IonCol>
              <IonIcon src=
              {`
                ${requestDetails.status === "Approved" ? "/assets/images/icons/icon-check.svg" : ""} 
                ${requestDetails.status === "Pending" ? "/assets/images/icons/icon-wait.svg" : ""}
                ${requestDetails.status === "Rejected" ? "/assets/images/icons/icon-rejected.svg" : ""}
                ${requestDetails.status === "Expired" ? "/assets/images/icons/icon-expired.svg" : ""}
              `}
              ></IonIcon>
              <IonLabel>
              {`
                ${requestDetails.status === "Approved" ? "Approved" : ""} 
                ${requestDetails.status === "Pending" ? "Waiting for Approval" : ""}
                ${requestDetails.status === "Rejected" ? "Rejected" : ""}
                ${requestDetails.status === "Expired" ? "Expired" : ""}
              `}
              </IonLabel>
            </IonCol>
          </IonRow>


          <IonRow>
            { requestDetails && requestDetails.id &&           
            <IonListHeader className="fieldContainer">
              <IonCol size="4">
                <IonLabel className="label">Request ID</IonLabel>
              </IonCol>
              <IonCol size="8">
                <IonLabel className="value">{requestDetails.id}</IonLabel>
              </IonCol>
            </IonListHeader>
            }            
            { requestDetails && requestDetails.validationType &&           
            <IonListHeader className="fieldContainer">
              <IonCol size="4">
                <IonLabel className="label">Validation Service</IonLabel>
              </IonCol>
              <IonCol size="8">
                <IonLabel className="value">{requestDetails.validationType.charAt(0).toUpperCase()}{requestDetails.validationType.slice(1)} Validation</IonLabel>
              </IonCol>
            </IonListHeader>
            }
            { requestDetails && requestDetails.providerId &&           
            <IonListHeader className="fieldContainer">
              <IonCol size="4">
                <IonLabel className="label">Validator</IonLabel>
              </IonCol>                
              <IonCol size="8">
                <IonLabel className="value">{providerName}</IonLabel>
              </IonCol>                
            </IonListHeader>
            }
            { requestDetails && requestDetails.lastUpdate &&           
            <IonListHeader className="fieldContainer">
              <IonCol size="4">
                <IonLabel className="label">Last Updated</IonLabel>
              </IonCol>  
              <IonCol size="8">
                <IonLabel className="value">{requestDetails.lastUpdate}</IonLabel>
              </IonCol>
            </IonListHeader>
            }
            </IonRow>

            <IonRow>
            <IonListHeader className="fieldContainer fieldContainer2">
            <IonCol size="3">
              <IonLabel className="label">DID</IonLabel>
            </IonCol>            
            <IonCol size="8" className="userdid">
              <IonTextarea rows={2} cols={12} id="userDID" readonly value={requestDetails && requestDetails.did}>
              </IonTextarea>
            </IonCol>
            <IonCol size="1" style={{margin: 'auto'}}>
              <IonIcon name="copy-outline" src="/assets/images/icons/copy-outline.svg" onClick={(e:any) => copyText("userDID")} />
            </IonCol>           
            </IonListHeader> 
            { requestDetails && requestDetails.requestParams.name &&          
            <IonListHeader className="fieldContainer">
              <IonCol size="3">
                <IonLabel className="label">Name</IonLabel>
              </IonCol>
              <IonCol size="9">
                <IonLabel className="value">{requestDetails.requestParams.name}</IonLabel>
              </IonCol>
            </IonListHeader>
            }
            { requestDetails && requestDetails.requestParams.email &&          
            <IonListHeader className="fieldContainer">
              <IonCol size="3">
                <IonLabel className="label">Email</IonLabel>
              </IonCol>
              <IonCol size="9">
                <IonLabel className="value">{requestDetails.requestParams.email}</IonLabel>
              </IonCol>
            </IonListHeader>
            }
            { requestDetails && requestDetails.requestParams.telephone &&          
            <IonListHeader className="fieldContainer">
              <IonCol size="3">
                <IonLabel className="label">Mobile Phone</IonLabel>
              </IonCol>
              <IonCol size="9">
                <IonLabel className="value">{requestDetails.requestParams.telephone}</IonLabel>
              </IonCol>
            </IonListHeader>
            }                        
          </IonRow>
          <IonRow className="text-center">
            <IonCol>
              <IonButton className="signOut text-center" 
              color={requestDetails.status === "Success" ? 'success' : 'medium'}
              disabled={requestDetails.status === "Success" ? false : true}
              >Save Credentials</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
    </>
  );
};

export default RequestsPage;