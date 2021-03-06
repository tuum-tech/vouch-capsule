import {
  TxnState,
  TxnActionTypes,
  EMAIL_VALIDATION_REQUEST_SUCCESS,
  NAME_VALIDATION_REQUEST_SUCCESS,
  TELEPHONE_VALIDATION_REQUEST_SUCCESS,
  GENDER_VALIDATION_REQUEST_SUCCESS,
  LOCATION_VALIDATION_REQUEST_SUCCESS,
  BIRTHDATE_VALIDATION_REQUEST_SUCCESS,
  BIRTHPLACE_VALIDATION_REQUEST_SUCCESS,
  EDUCATION_VALIDATION_REQUEST_SUCCESS,
  OCCUPATION_VALIDATION_REQUEST_SUCCESS,
  WECHAT_VALIDATION_REQUEST_SUCCESS,
  INSTAGRAM_VALIDATION_REQUEST_SUCCESS,
  FACEBOOK_VALIDATION_REQUEST_SUCCESS,
  SNAPCHAT_VALIDATION_REQUEST_SUCCESS,
  TWITTER_VALIDATION_REQUEST_SUCCESS,
  TELEGRAM_VALIDATION_REQUEST_SUCCESS,
  PAYPAL_VALIDATION_REQUEST_SUCCESS,
  ELA_VALIDATION_REQUEST_SUCCESS,
  WEBSITE_VALIDATION_REQUEST_SUCCESS,
  TWITCH_VALIDATION_REQUEST_SUCCESS,
  WEIBO_VALIDATION_REQUEST_SUCCESS,
  GET_ALL_REQUESTS_SUCCESS,
  GET_INCOMING_REQUESTS_SUCCESS,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION,
  SET_SELECTED_TAB_REQUESTS,
  CRED_SAVED_SUCCESS,
  REQUEST_CANCELLED_SUCCESS,
  REQUEST_APPROVED_SUCCESS,
  REQUEST_REJECTED_SUCCESS
} from "./types";

const initialState: TxnState = {
  txn: null,
  selected_tab_txn: null,
  selected_tab_name: null,
  incoming_txn: null,
  pending_txn: null,
  approved_txn: null,
  rejected_txn: null,
  expired_txn: null,
  cancelled_txn: null,
  notification: {
    show: false,
    message: '',
    type: ''
  }
};

