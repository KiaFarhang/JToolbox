function save_options(){
	var comp1 = document.getElementById('competitor1').value;
	var comp2 = document.getElementById('competitor2').value;

	chrome.storage.sync.set({
		competitorOne: comp1,
		competitorTwo: comp2
	}, function(){
		var status = document.getElementById('status');
		status.textContent = 'Options saved.';
		setTimeout(function(){
			status.textContent = '';
		}, 750);
	});
}

document.getElementById('save').addEventListener('click', save_options);