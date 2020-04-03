import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/iron-ajax/iron-ajax.js'
import '@polymer/app-route/app-location.js';
import './shared/paper-loader.js';
/**
 * @customElement
 * @polymer
 */
class LoginPage extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
      height:80.8vh;
      overflow-y:hidden;
      background-size:cover;
      background-color:#f5f6ff;
    }
    img{
      margin-top:20px;
      margin-bottom: 0;
      width:150px;
      height:50px
    }
    #google{
      float: right;
    }
    paper-button{
      background-color: darkblue;
      color: whitesmoke;
    }
    #form
    {
      background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
      width:40%;
      margin:70px auto;
      padding:15px;
      box-shadow:0px 0px 5px 5px grey;
    }
    #registerBtn{
      color:blue;
      cursor:pointer;
    }
    span{
      display:flex;
      margin-top: 10px;
      justify-content: center;
    }
  </style>
  <paper-loader loading={{loading}}></paper-loader>
  <app-location route={{route}}></app-location>
  <paper-toast text={{message}} id="toast"></paper-toast>
  <iron-ajax id="ajax" on-response="_handleResponse" on-error="_handleError" handle-as="json" content-type="application/json"> </iron-ajax>
  <iron-form id="form">
  <form>
  <paper-input  id="mobileNumber" auto required allowed-pattern=[0-9] minlength="10" maxlength="10" label="Enter mobileNumber"></paper-input>
  <paper-input id="password" auto  required type="password" label="Password"></paper-input>  <span>
  <paper-button on-click="_signIn" raised id="loginBtn">LogIn</paper-button></span>
  <sub>New Here?<a id="registerBtn" on-click="_handleRegister">Register</a></sub>
  </form>
  </iron-form>
 
    `;
  }
  static get properties() {
    return {
      message:{
        type:String,
        value:''
      },
      loading:{
        type:Boolean,
        value:false
      }
    };
  }
  /**
   * listening customEvents sent from child elements
   */
  /**
   * 
   * @param {mouseEvent} event on SignIn click event is fired
   * validate if mobile No. has 10 digits or not
   * get the user details from the database
   */
  _signIn(){
    if(this.$.form.validate()){
      const mobileNumber = this.$.mobileNumber.value;
      const password=this.$.password.value;
      this.loading=true;
     this._makeAjaxCall('get',`${baseUrl}/users?mobileNumber=${mobileNumber}&&password=${password}`,null,'ajaxResponse')  
    }
    else{
    
    this.message="invalid credential"
    this.$.toast.open();
    }
  } 
  /**
   * 
   * @param {*} event 
   * handles the response sent by the database
   * transfer the user on the base of role as customer or staff to respective page
   */
  /**
   * is handle carousel effect on the rendering of login page
   */
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
    this.loading=false;
    const data=event.detail.response;
    console.log(data.length)
    if(data.length!=0){
      sessionStorage.setItem('login',true);
      sessionStorage.setItem('userDetails',JSON.stringify(data));
      this.set('route.path','/book')
  }
  else{
    this.$.toast.open();
    this.message="User Not Found"
  }
  }
  _handleRegister(){
    this.set('route.path','/registration')
  }
}

window.customElements.define('login-page', LoginPage);