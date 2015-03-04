//working copy
chrome.extension.sendRequest({method: "firstname"}, function(response) {
  alert(response.status);
});
