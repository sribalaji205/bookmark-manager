var arr = [];

document.getElementsByClassName('block')[0].style.display = "none";

if (typeof(localStorage.getItem("arrays")) == 'undefined' || localStorage.getItem("arrays") == null) {
    localStorage.setItem("arrays", "[]");
    console.log("empty")
}


if (arr.length == 0 && localStorage.getItem("arrays").length > 2) {
    arr = JSON.parse(localStorage.getItem("arrays"));
    console.log(typeof(arr))
    console.log(JSON.parse(localStorage.getItem("arrays")));
}


if (localStorage.getItem("arrays").length > 2) {
    var store = JSON.parse(localStorage.getItem("arrays"));
    for (var i = 0; i < store.length; i++) {
        var outer = document.getElementsByClassName('holders')[0];
        var mainInner = document.getElementsByClassName('block')[0];
        var inner = mainInner.cloneNode(true);
        var tag = inner.getElementsByClassName('tag')[0];
        var outertag = inner.getElementsByClassName('tags')[0];
        inner.style.display = "block";
        inner.getElementsByClassName('title')[0].innerHTML += store[i][0];
        if (store[i][1].includes('http')) {
            inner.getElementsByClassName('url')[0].href = store[i][1];
        } else {
            inner.getElementsByClassName('url')[0].href = "https://" + store[i][1];
        }
        inner.getElementsByClassName('url')[0].innerHTML += store[i][1];
        inner.getElementsByClassName('category')[0].innerHTML += store[i][2];
        inner.getElementsByClassName('date')[0].innerHTML += store[i][4];

        tagarr = store[i][3].split(" ");
        console.log(tagarr);
        for (var i = 0; i < tagarr.length; i++) {
            innertag = tag.cloneNode(true);
            innertag.style.display = "initial";
            innertag.getElementsByClassName('text')[0].innerHTML = tagarr[i];
            outertag.appendChild(innertag);
        }
        outer.appendChild(inner);
    }
}

