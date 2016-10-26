function saveOptions() {

    var comp1 = document.getElementById('competitor1').value;
    var comp2 = document.getElementById('competitor2').value;
    var comp3 = document.getElementById('competitor3').value;
    var comp4 = document.getElementById('competitor4').value;
    var comp5 = document.getElementById('competitor5').value;

    chrome.storage.sync.set({
        'sites': {
        	'site1': comp1,
        	'site2': comp2,
        	'site3': comp3,
        	'site4': comp4,
            'site5': comp5
        }
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

document.getElementById('save').addEventListener('click', saveOptions);

document.getElementById('clear').addEventListener('click', clearStorage);

function clearStorage() {
    chrome.storage.sync.clear(function() {
        var status = document.getElementById('status');
        status.textContent = 'Sites reset.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}