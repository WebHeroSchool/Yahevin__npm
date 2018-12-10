var scroll, timer, anchor, box, b;

var makeScrolling = {

    makeScrollBars: function () {
        document.getElementById('headerScrollBottom').onclick = this.triangleScrolling;
        document.getElementById('future__scrollId').onclick = this.scrollToTop;
        document.getElementById('security__scrollId').onclick = this.scrollToTop;  
    },

    triangleScrolling: function () {
        scroll = window.pageYOffset;
        box = document.getElementById('future__mainId').getBoundingClientRect()
        anchor = box.top + scroll;        
        function go () {
            if (scroll < (anchor - 5)) {    
                window.scrollTo(0,scroll)
                scroll = scroll + 15 * Math.sin(0.1 + 3*scroll/anchor);
                timer = setTimeout(go,5);
            }
            else {
                clearTimeout(timer);
                window.scrollTo(0,anchor)
            }   
        }
        return go ();
      },

    scrollToTop: function () {
        scroll = window.pageYOffset;
        anchor = scroll;
        function go () {
            if (scroll > 0) {
                window.scrollTo(0,scroll);
                scroll = scroll - 25 * Math.sin(0.1 + 3*scroll/anchor);               
                timer = setTimeout(go,5);
            }
            else {
                clearTimeout(timer);
                window.scrollTo(0,0);
            }
        }
        return go ();
    }
}

makeScrolling.makeScrollBars ();