function add() {

    var title = document.getElementById('title').value;
    var url = document.getElementById('url').value;
    var category = document.getElementById('category').value;
    var tags = document.getElementById('tags').value;
    var date = new Date();
    var tag = document.getElementsByClassName('tag')[0];
    outertag = document.getElementsByClassName('tags')[0];
    tagarr = tags.split(" ");
    console.log(tagarr);
    for (var i = 0; i < tagarr.length; i++) {
        innertag = tag.cloneNode(true);
        innertag.style.display = "initial";
        innertag.getElementsByClassName('text')[0].innerHTML = tagarr[i];
        outertag.appendChild(innertag);
    }
    var date = date.getDate() + "-" + (parseInt(date.getMonth()) + 1) + "-" + date.getFullYear();
    if (title == "" && url == "" && category == "" && tags == "") {
        alert("Please fill all fields");
    } else {
        var temparr = [title, url, category, tags, date];
        var outer = document.getElementsByClassName('holders')[0];
        var mainInner = document.getElementsByClassName('block')[0];
        var inner = mainInner.cloneNode(true);
        inner.style.display = "block";
        inner.getElementsByClassName('title')[0].innerHTML += title;
        inner.getElementsByClassName('url')[0].innerHTML += url;
        if (url.includes('http')) {
            inner.getElementsByClassName('url')[0].href = url;
        } else {
            inner.getElementsByClassName('url')[0].href = "https://" + url;
        }

        inner.getElementsByClassName('category')[0].innerHTML += category;

        inner.getElementsByClassName('date')[0].innerHTML += date;
        outer.appendChild(inner);

        arr.push(temparr);

        //console.log(arr.length);
        localStorage.setItem("arrays", JSON.stringify(arr));
        console.log(JSON.parse(localStorage.getItem("arrays")));
    }

}
removeAllChildNodes = (parent) => {
    var nodearr = Array.from(parent.children);
    var len = nodearr.length;
    console.log("length   " + len)
    while (len > 1) {
        parent.removeChild(parent.lastChild);
        len--;
    }
    console.log("removeallchild " + parent)
}
remove = () => {
    var target = event.currentTarget.parentNode.parentNode;
    //console.log(target.parentNode.children);
    var value = Array.from(target.parentNode.children).indexOf(target);
    arr.splice(value - 1, 1);
    //console.log(arr);
    localStorage.setItem("arrays", JSON.stringify(arr));
    document.getElementsByClassName('holders')[0].removeChild(target);
    //console.log("local" + localStorage.getItem("arrays"));
    //console.log("array" + arr);

}
closeOptionbar = () => {
    var targetOptionbar = document.getElementsByClassName('optionbar');
    for (var i = 0; i < targetOptionbar.length; i++) {
        targetOptionbar[i].style.visibility = "hidden";
    }
}
saveInput = () => {
    target = event.currentTarget.parentNode;
    //console.log(target.parentNode.children);
    value = Array.from(target.parentNode.children).indexOf(target);
    console.log(value);
    console.log("ghost      " + arr);
    console.log(arr.splice(value - 1, 1));
    //console.log("ghost" + arr);
    //console.log(arr);
    date = new Date();
    date = date.getDate() + "-" + (parseInt(date.getMonth()) + 1) + "-" + date.getFullYear();
    //console.log("local" + localStorage.getItem("arrays"));
    //console.log("array" + arr);
    allInput = target.querySelectorAll('input');
    console.log(target);
    temp = [allInput[0].value, allInput[1].value, allInput[2].value, allInput[3].value, date];
    console.log("ghost" + temp);
    arr.splice(value - 1, 0, temp);
    //console.log("ghost" + arr);
    localStorage.setItem("arrays", JSON.stringify(arr));
    target.getElementsByClassName('saver')[0].style.display = "none";
    target.getElementsByClassName('title')[0].innerHTML = allInput[0].value;
    target.getElementsByClassName('url')[0].innerHTML = allInput[1].value
    target.getElementsByClassName('category')[0].innerHTML = allInput[2].value;

    tagarrr = target.getElementsByClassName('tags')[0];
    console.log("tagarr" + tagarrr.getElementsByClassName('tag')[0]);
    removeAllChildNodes(tagarrr);
    topp = target.getElementsByClassName('tags')[0];
    console.log(topp);
    bottomm = topp.getElementsByClassName('tag')[0];
    console.log(bottomm);
    savearr = temp[3].split(" ");
    for (var i = 0; i < savearr.length; i++) {
        innertag = bottomm.cloneNode(true);
        innertag.style.display = "initial";
        innertag.getElementsByClassName('text')[0].innerHTML = savearr[i];
        topp.appendChild(innertag);
    }
    topp.style.display = "initial";
    target.getElementsByClassName('date')[0].innerHTML = date;
    for (var i = 0; i < allInput.length; i++) {
        allInput[i].style.display = "none";
    }

}

openEditInput = () => {
    targetEditInput = event.target.parentNode.parentNode;
    allInput = targetEditInput.querySelectorAll('input');
    title = targetEditInput.getElementsByClassName('title')[0];
    url = targetEditInput.getElementsByClassName('url')[0];
    category = targetEditInput.getElementsByClassName('category')[0];
    value = Array.from(targetEditInput.parentNode.children).indexOf(targetEditInput);
    arrr = arr[value - 1];
    console.log(arr);
    //arrr = [title.innerHTML, url.innerHTML, category.innerHTML, tags.innerHTML];
    targetEditInput.getElementsByClassName('tags')[0].style.display = "none";
    for (var i = 0; i < allInput.length; i++) {
        allInput[i].style.display = "initial";
        allInput[i].value = arrr[i];
    }
    title.innerHTML = "";
    url.innerHTML = "";
    category.innerHTML = "";
    var saver = targetEditInput.getElementsByClassName('saver')[0];
    saver.style.display = "initial"


}
CopyToClipboard = (id) => {
    var r = document.createRange();
    r.selectNode(id.getElementsByClassName('url')[0]);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}
showOptionbar = () => {
    var target = event.currentTarget.parentNode;
    console.log(target);
    target.getElementsByClassName('optionbar')[0].style.visibility = "visible";

}
copyText = () => {
    var target = event.target.parentNode.parentNode;
    CopyToClipboard(target)
}
window.onclick = function(event) {
    if (event.target.id !== 'optionbar' && event.target.id !== 'options') {
        closeOptionbar()
    }
}