import '@polymer/polymer/polymer-element.js';
const template = document.createElement('template');
template.innerHTML = `<dom-module id="shared-styles">
  <template>
    <style>
    :host {
        display: block;
      }
      table, th, td,tr{
        border: 1px solid black;
        border-collapse: collapse;
        padding: 10px;
        font-weight: bolder;
      }
      tr{
          cursor: pointer;
      }
      table{
          margin-top:10px;
        width: 100%;
      }
      th{
        color:white;
        font-weight: bolder;
        text-align: left;
        background-color:blueviolet;
      } 
      tr:nth-child(even) 
      {
        background-color: #f2f2f2;
      }
    </style>
  </template>
</dom-module>`;

document.head.appendChild(template.content);