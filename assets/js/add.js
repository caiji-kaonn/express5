// 封装form函数 
function serialize(formSelector) {
    let form = document.querySelector(formSelector);
    let arr = [];
    // 获取name属性，让name=value
    let se = form.querySelectorAll('[name]');
    se.forEach(e => {
        if (e.type === 'raido' && e.checked) {
            let key = e.name;
            let value = e.value;
            arr.push(key + '=' + value);
        }
        if (e.type !== 'radio') {
            let key = e.name;
            let value = e.value;
            arr.push(key + '=' + value);
        }
    });
    return arr.join('&');
}

let btn = document.querySelector('#sub');
btn.onclick = function () {
    let data = form.serialize();
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'http://127.0.0.1:8080/addHero?' + data);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            let res = JSON.parse(xhr.responseText);
            if (res.code === 200) {
                alert(res.msg);
            }
        }


    }
}