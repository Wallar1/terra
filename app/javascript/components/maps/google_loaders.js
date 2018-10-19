import axios from 'axios';
require('babel-polyfill');


// Load Google API in script tag and append 
const loadScript = async (src) => {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', function() {
      resolve();
    });
    script.addEventListener('error', function(e) {
      reject(e);
    });
    if(true){
      document.body.appendChild(script);
    }
  });
}


export {
  loadScript
}