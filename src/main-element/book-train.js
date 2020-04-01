import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
class BookTrain extends PolymerElement {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
    }
  </style>
    <h1>BookTrain</h1>
    `;
  }
}

window.customElements.define('book-train', BookTrain);