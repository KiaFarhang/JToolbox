'use strict';


var competitorSearch = document.getElementById('competitorSearch');
var dictionarySearch = document.getElementById('dictionarySearch');

competitorSearch.addEventListener('submit', searchGoogle);
dictionarySearch.addEventListener('click', searchDictionary);

function searchGoogle() {

    var searchQuery = competitorSearch.elements[0].value.replace(/\s/g, '+');

    var siteString = '';

    var sitesArray = [];

    var storageSearch = 'site:';

    chrome.storage.sync.get('sites', function(data) {
        var sites = data.sites;
        for (var key in sites) {

            if (sites[key] != '') {
                sitesArray.push(sites[key]);
            }
        }

        siteString = sitesArray.join(' OR site:');

        var searchString = 'https://google.com/#q=' + searchQuery + '+' + 'site:' + siteString;

        var properties = {
            url: searchString,
            active: true
        };

        chrome.tabs.create(properties);

    });

}

function searchDictionary() {

    var text = document.getElementById('wordSearch').value;

    var xhrString = 'https://wordsapiv1.p.mashape.com/words/' + text + '/definitions';
    var key = 'qX2lNxi2wfmshg2v3o2eIDfXOPVTp1RVxaCjsnzhO7HW4yczcC';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', xhrString);
    xhr.setRequestHeader('X-Mashape-Authorization', key);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);
        }
    }

    xhr.send();

}
//Mashape WordsAPI Key qX2lNxi2wfmshg2v3o2eIDfXOPVTp1RVxaCjsnzhO7HW4yczcC   


// var links = document.getElementById('searchList').getElementsByTagName('a');

// for (var i = 0; i < links.length; i++) {
//     links[i].addEventListener('click', toggleInput);
// }

// function toggleInput(e) {

//     // if (e.target.nextSibling == null) {
//     //     // var input = document.createElement('input');
//     //     // input.setAttribute('type', 'text');

//     //     // e.target.parentElement.appendChild(input);

//     //     console.log('work');

//     // } else {
//     //   console.log('eh');
//     // }

//     var a = e.target;
//     alert(a + 'asda');

// }
