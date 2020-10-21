import React, { useEffect } from 'react';
import { IonContent, IonPage, IonSegment, IonSegmentButton, IonTitle,IonGrid,IonRow,IonCol,IonLabel, IonToolbar, IonRefresher, IonRefresherContent, useIonViewWillEnter } from '@ionic/react';
import './Requests.css';

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../store'
import RequestBlocks from './RequestBlocks';
import { setSelectedTabRequests, getIncomingRequests } from '../store/requests';
import { RefresherEventDetail } from '@ionic/core';

import { useRequests } from '../hooks/useRequests'
import { getAllRequests } from '../store/requests'
import { useIncomingRequests } from '../hooks/useIncomingRequests';
import { useProviderServices } from '../hooks/useProviderServices';
import { getProviderServices } from '../store/providers';

const RequestsPage: React.FC = () => {

  const dispatch = useDispatch()  
  const requests = useSelector((state:AppState) => state.requests)
  const user = useSelector((state:AppState) => state.auth.user)  
  const providerServices = useSelector((state:AppState) => state.validationProviders.providerServices)

  const [sendGetProviderServices] = useProviderServices((services:any) => { 
    if(services) {
      console.log(services)
      dispatch(getProviderServices(services))

      console.log("Yeah.. Nailed it2 from Requests Page")
      sendGetIncomingRequests(services.id)         
    }
  }) 

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    sendGetAllRequestsReq(user)
    sendGetIncomingRequests(providerServices.id)

    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  }

  const [sendGetAllRequestsReq] = useRequests((txn:any) => { 
    if(txn) {
      dispatch(getAllRequests(txn))
    }
   })   

   const [sendGetIncomingRequests] = useIncomingRequests((txn:any) => { 
    if(txn) {
      console.log("found incoming txns on requests page")
      console.log(txn)
      dispatch(getIncomingRequests(txn))
    }  
   })

   useIonViewWillEnter(() => {
    sendGetAllRequestsReq(user)    
    // sendGetIncomingRequests("5f7df136a8252d5778d583d8")

    if(!providerServices){
      console.log(providerServices)
      console.log("useIonViewWillEnter Calling the API to get provider services")    
      sendGetProviderServices(user.id)
    }   
   });

   useEffect(() => {
    console.log("Incoming Requests")
    console.log(requests.incoming_txn)
    console.log("Provider Services")
    console.log(providerServices)
    if(!requests.incoming_txn && providerServices && providerServices.validationTypes){
      //sendGetIncomingRequests("5f7df136a8252d5778d583d8")        
      console.log("Yeah.. Nailed it from request page")
      sendGetIncomingRequests(providerServices.id)        
    }
   },
   // eslint-disable-next-line react-hooks/exhaustive-deps
   []
 );

  const handleClick = function(e: any) {
    let tab_event = e.detail.value;
    if(tab_event === 'all'){
      dispatch(setSelectedTabRequests({'name':'all','data':requests.txn}))
    }
    if(tab_event === 'incoming'){
      console.log("Checking incoming requests data while switching the tab")
      console.log(requests)
      dispatch(setSelectedTabRequests({'name':'incoming','data':requests.incoming_txn}))      
    }    
    if(tab_event === 'active'){
      dispatch(setSelectedTabRequests({'name':'pending','data':requests.pending_txn}))      
    }
    if(tab_event === 'approved'){
      dispatch(setSelectedTabRequests({'name':'approved','data':requests.approved_txn}))            
    }
    if(tab_event === 'rejected'){
      dispatch(setSelectedTabRequests({'name':'rejected','data':requests.rejected_txn}))            
    }
    if(tab_event === 'expired'){
      dispatch(setSelectedTabRequests({'name':'expired','data':requests.expired_txn}))            
    }
    // if(tab_event === 'cancelled'){
    //   dispatch(setSelectedTabRequests({'name':'cancelled','data':requests.cancelled_txn}))            
    // }    
  }  

  return (
    <IonPage>
      <IonContent>

        <IonRefresher className="refresher" slot="fixed" onIonRefresh={doRefresh} pullFactor={0.5} pullMin={80} pullMax={200}>
            <IonRefresherContent
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing Requests Status...">
            </IonRefresherContent>
        </IonRefresher>

      <IonToolbar className="sub-header">
          <IonTitle className="ion-text-start">Requests</IonTitle>
        </IonToolbar>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonSegment className="custom-segment" scrollable onIonChange={(e:any) => handleClick(e)}>
          <IonSegmentButton value="all" className={requests.selected_tab_name === 'all' ? 'active-tab' : ''}>
            <IonLabel>All</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="incoming" disabled={requests.incoming_txn == null || requests.incoming_txn.length === 0}>
            <IonLabel>Incoming</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="active" disabled={requests.pending_txn == null || requests.pending_txn.length === 0}>
            <IonLabel>Active</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="approved" disabled={requests.approved_txn == null || requests.approved_txn.length === 0}>
            <IonLabel>Approved</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="rejected" disabled={requests.rejected_txn == null || requests.rejected_txn.length === 0}>
            <IonLabel>Rejected</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="expired" disabled={requests.expired_txn == null || requests.expired_txn.length === 0}>
            <IonLabel>Expired</IonLabel>
          </IonSegmentButton>
          {/* <IonSegmentButton value="cancelled" disabled={requests.cancelled_txn == null || requests.cancelled_txn.length === 0}>
            <IonLabel>Cancelled</IonLabel>
          </IonSegmentButton> */}
        </IonSegment>
          </IonCol>
        </IonRow>

        <RequestBlocks requests={requests.selected_tab_txn || {}} />

      </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(RequestsPage);