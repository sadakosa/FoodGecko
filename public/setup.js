var body = document.getElementById('body');
// var num = 3;

function goToQr (event) {
    id = event.target.id;
    window.open('/outlet/' + id, '_blank');
}

function deleteList() {
    for (var i = 2; i < body.childNodes.length; i++) {
        body.removeChild(body.childNodes[i]);
    }
}

function createList (event) {
    let tableNo = document.getElementById('tableNo');
    let num = tableNo.value;

    deleteList();

    let list = document.createElement('div');
    list.classList.add('ui');
    list.classList.add('middle');
    list.classList.add('aligned');
    list.classList.add('divided');
    list.classList.add('list');

    for (var i = 0; i < num; i++) {
        let item = document.createElement('div');
        item.classList.add('item');

        let rightItem = document.createElement('div');
        rightItem.classList.add('right');
        rightItem.classList.add('floated');
        rightItem.classList.add('content');

        let button = document.createElement('div');
        button.classList.add('ui');
        button.classList.add('button');
        button.id = (i+1).toString();
        button.addEventListener('click', goToQr);
        button.innerText = 'QRcodes and Link Please';

        let leftContent = document.createElement('div');
        leftContent.classList.add('content');
        leftContent.innerText = 'Table ' + (i+1).toString();

        rightItem.appendChild(button);
        item.appendChild(rightItem);
        item.appendChild(leftContent);
        list.appendChild(item);
    }

    body.appendChild(list);
}

createList();
