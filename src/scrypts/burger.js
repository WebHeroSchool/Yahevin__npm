

var burg = {
  burger: document.getElementById('burger'),
  burgWindow: document.getElementById('burgMenuId'),

  tap: function tapedMenu() {
    console.log(this.burgWindow);

    if (this.burgWindow.className === 'burgerMenu_deactived') {
      this.burgWindow.classList.remove('burgerMenu_deactived');
      this.burgWindow.classList.add('burgerMenu_active');
    } else {
      this.burgWindow.classList.add('burgerMenu_deactived');
      this.burgWindow.classList.remove('burgerMenu_active');
    }
  },
  makeB: function makeButton() {
    this.burgWindow.onclick = function () {
      return burg.tap();
    }, this.burger.onclick = function () {
      return burg.tap();
    };
  }
};
burg.makeB();