var arr = [];
var colors = ['#E4ECF8', '#CCDCF2', '#9CBCE5', '#6C9ED8', '#3B82CB', '#2A669F', '#245987', '#2A669F'];
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
        console.log("the value of i is " + i);
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

        tagarr = store[i][3];
        console.log(tagarr);
        for (var j = 0; j < tagarr.length; j++) {
            innertag = tag.cloneNode(true);
            innertag.style.display = "initial";
            innertag.getElementsByClassName('text')[0].innerHTML = tagarr[j];
            innertag.style.backgroundColor = colors[j % colors.length];
            console.log(colors[j % colors.length]);
            outertag.appendChild(innertag);
        }
        outer.appendChild(inner);
    }
}

add = () => {
    tagarr = [];
    var title = document.getElementById('title').value;
    var url = document.getElementById('url').value;
    var category = document.getElementById('category').value;
    var tags = document.getElementById('tags').value;
    var date = new Date();
    tagarr = tags.split(",");
    console.log(tagarr);
    var date = date.getDate() + "-" + (parseInt(date.getMonth()) + 1) + "-" + date.getFullYear();
    if (title == "" && url == "" && category == "" && tags == "") {
        alert("Please fill all fields");
    } else {
        var temparr = [title, url, category, tagarr, date];
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
        for (var i = 0; i < tagarr.length; i++) {
            var tag = inner.getElementsByClassName('tag')[0];
            outertag = inner.getElementsByClassName('tags')[0];
            innertag = tag.cloneNode(true);
            innertag.style.display = "initial";
            innertag.style.backgroundColor = colors[i % colors.length];
            console.log(colors[i % colors.length]);
            innertag.getElementsByClassName('text')[0].innerHTML = tagarr[i];
            outertag.appendChild(innertag);
        }

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
    temp = [allInput[0].value, allInput[1].value, allInput[2].value, (allInput[3].value.split(",")), date];
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

    //console.log(bottomm);
    savearr = temp[3];
    topp = target.getElementsByClassName('tags')[0];
    for (var i = 0; i < savearr.length; i++) {

        bottomm = topp.getElementsByClassName('tag')[0];
        innertag = bottomm.cloneNode(true);
        innertag.style.display = "inline-block";
        innertag.getElementsByClassName('text')[0].innerHTML = savearr[i];
        innertag.style.backgroundColor = colors[i % colors.length];
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
tagRemove = () => {
    tagTarget = event.target.parentNode;
    parent_node = tagTarget.parentNode.parentNode.parentNode;
    node_index = Array.from(parent_node.parentNode.children).indexOf(parent_node);
    tagIndex = Array.from(tagTarget.parentNode.children).indexOf(tagTarget);
    console.log(node_index + " " + tagIndex);

    arr[node_index - 1][3].splice(tagIndex - 1, 1);

    tagTarget.parentNode.removeChild(tagTarget);
    localStorage.setItem("arrays", JSON.stringify(arr));

}
minimumEditDistance = (source = "", target = "") => {
    if (!source) return target ? target.length : 0;
    else if (!target) return source.length;

    var m = source.length,
        n = target.length,
        INF = m + n,
        score = new Array(m + 2),
        sd = {};
    for (var i = 0; i < m + 2; i++) score[i] = new Array(n + 2);
    score[0][0] = INF;
    for (var i = 0; i <= m; i++) {
        score[i + 1][1] = i;
        score[i + 1][0] = INF;
        sd[source[i]] = 0;
    }
    for (var j = 0; j <= n; j++) {
        score[1][j + 1] = j;
        score[0][j + 1] = INF;
        sd[target[j]] = 0;
    }

    for (var i = 1; i <= m; i++) {
        var DB = 0;
        for (var j = 1; j <= n; j++) {
            var i1 = sd[target[j - 1]],
                j1 = DB;
            if (source[i - 1] === target[j - 1]) {
                score[i + 1][j + 1] = score[i][j];
                DB = j;
            } else {
                score[i + 1][j + 1] = Math.min(score[i][j], Math.min(score[i + 1][j], score[i][j + 1])) + 1;
            }
            score[i + 1][j + 1] = Math.min(score[i + 1][j + 1], score[i1] ? score[i1][j1] + (i - i1 - 1) + 1 + (j - j1 - 1) : Infinity);
        }
        sd[source[i - 1]] = i;
    }
    return score[m + 1][n + 1];
}
searchTitle = () => {
    var search = document.getElementById("search").value;
    var childrens = Array.from(document.getElementsByClassName("holders")[0].children);
    var index = -(Number.MIN_VALUE);
    for (var j = 1; j < childrens.length; j++) {
        childrens[j].style.display = "initial";

    }
    if (childrens.length > 1) {
        for (var i = 1; i < childrens.length; i++) {

            //console.log(childrens[i]);
            max = -(Number.MAX_VALUE);
            min = Number.MAX_VALUE;
            less = 0;
            index = -1;
            word = childrens[i].getElementsByClassName("title")[0].innerHTML;
            num = minimumEditDistance(search, word);
            similarity = 1 - (num / Math.min(search.length, word.length))
            Math.round(similarity)
            console.log(similarity + " number " + num);
            if (max < similarity && similarity >= 0) {
                max = similarity;
                index = i;
            } else {
                less++;
                console.log(less + " ssles")
                if (word.length > num) {
                    if (num <= min && less == i) {
                        console.log(less + " index");
                        min = num;
                        index = i;
                        console.log(index + "the last index");
                    }
                }

            }

        }

    }
    //console.log(index);
    for (var i = 1; i < childrens.length; i++) {
        if (i != index) {
            console.log(i + "index val" + index);
            childrens[i].style.display = "none";
        }

    }

}
window.onclick = function(event) {
    if (event.target.id !== 'optionbar' && event.target.id !== 'options') {
        closeOptionbar()
    }
}