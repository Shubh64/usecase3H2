import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/app-route/app-location.js';
import './ajax-call.js';
import '@polymer/paper-checkbox/paper-checkbox.js'
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
<ajax-call id="ajax"></ajax-call>
<app-location route="{{route}}"></app-location>
<paper-button id="myBookings" on-click="_handleMyBookings" raised>My Bookings</paper-button>
<!--Test doc's -->
<nav class="wrapper">
    <ul>
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
        </li>
    </ul>
</nav>
<div id="search">
<paper-button on-click="_handleSearch" raised>Search</paper-button>
</div>
<table class="table">
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
    ready() {
        //listening custom events sent as a response by makeAjaxCall 
        super.ready();
        this.addEventListener('ajax-response', (e) => this._ajaxResponse(e))
      
    }

    //_handleSearch is invoked when user clicks on search button
    _handleSearch() {
        this.from = this.$.from.value;
        this.destination = this.$.destination.value;
        this.noOfTraveller = parseInt(this.$.noOfTraveller.value, 10);
        let travellerDetails = []
        this.data = { from: this.from, destination: this.destination, finalDate: this.finalDate }
        for (let i = 0; i < this.noOfTraveller; i++) {
            let obj = { name: "", gender: "", age: "" };
            travellerDetails.push(obj);
        }
        sessionStorage.setItem('travellerDetails', JSON.stringify(travellerDetails));
        this.$.ajax._makeAjaxCall("get", `http://localhost:3000/trains?departure=${this.destination}&arrival=${this.from}`, null, 'ajaxResponse')
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
    /**
     * @descripTrains populates the list of available flights
     * @param {*} event 
     */
    _ajaxResponse(event) {
        this.trainsList = event.detail.data;
    }
    
    /**
     * 
     */
    _handleMyBookings() {
        this.set('route.path', './bookings')
    }
}


window.customElements.define('book-train', BookTrain);