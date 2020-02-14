const sub = document.getElementById("sub");
const par = document.getElementById("par");
const input = document.getElementById("mess");
const opr = () => {let mess = input.innerHTML;
  if(mess !== "") {
    let div = `<div class="inputBox"><div class="inputMess">${mess}</div></div>`;
    // let newDiv = document.createElement('div');
    // newDiv.setAttribute('class', 'inputMess');
    // newDiv.innerHTML = mess;
    // par.appendChild(newDiv);
    par.innerHTML = par.innerHTML + div;
    input.innerHTML = "";
    fetch('http://wang.norma.shop:8080/api.php?key=free&appid=0&msg=' + mess)
    .then(res => res.json())
    .then(obj => obj.content) 
    .then(fb => {
      let div = `<div class="fbBox"><div class="fbMess">${fb}</div></div>`;
      par.innerHTML = par.innerHTML + div;
    })
  } else {
  }
  input.focus();
}
sub.addEventListener("click", opr);
input.onkeydown = function(event) {
  let e = event || window.event || arguments.callee.caller.arguments[0];
  if(e && e.keyCode==13){
    event.preventDefault();
    opr();
  }
  if (input.innerHTML) {
    sub.disabled = false;
  } else {
    sub.disabled =true;
  }

  par.scrollTop = par.scrollHeight;
}
