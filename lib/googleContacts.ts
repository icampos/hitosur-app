/*import {google} from 'googleapis'
import path from 'path';

const keyFile = path.join(__dirname, "credentials.json")
const scopes = [
    "https://www.googleapis.com/auth/contacts"
]

export const run = async() => {
    const { people } = google.people({
        version: "v1",
        auth: await google.auth.getClient({
            keyFile,
            scopes
        })
    }) 

    const response = await people.connections.list({
        resourceName: 'people/me',
        personFields: "names"
    })

    console.log(response)
}*/
//@ts-ignore
export const { gapi } = window;

export const run  = ()=>{
    console.log(window)
}
/*
gapi.client.init({
    'apiKey': 'YOUR_API_KEY',
    // Your API key will be automatically added to the Discovery Document URLs.
    'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
    // clientId and scope are optional if auth is not required.
    'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    'scope': 'profile',
  }).then(function() {
    // 3. Initialize and make the API request.
    return gapi.client.people.people.get({
      'resourceName': 'people/me',
      'requestMask.includeField': 'person.names'
    });
  }).then(function(response) {
    console.log(response.result);
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
};
// 1. Load the JavaScript client library.
gapi.load('client', start);*/