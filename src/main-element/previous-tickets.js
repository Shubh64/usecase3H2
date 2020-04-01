import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import './ajax-call.js';
import './shared-styles.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-card/paper-card.js';
/**
 * @customElement
 * @polymer
 */
class PreviousTickets extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        paper-card{
          width:50%;
        }
        h4{
          font-weight:lighter;
        }
      </style>
      <ajax-call id="ajax"></ajax-call>
      <app-location route="{{route}}"></app-location>
      <paper-button on-click="_handleBack"><iron-icon icon="icons:arrow-back"></iron-icon></paper-button>
      <h3>Booking Details</h3>
      <paper-card>
      <h3>Travellers Details</h3>
      <table>
      <thead id="tableHead">
         <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
      </tr>
      </thead>
        <tbody>
          <template is="dom-repeat" items={{travellerDetails}}>
          <tr>
            <td>{{item.travellerName}}</td>
            <td>{{item.age}}</td>
            <td>{{item.gender}}</td>
        </tr>
      </template>
    </tbody>
  </table>
  <h3>Train Details</h3>
  <h4>TrainName:{{trainDetails.trainName}}</h4>
  <h4>TrainNo:{{trainDetails.trainNo}}</h4>
  <h4>From:{{trainDetails.from}}</h4>
  <h4>Destination:{{trainDetails.destination}}</h4>
  <h4>DepartureTime:{{trainDetails.departureTime}}</h4>
  <h4>ArrivalTime:{{trainDetails.arrivalTime}}</h4>
  </paper-card>
    `;
  }
  static get properties() {
    return {
      ler: {
        type: Array,
        value: []
      },
      trainDetails: {
        type: Object,
        value: {}
      },
      totalPrice: {
        type: Number,
        value: 0
      }
    };
  }
  ready() {
    //listening custom events sent as a response by makeAjaxCall 
    super.ready();
    this.addEventListener('ajax-response', (e) => this._ajaxResponse(e))
  }
  connectedCallback() {
    super.connectedCallback();
    this.userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    let userName=this.userDetails[0].userName
    this.$.ajax._makeAjaxCall('get',`http://localhost:3000/bookedTickets?userName=${userName}`,null,'ajaxResponse')  
  }
  /**
   * 
   * @param {*} event 
   */
  _ajaxResponse(event) {
    this.travelDetails = event.detail.data
    this.travellerDetails=this.travelDetails[0].travellerDetails
    this.trainDetails=this.travelDetails[0].trainDetails
  }
  _handleBack() {
    this.set('route.path', '/book')
  }
}

window.customElements.define('previous-tickets', PreviousTickets);