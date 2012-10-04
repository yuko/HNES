// Add event listeners
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  console.log('REQUEST', request.method, request)
  if (request.method == "getAllLocalStorage") {
    sendResponse({data: localStorage});
  }
  else if (request.method == "getLocalStorage") {
    sendResponse({data: localStorage[request.key]});
  }
  else if (request.method == "setLocalStorage") {
    localStorage[request.key] = request.value;
    sendResponse({});
  }
  else {
    sendResponse({});
  }
});

//expire old entries
(function() {
  for (i=0; i<localStorage.length; i++) {
    var info = JSON.parse(localStorage[localStorage.key(i)]);
    var now = new Date().getTime();
    if (now > info.expire)
      localStorage.removeItem(localStorage.key(i));
  }
});
