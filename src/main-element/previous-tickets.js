import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
class PreviousTickets extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
    }
  </style>
    <h1>Booked</h1>
    `;
  }
}

window.customElements.define('previous-tickets', PreviousTickets);