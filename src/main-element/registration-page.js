import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-toast/paper-toast.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/app-route/app-location.js';
import './shared/paper-loader.js';
/**
 * @customElement
 * @polymer
 */
class RegistrationPage extends PolymerElement {
  static get template() {
    return html`
      <style>
        main{
          border-radius:8px;
          background-color:#f5f6ff;
          width:30%;
          height:20%;
          align-self:center;
        }
        iron-form{
          padding:20px;
        }
      #loginBtn{
          color:blue;
          cursor:pointer;
        }
        paper-button{
            background-color: #667db6;
            color: white;
          margin-top:20px;
          width: 100%;
        }
        #container{
          display:flex;
          justify-content:center;
          margin-top:3%;
        }
        h1{
            justify-self: center;
            color: white;
        }
        iron-icon{
            color:red;
        }
        header{
            display: grid;
            grid-template-columns: 250px 1fr 1fr 100px 30px;
            grid-template-rows: 100px;
            height: 100px;
            width: 100%;
            background-color: #000000; 
       }
       /* #logout{
           grid-row: 1/2;
           grid-column: 4/5;
       } */
       #heading{
           margin: 10px;
           font-size: 1.4em;
           grid-row: 1/2;
           grid-column: 1/2;
       }
      </style>
      <app-location route={{route}}></app-location>
      <iron-ajax id="ajax" on-response="_handleResponse" on-error="_handleError" handle-as="json" content-type="application/json"> </iron-ajax>
      <div id="container">
      <main>
      <iron-form id="register">
      <form>
      <paper-input auto id="name" required type="text" allowed-pattern=[a-zA-Z] label="Enter Name" > </paper-input>
      <paper-input auto id="email" required type="email" error-message="Email Id must contain '@' symbol" name="emailIs"  label="Enter Email Id" > </paper-input>
      <paper-radio-group selected="Male" id="gender">
          <label for="Gender">Gender</label>
          <paper-radio-button name="Male">Male</paper-radio-button>
          <paper-radio-button name="Female">Female</paper-radio-button>
        </paper-radio-group>
      <paper-input auto id="mobileNumber" required name="mobileNumber" allowed-pattern=[0-9] label="Enter Contact Number" minlength="10" maxlength="10"> </paper-input>
      <paper-input auto id="password" required name="password" type="password" label="Enter Password"></paper-input>
      <paper-input auto id="address" required name="address" type="text" label="Enter City"></paper-input>
      <paper-button raised id="registerBtn" on-click="_handleRegister">Register</paper-button>
      <sub>Already Registered?<a id="loginBtn" on-click="_handleLogin">Login</a></sub>
      </form>
        </iron-form>
      </main>
      </div>
      <paper-toast id="toast" text={{message}}></paper-toast>
      <paper-loader loading={{loading}}></paper-loader>
    `;
  }
  static get properties() {
    return {
      message:{
          type:String,
          value:''
      }
    };
  }
   /**
    * validation of the user form is done and then registration
    */
  _handleRegister() {

    if (this.$.register.validate()) {
      let userObj = {userName:this.$.name.value,gender:this.$.gender.selected,emailId:this.$.email.value, mobileNumber:parseInt(this.$.mobileNumber.value), password:this.$.password.value ,address:this.$.address.value};
      console.log(userObj);
      this._makeAjaxCall('post',`${baseUrl}/users`,userObj,'ajaxResponse');
      this.loading="true";
      this.message='Registration Successful'
      this.$.toast.open();
    }
  }
/**
   * @description:handle diferent  ajax calls  
  *@param {String} url url of specific location
  *@param {String} method method type:get/put/post/delete
  *@param {Object} postObj needs object as value for put/post and null for get/delete
  *@param {Boolean} sync true for synchronization and false for asynchronization
  **/
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
    this.message="Successfully Registered";
      this.$.toast.open();
      this.loading="false";
    this.$.register.reset();
  }
  /**
   * when the lodin button is clicked
   */
  _handleLogin(){
    this.set('route.path','/login')
  }
}

window.customElements.define('registration-page', RegistrationPage);