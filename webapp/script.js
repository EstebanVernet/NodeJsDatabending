var infos = document.getElementById('informations');
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

switch (urlParams.get('status')) {
  case 'success':
  infos.onclick = function() {
    navigator.clipboard.writeText("uploads/batches/"+urlParams.get('destination')+"/");
  }
  infos.style='color:#00FF00;cursor:pointer;';
  infos.innerHTML = "Successfully corrupted :)<br>Click to copy the created folder !"
  break;
  case 'error':
    infos.style='color:red';
    switch (urlParams.get('type')) {
      case 'nofile':
        infos.innerHTML = "You have provided no file :("
        break;
      default:
        infos.innerHTML = "Unknown error :("
    }
  break;
  default:
};
