import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import './shared-styles.js';
import '@polymer/iron-icon/iron-icon.js'
import '@polymer/app-route/app-location.js';

/**
 * @customElement
 * @polymer
 */
class TicketSummary extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
        }
        .details
        {
            font-size:1.2em;
            font-family:sans-serif;
            margin:2px;
        }
        button
        {
          cursor:pointer;
        }
      </style>
      <app-location route="{{route}}"></app-location>
      <paper-button on-click="_handleBack"><iron-icon icon="icons:arrow-back"></iron-icon></paper-button>
      <div id="bookingSummary">
        <h3>Booking Summary</h3>
        <ul class="details">
        <li>Train Name : {{trainDetails.trainName}}</li>
        <li>Departure Time : {{trainDetails.departureTime}}</li>
        <li>Arrival Time : {{trainDetails.arrivalTime}}</li>
        <li>Travel Date: {{trainDetails.date}}</li>
        <li>Total Price : {{totalPrice}} INR</li>
        </ul>
      </div>
      <h3>Travellers Details</h3>
      <table id="table">
      <thead id="tableHead">
         <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
      </tr>
      </thead>
        <tbody>
          <template is="dom-repeat" items="{{travelDetail}}" >
          <tr>
            <td>{{item.travellerName}}</td>
            <td>{{item.age}}</td>
            <td>{{item.gender}}</td>
        </tr>
      </template>
    </tbody>
  </table>
  
    `;
  }
  static get properties() {
    return {
      travelDetail: {
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
  connectedCallback() {
    super.connectedCallback();
    this.travelDetail = JSON.parse(sessionStorage.getItem('travelDetail'));
    this.trainDetails = JSON.parse(sessionStorage.getItem('trainDetails'))
    this.totalPrice = parseFloat(this.travelDetail.length, 10) * parseFloat(this.trainDetails.price, 10)
  }
  /**
   * @description: _handleBack() is fired when back button is clicked
   */
  _handleBack() {
    this.set('route.path', '/book')
  }
}

window.customElements.define('ticket-summary', TicketSummary);