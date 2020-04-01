import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
class TrainList extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
    }
  </style>
    <h1>train list</h1>
    `;
  }
}

window.customElements.define('train-list', TrainList);