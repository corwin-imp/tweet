let Tweets = {
  sort: document.getElementById('sort'),
  sortVal: 0,
  sortVars: [0, 'asc', 'desc'],
  sortHtml: ['off', '↑', '↓'],
  part: 0,
  changeSort: function() {
    if (this.sortVal == 2) {
      this.sortVal = 0;
    } else {
      this.sortVal = ++this.sortVal;
    }

    return this.sortVars[this.sortVal];
  },
  changePart: function(part) {
    console.log(part);
    this.part = part;
  },
};
function getTweets(valBtn) {
  let next = document.getElementById('next');
  let sortTo = 0;
  let partData = 1;
  if (valBtn == 'next') {
    partData = ++Tweets.part;
    Tweets.changePart(partData);
    sortTo = Tweets.sortVars[Tweets.sortVal];
  } else if (valBtn == 'sort') {
    sortTo = Tweets.changeSort();
    partData = Tweets.part;
  } else {
    Tweets.changePart(valBtn);
    partData = valBtn;
    sortTo = Tweets.sortVars[Tweets.sortVal];
  }

  var options = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ part: partData, sort: sortTo }),
  };

  fetch('/tweet', options)
    .then(response => response.json())
    .then(function(json) {
      var itemsNode = document.getElementById('items');

      var items = json.items;

      var html = '';
      for (let item in items) {
        html += `<div class='item'>
          <div class="name">${items[item]['name']}</div>
          <div class="text">${items[item]['text']}</div>
          <div class="followers_count">${items[item]['followers_count']}</div>
          </div>`;
      }

      itemsNode.innerHTML = html;
      var nodeAct = document.querySelectorAll(
        '#buttons_lol > button.active',
      )[0];

      if (valBtn == 'sort') {
        document.getElementById('sort').innerHTML =
          Tweets.sortHtml[Tweets.sortVal];
      } else if (valBtn == 'next') {
        var pagination = document.getElementById('buttons_lol');

        if (partData == 1) {
          pagination.innerHTML += `<button class="active btnVal"  " onClick="getTweets(1)">${1}</button>`;
        } else {
          let childLength = document.querySelectorAll('#buttons_lol > .btnVal')
            .length;

          if (childLength + 1 == partData) {
            var nodeAct = document.querySelectorAll(
              '#buttons_lol > .btnVal.active',
            )[0];
            nodeAct.className = 'btnVal';
            pagination.innerHTML += `<button class="btnVal active"  onClick="getTweets(${partData})">${partData}</button>`;
          }else{
            let nodeAct = document.querySelectorAll(
                '#buttons_lol > .btnVal.active',
            )[0];

            nodeAct.className = 'btnVal';
            nodeAct = document.querySelectorAll('#buttons_lol > .btnVal')[--partData];
            nodeAct.className = 'btnVal active';
          }
        }
      } else {
        let nodeAct = document.querySelectorAll(
          '#buttons_lol > .btnVal.active',
        )[0];

        nodeAct.className = 'btnVal';
        nodeAct = document.querySelectorAll('#buttons_lol > .btnVal')[--valBtn];
        nodeAct.className = 'btnVal active';
      }
    });
}
getTweets('next');
