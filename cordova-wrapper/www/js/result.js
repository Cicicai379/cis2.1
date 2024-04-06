import { db } from './firebaseConfig.js';
import {
  collection,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js';
function getQueryParams() {
  var queryParams = {};
  location.search
    .substring(1)
    .split('&')
    .forEach(function (paramPair) {
      const pair = paramPair.split('=');
      queryParams[pair[0]] = decodeURIComponent(pair[1]);
    });
  return queryParams;
}

document.addEventListener('DOMContentLoaded', () => {
  // Your code here
  var params = getQueryParams();
  var searchValue = params.search;
  var filterValue = params.category;

  console.log(filterValue);

  getDocs(collection(db, 'items'))
    .then((querySnapshot) => {
      const itemList = document.getElementById('result'); // Get the container element
      let i = 0;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
          console.log(data.category);
          if (
            (typeof searchValue !== 'undefined' && String(data.name).toLowerCase().includes(searchValue.toLowerCase())) ||
            (typeof searchValue !== 'undefined' && String(data.category).toLowerCase().includes(searchValue.toLowerCase()))||
            ( typeof filterValue !== 'undefined' && String(data.category).toLowerCase().includes(filterValue.toLowerCase()))
          ) {
            const div = document.createElement('div'); // Create a new div element
            div.innerHTML = `

        <div style="width: 110px; height: 177px; padding-bottom: 25px; left: ${Math.floor(i % 3) * 126}px; top: ${Math.floor(i / 3) * 170 + 45}px; position: absolute; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 8px; display: inline-flex">
          <div style="width: 110px; height: 110px; background: #F6F6F6; border-radius: 8px"></div>
          <div style="top: 120px;position: absolute; width: 110px; color: black; font-size: 14px; font-family: Inter; font-weight: 600; word-wrap: break-word">${data.name}</div>
          <div style="position:relative; top:22px;width: 110px; color: black; font-size: 14px; font-family: Inter; font-weight: 400; word-wrap: break-word">${data.quantity}</div>
        </div>
      `;
            itemList.appendChild(div); // Append the div to the container element
            i = i + 1;
          }

      });
    })
    .catch((error) => {
      console.error('Error getting documents: ', error);
    });
});
