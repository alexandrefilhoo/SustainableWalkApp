import axios from 'axios';

export function storeSustainableWalkAppData(sustainableData){
    axios.post(
      "https://sustainable-walk-app-default-rtdb.europe-west1.firebasedatabase.app/sustainableWalkData.json",
      sustainableData


    );
}