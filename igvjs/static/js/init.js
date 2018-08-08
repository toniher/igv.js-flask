function initBrowser() {
  var div,
          options,
          browser;

  div = $("#myDiv")[0];
  options = {
      showNavigation: true,
      showRuler: true,
      genome: "hg19",
      locus: 'chr1:1-1,857,974',
      tracks:
              [
                      {
                            url: 'static/data/public/tr_2.bw',
                            name: "tr_2"
                        },


              ]
  };

  browser = igv.createBrowser(div, options);
}
