export function useProvider(optionalCallback: any = noop) {

  const providers = (validationType: string, isComplete: any) => {
    /**
     * Request to get all providers for a validation type e.g. email
     */

      async function getData(url:any, validationType:string) {

        const response = await fetch(url + validationType, {
          method: 'GET',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Authorization': `${process.env.REACT_APP_BACKEND_API_KEY}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer'
        });

        return response.json();
      }


      getData(`${process.env.REACT_APP_GET_PROVIDERS_BY_VALIDATION_TYPE}`, validationType)
        .then(response => {
          if(response.meta.code === 200) {
            optionalCallback(response.data);  
          }
        },() => {
      });

  }
  return [providers] as [(obj:any, obj1:any) => boolean]
}

function noop() {}