import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
class TicketSummary extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
    }
  </style>
    <h1>Summaryt</h1>
    `;
  }
}

window.customElements.define('ticket-summary', TicketSummary);