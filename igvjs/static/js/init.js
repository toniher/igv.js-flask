function initBrowser() {
  var div,
          options,
          browser;

  div = document.getElementById("myDiv");
  options = {
      showNavigation: true,
      showRuler: true,
      genome: "hg19",
      locus: 'chr21:33,031,597-33,041,570',
      tracks:
              [
                      {
                            url: 'static/data/public/tr_2.bw',
                            name: "tr_2"
                        },
                      {
                            url: 'static/data/public/bigWigExample.bw',
                            name: "bigWig"
                      },
                      {
                            url: '/download/bigWigExample.bw',
                            name: "bigWig via download"
                      },

                      {
                            url: '/down?file=bigWigExample.bw',
                            name: "bigWig via down",
                            type: "wig",
                            format: "bigWig"
                      }

              ]
  };

  browser = igv.createBrowser(div, options);
}
