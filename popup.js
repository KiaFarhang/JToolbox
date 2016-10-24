'use strict';

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
//     // 	console.log('eh');
//     // }

//     var a = e.target;
//     alert(a + 'asda');

// }

var competitorSearch = document.getElementById('competitorSearch');

competitorSearch.addEventListener('submit', searchGoogle);


function searchGoogle() {
    var searchQuery = competitorSearch.elements[0].value.replace(/\s/g, '+');

    chrome.storage.sync.get('competitorOne', function(data) {
        var searchSite = data.competitorOne;

        var searchString = 'https://google.com' + '/#q=' + searchQuery + "+" + 'site:' + searchSite;


        var properties = {
            url: searchString,
            active: true
        };
        chrome.tabs.create(properties);


    });




    // chrome.tabs.create('https://mail.google.com', true);

    // chrome.StorageArea.get('competitorOne', function(data){
    // 	alert(data);
    // });

    // chrome.storage.sync.get('competitorOne', function(data){
    // 	// alert(JSON.stringify(data.competitorOne));
    // 	alert(typeof data.competitorOne);
    // });
}






// https://www.google.com/#q=steve