export const txnReducer = (
  state = initialState,
  action: TxnActionTypes
): TxnState => {
  const { payload, type } = action;

  switch (type) {
    case EMAIL_VALIDATION_REQUEST_SUCCESS:
    case NAME_VALIDATION_REQUEST_SUCCESS:
    case TELEPHONE_VALIDATION_REQUEST_SUCCESS:
    case GENDER_VALIDATION_REQUEST_SUCCESS:
    case LOCATION_VALIDATION_REQUEST_SUCCESS:
    case BIRTHDATE_VALIDATION_REQUEST_SUCCESS:
    case BIRTHPLACE_VALIDATION_REQUEST_SUCCESS:
    case EDUCATION_VALIDATION_REQUEST_SUCCESS:
    case OCCUPATION_VALIDATION_REQUEST_SUCCESS:
    case WECHAT_VALIDATION_REQUEST_SUCCESS:
    case INSTAGRAM_VALIDATION_REQUEST_SUCCESS:
    case FACEBOOK_VALIDATION_REQUEST_SUCCESS:
    case SNAPCHAT_VALIDATION_REQUEST_SUCCESS:
    case TWITTER_VALIDATION_REQUEST_SUCCESS:
    case TELEGRAM_VALIDATION_REQUEST_SUCCESS:
    case PAYPAL_VALIDATION_REQUEST_SUCCESS:
    case ELA_VALIDATION_REQUEST_SUCCESS:
    case WEBSITE_VALIDATION_REQUEST_SUCCESS:
    case TWITCH_VALIDATION_REQUEST_SUCCESS:
    case WEIBO_VALIDATION_REQUEST_SUCCESS:
      {
        state.txn = null ?? []
        state.pending_txn = null ?? []

        return { ...state, 
          txn: [...state.txn, payload], 
          pending_txn: [...state.pending_txn, payload]
        };
      }
      case SET_SELECTED_TAB_REQUESTS:
        {
          return { ...state, 
            selected_tab_txn: payload.data,
            selected_tab_name: payload.name
          };
        }            
    case GET_ALL_REQUESTS_SUCCESS:
      {
        let pending_txn = payload.filter((txn:any) => (txn.status === "New" || txn.status === "In progress" || txn.status === "Cancelation in progress"));
        let approved_txn = payload.filter((txn:any) => txn.status === "Approved");
        let rejected_txn = payload.filter((txn:any) => txn.status === "Rejected");
        let expired_txn = payload.filter((txn:any) => txn.status === "Expired");
        // let cancelled_txn = payload.filter((txn:any) => txn.status === "Canceled");

        let all_txn = payload.sort((a:any, b:any) => {
          let c:any = new Date(a.date).getTime();
          let d:any = new Date(b.date).getTime();
          return c > d ? 1 : -1;
        });

        pending_txn = pending_txn.sort((a:any, b:any) => {
          let c:any = new Date(a.date).getTime();
          let d:any = new Date(b.date).getTime();
          return c > d ? 1 : -1;
        });


        approved_txn = approved_txn.sort((a:any, b:any) => {
          let c:any = new Date(a.date).getTime();
          let d:any = new Date(b.date).getTime();
          return c > d ? 1 : -1;
        });


        rejected_txn = rejected_txn.sort((a:any, b:any) => {
          let c:any = new Date(a.date).getTime();
          let d:any = new Date(b.date).getTime();
          return c > d ? 1 : -1;
        });
        
        expired_txn = expired_txn.sort((a:any, b:any) => {
          let c:any = new Date(a.date).getTime();
          let d:any = new Date(b.date).getTime();
          return c > d ? 1 : -1;
        });        

        // cancelled_txn = cancelled_txn.sort((a:any, b:any) => {
        //   let c:any = new Date(a.date).getTime();
        //   let d:any = new Date(b.date).getTime();
        //   return c > d ? 1 : -1;
        // });        

        return { 
          ...state, 
          txn: all_txn,
          selected_tab_txn: all_txn, 
          selected_tab_name: 'all',
          // incoming_txn: null, 
          pending_txn: pending_txn, 
          approved_txn: approved_txn,
          rejected_txn: rejected_txn,
          expired_txn: expired_txn,
          // cancelled_txn: cancelled_txn,
        };
      }
      case GET_INCOMING_REQUESTS_SUCCESS:
        {
          let incoming_txn_new = payload.filter((txn:any) => (txn.status === "New" || txn.status === "In progress" || txn.status === "Cancelation in progress"));
          let incoming_txn_history = payload.filter((txn:any) => (txn.status === "Approved" || txn.status === "Rejected"));

          incoming_txn_new = incoming_txn_new.sort((a:any, b:any) => {
            let c:any = new Date(a.date).getTime();
            let d:any = new Date(b.date).getTime();
            return c > d ? 1 : -1;
          });          

          incoming_txn_history = incoming_txn_history.sort((a:any, b:any) => {
            let c:any = new Date(a.date).getTime();
            let d:any = new Date(b.date).getTime();
            return c > d ? 1 : -1;
          });

          return { 
            ...state, 
            incoming_txn: incoming_txn_new.concat(incoming_txn_history), 
          };
        }
    case SHOW_NOTIFICATION:
      {
        return {...state,           
          notification: {
            show: true,
            message: payload.message,
            type: payload.type
          }}
      }
    case HIDE_NOTIFICATION:
      {
        return {...state, 
          notification: {
            show: false,
            message: '', 
            type: ''
          }        
        
        }
      }
      case CRED_SAVED_SUCCESS:
        {
          return { ...state, 
            txn: state.txn.map(
              (t:any) => t.id === payload.data.id ? payload.data : t
            ),
            notification: {
              show: true,
              message: payload.message,
              type: 'success'
            }
          };
        }
      case REQUEST_CANCELLED_SUCCESS:
        {  
          return { ...state, 
            txn: state.txn.map(
              (t:any) => t.id === payload.data.id ? payload.data : t
            ),
            pending_txn: state.pending_txn.filter(
              (t:any) => t.id !== payload.data.id
            ),
            notification: {
              show: true,
              message: payload.message,
              type: 'success'
            }
          };
        }        
        case REQUEST_APPROVED_SUCCESS:        
        {  
            let filtered_txn = null
            let filtered_incoming_txn = null

            if(state.txn) {
              filtered_txn = state.txn.map(
                (t:any) => t.id === payload.data.id ? payload.data : t
              )
            }

            if(state.incoming_txn) {
              filtered_incoming_txn = state.incoming_txn.map(
                (t:any) => t.id === payload.data.id ? payload.data : t
              )              
            }

            return { ...state, 
              txn: filtered_txn || state.txn,
              incoming_txn: filtered_incoming_txn || state.incoming_txn,              
              notification: {
                show: true,
                message: payload.message,
                type: 'success'
              }
            };
          }         
          case REQUEST_REJECTED_SUCCESS:        
          {
            let filtered_txn = null
            let filtered_incoming_txn = null

            if(state.txn) {
              filtered_txn = state.txn.map(
                (t:any) => t.id === payload.data.id ? payload.data : t
              )
            }

            if(state.incoming_txn) {
              filtered_incoming_txn = state.incoming_txn.map(
                (t:any) => t.id === payload.data.id ? payload.data : t
              )              
            }            
            
              return { ...state, 
                txn: filtered_txn || state.txn,
                incoming_txn: filtered_incoming_txn || state.incoming_txn,                              
                // txn: state.txn && state.txn.map(
                //   (t:any) => t.id === payload.data.id ? payload.data : t
                // ),
                // incoming_txn: state.incoming_txn && state.incoming_txn.map(
                //   (t:any) => t.id === payload.data.id ? payload.data : t
                // ),                              
                notification: {
                  show: true,
                  message: payload.message,
                  type: 'success'
                }
              };
          }
    default:
      return state;
  }
};