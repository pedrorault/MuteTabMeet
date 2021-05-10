// ==UserScript==
// @name         MutePersonMeet
// @version      0.1
// @match        https://meet.google.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
  main("Full name from someone on the list", 2000); //2 seconds

  function main(nome, interval){
    //The participant list must be open.
    //The person can't have more than 1 entry in the list (like Presenting and talking)
    setInterval(() => {
      console.log("checking...");
      if(isTalking(getListItem(getPerson(nome)))){
        muteTab(true);
        console.log("Muted tab")
      }else{
        muteTab(false);
        console.log("Unmuted tab")
      }
    }, interval)
  }
  function getPerson(name){
    const span = Array.from(document.getElementsByTagName("span")).filter(a => a.innerHTML == name)[1]
    return span;
  }

  function getListItem(element){
    while (element && element.parentNode) {
      element = element.parentNode;
      if (element.tagName && element.tagName.toLowerCase() == "div" && element.attributes?.role?.value == "listitem") {
        return element;
      }
    }
  }
  function isTalking(listitem){
    const divTalk = listitem.children[1].children[0].children[0];
    const text = divTalk.attributes.getNamedItem("data-tooltip").value;
    if(text.toLowerCase().includes("desativar")){
      return true;
    }
    return false;
  }

  function muteTab(muteBool){
    Array.from(document.querySelectorAll('audio')).map(x => {
        x.muted = muteBool;
    })
  }
})();