import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-card/paper-card.js'
import '@polymer/app-route/app-location.js';
import '@polymer/iron-icon/iron-icon.js'
import './ajax-call.js';
import '@polymer/paper-toast/paper-toast.js';
/**
 * @customElement
 * @polymer
 */
class BookTickets extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        #tableHead{
          font-size: 18px;
         text-align: center;
        }
        #name,#age,#gender,#email{
          margin-left: 20px;
        }
        #gender{
          margin-top:26px;
        }
        button
        {
            cursor:pointer;
        }
      </style>
      <ajax-call id="ajax"></ajax-call>
      <app-location route="{{route}}"></app-location>
      <button on-click="_handleBack"><iron-icon icon="icons:arrow-back"></iron-icon></button>
    <h2>Enter your Details</h2>
    <table>
    <thead id="tableHead">
       <tr>
        <td>Name</td>
        <td>Age</td>
        <td>Gender</td>
    </tr>
    </thead>
      <tbody>
        <template is="dom-repeat" items={{travellers}}>
        <tr>
          <td><paper-input class="name" > </paper-input></td>
          <td> <paper-input allowed-pattern=[0-9] class="age" > </paper-input></td>
          <td><paper-radio-group class="gender">
            <paper-radio-button name="male">Male</paper-radio-button>
            <paper-radio-button name="female">Female</paper-radio-button>
          </paper-radio-group></td>
      </tr>
    </template>
  </tbody>
</table>
    <paper-button raised on-click="_handleClick">Confirm Booking</paper-button> 
    <paper-toast text={{message}} id="toast"></paper-toast>
    `;
  }
  static get properties() {
    return {
      travellers: {
        type: Array,
        value: []
      },
      travellerDetails: {
        type: Array,
        value: []
      }
    };
  }

  connectedCallback() {
    super.connectedCallback();
    window.location.reload();
    /*getting the no. of travellers from session storage 
 *displaying no. of properties to get the data of travellers accordingly
 */

    this.travellers = JSON.parse(sessionStorage.getItem('travellerDetails'));
    this.trainDetails = JSON.parse(sessionStorage.getItem('trainDetails'));
  }
  /*getting the details of travellers on clicking Book Now button 
  *creating a object of all the travellers and pushing it to session storage
  */
  _handleClick() {
    sessionStorage.removeItem('travelDetail');
    let name = this.shadowRoot.querySelectorAll('.name');
    let age = this.shadowRoot.querySelectorAll('.age');
    let gender = this.shadowRoot.querySelectorAll('.gender');
    for (let i = 0; i < this.travellers.length; i++) {
      let obj = { travellerName: name[i].value, gender: gender[i].selected, age: parseInt(age[i].value) };
      this.travellerDetails.push(obj);
    }
    this.userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    console.log(this.userDetails)
    let userName=this.userDetails[0].userName
    console.log(userName)
    let postObj={userName,travellerDetails:this.travellerDetails,trainDetails:this.trainDetails}
    sessionStorage.setItem('travelDetail', JSON.stringify(this.travellerDetails));
    this.$.ajax._makeAjaxCall('post',`http://localhost:3000/bookedTickets`,postObj,'ajaxResponse')  
    this.message='Booking Confirmed';
    this.$.toast.open();
    this.set('route.path', '/summary')
  }
  _handleBack() {
    this.set('route.path', '/book')
  }
  ready()
  {
    super.ready();
    this.addEventListener('ajax-response',(e)=>this._ajaxResponse(e))
  }
  _ajaxResponse()
  {
    
    this.$.toast.open();
    this.message="Booking Successful"
}
}

window.customElements.define('book-tickets', BookTickets);