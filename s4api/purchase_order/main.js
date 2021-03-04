
var ajaxPromisify = (url, type, data, headers) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      type,
      data,
      contentType: 'application/json',
      headers,
      // xhrFields: {
      //   withCredentials: true
      // },
      crossDomain: true,
      success: function (response, status, xhr) {
        resolve({ response, status, xhr })
      },
      error: function (response, status, xhr) {
        const err = new Error('xhr error')
        err.status = xhr.status
        reject(err)
      }
    })
  })
}

const SERVICE_END_POINT = 'http://localhost:3500/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV';

(function () {
  const template = document.createElement('template')
  template.innerHTML = `
      <style>
      </style>
      <div id="root" style="width: 100%; height: 100%;">
      </div>
    `
  class MainWebComponent extends HTMLElement {
    // ------------------
    // Scripting methods
    // ------------------

    async post (path, jsonString) {
      const { response } = await ajaxPromisify(`${SERVICE_END_POINT}${path}`, 'POST', jsonString)
      return response.statusCode
    }
  }

  customElements.define('com-sap-sample-s4api-purchaseorder', MainWebComponent)
})()