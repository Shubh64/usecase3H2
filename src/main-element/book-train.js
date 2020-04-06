import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-route/app-location.js';
import '@polymer/iron-ajax/iron-ajax.js'
import '@polymer/paper-checkbox/paper-checkbox.js'
import './shared/shared-styles.js';
import '@polymer/paper-toast/paper-toast.js';
import '@vaadin/vaadin-date-picker/vaadin-date-picker.js'

/**
* @customElement
* @polymer
*/
class BookTrain extends PolymerElement {
    static get template() {
        return html`
<style include="shared-styles">
    :host {
        display: block;
        margin:0px;
        padding:0px;
        box-sizing: border-box;
        font-size: 1.2em;
    }
    table
    {
      border-collapse: collapse;
        width: 100%;
        margin-top:5px;
    }
        th, td {
                  padding: 10px; 
               }
               tr
               {
                 font-weight: bolder;
               }
               
               tr:nth-child(even) 
               {
                 background-color: #f2f2f2;
               }
               th
               {
                 color:black;
                 font-weight: bolder;
                 text-align: left;
                 background-color:skyblue;
               }
    #myBookings
    {
    height:40px;
    font-size: 1em;
    border:2px solid gray;
    padding-left:5px;
    }
    #myBookings,#booking-btn
    {
        float:right;
    }
    #noOfTraveller
    {
        top:0%;
        width: 120px;
        background:white;
        padding-left:10px;
    }
    .wrapper {
        background: #f5f6ff;
        width:100%;
        height: auto;
    }
    ul {
        display: inline-flex;
        list-style: none;
        align-items: flex-start;
        
    }
    ul li 
    {
        padding:15px;
        margin-right: 10px;
    }
    ul li input
    {
        height:40px;
        font-size: 1em;
    }
    #from
    {
        width:110px;
    }
    #destination
    {
        width:110px;
    }
    #search
    {
        margin-top:20px;
        display: flex;
        justify-content: center;
    }
    myBookings{
        float:right;
        display:inline;
    }
</style>
<iron-ajax id="ajax" on-response="_handleResponse" on-error="_handleError" handle-as="json" content-type="application/json"> </iron-ajax>
<app-location route="{{route}}"></app-location>
<paper-button id="myBookings" on-click="_handleMyBookings" raised>My Bookings</paper-button>
<!--Test doc's -->
<nav class="wrapper">
    <ul >
        <li><input id="from" type="text" placeholder="From"/></li>
        <li><iron-icon icon=icons:compare-arrows></iron-icon></li>
        <li><input id="destination" type="text" placeholder="To" /></li>
        <li><label for="noOfTraveller">No. of travellers</label></li>
        <li>
            <paper-dropdown-menu id="noOfTraveller" name="noOfTraveller" vertical-offset="0">
                <paper-listbox slot="dropdown-content" class="dropdown-content" selected=0>
                    <paper-item>1</paper-item>
                    <paper-item>2</paper-item>
                    <paper-item>3</paper-item>
                    <paper-item>4</paper-item>
                    <paper-item>5</paper-item>
                    <paper-item>6</paper-item>
                </paper-listbox>
            </paper-dropdown-menu>
            <li><label for="date">Date</label></li>
            <li><vaadin-date-picker id="date"></vaadin-date-picker></li>
        </li>
    </ul>
</nav>
<div id="search">
<paper-button id="searchBtn" on-click="_handleSearch" raised>Search</paper-button>
</div>
<table class="table" id="table">
    <thead>
        <tr>
            <th>Train Name</th>
            <th>Train Number</th>
            <th>Arrival Time Time</th>
            <th>Departure Time</th>
            <th>Distance</th>
            <th>Price</th>
            <th>Date</th>
            <th>Book Now</th>
        </tr>
    </thead>
    <template is="dom-repeat" items={{trainsList}}>
    <tbody class="Data">
                <td>{{item.trainName}}</td>
                <td>{{item.trainNo}}</td>
                <td>{{item.arrivalTime}}</td>
                <td>{{item.departureTime }}</td>
                <td>{{item.distance}}</td>
                <td>{{item.price}}</td>
                <td>{{item.date}}</td>
                <td><paper-button on-click="_handleBook" raised>Book Now</paper-button></td>
                </tbody>
                </template>
        </table>
        <paper-toast id="toast" text={{message}}></paper-toast>

`;
    }
 
    static get properties() {
        return {
            TrainsList: {
                type: Array,
                value: []
            },
            data: {
                type: Object,
                value: {}
            },
            finalDate: String,
            from: String,
            destination: String,
            noOfTraveller: Number,
        };
    }

    //_handleSearch is invoked when user clicks on search button
    _handleSearch() {
        this.from = this.$.from.value;
        this.destination = this.$.destination.value;
        this.date=this.$.date.value;
        console.log(this.date)
        this.noOfTraveller = parseInt(this.$.noOfTraveller.value, 10);
        let travellerDetails = []
        this.data = { from: this.from, destination: this.destination, finalDate: this.finalDate }
        for (let i = 0; i < this.noOfTraveller; i++) {
            let obj = { name: ""                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   , gender: "", age: "" };
            travellerDetails.push(obj);
        }
        sessionStorage.setItem('travellerDetails', JSON.stringify(travellerDetails));
        this._makeAjaxCall("get", `${Window.baseUrl}/trains?departure=${this.destination}&arrival=${this.from}&date=${this.date}`, null, 'ajaxResponse')
    }
   
    /**
     * 
     * @param {*} event 
     */
    _handleBook(event) {
        sessionStorage.removeItem('trainDetails')
        this.data.trainName = event.model.item.trainName
        this.data.departureTime = event.model.item.departureTime
        this.data.arrivalTime = event.model.item.arrivalTime
        this.data.price = event.model.item.price
        this.data.trainNo = event.model.item.trainNo,
        this.data.date = event.model.item.date,
        sessionStorage.setItem('trainDetails', JSON.stringify(this.data))
        this.set('route.path', '/tickets')
    }
    _makeAjaxCall(method, url, obj, action) {
        const ajax = this.$.ajax;
        this.action = action
        ajax.body = obj ? JSON.stringify(obj) : undefined;
        ajax.method = method;
        ajax.url = url;
        ajax.generateRequest();
      }
    
    /**
     * @description: Fired everytime when ajax call is made.It handles response of the ajax 
     * @param {*} event 
     */
      _handleResponse(event) {
          let data=event.detail.response;
          if(data.length!=0){
            this.trainsList = event.detail.response;
          }
          else{
            this.message='No trains Found'
            this.$.toast.open();
          }
        

      }
    _handleMyBookings() {
        this.set('route.path', './bookings')
    }
}


window.customElements.define('book-train', BookTrain);